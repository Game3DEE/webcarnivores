// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
      module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
      root.Carnivores3df = factory(root.KaitaiStream);
    }
  }(this, function (KaitaiStream) {
  var Carnivores3df = (function() {
    function Carnivores3df(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
  
      this._read();
    }
    Carnivores3df.prototype._read = function() {
      this.vertCount = this._io.readU4le();
      this.faceCount = this._io.readU4le();
      this.nodeCount = this._io.readU4le();
      this.textureSize = this._io.readU4le();
      this.faces = new Array(this.faceCount);
      for (var i = 0; i < this.faceCount; i++) {
        this.faces[i] = new Face(this._io, this, this._root);
      }
      this.vertices = new Array(this.vertCount);
      for (var i = 0; i < this.vertCount; i++) {
        this.vertices[i] = new Vertex(this._io, this, this._root);
      }
      this.nodes = new Array(this.nodeCount);
      for (var i = 0; i < this.nodeCount; i++) {
        this.nodes[i] = new Node(this._io, this, this._root);
      }
      this.textureData = new Array(Math.floor(this.textureSize / 2));
      for (var i = 0; i < Math.floor(this.textureSize / 2); i++) {
        this.textureData[i] = this._io.readU2le();
      }
    }
  
    var Vertex = Carnivores3df.Vertex = (function() {
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
  
    var Face = Carnivores3df.Face = (function() {
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
        this.flags = this._io.readU2le();
        this.dMask = this._io.readU2le();
        this.distant = this._io.readS4le();
        this.next = this._io.readU4le();
        this.group = this._io.readU4le();
        this.reserved = this._io.readBytes(12);
      }
  
      return Face;
    })();
  
    var Node = Carnivores3df.Node = (function() {
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
  
    return Carnivores3df;
  })();
  return Carnivores3df;
  }));
  