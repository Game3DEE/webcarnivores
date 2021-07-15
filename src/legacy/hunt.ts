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
    MeshLambertMaterial,
    MeshBasicMaterial,
    PlaneBufferGeometry,
    RepeatWrapping,
    RGBAFormat,
    RGBFormat,
    SphereBufferGeometry,
    UnsignedByteType,
    RGBAIntegerFormat,
    UnsignedShort565Type,
    UnsignedShort5551Type,
} from 'three';

import MAP from '../kaitai/Map';
import RSC from '../kaitai/Rsc';

const areaPath = 'HUNTDAT/AREAS';

const mapScale = 256; // size of one map square
const mapHScale = 32; // Y scale for heightfield
const terrainTexSize = 128; // terrain textures are 128x128 pix

function createMapGeometry(map: any) {
    // Create a plane with divisions as base for map heightfield
    const geo = new PlaneBufferGeometry(
        map.mapSize * mapScale, map.mapSize * mapScale,
        map.mapSize - 1, map.mapSize - 1
    );

    // Lay it flat
    geo.rotateX(-Math.PI / 2);

    // Set heights based on heightfield
    let scale = mapHScale;
    if (map.version == 2) scale *= 2;
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        geo.attributes.position.setY(i, map.heightMap[i] * scale);
    }

    // Compute normals for lighting
    geo.computeVertexNormals();

    return geo;
}

function createTextureArray(rsc: any) {
    // create data array
    const data = new Uint16Array(rsc.textureCount * terrainTexSize * terrainTexSize);

    // copy texture data
    let offset = 0;
    for (let i = 0; i < rsc.textureCount; i++) {
        for (let j = 0; j < terrainTexSize * terrainTexSize; j++) {
            // read RGBA5551...
            let pixel = rsc.textures[i].data[j];
            let r = (pixel >> 10) & 0x1f;
            let g = ((pixel >>  5) & 0x1f) << 1;
            let b = (pixel >>  0) & 0x1f;
            // write RGB565 (since we do not need transparency here)
            data[offset++] = (r << 11) + (g << 5) + b;
        }
    }

    let tex = new DataTexture2DArray(data, terrainTexSize, terrainTexSize, rsc.textureCount);
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
    vertices.forEach(v => {
        position.push(v.x, v.y, v.z);
    });
    function findUvForVertex(vIdx: number, u: number, v: number) {
        // TODO: look for duplicate UVs and reuse
        uv[vIdx * 2 + 0] = u;
        uv[vIdx * 2 + 1] = v;
        return vIdx;
    }
    let idx;
    faces.forEach(f => {
        let a = f.v1, b = f.v2, c = f.v3;

        idx = findUvForVertex(a, f.tax / 256, f.tay / 256);
        index.push(idx);
        idx = findUvForVertex(b, f.tbx / 256, f.tby / 256);
        index.push(idx);
        idx = findUvForVertex(c, f.tcx / 256, f.tcy / 256);
        index.push(idx);
    });

    geo.setAttribute('position', new Float32BufferAttribute(position, 3));
    geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
    geo.setIndex(index);
    geo.computeVertexNormals();

    return geo;
}

function createTexture(texData: Uint16Array, texSize: number) {
    let width = 256;
    let height = texSize / (width * 2);
  
    let data = new Uint16Array(width * height);
    let offset = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let pixel = texData[y * width + x];
        let r = ((pixel >> 10) & 0x1f);
        let g = ((pixel >>  5) & 0x1f);
        let b = ((pixel >>  0) & 0x1f);
        let a = (pixel & 0x80) ? 1 : 0; // ????
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
    const halfMapSize = mapSize / 2;

    function getHeight(x: number, y: number) {
        return map.heightMap[y * map.mapSize + x] * mapHScale;
    }

    const matrix = new Matrix4();
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const obj = map.objectMap[y * mapSize + x];
            if (obj < 254) {
                matrix.makeTranslation(
                    (x - halfMapSize) * mapScale,
                    getHeight(x, y),
                    (y - halfMapSize) * mapScale)
                if (!matrices[obj]) {
                    matrices[obj] = matrix.toArray();
                } else {
                    matrices[obj].push.apply(matrices[obj], matrix.toArray())
                }
            } else if (obj === 254) {
                // Landing list
                const indicator = new Mesh(
                    new SphereBufferGeometry(128),
                    new MeshBasicMaterial({ color: 0xff0000 }),
                )
                indicator.position.set(
                    (x - halfMapSize) * mapScale,
                    getHeight(x, y),
                    (y - halfMapSize) * mapScale);

                parent.add(indicator);
            } else if (obj === 255) {
                // empty
            }
        }
    }

    rsc.models.forEach((mdl: any, obj: number) => {
        if (matrices[obj]) {
            const count = matrices[obj].length / 16;
            const geo = createGeometry(mdl.model.vertices, mdl.model.faces);
            const tex = createTexture(mdl.model.textureData, mdl.model.textureSize);
            const mesh = new InstancedMesh(
                geo, new MeshLambertMaterial({ map: tex, transparent: true, alphaTest: 0.5 }),
                count,
            );
            for (let i = 0; i < count; i++) {
                matrix.fromArray(matrices[obj], i * 16)
                mesh.setMatrixAt(i, matrix)
            }
            parent.add(mesh)
        }
    })
}

