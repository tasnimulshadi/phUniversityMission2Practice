import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../app/config'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //this will automatically create 'createdDate' and 'updatedDate' field in the database
  },
)

//
//
//
// middleware
userSchema.pre('save', async function (next) {
  // getting the data with 'this'
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  // hashing the password with bcrypt
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

userSchema.post('save', async function (doc, next) {
  // getting the saved data with 'doc'
  doc.password = ''
  next()
})

//
//
//
// export Model
export const UserModel = model<TUser>('User', userSchema)
