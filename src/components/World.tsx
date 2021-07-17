import React from 'react';
import { PointerLockControls } from '@react-three/drei';
import Terrain from './Terrain';
import { loadArea } from '../legacy/hunt';
import Player from '../Player';
import Sky from './Sky';
import Scenery from './Scenery';

interface Props {
    mapUrl: string;
    rscUrl: string;
}

function World({ mapUrl, rscUrl }: Props) {
    const [ world, setWorld ] = React.useState<any>();

    React.useEffect(() => {
        loadArea(mapUrl, rscUrl).then(world => {
            setWorld(world);
            console.log(world);
        })
    }, [mapUrl, rscUrl]);

    return world ? (
        <>
            <PointerLockControls />
            <Terrain rsc={world.rsc}  map={world.map} />
            <Sky rsc={world.rsc}  map={world.map} />
            <Player landings={world.landings} getHeightAt={world.getHeightAt} />
            <Scenery rsc={world.rsc} map={world.map} getHeightAt={world.getHeightAt} />
        </>
    ) : <></>
}

export default World;
