// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined, self = undefined;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './Vertex', './Face'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./Vertex'), require('./Face'));
  } else {
    root.C3df = factory(root.KaitaiStream, root.Vertex, root.Face);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream, Vertex, Face) {
/**
 * @see {@link https://carnivores.fandom.com/wiki/3DF|Source}
 */

var C3df = (function() {
  function C3df(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  C3df.prototype._read = function() {
    this.vertCount = this._io.readU4le();
    this.faceCount = this._io.readU4le();
    this.nodeCount = this._io.readU4le();
    this.textureSize = this._io.readU4le();
    this.faces = new Array(this.faceCount);
    for (var i = 0; i < this.faceCount; i++) {
      this.faces[i] = new Face(this._io, this, null);
    }
    this.vertices = new Array(this.vertCount);
    for (var i = 0; i < this.vertCount; i++) {
      this.vertices[i] = new Vertex(this._io, this, null);
    }
    this.nodes = new Array(this.nodeCount);
    for (var i = 0; i < this.nodeCount; i++) {
      this.nodes[i] = new Node(this._io, this, this._root);
    }
    this.textureData = this._io.readBytes(((this.textureWidth * this.textureHeight) * 2));
  }

  var Node = C3df.Node = (function() {
    function Node(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Node.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(32), 0, false), "utf8");
      this.x = this._io.readF4le();
      this.y = this._io.readF4le();
      this.z = this._io.readF4le();
      this.owner = this._io.readS2le();
      this.hide = this._io.readU2le();
    }

    return Node;
  })();
  Object.defineProperty(C3df.prototype, 'textureWidth', {
    get: function() {
      if (this._m_textureWidth !== undefined)
        return this._m_textureWidth;
      this._m_textureWidth = 256;
      return this._m_textureWidth;
    }
  });
  Object.defineProperty(C3df.prototype, 'textureHeight', {
    get: function() {
      if (this._m_textureHeight !== undefined)
        return this._m_textureHeight;
      this._m_textureHeight = Math.floor(Math.floor(this.textureSize / 2) / this.textureWidth);
      return this._m_textureHeight;
    }
  });

  return C3df;
})();
return C3df;
}));
