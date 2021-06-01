const fs = require('fs');
const path = require('path');

const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;

const MAP = require('../kaitai/carnivores1_map');
const RSC = require('../kaitai/carnivores1_rsc');

const mapFname = process.argv[2];
const baseName = path.basename(mapFname, '.MAP');
const rscFname = mapFname.replace(/MAP$/, 'RSC');

const map = new MAP(new KaitaiStream(fs.readFileSync(mapFname)));
const rsc = new RSC(new KaitaiStream(fs.readFileSync(rscFname)));

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
exportMap(map.lightMap, `${baseName}-lm.png`, map.mapSize);

rsc.models.forEach((model, modelIdx) => {
    //exportModel(model, `model-${modelIdx}`);
})

