import React from 'react'
import { BiUpvote } from 'react-icons/bi'

const Contestants = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-center text-[48px] font-[600px]">Contestants</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 mx-auto">
        <Contestant />
        <Contestant />
      </div>
    </div>
  )
}

const Contestant = () => {
  return (
    <div className="flex justify-start items-center space-x-2 md:space-x-8 mt-5 md:mx-auto">
      <div className="w-[187px] sm:w-[324px] h-[229px] sm:h-[180px] rounded-[24px] overflow-hidden">
        <img className="w-full h-full object-cover" src="../assets/images/Rectangle 4.png" alt="" />
      </div>

      <div
        className="bg-[#151515] h-[229px] w-[186px] sm:w-[253px] sm:h-fit rounded-[24px]
        space-y-2 flex justify-center items-center flex-col pt-2 pb-2 px-3"
      >
        <h1 className="text-[16px] sm:text-[20px] font-[600px]">Gospel Darlington</h1>

        <div
          className="flex items-center justify-center w-full
          rounded-[10px] space-x-2"
        >
          <div className="w-[32px] h-[32px] rounded-full bg-[#2C2C2C]"></div>
          <p className="text-[14px] font-[500px]">0x5cC...9293</p>
        </div>

        <button className="w-[158px] sm:w-[213px] h-[48px] rounded-[30.5px] bg-[#1B5CFE]">
          Vote
        </button>

        <div className="w-[86px] h-[32px] flex items-center justify-center gap-3">
          <div className="w-[32px] h-[32px] rounded-[9px] py-[8px] px-[9px] bg-[#0E1933]">
            <BiUpvote size={20} className="text-[#1B5CFE]" />
          </div>
          <p className="text-[14px] font-[600px]">1 vote</p>
        </div>
      </div>
    </div>
  )
}

export default Contestants
