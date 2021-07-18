import { BufferGeometry, Float32BufferAttribute } from "three"

export default class C3DFGeometry extends BufferGeometry {
    constructor(c3dfObject: any) {
        super();

        const { faces, vertices } = c3dfObject;

        let position: number[] = [];
        let uv: number[] = [];
        let index: number[] = [];
        let idx = 0;
        faces.forEach((f: any) => {
            let a = f.v1, b = f.v2, c = f.v3;
    
            // *2 taken from LoadModel from original code
            position.push(vertices[a].x * 2, vertices[a].y * 2, vertices[a].z * 2);
            uv.push(f.tax / 256, f.tay / 256);
            index.push(idx++);
            position.push(vertices[b].x * 2, vertices[b].y * 2, vertices[b].z * 2);
            uv.push(f.tbx / 256, f.tby / 256);
            index.push(idx++);
            position.push(vertices[c].x * 2, vertices[c].y * 2, vertices[c].z * 2);
            uv.push(f.tcx / 256, f.tcy / 256);
            index.push(idx++);
        });
    
        this.setAttribute('position', new Float32BufferAttribute(position, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uv, 2));
        this.setIndex(index);
        this.computeVertexNormals();
    }
}