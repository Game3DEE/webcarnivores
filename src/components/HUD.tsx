import React from 'react';
import { DoubleSide, Scene, Spherical, Texture, Vector3 } from 'three';
import { createPortal, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import C3DFLoader from '../legacy/C3DFLoader';
import CARLoader from '../legacy/CARLoader';

interface Props {
  miniMap: Texture;
}

function HUD({ miniMap }: Props) {
    const { gl, scene, camera, size } = useThree()
    const virtualScene = React.useMemo(() => new Scene(), [])
    const virtualCam = React.useRef<any>() // XXXX
    var dir = new Vector3();
    var sph = new Spherical();
    
    const compass = useLoader(C3DFLoader, "HUNTDAT/COMPAS.3DF");
    const wind = useLoader(CARLoader, "HUNTDAT/WIND.CAR");

    const { width, height } = miniMap.image;

    useFrame(() => {
        if (virtualCam.current) {
            camera.getWorldDirection(dir);
            sph.setFromVector3(dir);
            compass.rotation.y = sph.theta;
            wind.rotation.y = sph.theta;
            gl.autoClear = true
            gl.render(scene, camera)
            gl.autoClear = false
            gl.clearDepth()
            gl.render(virtualScene, virtualCam.current)      
        }
    }, 1)
  
    return (createPortal(
      <>
        <OrthographicCamera ref={virtualCam} makeDefault={false} position={[0, 0, 220]} />
        <primitive
          position={[- size.width / 2 + 220, - size.height / 2 + 120, 0]}
          rotation-x={-Math.PI/8}
          scale={10}
          object={wind}
        />
        <primitive
          position={[size.width / 2 - 220, - size.height / 2 + 120, 0]}
          rotation-x={-Math.PI/8}
          scale={10}
          object={compass}
        />
        <mesh position={[size.width / 2 - width, 0,  - size.height / 2 + height]}>
            <planeBufferGeometry args={[width,height]} />
            <meshBasicMaterial side={DoubleSide} map={miniMap} />
        </mesh>
      </>,
      virtualScene
    ) as any) as JSX.Element
  }
  
  export default HUD;
