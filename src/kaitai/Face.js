// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined; // IRA

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Face = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  /**
   * @see {@link https://carnivores.fandom.com/wiki/3DF|Source}
   */
  
  var Face = (function() {
    function Face(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Face.prototype._read = function() {
      this.v1 = this._io.readU4le();
      this.v2 = this._io.readU4le();
      this.v3 = this._io.readU4le();
      this.tax = this._io.readS4le();
      this.tbx = this._io.readS4le();
      this.tcx = this._io.readS4le();
      this.tay = this._io.readS4le();
      this.tby = this._io.readS4le();
      this.tcy = this._io.readS4le();
      this.fDoubleSide = this._io.readBitsIntBe(1) != 0;
      this.fDarkBack = this._io.readBitsIntBe(1) != 0;
      this.fOpacity = this._io.readBitsIntBe(1) != 0;
      this.fMortal = this._io.readBitsIntBe(1) != 0;
      this.fPhong = this._io.readBitsIntBe(1) != 0;
      this.fEnvmap = this._io.readBitsIntBe(1) != 0;
      this.fNeedvc = this._io.readBitsIntBe(1) != 0;
      this.fUnused = this._io.readBitsIntBe(7);
      this.fDarkFront = this._io.readBitsIntBe(1) != 0;
      this._io.alignToByte();
      this.dMask = this._io.readU2le();
      this.distant = this._io.readS4le();
      this.next = this._io.readU4le();
      this.group = this._io.readU4le();
      this.reserved = this._io.readBytes(12);
    }
  
    return Face;
  })();
  return Face;
  }));
  