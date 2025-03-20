import Image from "next/image";
import Hero from "./components/Hero";
import { FloatingNav } from "@/app/components/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import Grid from "./components/Grid";
import RecentProjects from "@/app/components/RecentProjects";
import {ContactForm} from "@/app/components/ContactForm";

export default function Home() {
  return (
    <>
    <main className="relative bg-black-100 text-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={[
          {
            name: "Home",
            link: "/",
            icon : <FaHome/>
          },
          {
            name: "About",
            link: "#about",
          },
          {
            name: "Projects",
            link: "#projects",
          },
          {
            name: "Contact",
            link: "#contact",
          }
        ]}/>
        <Hero/>
        <Grid/>
        <RecentProjects/>
        <ContactForm/>
      </div>
    </main>
    </>
  );
}
