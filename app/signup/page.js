"use client"
import { SignupAction } from "@/actions/auth/signup"
import Link from "next/link"
import { useActionState } from "react"

const Page = () => {
  const [state, action, pending] = useActionState(SignupAction, { initialState: null })
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">

      {/* Heading */}
      <h1 className="text-center text-3xl font-bold text-white bg-blue-200/20 py-5 rounded-xl w-[60%] mx-auto">Sign up</h1>
      <section className="w-full">
        <form action={action} className="w-9/10 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          {state?.error && <p className="mb-4 text-red-500">{state.error}</p>}
          {state?.message && <p className="mb-4 text-green-500">{state.message}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="Name" name="name" placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required minLength={3} maxLength={20} />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input type="text" id="username" name="username" placeholder="Your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required minLength={3} maxLength={20} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required minLength={6} maxLength={40} />
          </div>
          <button
            type="submit" disabled={pending}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed">
            {pending ? 'processing...' : 'Sign Up'}
          </button>
          <p>{"Already have an account? "} <Link href="/login" className="text-blue-500
          ">Login</Link></p>
        </form>

      </section>

    </main>
  )
}

export default Page