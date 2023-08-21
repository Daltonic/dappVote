import { connectWallet, truncate } from '@/services/blockchain'
import { RootState } from '@/utils/types'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  return (
    <nav
      className="h-[80px] flex justify-between items-center border border-gray-400 
      px-5 rounded-full"
    >
      <Link href="/" className="text-[20px] text-blue-800 sm:text-[24px]">
        Dapp<span className="text-white font-bold">Votes</span>
      </Link>
      {wallet ? (
        <button
          className="h-[48px] w-[130px] 
          sm:w-[148px] px-3 rounded-full text-sm font-bold
          transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500"
        >
          {truncate({ text: wallet, startChars: 4, endChars: 4, maxLength: 11 })}
        </button>
      ) : (
        <button
          className="h-[48px] w-[130px] 
          sm:w-[148px] px-3 rounded-full text-sm font-bold
          transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500"
          onClick={connectWallet}
        >
          Connect wallet
        </button>
      )}
    </nav>
  )
}

export default Navbar
