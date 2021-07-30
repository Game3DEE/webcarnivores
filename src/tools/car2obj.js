const fs = require('fs');
const path = require('path');

const KaitaiStream = require('kaitai-struct').KaitaiStream;
const PNG = require('pngjs').PNG;

const CAR = require('../kaitai/car.js');

const fname = process.argv[2];
const baseName = path.basename(fname.toLowerCase(), '.car');

const car = new CAR(new KaitaiStream(fs.readFileSync(fname)));

const toolStr = '# Converted from CAR by CarDump\n'

let vStr = '';
for (let i = 0; i < car.vertCount; i++) {
    const v = car.vertices[i];
    vStr += `v ${v.x} ${v.y} ${v.z}\n`;
}

let fStr = '';
for (let i = 0; i < car.faceCount; i++) {
    const f = car.faces[i];
    fStr += `f ${f.v1+1} ${f.v2+1} ${f.v3+1}\n`;
}

fs.writeFileSync(`${baseName}.obj`, toolStr + `# Main model\n` + vStr + fStr);

for (let i = 0; i < car.animationCount; i++) {
    const a = car.animations[i];
    for (let j = 0; j < a.frameCount; j++) {
        let avStr = `# Animation '${a.name}' (${i+1}/${car.animationCount}) frame ${j+1}/${a.frameCount}\n`;
        for (let k = 0; k < car.vertCount; k++) {
            const frIdx = (j * car.vertCount + k) * 3;
            avStr += `v ${a.data[frIdx] / 16} ${a.data[frIdx+1] / 16} ${a.data[frIdx+2] / 16}\n`;
        }
        fs.writeFileSync(`${baseName}-a${i}-f${j}.obj`, toolStr + avStr + fStr)
    }
}