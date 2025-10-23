// signup action
"use server"

import connectDB from "@/lib/mongodb"
import User from "@/models/user"
import {z} from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// zod schema for validation
const userValidation = z.object({
  // name validation
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(20, { message: 'Name must be at most 20 characters long' }),

  // username validation
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }).max(20, { message: 'Username must be at most 20 characters long' }),

  // password validation
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).max(40, { message: 'Password must be at most 40 characters long' })
})

export async function SignupAction(initialState, formData) {

  // get form data
  const { name, username, password } = {
    name: formData.get('name'),
    username: formData.get('username'),
    password: formData.get('password')
  }

  // validate form data
  const validation = userValidation.safeParse({ name, username, password })
  if (!validation.success) {
    console.log("zod log",validation.error.issues)
    return { error: validation.error.errors[0].message }
  }

  // connect to database
  await connectDB()

  // check if user already exists
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return { error: 'Username already exists' }
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // create user in database
  const newUser = await User.create({
    name,
    username,
    password: hashedPassword
  })

  // return error response
  if (!newUser) {
    return { error: 'Error creating user' }
  }

  // create session
  const token = jwt.sign({ id: newUser._id, name, username }, process.env.JWT_SECRET, { expiresIn: '7d' })
  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // return success response
  return redirect('/shorten')
}