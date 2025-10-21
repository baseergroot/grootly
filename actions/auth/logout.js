"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function LogoutAction() {
    console.log("logout action called");
    try{
        // Delete cookie
    const cookie = await cookies()
    cookie.delete("token")

    // log for debuging
    console.log("cookie deleted");
    

    // return response
    return redirect("/")
    }
    catch{
        console.log("something went wrong")
        return "something went wrong"
    }
}