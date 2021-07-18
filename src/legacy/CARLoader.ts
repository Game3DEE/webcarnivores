import {
    BufferGeometry,
    DoubleSide,
    Float32BufferAttribute,
    Loader,
    LoadingManager,
    MeshBasicMaterial,
} from 'three'

import {
    MorphBlendMesh
} from 'three/examples/jsm/misc/MorphBlendMesh';

import CAR from '../kaitai/Car';
import KaitaiStream from 'kaitai-struct/KaitaiStream';
import { createTexture } from './utils';

export default class CARLoader extends Loader {
	constructor(manager?: LoadingManager) {
		super(manager);
	}

    load(
        url: string,
        onLoad: (character: MorphBlendMesh) => void,
        onProgress: (event: ProgressEvent) => void, // XXX no progress support yet
        onError: (event: Error | ErrorEvent ) => void,
     ) {
         fetch(url).then(body => body.arrayBuffer()).then(buffer => {
             onLoad( this.parse(buffer) );
         }).catch(e => {
             onError(e);
         })
    }

    parse(buffer: ArrayBuffer) {
        const car = new CAR(new KaitaiStream(buffer));
        const frames = car.animations!.flatMap(a => a.frames);
        const morphVertices = new Array(frames.length);
        let position: number[] = [];
        let uv: number[] = [];

        const { faces, vertices } = car;

        for (let i = 0; i < frames.length; i++) {
            morphVertices[i] = new Array<number>();
        }

        function addVert(origVIdx: number, u: number, v: number) {
            let { x, y, z } = vertices![origVIdx];
            // *2 taken from LoadCharacterInfo from original code
            x *= 2; y *= 2; z *= 2;
            position.push(x, y, z);
            uv.push(u, v);

            frames.forEach((frame,idx) => {
                morphVertices[idx].push(
                    frame.vertices[origVIdx].x * 2, // these are already converted
                    frame.vertices[origVIdx].y * 2, //    from short to float
                    frame.vertices[origVIdx].z * 2,
                )
            })
        }

        faces!.forEach((f: any) => {
            let a = f.v1, b = f.v2, c = f.v3;
            addVert(a, f.tax / 256, f.tay / 256);
            addVert(b, f.tbx / 256, f.tby / 256);
            addVert(c, f.tcx / 256, f.tcy / 256);
        });
      
        // Setup basic model geo data
        let geo = new BufferGeometry();
        geo.setAttribute('position', new Float32BufferAttribute(position, 3));
        geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));

        // Add animation data
        geo.morphAttributes.position = [];
        let globalFrameIndex = 0;
        car.animations?.forEach(anim => {
            let name = anim.name;
            anim.frames.forEach((_: any, frIdx: number) => {
                const attr = new Float32BufferAttribute(morphVertices[globalFrameIndex], 3);
                attr.name = `${name}.${frIdx}`;
                geo.morphAttributes.position.push(attr);
                ++globalFrameIndex;
            })
        })

        let mat = new MeshBasicMaterial({
            map: createTexture(car.textureData, car.textureWidth, car.textureHeight, false),
            side: DoubleSide,
            morphTargets: true,
        })

        let mesh = new MorphBlendMesh(geo, mat);

        // Create animation clips
        globalFrameIndex = 0;
        car.animations?.forEach(anim => {
            mesh.createAnimation(anim.name, globalFrameIndex, globalFrameIndex + anim.frameCount -1, anim.framesPerSecond);
            globalFrameIndex += anim.frameCount;
        })

        return mesh;
    }
}