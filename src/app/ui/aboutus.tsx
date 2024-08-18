
import React, { CSSProperties, useState } from "react";


export default function AboutUs() {

    return (
        <div className="w-full max-w-7xl px-4 mx-auto sm:px-8 my-10 z-0">
            <blockquote className="relative grid items-center bg-white shadow-xl md:grid-cols-3 rounded-xl">

                <img className="hidden object-cover w-full h-full rounded-l-xl md:block" style={{ "clipPath": "polygon(0 0%, 100% 0%, 75% 100%, 0% 100%)" }} src="/me.jpg" alt={""} />

                <article className="relative p-6 md:p-8 md:col-span-2">
                    <svg className="absolute top-0 right-0 hidden w-24 h-24 -mt-12 -mr-5 text-primary-600 md:block" width="256"
                        height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M65.44 153.526V149.526H61.44H20.48C11.3675 149.526 4 142.163 4 133.105V51.4211C4 42.3628 11.3675 35 20.48 35H102.4C111.513 35 118.88 42.3628 118.88 51.4211V166.187C118.88 195.935 95.103 220.165 65.44 220.979V153.526ZM198.56 153.526V149.526H194.56H153.6C144.487 149.526 137.12 142.163 137.12 133.105V51.4211C137.12 42.3628 144.487 35 153.6 35H235.52C244.633 35 252 42.3628 252 51.4211V166.187C252 195.935 228.223 220.165 198.56 220.979V153.526Z"
                            stroke="currentColor" stroke-width="8"></path>
                    </svg>

                    <div className="space-y-8">
                        <p className="text-base sm:leading-relaxed md:text-2xl text-black">
                            <span className="text-center text-2xl to-black w-full font-bold">Hi, we&apos;re Edwardsville Tech Solutions.</span>
                            <br/> <br/>
                            We specialize in empowering businesses with tailored technology solutions that 
                            drive growth and efficiency. With extensive experience in software development,
                            web design, and IT consulting, our team is dedicated to delivering innovative 
                            and reliable services that meet the unique needs of each client.
                            <br/><br/>

                            Whether you&apos;re looking to enhance your digital presence, secure your data, 
                            or streamline your operations, Edwardsville Tech Solutions is here to provide the 
                            expertise and personalized support you need to succeed in today&apos;s competitive
                            landscape.
                            {/* <b>Hi, we&apos;re Edwardsville Tech Solutions.</b> <br /><br />
                            We&apos;re a dedicated team of technology professionals with a mission to empower businesses with innovative and reliable tech solutions. With years of experience in the industry and a passion for cutting-edge technology, we specialize in providing customized software, web development, cybersecurity, and IT consulting services to meet the unique needs of our clients.
                            <br /><br />
                            Our expertise spans across multiple technologies and platforms, including Python, Java, C++, React, and cloud solutions. Whether you&apos;re looking to build a robust web application, secure your digital assets, or optimize your IT infrastructure, we&apos;re here to provide the expert guidance and personalized service you need to succeed.
                            <br /><br />
                            We pride ourselves on being a trusted partner for our clients, delivering solutions that drive real results and help businesses thrive in today’s digital landscape. At Edwardsville Tech Solutions, your success is our priority.
                            {/* Hi, I&apos;m John. I&apos;m a 35-year-old software engineer with a passion for creating innovative solutions. 
                I graduated with a degree in Computer Science from a prestigious university and have been working in
                the tech industry for over a decade. Throughout my career, I have gained extensive experience in
                programming languages like Python, Java, and C++. I thrive in challenging environments and enjoy
                collaborating with teams to develop cutting-edge software applications. */}
                        </p>

                        <footer className="flex items-center space-x-4 md:space-x-0">
                            <img className="w-12 h-12 rounded-full md:hidden" src="/me.jpg" alt={""} />
                            {/* <span className="font-bold text-lg">John doe</span> */}
                        </footer>
                    </div>
                </article>
            </blockquote>
        </div>
    );

}

