// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
/* eslint-disable */
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
    this.textureMap1 = this._io.readBytes((this.mapSize * this.mapSize));
    this.textureMap2 = this._io.readBytes((this.mapSize * this.mapSize));
    this.oMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.fMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.lightMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.waterMap = this._io.readBytes((this.mapSize * this.mapSize));
    this.heightMap0 = this._io.readBytes((this.mapSize * this.mapSize));
    this.fogsMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
    this.ambientMap = this._io.readBytes(Math.floor((this.mapSize * this.mapSize) / 4));
  }
  Object.defineProperty(Carnivores1Map.prototype, 'mapSize', {
    get: function() {
      if (this._m_mapSize !== undefined)
        return this._m_mapSize;
      this._m_mapSize = 512;
      return this._m_mapSize;
    }
  });

  return Carnivores1Map;
})();
return Carnivores1Map;
}));
