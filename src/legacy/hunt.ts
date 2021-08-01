// Legacy file, feel free to move code out.
// It should turn into CPC(Load).ts, only
// handling loading the MAP/RSC file and
// compensating for any C1/C2 differences
// where necessary.
import KaitaiStream from 'kaitai-struct/KaitaiStream';
import {
    DataTexture,
    RGBAFormat,
    UnsignedShort5551Type,
    Vector3,
} from 'three';

import MAP from '../kaitai/Map';
import RSC from '../kaitai/Rsc';
import { getUS5551 } from './utils';

function getLandings(map: any) {

    const mapSize = map.mapSize;
    const landingList: Vector3[] = [];

    function getHeight(x: number, y: number) {
        return map.heightMap[y * map.mapSize + x] * map.yScale;
    }

    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const obj = map.objectMap[y * mapSize + x];
            if (obj === 254) {
                // Landing list
                landingList.push(
                    new Vector3(
                        x * map.tileSize,
                        getHeight(x, y),
                        y * map.tileSize    
                    )
                );
            }
        }
    }

    return landingList;
}

export async function loadArea(mapUrl: string, rscUrl: string) {
    const mapBuffer = await fetch(mapUrl).then(body => body.arrayBuffer());
    const rscBuffer = await fetch(rscUrl).then(body => body.arrayBuffer());

    const map = new MAP(new KaitaiStream(mapBuffer));
    const rsc = new RSC(new KaitaiStream(rscBuffer), undefined, undefined, map.version);
    console.log(rsc, map)

/* WIP
    if (map.version == 1) {
        // Carnivores (1) map, fixup water related map data
        // XXX TODO create C2-style water table & map!
        const size = map.mapSize * map.mapSize;
        for (let i = 0; i < size; i++) {
            if (map.flagsMap![i].fWater) {
                // Set heightmap to waterfloor level
                //map.heightMap![i] = map.waterMap![i];
                // Map POOL texture (0) to SAND texture (1)
                if (map.textureMap1![i] == 0) {
                    map.textureMap1![i] = 1;
                }
                if (map.textureMap2![i] == 0) {
                    map.textureMap2![i] = 1;
                }
            }
        }
    }
    */

    const landings = getLandings(map);

    const miniMapSize = map.mapSize / 2;
    const minimapData = new Uint16Array(miniMapSize * miniMapSize);
    let off = 0;
    let tx, ty;
    for (let y = 0; y < miniMapSize; y++) {
        for (let x = 0; x < miniMapSize; x++) {
            let tidx = map.textureMap1![(y * 2 * map.mapSize) + x * 2];
            // Use more detail for water tiles
            tx = tidx === 0 ? (x & 31) * 4 : (x & 15) * 8;
            ty = tidx === 0 ? (y & 31) * 4 : (y & 15) * 8;
            const tex = rsc.textures![tidx];
            minimapData[off++] = getUS5551(tx, ty, tex.data, tex.width, false);
        }
    }

    const miniMap = new DataTexture(minimapData, miniMapSize, miniMapSize, RGBAFormat, UnsignedShort5551Type);
    miniMap.flipY = true; // keep (0,0) in the top left, game expects it

    function getLandH(x: number, z: number) {
        const { tileSize, mapSize } = map;

        // XXX problem for C1/C2 compatibility!
        // C1: waterMap has water "floor" heights, while heightmap has water "level" heights
        // C2: heightMap has water "floor" heights, waterMap contains indices into water table
        //     specifying water levels.
        const hmap = map.version === 1 ? 'waterMap' : 'heightMap';
        const compensation = map.version === 1 ? 48 : 0;

        if (x < 0) x = 0;
        if (z < 0) z = 0;

        const cx = Math.floor(x / tileSize);
        const cy = Math.floor(z / tileSize);
        const dx = Math.floor(x % tileSize);
        const dy = Math.floor(z % tileSize);
     
        let h1 = map[hmap]![cy * mapSize + cx];
        let h2 = map[hmap]![cy * mapSize + cx +1];
        let h3 = map[hmap]![(cy + 1) * mapSize + cx +1];
        let h4 = map[hmap]![(cy + 1) * mapSize + cx];

        if (map.flagsMap![cy * mapSize + cx].fReverse) {
            if (256 - dx > dy)
                h3 = h2 + h4 - h1;
            else
                h1 = h2 + h4 - h3;
        } else {
            if (dx > dy) {
                h4 = h1 + h3 - h2;
            } else {
                h2 = h1 + h3 - h4;
            }
        }
     
        let h = 
            (h1 * (256 - dx) + h2 * dx) * (256 - dy) +
            (h4 * (256 - dx) + h3 * dx) * dy;
     
        return  (h / 256 / 256 - compensation) * map.yScale;
    }

    function getObjectH(x: number, y: number, R: number) {
        x = (x * map.tileSize) + map.tileSize / 2;
        y = (y * map.tileSize) + map.tileSize / 2;

        let hr, h;
        hr = getLandH(x,   y  );
        h  = getLandH(x+R, y  ); if (h < hr) hr = h;
        h  = getLandH(x-R, y  ); if (h < hr) hr = h;
        h  = getLandH(x,   y+R); if (h < hr) hr = h;
        h  = getLandH(x,   y-R); if (h < hr) hr = h;
        hr += 15;

        return  Math.floor(hr / map.yScale + 48);
    }

    function getLandQHNoObj(x: number, z: number) {  
        return Math.max(
            getLandH(x, z),
            getLandH(x-90, z-90),
            getLandH(x+90, z-90),
            getLandH(x-90, z+90),
            getLandH(x+90, z+90),
         
            getLandH(x+128, z),
            getLandH(x-128, z),
            getLandH(x, z+128),
            getLandH(x, z-128),
        );
    }

    return {
        map,
        rsc,
        landings,
        miniMap,
        getHeightAt: getLandQHNoObj,
        getLandQHNoObj,
        getLandH,
        getObjectH,
    };
}
