import React from 'react'

import { Stats, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'

import { loadArea } from '../legacy/hunt'

import './Home.css'
import Player from '../Player'

interface Props {
    setLoading: (isLoading: boolean) => void;
}

function Terrain({ setLoading }: Props) {
    const { scene } = useThree();

    function getHeightAt(x: number, z: number): number {
        return 1500;
    }

    console.log('Terrain')
    React.useEffect(() => {
        console.time("loadArea");
        loadArea("AREA1").then(world => {
            console.timeEnd("loadArea");
            if (world) {
                scene.add(world)
            }
            setLoading(false);
        })
    }, [setLoading, scene])
    return <></> //<Player getHeightAt={getHeightAt} />;
}

export default function Home() {
    const [ isLoading, setLoading ] = React.useState(true);

    return (
        <>
            {isLoading && (<div className="center"><p>Loading, please wait</p></div>)}
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

                <Terrain setLoading={setLoading} />
            </Canvas>
        </>
    )
}
