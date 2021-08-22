// https://en.wikipedia.org/wiki/BMP_file_format

import {
    DataTextureLoader,
    LinearMipmapLinearFilter,
} from 'three';

const kBMSignature = 0x4d42; // LE encoded 'BM'

class BMPLoader extends DataTextureLoader {
    parse( buffer ) {
        const view = new DataView(buffer);
        if (view.getUint16(0, true) !== kBMSignature) {
            throw new Error("Invalid BMP signature");
        }

        const fileSize = view.getUint32(2, true);
        const imageDataOffset = view.getUint32(10, true);

        const headerSize = view.getUint32(14, true);
        if (headerSize !== 40) { // BITMAPINFOHEADER
            throw new Error(`Unsupported DIB header size ${headerSize} in BMP`)
        }

        const imageWidth = view.getInt32(18, true);
        const imageHeight = view.getInt32(22, true);
        const colorPlanes = view.getUint16(26, true); // must be 1
        if (colorPlanes !== 1) {
            throw new Error(`Unsupported number of color planes ${colorPlanes} in BMP`)
        }
        const bitsPerPixel = view.getUint16(28, true);
        const compressionMethod = view.getUint32(30, true);
        if (compressionMethod !== 0) {
            throw new Error(`Unsupported compression method ${compressionMethod} in BMP`)
        }
        const paletteColorCount = view.getUint32(46, true);

        console.log(imageWidth, imageHeight, bitsPerPixel, paletteColorCount, fileSize, imageDataOffset);

		return {
			data: new Uint8ClampedArray(),
			width: imageWidth,
			height: imageHeight,
			flipY: true,
			generateMipmaps: true,
			minFilter: LinearMipmapLinearFilter,
		};
    }
}

export { BMPLoader };