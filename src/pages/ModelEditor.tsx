import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React from 'react';
import { useEffect } from 'react';
import DatGui, { DatSelect } from 'react-dat-gui';
import { Clock } from 'three';

import CARLoader from '../legacy/CARLoader';

interface Props {
    modelUri: string;
}
function ModelViewer({ modelUri }: Props) {
    const model = useLoader(CARLoader, modelUri);
    const animations = Object.keys(model.animationsMap);
    const [ data, setData ] = React.useState({ animation: '' });
    const clock = new Clock();

    useEffect(() => {
        const intvHandle = setInterval(() => {
            const delta = clock.getDelta();
            model.update(delta);    
        }, 1000/60);
        return () => clearInterval(intvHandle);
    });

    function handleUpdate(updated: any) {
        console.log(data, updated);
        if (data.animation) {
            model.stopAnimation(data.animation);
            for (let i = 0; i < model.morphTargetInfluences!.length; i++) {
                model.morphTargetInfluences![i] = 0;
            }        
        }
        model.playAnimation(updated.animation);
        setData(updated);
    }

    return (
    <>
        <DatGui data={data} onUpdate={handleUpdate}>
            <DatSelect path="animation" options={animations} />
        </DatGui>

        <Canvas
            linear
            camera={{
                position: [0,500,-500],
                far: 10000,
            }}
        >
            <OrbitControls target={[0, 200, 0]} />
            <primitive object={model} />
        </Canvas>
    </>
    )
}

export default function ModelEditor() {
    const [ modelUri, setModelUri ] = React.useState('HUNTDAT/HUNTER1.CAR');
    
    function dragOver(ev: React.DragEvent) {
        ev.preventDefault();
    } 

    function drop(ev: React.DragEvent) {
        ev.preventDefault();
        if (ev.dataTransfer.files?.length) {
            const mapName = ev.dataTransfer.files[0].name;
            const url = URL.createObjectURL(ev.dataTransfer.files[0]);
            setModelUri(url);
        }
    }

    return (
        <div onDragOver={dragOver} onDrop={drop} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
            <React.Suspense fallback={null}>
                <ModelViewer modelUri={modelUri} />
            </React.Suspense>
        </div>
    )
}