meta:
  id: carnivores1_map
  file-extension: map
  endian: le
  encoding: utf8

seq:
  - id: height_map
    size: map_size * map_size
  - id: texture_map_1
    size: map_size * map_size
  - id: texture_map_2
    size: map_size * map_size
  - id: o_map # object map, trees and such?
    size: map_size * map_size
  - id: f_map # flags?
    size: map_size * map_size
  - id: light_map
    size: map_size * map_size
  - id: water_map
    size: map_size * map_size
  - id: height_map_0
    size: map_size * map_size
  - id: fogs_map
    size: (map_size * map_size) /4
  - id: ambient_map
    size: (map_size * map_size) /4
instances:
  map_size:
      value: 512 # 1024 for C2/IceAge
