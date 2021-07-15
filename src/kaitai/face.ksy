# TODO:
#   - document face fields
#   - explain owner/hide fields
meta:
  id: face
  title: Generic geometry face (triangle) definition
  application: Carnivores 1, 2 and Ice Age
  endian: le
  license: CC0-1.0

doc-ref: https://carnivores.fandom.com/wiki/3DF

# this vertex definition is usediin both 3DF as well as CAR files

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
  - id: f_double_side
    type: b1
  - id: f_dark_back
    type: b1
  - id: f_opacity
    type: b1
  - id: f_mortal
    type: b1
  - id: f_phong
    type: b1
  - id: f_envmap
    type: b1
  - id: f_needvc
    type: b1
  - id: f_unused
    type: b7
  - id: f_dark_front
    type: b1
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
