(this.webpackJsonpwebcarnivores=this.webpackJsonpwebcarnivores||[]).push([[0],{102:function(t,e){},103:function(t,e){},106:function(t,e){},108:function(t,e){},128:function(t,e,i){},136:function(t,e,i){"use strict";i.r(e);var s=i(5),r=i.n(s),o=i(69),n=i.n(o),a=(i(81),i(76)),h=i(12),d=i(14),u=i(140),_=i(139),c=i(18),f=i(21),p=i.n(f),l=i(43),m=i(35),y=i.n(m),S=i(7),v=i(70),x=i.n(v),b=i(71),w=i.n(b),g="HUNTDAT/AREAS",z=256,j=128;function M(t){var e=new S.PlaneBufferGeometry(t.mapSize*z,t.mapSize*z,t.mapSize-1,t.mapSize-1);e.rotateX(-Math.PI/2);for(var i=0;i<t.mapSize*t.mapSize;i++)e.attributes.position.setY(i,32*t.heightMap[i]);return e.computeVertexNormals(),e.toNonIndexed()}function U(t){for(var e=Math.ceil(Math.sqrt(t.textureCount)),i=e*j*3,s=new Uint8Array(e*i*j),r=0;r<t.textureCount;r++)for(var o=Math.floor(r/e),n=Math.floor(r%e),a=o*i*j+n*j*3,h=0;h<j;h++){for(var d=0;d<j;d++){var u=t.textures[r].data[h*j+d];s[a++]=(u>>10&31)<<3,s[a++]=(u>>5&31)<<3,s[a++]=(u>>0&31)<<3}a-=384,a+=i}var _=e*j;console.log(t,_,e,s.byteLength);var c=new S.DataTexture(s,_,_,S.RGBFormat,S.UnsignedByteType);return c.needsUpdate=!0,c}function A(t,e,i){for(var s=e.image.width/j,r=1/s,o=t.attributes.uv,n=0,a=0;a<i.mapSize-1;a++)for(var h=0;h<i.mapSize-1;h++){var d=i.textureMap1[i.mapSize*a+h],u=3&i.fMap[i.mapSize*a+h],_=Math.floor(d/s)*r,c=Math.floor(d%s)*r,f=[[c,_],[c,_+r],[c+r,_],[c+r,_+r]],p=0,l=1,m=2,y=1,S=3,v=2;switch(u){case 0:break;case 1:p=1,l=y=3,m=v=0,S=2;break;case 2:p=3,l=y=2,m=v=1,S=0;break;case 3:p=2,l=y=0,m=v=3,S=1}o.setX(n+0,f[p][0]),o.setY(n+0,f[p][1]),o.setX(n+1,f[l][0]),o.setY(n+1,f[l][1]),o.setX(n+2,f[m][0]),o.setY(n+2,f[m][1]),o.setX(n+3,f[y][0]),o.setY(n+3,f[y][1]),o.setX(n+4,f[S][0]),o.setY(n+4,f[S][1]),o.setX(n+5,f[v][0]),o.setY(n+5,f[v][1]),n+=6}o.needsUpdate=!0}function B(t,e,i){var s=[],r=e.mapSize,o=r/2;function n(t,i){return 32*e.heightMap[i*e.mapSize+t]}for(var a=new S.Matrix4,h=0;h<r;h++)for(var d=0;d<r;d++){var u=e.oMap[h*r+d];if(u<254)a.makeTranslation((d-o)*z,n(d,h),(h-o)*z),s[u]?s[u].push.apply(s[u],a.toArray()):s[u]=a.toArray();else if(254===u){var _=new S.Mesh(new S.SphereBufferGeometry(128),new S.MeshLambertMaterial({color:16711680}));_.position.set((d-o)*z,n(d,h),(h-o)*z),i.add(_)}}t.models.forEach((function(t,e){if(s[e]){for(var r=s[e].length/16,o=function(t,e){var i,s=new S.BufferGeometry,r=[],o=[],n=[];function a(t,e,i){return o[2*t+0]=e,o[2*t+1]=i,t}return t.forEach((function(t){r.push(t.x,t.y,t.z)})),e.forEach((function(t){var e=t.v1,s=t.v2,r=t.v3;i=a(e,t.tax/256,t.tay/256),n.push(i),i=a(s,t.tbx/256,t.tby/256),n.push(i),i=a(r,t.tcx/256,t.tcy/256),n.push(i)})),s.setAttribute("position",new S.Float32BufferAttribute(r,3)),s.setAttribute("uv",new S.Float32BufferAttribute(o,2)),s.setIndex(n),s.computeVertexNormals(),s}(t.vertices,t.faces),n=function(t,e){for(var i=256,s=e/512,r=new Uint8Array(i*s*4),o=0;o<s;o++)for(var n=0;n<i;n++){var a=t[o*i+n],h=4*(o*i+n);r[h++]=(a>>10&31)<<3,r[h++]=(a>>5&31)<<3,r[h++]=(a>>0&31)<<3,r[h++]=a?255:0}var d=new S.DataTexture(r,i,s,S.RGBAFormat,S.UnsignedByteType);return d.needsUpdate=!0,d}(t.textureData,t.textureSize),h=new S.InstancedMesh(o,new S.MeshLambertMaterial({map:n,transparent:!0,alphaTest:.5}),r),d=0;d<r;d++)a.fromArray(s[e],16*d),h.setMatrixAt(d,a);i.add(h)}}))}function C(){return(C=Object(l.a)(p.a.mark((function t(e){var i,s,r,o,n,a,h;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=new S.Group,t.prev=1,t.next=4,fetch("".concat(g,"/").concat(e,".MAP")).then((function(t){return t.arrayBuffer()}));case 4:return s=t.sent,t.next=7,fetch("".concat(g,"/").concat(e,".RSC")).then((function(t){return t.arrayBuffer()}));case 7:r=t.sent,o=new x.a(new y.a(s)),n=new w.a(new y.a(r)),a=M(o),h=U(n),A(a,h,o),B(n,o,i),i.add(new S.Mesh(a,new S.MeshLambertMaterial({map:h}))),t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(1),console.error(t.t0),t.abrupt("return",void 0);case 21:return t.abrupt("return",i);case 22:case"end":return t.stop()}}),t,null,[[1,17]])})))).apply(this,arguments)}i(128);var O=i(11);function T(t){var e=t.setLoading,i=Object(c.e)().scene;return console.log("Terrain"),r.a.useEffect((function(){console.time("loadArea"),function(t){return C.apply(this,arguments)}("AREA1").then((function(t){console.timeEnd("loadArea"),t&&i.add(t),e(!1)}))}),[e,i]),null}function F(){var t=r.a.useState(!0),e=Object(d.a)(t,2),i=e[0],s=e[1];return Object(O.jsxs)(O.Fragment,{children:[i&&Object(O.jsx)("div",{className:"center",children:Object(O.jsx)("p",{children:"Loading, please wait"})}),Object(O.jsxs)(c.a,{shadows:!0,linear:!0,camera:{position:[0,12e3,12e3],fov:30,near:1,far:1e6},children:[Object(O.jsx)(u.a,{}),Object(O.jsx)("directionalLight",{args:[14674943,1],position:[50,200,100],"shadow-mapSize-width":1024,"shadow-mapSize-height":1024,"shadow-camera-left":-300,"shadow-camera-right":300,"shadow-camera-top":300,"shadow-camera-bottom":-300,"shadow-camera-far":1e3,castShadow:!0}),Object(O.jsx)("ambientLight",{args:[6710886]}),Object(O.jsx)(_.a,{maxPolarAngle:.4*Math.PI}),Object(O.jsx)(T,{setLoading:s})]})]})}function k(){return Object(O.jsx)("div",{})}function L(){return Object(O.jsx)("div",{})}function P(){return Object(O.jsx)(a.a,{children:Object(O.jsxs)(h.c,{children:[Object(O.jsx)(h.a,{exact:!0,path:"/",children:Object(O.jsx)(F,{})}),Object(O.jsx)(h.a,{path:"/edit-map",children:Object(O.jsx)(k,{})}),Object(O.jsx)(h.a,{path:"/edit-model",children:Object(O.jsx)(L,{})})]})})}var R=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,141)).then((function(e){var i=e.getCLS,s=e.getFID,r=e.getFCP,o=e.getLCP,n=e.getTTFB;i(t),s(t),r(t),o(t),n(t)}))};n.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(P,{})}),document.getElementById("root")),R()},70:function(t,e,i){var s,r,o;r=[i(35)],void 0===(o="function"===typeof(s=function(t){return function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.heightMap=this._io.readBytes(this.mapSize*this.mapSize),this.textureMap1=this._io.readBytes(this.mapSize*this.mapSize),this.textureMap2=this._io.readBytes(this.mapSize*this.mapSize),this.oMap=this._io.readBytes(this.mapSize*this.mapSize),this.fMap=this._io.readBytes(this.mapSize*this.mapSize),this.lightMap=this._io.readBytes(this.mapSize*this.mapSize),this.waterMap=this._io.readBytes(this.mapSize*this.mapSize),this.heightMap0=this._io.readBytes(this.mapSize*this.mapSize),this.fogsMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4)),this.ambientMap=this._io.readBytes(Math.floor(this.mapSize*this.mapSize/4))},Object.defineProperty(t.prototype,"mapSize",{get:function(){return void 0!==this._m_mapSize||(this._m_mapSize=512),this._m_mapSize}}),t}()})?s.apply(e,r):s)||(t.exports=o)},71:function(t,e,i){var s,r,o;r=[i(35)],void 0===(o="function"===typeof(s=function(t){return function(){function e(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}e.prototype._read=function(){this.textureCount=this._io.readU4le(),this.modelCount=this._io.readU4le(),this.skyRgb=new i(this._io,this,this._root),this.skyTRgb=new i(this._io,this,this._root),this.textures=new Array(this.textureCount);for(var t=0;t<this.textureCount;t++)this.textures[t]=new f(this._io,this,this._root);for(this.models=new Array(this.modelCount),t=0;t<this.modelCount;t++)this.models[t]=new r(this._io,this,this._root);for(this.skyTexture=new Array(Math.floor(this.skyTextureSize/2)),t=0;t<Math.floor(this.skyTextureSize/2);t++)this.skyTexture[t]=this._io.readU2le();for(this.skyMap=this._io.readBytes(16384),this.fogCount=this._io.readU4le(),this.fogList=new Array(this.fogCount),t=0;t<this.fogCount;t++)this.fogList[t]=new d(this._io,this,this._root);for(this.randomSoundCount=this._io.readU4le(),this.randomSounds=new Array(this.randomSoundCount),t=0;t<this.randomSoundCount;t++)this.randomSounds[t]=new c(this._io,this,this._root);for(this.ambientSoundCount=this._io.readU4le(),this.ambientSounds=new Array(this.ambientSoundCount),t=0;t<this.ambientSoundCount;t++)this.ambientSounds[t]=new u(this._io,this,this._root)};var i=e.Rgb=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.r=this._io.readU4le(),this.g=this._io.readU4le(),this.b=this._io.readU4le()},t}(),s=e.Vertex=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.x=this._io.readF4le(),this.y=this._io.readF4le(),this.z=this._io.readF4le(),this.owner=this._io.readS2le(),this.hide=this._io.readU2le()},t}(),r=e.Model=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.modelInfo=new n(this._io,this,this._root),this.vertCount=this._io.readU4le(),this.faceCount=this._io.readU4le(),this.nodeCount=this._io.readU4le(),this.textureSize=this._io.readU4le(),this.faces=new Array(this.faceCount);for(var t=0;t<this.faceCount;t++)this.faces[t]=new h(this._io,this,this._root);for(this.vertices=new Array(this.vertCount),t=0;t<this.vertCount;t++)this.vertices[t]=new s(this._io,this,this._root);for(this.nodes=new Array(this.nodeCount),t=0;t<this.nodeCount;t++)this.nodes[t]=new _(this._io,this,this._root);for(this.textureData=new Array(Math.floor(this.textureSize/2)),t=0;t<Math.floor(this.textureSize/2);t++)this.textureData[t]=this._io.readU2le();this.modelInfo.isAnimated&&(this.animation=new a(this._io,this,this._root))},t}(),o=e.Trd=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.rNumber=this._io.readU4le(),this.rVolume=this._io.readU4le(),this.rFrequency=this._io.readU4le(),this.rEnvironment=this._io.readU4le()},t}(),n=e.ModelInfo=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.radius=this._io.readS4le(),this.yLo=this._io.readS4le(),this.yHi=this._io.readS4le(),this.lineLength=this._io.readS4le(),this.lIntensity=this._io.readS4le(),this.circleRad=this._io.readS4le(),this.cIntensity=this._io.readS4le(),this.flags=this._io.readU4le(),this.grRad=this._io.readS4le(),this.refLight=this._io.readS4le(),this.lastAniTime=this._io.readU4le(),this.boundR=this._io.readF4le(),this.reserved=this._io.readBytes(16)},Object.defineProperty(t.prototype,"isAnimated",{get:function(){return void 0!==this._m_isAnimated||(this._m_isAnimated=0!=(2147483648&this.flags)),this._m_isAnimated}}),Object.defineProperty(t.prototype,"notLighted",{get:function(){return void 0!==this._m_notLighted||(this._m_notLighted=0!=(64&this.flags)),this._m_notLighted}}),Object.defineProperty(t.prototype,"needsBound",{get:function(){return void 0!==this._m_needsBound||(this._m_needsBound=0!=(16&this.flags)),this._m_needsBound}}),t}(),a=e.ModelAnimation=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.vc0=this._io.readU4le(),this.vc1=this._io.readU4le(),this.vc2=this._io.readU4le(),this.kps=this._io.readU4le(),this.frameCount=this._io.readU4le(),this.frames=new Array(3*this.frameCount*this.vc1);for(var t=0;t<3*this.frameCount*this.vc1;t++)this.frames[t]=this._io.readS2le()},t}(),h=e.Face=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.v1=this._io.readU4le(),this.v2=this._io.readU4le(),this.v3=this._io.readU4le(),this.tax=this._io.readS4le(),this.tbx=this._io.readS4le(),this.tcx=this._io.readS4le(),this.tay=this._io.readS4le(),this.tby=this._io.readS4le(),this.tcy=this._io.readS4le(),this.flags=this._io.readU2le(),this.dMask=this._io.readU2le(),this.distant=this._io.readS4le(),this.next=this._io.readU4le(),this.group=this._io.readU4le(),this.reserved=this._io.readBytes(12)},t}(),d=e.FogEntry=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.fogRgb=this._io.readU4le(),this.yBegin=this._io.readF4le(),this.mortal=this._io.readU4le(),this.transp=this._io.readF4le(),this.fLimit=this._io.readF4le()},t}(),u=e.AmbientSound=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.pcmSize=this._io.readU4le(),this.pcm=this._io.readBytes(this.pcmSize),this.rData=new Array(16);for(var t=0;t<16;t++)this.rData[t]=new o(this._io,this,this._root);this.rsfxCount=this._io.readU4le(),this.aVolume=this._io.readU4le()},t}(),_=e.Node=function(){function e(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return e.prototype._read=function(){this.name=t.bytesToStr(t.bytesTerminate(this._io.readBytes(32),0,!1),"utf8"),this.x=this._io.readF4le(),this.y=this._io.readF4le(),this.z=this._io.readF4le(),this.owner=this._io.readS2le(),this.hide=this._io.readU2le()},e}(),c=e.RandomSound=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.pcmSize=this._io.readU4le(),this.pcm=this._io.readBytes(this.pcmSize)},t}(),f=e.Texture=function(){function t(t,e,i){this._io=t,this._parent=e,this._root=i||this,this._read()}return t.prototype._read=function(){this.data=new Array(Math.floor(this.size/2));for(var t=0;t<Math.floor(this.size/2);t++)this.data[t]=this._io.readU2le()},Object.defineProperty(t.prototype,"size",{get:function(){return void 0!==this._m_size||(this._m_size=32768),this._m_size}}),t}();return Object.defineProperty(e.prototype,"skyTextureSize",{get:function(){return void 0!==this._m_skyTextureSize||(this._m_skyTextureSize=131072),this._m_skyTextureSize}}),e}()})?s.apply(e,r):s)||(t.exports=o)},81:function(t,e,i){}},[[136,1,2]]]);
//# sourceMappingURL=main.0f51c58f.chunk.js.map