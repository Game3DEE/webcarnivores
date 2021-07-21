// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
const define = undefined, self = undefined;
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream', './Vertex', './Face', './Ivector'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'), require('./Vertex'), require('./Face'), require('./Ivector'));
  } else {
    root.Car = factory(root.KaitaiStream, root.Vertex, root.Face, root.Ivector);
  }
}(this, function (KaitaiStream, Vertex, Face, Ivector) {
/**
 * @see {@link https://carnivores.fandom.com/wiki/CAR|Source}
 */

var Car = (function() {
  function Car(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Car.prototype._read = function() {
    this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(24), 0, false), "utf8");
    this.msc = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(8), 0, false), "utf8");
    this.animationCount = this._io.readU4le();
    this.soundEffectCount = this._io.readU4le();
    this.vertCount = this._io.readU4le();
    this.faceCount = this._io.readU4le();
    this.textureSize = this._io.readU4le();
    this.faces = new Array(this.faceCount);
    for (var i = 0; i < this.faceCount; i++) {
      this.faces[i] = new Face(this._io, this, null);
    }
    this.vertices = new Array(this.vertCount);
    for (var i = 0; i < this.vertCount; i++) {
      this.vertices[i] = new Vertex(this._io, this, null);
    }
    this.textureData = this._io.readBytes(this.textureSize);
    this.animations = new Array(this.animationCount);
    for (var i = 0; i < this.animationCount; i++) {
      this.animations[i] = new Animation(this._io, this, this._root);
    }
    this.soundEffects = new Array(this.soundEffectCount);
    for (var i = 0; i < this.soundEffectCount; i++) {
      this.soundEffects[i] = new SoundEffect(this._io, this, this._root);
    }
    this.animSoundMap = [];
    var i = 0;
    while (!this._io.isEof()) {
      this.animSoundMap.push(this._io.readS4le());
      i++;
    }
  }

  var SoundEffect = Car.SoundEffect = (function() {
    function SoundEffect(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SoundEffect.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(32), 0, false), "utf8");
      this.pcmLength = this._io.readU4le();
      this.pcm = this._io.readBytes(this.pcmLength);
    }

    return SoundEffect;
  })();

  var Animation = Car.Animation = (function() {
    function Animation(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Animation.prototype._read = function() {
      this.name = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(32), 0, false), "utf8");
      this.framesPerSecond = this._io.readU4le();
      this.frameCount = this._io.readU4le();
      this.frames = new Array(this.frameCount);
      for (var i = 0; i < this.frameCount; i++) {
        this.frames[i] = new Frame(this._io, this, this._root);
      }
    }

    return Animation;
  })();

  var Frame = Car.Frame = (function() {
    function Frame(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Frame.prototype._read = function() {
      this.vertices = new Array(this._root.vertCount);
      for (var i = 0; i < this._root.vertCount; i++) {
        this.vertices[i] = new Ivector(this._io, this, null);
      }
    }

    return Frame;
  })();

  /**
   * width of texture in pixels
   */
  Object.defineProperty(Car.prototype, 'textureWidth', {
    get: function() {
      if (this._m_textureWidth !== undefined)
        return this._m_textureWidth;
      this._m_textureWidth = 256;
      return this._m_textureWidth;
    }
  });

  /**
   * height of texture in pixels
   */
  Object.defineProperty(Car.prototype, 'textureHeight', {
    get: function() {
      if (this._m_textureHeight !== undefined)
        return this._m_textureHeight;
      this._m_textureHeight = Math.floor(Math.floor(this.textureSize / 2) / this.textureWidth);
      return this._m_textureHeight;
    }
  });

  /**
   * Name of model
   */

  /**
   * some revision string? always msc: <number>
   */

  /**
   * Texture data in RGBA5551 format
   */

  /**
   * mapping of animation (index) to sound (value)
   */

  return Car;
})();
return Car;
}));
