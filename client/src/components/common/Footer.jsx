import React from "react";
import { Link } from "react-router-dom";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 px-6 sm:px-12 md:px-20 xl:px-32 bg-white mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 py-16">
        {/* Left Section  */}
        <div className="md:col-span-2 flex flex-col">
          <Link to="/" className="inline-block mb-6">
            <img
              src={assets.logo}
              alt="QuickAI Logo"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-500 text-[14px] leading-relaxed max-w-sm">
            Experience the power of AI with QuickAI.{" "}
            <br className="hidden sm:block" />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        {/* Middle Section  */}
        <div className="md:col-span-1 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-5 text-[15px]">Company</h3>
          <ul className="flex flex-col gap-3.5 text-[14px] text-gray-500">
            <li>
              <Link to="/" className="hover:text-[#5044E5] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#5044E5] transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#5044E5] transition-colors">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#5044E5] transition-colors">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section  */}
        <div className="md:col-span-1 lg:col-span-2 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-5 text-[15px]">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-500 text-[14px] mb-5">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="grow px-4 py-2.5 border border-gray-200 rounded-[5px] focus:outline-none focus:border-[#5044E5] focus:ring-1 focus:ring-[#5044E5] text-[14px] text-gray-800 placeholder-gray-400 bg-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#5044E5] text-white text-[14px] font-medium rounded-[5px] hover:bg-[#4338ca] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center py-6 border-t border-gray-200 text-[14px] text-gray-500">
        Copyright {new Date().getFullYear()} © Quickai. All Right Reserved.
        Developed By{" "}
        <a href="https://www.facebook.com/prot1k.404" target="_blank">
          Protik Datta
        </a>
      </div>
    </footer>
  );
};

export default Footer;
