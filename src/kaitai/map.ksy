meta:
  id: map
  file-extension: map
  title: MAP file format for Carnivores
  application: Carnivores 1, 2, and Ice Age
  endian: le
  bit-endian: le
  encoding: utf8
  license: CC0-1.0

doc-ref: https://carnivores.fandom.com/wiki/Carnivores_2_MAP

seq:
  - id: height_map
    type: u1
    repeat: expr
    repeat-expr: map_size * map_size 
    doc: |
      Terrain heightmap
      
      The terrain geometry is a `map_size`x`map_size` grid of 256x256
      tiles, where the integer height from the heightmap is multiplied by 32
      for the original Carnivores, and 64 for Carnivores 2 and Ice Age.
  - id: texture_map_1
    type:
      switch-on: version
      cases:
        1: u1
        2: u2
    repeat: expr
    repeat-expr: map_size * map_size
    doc: |
      Textur map 1
      
      In the original Carnivores, this specifies the texture to on the
      first* triangle of a tile. For Carnivores 2 and Ice Age, the texture
      specified here is used for the entire tile.
      
      Triangle order (for original Carnivores):
      +-----+
      | \ 1 |
      |  \  |
      | 2 \ |
      +-----+
  - id: texture_map_2
    type:
      switch-on: version
      cases:
        1: u1
        2: u2
    repeat: expr
    repeat-expr: map_size * map_size
    doc: |
      Texture map 2
      
      In the original Carnivores, this specifies the texture of the second
      triangle of a tile. For Carnivores 2 and Ice Age, the texture specified
      here is used for a 4x4 tile in the distance (aka LOD texture).
  - id: object_map
    size: map_size * map_size
    doc: |
      Object map
      
      This map specifies if an object is placed on a tile, and if so, which
      one. The following values are used:
      
        < 254: object index (see RSC file format)
          254: spawn location (or trophy placement location for trophy room)
          255: no object
  - id: flags_map
    type:
      switch-on: version
      cases:
        1: flags_v1
        2: flags_v2
    repeat: expr
    repeat-expr: map_size * map_size
    doc: Map of flags per tile. different between original and 2 / Ice Age!
  - id: dawn_light_map
    size: map_size * map_size
    if: version == 2
  - id: day_light_map
    size: map_size * map_size
  - id: night_light_map
    size: map_size * map_size
    if: version == 2
  - id: water_map
    size: map_size * map_size
    doc: |
      Water heightmap
      Only read when the water flag is set for a tile.
      Specifies sea floor height.
  - id: object_height_map
    size: map_size * map_size
    doc: |
      Object heightmap
      
      Map of heights for tiles with objects. However, it is only used when
      the object flags in the RSC file specify place_user (other options there
      are place_ground or place_water).
  - id: fogs_map
    size: (map_size * map_size) /4
    doc: Fog map, which areas are covered in fog in game.
  - id: ambient_map
    size: (map_size * map_size) /4
    doc: Ambient sounds map
instances:
  version:
    value:  _io.size == 0x220000 ? 1 : _io.size == 0xD80000 ? 2 : 0
  is_valid:
    value: version == 1 or version == 2
  map_size:
    value: version * 512
  map_tile_size:
    value: 256
  map_y_scale:
    value: version == 2 ? 64 : 32

types:
  flags_v1:
    seq:
      - id: f_tex_direction
        type: b2
        doc: |
          0: no rotation (right-side-up)
          1: rotated 90 degrees clockwise
          2: rotated 180 degrees (upside-down)
          3: rotated 90 degrees counter-clockwise
      - id: f_model_direction
        type: b3
        doc: |
          Represents an angle, fully calculated as
          (value * 2 * PI / 8) and used when rendering models on the tile.
      - id: f_no_way
        type: b1
      - id: f_reverse
        type: b1
        doc: |
          Indicates how the cell is diagonally split among both textures
            true: 2 - 1
            false: 1 - 2
      - id: f_water
        type: b1
        doc: |
          Marks the cell as having water in it, must be set for the Water Index
          map to have any effect.

  flags_v2:
    seq:
      # lsb of word
      - id: f_tex_direction
        type: b2
        doc: |
          0: no rotation (right-side-up)
          1: rotated 90 degrees clockwise
          2: rotated 180 degrees (upside-down)
          3: rotated 90 degrees counter-clockwise
      - id: f_model_direction
        type: b2
        doc: |
          Represents an angle, fully calculated as
          (value * 2 * PI / 4) and used when rendering models on the tile.
      - id: f_reverse
        type: b1
        doc: |
          Indicates how the cell is diagonally split among both textures
            true: 2 - 1
            false: 1 - 2
      - id: f_no_way
        type: b1
      - id: unused1
        type: b1
      - id: f_water
        type: b1
        # msb of word
      - id: f_tex2_direction
        type: b2
      - id: unused2
        type: b5
      - id: f_water2
        type: b1
