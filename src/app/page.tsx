"use client";

import Image from "next/image";
import Head from "next/head";
import TopBackground from './images/student_typing.jpg';
import CodeImage from './images/code.jpg'
import React, { CSSProperties, useState } from "react";
import DataStructor from './images/Data-Structure-and-Algorithm.jpg';
import ModernWebsite from './images/modern-websites-design-example-ptect.jpg';
import Training from './images/wronski-1.png';
import axios from 'axios';
import Navbar from "./ui/navbar";
import AboutUs from "./ui/aboutus";


export default function Home() {
  var topSectionStyle: CSSProperties = {
    backgroundImage: `url(${TopBackground.src})`,

  }
  const [isSumbitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

  };
  async function handleSubmit(event: {
    [x: string]: any; preventDefault: () => void;
  }) {

    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const subject = (document.getElementById("subject") as HTMLInputElement)?.value;;
    const message = (document.getElementById("message") as HTMLInputElement)?.value;;

    const formData = {
      email,
      subject,
      message,
    };

    event.preventDefault();
    console.log("Submitting form with data:", formData);
    setIsSubmitting(true);
    try {

      console.log(process.env.API_LOCATION)
      const response = await axios.post("https://cs-tutoring-mfiz.vercel.app/api/emailer", {
        body: JSON.stringify(formData)
      })
      if (response.status === 200) {
        (document.getElementById("email") as HTMLInputElement).value = "";
        (document.getElementById("subject") as HTMLInputElement).value = "";
        (document.getElementById("message") as HTMLInputElement).value = "";

      }



    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };


  return (
    <div>
      <Head >

        <title>CS Tutoring at SIUE</title>
        <meta name="description" content="Personalized Computer Science Tutoring for SIUE Students" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      
      
      <main className="">
        <div style={topSectionStyle} className="bg-fixed bg-contain md:h-96 md:bg-cover grid place-content-center">
          <h2 className="pb-4 pt-4 md:text-2xl text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" >Personalized Tech Solutions</h2>
          <a href="#contact" className="pb-5 md:pb-0 grid place-content-center">
            <button className="p-0 m-0 self-center snap-center origin-center place-self-center" style={{ padding: '1rem', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
              Contact Us
            </button>
          </a>
        </div>

        <div className="text-center pb-3" id="service" >
          <h1 className="pt-5 pb-5 text-2xl">
            Services
          </h1>
          <div className="flex flex-row flex-wrap w-full justify-center md:space-x-8 space-y-5 xl:space-y-0 ">


            <div className="mt-5 xl:mt-0 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg h-48 w-full" src={CodeImage.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AI-Powered Chatbot Development</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Bring your business into the future with custom AI-powered chatbots. Enhance customer engagement, streamline support, and automate routine queries with smart, responsive bots tailored to your specific needs. Whether it’s for websites, messaging platforms, or apps, we’ve got you covered.

</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Jump Forward
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg h-48 w-full" src={Training.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Technical Consulting & Training</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Unlock your team&apos;s potential with personalized training in programming, algorithms, and tech tools. Whether you&apos;re an individual preparing for technical interviews or a team improving workflows, our consulting services are tailored to your unique challenges.</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Get Started
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>


            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg h-48 w-full" src={ModernWebsite.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Custom Web Development & Optimization</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Create stunning, high-performance websites and web applications tailored to your business goals. Whether you&apos;re starting from scratch or need to optimize your existing site, we offer comprehensive services in front-end and back-end development using React, Next.js, and other modern tools.</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Start Building
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div id="aboutUs" className="scroll-mt-28">
          <div>

          </div>
          <AboutUs></AboutUs>
        </div>

        <div id="contact">
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl"></p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"

                  >Your email</label>
                  <input type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="Email@email.com" required


                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                  <input

                    type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                  <textarea
                    id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" onClick={(handleSubmit)} disabled={isSumbitting} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Send message</button>
              </form>
            </div>
          </section>
        </div>


      </main>
    </div>
  );
}
