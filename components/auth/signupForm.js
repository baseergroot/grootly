"use client"
import { SignupAction } from "@/actions/auth/signup"
import InputWrapper from "@/components/inputWrapper"
import Link from "next/link"
import { useActionState } from "react"


const SignupForm = () => {
    const [state, action, pending] = useActionState(SignupAction, { initialState: null })

  return (
    <form action={action} className="w-9/10 mx-auto mt-5">
          
          {state?.message && <p className="mb-4 text-green-500">{state.message}</p>}
          <div className="mb-2">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <InputWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <input type="text" id="Name" name="name" placeholder="Your Name"
                required minLength={3} maxLength={20}
                className="border-none outline-none" />
            </InputWrapper>
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="block font-bold mb-2">Username</label>
            <InputWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <input type="text" id="username" name="username" placeholder="Your username"
                className="border-none outline-none" required minLength={3} maxLength={20} />
            
          </InputWrapper>
          {state?.error && <p className=" text-red-500">{state.error}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block  font-bold mb-2">Password</label>
            <InputWrapper>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input type="password" id="password" name="password" placeholder="Your password"
                className="border-none outline-none" required minLength={6} maxLength={40} />
            </InputWrapper>
          </div>
          <button
            type="submit" disabled={pending}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed">
            {pending ? 'processing...' : 'Sign Up'}
          </button>
          <p className="text-center mt-5 text-md">{"Already have an account? "} <Link href="/login" className="text-blue-500
          ">Login</Link></p>
        </form>
  )
}

export default SignupForm