(this.webpackJsonpwebcarnivores=this.webpackJsonpwebcarnivores||[]).push([[0],{105:function(t,e){},106:function(t,e){},109:function(t,e){},111:function(t,e){},131:function(t,e,i){var s,r,a=void 0;s=this,r=function(t,e,i){return function(){function s(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}s.prototype._read=function(){this.vertCount=this._io.readU4le(),this.faceCount=this._io.readU4le(),this.nodeCount=this._io.readU4le(),this.textureSize=this._io.readU4le(),this.faces=new Array(this.faceCount);for(var t=0;t<this.faceCount;t++)this.faces[t]=new i(this._io,this,null);for(this.vertices=new Array(this.vertCount),t=0;t<this.vertCount;t++)this.vertices[t]=new e(this._io,this,null);for(this.nodes=new Array(this.nodeCount),t=0;t<this.nodeCount;t++)this.nodes[t]=new r(this._io,this,this._root);this.textureData=this._io.readBytes(this.textureWidth*this.textureHeight*2)};var r=s.Node=function(){function e(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return e.prototype._read=function(){this.name=t.bytesToStr(t.bytesTerminate(this._io.readBytes(32),0,!1),"utf8"),this.x=this._io.readF4le(),this.y=this._io.readF4le(),this.z=this._io.readF4le(),this.owner=this._io.readS2le(),this.hide=this._io.readU2le()},e}();return Object.defineProperty(s.prototype,"textureWidth",{get:function(){return void 0!==this._m_textureWidth||(this._m_textureWidth=256),this._m_textureWidth}}),Object.defineProperty(s.prototype,"textureHeight",{get:function(){return void 0!==this._m_textureHeight||(this._m_textureHeight=Math.floor(Math.floor(this.textureSize/2)/this.textureWidth)),this._m_textureHeight}}),s}()},"function"===typeof a&&a.amd?a(["kaitai-struct/KaitaiStream","./Vertex","./Face"],r):t.exports?t.exports=r(i(20),i(132),i(133)):s.C3df=r(s.KaitaiStream,s.Vertex,s.Face)},132:function(t,e,i){var s,r,a=void 0;s=this,r=function(t){return function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.x=this._io.readF4le(),this.y=this._io.readF4le(),this.z=this._io.readF4le(),this.owner=this._io.readS2le(),this.hide=this._io.readU2le()},t}()},"function"===typeof a&&a.amd?a(["kaitai-struct/KaitaiStream"],r):t.exports?t.exports=r(i(20)):s.Vertex=r(s.KaitaiStream)},133:function(t,e,i){var s,r,a=void 0;s=this,r=function(t){return function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.v1=this._io.readU4le(),this.v2=this._io.readU4le(),this.v3=this._io.readU4le(),this.tax=this._io.readS4le(),this.tbx=this._io.readS4le(),this.tcx=this._io.readS4le(),this.tay=this._io.readS4le(),this.tby=this._io.readS4le(),this.tcy=this._io.readS4le(),this.fDoubleSide=0!=this._io.readBitsIntBe(1),this.fDarkBack=0!=this._io.readBitsIntBe(1),this.fOpacity=0!=this._io.readBitsIntBe(1),this.fMortal=0!=this._io.readBitsIntBe(1),this.fPhong=0!=this._io.readBitsIntBe(1),this.fEnvmap=0!=this._io.readBitsIntBe(1),this.fNeedvc=0!=this._io.readBitsIntBe(1),this.fUnused=this._io.readBitsIntBe(7),this.fDarkFront=0!=this._io.readBitsIntBe(1),this._io.alignToByte(),this.dMask=this._io.readU2le(),this.distant=this._io.readS4le(),this.next=this._io.readU4le(),this.group=this._io.readU4le(),this.reserved=this._io.readBytes(12)},t}()},"function"===typeof a&&a.amd?a(["kaitai-struct/KaitaiStream"],r):t.exports?t.exports=r(i(20)):s.Face=r(s.KaitaiStream)},134:function(t,e,i){},142:function(t,e,i){"use strict";i.r(e);var s=i(4),r=i.n(s),a=i(34),n=i.n(a),o=(i(84),i(79)),h=i(13),u=i(147),c=i(146),d=i(145),p=i(15),l=i(22),f=i.n(l),_=i(44),m=i(20),v=i.n(m),S=i(7),y=i(72),g=i.n(y),x=i(73),b=i.n(x),w="HUNTDAT/AREAS";function z(t){for(var e=new Uint16Array(t.textureCount*t.textures[0].width*t.textures[0].height),i=0,s=0;s<t.textureCount;s++)for(var r=0;r<t.textures[0].width*t.textures[0].height;r++){var a=t.textures[s].data[2*r+1]<<8|t.textures[s].data[2*r],n=a>>10&31,o=(a>>5&31)<<1,h=a>>0&31;e[i++]=(n<<11)+(o<<5)+h}var u=new S.DataTexture2DArray(e,t.textures[0].width,t.textures[0].height,t.textureCount);return u.type=S.UnsignedShort565Type,u.format=S.RGBFormat,u.wrapT=u.wrapS=S.RepeatWrapping,u}function j(t,e,i){var s=[],r=e.mapSize,a=r/2;function n(t,i){return e.heightMap[i*e.mapSize+t]*e.yScale}for(var o=new S.Matrix4,h=0;h<r;h++)for(var u=0;u<r;u++){var c=e.objectMap[h*r+u];if(c<254)o.makeTranslation((u-a)*e.tileSize,n(u,h),(h-a)*e.tileSize),s[c]?s[c].push.apply(s[c],o.toArray()):s[c]=o.toArray();else if(254===c){var d=new S.Mesh(new S.SphereBufferGeometry(128),new S.MeshBasicMaterial({color:16711680}));d.position.set((u-a)*e.tileSize,n(u,h),(h-a)*e.tileSize),i.add(d)}}t.models.forEach((function(t,e){if(s[e]){for(var r=s[e].length/16,a=function(t,e){var i=new S.BufferGeometry,s=[],r=[],a=[],n=0;return e.forEach((function(e){var i=e.v1,o=e.v2,h=e.v3;s.push(t[i].x,t[i].y,t[i].z),r.push(e.tax/256,e.tay/256),a.push(n++),s.push(t[o].x,t[o].y,t[o].z),r.push(e.tbx/256,e.tby/256),a.push(n++),s.push(t[h].x,t[h].y,t[h].z),r.push(e.tcx/256,e.tcy/256),a.push(n++)})),i.setAttribute("position",new S.Float32BufferAttribute(s,3)),i.setAttribute("uv",new S.Float32BufferAttribute(r,2)),i.setIndex(a),i.computeVertexNormals(),i}(t.model.vertices,t.model.faces),n=function(t,e,i){for(var s=new Uint16Array(e*i),r=0,a=0;a<i;a++)for(var n=0;n<e;n++){var o=a*e+n,h=t[2*o+1]<<8|t[2*o],u=h>>10&31,c=h>>5&31,d=h>>0&31;s[r++]=(u<<11)+(c<<6)+(d<<1)|1}var p=new S.DataTexture(s,e,i,S.RGBAFormat,S.UnsignedShort5551Type);return p.needsUpdate=!0,p}(t.model.textureData,t.model.textureWidth,t.model.textureHeight),h=new S.InstancedMesh(a,new S.MeshBasicMaterial({map:n,fog:!0,transparent:!0,alphaTest:.5}),r),u=0;u<r;u++)o.fromArray(s[e],16*u),h.setMatrixAt(u,o);i.add(h)}}))}function M(t){for(var e=new Uint8Array(t.mapSize*t.mapSize*2),i=0;i<t.mapSize*t.mapSize;i++)e[2*i+0]=t.heightMap[i],e[2*i+1]=t.dayLightMap[i];var s=new S.DataTexture(e,t.mapSize,t.mapSize,S.RGIntegerFormat,S.UnsignedByteType);return s.internalFormat="RG8UI",s}function B(t){for(var e=new Uint8Array(t.mapSize*t.mapSize*3),i=0;i<t.mapSize*t.mapSize;i++){var s=t.flagsMap[i];e[3*i+0]=t.textureMap1[i],e[3*i+1]=t.textureMap2[i],e[3*i+2]=s.fTexDirection|s.fReverse<<6}var r=new S.DataTexture(e,t.mapSize,t.mapSize,S.RGBIntegerFormat,S.UnsignedByteType);return r.internalFormat="RGB8UI",r}function U(){return(U=Object(_.a)(f.a.mark((function t(e){var i,s,r,a,n,o,h,u,c;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=function(t,e){var i=a.tileSize,s=a.mapSize,r=a.heightMap;t+=s*i/2,e+=s*i/2;var n=Math.floor(t/i),o=Math.floor(e/i),h=Math.floor(t%i),u=Math.floor(e%i),c=r[o*s+n],d=r[o*s+n+1],p=r[(o+1)*s+n+1],l=r[(o+1)*s+n];return h>u?l=c+p-d:d=c+p-l,((c*(256-h)+d*h)*(256-u)+(l*(256-h)+p*h)*u)/256/256*a.yScale},i=new S.Group,t.next=4,fetch("".concat(w,"/").concat(e,".MAP")).then((function(t){return t.arrayBuffer()}));case 4:return s=t.sent,t.next=7,fetch("".concat(w,"/").concat(e,".RSC")).then((function(t){return t.arrayBuffer()}));case 7:return r=t.sent,a=new g.a(new v.a(s)),n=new b.a(new v.a(r),void 0,void 0,a.version),console.log(n,a),(o=new S.PlaneBufferGeometry(a.mapSize*a.tileSize,a.mapSize*a.tileSize,a.mapSize-1,a.mapSize-1)).rotateX(-Math.PI/2),j(n,a,i),h=(new S.Matrix4).multiplyMatrices((new S.Matrix4).makeTranslation(.5,0,.5),(new S.Matrix4).makeScale(1/(a.mapSize*a.tileSize),1,1/(a.mapSize*a.tileSize))),u=new S.MeshBasicMaterial({map:z(n),fog:!0}),console.log(u.defines),u.defines={MAP_SIZE:"".concat(a.mapSize,".0"),CARNIVORES:a.version,MAP_HSCALE:"".concat(a.yScale,".0")},u.onBeforeCompile=function(t){console.log(t,a,n);var e=M(a),i=B(a);t.uniforms.vertexMap={value:e},t.uniforms.fragmentMap={value:i},t.uniforms.heightmapMatrix={value:h};var s=t.vertexShader;s=(s=(s=s.replace("#include <common>","\n            precision highp usampler2D;\n            uniform usampler2D vertexMap;\n            uniform mat4 heightmapMatrix;\n            varying vec4 vLighting;\n        ")).replace("#include <color_vertex>","\n        vUv = (heightmapMatrix * modelMatrix * vec4(position, 1.0)).xz;\n        uvec4 tex = texture(vertexMap, vUv);\n        #if CARNIVORES == 1\n        float light = 1.0 - (float(tex.g) / 64.0);\n        #else\n        float light = float(tex.g) / 255.0;\n        #endif\n        vLighting = vec4(light, light, light, 1.0);\n        #include <color_vertex>\n        ")).replace("#include <begin_vertex>","\n        #include <begin_vertex>\n        transformed.y += float(tex.r) * MAP_HSCALE;\n        "),t.vertexShader=s;var r=t.fragmentShader;r=(r=r.replace("#include <map_pars_fragment>","\n        precision highp sampler2DArray;\n        precision highp usampler2D;\n        uniform sampler2DArray map;\n        uniform usampler2D fragmentMap;\n        varying vec4 vLighting;\n        ")).replace("#include <map_fragment>","\n        vec2 tilePos = vUv * MAP_SIZE;\n        vec2 localTileUv = tilePos - floor(tilePos);\n        uvec4 tex = texture(fragmentMap, vUv);\n        float triside = ((1.0-localTileUv.x) - localTileUv.y);\n        diffuseColor = vLighting;\n        switch(tex.b & 3u) {\n            case 0u:\n                //diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);\n                break;\n            case 1u:\n                float t = localTileUv.x;\n                localTileUv.x = localTileUv.y;\n                localTileUv.y = 1.0 - t;\n                //diffuseColor = vec4(0.5, 0.0, 0.0, 1.0);\n                break;\n            case 2u:\n                localTileUv.x = 1.0 - localTileUv.x;\n                localTileUv.y = 1.0 - localTileUv.y;\n                //diffuseColor = vec4(0.5, 0.5, 0.0, 1.0);\n                break;\n            case 3u:\n                float x = localTileUv.x;\n                localTileUv.x = 1.0 - localTileUv.y;\n                localTileUv.y = x;\n                //diffuseColor = vec4(0.0, 0.0, 1.0, 1.0);\n                break;\n        }\n        uint depth = tex.r;\n        #if CARNIVORES == 1\n        if (triside >= 0.0) {\n            depth = (tex.b & 64u) != 0u ? tex.r : tex.g;\n        } else {\n            depth = (tex.b & 64u) != 0u ? tex.g : tex.r;\n        }\n        #endif\n        #ifdef DEBUG_REVERSE_FLAG\n        if ((tex.b & 64u) != 0u) {\n            diffuseColor = vec4(0.6, 0.6, 0.6, 1.0);\n        } else {\n            diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);\n        }\n        #endif\n        vec4 texelColor = texture( map, vec3(localTileUv, depth) );\n        texelColor = mapTexelToLinear( texelColor );\n        diffuseColor *= texelColor;\n        //diffuseColor = vec4(localTileUv, 0.0, 1.0);\n        "),t.fragmentShader=r},i.add(new S.Mesh(o,u)),t.abrupt("return",{getHeightAt:c,group:i});case 21:case"end":return t.stop()}}),t)})))).apply(this,arguments)}i(134);var C={forward:!1,backward:!1,left:!1,right:!1,run:!1};function O(t){var e="keydown"===t.type;switch(t.key.toLowerCase()){case"w":C.forward=e;break;case"s":C.backward=e;break;case"a":C.left=e;break;case"d":C.right=e;break;case"shift":C.run=e;break;default:console.log(t.key,e)}}function A(t){var e=t.getHeightAt;r.a.useEffect((function(){return document.addEventListener("keydown",O),document.addEventListener("keyup",O),function(){document.removeEventListener("keydown",O),document.removeEventListener("keyup",O)}}));var i=new S.Vector3,s=new S.Vector3,a=new S.Vector3,n=new S.Clock;return Object(p.d)((function(t){var r=t.camera,o=n.getDelta();i.x-=10*i.x*o,i.z-=10*i.z*o,i.y-=9.8*100*o,s.z=Number(C.forward)-Number(C.backward),s.x=Number(C.right)-Number(C.left),s.normalize(),(C.forward||C.backward)&&(i.z-=7e3*s.z*o),(C.left||C.right)&&(i.x-=7e3*s.x*o),a.setFromMatrixColumn(r.matrix,0),r.position.addScaledVector(a,-i.x*o),a.setFromMatrixColumn(r.matrix,0),a.crossVectors(r.up,a),r.position.addScaledVector(a,-i.z*o),r.position.y+=i.y*o;var h=e(r.position.x,r.position.z);r.position.y<h+220&&(i.y=0,r.position.y=h+220,!0)})),null}var T=function(t){var e,i="pending",s=t.then((function(t){i="success",e=t}),(function(t){i="error",e=t}));return{read:function(){switch(i){case"pending":throw s;case"error":throw e;default:return e}}}},k=i(8),I=T(function(t){return U.apply(this,arguments)}("AREA1"));function L(){var t=I.read(),e=t.group,i=t.getHeightAt;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("primitive",{object:e}),Object(k.jsx)(A,{getHeightAt:i})]})}function V(){return Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(p.a,{shadows:!0,linear:!0,camera:{position:[0,12e3,12e3],fov:30,near:1,far:1e6},children:[Object(k.jsx)(u.a,{}),Object(k.jsx)(c.a,{}),Object(k.jsx)(s.Suspense,{fallback:Object(k.jsx)(d.a,{center:!0,children:"Loading, please wait"}),children:Object(k.jsx)(L,{})})]})})}var R=i(12),D=i(78),F=i.n(D),E=i(9),P=i(23),N=function(t){var e=t.drawContent,i=t.width,s=t.height,a=Object(P.a)(t,["drawContent","width","height"]),n=r.a.useRef(null);return r.a.useEffect((function(){var t=n.current,r=null===t||void 0===t?void 0:t.getContext("2d");t&&r&&(void 0!==i&&(r.canvas.width=i),void 0!==s&&(r.canvas.height=s),e?e(r):(r.fillStyle="#000000",r.fillRect(0,0,r.canvas.width,r.canvas.height)))}),[e,s,i]),Object(k.jsx)("canvas",Object(E.a)({ref:n},a))},H=function(t,e){for(var i=new ImageData(t.mapSize,t.mapSize),s=0;s<t.mapSize*t.mapSize;s++)i.data[4*s+0]=t[e][s],i.data[4*s+1]=t[e][s],i.data[4*s+2]=t[e][s],i.data[4*s+3]=255;return i},W=function(t){var e=t.value,i=void 0===e?0:e,s=t.bitCount,r=void 0===s?8:s,a=t.onChange;return Object(k.jsxs)("select",{value:i,onChange:function(t){return a(parseFloat(t.target.value))},children:[Object(k.jsx)("option",{value:"-1",children:"n/a"}),new Array(r).fill(0).map((function(t,e){return Object(k.jsxs)("option",{value:e,children:["bit ",e]},e)}))]})};function G(){var t=r.a.useState(null),e=Object(R.a)(t,2),i=e[0],s=e[1],a=r.a.useState(null),n=Object(R.a)(a,2),o=n[0],h=n[1],u=r.a.useState(-1),c=Object(R.a)(u,2),d=c[0],p=c[1],l=r.a.useState(-1),f=Object(R.a)(l,2),_=f[0],m=f[1],S=r.a.useState(-1),y=Object(R.a)(S,2),g=y[0],x=y[1],b=r.a.useState(1),w=Object(R.a)(b,2),z=w[0],j=w[1];var M=function(){var t;switch(z){case 0:t=function(t,e,i,s){for(var r=new ImageData(t.mapSize,t.mapSize),a=function(t,e){return 0!==(t&1<<e)?0:255},n=0;n<t.mapSize*t.mapSize;n++){var o=t.flagsMap[n];r.data[4*n+0]=-1!==e?a(o,e):0,r.data[4*n+1]=-1!==i?a(o,i):0,r.data[4*n+2]=-1!==s?a(o,s):0,r.data[4*n+3]=255}return r}(i,d,_,g);break;case 1:t=H(i,"heightMap");break;case 2:t=H(i,"waterMap")}return t};return Object(k.jsx)("div",{onDragOver:function(t){t.preventDefault()},onDrop:function(t){var e;if(t.preventDefault(),null===(e=t.dataTransfer.files)||void 0===e?void 0:e.length){var i=t.dataTransfer.files[0].name,r=URL.createObjectURL(t.dataTransfer.files[0]);fetch(r).then((function(t){return t.arrayBuffer()})).then((function(t){var e=new F.a(new v.a(t));h(i),s(e)}))}},style:{width:"100%",height:"100%",margin:"5px",userSelect:"text"},children:i&&o?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("h1",{children:o}),Object(k.jsxs)("select",{value:z,onChange:function(t){return j(parseInt(t.target.value))},children:[Object(k.jsx)("option",{value:"0",children:"Flags"}),Object(k.jsx)("option",{value:"1",children:"Heightmap"}),Object(k.jsx)("option",{value:"2",children:"Watermap"})]}),0===z&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(W,{value:d,bitCount:16,onChange:function(t){return p(t)}}),Object(k.jsx)(W,{value:_,bitCount:16,onChange:function(t){return m(t)}}),Object(k.jsx)(W,{value:g,bitCount:16,onChange:function(t){return x(t)}})]}),Object(k.jsx)("button",{onClick:function(){var t=M();if(t){var e=document.createElement("canvas"),i=e.getContext("2d");if(i){i.canvas.width=t.width,i.canvas.height=t.height,i.putImageData(t,0,0);var s=e.toDataURL("image/png"),r=(null===o||void 0===o?void 0:o.replace(/\.MAP$/i,""))||"";switch(z){case 0:r+="-r".concat(d,"g").concat(_,"b").concat(g,".png");break;case 1:r+="-height.png";break;case 2:r+="-water.png"}var a=document.createElement("a");a.setAttribute("download",r),a.setAttribute("href",s.replace("image/png","image/octet-stream")),a.click()}}},children:"Download"}),Object(k.jsx)("br",{}),Object(k.jsx)("br",{}),Object(k.jsx)(N,{width:i.mapSize,height:i.mapSize,drawContent:function(t){var e=M();e&&t.putImageData(e,0,0)}})]}):Object(k.jsx)("h1",{children:"Drop a Carnivores 1/2/IceAge MAP file here"})})}function K(){return Object(k.jsx)("div",{})}function J(){return Object(k.jsx)(o.a,{children:Object(k.jsxs)(h.c,{children:[Object(k.jsx)(h.a,{exact:!0,path:"/",children:Object(k.jsx)(V,{})}),Object(k.jsx)(h.a,{path:"/edit-map",children:Object(k.jsx)(G,{})}),Object(k.jsx)(h.a,{path:"/edit-model",children:Object(k.jsx)(K,{})})]})})}var Y=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,148)).then((function(e){var i=e.getCLS,s=e.getFID,r=e.getFCP,a=e.getLCP,n=e.getTTFB;i(t),s(t),r(t),a(t),n(t)}))};n.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(J,{})}),document.getElementById("root")),Y()},72:function(t,e,i){var s,r,a=void 0;s=this,r=function(t){return function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}t.prototype._read=function(){this.heightMap=new Array(this.mapSize*this.mapSize);for(var t=0;t<this.mapSize*this.mapSize;t++)this.heightMap[t]=this._io.readU1();for(this.textureMap1=new Array(this.mapSize*this.mapSize),t=0;t<this.mapSize*this.mapSize;t++)switch(this.version){case 1:this.textureMap1[t]=this._io.readU1();break;case 2:this.textureMap1[t]=this._io.readU2le()}for(this.textureMap2=new Array(this.mapSize*this.mapSize),t=0;t<this.mapSize*this.mapSize;t++)switch(this.version){case 1:this.textureMap2[t]=this._io.readU1();break;case 2:this.textureMap2[t]=this._io.readU2le()}for(this.objectMap=this._io.readBytes(this.mapSize*this.mapSize),this.flagsMap=new Array(this.mapSize*this.mapSize),t=0;t<this.mapSize*this.mapSize;t++)switch(this.version){case 1:this.flagsMap[t]=new e(this._io,this,this._root);break;case 2:this.flagsMap[t]=new i(this._io,this,this._root)}2==this.version&&(this.dawnLightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.dayLightMap=this._io.readBytes(this.mapSize*this.mapSize),2==this.version&&(this.nightLightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.waterMap=this._io.readBytes(this.mapSize*this.mapSize),this.objectHeightMap=this._io.readBytes(this.mapSize*this.mapSize),this.fogsMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4)),this.ambientMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4))};var e=t.FlagsV1=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.fTexDirection=this._io.readBitsIntLe(2),this.fModelDirection=this._io.readBitsIntLe(3),this.fNoWay=0!=this._io.readBitsIntLe(1),this.fReverse=0!=this._io.readBitsIntLe(1),this.fWater=0!=this._io.readBitsIntLe(1)},t}(),i=t.FlagsV2=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.fTexDirection=this._io.readBitsIntLe(2),this.fModelDirection=this._io.readBitsIntLe(2),this.fReverse=0!=this._io.readBitsIntLe(1),this.fNoWay=0!=this._io.readBitsIntLe(1),this.unused1=0!=this._io.readBitsIntLe(1),this.fWater=0!=this._io.readBitsIntLe(1),this.fTex2Direction=this._io.readBitsIntLe(2),this.unused2=this._io.readBitsIntLe(5),this.fWater2=0!=this._io.readBitsIntLe(1)},t}();return Object.defineProperty(t.prototype,"mapSize",{get:function(){return void 0!==this._m_mapSize||(this._m_mapSize=512*this.version),this._m_mapSize}}),Object.defineProperty(t.prototype,"yScale",{get:function(){return void 0!==this._m_yScale||(this._m_yScale=32*this.version),this._m_yScale}}),Object.defineProperty(t.prototype,"version",{get:function(){return void 0!==this._m_version||(this._m_version=2228224==this._io.size?1:14155776==this._io.size?2:0),this._m_version}}),Object.defineProperty(t.prototype,"tileSize",{get:function(){return void 0!==this._m_tileSize||(this._m_tileSize=256),this._m_tileSize}}),Object.defineProperty(t.prototype,"isValid",{get:function(){return void 0!==this._m_isValid||(this._m_isValid=1==this.version||2==this.version),this._m_isValid}}),t}()},"function"===typeof a&&a.amd?a(["kaitai-struct/KaitaiStream"],r):t.exports?t.exports=r(i(20)):s.Map=r(s.KaitaiStream)},73:function(t,e,i){var s,r,a=void 0;s=this,r=function(t,e){return function(){function t(t,e,i,s){this._io=t,this._parent=e,this._root=i||this,this.version=s,this._read()}t.AudioReverb=Object.freeze({GENERIC:0,PLATE:1,FOREST:2,MOUNTAIN:3,CANYON:4,CAVE:5,SPECIAL2:6,UNUSED:7,0:"GENERIC",1:"PLATE",2:"FOREST",3:"MOUNTAIN",4:"CANYON",5:"CAVE",6:"SPECIAL2",7:"UNUSED"}),t.prototype._read=function(){this.textureCount=this._io.readU4le(),this.modelCount=this._io.readU4le(),2==this.version&&(this.dawnSkyRgb=new i(this._io,this,this._root)),this.daySkyRgb=new i(this._io,this,this._root),2==this.version&&(this.nightSkyRgb=new i(this._io,this,this._root)),2==this.version&&(this.dawnSkyTRgb=new i(this._io,this,this._root)),this.daySkyTRgb=new i(this._io,this,this._root),2==this.version&&(this.nightSkyTRgb=new i(this._io,this,this._root)),this.textures=new Array(this.textureCount);for(var t=0;t<this.textureCount;t++)this.textures[t]=new c(this._io,this,this._root);for(this.models=new Array(this.modelCount),t=0;t<this.modelCount;t++)this.models[t]=new s(this._io,this,this._root);for(2==this.version&&(this.dawnSkyTexture=this._io.readBytes(this.skyTextureWidth*this.skyTextureHeight*2)),this.daySkyTexture=this._io.readBytes(this.skyTextureWidth*this.skyTextureHeight*2),2==this.version&&(this.nightSkyTexture=this._io.readBytes(this.skyTextureWidth*this.skyTextureHeight*2)),this.cloudsMap=this._io.readBytes(16384),this.fogCount=this._io.readU4le(),this.fogList=new Array(this.fogCount),t=0;t<this.fogCount;t++)this.fogList[t]=new o(this._io,this,this._root);for(this.randomSoundCount=this._io.readU4le(),this.randomSounds=new Array(this.randomSoundCount),t=0;t<this.randomSoundCount;t++)this.randomSounds[t]=new u(this._io,this,this._root);for(this.ambientSoundCount=this._io.readU4le(),this.ambientSounds=new Array(this.ambientSoundCount),t=0;t<this.ambientSoundCount;t++)this.ambientSounds[t]=new h(this._io,this,this._root);if(2==this.version&&(this.waterCount=this._io.readU4le()),2==this.version)for(this.waters=new Array(this.waterCount),t=0;t<this.waterCount;t++)this.waters[t]=new n(this._io,this,this._root)};var i=t.Rgb=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.r=this._io.readU4le(),this.g=this._io.readU4le(),this.b=this._io.readU4le()},t}(),s=t.Model=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.radius=this._io.readS4le(),this.yLo=this._io.readS4le(),this.yHi=this._io.readS4le(),this.lineLength=this._io.readS4le(),this.lIntensity=this._io.readS4le(),this.circleRad=this._io.readS4le(),this.cIntensity=this._io.readS4le(),this.fPlaceWater=0!=this._io.readBitsIntLe(1),this.fPlaceGround=0!=this._io.readBitsIntLe(1),this.fPlaceUser=0!=this._io.readBitsIntLe(1),this.fCircle=0!=this._io.readBitsIntLe(1),this.fBound=0!=this._io.readBitsIntLe(1),this.fNoBmp=0!=this._io.readBitsIntLe(1),this.fNoLight=0!=this._io.readBitsIntLe(1),this.fDefaultLight=0!=this._io.readBitsIntLe(1),this.fGroundLight=0!=this._io.readBitsIntLe(1),this.fNoSoft=0!=this._io.readBitsIntLe(1),this.fNoSoft2=0!=this._io.readBitsIntLe(1),this.fUnused=this._io.readBitsIntLe(20),this.fIsAnimated=0!=this._io.readBitsIntLe(1),this._io.alignToByte(),this.grRad=this._io.readS4le(),this.refLight=this._io.readS4le(),this.lastAniTime=this._io.readU4le(),this.boundR=this._io.readF4le(),this.reserved=this._io.readBytes(16),this.model=new e(this._io,this,null),2==this._root.version&&(this.billboard=new c(this._io,this,this._root)),this.fIsAnimated&&(this.animation=new a(this._io,this,this._root))},t}(),r=t.Trd=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.rNumber=this._io.readU4le(),this.rVolume=this._io.readU4le(),this.rFrequency=this._io.readU4le(),this.rEnvironment=this._io.readU2le(),this.rfNotAtNight=0!=this._io.readBitsIntLe(1),this.rfUnused=this._io.readBitsIntLe(15)},t}(),a=t.ModelAnimation=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.vc0=this._io.readU4le(),this.vc1=this._io.readU4le(),this.vc2=this._io.readU4le(),this.kps=this._io.readU4le(),this.frameCount=this._io.readU4le(),this.frames=new Array(3*this.frameCount*this.vc1);for(var t=0;t<3*this.frameCount*this.vc1;t++)this.frames[t]=this._io.readS2le()},t}(),n=t.Water=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.textureIndex=this._io.readU4le(),this.level=this._io.readU4le(),this.opacity=this._io.readF4le(),this.fogRgb=this._io.readU4le()},t}(),o=t.FogEntry=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.fogRgb=this._io.readU4le(),this.yBegin=this._io.readF4le(),this.mortal=this._io.readU4le(),this.transp=this._io.readF4le(),this.fLimit=this._io.readF4le()},t}(),h=t.AmbientSound=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.pcmSize=this._io.readU4le(),this.pcm=this._io.readBytes(this.pcmSize),this.rData=new Array(16);for(var t=0;t<16;t++)this.rData[t]=new r(this._io,this,this._root);this.rsfxCount=this._io.readU4le(),this.aVolume=this._io.readU4le()},t}(),u=t.RandomSound=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.pcmSize=this._io.readU4le(),this.pcm=this._io.readBytes(this.pcmSize)},t}(),c=t.Texture=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.data=this._io.readBytes(this.width*this.height*2)},Object.defineProperty(t.prototype,"width",{get:function(){return void 0!==this._m_width||(this._m_width=128),this._m_width}}),Object.defineProperty(t.prototype,"height",{get:function(){return void 0!==this._m_height||(this._m_height=128),this._m_height}}),t}();return Object.defineProperty(t.prototype,"skyTextureWidth",{get:function(){return void 0!==this._m_skyTextureWidth||(this._m_skyTextureWidth=256),this._m_skyTextureWidth}}),Object.defineProperty(t.prototype,"skyTextureHeight",{get:function(){return void 0!==this._m_skyTextureHeight||(this._m_skyTextureHeight=256),this._m_skyTextureHeight}}),t}()},"function"===typeof a&&a.amd?a(["kaitai-struct/KaitaiStream","./C3df"],r):t.exports?t.exports=r(i(20),i(131)):s.Rsc=r(s.KaitaiStream,s.C3df)},78:function(t,e,i){var s,r,a;r=[i(20)],void 0===(a="function"===typeof(s=function(t){return function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.heightMap=this._io.readBytes(this.mapSize*this.mapSize),this.textureMap1=new Array(this.mapSize*this.mapSize);for(var t=0;t<this.mapSize*this.mapSize;t++)switch(this.isV1){case!0:this.textureMap1[t]=this._io.readU1();break;case!1:this.textureMap1[t]=this._io.readU2le()}for(this.textureMap2=new Array(this.mapSize*this.mapSize),t=0;t<this.mapSize*this.mapSize;t++)switch(this.isV1){case!0:this.textureMap2[t]=this._io.readU1();break;case!1:this.textureMap2[t]=this._io.readU2le()}for(this.objectMap=this._io.readBytes(this.mapSize*this.mapSize),this.flagsMap=new Array(this.mapSize*this.mapSize),t=0;t<this.mapSize*this.mapSize;t++)switch(this.isV1){case!0:this.flagsMap[t]=this._io.readU1();break;case!1:this.flagsMap[t]=this._io.readU2le()}this.isV1&&(this.lightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.isV2&&(this.dawnLightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.isV2&&(this.dayLightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.isV2&&(this.nightLightMap=this._io.readBytes(this.mapSize*this.mapSize)),this.waterMap=this._io.readBytes(this.mapSize*this.mapSize),this.objectHeightMap=this._io.readBytes(this.mapSize*this.mapSize),this.fogsMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4)),this.ambientMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4))},Object.defineProperty(t.prototype,"isV1",{get:function(){return void 0!==this._m_isV1||(this._m_isV1=2228224==this._io.size),this._m_isV1}}),Object.defineProperty(t.prototype,"isV2",{get:function(){return void 0!==this._m_isV2||(this._m_isV2=14155776==this._io.size),this._m_isV2}}),Object.defineProperty(t.prototype,"isValid",{get:function(){return void 0!==this._m_isValid||(this._m_isValid=this.isV1||this.isV2),this._m_isValid}}),Object.defineProperty(t.prototype,"mapSize",{get:function(){return void 0!==this._m_mapSize||(this._m_mapSize=this.isV1?512:1024),this._m_mapSize}}),t}()})?s.apply(e,r):s)||(t.exports=a)},84:function(t,e,i){}},[[142,1,2]]]);
//# sourceMappingURL=main.ce2429ee.chunk.js.map