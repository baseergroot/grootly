import { redirect } from "next/navigation"
import connectDB from "@/lib/mongodb"
import Url from "@/models/url"


export default async function Page({ params }) {
  const shortUrl = (await params).shorturl
  console.log("shorturl is :", shortUrl)
  await connectDB();

  const doc = await Url.findOne({ shortUrl })
  console.log("doc is :", doc)
  if (doc) {
    // Redirect to the URL stored in the database
    return redirect(doc.originalUrl);
  } else {
    return <h1 className="text-center my-20 font-bold text-2xl text-red-500">Something went wrong!</h1>
  }
}