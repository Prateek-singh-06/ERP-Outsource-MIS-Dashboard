"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./nav.css";
import ViewCount from "../ViewCount";
import Image from 'next/image';
import { usePathname } from "next/navigation";


const Nav: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const handleNavBarAnimation = () => {
    setAnimate(!animate);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setAnimate(false);
    }
  };
  const isActive = (href: string) => {
    // For root path, match exactly
    if (href === "/") return pathname === "/";
    // For other paths, match if pathname starts with href
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (animate) {
      document.body.style.pointerEvents = "none";
      if (ref.current) {
        ref.current.style.pointerEvents = "auto";
      }
    } else {
      document.body.style.pointerEvents = "auto";
    }
  }, [animate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative b-[#313131] bg-gray-300 z-[11] flex items-center justify-between p-2 "
      ref={ref}
    >
      <div className="flex items-center w-full lg:w-auto">
        <div className="relative w-26 h-15">
  <Image
    src="/image.png"
    alt="My Photo"
    fill // this tells Next.js to fill the parent container
    className="" // optional: controls how the image is scaled/cropped
  />
</div>

        <Link
          href="/"
          className="text-3xl font-bold text-black ml-5 mr-auto hover:text-orange-600 transition-colors"
        >
        </Link>

        {/* Mobile menu button */}
        <div className="mx-12  lg:hidden">
          <ViewCount />
          {/* </button> */}
          {/* </a> */}
        </div>
        <button
          onClick={handleNavBarAnimation}
          className="lg:hidden rotate-180 text-gray-800 hover:text-orange-500 hover:cursor-pointer focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed b-[#212121] bg-gray-300 top-0 right-0 h-full w-64 z-10 transition-transform duration-500 ease-in-out ${
            animate ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={handleNavBarAnimation}
              className="text-gray-900 hover:text-orange-500 focus:outline-none"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="cursor-pointer duration-300 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M105.367 18.328c23.14 15.444 46.098 31.27 68.55 47.572-45.055-20.895-94.51-35.918-149.37-44.246 46.697 26.72 91.596 55.58 135.705 85.524-37.203-18.033-77.48-32.22-121.602-41.37 58.218 34.322 109.368 72.465 154.71 114.206C136.02 227.227 86.295 284.717 45.79 354.18c27.11-24.29 54.91-47.545 82.868-70.68C81.942 339.36 45.05 405.01 20.2 482.135c20.36-24.62 40.988-48.203 61.905-70.817 44.7-67.485 89.567-147.11 148.856-170.418-29.61 30.708-63.36 75.164-98.25 118.145 40.99-40.437 83.09-77.46 126.415-111.512 61.598 70.49 110.757 149.38 152.145 235.873-6.738-44.794-16.796-87.384-30.03-127.666l46.444 65.53s-26.037-72.69-43.66-101.987c40.76 55.91 78.208 114.428 112.328 175.205-18.674-89.454-50.512-169.772-98.893-238.224 34.906 34.69 68.637 71.1 100.93 109.045C465.048 288.827 423.58 221.82 372.214 167c40.224-25.887 81.48-49.73 123.863-71.783-32.025 5.56-62.49 12.92-92.006 21.934 21.836-16.173 44.41-32.124 67.024-47.523-37.987 11.91-74.633 25.775-109.067 41.433 42.668-27.673 86.32-53.668 131.004-78.602h-.003c-67.47 18.055-130.83 42.19-188.998 73.548-56.294-41.79-122.01-71.787-198.663-87.68z"></path>
              </svg>
            </button>

            <ul className="mt-3 space-y-2 text-gray-900">
              <li>
                <Link
                  href="/"
                  className={`block font-semibold py-3 px-2 text-gray-800 bg-gray-300 hover:text-orange-600
               relative after:content-[''] after:absolute after:bottom-2 after:left-2
               after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
               after:scale-x-0 hover:after:scale-x-100 after:origin-left
               after:transition-transform after:duration-300
               rounded-md transition-all duration-150 hover:bg-gray-300/90 ${
                  isActive("/")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-gray-900 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/finance"
                  className={`block font-semibold py-3 px-2 text-gray-800 bg-gray-300 hover:text-orange-600
               relative after:content-[''] after:absolute after:bottom-2 after:left-2
               after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
               after:scale-x-0 hover:after:scale-x-100 after:origin-left
               after:transition-transform after:duration-300
               rounded-md transition-all duration-150 hover:bg-gray-300/90 ${
                  isActive("/finance")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-gray-900 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }`}
                >
                  Financial Status
                </Link>
              </li>
              <li>
                <Link
                  href="/contracts"
                  className={`block font-semibold py-3 px-2 text-gray-800 bg-gray-300 hover:text-orange-600
               relative after:content-[''] after:absolute after:bottom-2 after:left-2
               after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
               after:scale-x-0 hover:after:scale-x-100 after:origin-left
               after:transition-transform after:duration-300
               rounded-md transition-all duration-150 hover:bg-gray-300/90 ${
                  isActive("/contracts")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-gray-900 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }`}
                >
                  Patners
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className={`block font-semibold py-3 px-2 text-gray-800 bg-gray-300 hover:text-orange-600
               relative after:content-[''] after:absolute after:bottom-2 after:left-2
               after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
               after:scale-x-0 hover:after:scale-x-100 after:origin-left
               after:transition-transform after:duration-300
               rounded-md transition-all duration-150 hover:bg-gray-300/90 ${
                  isActive("/safety")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-gray-900 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }`}
                >
                  Safety
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center mx-auto ">
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              href="/"
              className={`font-semibold relative text-lg px-3 py-2 rounded-md transition-colors after:absolute after:bottom-0 after:left-2
                after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
                after:transition-transform after:duration-300
                ${
                  isActive("/")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-blue-700 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }
              `}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/finance"
              className={`font-semibold relative text-lg px-3 py-2 rounded-md transition-colors after:absolute after:bottom-0 after:left-2
                after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
                after:transition-transform after:duration-300
                ${
                  isActive("/finance")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-blue-700 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }
              `}
            >
              Financial Status
            </Link>
          </li>
          <li>
            <Link
              href="/contracts"
              className={`font-semibold relative text-lg px-3 py-2 rounded-md transition-colors after:absolute after:bottom-0 after:left-2
                after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
                after:transition-transform after:duration-300
                ${
                  isActive("/contracts")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-blue-700 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }
              `}
            >
              Partners
            </Link>
          </li>
          <li>
            <Link
              href="/safety"
              className={` font-semibold relative text-lg px-3 py-2 rounded-md transition-colors after:absolute after:bottom-0 after:left-2
                after:w-[calc(100%-1rem)] after:h-0.5 after:bg-orange-500
                after:transition-transform after:duration-300
                ${
                  isActive("/safety")
                    ? "text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                    : "text-blue-700 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
                }
              `}
            >
              Safety
            </Link>
          </li>
        </ul>
      </div>
      <div className=" mr-7 hidden lg:block">
        <ViewCount />
        {/* </button> */}
        {/* </a> */}
      </div>
    </div>
  );
};

export default Nav;
