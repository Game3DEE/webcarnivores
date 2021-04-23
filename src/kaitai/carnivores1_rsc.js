// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

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
    this._debug = {};

  }
  CarnivoresRsc.prototype._read = function() {
    this._debug.textureCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.textureCount = this._io.readU4le();
    this._debug.textureCount.end = this._io.pos;
    this._debug.modelCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.modelCount = this._io.readU4le();
    this._debug.modelCount.end = this._io.pos;
    this._debug.skyRgb = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.skyRgb = new Rgb(this._io, this, this._root);
    this.skyRgb._read();
    this._debug.skyRgb.end = this._io.pos;
    this._debug.skyTRgb = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.skyTRgb = new Rgb(this._io, this, this._root);
    this.skyTRgb._read();
    this._debug.skyTRgb.end = this._io.pos;
    this._debug.textures = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.textures = new Array(this.textureCount);
    this._debug.textures.arr = new Array(this.textureCount);
    for (var i = 0; i < this.textureCount; i++) {
      this._debug.textures.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      var _t_textures = new Texture(this._io, this, this._root);
      _t_textures._read();
      this.textures[i] = _t_textures;
      this._debug.textures.arr[i].end = this._io.pos;
    }
    this._debug.textures.end = this._io.pos;
    this._debug.models = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.models = new Array(this.modelCount);
    this._debug.models.arr = new Array(this.modelCount);
    for (var i = 0; i < this.modelCount; i++) {
      this._debug.models.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      var _t_models = new Model(this._io, this, this._root);
      _t_models._read();
      this.models[i] = _t_models;
      this._debug.models.arr[i].end = this._io.pos;
    }
    this._debug.models.end = this._io.pos;
    this._debug.skyTexture = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.skyTexture = new Array(Math.floor(this.skyTextureSize / 2));
    this._debug.skyTexture.arr = new Array(Math.floor(this.skyTextureSize / 2));
    for (var i = 0; i < Math.floor(this.skyTextureSize / 2); i++) {
      this._debug.skyTexture.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.skyTexture[i] = this._io.readU2le();
      this._debug.skyTexture.arr[i].end = this._io.pos;
    }
    this._debug.skyTexture.end = this._io.pos;
    this._debug.skyMap = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.skyMap = this._io.readBytes((128 * 128));
    this._debug.skyMap.end = this._io.pos;
    this._debug.fogCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.fogCount = this._io.readU4le();
    this._debug.fogCount.end = this._io.pos;
    this._debug.fogList = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.fogList = new Array(this.fogCount);
    this._debug.fogList.arr = new Array(this.fogCount);
    for (var i = 0; i < this.fogCount; i++) {
      this._debug.fogList.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      var _t_fogList = new FogEntry(this._io, this, this._root);
      _t_fogList._read();
      this.fogList[i] = _t_fogList;
      this._debug.fogList.arr[i].end = this._io.pos;
    }
    this._debug.fogList.end = this._io.pos;
    this._debug.randomSoundCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.randomSoundCount = this._io.readU4le();
    this._debug.randomSoundCount.end = this._io.pos;
    this._debug.randomSounds = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.randomSounds = new Array(this.randomSoundCount);
    this._debug.randomSounds.arr = new Array(this.randomSoundCount);
    for (var i = 0; i < this.randomSoundCount; i++) {
      this._debug.randomSounds.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      var _t_randomSounds = new RandomSound(this._io, this, this._root);
      _t_randomSounds._read();
      this.randomSounds[i] = _t_randomSounds;
      this._debug.randomSounds.arr[i].end = this._io.pos;
    }
    this._debug.randomSounds.end = this._io.pos;
    this._debug.ambientSoundCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.ambientSoundCount = this._io.readU4le();
    this._debug.ambientSoundCount.end = this._io.pos;
    this._debug.ambientSounds = { start: this._io.pos, ioOffset: this._io.byteOffset };
    this.ambientSounds = new Array(this.ambientSoundCount);
    this._debug.ambientSounds.arr = new Array(this.ambientSoundCount);
    for (var i = 0; i < this.ambientSoundCount; i++) {
      this._debug.ambientSounds.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
      var _t_ambientSounds = new AmbientSound(this._io, this, this._root);
      _t_ambientSounds._read();
      this.ambientSounds[i] = _t_ambientSounds;
      this._debug.ambientSounds.arr[i].end = this._io.pos;
    }
    this._debug.ambientSounds.end = this._io.pos;
  }

  var Rgb = CarnivoresRsc.Rgb = (function() {
    function Rgb(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Rgb.prototype._read = function() {
      this._debug.r = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.r = this._io.readU4le();
      this._debug.r.end = this._io.pos;
      this._debug.g = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.g = this._io.readU4le();
      this._debug.g.end = this._io.pos;
      this._debug.b = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.b = this._io.readU4le();
      this._debug.b.end = this._io.pos;
    }

    return Rgb;
  })();

  var Vertex = CarnivoresRsc.Vertex = (function() {
    function Vertex(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Vertex.prototype._read = function() {
      this._debug.x = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.x = this._io.readF4le();
      this._debug.x.end = this._io.pos;
      this._debug.y = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.y = this._io.readF4le();
      this._debug.y.end = this._io.pos;
      this._debug.z = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.z = this._io.readF4le();
      this._debug.z.end = this._io.pos;
      this._debug.owner = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.owner = this._io.readS2le();
      this._debug.owner.end = this._io.pos;
      this._debug.hide = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.hide = this._io.readU2le();
      this._debug.hide.end = this._io.pos;
    }

    return Vertex;
  })();

  var Model = CarnivoresRsc.Model = (function() {
    function Model(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Model.prototype._read = function() {
      this._debug.modelInfo = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.modelInfo = new ModelInfo(this._io, this, this._root);
      this.modelInfo._read();
      this._debug.modelInfo.end = this._io.pos;
      this._debug.vertCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.vertCount = this._io.readU4le();
      this._debug.vertCount.end = this._io.pos;
      this._debug.faceCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.faceCount = this._io.readU4le();
      this._debug.faceCount.end = this._io.pos;
      this._debug.nodeCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.nodeCount = this._io.readU4le();
      this._debug.nodeCount.end = this._io.pos;
      this._debug.textureSize = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.textureSize = this._io.readU4le();
      this._debug.textureSize.end = this._io.pos;
      this._debug.faces = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.faces = new Array(this.faceCount);
      this._debug.faces.arr = new Array(this.faceCount);
      for (var i = 0; i < this.faceCount; i++) {
        this._debug.faces.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        var _t_faces = new Face(this._io, this, this._root);
        _t_faces._read();
        this.faces[i] = _t_faces;
        this._debug.faces.arr[i].end = this._io.pos;
      }
      this._debug.faces.end = this._io.pos;
      this._debug.vertices = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.vertices = new Array(this.vertCount);
      this._debug.vertices.arr = new Array(this.vertCount);
      for (var i = 0; i < this.vertCount; i++) {
        this._debug.vertices.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        var _t_vertices = new Vertex(this._io, this, this._root);
        _t_vertices._read();
        this.vertices[i] = _t_vertices;
        this._debug.vertices.arr[i].end = this._io.pos;
      }
      this._debug.vertices.end = this._io.pos;
      this._debug.nodes = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.nodes = new Array(this.nodeCount);
      this._debug.nodes.arr = new Array(this.nodeCount);
      for (var i = 0; i < this.nodeCount; i++) {
        this._debug.nodes.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        var _t_nodes = new Node(this._io, this, this._root);
        _t_nodes._read();
        this.nodes[i] = _t_nodes;
        this._debug.nodes.arr[i].end = this._io.pos;
      }
      this._debug.nodes.end = this._io.pos;
      this._debug.textureData = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.textureData = new Array(Math.floor(this.textureSize / 2));
      this._debug.textureData.arr = new Array(Math.floor(this.textureSize / 2));
      for (var i = 0; i < Math.floor(this.textureSize / 2); i++) {
        this._debug.textureData.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.textureData[i] = this._io.readU2le();
        this._debug.textureData.arr[i].end = this._io.pos;
      }
      this._debug.textureData.end = this._io.pos;
      if (this.modelInfo.isAnimated) {
        this._debug.animation = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.animation = new ModelAnimation(this._io, this, this._root);
        this.animation._read();
        this._debug.animation.end = this._io.pos;
      }
    }

    return Model;
  })();

  var Trd = CarnivoresRsc.Trd = (function() {
    function Trd(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Trd.prototype._read = function() {
      this._debug.rNumber = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rNumber = this._io.readU4le();
      this._debug.rNumber.end = this._io.pos;
      this._debug.rVolume = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rVolume = this._io.readU4le();
      this._debug.rVolume.end = this._io.pos;
      this._debug.rFrequency = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rFrequency = this._io.readU4le();
      this._debug.rFrequency.end = this._io.pos;
      this._debug.rEnvironment = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rEnvironment = this._io.readU4le();
      this._debug.rEnvironment.end = this._io.pos;
    }

    return Trd;
  })();

  var ModelInfo = CarnivoresRsc.ModelInfo = (function() {
    function ModelInfo(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    ModelInfo.prototype._read = function() {
      this._debug.radius = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.radius = this._io.readS4le();
      this._debug.radius.end = this._io.pos;
      this._debug.yLo = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.yLo = this._io.readS4le();
      this._debug.yLo.end = this._io.pos;
      this._debug.yHi = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.yHi = this._io.readS4le();
      this._debug.yHi.end = this._io.pos;
      this._debug.lineLength = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.lineLength = this._io.readS4le();
      this._debug.lineLength.end = this._io.pos;
      this._debug.lIntensity = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.lIntensity = this._io.readS4le();
      this._debug.lIntensity.end = this._io.pos;
      this._debug.circleRad = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.circleRad = this._io.readS4le();
      this._debug.circleRad.end = this._io.pos;
      this._debug.cIntensity = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.cIntensity = this._io.readS4le();
      this._debug.cIntensity.end = this._io.pos;
      this._debug.flags = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.flags = this._io.readU4le();
      this._debug.flags.end = this._io.pos;
      this._debug.grRad = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.grRad = this._io.readS4le();
      this._debug.grRad.end = this._io.pos;
      this._debug.refLight = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.refLight = this._io.readS4le();
      this._debug.refLight.end = this._io.pos;
      this._debug.lastAniTime = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.lastAniTime = this._io.readU4le();
      this._debug.lastAniTime.end = this._io.pos;
      this._debug.boundR = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.boundR = this._io.readF4le();
      this._debug.boundR.end = this._io.pos;
      this._debug.reserved = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.reserved = this._io.readBytes(16);
      this._debug.reserved.end = this._io.pos;
    }
    Object.defineProperty(ModelInfo.prototype, 'isAnimated', {
      get: function() {
        if (this._m_isAnimated !== undefined)
          return this._m_isAnimated;
        this._debug._m_isAnimated = {  };
        this._m_isAnimated = (this.flags & 2147483648) != 0;
        return this._m_isAnimated;
      }
    });
    Object.defineProperty(ModelInfo.prototype, 'notLighted', {
      get: function() {
        if (this._m_notLighted !== undefined)
          return this._m_notLighted;
        this._debug._m_notLighted = {  };
        this._m_notLighted = (this.flags & 64) != 0;
        return this._m_notLighted;
      }
    });
    Object.defineProperty(ModelInfo.prototype, 'needsBound', {
      get: function() {
        if (this._m_needsBound !== undefined)
          return this._m_needsBound;
        this._debug._m_needsBound = {  };
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
      this._debug = {};

    }
    ModelAnimation.prototype._read = function() {
      this._debug.vc0 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.vc0 = this._io.readU4le();
      this._debug.vc0.end = this._io.pos;
      this._debug.vc1 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.vc1 = this._io.readU4le();
      this._debug.vc1.end = this._io.pos;
      this._debug.vc2 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.vc2 = this._io.readU4le();
      this._debug.vc2.end = this._io.pos;
      this._debug.kps = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.kps = this._io.readU4le();
      this._debug.kps.end = this._io.pos;
      this._debug.frameCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.frameCount = this._io.readU4le();
      this._debug.frameCount.end = this._io.pos;
      this._debug.frames = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.frames = new Array(((this.frameCount * 3) * this.vc1));
      this._debug.frames.arr = new Array(((this.frameCount * 3) * this.vc1));
      for (var i = 0; i < ((this.frameCount * 3) * this.vc1); i++) {
        this._debug.frames.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.frames[i] = this._io.readS2le();
        this._debug.frames.arr[i].end = this._io.pos;
      }
      this._debug.frames.end = this._io.pos;
    }

    return ModelAnimation;
  })();

  var Face = CarnivoresRsc.Face = (function() {
    function Face(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Face.prototype._read = function() {
      this._debug.v1 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.v1 = this._io.readU4le();
      this._debug.v1.end = this._io.pos;
      this._debug.v2 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.v2 = this._io.readU4le();
      this._debug.v2.end = this._io.pos;
      this._debug.v3 = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.v3 = this._io.readU4le();
      this._debug.v3.end = this._io.pos;
      this._debug.tax = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tax = this._io.readS4le();
      this._debug.tax.end = this._io.pos;
      this._debug.tbx = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tbx = this._io.readS4le();
      this._debug.tbx.end = this._io.pos;
      this._debug.tcx = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tcx = this._io.readS4le();
      this._debug.tcx.end = this._io.pos;
      this._debug.tay = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tay = this._io.readS4le();
      this._debug.tay.end = this._io.pos;
      this._debug.tby = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tby = this._io.readS4le();
      this._debug.tby.end = this._io.pos;
      this._debug.tcy = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.tcy = this._io.readS4le();
      this._debug.tcy.end = this._io.pos;
      this._debug.flags = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.flags = this._io.readU2le();
      this._debug.flags.end = this._io.pos;
      this._debug.dMask = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.dMask = this._io.readU2le();
      this._debug.dMask.end = this._io.pos;
      this._debug.distant = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.distant = this._io.readS4le();
      this._debug.distant.end = this._io.pos;
      this._debug.next = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.next = this._io.readU4le();
      this._debug.next.end = this._io.pos;
      this._debug.group = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.group = this._io.readU4le();
      this._debug.group.end = this._io.pos;
      this._debug.reserved = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.reserved = this._io.readBytes(12);
      this._debug.reserved.end = this._io.pos;
    }

    return Face;
  })();

  var FogEntry = CarnivoresRsc.FogEntry = (function() {
    function FogEntry(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    FogEntry.prototype._read = function() {
      this._debug.fogRgb = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.fogRgb = this._io.readU4le();
      this._debug.fogRgb.end = this._io.pos;
      this._debug.yBegin = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.yBegin = this._io.readF4le();
      this._debug.yBegin.end = this._io.pos;
      this._debug.mortal = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.mortal = this._io.readU4le();
      this._debug.mortal.end = this._io.pos;
      this._debug.transp = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.transp = this._io.readF4le();
      this._debug.transp.end = this._io.pos;
      this._debug.fLimit = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.fLimit = this._io.readF4le();
      this._debug.fLimit.end = this._io.pos;
    }

    return FogEntry;
  })();

  var AmbientSound = CarnivoresRsc.AmbientSound = (function() {
    function AmbientSound(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    AmbientSound.prototype._read = function() {
      this._debug.pcmSize = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.pcmSize = this._io.readU4le();
      this._debug.pcmSize.end = this._io.pos;
      this._debug.pcm = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.pcm = this._io.readBytes(this.pcmSize);
      this._debug.pcm.end = this._io.pos;
      this._debug.rData = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rData = new Array(16);
      this._debug.rData.arr = new Array(16);
      for (var i = 0; i < 16; i++) {
        this._debug.rData.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        var _t_rData = new Trd(this._io, this, this._root);
        _t_rData._read();
        this.rData[i] = _t_rData;
        this._debug.rData.arr[i].end = this._io.pos;
      }
      this._debug.rData.end = this._io.pos;
      this._debug.rsfxCount = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.rsfxCount = this._io.readU4le();
      this._debug.rsfxCount.end = this._io.pos;
      this._debug.aVolume = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.aVolume = this._io.readU4le();
      this._debug.aVolume.end = this._io.pos;
    }

    return AmbientSound;
  })();

  var Node = CarnivoresRsc.Node = (function() {
    function Node(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Node.prototype._read = function() {
      this._debug.name = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(32), 0, false), "utf8");
      this._debug.name.end = this._io.pos;
      this._debug.x = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.x = this._io.readF4le();
      this._debug.x.end = this._io.pos;
      this._debug.y = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.y = this._io.readF4le();
      this._debug.y.end = this._io.pos;
      this._debug.z = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.z = this._io.readF4le();
      this._debug.z.end = this._io.pos;
      this._debug.owner = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.owner = this._io.readS2le();
      this._debug.owner.end = this._io.pos;
      this._debug.hide = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.hide = this._io.readU2le();
      this._debug.hide.end = this._io.pos;
    }

    return Node;
  })();

  var RandomSound = CarnivoresRsc.RandomSound = (function() {
    function RandomSound(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    RandomSound.prototype._read = function() {
      this._debug.pcmSize = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.pcmSize = this._io.readU4le();
      this._debug.pcmSize.end = this._io.pos;
      this._debug.pcm = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.pcm = this._io.readBytes(this.pcmSize);
      this._debug.pcm.end = this._io.pos;
    }

    return RandomSound;
  })();

  var Texture = CarnivoresRsc.Texture = (function() {
    function Texture(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this._debug = {};

    }
    Texture.prototype._read = function() {
      this._debug.data = { start: this._io.pos, ioOffset: this._io.byteOffset };
      this.data = new Array(Math.floor(this.size / 2));
      this._debug.data.arr = new Array(Math.floor(this.size / 2));
      for (var i = 0; i < Math.floor(this.size / 2); i++) {
        this._debug.data.arr[i] = { start: this._io.pos, ioOffset: this._io.byteOffset };
        this.data[i] = this._io.readU2le();
        this._debug.data.arr[i].end = this._io.pos;
      }
      this._debug.data.end = this._io.pos;
    }
    Object.defineProperty(Texture.prototype, 'size', {
      get: function() {
        if (this._m_size !== undefined)
          return this._m_size;
        this._debug._m_size = {  };
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
      this._debug._m_skyTextureSize = {  };
      this._m_skyTextureSize = ((256 * 256) * 2);
      return this._m_skyTextureSize;
    }
  });

  return CarnivoresRsc;
})();
return CarnivoresRsc;
}));
