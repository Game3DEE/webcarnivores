import {
    BufferGeometry,
    DoubleSide,
    Float32BufferAttribute,
    Loader,
    Mesh,
    MeshBasicMaterial,
} from 'three'

import C3DF from '../kaitai/C3df';
import KaitaiStream from 'kaitai-struct/KaitaiStream';
import { createTexture } from './utils';

export default class C3DFLoader extends Loader {
    load(
        url: string,
        onLoad: (character: Mesh) => void,
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
        const c3dfObject = new C3DF(new KaitaiStream(buffer));
        return this._parse(c3dfObject);
    }

    _parse(c3dfObject: any) {
        const { faces, vertices } = c3dfObject;

        let position: number[] = [];
        let uv: number[] = [];
        faces.forEach((f: any) => {
            let a = f.v1, b = f.v2, c = f.v3;
            // *2 taken from LoadModel from original code
            position.push(vertices![a].x * 2, vertices![a].y * 2, vertices![a].z * 2);
            uv.push(f.tax / 256, f.tay / 256);
            position.push(vertices![b].x * 2, vertices![b].y * 2, vertices![b].z * 2);
            uv.push(f.tbx / 256, f.tby / 256);
            position.push(vertices![c].x * 2, vertices![c].y * 2, vertices![c].z * 2);
            uv.push(f.tcx / 256, f.tcy / 256);
        });
    
        const geo = new BufferGeometry();
        geo.setAttribute('position', new Float32BufferAttribute(position, 3));
        geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
        geo.computeVertexNormals();

        const map = createTexture(c3dfObject.textureData, c3dfObject.textureWidth, c3dfObject.textureHeight, true);
        const material = new MeshBasicMaterial({ map, side: DoubleSide, alphaTest: 0.5, transparent: true });

        return new Mesh(geo, material);
    }
}
