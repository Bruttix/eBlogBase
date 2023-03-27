import React, { useContext } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/react";
import { HiLogout  } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiComputerDesktop  } from "react-icons/hi2";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import Link from "next/link";

const Header = () => {
  const { status } = useSession();
  const { setIsWriteModalOpen } = useContext(GlobalContext);

  return (
    <header className="eBlogTitle font-supermercado flex h-20 w-full flex-row items-center justify-around border-b-[1px] border-yellow-600 bg-yellow-700">
      <div className="headerLeft">
          <div className="headerLogoBox">
             <img src="https://res.cloudinary.com/dqbkfteqj/image/upload/v1679865195/BGoldLogoAbstract_clear_cehnai.png" alt="Suga" />
          </div>
        <IoReorderThreeOutline className="menuIcon text-2xl" />
      </div>
      <Link
        href={"/"}
        className="  cursor-pointer select-none text-4xl font-bold"
      >
        Adroit Blogger
      </Link>
      {status === "authenticated" ? (
        <div className="flex items-center space-x-4">
          <div>
            <a className="headerIconBtn" href="https://BrandonGreene.net" >
              <HiComputerDesktop className="text-2xl"/>
            </a>
          </div>
          <div>
            <BsBell className="text-2xl " />
          </div>
          <div>
            <div className="h-5 w-5 rounded-full bg-yellow-600" />
          </div>
          <div>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="headerBtns flex items-center space-x-3 rounded border border-yellow-600 px-4 py-2 transition"
            >
              <div>Write</div>
              <div>
                <FiEdit />
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => signOut()}
              className="headerBtns flex items-center space-x-3 rounded border border-yellow-600 px-4 py-2 transition "
            >
              <div>Logout</div>
              <div>
                <HiLogout />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => signIn()}
            className="headerBtns flex items-center space-x-3 rounded border border-yellow-600 px-4 py-2 transition"
          >
            Sign In<span></span> <HiArrowLeftOnRectangle/>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
