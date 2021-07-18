// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined, self = undefined;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Ivector = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  var Ivector = (function() {
    function Ivector(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Ivector.prototype._read = function() {
      this.ix = this._io.readS2le();
      this.iy = this._io.readS2le();
      this.iz = this._io.readS2le();
    }
    Object.defineProperty(Ivector.prototype, 'x', {
      get: function() {
        if (this._m_x !== undefined)
          return this._m_x;
        this._m_x = (this.ix / 16.0);
        return this._m_x;
      }
    });
    Object.defineProperty(Ivector.prototype, 'y', {
      get: function() {
        if (this._m_y !== undefined)
          return this._m_y;
        this._m_y = (this.iy / 16.0);
        return this._m_y;
      }
    });
    Object.defineProperty(Ivector.prototype, 'z', {
      get: function() {
        if (this._m_z !== undefined)
          return this._m_z;
        this._m_z = (this.iz / 16.0);
        return this._m_z;
      }
    });
  
    return Ivector;
  })();
  return Ivector;
  }));
  