import React from 'react';
import { Group, InstancedMesh, Matrix4 } from 'three';
import C3DFLoader from '../legacy/C3DFLoader';

interface Props {
    map: any;
    rsc: any;
    getHeightAt: (x: number, z: number, r: number) => number;
}

function Scenery({ map, rsc, getHeightAt }: Props) {
    const group = React.useMemo(() => {
        const { objectHeightMap, flagsMap, mapSize, objectMap, tileSize } = map;
        const halfTileSize = tileSize / 2;
        const angleScale = (map.version === 1) ? 8 : 4;
        const parent = new Group();
        // Create matrices for all scenery
        const matrices: number[][] = [];
        const matrix = new Matrix4();
        const matrix2 = new Matrix4();
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const obj = objectMap[y * mapSize + x];
                if (obj < 254) {
                    const fullX = x * tileSize + halfTileSize;
                    const fullY = y * tileSize + halfTileSize;
                    let height = 0;
                    const model = rsc.models[obj];
                    if (model.fPlaceWater) {
                        console.log('WATER', x, y, obj);
                    }
                    else if (model.fPlaceGround) {
                        //console.log('GROUND', x, y, obj);
                        height = getHeightAt(x, y, model.grRad);
                    }
                    else if (model.fPlaceUser) {
                        console.log('USER', x, y, obj);
                        height = objectHeightMap[y * mapSize + x] + 48;
                    } else {
                        // unexpected placement!
                        console.log('HUH?', x, y, obj);
                    }
                    height = (-48 + height) * map.yScale;
                    matrix2.makeRotationY(
                        flagsMap[y * mapSize + x].fModelDirection * 2 * Math.PI / angleScale
                    );
                    matrix.makeTranslation(fullX, height, fullY);
                    matrix.multiply(matrix2);

                    if (!matrices[obj]) {
                        matrices[obj] = matrix.toArray();
                    } else {
                        matrices[obj].push.apply(matrices[obj], matrix.toArray())
                    }
                }
            }
        }

        const loader = new C3DFLoader();

        rsc.models.forEach((mdl: any, obj: number) => {
            if (matrices[obj]) {
                const count = matrices[obj].length / 16;
                const { geometry, material } = loader._parse(mdl.model);
                const mesh = new InstancedMesh(
                    geometry, material,
                    count,
                );
                for (let i = 0; i < count; i++) {
                    matrix.fromArray(matrices[obj], i * 16)
                    mesh.setMatrixAt(i, matrix)
                }
                parent.add(mesh)
            }
        })

        return parent;
    }, [rsc, map, getHeightAt]);

    return (
        <primitive object={group} />
    )
}

export default Scenery;