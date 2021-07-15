meta:
  id: c3df
  title: 3DF model file format for Carnivores
  application: Carnivores 1, 2, and Ice Age
  license: CC0-1.0
  endian: le
  encoding: utf8
  imports:
    - vertex
    - face

doc-ref: https://carnivores.fandom.com/wiki/3DF

seq:
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
instances:
  texture_width:
    value: 256
  texture_height:
    value: (texture_size / 2) / texture_width
    

types:
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
