"use client"
import LogoutAction from "@/actions/auth/logout"
import { useTransition } from "react";


// Logout SVG
const LogoutSVG = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 font-semibold text-lg" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
</svg>

  )
}

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
      className='cursor-pointer'
      onClick={HandleLogout}>
      { isPending ? "logging out..." : <LogoutSVG />}
    </button>
  )
}

export default LogoutButton