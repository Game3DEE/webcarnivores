import React from 'react';
import { Html, PointerLockControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { loadArea } from '../legacy/hunt';
import Terrain from './Terrain';
import Player from '../Player';
import Sky from './Sky';
import Scenery from './Scenery';
import HUD from './HUD';
import EnvSound from './EnvSound';

interface Props {
    mapUrl: string;
    rscUrl: string;
    enableHUD?: boolean;
    enableScenery?: boolean;
    enableSky?: boolean;
    enableAudio?: boolean;
    clipFar?: number;
}

function World({
    mapUrl, rscUrl,
    enableHUD = true,
    enableScenery = true,
    enableSky = true,
    enableAudio = false,
    clipFar = 1000000
}: Props) {
    const [world, setWorld] = React.useState<any>();

    React.useEffect(() => {
        loadArea(mapUrl, rscUrl).then(world => {
            setWorld(world);
        })
    }, [mapUrl, rscUrl]);

    return world ? (
        <>
            <Canvas
                shadows
                linear
                camera={{
                    fov: 30,
                    near: 1,
                    far: clipFar,
                }}
            >
                <Stats />
                <PointerLockControls />

                <React.Suspense fallback={<Html center>Loading, please wait</Html>}>
                    {enableAudio && <EnvSound rsc={world.rsc} map={world.map} />}
                    {enableSky && <Sky clipFar={clipFar} rsc={world.rsc} map={world.map} />}
                    <Terrain rsc={world.rsc} map={world.map} />
                    {enableScenery && <Scenery rsc={world.rsc} map={world.map} getHeightAt={world.getObjectH} />}
                    <Player landings={world.landings} getHeightAt={world.getHeightAt} />
                    {enableHUD && <HUD miniMap={world.miniMap} />}

                </React.Suspense>

            </Canvas>

        </>
    ) : <></>
}

export default World;

/*
                <fog near={clipFar-(clipFar / 10)} far={clipFar} attach="fog" />
*/
