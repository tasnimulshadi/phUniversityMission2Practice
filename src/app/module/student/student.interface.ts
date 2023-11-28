import { Types } from 'mongoose'

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: {
    firstName: string
    lastName: string
  }
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  contactNo: string
  emegencyContactNo: string
  presentAddress: string
  permanentAddress: string
  guadian: {
    name: string
    relation: string
  }
  localGuadian: {
    name: string
    relation: string
  }
  profileImage: string
  academicDepartment: object
}
