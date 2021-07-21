meta:
  id: car
  title: Animated model format for Carnivores
  application: Carnivores 1, 2 and Ice Age
  license: CC0-1.0
  file-extension: car
  endian: le
  encoding: utf8
  imports:
    - vertex
    - face
    - ivector

doc-ref: https://carnivores.fandom.com/wiki/CAR

seq:
  - id: name
    type: strz
    size: 24
    doc: Name of model
  - id: msc
    type: strz
    size: 8
    doc: some revision string? always msc: <number>
  - id: animation_count
    type: u4
  - id: sound_effect_count
    type: u4
  - id: vert_count
    type: u4
  - id: face_count
    type: u4
  - id: texture_size
    type: u4
  - id: faces
    type: face
    repeat: expr
    repeat-expr: face_count
  - id: vertices
    type: vertex
    repeat: expr
    repeat-expr: vert_count
  - id: texture_data
    size: texture_size
    doc: Texture data in RGBA5551 format
  - id: animations
    type: animation
    repeat: expr
    repeat-expr: animation_count
  - id: sound_effects
    type: sound_effect
    repeat: expr
    repeat-expr: sound_effect_count
  - id: anim_sound_map
    type: s4
    repeat: eos
    doc: mapping of animation (index) to sound (value)
instances:
  texture_width:
    value: 256
    doc: width of texture in pixels
  texture_height:
    value: (texture_size / 2) / texture_width
    doc: height of texture in pixels

types:
  sound_effect:
    seq:
      - id: name
        type: strz
        size: 32
      - id: pcm_length
        type: u4
      - id: pcm
        size: pcm_length

  animation:
    seq:
      - id: name
        type: strz
        size: 32
      - id: frames_per_second
        type: u4
      - id: frame_count
        type: u4
      - id: frames
        type: frame
        repeat: expr
        repeat-expr: frame_count
        
  frame:
    seq:
      - id: vertices
        type: ivector
        repeat: expr
        repeat-expr: _root.vert_count
