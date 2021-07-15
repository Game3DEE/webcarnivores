// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './C3df'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./C3df'));
  } else {
    root.Rsc = factory(root.KaitaiStream, root.C3df);
  }
}(this, function (KaitaiStream, C3df) {
/**
 * @see {@link https://www.tapatalk.com/groups/the_carnivores_saga/carnivores-2-and-ice-age-rsc-files-t2316.html|Source}
 */

 var Rsc = (function() {
  Rsc.AudioReverb = Object.freeze({
    GENERIC: 0,
    PLATE: 1,
    FOREST: 2,
    MOUNTAIN: 3,
    CANYON: 4,
    CAVE: 5,
    SPECIAL2: 6,
    UNUSED: 7,

    0: "GENERIC",
    1: "PLATE",
    2: "FOREST",
    3: "MOUNTAIN",
    4: "CANYON",
    5: "CAVE",
    6: "SPECIAL2",
    7: "UNUSED",
  });

  function Rsc(_io, _parent, _root, version) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;
    this.version = version;
    console.log('in RSC:', version)

    this._read();
  }
  Rsc.prototype._read = function() {
    this.textureCount = this._io.readU4le();
    this.modelCount = this._io.readU4le();
    if (this.version == 2) {
      this.dawnSkyRgb = new Rgb(this._io, this, this._root);
    }
    this.daySkyRgb = new Rgb(this._io, this, this._root);
    if (this.version == 2) {
      this.nightSkyRgb = new Rgb(this._io, this, this._root);
    }
    if (this.version == 2) {
      this.dawnSkyTRgb = new Rgb(this._io, this, this._root);
    }
    this.daySkyTRgb = new Rgb(this._io, this, this._root);
    if (this.version == 2) {
      this.nightSkyTRgb = new Rgb(this._io, this, this._root);
    }
    this.textures = new Array(this.textureCount);
    for (var i = 0; i < this.textureCount; i++) {
      this.textures[i] = new Texture(this._io, this, this._root);
    }
    this.models = new Array(this.modelCount);
    for (var i = 0; i < this.modelCount; i++) {
      this.models[i] = new Model(this._io, this, this._root);
    }
    if (this.version == 2) {
      this.dawnSkyTexture = new Array(Math.floor(this.skyTextureSize / 2));
      for (var i = 0; i < Math.floor(this.skyTextureSize / 2); i++) {
        this.dawnSkyTexture[i] = this._io.readU2le();
      }
    }
    this.daySkyTexture = new Array(Math.floor(this.skyTextureSize / 2));
    for (var i = 0; i < Math.floor(this.skyTextureSize / 2); i++) {
      this.daySkyTexture[i] = this._io.readU2le();
    }
    if (this.version == 2) {
      this.nightSkyTexture = new Array(Math.floor(this.skyTextureSize / 2));
      for (var i = 0; i < Math.floor(this.skyTextureSize / 2); i++) {
        this.nightSkyTexture[i] = this._io.readU2le();
      }
    }
    this.cloudsMap = this._io.readBytes((128 * 128));
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
    if (this.version == 2) {
      this.waterCount = this._io.readU4le();
    }
    if (this.version == 2) {
      this.waters = new Array(this.waterCount);
      for (var i = 0; i < this.waterCount; i++) {
        this.waters[i] = new Water(this._io, this, this._root);
      }
    }
  }

  var Rgb = Rsc.Rgb = (function() {
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

  var Model = Rsc.Model = (function() {
    function Model(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Model.prototype._read = function() {
      this.radius = this._io.readS4le();
      this.yLo = this._io.readS4le();
      this.yHi = this._io.readS4le();
      this.lineLength = this._io.readS4le();
      this.lIntensity = this._io.readS4le();
      this.circleRad = this._io.readS4le();
      this.cIntensity = this._io.readS4le();
      this.fPlaceWater = this._io.readBitsIntLe(1) != 0;
      this.fPlaceGround = this._io.readBitsIntLe(1) != 0;
      this.fPlaceUser = this._io.readBitsIntLe(1) != 0;
      this.fCircle = this._io.readBitsIntLe(1) != 0;
      this.fBound = this._io.readBitsIntLe(1) != 0;
      this.fNoBmp = this._io.readBitsIntLe(1) != 0;
      this.fNoLight = this._io.readBitsIntLe(1) != 0;
      this.fDefaultLight = this._io.readBitsIntLe(1) != 0;
      this.fGroundLight = this._io.readBitsIntLe(1) != 0;
      this.fNoSoft = this._io.readBitsIntLe(1) != 0;
      this.fNoSoft2 = this._io.readBitsIntLe(1) != 0;
      this.fUnused = this._io.readBitsIntLe(20);
      this.fIsAnimated = this._io.readBitsIntLe(1) != 0;
      this._io.alignToByte();
      this.grRad = this._io.readS4le();
      this.refLight = this._io.readS4le();
      this.lastAniTime = this._io.readU4le();
      this.boundR = this._io.readF4le();
      this.reserved = this._io.readBytes(16);
      this.model = new C3df(this._io, this, null);
      if (this._root.version == 2) {
        this.billboard = new Texture(this._io, this, this._root);
      }
      if (this.fIsAnimated) {
        this.animation = new ModelAnimation(this._io, this, this._root);
      }
    }

    return Model;
  })();

  var Trd = Rsc.Trd = (function() {
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
      this.rEnvironment = this._io.readU2le();
      this.rfNotAtNight = this._io.readBitsIntLe(1) != 0;
      this.rfUnused = this._io.readBitsIntLe(15);
    }

    /**
     * if set, sound does not play at night
     */

    return Trd;
  })();

  var ModelAnimation = Rsc.ModelAnimation = (function() {
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

  var Water = Rsc.Water = (function() {
    function Water(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Water.prototype._read = function() {
      this.textureIndex = this._io.readU4le();
      this.level = this._io.readU4le();
      this.opacity = this._io.readF4le();
      this.fogRgb = this._io.readU4le();
    }

    return Water;
  })();

  var FogEntry = Rsc.FogEntry = (function() {
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

  var AmbientSound = Rsc.AmbientSound = (function() {
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

  var RandomSound = Rsc.RandomSound = (function() {
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

  var Texture = Rsc.Texture = (function() {
    function Texture(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Texture.prototype._read = function() {
      this.data = new Array((128 * 128));
      for (var i = 0; i < (128 * 128); i++) {
        this.data[i] = this._io.readU2le();
      }
    }

    return Texture;
  })();
  Object.defineProperty(Rsc.prototype, 'skyTextureSize', {
    get: function() {
      if (this._m_skyTextureSize !== undefined)
        return this._m_skyTextureSize;
      this._m_skyTextureSize = ((256 * 256) * 2);
      return this._m_skyTextureSize;
    }
  });

  return Rsc;
})();
return Rsc;
}));
