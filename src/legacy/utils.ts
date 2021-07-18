import { DataTexture, RGBAFormat, UnsignedShort5551Type } from "three";

export function createTexture(texData: Uint8Array, width: number, height: number, useAlpha: boolean = true) {
    let data = new Uint16Array(width * height);
    let offset = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const j = y * width + x;
        let pixel = (texData[j*2+1] << 8) | texData[j*2];
        let r = ((pixel >> 10) & 0x1f);
        let g = ((pixel >>  5) & 0x1f);
        let b = ((pixel >>  0) & 0x1f);
        let a = useAlpha ? (pixel ? 1 : 0) : 1;
        data[offset++] = (r << 11) + (g << 6) + (b << 1) | a;
      }
    }
  
    const tex = new DataTexture(
        data, width, height,
        RGBAFormat, UnsignedShort5551Type,
    );
    tex.needsUpdate = true;
    return tex;
  }
