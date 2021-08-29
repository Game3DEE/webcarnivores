import { DataTexture, DataTexture2DArray, Matrix4, MeshBasicMaterial } from "three";

interface CPCTerrainMaterialProps {
    vertexMap: DataTexture; // integer DataTexture containing heightmap, lightmap
    fragmentMap: DataTexture; // integer DataTexture containing texturemap{1,2}, flagmap
    textureArray: DataTexture2DArray, // DataTexture array with terrain textures
    mapSize: number; // size of map in tiles, e.g. 512 for C1, 1024 for C2/IA
    version: number; // version 1 for C1, 2 for C2/IA
    yScale: number; // y scaling of heights, 32 for C1, 64 for C2
    heightmapMatrix: Matrix4; // transformation from world coordinates of map to uv
}

// CarnivoresPCTerrainMaterial
export default class CPCTerrainMaterial extends MeshBasicMaterial {
    constructor({ vertexMap, fragmentMap, mapSize, version, yScale, textureArray, heightmapMatrix }: CPCTerrainMaterialProps) {
        super({
            map: textureArray,
            fog: true, // for future use
        });

        this.defines = {
            'MAP_SIZE': `${mapSize}.0`,
            'CARNIVORES': version,
            'MAP_HSCALE': `${yScale}.0`,
        };
        this.onBeforeCompile = s => {
            // Create our (integer) data textures for
            // fragment and vertex shader
            s.uniforms['vertexMap'] = { value: vertexMap, };
            s.uniforms['fragmentMap'] = { value: fragmentMap, };
            s.uniforms['heightmapMatrix'] = { value: heightmapMatrix, };
    
            // Adjust vertex shader
            let vs = s.vertexShader;
            vs = vs.replace('#include <common>', `
                precision highp usampler2D;
                uniform usampler2D vertexMap;
                uniform mat4 heightmapMatrix;
                varying vec4 vLighting;
                #include <common>
            `)
            vs = vs.replace('#include <color_vertex>', `
            vUv = (heightmapMatrix * modelMatrix * vec4(position, 1.0)).xz;
            uvec4 tex = texture(vertexMap, vUv);
            #if CARNIVORES == 1
            float light = 1.0 - (float(tex.g) / 64.0);
            #else
            float light = float(tex.g) / 255.0;
            #endif
            vLighting = vec4(light, light, light, 1.0);
            #include <color_vertex>
            `)
            vs = vs.replace('#include <begin_vertex>', `
            #include <begin_vertex>
            transformed.y += float(tex.r) * MAP_HSCALE;
            `)
            s.vertexShader = vs;

            // Adjust the fragment shader
            let fs = s.fragmentShader;
            fs = fs.replace('#include <map_pars_fragment>', `
            precision highp sampler2DArray;
            precision highp usampler2D;
            uniform sampler2DArray map;
            uniform usampler2D fragmentMap;
            varying vec4 vLighting;

            vec2 rotateUV(vec2 uv, uint rot) {
#if 0
                switch(rot) {
                    case 0u:
                        //diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
                        break;
                    case 1u:
                        float t = uv.x;
                        uv.x = uv.y;
                        uv.y = 1.0 - t;
                        //diffuseColor = vec4(0.5, 0.0, 0.0, 1.0);
                        break;
                    case 2u:
                        uv.x = 1.0 - uv.x;
                        uv.y = 1.0 - uv.y;
                        //diffuseColor = vec4(0.5, 0.5, 0.0, 1.0);
                        break;
                    case 3u:
                        float x = uv.x;
                        uv.x = 1.0 - uv.y;
                        uv.y = x;
                        //diffuseColor = vec4(0.0, 0.0, 1.0, 1.0);
                    break;
                }
#else                
                float mid = 0.5;
                float rotation = float(rot);
                float cos_ = cos(PI / 2. * rotation);
                float sin_ = sin(PI / 2. * rotation);
                return vec2(
                    cos_ * (uv.x - mid) + sin_ * (uv.y - mid) + mid,
                    cos_ * (uv.y - mid) - sin_ * (uv.x - mid) + mid
                );
#endif
            }
            `);
            fs = fs.replace('#include <map_fragment>', `
            vec2 tilePos = vUv * MAP_SIZE;
            vec2 localTileUv = tilePos - floor(tilePos);
            uvec4 tex = texture(fragmentMap, vUv);
            diffuseColor = vLighting;
            localTileUv = rotateUV(localTileUv, tex.b & 3u);
            uint depth = tex.r;
            #if CARNIVORES == 1
            float triside = ((1.0-localTileUv.x) - localTileUv.y);
            if (triside >= 0.0) {
                depth = (tex.b & 64u) != 0u ? tex.r : tex.g;
            } else {
                depth = (tex.b & 64u) != 0u ? tex.g : tex.r;
            }
            #endif
            #ifdef DEBUG_REVERSE_FLAG
            if ((tex.b & 64u) != 0u) {
                diffuseColor = vec4(0.6, 0.6, 0.6, 1.0);
            } else {
                diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
            #endif
            vec4 texelColor = texture( map, vec3(localTileUv, depth) );
            texelColor = mapTexelToLinear( texelColor );
            diffuseColor *= texelColor;
            //diffuseColor = vec4(localTileUv, 0.0, 1.0);
            `)
            s.fragmentShader = fs;
        }
    
    }
}