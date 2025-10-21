"use client"
import LogoutAction from "@/actions/auth/logout"
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const HandleLogout =  () => {
    startTransition(async () => {
      const result = await LogoutAction()
      console.log(result.message);
    });
  }

  return (
    <button
      className='bg-blue-400 px-4 py-1 rounded-2xl font-bold'
      onClick={HandleLogout}>
      { isPending ? "logging out..." : "Logout"}
    </button>
  )
}

export default LogoutButton