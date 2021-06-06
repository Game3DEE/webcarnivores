import React from 'react'

import KaitaiStream from 'kaitai-struct/KaitaiStream';
import MAP from '../kaitai/carnivores_map';
import Canvas from '../components/Canvas';

const generateHeightmap = (map: any, field: string) => {
    let imageData = new ImageData(map.mapSize, map.mapSize);
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        imageData.data[i*4+0] = map[field][i];
        imageData.data[i*4+1] = map[field][i];
        imageData.data[i*4+2] = map[field][i];
        imageData.data[i*4+3] = 0xff;
    }
    return imageData;
}

const generateFlagsMap = (map: any, r: number, g: number, b: number) => {
    let imageData = new ImageData(map.mapSize, map.mapSize);
    const bitToColorChannel = (flags: number, bit: number) => ((flags & (1 << bit)) !== 0 ? 0 : 255);
    for (let i = 0; i < map.mapSize * map.mapSize; i++) {
        let val = map.flagsMap[i];
        imageData.data[i*4+0] = r !== -1 ? bitToColorChannel(val, r) : 0;
        imageData.data[i*4+1] = g !== -1 ? bitToColorChannel(val, g) : 0;
        imageData.data[i*4+2] = b !== -1 ? bitToColorChannel(val, b) : 0;
        imageData.data[i*4+3] = 0xff;
    }
    return imageData;
}

interface BitSelectProps {
    bitCount: number;
    value: number;
    onChange: (bit: number) => void;
}

const BitSelect: React.FC<BitSelectProps> = ({
    value = 0,
    bitCount = 8,
    onChange,
}) => {
    return (
        <select value={value} onChange={event => onChange(parseFloat(event.target.value))}>
            <option value="-1">n/a</option>
            {new Array(bitCount).fill(0).map((_,i) => (
                <option key={i} value={i}>bit {i}</option>
            ))}
        </select>
    )
}

export default function MapEditor() {
    const [ map, setMap ] = React.useState<any>(null);
    const [ mapName, setMapName ] = React.useState<string|null>(null);
    const [ bitR, setBitR ] = React.useState(-1);
    const [ bitG, setBitG ] = React.useState(-1);
    const [ bitB, setBitB ] = React.useState(-1);
    const [ mode, setMode ] = React.useState(1);

    function dragOver(ev: React.DragEvent) {
        ev.preventDefault();
    } 

    function drop(ev: React.DragEvent) {
        ev.preventDefault();
        if (ev.dataTransfer.files?.length) {
            const mapName = ev.dataTransfer.files[0].name;
            const url = URL.createObjectURL(ev.dataTransfer.files[0]);
            // fetch URL (retrieves local file, no physical network involved)
            fetch(url).then(body => body.arrayBuffer()).then(buf => {
                // Create KaitaiStream and load map
                const map = new MAP(new KaitaiStream(buf));
                setMapName(mapName);
                setMap(map);
            });
        }
    }

    const getImageData = () => {
        let imageData: ImageData | undefined;

        switch(mode) {
            case 0: // Flags
                imageData = generateFlagsMap(map, bitR, bitG, bitB);
                break;

            case 1: // Heightmap
                imageData = generateHeightmap(map, 'heightMap');
                break;

            case 2: // Watertmap
                imageData = generateHeightmap(map, 'waterMap');
                break;
        }

        return imageData;
    }

    const drawMapContent = (ctx: CanvasRenderingContext2D) => {
        const imageData = getImageData();
        if (imageData) {
            ctx.putImageData(imageData, 0, 0);
        }
    }

    const downloadImageData = () => {
        const imageData = getImageData();
        if (imageData) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.canvas.width = imageData.width;
                ctx.canvas.height = imageData.height;
                ctx.putImageData(imageData, 0, 0);
                var dataImage = canvas.toDataURL("image/png");

                let name: string = mapName?.replace(/\.MAP$/i, '') || '';
                switch(mode) {
                    case 0:
                        name += `-r${bitR}g${bitG}b${bitB}.png`;
                        break;
                    case 1: 
                        name += '-height.png';
                        break;
                    case 2: 
                        name += '-water.png';
                        break;
                }

                const link = document.createElement('a');
                link.setAttribute('download', name);
                link.setAttribute('href', dataImage.replace("image/png", "image/octet-stream"));
                link.click();
            }
        }
    }

    return (
        <div onDragOver={dragOver} onDrop={drop} style={{width: '100%', height: '100%', margin: '5px', userSelect: 'text'}}>
            {map && mapName ? (
                <>
                    <h1>{mapName}</h1>
                    <select value={mode} onChange={ev => setMode(parseInt(ev.target.value))}>
                        <option value="0">Flags</option>
                        <option value="1">Heightmap</option>
                        <option value="2">Watermap</option>
                    </select>
                    {
                        mode === 0 && (
                            <>
                                <BitSelect value={bitR} bitCount={16} onChange={bit => setBitR(bit)} />
                                <BitSelect value={bitG} bitCount={16} onChange={bit => setBitG(bit)} />
                                <BitSelect value={bitB} bitCount={16} onChange={bit => setBitB(bit)} />      
                            </>
                        )
                    }
                    <button
                        onClick={downloadImageData}
                        >
                            Download
                    </button>
                    <br/>
                    <br/>
                    <Canvas
                        width={map.mapSize}
                        height={map.mapSize}
                        drawContent={drawMapContent}
                    />
                </>
            ) : (
                <h1>Drop a Carnivores 1/2/IceAge MAP file here</h1>
            )}
        </div>
    )
}