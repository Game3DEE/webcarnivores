import { Vector3 } from "@react-three/fiber";
import React from "react";
import {
    DataTexture,
    DataTexture2DArray,
    Matrix4,
    PlaneBufferGeometry,
    RepeatWrapping,
    RGBFormat,
    RGBIntegerFormat,
    RGIntegerFormat,
    UnsignedByteType,
    UnsignedShort565Type
} from "three";
import CPCTerrainMaterial from "../legacy/CPCTerrainMaterial";

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

interface Props {
    rsc: any;
    map: any;
    viewDistance?: number; // view distance in tiles
    position?: Vector3; // location in world space
}

function Terrain({
    rsc, map,
    viewDistance = map.mapSize / 2,
    position = [ 0,0,0 ],
}: Props) {
    const material = React.useMemo(() => {
        const { mapSize, version, yScale } = map;
        const vertexMap = buildVertexMap(map);
        const fragmentMap = buildFragmentMap(map);
        
        const textureArray = createTextureArray(rsc);

        // World coordinates to uv transform (TODO investigate uvScaleMap/uvTransform?)
        const heightmapMatrix = new Matrix4().makeScale(
            1 / (map.mapSize * map.tileSize),
            1,
            1 / (map.mapSize * map.tileSize),
        );
        return new CPCTerrainMaterial({
            vertexMap,
            fragmentMap,
            mapSize,
            version,
            yScale,
            textureArray,
            heightmapMatrix,
        });
    }, [map, rsc])

    const geometry = React.useMemo(() => {
        let geo = new PlaneBufferGeometry(
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
        return geo;
    }, [viewDistance]);

    console.log(geometry, material)

    return (
        <mesh position={position} geometry={geometry} material={material} />
    )
}

export default Terrain;
