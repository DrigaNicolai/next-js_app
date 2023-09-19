"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders, Session } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession() as Session;

  const [providers, setProviders] = useState(null as any);
  const [toggleDropdown, setToggleDropdown] = useState(false as boolean);
  const [userRoleName, setUserRoleName] = useState("undefined" as string);

  useEffect((): void => {
    const setUpProviders = async (): Promise<void> => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  useEffect((): void => {
    if (session) {
      setUserRoleName(session?.user.role);

      // console.log(session, "session");
    }
  }, [session]);


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="App Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Social Posts</p>
      </Link>

      <div>{ userRoleName }</div>
      <div className="flex gap-2 flex-center">
        <Link href="/users" className="flex gap-2 flex-center">
          <p className="modules_text">Users</p>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        { session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={() => signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/components/Profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            { providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        ) }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        { session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="Profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/components/Profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            { providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        ) }
      </div>
    </nav>
  );
};

export default Nav;
