import React from 'react';
import { DoubleSide, Group, InstancedMesh, Matrix4, MeshBasicMaterial } from 'three';
import C3DFGeometry from '../legacy/C3DFGeometry';
import { createTexture } from '../legacy/utils';

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

        rsc.models.forEach((mdl: any, obj: number) => {
            if (matrices[obj]) {
                const count = matrices[obj].length / 16;
                const geo = new C3DFGeometry(mdl.model);
                const tex = createTexture(mdl.model.textureData, mdl.model.textureWidth, mdl.model.textureHeight);
                const mesh = new InstancedMesh(
                    geo, new MeshBasicMaterial({ map: tex, fog: true, transparent: true, alphaTest: 0.5, side: DoubleSide }),
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
    }, [rsc, map]);

    return (
        <primitive object={group} />
    )
}

export default Scenery;