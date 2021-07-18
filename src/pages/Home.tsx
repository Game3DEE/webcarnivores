import React from 'react'

import './Home.css'
import World from '../components/World'

export default function Home() {
    const [ world, setWorld ] = React.useState({
        map: 'HUNTDAT/AREAS/AREA1.MAP',
        rsc: 'HUNTDAT/AREAS/AREA1.RSC',
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
            />
        </div>
    )
}
