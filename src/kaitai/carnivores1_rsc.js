// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
/* eslint-disable */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.CarnivoresRsc = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var CarnivoresRsc = (function() {
  function CarnivoresRsc(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  CarnivoresRsc.prototype._read = function() {
    this.textureCount = this._io.readU4le();
    this.modelCount = this._io.readU4le();
    this.skyRgb = new Rgb(this._io, this, this._root);
    this.skyTRgb = new Rgb(this._io, this, this._root);
    this.textures = new Array(this.textureCount);
    for (var i = 0; i < this.textureCount; i++) {
      this.textures[i] = new Texture(this._io, this, this._root);
    }
    this.models = new Array(this.modelCount);
    for (var i = 0; i < this.modelCount; i++) {
      this.models[i] = new Model(this._io, this, this._root);
    }
    this.skyTexture = new Array(Math.floor(this.skyTextureSize / 2));
    for (var i = 0; i < Math.floor(this.skyTextureSize / 2); i++) {
      this.skyTexture[i] = this._io.readU2le();
    }
    this.skyMap = this._io.readBytes((128 * 128));
    this.fogCount = this._io.readU4le();
    this.fogList = new Array(this.fogCount);
    for (var i = 0; i < this.fogCount; i++) {
      this.fogList[i] = new FogEntry(this._io, this, this._root);
    }
    this.randomSoundCount = this._io.readU4le();
    this.randomSounds = new Array(this.randomSoundCount);
    for (var i = 0; i < this.randomSoundCount; i++) {
      this.randomSounds[i] = new RandomSound(this._io, this, this._root);
    }
    this.ambientSoundCount = this._io.readU4le();
    this.ambientSounds = new Array(this.ambientSoundCount);
    for (var i = 0; i < this.ambientSoundCount; i++) {
      this.ambientSounds[i] = new AmbientSound(this._io, this, this._root);
    }
  }

  var Rgb = CarnivoresRsc.Rgb = (function() {
    function Rgb(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Rgb.prototype._read = function() {
      this.r = this._io.readU4le();
      this.g = this._io.readU4le();
      this.b = this._io.readU4le();
    }

    return Rgb;
  })();

  var Vertex = CarnivoresRsc.Vertex = (function() {
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

  var Model = CarnivoresRsc.Model = (function() {
    function Model(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Model.prototype._read = function() {
      this.modelInfo = new ModelInfo(this._io, this, this._root);
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
      if (this.modelInfo.isAnimated) {
        this.animation = new ModelAnimation(this._io, this, this._root);
      }
    }

    return Model;
  })();

  var Trd = CarnivoresRsc.Trd = (function() {
    function Trd(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Trd.prototype._read = function() {
      this.rNumber = this._io.readU4le();
      this.rVolume = this._io.readU4le();
      this.rFrequency = this._io.readU4le();
      this.rEnvironment = this._io.readU4le();
    }

    return Trd;
  })();

  var ModelInfo = CarnivoresRsc.ModelInfo = (function() {
    function ModelInfo(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ModelInfo.prototype._read = function() {
      this.radius = this._io.readS4le();
      this.yLo = this._io.readS4le();
      this.yHi = this._io.readS4le();
      this.lineLength = this._io.readS4le();
      this.lIntensity = this._io.readS4le();
      this.circleRad = this._io.readS4le();
      this.cIntensity = this._io.readS4le();
      this.flags = this._io.readU4le();
      this.grRad = this._io.readS4le();
      this.refLight = this._io.readS4le();
      this.lastAniTime = this._io.readU4le();
      this.boundR = this._io.readF4le();
      this.reserved = this._io.readBytes(16);
    }
    Object.defineProperty(ModelInfo.prototype, 'isAnimated', {
      get: function() {
        if (this._m_isAnimated !== undefined)
          return this._m_isAnimated;
        this._m_isAnimated = (this.flags & 2147483648) != 0;
        return this._m_isAnimated;
      }
    });
    Object.defineProperty(ModelInfo.prototype, 'notLighted', {
      get: function() {
        if (this._m_notLighted !== undefined)
          return this._m_notLighted;
        this._m_notLighted = (this.flags & 64) != 0;
        return this._m_notLighted;
      }
    });
    Object.defineProperty(ModelInfo.prototype, 'needsBound', {
      get: function() {
        if (this._m_needsBound !== undefined)
          return this._m_needsBound;
        this._m_needsBound = (this.flags & 16) != 0;
        return this._m_needsBound;
      }
    });

    return ModelInfo;
  })();

  var ModelAnimation = CarnivoresRsc.ModelAnimation = (function() {
    function ModelAnimation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ModelAnimation.prototype._read = function() {
      this.vc0 = this._io.readU4le();
      this.vc1 = this._io.readU4le();
      this.vc2 = this._io.readU4le();
      this.kps = this._io.readU4le();
      this.frameCount = this._io.readU4le();
      this.frames = new Array(((this.frameCount * 3) * this.vc1));
      for (var i = 0; i < ((this.frameCount * 3) * this.vc1); i++) {
        this.frames[i] = this._io.readS2le();
      }
    }

    return ModelAnimation;
  })();

  var Face = CarnivoresRsc.Face = (function() {
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

  var FogEntry = CarnivoresRsc.FogEntry = (function() {
    function FogEntry(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    FogEntry.prototype._read = function() {
      this.fogRgb = this._io.readU4le();
      this.yBegin = this._io.readF4le();
      this.mortal = this._io.readU4le();
      this.transp = this._io.readF4le();
      this.fLimit = this._io.readF4le();
    }

    return FogEntry;
  })();

  var AmbientSound = CarnivoresRsc.AmbientSound = (function() {
    function AmbientSound(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    AmbientSound.prototype._read = function() {
      this.pcmSize = this._io.readU4le();
      this.pcm = this._io.readBytes(this.pcmSize);
      this.rData = new Array(16);
      for (var i = 0; i < 16; i++) {
        this.rData[i] = new Trd(this._io, this, this._root);
      }
      this.rsfxCount = this._io.readU4le();
      this.aVolume = this._io.readU4le();
    }

    return AmbientSound;
  })();

  var Node = CarnivoresRsc.Node = (function() {
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

  var RandomSound = CarnivoresRsc.RandomSound = (function() {
    function RandomSound(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    RandomSound.prototype._read = function() {
      this.pcmSize = this._io.readU4le();
      this.pcm = this._io.readBytes(this.pcmSize);
    }

    return RandomSound;
  })();

  var Texture = CarnivoresRsc.Texture = (function() {
    function Texture(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Texture.prototype._read = function() {
      this.data = new Array(Math.floor(this.size / 2));
      for (var i = 0; i < Math.floor(this.size / 2); i++) {
        this.data[i] = this._io.readU2le();
      }
    }
    Object.defineProperty(Texture.prototype, 'size', {
      get: function() {
        if (this._m_size !== undefined)
          return this._m_size;
        this._m_size = ((128 * 128) * 2);
        return this._m_size;
      }
    });

    return Texture;
  })();
  Object.defineProperty(CarnivoresRsc.prototype, 'skyTextureSize', {
    get: function() {
      if (this._m_skyTextureSize !== undefined)
        return this._m_skyTextureSize;
      this._m_skyTextureSize = ((256 * 256) * 2);
      return this._m_skyTextureSize;
    }
  });

  return CarnivoresRsc;
})();
return CarnivoresRsc;
}));
