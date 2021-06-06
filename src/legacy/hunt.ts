import KaitaiStream from 'kaitai-struct/KaitaiStream';
import {
    BufferGeometry,
    DataTexture,
    Float32BufferAttribute,
    Group,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshLambertMaterial,
    PlaneBufferGeometry,
    RGBAFormat,
    RGBFormat,
    SphereBufferGeometry,
    Texture,
    UnsignedByteType
} from 'three';

import MAP from '../kaitai/carnivores_map';
import RSC from '../kaitai/carnivores1_rsc';

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
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        geo.attributes.position.setY(i, map.heightMap[i] * mapHScale);
    }

    // Compute normals for lighting
    geo.computeVertexNormals();

    // Return a non-indexed version of the geometry, since we're going to need
    // to generate the UVs for the texture atlas mapping
    return geo.toNonIndexed();
}

// Create a texture atlas for all terrain textures
// this makes it possible to simply use UV assignments per "square"
// in the terrain to render the correct textures
// (and since it is all in one texture it helps prevent re-binding of textures)
function createTextureAtlas(rsc: any) {
    // Calculate W/H of atlas (we make a square texture atlas)
    const textureDim = Math.ceil(Math.sqrt(rsc.textureCount));
    const textureStride = textureDim * terrainTexSize * 3; // bytes used per single pixel row

    // Allocate storage for texture atlas
    const data = new Uint8Array(textureDim * textureStride * terrainTexSize)

    // Now go over all textures...
    for (let i = 0; i < rsc.textureCount; i++) {
        // Determine where in the atlas grid this texture should go
        let top = Math.floor(i / textureDim)
        let left = Math.floor(i % textureDim)
        // ... and the actual byte offset in our data
        let offset = (top * textureStride * terrainTexSize) + (left * terrainTexSize * 3);
        // Now go over the texture and decode the 16 bit texture into our 24 bit one
        for (let y = 0; y < terrainTexSize; y++) {
            for (let x = 0; x < terrainTexSize; x++) {
                let pixel = rsc.textures[i].data[y * terrainTexSize + x]
                data[offset++] = ((pixel >> 10) & 0x1f) << 3;
                data[offset++] = ((pixel >> 5) & 0x1f) << 3;
                data[offset++] = ((pixel >> 0) & 0x1f) << 3;
            }
            offset -= terrainTexSize * 3;
            offset += textureStride;
        }
    }
    // Done! Now simply create a ThreeJS texture from the data
    const texSize = textureDim * terrainTexSize;
    console.log(rsc, texSize, textureDim, data.byteLength)
    const tex = new DataTexture(data, texSize, texSize, RGBFormat, UnsignedByteType);
    tex.needsUpdate = true;

    return tex;
}

// Set up the UVs for our texture atlas based on the texture map
function setupTerrainUV(geometry: BufferGeometry, atlasTexture: Texture, map: any) {
    // Get number of textures per row in our atlas
    const textureDim = atlasTexture.image.width / terrainTexSize;
    // size of one texture in our map in UV coordinates (they are 0...1)
    const uvStep = 1 / textureDim;
    const uv = geometry.attributes.uv;
    let uvidx = 0;
    // Loop through the entire map
    for (let y = 0; y < map.mapSize - 1; y++) {
        for (let x = 0; x < map.mapSize - 1; x++) {
            // Get the texture number
            const tidx = map.textureMap1[map.mapSize * y + x];
            // get the rotation of the texture
            const rot = map.flagsMap[map.mapSize * y + x] & 3;
            // calculate position of texture from atlas in UV coords
            const ty = Math.floor(tidx / textureDim) * uvStep;
            const tx = Math.floor(tidx % textureDim) * uvStep;
            // Okay, the code here gets a little messy, and could be optimised,
            // but at least it reads nicer then the Carnivores code itself :P

            // Four positions in uvmap to use
            const coords = [
                [tx, ty],
                [tx, ty + uvStep],
                [tx + uvStep, ty], // first triangle UV
                [tx + uvStep, ty + uvStep],
            ];
            // map coordinates to all 6 vertices used for this grid square
            let a = 0, b = 1, c = 2, d = 1, e = 3, f = 2;
            // ... and take rotation into account
            switch (rot) {
                case 0: break; // default no rotation
                case 1: // 90deg
                    a = 1; b = d = 3; c = f = 0; e = 2;
                    break;
                case 2: // 180deg
                    a = 3; b = d = 2; c = f = 1; e = 0;
                    break;
                case 3: // 270deg
                    a = 2; b = d = 0; c = f = 3; e = 1;
                    break;
            }
            // Okay, now simply set the UV for those 6 vertices
            uv.setX(uvidx + 0, coords[a][0]);
            uv.setY(uvidx + 0, coords[a][1]);
            uv.setX(uvidx + 1, coords[b][0]);
            uv.setY(uvidx + 1, coords[b][1]);
            uv.setX(uvidx + 2, coords[c][0]);
            uv.setY(uvidx + 2, coords[c][1]);

            uv.setX(uvidx + 3, coords[d][0]);
            uv.setY(uvidx + 3, coords[d][1]);
            uv.setX(uvidx + 4, coords[e][0]);
            uv.setY(uvidx + 4, coords[e][1]);
            uv.setX(uvidx + 5, coords[f][0]);
            uv.setY(uvidx + 5, coords[f][1]);

            // .. and move on
            uvidx += 6;
        }
    }
    // Tell ThreeJS we modified the UVs...
    uv.needsUpdate = true;
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
  
    let data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let pixel = texData[y * width + x];
        let offset = (y * width + x) * 4;
        data[offset++] = ((pixel >> 10) & 0x1f) << 3;
        data[offset++] = ((pixel >>  5) & 0x1f) << 3;
        data[offset++] = ((pixel >>  0) & 0x1f) << 3;
        data[offset++] = pixel ? 0xff : 0;
      }
    }
  
    const tex = new DataTexture(data, width, height, RGBAFormat, UnsignedByteType);
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
                    new MeshLambertMaterial({ color: 0xff0000 }),
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
            const geo = createGeometry(mdl.vertices, mdl.faces);
            const tex = createTexture(mdl.textureData, mdl.textureSize);
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

export async function loadArea(area: string) {
    let scene = new Group();

    try {
        const mapBuffer = await fetch(`${areaPath}/${area}.MAP`).then(body => body.arrayBuffer());
        const rscBuffer = await fetch(`${areaPath}/${area}.RSC`).then(body => body.arrayBuffer());

        const map = new MAP(new KaitaiStream(mapBuffer));
        const rsc = new RSC(new KaitaiStream(rscBuffer));

        const geo = createMapGeometry(map)
        const atlasTexture = createTextureAtlas(rsc);
        setupTerrainUV(geo, atlasTexture, map);

        createInstancedModels(rsc, map, scene);

        // Okay, terrain done!
        scene.add(new Mesh(
            geo,
            new MeshLambertMaterial({ map: atlasTexture }),
        ));
    } catch (e) {
        console.error(e)
        return undefined;
    }

    return scene;
}
