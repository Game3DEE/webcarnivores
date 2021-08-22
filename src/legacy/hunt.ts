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

    const modelBounds: any[] = [];

    rsc.models?.forEach(m => {
        let modelBound = [];
        for (let o = 0; o < 8; o++) {
          let x1 = 0, x2 = 0, y1 = 0, y2 = 0, z1 = 0, z2 = 0;
          let first = true;
     
          for (let i = 0; i < m.model.vertices.length; i++) {
            const p = m.model.vertices[i];

            if (p.hide) continue;
            if (p.owner !== o) continue;
      
            if (first) {
              x1 = p.x - 1;
              x2 = p.x + 1;
              y1 = p.y - 1;
              y2 = p.y + 1;
              z1 = p.z - 1;
              z2 = p.z + 1;
              first = false;
            }
      
            if (p.x < x1) x1 = p.x;
            if (p.x > x2) x2 = p.x;
      
            if (p.y < y1) y1 = p.y;
            if (p.y > y2) y2 = p.y;
      
            if (p.z < z1) z1 = p.z;
            if (p.z > z2) z2 = p.z;
          }
      
          if (first) {
              modelBound.push({ a: -1 });
              continue;
          }
      
          x1 -= 72;
          x2 += 72;
          z1 -= 72;
          z2 += 72;
      
          modelBound.push({
              y1, y2,
              cx: (x1 + x2) / 2,
              cy: (z1 + z2) / 2,
              a: (x2 - x1) / 2,
              b: (z2 - z1) / 2,
          })      
        }

        modelBounds.push(modelBound);
    })

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

    function getLandOH(x: number, z: number) {
        return map.objectHeightMap[z * map.mapSize + x] * map.yScale;
    }

    function pointOnBound(px: number, py: number, cx: number, cy: number, oy: number, bound: any[], angle: number) {
      px -= cx;
      py -= cy;
    
      let ca = Math.cos(angle * Math.PI / 2);
      let sa = Math.sin(angle * Math.PI / 2);
    
      let _on = false;
      let H = -1000;
    
      for (let o=0; o < 8; o++) {
        if (bound[o].a < 0) continue;
        if (bound[o].y2 + oy > PlayerY + 128) continue;
    
        let a,b;
        let ccx = bound[o].cx * ca + bound[o].cy*sa;
        let ccy = bound[o].cy * ca - bound[o].cx*sa;
    
        if (angle & 1) {
          a = bound[o].b;
          b = bound[o].a;
        } else {
          a = bound[o].a;
          b = bound[o].b;
        }
    
        if (Math.abs(px - ccx) < a && Math.abs(py - ccy) < b) {
          _on = true;
          if (H < bound[o].y2) H = bound[o].y2;
        }
      }
    
      return _on ? H : Number.MIN_SAFE_INTEGER;
    }
    

    function GetLandQH(CameraX: number, CameraZ: number) {    
      let h = getLandH(CameraX, CameraZ);
      let hh = getLandH(CameraX - 90, CameraZ - 90);
      if (hh > h) h = hh;
      hh = getLandH(CameraX + 90, CameraZ - 90);
      if (hh > h) h = hh;
      hh = getLandH(CameraX - 90, CameraZ + 90);
      if (hh > h) h = hh;
      hh = getLandH(CameraX + 90, CameraZ + 90);
      if (hh > h) h = hh;
    
      hh = getLandH(CameraX + 128, CameraZ);
      if (hh > h) h=hh;
      hh = getLandH(CameraX - 128, CameraZ);
      if (hh > h) h=hh;
      hh = getLandH(CameraX, CameraZ + 128);
      if (hh > h) h=hh;
      hh = getLandH(CameraX, CameraZ - 128);
      if (hh > h) h=hh;
    
      let ccx = Math.floor(CameraX / 256);
      let ccz = Math.floor(CameraZ / 256);
    
      for (let z=-4; z<=4; z++) {
        for (let x=-4; x<=4; x++) {
            let ob = map.objectMap[(ccz + z) * map.mapSize + ccx + x];
          if (ob < 254) {
            let CR = rsc.models![ob].radius - 1;
    
            let oz = (ccz+z) * 256 + 128;
            let ox = (ccx+x) * 256 + 128;
    
            let LandY = getLandOH(ccx+x, ccz+z);
    
            if (!(map.objectMap[ob].fBound)) {
              if (map.objectMap[ob].yHi + LandY < h) continue;
              if (map.objectMap[ob].yHi + LandY > PlayerY+128) continue;
              //if (MObjects[ob].info.YLo + LandY > PlayerY+256) continue;
            }
    
            let r = CR+1;
    
            if (map.objectMap[ob].fBound)
            {
              let oh = 0;
              if ((oh=pointOnBound(CameraX, CameraZ, ox, oz, LandY, modelBounds[ob], map.flagsMap![(ccz + z) * map.mapSize + ccx + x].fModelDirection)) !== Number.MIN_SAFE_INTEGER )
                if (h < LandY + oh) h = LandY + oh;
            }
            else
            {
              if (map.objectMap[ob].fCircle)
                r = Math.sqrt( (ox-CameraX)*(ox-CameraX) + (oz-CameraZ)*(oz-CameraZ) );
              else
                r = Math.max( Math.abs(ox-CameraX), Math.abs(oz-CameraZ) );
    
              if (r<CR) h = map.objectMap[ob].yHi + LandY;
            }
    
          }
        }
    }

      return h;
    }
    

    function checkBoundCollision(p: Vector3, cx: number, cy: number, oy: number, model: number, angle: number) {
        let ppx = p.x - cx;
        let ppy = p.y - cy;

        let ca = Math.cos(angle * Math.PI / 2);
        let sa = Math.sin(angle * Math.PI / 2);
        let w, h;

        const bound = modelBounds[model];

        for (let o = 0; o < 8; o++) {
            if (bound[o].a < 0) continue;

            if (bound[o].y2 + oy < p.y + 128) continue;
            if (bound[o].y1 + oy > p.y + 256) continue;

            let ccx = bound[o].cx * ca + bound[o].cy * sa;
            let ccy = bound[o].cy * ca - bound[o].cx * sa;

            if (angle & 1) {
                w = bound[o].b +2;
                h = bound[o].a +2;
            } else {
                w = bound[o].a +2;
                h = bound[o].b +2;
            }

            let dw = Math.abs(ppx - ccx) - w;
            let dh = Math.abs(ppy - ccy) - h;

            if ( (dw > 0) || (dh > 0) ) continue;

            if (dw > dh) {
                p.x = cx + ccx + w * Math.sign(ppx - ccx);
            } else {
                p.y = cy + ccy + h * Math.sign(ppy - ccy);
            }
        }
    }

    function checkCollision(v: Vector3) {
        if (v.x < 36 * 256) v.x = 36 * 256;
        if (v.z < 36 * 256) v.z = 36 * 256;
        if (v.x > 980 * 256) v.x = 980 * 256;
        if (v.z > 980 * 256) v.z = 980 * 256;
        let ccx = Math.floor(v.x / 256);
        let ccz = Math.floor(v.z / 256);

        if (!rsc.models) return;

        for (let z = -4; z <= 4; z++) {
            for (let x = -4; x <= 4; x++) {
                const ob = map.objectMap[(ccz + z) * map.mapSize + ccx + x];
                if (ob < 254) {
                    const model = rsc.models[ob];
                    let CR = model.radius * 2; // TODO: do on load
    
                    let oz = (ccz + z) * 256 + 128;
                    let ox = (ccx + x) * 256 + 128;
    
                    let LandY = getLandOH(ccx + x, ccz + z);
    
                    if (!model.fBound) {
                        if (model.yHi * 2 + LandY < v.y + 128) continue;
                        if (model.yLo * 2 + LandY > v.y + 256) continue;
                    }
    
                    if (model.fBound) {
                        checkBoundCollision(v, ox, oz, LandY, ob, map.flagsMap![(ccz + z) * map.mapSize + ccx + x].fModelDirection);
                    } else if (model.fCircle) {
                        let r = Math.sqrt((ox - v.x) * (ox - v.x) + (oz - v.z) * (oz - v.z));
                        if (r < CR) {
                            v.x = v.x - (ox - v.x) * (CR - r) / r;
                            v.z = v.z - (oz - v.z) * (CR - r) / r;
                        }
                    } else {
                        let r = Math.max(Math.abs(ox - v.x), Math.abs(oz - v.z));
                        if (r < CR) {
                            if (Math.abs(ox - v.x) > Math.abs(oz - v.z))
                                v.x = v.x - (ox - v.x) * (CR - r) / r;
                            else
                                v.z = v.z - (oz - v.z) * (CR - r) / r;
                        }
                    }
                }
            }
        }
    
        /* TROPHY MODE ONLY
        if (!TrophyMode) return;
    
        for (let c = 0; c < ChCount; c++) {
            let px = Characters[c].pos.x;
            let pz = Characters[c].pos.z;
            let CR = DinoInfo[Characters[c].CType].Radius;
            let r = Math.sqrt((px - cx) * (px - cx) + (pz - cz) * (pz - cz));
            if (r < CR) {
                cx = cx - (px - cx) * (CR - r) / r;
                cz = cz - (pz - cz) * (CR - r) / r;
            }
        }
        */
    }

    return {
        map,
        rsc,
        landings,
        miniMap,
        checkCollision,
        getLandQHNoObj,
        getLandH,
        getObjectH,
        getLandOH,
    };
}
