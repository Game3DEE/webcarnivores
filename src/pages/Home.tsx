import React, { Suspense } from 'react'

import { Stats, OrbitControls, PointerLockControls, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { loadArea } from '../legacy/hunt'

import './Home.css'
import Player from '../Player'
import wrapPromise from '../WrapPromise'
import { Color } from 'three'

const resource = wrapPromise(loadArea("AREA1"));

function Terrain() {
    const { group, getHeightAt, landings } = resource.read();

    //console.log(group, getHeightAt);

    return (
        <>
        <primitive object={group} />
        <Player landings={landings} getHeightAt={getHeightAt} />
        </>
    )
}

export default function Home() {
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

                <PointerLockControls />

                <Suspense fallback={<Html center>Loading, please wait</Html>}>
                    <Terrain />
                </Suspense>
            </Canvas>
        </>
    )
/*
                <fog near={10*256} far={140*256} attach="fog" />
*/
}
