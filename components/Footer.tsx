import React from 'react'
import { FaGithub, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      className="w-full h-[192px] py-[37px]
      rounded-t-[24px] flex flex-col items-center justify-center
      bg-white bg-opacity-20 px-5"
    >
      <div className="flex justify-center items-center space-x-4">
        <FaLinkedinIn size={27} />
        <FaYoutube size={27} />
        <FaGithub size={27} />
        <FaTwitter size={27} />
      </div>

      <hr className="w-full sm:w-[450px] border-t border-gray-400 mt-3" />

      <p className="text-sm font-[500px] mt-5">©️{new Date().getFullYear()}</p>
      <p className="text-sm font-[500px]">With Love ❤️ by Daltonic</p>
    </footer>
  )
}

export default Footer
