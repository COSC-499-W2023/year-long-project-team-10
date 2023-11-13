"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import Image from "next/image";

import DropMenu from "./DropMenu";

import Logo from "../../images/TheSomethingSomethingCompanyLogoV2.svg";
import Penguin from "../../images/ExamplePenguin.jpeg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [disableDropdown, setDisableDropdown] = useState(false);
  var [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("loggedIn")) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) window.localStorage.removeItem("loggedIn");
  }, [loggedIn]);

  //   <header className="bg-slate-950 text-white w-full fixed top-0 left-0 z-10 text-1xl">
  //     <nav className="max-w-full mx-1 h-[50px] flex justify-between items-center p-3">
  //       <div>
  //         <Link href="/" onClick={handleIcon}>
  //           TheSomethingSomethingCompany
  //         </Link>
  //       </div>

  //       {/* <div className="hidden md:block md:w-1/4">
  //         <Search />
  //       </div> */}

  //       {/* large screen */}
  //       <ul className="hidden md:flex">
  //         <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //           <Link href="/" className="rounded-full font-bold  py-1 px-2 mt-1" data-testid="home1">
  //               Home
  //             </Link>
  //         </li>

  //         {loggedIn ? (
  //           <>
  //             <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //               <Link href="#" className="rounded-full font-bold  py-2 px-2">
  //                   Requests
  //               </Link>
  //             </li>

  //             <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //               <Link href="#" className="rounded-full font-bold  py-2 px-2">
  //                   Chats
  //               </Link>
  //             </li>

  //             <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //               <Link href="#" className="rounded-full font-bold  py-2 px-2">
  //                   Profile
  //               </Link>
  //             </li>

  //             <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //               <Link href="/" onClick={logout} className="rounded font-bold bg-teal-600 py-2 px-4" data-testid="logout">
  //                   Logout
  //               </Link>
  //             </li>
  //           </>
  //         ) : (
  //           <li className="mr-2 lg:mr-4 hover:text-teal-300">
  //             <Link href="/auth/signin" className="rounded font-bold bg-teal-600 py-2 px-4" data-testid="login">
  //                 Login
  //             </Link>
  //           </li>
  //         )}
  //       </ul>

  //       {/* small screen icon */}
  //       <div onClick={handleIcon} className="flex md:hidden">
  //         {displayIcon ? <p>X</p> : <p>E</p>}
  //       </div>

  //       {/* small screen navbar */}

  //       <div
  //         className={
  //           displayIcon
  //             ? "md:hidden absolute top-[50px] right-0 bottom-0 left-0 flex justify-center items-center w-full bg-slate-800  text-center h-screen ease-in duration-300"
  //             : "md:hidden absolute top-[50px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
  //         }
  //       >
  //         {/* nav links */}
  //         <div className="w-full">
  //           <ul className="font-bold text-1xl">
  //             <li
  //               onClick={handleIcon}
  //               className="py-5 hover:text-text-teal-300"
  //             >
  //               {/* <li className="w-full"> */}
  //                 {/* <Search /> */}
  //               {/* </li> */}

  //               <Link href="/" data-testid="home2">Home</Link>
  //             </li>

  //             {loggedIn ? (
  //               <>
  //                 <li
  //                   onClick={handleIcon}
  //                   className="py-5 hover:text-text-teal-300"
  //                 >
  //                   <Link href="#">Requests</Link>
  //                 </li>

  //                 <li
  //                   onClick={handleIcon}
  //                   className="py-5 hover:text-text-teal-300"
  //                 >
  //                   <Link href="#">Chat</Link>
  //                 </li>

  //                 <li
  //                   onClick={handleIcon}
  //                   className="py-5 hover:text-text-teal-300"
  //                 >
  //                   <Link href="#">Profile</Link>
  //                 </li>

  //                 <li className="py-5 hover:text-text-teal-300">
  //                   <Link href="/" onClick={smallLogout}>
  //                     Logout
  //                   </Link>
  //                 </li>
  //               </>
  //             ) : (
  //               <li className="py-5 hover:text-text-teal-300">
  //                 <Link href="/signin" onClick={smallLogin}>
  //                   Login
  //                 </Link>
  //               </li>
  //             )}
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </header>
  // );
  return (
    <nav className="fixed top-0 left-0 z-50 w-screen px-8 py-4 flex flex-row justify-between items-center text-[1rem]">
      <section>
        <Link href={"./"}>
          <Image src={Logo} alt={"TheSomethingSomethingCompany"}></Image>
        </Link>
      </section>
      {false && (
        <section>
          <section className="flex flex-row justify-end items-center">
            <Link
              className="font-bold my-4 mx-8 border-b-4 border-transparent translate-y-1 hover:border-blue-600 transition-all duration-200 ease-in-out"
              href={"./auth/signin"}
            >
              LOG IN
            </Link>
            <Link
              className="font-bold text-white bg-[#009C93] hover:bg-[#00877f] p-4 rounded-xl transition-all duration-200 ease-in-out"
              href={"./auth/signup"}
            >
              GET STARTED FOR FREE
            </Link>
          </section>
        </section>
      )}
      {true && (
        <section>
          <section className="flex flex-row justify-end items-center">
            <Link
              className="font-bold my-4 mx-8 border-b-4 border-transparent translate-y-1 hover:border-blue-600 transition-all duration-200 ease-in-out"
              href={"./"}
            >
              CHATS
            </Link>
            <section
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              style={
                {
                  hoverColor: disableDropdown ? "transparent" : "#f7f7f7",
                } as any
              }
            >
              <div className="hover:bg-[hoverColor] px-4 py-2 rounded-xl transition-all duration-200 ease-in-out cursor-pointer">
                <section className="flex flex-row items-center justify-center">
                  {!disableDropdown && (
                    <i className="ri-arrow-drop-down-line text-4xl"></i>
                  )}
                  <p className="px-4">
                    <span className="font-bold">
                      WELCOME,
                      <br />
                    </span>
                    SATANSHU
                  </p>
                  <Image
                    src={Penguin}
                    alt={"Profile Picture"}
                    className="w-14 h-1w-14 rounded-full"
                  ></Image>
                </section>
              </div>
              {!disableDropdown && (
                <div className="relative">
                  <DropMenu isOpen={isOpen} />
                </div>
              )}
            </section>
          </section>
        </section>
      )}
    </nav>
  );
}
