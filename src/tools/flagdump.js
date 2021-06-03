const fs = require('fs');
const path = require('path');

const MAP = require('../kaitai/carnivores_map');
const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;

const mapFname = process.argv[2];
const baseName = path.basename(mapFname, '.MAP');

const map = new MAP(new KaitaiStream(fs.readFileSync(mapFname)));

// colorType is 0 for grayscale (default), 2 for rgb, no alpha, 6 for rgb, with alpha
function dumpFlagImage(pngName, mapDim, getPixValue, colorType = 0) {
    const png = new PNG({
        colorType,
        width: mapDim,
        height: mapDim,
    });

    for (let y = 0; y < mapDim; y++) {
        for (let x = 0; x < mapDim; x++) {
            const i = y * mapDim + x;
            const pix = getPixValue(i,x,y);
            png.data[i*4+0] = Array.isArray(pix) ? pix[0] : pix;
            png.data[i*4+1] = Array.isArray(pix) ? pix[1] : pix;
            png.data[i*4+2] = Array.isArray(pix) ? pix[2] : pix;
            png.data[i*4+3] = 0xff;
        }
    }
    fs.writeFileSync(pngName, PNG.sync.write(png));
}

// Dump bit 0/1 into 2bit color image (iso 1)
// TDirection: texture direction
dumpFlagImage(`${baseName}-B0-B1.png`, map.mapSize,
    mIdx => ((map.flagsMap[mIdx] & 2) | (map.flagsMap[mIdx] & 1)) * (255/3)  );

// If this is a Carnivores (1) map...
if (map.isV1) {
    // dump rest of the bits (all unknown, so single bits)
    for (let i = 2; i < 8; i++) {
        dumpFlagImage(`${baseName}-B${i}.png`, map.mapSize,
            mIdx => (map.flagsMap[mIdx] & (1 << i)) ? 0xff : 0);
    }
} else {
    // For Carnivores 2 & IceAge we have more 2bit color images to generate

    // Bit 2/3: object rotation
    dumpFlagImage(`${baseName}-B2-B3.png`, map.mapSize,
        mIdx => {
            const val = (map.flagsMap[mIdx] >> 2) & 3;
            return val * (255/3);
        }
    );

    // Bit 8/9: object rotation
    dumpFlagImage(`${baseName}-B8-B9.png`, map.mapSize,
        mIdx => {
            const val = (map.flagsMap[mIdx] >> 2) & 3;
            return val * (255/3);
        }
    );

    // Now dump single bits
    for (let i = 4; i < 15; i++) {
        // skip our bit 8/9 combo, as we already dumped them
        if (i == 8 || i == 9) continue;

        dumpFlagImage(`${baseName}-B${i}.png`, map.mapSize,
            mIdx => (map.flagsMap[mIdx] & (1 << i)) ? 0xff : 0);
    }
}
