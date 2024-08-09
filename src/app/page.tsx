import Image from "next/image";
import Head from "next/head";
import TopBackground from './images/student_typing.jpg';
import CodeImage from './images/code.jpg'
import { CSSProperties } from "react";
import DataStructor from './images/Data-Structure-and-Algorithm.jpg'
import ModernWebsite from './images/modern-websites-design-example-ptect.jpg'

export default function Home() {
  var topSectionStyle: CSSProperties = {
    backgroundImage: `url(${TopBackground.src})`,

  }

  async function handleSubmit(event: { preventDefault: () => void; target: HTMLFormElement | undefined; }){

    event.preventDefault();
    const formData = new FormData(event.target)
    try {

      const response = await fetch('/api/contact', {
        method: 'post',
        body: formData,
      });

      if (!response.ok) {
        console.log("falling over")
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData['message'])

      alert('Message successfully sent');
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  };
  

  return (
    <div>
      <Head >

        <title>CS Tutoring at SIUE</title>
        <meta name="description" content="Personalized Computer Science Tutoring for SIUE Students" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <header className="bg-black grid place-content-center h-14">
        <h1 className="text-center">Computer Science Tutoring at SIUE</h1>
      </header>

      <main className="">
        <div style={topSectionStyle} className="bg-fixed bg-contain md:h-96 md:bg-cover grid place-content-center">
          <h2 className="pb-4 pt-4 md:text-2xl text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" >Personalized Computer Science Tutoring for SIUE Students</h2>
          <a href="#contact" className="pb-5 md:pb-0 grid place-content-center">
          <button className="p-0 m-0 self-center snap-center origin-center place-self-center" style={{ padding: '1rem', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Contact Us
          </button>
          </a>
        </div>

        <div className="text-center pb-3" >
          <h1 className="pt-5 pb-5 text-2xl">
            Services
          </h1>
          <div className="flex flex-row flex-wrap w-full justify-center md:space-x-8 space-y-5 xl:space-y-0 ">


            <div className="mt-5 xl:mt-0 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg" src={CodeImage.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Master Programming Basics</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Struggling with loops, conditionals, or functions? Get personalized help to understand the core concepts of programming in languages like Python, Java, and C#.</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Let's Learn
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg h-min" src={DataStructor.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ace Algorithms & Data Structures</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Need to improve your problem-solving skills? Learn how to approach and solve complex problems using key data structures and algorithms essential for technical interviews and coursework.</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Get Started
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>


            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
              <a href="#contact">
                <img className="rounded-t-lg" src={ModernWebsite.src} alt="" />
              </a>
              <div className="p-5">
                <a href="#contact">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Build and Deploy Web Projects</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Want to create your own website or web application? Get hands-on guidance in front-end and back-end development, covering HTML, CSS, JavaScript, React, and more.</p>
                <a href="#contact" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Start Building
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div id = "contact">
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
              <form action="#" className="space-y-8">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                  <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                  <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-700 sm:w-fit hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Send message</button>
              </form>
            </div>
          </section>
        </div>


      </main>
    </div>
  );
}
