import { Plugin } from '../Plugin';

import KaitaiStream from 'kaitai-struct/KaitaiStream';

import * as THREE from 'three';
import { MorphBlendMesh } from 'three/examples/jsm/misc/MorphBlendMesh';

import C3DF from './kaitai/3df.ksy';
import CAR from './kaitai/car.ksy';
import MAP from './kaitai/map.ksy';
import RSC from './kaitai/rsc.ksy';

const scale = 256;
const hScale = 32;

export class CarnivoresPlugin extends Plugin {
  constructor() {
    super("Carnivores");

    this.mesh = null;

    // we allow for both a map & rsc to be dropped
    //  to render a full level
    this.map = null;
    this.rsc = null;
  }

  supportsFile(extension, filename) {
    return [
      "car", // animated models
      "3df", // static models
      "map", // map
      "rsc", // map resources
    ].includes(extension.toLowerCase()) ? 1 : 0;
  }

  addFile(filename, extension, data) {
    switch(extension.toLowerCase()) {
      case 'rsc': // map resources
        this.loadResources(data, filename)
        break;
      case 'map': // map
        this.showMesh( this.createMap(data, filename) );
        break;
      case '3df': // model
        this.showMesh( this.createModel(data, filename) );
        break;
      case 'car': // animated models
        this.showMesh( this.createAnimatedModel(data, filename) );
        break;
    }
  }

  showMesh(mesh) {
    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
    this.mesh = mesh;
    if (this.mesh) {
      this.scene.add(this.mesh);
    }
  }

