"use server"

import connectDB from "@/lib/mongodb";
import Url from "@/models/url";
import User from "@/models/user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import {z} from "zod";

// zod schema for validation
const urlValidation = z.object({
  // originalUrl validation
  originalUrl: z.string().min(5, { message: 'Invalid URL format' }),

  // shortUrl validation
  shortUrl: z.string().min(3, { message: 'Short URL must be at least 3 characters long' }).max(20, { message: 'Short URL must be at most 20 characters long' }).regex(/^[a-zA-Z0-9_-]+$/, { message: 'Short URL can only contain letters, numbers, underscores, and hyphens' })
});

export async function generateShortUrl(initialState, formData) {
  const {originalUrl, shortUrl } = {
    originalUrl: formData.get("originalUrl"),
    shortUrl: formData.get("shortUrl"),
  };

  console.log("body is :", originalUrl, shortUrl);

  // validate form data
  const validation = urlValidation.safeParse({ originalUrl, shortUrl });
  let zodError = {}
  if (!validation.success) {
    // console.log("zod log",validation.error.issues);
    validation.error.issues.map(i => zodError[i.path[0]] = i.message)
    console.log("zod error", zodError);
    return { success: false, error: {zodError} };
  }

  // connect to database
  await connectDB();

  const urlExist = await Url.findOne({ shortUrl });
  if (urlExist) {
    return {
      success: false,
      error: true,
      message: "URL name already used!",
    };
  }
  const result = await Url.create({
    originalUrl,
    shortUrl,
    // redirectUrl: process.env.NEXT_PUBLIC_HOST + "/" + shortUrl
  })
  // get cookies
  const cookie = await cookies()
  const jwToken = cookie.get("token")

  // verify jwt token
  const user = verify(jwToken)

  user.id ?  await User.findByIdAndUpdate(user.id) : console.log("user is undefine", user)
  console.log("insertion is : ", result);

  return {
    success: true,
    error: false,
    message: "URL Generated Successfully",
    generatedUrl: ` ${process.env.NEXT_PUBLIC_HOST}/${shortUrl} `
  }
}