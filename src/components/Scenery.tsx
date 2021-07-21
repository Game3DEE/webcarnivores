import React from 'react';
import { Group, InstancedMesh, Matrix4 } from 'three';
import C3DFLoader from '../legacy/C3DFLoader';

interface Props {
    map: any;
    rsc: any;
    getHeightAt: (x: number, z: number) => number;
}

function Scenery({ map, rsc, getHeightAt }: Props) {
    const group = React.useMemo(() => {
        const { mapSize, objectMap, tileSize } = map;
        const parent = new Group();
        // Create matrices for all scenery
        const matrices: number[][] = [];
        const matrix = new Matrix4();
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const obj = objectMap[y * mapSize + x];
                if (obj < 254) {
                    matrix.makeTranslation(
                        x * tileSize,
                        getHeightAt(x * tileSize, y * tileSize),
                        y * tileSize);
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