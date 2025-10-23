import LoginForm from "@/components/auth/loginForm"


const Page = () => {
  
  return (
    <main className="min-h-screen w-full bg-[#101922] flex flex-col items-center justify-center  text-white p-4">

      <h1 className="text-center text-2xl font-bold text-white w-[60%] mx-auto">Welcome back</h1>
      <p className="">Log in to access your account</p>
      <LoginForm  />

    </main>
  )
}

export default Page