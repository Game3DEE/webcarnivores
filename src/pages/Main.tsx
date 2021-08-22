import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { Loader, Texture } from 'three';
import { BMPLoader } from '../legacy/BMPLoader';

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

interface MenuArea {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
};

interface MenuMap {
    map: Uint8ClampedArray; // 400x300 map of IDs [0 = none, 1..x = highlite area]
    areas: MenuArea[]; // rectangles for IDs from map, element 0 whole screen
}

const MAP_WIDTH = 400;
const MAP_HEIGHT = 300;

class RawLoader extends Loader {
    load(
        url: string,
        onLoad: (menuMap: MenuMap) => void,
        onProgress: (event: ProgressEvent) => void, // XXX no progress support yet
        onError: (event: Error | ErrorEvent ) => void,
     ) {
         fetch(url).then(body => body.arrayBuffer()).then(buffer => {
             onLoad( this.parse(buffer) );
         }).catch(e => {
             onError(e);
         })
    }

    parse(buffer: ArrayBuffer): MenuMap {
        const map = new Uint8ClampedArray(buffer);
        const areas: MenuArea[] = [];
        const minX : number[] = [];
        const maxX : number[] = [];
        const minY : number[] = [];
        const maxY : number[] = [];
        
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                let val = map[y * MAP_WIDTH + x];
                if (minX[val] !== undefined) minX[val] = Math.min(x, minX[val]); else minX[val] = x;
                if (maxX[val] !== undefined) maxX[val] = Math.max(x, maxX[val]); else maxX[val] = x;
                if (minY[val] !== undefined) minY[val] = Math.min(y, minY[val]); else minY[val] = y;
                if (maxY[val] !== undefined) maxY[val] = Math.max(y, maxY[val]); else maxY[val] = y;
            }
        }

        minX.forEach((_, idx) => {
            areas.push({
                id: idx,
                x: minX[idx],
                y: minY[idx],
                width: maxX[idx] - minX[idx] +1,
                height: maxY[idx] - minY[idx] +1,
            });
        })

        return {
            map,
            areas,
        };
    }
};

function texToImageData(tex: Texture) {
    const data = new Uint8ClampedArray(
        tex.image.data.buffer,
        tex.image.data.byteOffset,
        tex.image.data.length);
    return new ImageData(data, tex.image.width, tex.image.height);
}

// EXIT.TGA => in-game exit dialog
// PAUSE.TGA => in-game pause dialog
// MAPFRAME.TGA => in-game map frame (to render minimap in)
// MENUS.TGA => statistics menu image (full screen)
// SPLASH.TGA => fullscreen image
// TROPHY_E.TGA => "press ESC to exit trophy"
// TROPHY_G.TGA => trophy info frame?
// TROPHY.TGA => trophy info dialog frame

// CREDITS.TGA => Credits screen
// MENUR{,_ON}.TGA => please register screen (MR_MAP.RAW)
// MENUD{,_ON}.TGA => delete profile popup (MD_MAP.RAW)
// MENUL{,_ON}.TGA => accept disclaimer popup (ML_MAP.RAW)
// MENUM{,_ON}.TGA => main menu (MAIN_MAP.RAW)
// OPT_{ON,OFF}.TGA => Option menu (OPT_MAP.RAW)
// LOC_{ON,OFF}.TGA => Hunt: Location selection (LOC_MAP.RAW)
// WEP_{ON,OFF}.TGA => Hunt: Weapon selection (WEP_MAP.RAW)

function RegisterMenu() {
    const mainOff = texToImageData(useLoader(TGALoader, 'HUNTDAT/MENU/OPT_OFF.TGA'));
    const mainOn = texToImageData(useLoader(TGALoader, 'HUNTDAT/MENU/OPT_ON.TGA'));
    const mainMap = useLoader(RawLoader, 'HUNTDAT/MENU/OPT_MAP.RAW');
    const test = useLoader(BMPLoader, 'HUNTDAT/MENU/LANDPIC/AREA1.BMP');
    let context = React.useRef<CanvasRenderingContext2D | null>(null);
    let highlitedId = -1;

    function getId(x: number, y: number) {
        let id = mainMap.map[((y * MAP_WIDTH) + x)];
        if (id) {
            return mainMap.areas[id];
        }

        return null;
    }

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext('2d')
            if (context.current) {
                context.current.putImageData(mainOff, 0, 0);
            }
        }
    });

    const mouseMove: React.MouseEventHandler = ev => {
        const hovered = getId(Math.floor(ev.clientX / 2), Math.floor(ev.clientY / 2));
        //console.log(`hovered: ${hovered?.id}`, ev.clientX, ev.clientY);
        if (context.current && highlitedId !== hovered?.id) {          
            if (highlitedId > 0) {
                console.log(`off ${highlitedId}`)
                const prev = mainMap.areas[highlitedId];
                context.current.putImageData(mainOff, 0, 0, 
                    prev.x * 2, prev.y * 2, prev.width * 2, prev.height * 2);
            }
            if (hovered) {
                console.log(`on ${hovered.id}`)
                context.current.putImageData(mainOn, 0, 0, 
                    hovered.x * 2, hovered.y * 2, hovered.width * 2, hovered.height * 2);

                highlitedId = hovered.id;
            } else {
                highlitedId = -1;
            }
        }
    }
    const mouseDown: React.MouseEventHandler = ev => {
        console.log('mouseDown', ev)
    }
    const keyDown: React.KeyboardEventHandler = ev => {
        console.log('keyDown', ev)
    };

    return (
        <div
            style={{position: 'relative'}}
        >
        <canvas
            style={{height: '100%', width: 'auto' }}
            ref={canvasRef}
            width="800" height="600"
            onMouseMove={mouseMove}
            onMouseDown={mouseDown}
            onKeyDown={keyDown}
        />
        </div>
    );
}

export default function Main() {
    return (
        <React.Suspense fallback={null}>
            <RegisterMenu/>
        </React.Suspense>
    )
}
