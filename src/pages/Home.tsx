import React from 'react'
import DatGui, {
    DatBoolean,
//    DatNumber,
    DatSelect
} from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';

import './Home.css'
import World from '../components/World'

const levelNames = [
    'Basmachee Rocks',
    'Fort Ciskin',
];

const levelSources = [{
        map: 'HUNTDAT/AREAS/AREA1.MAP',
        rsc: 'HUNTDAT/AREAS/AREA1.RSC',
    }, {
        map: 'HUNTDAT/AREAS2/AREA2.MAP',
        rsc: 'HUNTDAT/AREAS2/AREA2.RSC',
    }
];

export default function Home() {
    const [ world, setWorld ] = React.useState(levelSources[0]);
    const [ data, setData ] = React.useState({
        enableScenery: true,
        enableSky: true,
        enableHUD: false,
        levelName: levelNames[0],
        renderDistance: 16384,
    });

    function dragOver(ev: React.DragEvent) {
        ev.preventDefault();
    } 

    function drop(ev: React.DragEvent) {
        ev.preventDefault();
        if (ev.dataTransfer.files?.length) {
            let map = null;
            let rsc = null;
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                const f = ev.dataTransfer.files[i];
                if (f.name.toUpperCase().endsWith('.MAP')) {
                    map = URL.createObjectURL(f);
                } else if (f.name.toUpperCase().endsWith('.RSC')) {
                    rsc = URL.createObjectURL(f);
                }
            }
            if (map && rsc) {
                setWorld({ map, rsc });
            }
        }
    }

    return (
        <div
            onDragOver={dragOver}
            onDrop={drop}
            className={'dndContainer'}
        >
            <World
                mapUrl={world.map}
                rscUrl={world.rsc}
                enableHUD={data.enableHUD}
                enableScenery={data.enableScenery}
                enableSky={data.enableSky}
                clipFar={data.renderDistance}
            />

            <DatGui data={data} onUpdate={updated => {
                // Detect area change
                if (data.levelName !== updated.levelName) {
                    const idx = levelNames.indexOf(updated.levelName);
                    if (idx !== -1) {
                        setWorld(levelSources[idx]);
                    }
                }
                setData(updated)
            }}>
                <DatBoolean path='enableScenery' label="Objects" />
                <DatBoolean path='enableHUD' label="HUD" />
                <DatBoolean path='enableSky' label="Sky" />
                <DatSelect path='levelName' label="Area" options={levelNames} />
            </DatGui>

        </div>
    )
}


/*
                <DatNumber path='renderDistance' label="RenderDist" step={256} min={10*256} max={1000000} />
*/