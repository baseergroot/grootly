"use server"

import connectDB from "@/lib/mongodb";
import Url from "@/models/url";

export async function generateShortUrl(initialState, formData) {
  const {originalUrl, shortUrl } = {
    originalUrl: formData.get("originalUrl"),
    shortUrl: formData.get("shortUrl"),
  };

  console.log("body is :", originalUrl, shortUrl);

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
  console.log("insertion is : ", result);

  return {
    success: true,
    error: false,
    message: "URL Generated Successfully",
    generatedUrl: ` ${process.env.NEXT_PUBLIC_HOST}/${shortUrl} `
  }
}