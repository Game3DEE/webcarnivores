import React, { Suspense } from 'react'

import { Stats, OrbitControls, PointerLockControls, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { loadArea } from '../legacy/hunt'

import './Home.css'
import Player from '../Player'
import wrapPromise from '../WrapPromise'

const resource = wrapPromise(loadArea("AREA1"));

function Terrain() {
    const group = resource.read();

    /*
    function getHeightAt(x: number, z: number): number {
        return 1500;
    //<Player getHeightAt={getHeightAt} />;
    }*/

    return <primitive object={group} />
}

export default function Home() {
    const [ isLoading, setLoading ] = React.useState(true);

    return (
        <>
            <Canvas
                shadows
                linear
                camera={{
                    position: [ 0, 12000, 12000 ],
                    fov: 30,
                    near: 1,
                    far: 1000000,
                }}
            >
                <Stats />
                <directionalLight
                    args={[0xdfebff, 1]}
                    position={[50, 200, 100]}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-left={-300}
                    shadow-camera-right={300}
                    shadow-camera-top={300}
                    shadow-camera-bottom={-300}
                    shadow-camera-far={1000}
                    castShadow
                />
                <ambientLight
                    args={[0x666666]}
                />

                <OrbitControls />

                <Suspense fallback={<Html center>Loading, please wait</Html>}>
                    <Terrain />
                </Suspense>
            </Canvas>
        </>
    )
}
