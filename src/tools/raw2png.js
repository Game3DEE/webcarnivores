const fs = require('fs');
const path = require('path');

const fname = process.argv[2];
const baseName = path.basename(fname, '.RAW');
const PNG = require('pngjs').PNG;

const buf = fs.readFileSync(fname);

const palette = [
    [ 0, 0, 0],   // black
    [ 255, 0, 0], // red
    [ 0, 255, 0], // green
    [ 0, 0, 255], // blue
    [ 255, 255, 0 ], // 
    [ 255, 0, 255 ], // 
    [ 0, 255, 255 ], // 
    [ 64, 64, 64 ], // grey
    [ 255, 255, 255 ], // white
];

let png = new PNG({
    width: 400,
    height: 300,
});
for (let i = 0; i < png.width * png.height; i++) {
    let val = buf[i];
    if (val >= palette.length) {
        console.log(`ID out of range: ${val} >= ${palette.length}; please enlarge palette`);
        val = 0;
    }
    png.data[i * 4 + 0] = palette[val][0];
    png.data[i * 4 + 1] = palette[val][1];
    png.data[i * 4 + 2] = palette[val][2];
    png.data[i * 4 + 3] = 255;
}

fs.writeFileSync(`${baseName}.png`, PNG.sync.write(png));
