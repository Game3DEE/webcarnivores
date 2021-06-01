// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Carnivores1Map = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Carnivores1Map = (function() {
  function Carnivores1Map(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;
    this._debug = {};

  }
  Carnivores1Map.prototype._read = function() {
    this._debug.heightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.heightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this._debug.heightMap.end = this._io.pos;
    this._debug.textureMap1 = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.textureMap1 = new Array((this.mapSize * this.mapSize));
    this._debug.textureMap1.arr = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      this._debug.textureMap1.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      switch (this.isV1) {
      case true:
        this._debug.textureMap1.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.textureMap1[i] = this._io.readU1();
        this._debug.textureMap1.arr[i].end = this._io.pos;
        break;
      case false:
        this._debug.textureMap1.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.textureMap1[i] = this._io.readU2le();
        this._debug.textureMap1.arr[i].end = this._io.pos;
        break;
      }
      this._debug.textureMap1.arr[i].end = this._io.pos;
    }
    this._debug.textureMap1.end = this._io.pos;
    this._debug.textureMap2 = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.textureMap2 = new Array((this.mapSize * this.mapSize));
    this._debug.textureMap2.arr = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      this._debug.textureMap2.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      switch (this.isV1) {
      case true:
        this._debug.textureMap2.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.textureMap2[i] = this._io.readU1();
        this._debug.textureMap2.arr[i].end = this._io.pos;
        break;
      case false:
        this._debug.textureMap2.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.textureMap2[i] = this._io.readU2le();
        this._debug.textureMap2.arr[i].end = this._io.pos;
        break;
      }
      this._debug.textureMap2.arr[i].end = this._io.pos;
    }
    this._debug.textureMap2.end = this._io.pos;
    this._debug.objectMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.objectMap = this._io.readBytes((this.mapSize * this.mapSize));
    this._debug.objectMap.end = this._io.pos;
    this._debug.flagsMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.flagsMap = new Array((this.mapSize * this.mapSize));
    this._debug.flagsMap.arr = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      this._debug.flagsMap.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      switch (this.isV1) {
      case true:
        this._debug.flagsMap.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.flagsMap[i] = this._io.readU1();
        this._debug.flagsMap.arr[i].end = this._io.pos;
        break;
      case false:
        this._debug.flagsMap.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.flagsMap[i] = this._io.readU2le();
        this._debug.flagsMap.arr[i].end = this._io.pos;
        break;
      }
      this._debug.flagsMap.arr[i].end = this._io.pos;
    }
    this._debug.flagsMap.end = this._io.pos;
    if (this.isV1) {
      this._debug.lightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.lightMap = this._io.readBytes((this.mapSize * this.mapSize));
      this._debug.lightMap.end = this._io.pos;
    }
    if (this.isV2) {
      this._debug.dawnLightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.dawnLightMap = this._io.readBytes((this.mapSize * this.mapSize));
      this._debug.dawnLightMap.end = this._io.pos;
    }
    if (this.isV2) {
      this._debug.dayLightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.dayLightMap = this._io.readBytes((this.mapSize * this.mapSize));
      this._debug.dayLightMap.end = this._io.pos;
    }
    if (this.isV2) {
      this._debug.nightLightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.nightLightMap = this._io.readBytes((this.mapSize * this.mapSize));
      this._debug.nightLightMap.end = this._io.pos;
    }
    this._debug.waterMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.waterMap = this._io.readBytes((this.mapSize * this.mapSize));
    this._debug.waterMap.end = this._io.pos;
    this._debug.objectHeightMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.objectHeightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this._debug.objectHeightMap.end = this._io.pos;
    this._debug.fogsMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.fogsMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
    this._debug.fogsMap.end = this._io.pos;
    this._debug.ambientMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.ambientMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
    this._debug.ambientMap.end = this._io.pos;
  }
  Object.defineProperty(Carnivores1Map.prototype, 'isV1', {
    get: function() {
      if (this._m_isV1 !== undefined)
        return this._m_isV1;
      this._debug._m_isV1 = {  };
      this._m_isV1 = this._io.size == 2228224;
      return this._m_isV1;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'isV2', {
    get: function() {
      if (this._m_isV2 !== undefined)
        return this._m_isV2;
      this._debug._m_isV2 = {  };
      this._m_isV2 = this._io.size == 14155776;
      return this._m_isV2;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'isValid', {
    get: function() {
      if (this._m_isValid !== undefined)
        return this._m_isValid;
      this._debug._m_isValid = {  };
      this._m_isValid =  ((this.isV1) || (this.isV2)) ;
      return this._m_isValid;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'mapSize', {
    get: function() {
      if (this._m_mapSize !== undefined)
        return this._m_mapSize;
      this._debug._m_mapSize = {  };
      this._m_mapSize = (this.isV1 ? 512 : 1024);
      return this._m_mapSize;
    }
  });

  /**
   * Terrain heightmap, for water tiles it specifies the water surface height
   */

  /**
   * Terrain texture map, every byte specifies a texture index for the terrain
   */

  /**
   * Object placement map, every byte specifies an object (< 254), a spawn location (254), or no model (255)
   */

  /**
   * Flags map, specifies render flags per tile. This includes rotation of terrain texture, of object, and more.
   */

  /**
   * Light map, specifies lighting of placed objects
   */

  /**
   * Water heightmap, specifies "sea floor" terrain heights
   */

  /**
   * Object heightmap, height placement of objects (flags map can specify to align to sea floor level or terrain ground level too)
   */

  /**
   * Fog map, which areas are covered in fog in game.
   */

  /**
   * Ambient sounds map
   */

  return Carnivores1Map;
})();
return Carnivores1Map;
}));
