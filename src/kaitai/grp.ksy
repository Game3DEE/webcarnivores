meta:
  id: grp
  file-extension: grp
  title: Texture and object group definitions for AltEditor II (Carnivores)
  application: AltEditor II (Carnivores 1, 2, and Ice Age map editor)
  endian: le
  encoding: utf8
  license: CC0-1.0

doc-ref: https://www.tapatalk.com/groups/the_carnivores_saga/alteditor-ii-grp-file-format-t2311.html

seq:
  - id: tex_group_count
    type: u4
  - id: obj_group_count
    type: u4
  - id: transitive_tex_group_count
    type: u4
  - id: tex_groups
    type: tex_group
    repeat: expr
    repeat-expr: 32
  - id: obj_groups
    type: obj_group
    repeat: expr
    repeat-expr: 32
  - id: transitive_tex_groups
    type: trans_tex_group
    repeat: expr
    repeat-expr: 32

types:
# Standard texture group types
  tex_group:
    seq:
      - id: name
        type: strz
        size: 32
      - id: level_count
        type: u4
      - id: textures
        type: tex_item
        repeat: expr
        repeat-expr: 32

  tex_item:
    seq:
      - id: low_level
        type: f4
      - id: high_level
        type: f4
      - id: tex_count
        type: u2
      - id: tex_index
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2
        repeat: expr
        repeat-expr: 32
      - id: density
        type: s2
        repeat: expr
        repeat-expr: 32
        doc: -1 means floating
      - id: random_rotation
        type: u1
        repeat: expr
        repeat-expr: 32
        doc: boolean, 1 means yes
      - id: pad
        contents: [ 0, 0 ]

# Standard object group types
  obj_group:
    seq:
      - id: name
        type: strz
        size: 31
      - id: level_count
        type: u1
      - id: obj_item
        type: obj_item
        repeat: expr
        repeat-expr: 31
        
  obj_item:
    seq:
      - id: low_level
        type: f4
      - id: high_level
        type: f4
      - id: obj_count
        type: u1
      - id: random_rotation
        type: u1
        repeat: expr
        repeat-expr: 32
      - id: obj_index
        type: u1
        repeat: expr
        repeat-expr: 32
      - id: padding
        contents: [ 0 ]
      - id: density
        type: s2
        repeat: expr
        repeat-expr: 32
      - id: zeroes
        contents: [ 0, 0 ]

# Transitive texture group types
  trans_tex_group:
    seq:
      - id: name
        type: strz
        size: _root.version == 1 ? 27 : 44
      - id: first_texture
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2
      - id: second_texture
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2
      - id: quarter_texture
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2
      - id: half_texture
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2
      - id: threequarters_texture
        type:
          switch-on: _root.version
          cases:
            1: u1
            2: u2

instances:
  version:
    value: _io.size == 0x45b0c ? 1 : _io.size == 0x4DDCC ? 2 : 0
