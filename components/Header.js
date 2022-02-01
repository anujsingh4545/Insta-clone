import Image from "next/image";

import { SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="sticky shadow-sm shadow-white  bg-white top-0 z-50">
      <div className="flex justify-between bg-white max-w-6xl m-auto items-center">
        {/* LEft section */}
        <section className="relative hidden lg:inline-block w-24 h-10 cursor-pointer  ml-2">
          <Image src="https://links.papareact.com/ocw" layout="fill" objectFit="contain" />
        </section>

        <section className="relative lg:hidden w-10 h-10 flex-shrink-0 cursor-pointer ml-2">
          <Image src="https://links.papareact.com/jjm" layout="fill" objectFit="contain" />
        </section>

        {/* Center section */}
        <div className="flex border-2 items-center m-3 rounded-xl border-gray-200 md:w-[20rem] lg:w-[25rem]">
          <section>
            <SearchIcon className="h-5 w-5 text-gray-500 ml-2" />
          </section>

          <input type="text" placeholder="search" className="text-lg outline-none p-1 ml-1 mr-1 w-[90%]" />
        </div>

        {/* Right section */}

        <div className="flex items-center justify-end space-x-2 mr-2 ">
          <HomeIcon className="navBtn text-black " />
          {/* <MenuIcon className=" h-7  md:hidden cursor-pointer text-black" /> */}
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className=" navBtn text-black" />
                <div className="absolute -top-2 right-1 bg-red-500 rounded-full flex items-center justify-center h-5 w-5 animate-pulse text-white text-xs ">5</div>
              </div>
              <PlusCircleIcon onClick={() => setOpen(true)} className=" h-8 md:h-6 w-8 md:inline-flex cursor-pointer  hover:scale-125  transition-all duration-150 ease-out text-black" />
              <UserGroupIcon className="navBtn text-black" />
              <HeartIcon className="navBtn text-black" />
              <img src={session?.user?.image} alt="profice pic" className="h-9 rounded-full cursor-pointer " onClick={signOut} />
            </>
          ) : (
            <button onClick={signIn} className="text-blue-500 font-semibold  pr-1">
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
