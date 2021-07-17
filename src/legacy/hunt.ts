import KaitaiStream from 'kaitai-struct/KaitaiStream';
import {
    BufferGeometry,
    DataTexture,
    DataTexture2DArray,
    Float32BufferAttribute,
    Group,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    PlaneBufferGeometry,
    RepeatWrapping,
    RGBAFormat,
    RGBFormat,
    SphereBufferGeometry,
    UnsignedByteType,
    UnsignedShort565Type,
    UnsignedShort5551Type,
    RGBIntegerFormat,
    RGIntegerFormat,
    Vector3,
} from 'three';

import MAP from '../kaitai/Map';
import RSC from '../kaitai/Rsc';

const areaPath = 'HUNTDAT/AREAS';

function createTextureArray(rsc: any) {
    // create data array
    const data = new Uint16Array(rsc.textureCount * rsc.textures[0].width * rsc.textures[0].height);

    // copy texture data
    let offset = 0;
    for (let i = 0; i < rsc.textureCount; i++) {
        for (let j = 0; j < rsc.textures[0].width * rsc.textures[0].height; j++) {
            // read RGBA5551...
            let pixel = (rsc.textures[i].data[j*2+1] << 8) | rsc.textures[i].data[j*2];
            let r = (pixel >> 10) & 0x1f;
            let g = ((pixel >>  5) & 0x1f) << 1;
            let b = (pixel >>  0) & 0x1f;
            // write RGB565 (since we do not need transparency here)
            data[offset++] = (r << 11) + (g << 5) + b;
        }
    }

    let tex = new DataTexture2DArray(data, rsc.textures[0].width, rsc.textures[0].height, rsc.textureCount);
    tex.type = UnsignedShort565Type;
    tex.format = RGBFormat;
    tex.wrapT = tex.wrapS = RepeatWrapping;
    return tex;
}


function createGeometry(vertices: any[], faces: any[]) {
    let geo = new BufferGeometry();
    let position: number[] = [];
    let uv: number[] = [];
    let index: number[] = [];
    let idx = 0;
    faces.forEach(f => {
        let a = f.v1, b = f.v2, c = f.v3;

        position.push(vertices[a].x, vertices[a].y, vertices[a].z);
        uv.push(f.tax / 256, f.tay / 256);
        index.push(idx++);
        position.push(vertices[b].x, vertices[b].y, vertices[b].z);
        uv.push(f.tbx / 256, f.tby / 256);
        index.push(idx++);
        position.push(vertices[c].x, vertices[c].y, vertices[c].z);
        uv.push(f.tcx / 256, f.tcy / 256);
        index.push(idx++);
    });

    geo.setAttribute('position', new Float32BufferAttribute(position, 3));
    geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
    geo.setIndex(index);
    geo.computeVertexNormals();

    return geo;
}

function createTexture(texData: Uint8Array, width: number, height: number) {
    let data = new Uint16Array(width * height);
    let offset = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const j = y * width + x;
        let pixel = (texData[j*2+1] << 8) | texData[j*2];
        let r = ((pixel >> 10) & 0x1f);
        let g = ((pixel >>  5) & 0x1f);
        let b = ((pixel >>  0) & 0x1f);
        let a = 1; //(pixel & 0x80) ? 1 : 0; // ????
        data[offset++] = (r << 11) + (g << 6) + (b << 1) | a;
      }
    }
  
    const tex = new DataTexture(
        data, width, height,
        RGBAFormat, UnsignedShort5551Type,
    );
    tex.needsUpdate = true;
    return tex;
  }

