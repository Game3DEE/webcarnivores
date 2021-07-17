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
    
            position.push(vertices[a].x, vertices[a].y, vertices[a].z);
            uv.push(f.tax / 256, f.tay / 256);
            index.push(idx++);
            position.push(vertices[b].x, vertices[b].y, vertices[b].z);
            uv.push(f.tbx / 256, f.tby / 256);
            index.push(idx++);
            position.push(vertices[c].x, vertices[c].y, vertices[c].z);
            uv.push(f.tcx / 256, f.tcy / 256);
            index.push(idx++);
        });
    
        this.setAttribute('position', new Float32BufferAttribute(position, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uv, 2));
        this.setIndex(index);
        this.computeVertexNormals();
    }
}