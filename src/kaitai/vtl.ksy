meta:
  id: vtl
  title: VTL animation file format for Carnivores
  application: Animator 7
  license: CC0-1.0
  endian: le
  encoding: utf8
  imports:
    - ivector

doc-ref: https://carnivores.fandom.com/wiki/VTL

seq:
  - id: vertex_count
    type: u4
  - id: frames_per_second
    type: u4
  - id: frame_count
    type: u4
  - id: frames
    type: frame
    repeat: expr
    repeat-expr: frame_count

types:
  frame:
    seq:
      - id: vertices
        type: ivector
        repeat: expr
        repeat-expr: _root.vertex_count