function buildDataMap(map: any) {
    const data = new Uint8Array(map.mapSize * map.mapSize * 4);
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        const flags = map.flagsMap[i];
        data[i*4+0] = map.textureMap1[i];
        data[i*4+1] = flags.fTexRotation | (flags.fReverse << 6); //flags.val;
        data[i*4+2] = map.dayLightMap[i];
        data[i*4+3] = map.textureMap2[i];
    }
    let tex = new DataTexture(data, 512, 512, RGBAIntegerFormat, UnsignedByteType);
    tex.internalFormat = 'RGBA8UI';
    tex.flipY = true;

    return tex;
}

export async function loadArea(area: string) {
    let scene = new Group();

    try {
        const mapBuffer = await fetch(`${areaPath}/${area}.MAP`).then(body => body.arrayBuffer());
        const rscBuffer = await fetch(`${areaPath}/${area}.RSC`).then(body => body.arrayBuffer());

        const map = new MAP(new KaitaiStream(mapBuffer));
        console.log(`MAPv${map.version}`)
        const rsc = new RSC(new KaitaiStream(rscBuffer), undefined, undefined, map.version);
        console.log(rsc, map)

        const geo = createMapGeometry(map)

        createInstancedModels(rsc, map, scene);

        let mat = new MeshBasicMaterial({ map: createTextureArray(rsc) });
        mat.defines = {
            'MAP_SIZE': `${map.mapSize}.0`,
            'CARNIVORES': map.version,
        };
        mat.onBeforeCompile = s => {
            console.log(s, map, rsc)
            let textureMap = buildDataMap(map);
            s.uniforms['textureMap'] = {
                value: textureMap,
            };
            // Adjust vertex shader
            let vs = s.vertexShader;
            vs = vs.replace('#include <common>', `
                precision highp usampler2D;
                uniform usampler2D textureMap;
                varying vec4 vLighting;
            `)
            vs = vs.replace('#include <color_vertex>', `
                uvec4 tex = texture(textureMap, vUv);
                #if CARNIVORES == 1
                float light = 1.0 - (float(tex.b) / 64.0);
                #else
                float light = 1.0;// - (float(tex.b) / 255.0);
                #endif
                vLighting = vec4(light, light, light, 1.0);
                #include <color_vertex>
            `)
            s.vertexShader = vs;
            // Adjust the fragment shader
            let fs = s.fragmentShader;
            fs = fs.replace('#include <map_pars_fragment>', `
            precision highp sampler2DArray;
            precision highp usampler2D;
            uniform sampler2DArray map;
            uniform usampler2D textureMap;
            varying vec4 vLighting;
            `);
            fs = fs.replace('#include <map_fragment>', `
            const float tileUvStep = 1.0 / MAP_SIZE;
            vec2 localTileUv = mod(vUv, tileUvStep) * MAP_SIZE;
            uvec4 tex = texture(textureMap, vUv);
            localTileUv.y = 1.0 - localTileUv.y; // XX remove and fix switch
            float triside = ((1.0-localTileUv.x) - localTileUv.y);
            diffuseColor = vLighting;
            switch(tex.g & 3u) {
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
            uint depth = 0u;
            #if CARNIVORES == 2
            triside = 0.0;
            #endif
            if (triside > 0.0) {
                depth = (tex.g & 64u) != 0u ? tex.r : tex.a;
            } else {
                depth = (tex.g & 64u) != 0u ? tex.a : tex.r;
            }
            vec4 texelColor = texture( map, vec3(localTileUv, depth) );
            texelColor = mapTexelToLinear( texelColor );
            diffuseColor *= texelColor;
            `)
            s.fragmentShader = fs;
        }

        // Okay, terrain done!
        scene.add(new Mesh(geo, mat));
    } catch (e) {
        console.error(e)
        return undefined;
    }

    return scene;
}
