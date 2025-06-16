import React from 'react'
import { BsTwitterX } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io";
import { TbBrandMeta } from "react-icons/tb";



const TopBar = () => {
    return (
        <div className='bg-orangina text-white font-normal text-sm '>

            <div className='container mx-auto flex justify-between items-center py-4 px-8 '>
                {/**Social Media */}
                <div className='hidden md:flex space-x-4 items-center'>
                    <a href="/brand" className='hover:text-gray-300'  > <TbBrandMeta className='h-5 w-5' /> </a>
                    <a href="/instagram " className='hover:text-gray-300'> <IoLogoInstagram className='h-5 w-5' /> </a>
                    <a href="/twitter" className='hover:text-gray-300' > <BsTwitterX className='h-4 w-4' /> </a>
                </div>
                {/**Message */}
                <div className='text-center flex-grow'>
                    <span>We ship worldwide - Fast and reliable shipping</span>
                </div>
                {/**Phone number */}
                <div className='hidden md:block'>
                    <a href="tel:+1234567890" className='hover:text-gray-300'>+1 (234) 567-890 </a>
                </div>
            </div>


        </div>
    )
}

export default TopBar