import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { MdOutlineAccountTree } from "react-icons/md";

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {

  return (
    <div className={`w-64 h-60 ${currentCard===cardData.heading ? "bg-white text-black shadow-yellow-400 shadow-xl":"bg-gray-800 text-white"} flex flex-col justify-between p-2 cursor-pointer`} onClick={(e)=>{setCurrentCard(cardData.heading)}}>
        <div className='p-2'>
        <h1 className='font-bold mt-4'>{cardData.heading}</h1>
        <p className='mt-4 text-[13px]'>{cardData.description}</p>
        </div>
        <div className='flex flex-row justify-between p-2 '>
            <div className='flex flex-row items-center gap-2'>
            <FaUserFriends />
            <p>{cardData.level}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
            <MdOutlineAccountTree />
            <p>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard