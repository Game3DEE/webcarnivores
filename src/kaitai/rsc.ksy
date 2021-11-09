# TODO:
#   - explain {dawn/day/night} rgb colors
meta:
  id: rsc
  title: RSC file format for Carnivores 1, 2, and Ice Age
  file-extension: rsc
  license: CC0-1.0
  endian: le
  bit-endian: le
  encoding: utf8
  imports:
    - c3df

doc-ref: https://www.tapatalk.com/groups/the_carnivores_saga/carnivores-2-and-ice-age-rsc-files-t2316.html
params:
  - id: version
    type: u4
seq:
  - id: texture_count
    type: u4
  - id: model_count
    type: u4
  - id: dawn_sky_rgb
    type: rgb
    if: version == 2
  - id: day_sky_rgb
    type: rgb
  - id: night_sky_rgb
    type: rgb
    if: version == 2
  - id: dawn_sky_t_rgb
    type: rgb
    if: version == 2
  - id: day_sky_t_rgb
    type: rgb
  - id: night_sky_t_rgb
    type: rgb
    if: version == 2
  - id: textures
    type: texture
    repeat: expr
    repeat-expr: texture_count
  - id: models
    type: model
    repeat: expr
    repeat-expr: model_count
  - id: dawn_sky_texture
    size: sky_texture_width * sky_texture_height * 2
    if: version == 2
  - id: day_sky_texture
    size: sky_texture_width * sky_texture_height * 2
  - id: night_sky_texture
    size: sky_texture_width * sky_texture_height * 2
    if: version == 2
  - id: clouds_map
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
  - id: water_count
    type: u4
    if: version == 2
  - id: waters
    type: water
    repeat: expr
    repeat-expr: water_count
    if: version == 2
instances:
  sky_texture_width:
    value: 256
  sky_texture_height:
    value: 256

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
        size: width * height * 2
        doc: raw RGBA5551 bitmap data
    instances:
      width:
        value: 128
      height:
        value: 128

  model:
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
      # Flags (32 bit)
      - id: f_place_water
        type: b1
      - id: f_place_ground
        type: b1
      - id: f_place_user
        type: b1
      - id: f_circle
        type: b1
      - id: f_bound
        type: b1
      - id: f_no_bmp
        type: b1
      - id: f_no_light
        type: b1
      - id: f_default_light
        type: b1
      - id: f_ground_light
        type: b1
      - id: f_no_soft
        type: b1
      - id: f_no_soft_2
        type: b1
      - id: f_unused
        type: b20
      - id: f_is_animated
        type: b1

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
      - id: model
        type: c3df
      - id: billboard
        type: texture
        if: _root.version == 2
      - id: animation
        type: model_animation
        if: f_is_animated

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

# Audio format is:
#   Mono, 16bit, 22050Hz

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
        # The below values are not set/used for C1
      - id: r_environment
        type: u2
        enum: audio_reverb
      - id: rf_not_at_night
        type: b1
        doc: if set, sound does not play at night
      - id: rf_unused
        type: b15

  water:
    seq:
      - id: texture_index
        type: u4
      - id: level
        type: u4
      - id: opacity
        type: f4
      - id: fog_rgb
        type: u4

enums:
  audio_reverb:
    0: generic
    1: plate
    2: forest
    3: mountain
    4: canyon
    5: cave # special1
    6: special2
    7: unused # special3
