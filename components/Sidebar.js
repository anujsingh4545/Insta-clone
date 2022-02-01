import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <div className=" w-[40%] hidden md:block mt-10">
          <section className="w-[80%] m-auto flex items-center">
            <img src={session?.user?.image} alt="" className=" rounded-full h-14  mx-2" />
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">{session?.user?.username} </p>
              <p className="text-[0.8rem] text-[#dad7d7]">welcome to instagram</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer" onClick={signOut}>
              Sign Out
            </p>
          </section>

          <section className=" w-[80%] m-auto flex items-center mt-9">
            <p className="flex flex-1 text-[#dad7d7] text-[0.9rem]">Suggestions for you</p>
            <p className="text-[1rem] mr-2">See All</p>
          </section>

          <section className="w-[80%] m-auto flex items-center mt-7">
            <div className="rounded-full h-9 w-9 bg-blue-700 flex items-center justify-center text-[1.2rem] ">S</div>
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">savor_fleet</p>
              <p className="text-[0.8rem] text-[#dad7d7]">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer text-[0.9rem] ">Follow</p>
          </section>

          <section className="w-[80%] m-auto flex items-center my-4">
            <div className="rounded-full h-9 w-9 bg-green-700 flex items-center justify-center text-[1.2rem] ">S</div>
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">sack_seed</p>
              <p className="text-[0.8rem] text-[#dad7d7]">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer text-[0.9rem]">Follow</p>
          </section>

          <section className="w-[80%] m-auto flex items-center my-4">
            <div className="rounded-full h-9 w-9 bg-blue-700 flex items-center justify-center text-[1.2rem] ">G</div>
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">game_fleet</p>
              <p className="text-[0.8rem] text-[#dad7d7]">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer text-[0.9rem]">Follow</p>
          </section>

          <section className="w-[80%] m-auto flex items-center my-4">
            <div className="rounded-full h-9 w-9 bg-yellow-500 flex items-center justify-center text-[1.2rem] ">Y</div>
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">yetermister</p>
              <p className="text-[0.8rem] text-[#dad7d7]">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer text-[0.9rem]">Follow</p>
          </section>

          <section className="w-[80%] m-auto flex items-center my-4">
            <div className="rounded-full h-9 w-9 bg-green-700 flex items-center justify-center text-[1.2rem] ">G</div>
            <div className=" flex flex-col flex-1 mx-3">
              <p className="text-[1rem] font-semibold">game_changer</p>
              <p className="text-[0.8rem] text-[#dad7d7]">Lorem ipsum dolor sit amet.</p>
            </div>
            <p className=" mr-2 text-blue-400 font-semibold cursor-pointer text-[0.9rem]">Follow</p>
          </section>
        </div>
      )}
    </>
  );
}

export default Sidebar;
