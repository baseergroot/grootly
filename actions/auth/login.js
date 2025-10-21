// login action
"use server"

import User from "@/models/user"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import { redirect } from "next/navigation"


export default async function LoginAction(initialState, formData) {
  
  // get form data
  const { username, password } = {
    username: formData.get('username'),
    password: formData.get('password')
  }

  // validate form data
  if (!username || !password) {
    return { error: 'All fields are required' }
  }

  // connect to database
  await connectDB()

  // check if user exists
  const user = await User.findOne({ username })
  if (!user) {
    return { error: 'Invalid username or password' }
  }

  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: 'Invalid username or password' }
  }

  // create session
  const token = jwt.sign({ id: user._id, name: user.name, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 }) // 7 days

  // return success response
  return redirect('/shorten')

}