import SignupForm from "@/components/auth/signupForm"


const Page = () => {

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#101922] text-white p-4">

      {/* Heading */}
      <h1 className="text-center text-3xl font-bold text-white bg-[#101922] py-5 rounded-xl w-[60%] mx-auto">Create Your Account</h1>

      {/* Signup Form */}
      <SignupForm />
    </main>
  )
}

export default Page
