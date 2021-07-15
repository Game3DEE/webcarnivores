// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined; // IRA

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Vertex = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  /**
   * @see {@link https://carnivores.fandom.com/wiki/3DF|Source}
   */
  
  var Vertex = (function() {
    function Vertex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Vertex.prototype._read = function() {
      this.x = this._io.readF4le();
      this.y = this._io.readF4le();
      this.z = this._io.readF4le();
      this.owner = this._io.readS2le();
      this.hide = this._io.readU2le();
    }
  
    return Vertex;
  })();
  return Vertex;
  }));
  