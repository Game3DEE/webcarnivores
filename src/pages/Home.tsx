import React from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'

import { loadArea } from '../legacy/hunt'

function Terrain() {
    const { scene } = useThree();

    React.useEffect(() => {
        console.time("loadArea");
        loadArea("AREA1").then(world => {
            console.timeEnd("loadArea");
            if (world) {
                scene.add(world)
            }
        })
    })
    return null;
}

export default function Home() {
    return (
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

            <OrbitControls
                maxPolarAngle={0.4*Math.PI}
            />

            <Terrain />
        </Canvas>
    )
}