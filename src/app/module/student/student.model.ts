import { Schema, model } from 'mongoose'
import { TStudent } from './student.interface'

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId, //mongoDb ObjectId type
    required: [true, 'user is required'],
    unique: true,
    ref: 'User', //referencing
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emegencyContactNo: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guadian: {
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
  },
  localGuadian: {
    name: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
  },
  profileImage: {
    type: String,
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

//middlewares
studentSchema.pre('find', function (next) {
  this.find({
    isDeleted: { $ne: true },
  })

  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({
    isDeleted: { $ne: true },
  })

  next()
})

//export
export const StudentModel = model<TStudent>('Student', studentSchema)