  createTexture(texData, texSize) {
    let width = 256;
    let height = texSize / (width * 2);
  
    let data = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let pixel = texData[y * width + x];
        let offset = (y * width + x) * 4;
        data[offset++] = ((pixel >> 10) & 0x1f) << 3;
        data[offset++] = ((pixel >>  5) & 0x1f) << 3;
        data[offset++] = ((pixel >>  0) & 0x1f) << 3;
        data[offset++] = pixel ? 0xff : 0;
      }
    }
  
    const tex = new THREE.DataTexture(data, width, height, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.needsUpdate = true;
    return tex;
  }

  createGeometry(vertices, faces) {
    let geo = new THREE.BufferGeometry();
    let position = [];
    let uv = [];
    let index = [];
    vertices.forEach( v => {
      position.push( v.x, v.y, v.z );
    });
    function findUvForVertex(vIdx, u, v) {
        uv[vIdx*2+0] = u;
        uv[vIdx*2+1] = v;
      return vIdx;
    }
    let idx;
    faces.forEach( f => {
      let a = f.v1, b = f.v2, c = f.v3;
  
      idx = findUvForVertex(a, f.tax / 256, f.tay / 256);
      index.push(idx);
      idx = findUvForVertex(b, f.tbx / 256, f.tby / 256);
      index.push(idx);
      idx = findUvForVertex(c, f.tcx / 256, f.tcy / 256);
      index.push(idx);
    });

    geo.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(index);
    geo.computeVertexNormals();

    return geo;
  }

  createMap(data, filename) {
    this.map = new MAP(new KaitaiStream(data));
    console.log(this.map);

    let geo = new THREE.PlaneBufferGeometry(
      this.map.mapSize * scale, this.map.mapSize * scale,
      this.map.mapSize -1, this.map.mapSize -1);
    geo.rotateX(-Math.PI  / 2);

    let test;
    console.log('TEST', test = new THREE.PlaneBufferGeometry(1,1,2,2), test.toNonIndexed());

    for (let i = 0; i < this.map.mapSize * this.map.mapSize; i++) {
      geo.attributes.position.setY(i, this.map.heightMap[i] * hScale);
    }

    geo.computeVertexNormals();
    geo = geo.toNonIndexed();
    console.log(geo)

    const mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
    return mesh;
  }

  getHeight(x,y) {
    return this.map.heightMap[y * this.map.mapSize + x] * hScale;
  }

  loadResources(buf, filename) {
    this.rsc = new RSC(new KaitaiStream(buf));
    console.log(this.rsc);

    // Create list of objects...
    const models = this.rsc.models.map(mdl => {
      const geo = this.createGeometry(mdl.vertices, mdl.faces);
      const tex = this.createTexture(mdl.textureData, mdl.textureSize);
      const mesh = new THREE.Mesh(
        geo, new THREE.MeshPhongMaterial({ map: tex, transparent: true }),
      );
      return mesh;
    })

    const matrices = [];

    const mapSize = this.map.mapSize;
    const halfMapSize = this.map.mapSize / 2;

    const matrix = new THREE.Matrix4();
    for (let y = 0; y < this.map.mapSize; y++) {
      for (let x = 0; x < this.map.mapSize; x++) {
        const obj = this.map.oMap[y * this.map.mapSize + x];
        if (obj < 254) {
          matrix.makeTranslation((x - halfMapSize) * scale, this.getHeight(x,y), (y - halfMapSize) * scale)
          if (!matrices[obj]) {
            matrices[obj] = matrix.toArray();
          } else {
            matrices[obj].push.apply(matrices[obj], matrix.toArray())
          }
        } else if (obj == 254) {
          // Landing list
          const indicator = new THREE.Mesh(
            new THREE.SphereBufferGeometry(128),
            new THREE.MeshLambertMaterial({ color: 0xff0000 }),
          )
          indicator.position.set((x - halfMapSize) * scale, this.getHeight(x,y), (y - halfMapSize) * scale);
          this.scene.add(indicator);
        } else if (obj == 255) {
          // empty
        }
      }
    }

    this.rsc.models.forEach((mdl, obj) => {
      if (matrices[obj]) {
        const count = matrices[obj].length / 16;
        const geo = this.createGeometry(mdl.vertices, mdl.faces);
        const tex = this.createTexture(mdl.textureData, mdl.textureSize);
        const mesh = new THREE.InstancedMesh(
          geo, new THREE.MeshPhongMaterial({ map: tex, transparent: true }),
          count,
        );
        for (let i = 0; i < count; i++) {
          matrix.fromArray(matrices[obj], i * 16)
          mesh.setMatrixAt(i, matrix)
        }
        this.scene.add(mesh)
      }
    })

    // Calculate W/H of map atlas (we go for a square format)
    const textureDim = Math.ceil(Math.sqrt(this.rsc.textureCount));
    const textureStride = textureDim * 128 * 4;
    const data = new Uint8Array(textureDim * textureStride * 128)
    for (let i = 0; i < this.rsc.textureCount; i++) {
      let top = Math.floor(i / textureDim)
      let left = Math.floor(i % textureDim)
      let offset = (top * textureStride * 128) + (left * 128 * 4);
      for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
          let pixel = this.rsc.textures[i].data[y * 128 + x]
          data[offset++] = ((pixel >> 10) & 0x1f) << 3;
          data[offset++] = ((pixel >>  5) & 0x1f) << 3;
          data[offset++] = ((pixel >>  0) & 0x1f) << 3;
          data[offset++] = 0xff;
        }
        offset -= 128 * 4;
        offset += textureStride;
      }
    }
    const texSize = textureDim * 128;
    const tex = new THREE.DataTexture(data, texSize, texSize, THREE.RGBAFormat, THREE.UnsignedByteType);
    tex.needsUpdate = true;

    const uvStep = 1 / textureDim;
    const uv = this.mesh.geometry.attributes.uv;
    let uvidx = 0;
    for (let y = 0; y < this.map.mapSize -1; y++) {
      for (let x = 0; x < this.map.mapSize -1; x++) {
        const tidx = this.map.textureMap1[this.map.mapSize * y + x]
        const rot = this.map.fMap[this.map.mapSize * y + x] & 3
        const ty = Math.floor(tidx / textureDim) * uvStep;
        const tx = Math.floor(tidx % textureDim) * uvStep;
        const coords = [
          [ tx,          ty ],
          [ tx,          ty + uvStep ],
          [ tx + uvStep, ty ], // first triangle UV
          [ tx + uvStep, ty + uvStep ],
        ];
        let a = 0, b = 1, c = 2, d = 1, e = 3, f = 2;
        switch(rot) {
          case 0: break; // default no rotation
          case 1: // 90deg
            a = 1; b = d = 3; c = f = 0; e = 2;
            break;
          case 2: // 180deg
            a = 3; b = d = 2; c = f = 1; e = 0;
            break;
          case 3: // 270deg
            a = 2; b = d = 0; c = f = 3; e = 1;
            break;
        }
        uv.setX(uvidx + 0, coords[a][0]);
        uv.setY(uvidx + 0, coords[a][1]);
        uv.setX(uvidx + 1, coords[b][0]);
        uv.setY(uvidx + 1, coords[b][1]);
        uv.setX(uvidx + 2, coords[c][0]);
        uv.setY(uvidx + 2, coords[c][1]);

        uv.setX(uvidx + 3, coords[d][0]);
        uv.setY(uvidx + 3, coords[d][1]);
        uv.setX(uvidx + 4, coords[e][0]);
        uv.setY(uvidx + 4, coords[e][1]);
        uv.setX(uvidx + 5, coords[f][0]);
        uv.setY(uvidx + 5, coords[f][1]);

        uvidx += 6;
      }
    }
    uv.needsUpdate = true;
    //const tex = this.createTexture(this.rsc.skyTexture, this.rsc.skyTextureSize);

    this.mesh.material = new THREE.MeshLambertMaterial({ map: tex });
  }

  createModel(data, filename) {
    const parsed = new C3DF(new KaitaiStream(data));
    console.log(parsed);

    const geo = this.createGeometry(parsed.vertices, parsed.faces);
    const tex = this.createTexture(parsed.textureData, parsed.textureSize);
    const mesh = new THREE.Mesh(
      geo, new THREE.MeshPhongMaterial({ map: tex }),
    );

    console.log(mesh)
    
    return mesh;
  }

  createAnimatedModel(buffer, filename) {
    const car = new CAR(new KaitaiStream(buffer));

    const geo = this.createGeometry(car.vertices, car.faces);

    let k1 = 1 / 256;
    let midx = 0;
    geo.morphAttributes.position = [];
    car.animations.forEach( a => {
      for (let i = 0; i < a.frameCount; i++) {
        let vertices = [];
        for (let v = 0; v < car.vertCount; v++) {
          let offset = (i * car.vertCount + v) * 3;
          vertices.push(
            a.data[offset + 0] * k1,
            a.data[offset + 1] * k1,
            a.data[offset + 2] * k1,
          );
        }
        let attr = new THREE.Float32BufferAttribute(vertices, 3);
        attr.name = `${a.name.replace(/_/g,'')}_${i}`;
        geo.morphAttributes.position[midx++] = attr;
      }
    });
  
    const tex = this.createTexture(car.textureData, car.textureSize);
    const mesh = new MorphBlendMesh(geo, new THREE.MeshPhongMaterial({ map: tex, morphTargets: true }));
    mesh.autoCreateAnimations(10);
    //mesh.playAnimation(currAnim);
    return mesh;
  }
}
