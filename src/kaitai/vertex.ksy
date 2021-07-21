meta:
  id: vertex
  title: generic geometry vertex definition
  application: Carnivores 1,2 and IceAge
  endian: le
  license: CC0-1.0

doc-ref: https://carnivores.fandom.com/wiki/3DF

# this vertex definition is usediin both 3DF as well as CAR files

seq:
  - id: x
    type: f4
  - id: y
    type: f4
  - id: z
    type: f4
  - id: owner
    type: s2
    doc: bone to which vertex is attached
  - id: hide
    type: u2
    doc: whether the vertex is hidden in Designer 2; has no effect in-game
