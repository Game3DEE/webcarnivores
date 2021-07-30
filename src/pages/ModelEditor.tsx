import React from 'react';
import { OrbitControls, useAnimations } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import DatGui, { DatSelect } from 'react-dat-gui';
import { Loader, Mesh } from 'three';
import './ModelEditor.css';
import 'react-dat-gui/dist/index.css';

import CARLoader from '../legacy/CARLoader';
import C3DFLoader from '../legacy/C3DFLoader';

class WrapperLoader extends Loader {
    load(
        url: string,
        onLoad: (character: Mesh) => void,
        onProgress: (event: ProgressEvent) => void,
        onError: (event: Error | ErrorEvent ) => void,
    ) {
        const [ type, uri ] = url.split('~');
        if (type === '3DF') {
            return new C3DFLoader().load(uri, onLoad, onProgress, onError)
        } else if (type === 'CAR') {
            return new CARLoader().load(uri, onLoad, onProgress, onError)
        }

        return null;
    }
}

interface Props {
    modelUri: string;
}

interface ModelProps {
    animation: string;
    model: Mesh;
}

function Model({ model, animation }: ModelProps) {
    const { actions, ref } = useAnimations(model.animations);

    React.useEffect(() => {
        actions[animation]?.play();
        return () => { actions[animation]?.stop(); }
    })

    return (
        <primitive ref={ref} object={model} />
    )
}

function ModelViewer({ modelUri }: Props) {
    const model = useLoader(WrapperLoader, modelUri);
    const [ data, setData ] = React.useState({ animation: '' });

    const animations = React.useMemo(() => {
        const anims = [ '' ];
        model.animations.forEach(a => anims.push(a.name));
        return anims;
    }, [ model ])

    return (
        <>
        <Canvas
            className="canvasStyle"
            linear
            camera={{
                position: [0,500,-500],
                far: 10000,
            }}
        >
            <OrbitControls target={[0, 200, 0]} />
            <axesHelper args={[1000]} />
            <gridHelper args={[1000, 1000/16]} />
            <Model model={model} animation={data.animation} />
        </Canvas>
        <DatGui data={data} onUpdate={updated => setData(updated)}>
            <DatSelect path="animation" options={animations} />
        </DatGui>
        </>
    )
}

export default function ModelEditor() {
    const [ modelUri, setModelUri ] = React.useState('CAR~HUNTDAT/HUNTER1.CAR');
    
    function dragOver(ev: React.DragEvent) {
        ev.preventDefault();
    } 

    function drop(ev: React.DragEvent) {
        ev.preventDefault();
        if (ev.dataTransfer.files?.length) {
            const { name } = ev.dataTransfer.files[0];
            let type;
            if (name.toLowerCase().endsWith('.3df')) {
                type = '3DF';
            } else if (name.toLowerCase().endsWith('.car')) {
                type = 'CAR';
            }
            const url = URL.createObjectURL(ev.dataTransfer.files[0]);
            setModelUri(`${type}~${url}`);
        }
    }

    return (
        <div onDragOver={dragOver} onDrop={drop} className="modelContainer">
            <React.Suspense fallback={null}>
                <ModelViewer modelUri={modelUri} />
            </React.Suspense>
        </div>
    )
}