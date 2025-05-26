"use client";

import { Globe, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-2 flex justify-center items-center z-50 space-y-1 space-x-4">
      <p className="text-xs sm:text-base lg:text-lg font-semibold tracking-wide">
        Developed by&nbsp;
        <span className="hover:underline transition">
         Prateek Singh, Anirban Mukherjee & Team
        </span>
      </p>

      {/* Icons container */}
      <div className="flex items-center space-x-3 mb-1">
        {/* LinkedIn */}
        {/* <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a> */}

        {/* Email */}
        {/* <a
          href=""
          className="hover:text-blue-400 transition"
          aria-label="Email"
        >
          <Mail size={20} />
        </a> */}

        {/* Portfolio */}
        {/* <a
          href=" "
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
          aria-label="Portfolio"
        >
          <Globe size={20} />
        </a> */}
      </div>
    </footer>
  );
}
