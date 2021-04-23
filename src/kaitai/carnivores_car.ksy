meta:
  id: carnivores_car
  file-extension: car
  endian: le
  encoding: utf8

seq:
  - id: name
    type: strz
    size: 32
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
    type: u2
    repeat: expr
    repeat-expr: texture_size / 2
  - id: animations
    type: animation
    repeat: expr
    repeat-expr: animation_count
  - id: sound_effects
    type: sound_effect
    repeat: expr
    repeat-expr: sound_effect_count

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
      - id: kps
        type: u4
      - id: frame_count
        type: u4
      - id: data
        type: s2
        repeat: expr
        repeat-expr: _root.vert_count * frame_count * 3

  vertex:
    seq:
      - id: x
        type: f4
      - id: y
        type: f4
      - id: z
        type: f4
      - id: owner
        type: s2
      - id: hide
        type: u2

  face:
    seq:
      - id: v1
        type: u4
      - id: v2
        type: u4
      - id: v3
        type: u4
      - id: tax
        type: s4
      - id: tbx
        type: s4
      - id: tcx
        type: s4
      - id: tay
        type: s4
      - id: tby
        type: s4
      - id: tcy
        type: s4
      - id: flags
        type: u2
      - id: d_mask
        type: u2
      - id: distant
        type: s4
      - id: next
        type: u4
      - id: group
        type: u4
      - id: reserved
        size: 12
