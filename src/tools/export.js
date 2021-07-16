const fs = require('fs');
const path = require('path');

const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;

const MAP = require('../kaitai/Map');
const RSC = require('../kaitai/Rsc');

const mapFname = process.argv[2];
const baseName = path.basename(mapFname, '.MAP');
const rscFname = mapFname.replace(/MAP$/, 'RSC');

const map = new MAP(new KaitaiStream(fs.readFileSync(mapFname)));
const rsc = new RSC(new KaitaiStream(fs.readFileSync(rscFname)), undefined, undefined, map.version);

function exportTexture(texData, texName, width, height) {
    const png = new PNG({
        width,
        height,
    });

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = y * width + x;
            const pixel = texData[i];
            let r = ((pixel >> 10) & 0x1f) << 3;
            let g = ((pixel >>  5) & 0x1f) << 3;
            let b = ((pixel >>  0) & 0x1f) << 3;

            png.data[i*4+0] = r;
            png.data[i*4+1] = g;
            png.data[i*4+2] = b;
            png.data[i*4+3] = 0xff;
        }
    }
    fs.writeFileSync(texName, PNG.sync.write(png));
}

function exportMap(map, pngName, mapDim) {
    const png = new PNG({
        width: mapDim,
        height: mapDim,
    });

    for (let y = 0; y < mapDim; y++) {
        for (let x = 0; x < mapDim; x++) {
            const i = y * mapDim + x;
            const height = map[i];
            png.data[i*4+0] = height;
            png.data[i*4+1] = height;
            png.data[i*4+2] = height;
            png.data[i*4+3] = 0xff;
        }
    }
    fs.writeFileSync(pngName, PNG.sync.write(png));
}

function exportModel(model, modelBaseName) {
    let tree = {
        position: [0,0,0],
        children: [],
    };
    console.log(modelBaseName, model.nodes)
}

exportMap(map.heightMap, `${baseName}-hm.png`, map.mapSize);
exportMap(map.waterMap, `${baseName}-wm.png`, map.mapSize);
exportMap(map.dayLightMap, `${baseName}-day-lm.png`, map.mapSize);
if (map.version == 2) {
    exportMap(map.dawnLightMap, `${baseName}-dawn-lm.png`, map.mapSize);
    exportMap(map.nightLightMap, `${baseName}-night-lm.png`, map.mapSize);
}
exportMap(rsc.cloudsMap, `${baseName}-clouds.png`, 128);

exportTexture(rsc.daySkyTexture, `${baseName}-day-sky.png`, 256, 256);
if (map.version == 2) {
    exportTexture(rsc.dawnSkyTexture, `${baseName}-dawn-sky.png`, 256, 256);
    exportTexture(rsc.nightSkyTexture, `${baseName}-night-sky.png`, 256, 256);
}
rsc.models.forEach((model, modelIdx) => {
    //exportModel(model, `model-${modelIdx}`);
})

