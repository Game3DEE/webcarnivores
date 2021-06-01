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

    this._read();
  }
  Carnivores1Map.prototype._read = function() {
    this.heightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.textureMap1 = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.isV1) {
      case true:
        this.textureMap1[i] = this._io.readU1();
        break;
      case false:
        this.textureMap1[i] = this._io.readU2le();
        break;
      }
    }
    this.textureMap2 = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.isV1) {
      case true:
        this.textureMap2[i] = this._io.readU1();
        break;
      case false:
        this.textureMap2[i] = this._io.readU2le();
        break;
      }
    }
    this.objectMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.flagsMap = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.isV1) {
      case true:
        this.flagsMap[i] = this._io.readU1();
        break;
      case false:
        this.flagsMap[i] = this._io.readU2le();
        break;
      }
    }
    if (this.isV1) {
      this.lightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    if (this.isV2) {
      this.dawnLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    if (this.isV2) {
      this.dayLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    if (this.isV2) {
      this.nightLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    this.waterMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.objectHeightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.fogsMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
    this.ambientMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
  }
  Object.defineProperty(Carnivores1Map.prototype, 'isV1', {
    get: function() {
      if (this._m_isV1 !== undefined)
        return this._m_isV1;
      this._m_isV1 = this._io.size == 2228224;
      return this._m_isV1;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'isV2', {
    get: function() {
      if (this._m_isV2 !== undefined)
        return this._m_isV2;
      this._m_isV2 = this._io.size == 14155776;
      return this._m_isV2;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'isValid', {
    get: function() {
      if (this._m_isValid !== undefined)
        return this._m_isValid;
      this._m_isValid =  ((this.isV1) || (this.isV2)) ;
      return this._m_isValid;
    }
  });
  Object.defineProperty(Carnivores1Map.prototype, 'mapSize', {
    get: function() {
      if (this._m_mapSize !== undefined)
        return this._m_mapSize;
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
