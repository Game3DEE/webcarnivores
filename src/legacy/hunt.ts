// Legacy file, feel free to move code out.
// It should turn into CPC(Load).ts, only
// handling loading the MAP/RSC file and
// compensating for any C1/C2 differences
// where necessary.
import KaitaiStream from 'kaitai-struct/KaitaiStream';
import {
    Vector3,
} from 'three';

import MAP from '../kaitai/Map';
import RSC from '../kaitai/Rsc';

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

    const landings = getLandings(map);

    function getLandH(x: number, z: number) {
        const { tileSize, mapSize } = map;

        // XXX problem for C1/C2 compatibility!
        // C1: waterMap has water "floor" heights, while heightmap has water "level" heights
        // C2: heightMap has water "floor" heights, waterMap contains indices into water table
        //     specifying water levels.
        const hmap = map.version == 1 ? 'waterMap' : 'heightMap';
        const compensation = map.version == 1 ? 48 : 0;

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
        getHeightAt: getLandQHNoObj,
    };
}
