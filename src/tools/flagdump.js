const fs = require('fs');
const path = require('path');

const MAP = require('../kaitai/carnivores_map');
const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;


const mapFname = process.argv[2];
const baseName = path.basename(mapFname, '.MAP');

const map = new MAP(new KaitaiStream(fs.readFileSync(mapFname)));

function dumpFlagImage(bitVal, map, pngName, mapDim) {
    const png = new PNG({
        colorType: 0,
        width: mapDim,
        height: mapDim,
    });

    for (let y = 0; y < mapDim; y++) {
        for (let x = 0; x < mapDim; x++) {
            const i = y * mapDim + x;
            const pix = (map[i] & bitVal) ? 0xff : 0;
            png.data[i*4+0] = pix;
            png.data[i*4+1] = pix;
            png.data[i*4+2] = pix;
            png.data[i*4+3] = 0xff;
        }
    }
    fs.writeFileSync(pngName, PNG.sync.write(png));
}

const numBits = map.isV1 ? 8 : 16;
for (let i = 0; i < numBits; i++) {
    dumpFlagImage(1 << i, map.flagsMap, `${i}-${baseName}.png`, map.mapSize)
}
