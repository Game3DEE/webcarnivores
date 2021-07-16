// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined, self = undefined;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Map = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
/**
 * @see {@link https://carnivores.fandom.com/wiki/Carnivores_2_MAP|Source}
 */

var Map = (function() {
  function Map(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Map.prototype._read = function() {
    this.heightMap = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      this.heightMap[i] = this._io.readU1();
    }
    this.textureMap1 = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.version) {
      case 1:
        this.textureMap1[i] = this._io.readU1();
        break;
      case 2:
        this.textureMap1[i] = this._io.readU2le();
        break;
      }
    }
    this.textureMap2 = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.version) {
      case 1:
        this.textureMap2[i] = this._io.readU1();
        break;
      case 2:
        this.textureMap2[i] = this._io.readU2le();
        break;
      }
    }
    this.objectMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.flagsMap = new Array((this.mapSize * this.mapSize));
    for (var i = 0; i < (this.mapSize * this.mapSize); i++) {
      switch (this.version) {
      case 1:
        this.flagsMap[i] = new FlagsV1(this._io, this, this._root);
        break;
      case 2:
        this.flagsMap[i] = new FlagsV2(this._io, this, this._root);
        break;
      }
    }
    if (this.version == 2) {
      this.dawnLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    this.dayLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    if (this.version == 2) {
      this.nightLightMap = this._io.readBytes((this.mapSize * this.mapSize));
    }
    this.waterMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.objectHeightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.fogsMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
    this.ambientMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
  }

  var FlagsV1 = Map.FlagsV1 = (function() {
    function FlagsV1(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FlagsV1.prototype._read = function() {
      this.fTexDirection = this._io.readBitsIntLe(2);
      this.fModelDirection = this._io.readBitsIntLe(3);
      this.fNoWay = this._io.readBitsIntLe(1) != 0;
      this.fReverse = this._io.readBitsIntLe(1) != 0;
      this.fWater = this._io.readBitsIntLe(1) != 0;
    }

    /**
     * 0: no rotation (right-side-up)
     * 1: rotated 90 degrees clockwise
     * 2: rotated 180 degrees (upside-down)
     * 3: rotated 90 degrees counter-clockwise
     */

    /**
     * Represents an angle, fully calculated as
     * (value * 2 * PI / 8) and used when rendering models on the tile.
     */

    /**
     * Indicates how the cell is diagonally split among both textures
     *   true: 2 - 1
     *   false: 1 - 2
     */

    /**
     * Marks the cell as having water in it, must be set for the Water Index
     * map to have any effect.
     */

    return FlagsV1;
  })();

  var FlagsV2 = Map.FlagsV2 = (function() {
    function FlagsV2(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FlagsV2.prototype._read = function() {
      this.fTexDirection = this._io.readBitsIntLe(2);
      this.fModelDirection = this._io.readBitsIntLe(2);
      this.fReverse = this._io.readBitsIntLe(1) != 0;
      this.fNoWay = this._io.readBitsIntLe(1) != 0;
      this.unused1 = this._io.readBitsIntLe(1) != 0;
      this.fWater = this._io.readBitsIntLe(1) != 0;
      this.fTex2Direction = this._io.readBitsIntLe(2);
      this.unused2 = this._io.readBitsIntLe(5);
      this.fWater2 = this._io.readBitsIntLe(1) != 0;
    }

    /**
     * 0: no rotation (right-side-up)
     * 1: rotated 90 degrees clockwise
     * 2: rotated 180 degrees (upside-down)
     * 3: rotated 90 degrees counter-clockwise
     */

    /**
     * Represents an angle, fully calculated as
     * (value * 2 * PI / 4) and used when rendering models on the tile.
     */

    /**
     * Indicates how the cell is diagonally split among both textures
     *   true: 2 - 1
     *   false: 1 - 2
     */

    return FlagsV2;
  })();
  Object.defineProperty(Map.prototype, 'version', {
    get: function() {
      if (this._m_version !== undefined)
        return this._m_version;
      this._m_version = (this._io.size == 2228224 ? 1 : (this._io.size == 14155776 ? 2 : 0));
      return this._m_version;
    }
  });
  Object.defineProperty(Map.prototype, 'isValid', {
    get: function() {
      if (this._m_isValid !== undefined)
        return this._m_isValid;
      this._m_isValid =  ((this.version == 1) || (this.version == 2)) ;
      return this._m_isValid;
    }
  });
  Object.defineProperty(Map.prototype, 'mapSize', {
    get: function() {
      if (this._m_mapSize !== undefined)
        return this._m_mapSize;
      this._m_mapSize = (this.version * 512);
      return this._m_mapSize;
    }
  });

  /**
   * |flags
   * Terrain heightmap
   * 
   * The terrain geometry is a `map_size`x`map_size` grid of 256x256
   * tiles, where the integer height from the heightmap is multiplied by 32
   * for the original Carnivores, and 64 for Carnivores 2 and Ice Age.
   */

  /**
   * Textur map 1
   * 
   * In the original Carnivores, this specifies the texture to on the
   * first* triangle of a tile. For Carnivores 2 and Ice Age, the texture
   * specified here is used for the entire tile.
   * 
   * Triangle order (for original Carnivores):
   * +-----+
   * | \ 1 |
   * |  \  |
   * | 2 \ |
   * +-----+
   */

  /**
   * Texture map 2
   * 
   * In the original Carnivores, this specifies the texture of the second
   * triangle of a tile. For Carnivores 2 and Ice Age, the texture specified
   * here is used for a 4x4 tile in the distance (aka LOD texture).
   */

  /**
   * Object map
   * 
   * This map specifies if an object is placed on a tile, and if so, which
   * one. The following values are used:
   * 
   *   < 254: object index (see RSC file format)
   *     254: spawn location (or trophy placement location for trophy room)
   *     255: no object
   */

  /**
   * Map of flags per tile. different between original and 2 / Ice Age!
   */

  /**
   * Water heightmap
   * Only read when the water flag is set for a tile.
   * Specifies sea floor height.
   */

  /**
   * Object heightmap
   * 
   * Map of heights for tiles with objects. However, it is only used when
   * the object flags in the RSC file specify place_user (other options there
   * are place_ground or place_water).
   */

  /**
   * Fog map, which areas are covered in fog in game.
   */

  /**
   * Ambient sounds map
   */

  return Map;
})();
return Map;
}));
