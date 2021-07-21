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

# this vertex definition is used in both 3DF as well as CAR files

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
    doc: marks face as textured on both sides
  - id: f_dark_back
    type: b1
    doc: marks face as having a dark back side
  - id: f_opacity
    type: b1
    doc: marks face as transparent
  - id: f_transparent
    type: b1
    doc: marks face as non-solid (bullets pass through harmlessly)
  - id: f_mortal
    type: b1
    doc: marks face as a target zone
  - id: f_phong
    type: b1
    doc: marks face as Phong mapped
  - id: f_envmap
    type: b1
    doc: marks face as Environment mapped
  - id: f_needvc
    type: b1
  - id: f_unused
    type: b7
  - id: f_dark_front
    type: b1
    doc: marks face as having a dark front side
  - id: d_mask
    type: u2
    doc: appears to be unused by the games, possibly editor/tool-specific
  - id: distant
    type: s4
    doc: purpose unknown
  - id: next
    type: u4
    doc: some sort of index to other faces?
  - id: group
    type: u4
    doc: appears to be unused by the games, possibly editor/tool-specific
  - id: reserved
    size: 12
    doc: unused; reserved for future use