function createInstancedModels(rsc: any, map: any, parent: Group) {

    const matrices: number[][] = [];
    const mapSize = map.mapSize;
    const landingList: Vector3[] = [];

    function getHeight(x: number, y: number) {
        return map.heightMap[y * map.mapSize + x] * map.yScale;
    }

    const matrix = new Matrix4();
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const obj = map.objectMap[y * mapSize + x];
            if (obj < 254) {
                matrix.makeTranslation(
                    x * map.tileSize,
                    getHeight(x, y),
                    y * map.tileSize)
                if (!matrices[obj]) {
                    matrices[obj] = matrix.toArray();
                } else {
                    matrices[obj].push.apply(matrices[obj], matrix.toArray())
                }
            } else if (obj === 254) {
                // Landing list
                landingList.push(
                    new Vector3(
                        x * map.tileSize,
                        getHeight(x, y),
                        y * map.tileSize    
                    )
                );
            } else if (obj === 255) {
                // empty
            }
        }
    }

    rsc.models.forEach((mdl: any, obj: number) => {
        if (matrices[obj]) {
            const count = matrices[obj].length / 16;
            const geo = createGeometry(mdl.model.vertices, mdl.model.faces);
            const tex = createTexture(mdl.model.textureData, mdl.model.textureWidth, mdl.model.textureHeight);
            const mesh = new InstancedMesh(
                geo, new MeshBasicMaterial({ map: tex, fog: true, transparent: true, alphaTest: 0.5 }),
                count,
            );
            for (let i = 0; i < count; i++) {
                matrix.fromArray(matrices[obj], i * 16)
                mesh.setMatrixAt(i, matrix)
            }
            parent.add(mesh)
        }
    })

    return landingList;
}

function buildVertexMap(map: any) {
    const numChannels = 2;
    const data = new Uint8Array(map.mapSize * map.mapSize * numChannels);
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        data[i*numChannels+0] = map.heightMap[i]; // R
        data[i*numChannels+1] = map.dayLightMap[i]; // G
    }
    let tex = new DataTexture(data, map.mapSize, map.mapSize, RGIntegerFormat, UnsignedByteType);
    tex.internalFormat = 'RG8UI';
    return tex;
}

function buildFragmentMap(map: any) {
    const numChannels = 3;
    const data = new Uint8Array(map.mapSize * map.mapSize * numChannels);
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        const flags = map.flagsMap[i];
        data[i*numChannels+0] = map.textureMap1[i]; // R
        data[i*numChannels+1] = map.textureMap2[i]; // G
        data[i*numChannels+2] = flags.fTexDirection | (flags.fReverse << 6); // B
    }
    let tex = new DataTexture(data, map.mapSize, map.mapSize, RGBIntegerFormat, UnsignedByteType);
    tex.internalFormat = 'RGB8UI';
    return tex;
}

