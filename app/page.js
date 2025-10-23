import Navbar from "@/components/navbar";
import HomePage from "@/components/home";
export default function Home() {
  return (
    <div className=" w-[100vw] h-[100vh] bg-[#101922] lg:py-5 lg:px-20">
      <Navbar />
      <HomePage />
    </div>
   
  );
}
