import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full h-[192px] py-[37px]
             rounded-t-[24px] 
             flex flex-col items-center justify-center
              bg-white bg-opacity-20 px-5">

            <div className="w-[210px] h-[24px] gap-[38px] flex ">
                <img src="./assets/images/icomoon-free_linkedin2.png" alt="" />
                <img src="./assets/images/Vector (1).png" alt="" />
                <img src="./assets/images/Vector (2).png" alt="" />
                <img src="./assets/images/Vector (3).png" alt="" />
            </div>

            <hr className="w-full sm:w-[450px] border-t border-gray-400 mt-3" />

            <p className="text-[16px] font-[500px] mt-5">©️ 2023</p>
            <p className="text-[16px] font-[500px]">With Love ❤️ by Daltonic</p>

        </footer>

    )
}

export default Footer
