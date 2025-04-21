import { useState } from "react";
import { Link } from "react-router-dom";
import { UseShopingCartContext } from "../context/context";

function Navbar() {
  const { isLogin, handleLogout, allQtys } = UseShopingCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { to: "/", title: "home" },
    { to: "/categories", title: "categoris" },
  ];

  return (
    <nav className="bg-gray-300 flex justify-between items-center h-20  shadow-md px-6">
      <div className="text-xl font-bold">Logo</div>

      <button
        className="md:hidden p-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </button>

      <ul
        className={`flex flex-col md:flex-row bg-gray-300 md:bg-transparent  md:w-auto absolute md:static top-20 left-0 p-6 md:p-0 space-y-6 md:space-y-0 md:space-x-14  transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {navLinks.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="hover:text-blue-500">
              {item.title}
            </Link>
          </li>
        ))}
        <li>
          {isLogin ? (
            <button onClick={handleLogout}>logout</button>
          ) : (
            <Link to={"/login"}>login</Link>
          )}
        </li>
        <li className="">
          <Link className="flex" to={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="bg-blue-600 rounded-full p-0.5">{allQtys}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
