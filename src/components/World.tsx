import React from 'react';
import { Html, PointerLockControls, Stats } from '@react-three/drei';
import Terrain from './Terrain';
import { loadArea } from '../legacy/hunt';
import Player from '../Player';
import Sky from './Sky';
import Scenery from './Scenery';
import { Canvas } from '@react-three/fiber';

interface Props {
    mapUrl: string;
    rscUrl: string;
}

function World({ mapUrl, rscUrl }: Props) {
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
                    far: 1000000,
                }}
            >
                <Stats />
                <PointerLockControls />

                <React.Suspense fallback={<Html center>Loading, please wait</Html>}>

                    <Sky rsc={world.rsc} map={world.map} />
                    <Terrain rsc={world.rsc} map={world.map} />
                    <Scenery rsc={world.rsc} map={world.map} getHeightAt={world.getHeightAt} />
                    <Player landings={world.landings} getHeightAt={world.getHeightAt} />

                </React.Suspense>

            </Canvas>

        </>
    ) : <></>
}
/*
    <fog near={10*256} far={140*256} attach="fog" />
*/

export default World;
