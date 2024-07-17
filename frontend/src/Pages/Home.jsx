import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/Core/HomePage/HighlightText";
import CTAButton from "../components/Core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/Core/HomePage/CodeBlocks";
import TimeLineSection from "../components/Core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/Core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/Core/HomePage/InstructorSection";
import ExploreMore from "../components/Core/HomePage/ExploreMore";
const Home = () => {
  return (
    <div className="m-auto bg-blue-950 w-[100vw]">
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-[80%] items-center text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-gray-950 font-bold text-blue-400 transition-all duration-200 hover:scale-95">
            <div className="flex flex-row items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-black gap-2">
              <p>Join Our Team of Expert Instructors</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-6">
          Unlock Your Potential with Essential
          <HighlightText text={" Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-slate-400">
          With our online coding courses, you have the flexibility to learn at
          your own pace, from anywhere in the world. Gain access to a wealth of
          resources, including interactive projects, quizzes, and personalized
          feedback from experienced instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="shadow-blue-200 mx-3 my-12">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unleash Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are crafted and led by industry experts with years of coding experience who are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yorself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n/head>\nbody>\nh1><a href="/">Header</a>/h1>\nnav>\n<a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n/nav>`}
          />
        </div>

        {/* Code Section 2*/}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={" coding instantly"} />
              </div>
            }
            subheading={
              "Why wait? Dive right in and experience our hands-on learning environment where you'll start writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Try it Yorself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n/head>\nbody>\nh1><a href="/">Header</a>/h1>\nnav>\n<a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n/nav>`}
          />
        </div>

        <ExploreMore/>
      </div>

      {/* Section 2 */}

      <div className="bg-gray-50 text-blue-950">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto ">
            <div className="h-[120px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-2">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[80%] max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={" Job that is in demand "} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern Studium sets its own standards. Today, being a
                competitive specialist requires more than just professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}

      <div className="w-[80%] mx-auto max-w-maxContent flex flex-col items-center justify-between gap-3 bg-blue-950 text-white">
        <InstructorSection/>

        <h2 className="text-center text-4xl font-semibold mt-10">Review from other Learners</h2>
      </div>
    </div>
  );
};

export default Home;
