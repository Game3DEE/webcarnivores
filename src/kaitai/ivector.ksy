meta:
  id: ivector
  title: Integer 3D vector format
  application: Carnivores 1, 2 and Ice Age
  endian: le

# this ivector type is used in both CAR files as well as VLT files

seq:
  - id: ix
    type: s2
  - id: iy
    type: s2
  - id: iz
    type: s2
instances:
  x:
    value: ix / 16.0
  y:
    value: iy / 16.0
  z:
    value: iz / 16.0
