meta:
  id: carnivores_rsc
  file-extension: rsc
  endian: le
  encoding: utf8

seq:
  - id: texture_count
    type: u4
  - id: model_count
    type: u4
  - id: sky_rgb
    type: rgb
  - id: sky_t_rgb
    type: rgb
  - id: textures
    type: texture
    repeat: expr
    repeat-expr: texture_count
  - id: models
    type: model
    repeat: expr
    repeat-expr: model_count
  - id: sky_texture
    type: u2
    repeat: expr
    repeat-expr: sky_texture_size / 2
  - id: sky_map
    size: 128 * 128
  - id: fog_count
    type: u4
  - id: fog_list
    type: fog_entry
    repeat: expr
    repeat-expr: fog_count
  - id: random_sound_count
    type: u4
  - id: random_sounds
    type: random_sound
    repeat: expr
    repeat-expr: random_sound_count
  - id: ambient_sound_count
    type: u4
  - id: ambient_sounds
    type: ambient_sound
    repeat: expr
    repeat-expr: ambient_sound_count
instances:
  sky_texture_size:
    value: 256 * 256 * 2

types:
  rgb:
    seq:
      - id: r
        type: u4
      - id: g
        type: u4
      - id: b
        type: u4
  texture:
    seq:
      - id: data
        type: u2
        repeat: expr
        repeat-expr: size / 2
    instances:
      size:
        value: 128 * 128 *2
  
  model:
    seq:
      - id: model_info
        type: model_info
      - id: vert_count
        type: u4
      - id: face_count
        type: u4
      - id: node_count
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
      - id: nodes
        type: node
        repeat: expr
        repeat-expr: node_count
      - id: texture_data
        type: u2
        repeat: expr
        repeat-expr: texture_size / 2
      - id: animation
        type: model_animation
        if: model_info.is_animated

  model_info:
    seq:
      - id: radius
        type: s4
      - id: y_lo
        type: s4
      - id: y_hi
        type: s4
      - id: line_length
        type: s4
      - id: l_intensity
        type: s4
      - id: circle_rad
        type: s4
      - id: c_intensity
        type: s4
      - id: flags
        type: u4
      - id: gr_rad
        type: s4
      - id: ref_light
        type: s4
      - id: last_ani_time
        type: u4
      - id: bound_r
        type: f4
      - id: reserved
        size: 16
    instances:
      is_animated:
        value: (flags & 0x80000000) != 0
      not_lighted:
        value: (flags & 64) != 0
      needs_bound:
        value: (flags & 16) != 0

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

  node:
    seq:
      - id: name
        type: strz
        size: 32
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

  model_animation:
    seq:
      - id: vc0
        type: u4
      - id: vc1
        type: u4
      - id: vc2
        type: u4
      - id: kps
        type: u4
      - id: frame_count
        type: u4
      - id: frames
        type: s2
        repeat: expr
        repeat-expr: frame_count * 3 * vc1

  fog_entry:
    seq:
      - id: fog_rgb
        type: u4
      - id: y_begin
        type: f4
      - id: mortal
        type: u4
      - id: transp
        type: f4
      - id: f_limit
        type: f4

  random_sound:
    seq:
      - id: pcm_size
        type: u4
      - id: pcm
        size: pcm_size
  
  ambient_sound:
    seq:
      - id: pcm_size
        type: u4
      - id: pcm
        size: pcm_size
      - id: r_data
        type: trd
        repeat: expr
        repeat-expr: 16
      - id: rsfx_count
        type: u4
      - id: a_volume
        type: u4

  trd:
    seq:
      - id: r_number
        type: u4
      - id: r_volume
        type: u4
      - id: r_frequency
        type: u4
      - id: r_environment
        type: u4
