meta:
  id: carnivores1_map
  file-extension: map
  endian: le
  encoding: utf8

seq:
  - id: height_map
    size: map_size * map_size
    doc: Terrain heightmap, for water tiles it specifies the water surface height
  - id: texture_map_1
    type:
      switch-on: is_v1
      cases:
        true: u1
        false: u2
    repeat: expr
    repeat-expr: map_size * map_size
    doc: Terrain texture map, every byte specifies a texture index for the terrain
  - id: texture_map_2
    type:
      switch-on: is_v1
      cases:
        true: u1
        false: u2
    repeat: expr
    repeat-expr: map_size * map_size
  - id: object_map
    size: map_size * map_size
    doc: Object placement map, every byte specifies an object (< 254), a spawn location (254), or no model (255)
  - id: flags_map
    type:
      switch-on: is_v1
      cases:
        true: u1
        false: u2
    repeat: expr
    repeat-expr: map_size * map_size
    doc: Flags map, specifies render flags per tile. This includes rotation of terrain texture, of object, and more.
  - id: light_map
    size: map_size * map_size
    doc: Light map, specifies lighting of placed objects
    if: is_v1
  - id: dawn_light_map
    size: map_size * map_size
    if: is_v2
  - id: day_light_map
    size: map_size * map_size
    if: is_v2
  - id: night_light_map
    size: map_size * map_size
    if: is_v2
  - id: water_map
    size: map_size * map_size
    doc: Water heightmap, specifies "sea floor" terrain heights
  - id: object_height_map
    size: map_size * map_size
    doc: Object heightmap, height placement of objects (flags map can specify to align to sea floor level or terrain ground level too)
  - id: fogs_map
    size: (map_size * map_size) /4
    doc: Fog map, which areas are covered in fog in game.
  - id: ambient_map
    size: (map_size * map_size) /4
    doc: Ambient sounds map
instances:
  is_v1:
    value:  _io.size == 0x220000
  is_v2:
    value: _io.size == 0xD80000
  is_valid:
      value: is_v1 or is_v2
  map_size:
      value: is_v1 ? 512 : 1024
