const fs = require('fs');
const path = require('path');

const md5 = require('md5');

const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;

const MAP = require('../kaitai/Map');
const RSC = require('../kaitai/Rsc');

const mapFname = process.argv[2];
const baseName = path.basename(mapFname, '.MAP');
const rscFname = mapFname.replace(/MAP$/, 'RSC');
const prjFname = mapFname.replace(/MAP$/, 'PRJ');

const filenames = JSON.parse(fs.readFileSync(path.join(__dirname, 'filenames.json'), 'utf8'));

const map = new MAP(new KaitaiStream(fs.readFileSync(mapFname)));
const rsc = new RSC(new KaitaiStream(fs.readFileSync(rscFname)), undefined, undefined, map.version);
const prj = fs.readFileSync(prjFname, 'utf8');

const textureNames = [];
const objectNames = [];
const randomNames = [];
const ambientNames = [];

function addFilename(name, data, type) {
    const chksum = md5(data);
    const idx = filenames[type].findIndex(file => file.name.toLowerCase() == name.toLowerCase());

    if (idx == -1) {
        filenames[type].push({ name, md5: chksum, count: 1 });
    } else {
        if (filenames[type][idx].md5 != chksum) {
            console.log(`${name}: md5 mismatch: ${filenames[type][idx].md5} != ${chksum}`)
        } else {
            filenames[type][idx].count++;
        }
    }
}

function parsePRJ() {
    prj.split('\n').forEach(line => {
        const l = line.trim();
        if (!l) return; // skip empty lines
        const t = l.match(/^Texture([0-9]+)=(.+$)/i);
        const o = l.match(/^Object([0-9]+)=(.+$)/i);
        const r = l.match(/^Random([0-9]+)=(.+$)/i);
        const a = l.match(/^Ambient([0-9]+)=(.+$)/i);
        if (t) {
            const index = parseInt(t[1], 10) -1;
            textureNames[index] = t[2];
            addFilename(t[2], rsc.textures[index].data, 'texture')
            //fs.writeFileSync(`${baseName}-tex-${t[2]}.raw`, rsc.textures[index].data);
        } else if (o) {
            const index = parseInt(o[1], 10) -1;
            //objectNames[index] = o[2];
        } else if (r) {
            const index = parseInt(r[1], 10) -1;
            randomNames[index] = r[2];
            //fs.writeFileSync(`${baseName}-random-${r[2]}.raw`, rsc.randomSounds[index].pcm);
            addFilename(r[2], rsc.randomSounds[index].pcm, 'random')
        } else if (a) {
            const index = parseInt(a[1], 10) -1;
            ambientNames[index] = a[2];
            addFilename(a[2], rsc.ambientSounds[index].pcm, 'ambient')
            //fs.writeFileSync(`${baseName}-ambient-${a[2]}.raw`, rsc.ambientSounds[index].pcm);
        } else {
            console.log(`Ignoring line '${l}'`);
        }
    })

    //console.log(filenames);
}

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
/*
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
*/

parsePRJ();
fs.writeFileSync(path.join(__dirname, 'filenames.json'), JSON.stringify(filenames, undefined, 2));