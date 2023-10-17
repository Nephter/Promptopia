"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

// use supabase.auth.getSession() "Retrieve a session", use supabase.auth.getUser() to "Retrieve a User"

const Nav = () => {
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  // const autoSignIn = async () => {
  //   const { data } = await supabase.auth.getSession().session.user
  //   console.log('user', data)
  // }
  // const autoSignIn = async () => {
  //   await supabase.auth.getSession().then((data) => {
  //     supabase.auth.setSession({
  //       access_token: data.session?.access_token,
  //       refresh_token: data.session?.refresh_token
  //     })
  //   })
  // }
  const autoSignIn = async () => {
    const data = await supabase.auth.getSession()
    // console.log('data', data)
    const { data: sessionData, error } = await supabase.auth.setSession({
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token
    })
    // console.log('sessionData', sessionData)
  }

  autoSignIn()

  useEffect(() => {
    supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setLoggedIn(true);
        } else if (event === "SIGNED_OUT") {
          setLoggedIn(false);
        }
      }
    );
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error);
    else router.push('/');
  };

  const handleCreatePrompt = () => {
    if (loggedIn) {
      router.push('/create-prompt')
    } else {
      toast('Login to create a prompt!', {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push('/login')
    }
  }

  return (
    <span className="flex flex-row gap-4">
      <button
        onClick={handleCreatePrompt}
        className="
        blue_gradient rounded-full border border-black  py-1.5 px-5  text-center text-sm  flex items-center justify-center hover:bg-blue-500  hover:border-blue-500 hover:shadow-lg hover:scale-105 hover:transition-all duration-300 ease-in-out transition-all"
      >
        Create Prompt
      </button>
      {!loggedIn ? (
        <Link
          href="/login"
          className="black_btn"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="black_btn"
        >
          Logout
        </button>
      )}

    </span>

    // <nav className='flex-between w-full mb-16 pt-3'>
    //   <Link href='/' className='flex gap-2 flex-center'>
    //     <Image
    //       src='/assets/images/logo.svg'
    //       alt='logo'
    //       width={30}
    //       height={30}
    //       className='object-contain'
    //     />
    //     <p className='logo_text'>Promptopia</p>
    //   </Link>

    //   {/* Desktop Navigation */}
    //   <div className='sm:flex hidden'>
    //     {session?.user ? (
    //       <div className='flex gap-3 md:gap-5'>
    //         <Link href='/create-prompt' className='black_btn'>
    //           Create Post
    //         </Link>

    //         <button type='button' onClick={signOut} className='outline_btn'>
    //           Sign Out
    //         </button>

    //         <Link href='/profile'>
    //           <Image
    //             src={session?.user.image}
    //             width={37}
    //             height={37}
    //             className='rounded-full'
    //             alt='profile'
    //           />
    //         </Link>
    //       </div>
    //     ) : (
    //       <>
    //         {providers &&
    //           Object.values(providers).map((provider) => (
    //             <button
    //               type='button'
    //               key={provider.name}
    //               onClick={() => {
    //                 signIn(provider.id);
    //               }}
    //               className='black_btn'
    //             >
    //               Sign in
    //             </button>
    //           ))}
    //       </>
    //     )}
    //   </div>

    //   {/* Mobile Navigation */}
    //   <div className='sm:hidden flex relative'>
    //     {session?.user ? (
    //       <div className='flex'>
    //         <Image
    //           src={session?.user.image}
    //           width={37}
    //           height={37}
    //           className='rounded-full'
    //           alt='profile'
    //           onClick={() => setToggleDropdown(!toggleDropdown)}
    //         />

    //         {toggleDropdown && (
    //           <div className='dropdown'>
    //             <Link
    //               href='/profile'
    //               className='dropdown_link'
    //               onClick={() => setToggleDropdown(false)}
    //             >
    //               My Profile
    //             </Link>
    //             <Link
    //               href='/create-prompt'
    //               className='dropdown_link'
    //               onClick={() => setToggleDropdown(false)}
    //             >
    //               Create Prompt
    //             </Link>
    //             <button
    //               type='button'
    //               onClick={() => {
    //                 setToggleDropdown(false);
    //                 signOut();
    //               }}
    //               className='mt-5 w-full black_btn'
    //             >
    //               Sign Out
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <>
    //         {providers &&
    //           Object.values(providers).map((provider) => (
    //             <button
    //               type='button'
    //               key={provider.name}
    //               onClick={() => {
    //                 signIn(provider.id);
    //               }}
    //               className='black_btn'
    //             >
    //               Sign in
    //             </button>
    //           ))}
    //       </>
    //     )}
    //   </div>
    // </nav>
  );
};

export default Nav;
