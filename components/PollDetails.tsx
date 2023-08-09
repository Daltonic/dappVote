import React from 'react'

const PollDetails = () => {
    return (
        <div>
            <div className="w-full h-[240px] rounded-[24px]
            flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="./assets/images/united.png" alt=""/>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6
            mt-5 w-full md:max-w-[736px] mx-auto">
            <h1 className="text-[47px] font-[600px] text-center leading-none">US Midterm Election</h1>
            <p className="text-[16px] font-[500px] text-center">
                 A beauty pageantry is a competition
                that has traditionally focused on judging and ranking the physical...
            </p>

            <div className=" h-[136px] gap-[16px] flex flex-col items-center mt-4">
                <div className="h-[36px] py-[6px] px-[12px] rounded-full gap-[4px] border 
                border-gray-400 bg-white bg-opacity-20">
                    <p className="text-[14px] font-[500px] text-center md:text-[16px]">
                        Wed, Nov 23, 2023 - Fri, Dec 23, 2023
                    </p>
                </div>

                <div className="flex items-center justify-center w-[133px] h-[32px]
                 py-[20px] rounded-[10px] gap-[12px]">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#1B5CFE]"></div>
                    <p className="text-[14px] font-[500px]">0x5cC...9293</p>
                </div>

                <div className="h-[36px] gap-[4px] flex justify-center items-center">
                    <button className="py-[6px] px-[12px] 
                    border border-gray-400 bg-white bg-opacity-20 rounded-full text-[12px] md:text-[16px]">
                        1 Vote
                    </button>

                    <button className="py-[6px] px-[12px] 
                    border border-gray-400 bg-white bg-opacity-20 rounded-full text-[12px] md:text-[16px]">
                        2 contestants
                    </button>

                    <button className="py-[6px] px-[12px] 
                    border border-gray-400 bg-white bg-opacity-20 rounded-full 
                    text-[12px] md:text-[16px] gap-[8px] flex justify-center items-center">
                        <img src="./assets/images/fa6-solid_pencil.png" alt="" 
                        className="h-[16px] w-[16px]"/>
                        Edit poll
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PollDetails