export async function loadArea(area: string) {
    let scene = new Group();

    const mapBuffer = await fetch(`${areaPath}/${area}.MAP`).then(body => body.arrayBuffer());
    const rscBuffer = await fetch(`${areaPath}/${area}.RSC`).then(body => body.arrayBuffer());

    const map = new MAP(new KaitaiStream(mapBuffer));
    const rsc = new RSC(new KaitaiStream(rscBuffer), undefined, undefined, map.version);
    console.log(rsc, map)

    // Create a plane with divisions as base for map heightfield
    const geo = new PlaneBufferGeometry(
//            80 * map.tileSize, 80 * map.tileSize,
//            80 - 1, 80 - 1
        map.mapSize * map.tileSize, map.mapSize * map.tileSize,
        map.mapSize - 1, map.mapSize - 1
    );

    // Lay it flat
    geo.rotateX(-Math.PI / 2);
    // and make it start at (0,0)
    geo.translate(
        map.mapSize * map.tileSize / 2,
        0,
        map.mapSize * map.tileSize / 2
    );

    const landings = createInstancedModels(rsc, map, scene);

    // World coordinates to uv transform (TODO investigate uvScaleMap/uvTransform?)
    const heightmapMatrix = new Matrix4().makeScale(
        1 / (map.mapSize * map.tileSize),
        1,
        1 / (map.mapSize * map.tileSize),
    );

    let mat = new MeshBasicMaterial({ map: createTextureArray(rsc), fog: true });
    console.log(mat.defines);
    mat.defines = {
        'MAP_SIZE': `${map.mapSize}.0`,
        'CARNIVORES': map.version,
        'MAP_HSCALE': `${map.yScale}.0`,
    };
    mat.onBeforeCompile = s => {
        console.log(s, map, rsc)
        // Create our (integer) data textures for
        // fragment and vertex shader
        let vertexMap = buildVertexMap(map);
        let fragmentMap = buildFragmentMap(map);
        s.uniforms['vertexMap'] = { value: vertexMap, };
        s.uniforms['fragmentMap'] = { value: fragmentMap, };
        s.uniforms['heightmapMatrix'] = { value: heightmapMatrix, };

        // Adjust vertex shader
        let vs = s.vertexShader;
        vs = vs.replace('#include <common>', `
            precision highp usampler2D;
            uniform usampler2D vertexMap;
            uniform mat4 heightmapMatrix;
            varying vec4 vLighting;
        `)
        vs = vs.replace('#include <color_vertex>', `
        vUv = (heightmapMatrix * modelMatrix * vec4(position, 1.0)).xz;
        uvec4 tex = texture(vertexMap, vUv);
        #if CARNIVORES == 1
        float light = 1.0 - (float(tex.g) / 64.0);
        #else
        float light = float(tex.g) / 255.0;
        #endif
        vLighting = vec4(light, light, light, 1.0);
        #include <color_vertex>
        `)
        vs = vs.replace('#include <begin_vertex>', `
        #include <begin_vertex>
        transformed.y += float(tex.r) * MAP_HSCALE;
        `)
        s.vertexShader = vs;
        // Adjust the fragment shader
        let fs = s.fragmentShader;
        fs = fs.replace('#include <map_pars_fragment>', `
        precision highp sampler2DArray;
        precision highp usampler2D;
        uniform sampler2DArray map;
        uniform usampler2D fragmentMap;
        varying vec4 vLighting;
        `);
        fs = fs.replace('#include <map_fragment>', `
        vec2 tilePos = vUv * MAP_SIZE;
        vec2 localTileUv = tilePos - floor(tilePos);
        uvec4 tex = texture(fragmentMap, vUv);
        float triside = ((1.0-localTileUv.x) - localTileUv.y);
        diffuseColor = vLighting;
        switch(tex.b & 3u) {
            case 0u:
                //diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
                break;
            case 1u:
                float t = localTileUv.x;
                localTileUv.x = localTileUv.y;
                localTileUv.y = 1.0 - t;
                //diffuseColor = vec4(0.5, 0.0, 0.0, 1.0);
                break;
            case 2u:
                localTileUv.x = 1.0 - localTileUv.x;
                localTileUv.y = 1.0 - localTileUv.y;
                //diffuseColor = vec4(0.5, 0.5, 0.0, 1.0);
                break;
            case 3u:
                float x = localTileUv.x;
                localTileUv.x = 1.0 - localTileUv.y;
                localTileUv.y = x;
                //diffuseColor = vec4(0.0, 0.0, 1.0, 1.0);
                break;
        }
        uint depth = tex.r;
        #if CARNIVORES == 1
        if (triside >= 0.0) {
            depth = (tex.b & 64u) != 0u ? tex.r : tex.g;
        } else {
            depth = (tex.b & 64u) != 0u ? tex.g : tex.r;
        }
        #endif
        #ifdef DEBUG_REVERSE_FLAG
        if ((tex.b & 64u) != 0u) {
            diffuseColor = vec4(0.6, 0.6, 0.6, 1.0);
        } else {
            diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
        #endif
        vec4 texelColor = texture( map, vec3(localTileUv, depth) );
        texelColor = mapTexelToLinear( texelColor );
        diffuseColor *= texelColor;
        //diffuseColor = vec4(localTileUv, 0.0, 1.0);
        `)
        s.fragmentShader = fs;
    }

    // Okay, terrain done!
    scene.add(new Mesh(geo, mat));

    function getHeightAt(x: number, z: number) {
        // GetLandUpH (without fReverse handling)
        const tileSize = map.tileSize;
        const mapSize = map.mapSize;
        const heightMap = map.heightMap!;

        const cx = Math.floor(x / tileSize);
        const cy = Math.floor(z / tileSize);
        const dx = Math.floor(x % tileSize);
        const dy = Math.floor(z % tileSize);
     
        let h1 = heightMap[cy * mapSize + cx];
        let h2 = heightMap[cy * mapSize + cx +1];
        let h3 = heightMap[(cy + 1) * mapSize + cx +1];
        let h4 = heightMap[(cy + 1) * mapSize + cx];

        if (dx > dy) {
            h4 = h1 + h3 - h2;
        } else {
            h2 = h1 + h3 - h4;
        }
     
        let h = 
            (h1 * (256 - dx) + h2 * dx) * (256 - dy) +
            (h4 * (256 - dx) + h3 * dx) * dy;
     
        return  h / 256 / 256 * map.yScale;
    }

    return {
        landings,
        getHeightAt,
        group: scene
    };
}
