import React from 'react'

import { Html, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import './Home.css'
import World from '../components/World'

export default function Home() {
    return (
        <>
            <Canvas
                shadows
                linear
                camera={{
                    fov: 30,
                    near: 1,
                    far: 1000000,
                }}
            >
                <Stats />

                <React.Suspense fallback={<Html center>Loading, please wait</Html>}>
                    <World
                        mapUrl={'HUNTDAT/AREAS/AREA1.MAP'}
                        rscUrl={'HUNTDAT/AREAS/AREA1.RSC'}
                    />
                </React.Suspense>


            </Canvas>
        </>
    )
    /*
                    <fog near={10*256} far={140*256} attach="fog" />
    */
}
