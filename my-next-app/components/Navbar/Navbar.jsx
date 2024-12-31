import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserById } from "../../network/lib/user";
import { FaShoppingBasket } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdContacts } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);

      getUserById(localStorage.getItem("user_id"))
        .then((res) => {
          setIsAdmin(res.data.isadmin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <nav className="flex items-center justify-between bg-blue-600 p-6 w-screen">
      {/* Merkezi hizalama için ekstra div eklendi */}
      <div className="flex flex-1 justify-center">
        <Link href="/">
          <div className="flex items-center flex-shrink-0 text-white">
            {/* Logo ve Alsana yazısı */}
            <img
              src="/logo.png" // Logonun yolu
              alt="Logo"
              className="h-20 w-20 mr-2"
            />
            <span className="font-semibold text-2xl tracking-tight">
              Alsana
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/profile">
              <div className="block lg:inline-block hover:text-white mr-4">
                <VscAccount className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            <Link href="/cart">
              <div className="block lg:inline-block hover:text-white mr-4">
                <FaShoppingBasket className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
            <Link href="/contact">
              <div className="block lg:inline-block hover:text-white mr-4 cursor-pointer">
                <MdContacts className="inline-block h-6 w-6 fill-current" />
              </div>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <div className="block lg:inline-block hover:text-white mr-4">
              Giriş Yap/Kaydol
            </div>
          </Link>
        )}

        {isAdmin && (
          <Link href="/admin">
            <div className="block mt-4 lg:inline-block lg:mt-0 hover:text-white">
              Admin
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
