import Navbar from "@/components/navbar";
import ShortnerFrom from "@/components/shortnerForm";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Shorten = async () => {
  //  get cookies
  const cookie = await cookies()
  const jwToken = cookie.get("token")?.value

  // redirect to login if no token
  if (!jwToken) {
    redirect("/login")
  }
  // verify jwt
  const user = verify(jwToken, process.env.JWT_SECRET)

  // connect to database
  await connectDB()

  // get short urls for logged in user
  const userHistory = await User.findById(user.id).populate("shortUrls", 'originalUrl shortUrl').select("-password")

  // log for debuging
  console.log("shortUrls is :", userHistory);

  return (
    <main className="w-[100vw] min-h-[100vh] bg-[#101922] py-3 lg:py-5 ">
      {/* <h1 className="text-center text-3xl font-bold text-white bg-blue-200/20 py-5 rounded-xl w-[80%] mx-auto">
        Grootly
      </h1> */}
      <Navbar />
      <ShortnerFrom />
      <section>
        <h2 className="text-center text-2xl font-bold text-white bg-blue-200/10 py-5 rounded-xl w-[80%] mx-auto">
          History
        </h2>
        <div className="flex flex-col items-center gap-2.5 py-4 w-[100%] mx-auto rounded-2xl outline-none border-none">
          {userHistory?.shortUrls?.map((urls) => (
            <div key={urls._id} className="bg-blue-200/10 text-gray-300 rounded-xl px-4 py-2 w-[80%] flex flex-col justify-between">
              <p><span className="font-bold">Original</span> - {urls.originalUrl}</p>
              <Link href={`/${urls.shortUrl}`}><span className="font-bold ">Short</span> - {process.env.NEXT_PUBLIC_HOST}/{urls.shortUrl}</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shorten;
