import React, { useEffect, useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Carrer paths"
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>{
            course.tag===value;
        })
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"}/>
        </div>
        <p className='text-center text-gray-400 text-[16px] mt-3 '>
            Learn to build anything you can imagine
        </p>
        <div className='mt-5 flex flex-row bg-blue-800 rounded-full mb-5 border-blue-100 px-2 py-2'>
            {
                tabsName.map((element,index)=>{
                    return (
                        <div key={index} className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-blue-950 text-white font-medium" :"text-gray-400 "} rounded-full transition-all duration-200 cursor-pointer hover:bg-blue-900 hover:text-blue-50 px-7 py-2` } onClick={()=>setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:h-[150px]'></div>

        <div className='absolute flex flex-row justify-center gap-10 w-[100%] -mt-36 left-0'>
            {
                courses.map((element,index)=>{
                    return (
                        <CourseCard 
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore