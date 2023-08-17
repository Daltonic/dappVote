import React from 'react'

const Navbar = () => {
    return (
        <nav className="h-[80px] flex justify-between items-center border border-gray-400 
            px-5 rounded-full">
            <p className="text-[20px] text-blue-800 sm:text-[24px]">
                Dapp<span className="text-white font-bold">Votes</span>
            </p>
            <button className="bg-[#1B5CFE] h-[48px] w-[130px]  sm:w-[148px] px-3 rounded-full text-sm font-bold">
                Connect wallet
            </button>
        </nav>
    )
}

export default Navbar