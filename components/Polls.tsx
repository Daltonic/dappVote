import { useRouter } from 'next/router'
import React from 'react'

const Polls = () => {
  return (
    <div>
      <h1 className="text-center text-[34px] font-[550px] mb-5">Start Voting</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 mx-auto">
        <Poll />
        <Poll />
        <Poll />
        <Poll />
      </div>
    </div>
  )
}
const Poll = () => {
  const navigate = useRouter()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
      <div
        className="h-[392px] gap-[10px] md:w-[580px] md:h-[280px]
            grid grid-cols-1 md:flex justify-start w-full"
      >
        <div className="w-full flex justify-between space-y-0 sm:space-y-2 sm:flex-col md:w-[217px]">
          <img
            src="./assets/images/Rectangle 4.png"
            alt=""
            className="w-[160px] md:w-full
                    h-[165px] rounded-[20px] object-cover"
          />
          <img
            src="./assets/images/Rectangle 5.png"
            alt=""
            className="w-[160px] md:w-full
                    h-[165px] rounded-[20px] object-cover"
          />
        </div>

        <div
          className="w-full h-[257px] gap-[14px] rounded-[24px] space-y-5
                md:w-[352px] md:h-[280px] bg-[#151515] px-[15px] py-[18px] md:px-[22px]"
        >
          <h1 className="text-[18px] font-[600px]">Beauty Pagentry</h1>
          <p className="text-[14px] font-[400px]">
            A beauty pageantry is a competition that has traditionally focused on judging and
            ranking the physical...
          </p>

          <div className="flex justify-between items-center gap-[8px]">
            <div
              className="h-[26px] bg-[#2c2c2c] rounded-full py-[4px] px-[12px]
                text-[12px] font-[400px]"
            >
              Wed, Nov 23, 2023
            </div>

            <div className="h-[32px] w-[119px] gap-[5px] flex items-center">
              <div className="h-[32px] w-[32px] rounded-full bg-[#2c2c2c]"></div>
              <p className="text-[12px] font-[400px]">0x5cC...9293</p>
            </div>
          </div>

          <button
            onClick={() => navigate.push('/polls/1')}
            className="h-[44px] w-full bg-[#1B5CFE] rounded-full"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Polls
