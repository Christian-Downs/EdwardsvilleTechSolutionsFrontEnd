"use client";

import TopBackground from "./images/student_typing.jpg";
import CodeImage from "./images/code.jpg";
import Image from "next/image";
import React, { CSSProperties, useMemo, useState } from "react";
import ModernWebsite from "./images/modern-websites-design-example-ptect.jpg";
import Training from "./images/wronski-1.png";
import axios from "axios";
import AboutUs from "./ui/aboutus";


export default function Home() {
  var topSectionStyle: CSSProperties = {
    backgroundImage: `url(${TopBackground.src})`,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post("https://cs-tutoring-mfiz.vercel.app/api/emailer", {
        body: JSON.stringify(formValues),
      });

      if (response.status === 200) {
        setFormValues({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus("Thanks! We’ll reach out within 1 business day.");
      } else {
        setSubmitStatus("Something went wrong. Please try again shortly.");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      setSubmitStatus("Something went wrong. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = useMemo(
    () => [
      {
        title: "AI-Powered Chatbot Development",
        description:
          "Launch smart, on‑brand chatbots that reduce support load and increase conversions across web and messaging channels.",
        image: CodeImage.src,
        cta: "Build a bot",
      },
      {
        title: "Technical Consulting & Training",
        description:
          "Upskill teams with tailored workshops, code reviews, and roadmap guidance to ship faster with confidence.",
        image: Training.src,
        cta: "Plan a session",
      },
      {
        title: "Custom Web Development & Optimization",
        description:
          "Modern, SEO‑ready websites and apps built for speed, security, and measurable business outcomes.",
        image: ModernWebsite.src,
        cta: "Start a project",
      },
    ],
    []
  );

  const stats = [
    { label: "Average response time", value: "< 24 hrs" },
    { label: "Owner-led, local delivery", value: "100%" },
    { label: "Satisfaction guarantee", value: "Money-back" },
  ];

  const process = [
    {
      title: "Discover",
      description: "Align on goals, scope, and success metrics.",
    },
    {
      title: "Design",
      description: "Prototype, brand, and user experience crafted for clarity.",
    },
    {
      title: "Build",
      description: "Rapid, secure delivery with weekly progress updates.",
    },
    {
      title: "Launch & Grow",
      description: "Optimization, monitoring, and ongoing improvements.",
    },
  ];

  // const testimonials = [
  //   {
  //     name: "Kim M.",
  //     title: "Local Retail Owner",
  //     quote:
  //       "Edwardsville Tech Solutions modernized our site and doubled online inquiries in two months.",
  //   },
  //   {
  //     name: "Derek S.",
  //     title: "Healthcare Operations",
  //     quote:
  //       "Their automation cuts hours of manual work each week. Clear communication throughout.",
  //   },
  //   {
  //     name: "Priya R.",
  //     title: "Startup Founder",
  //     quote:
  //       "Fast, professional delivery and a product we’re proud to show investors.",
  //   },
  // ];

  const faqs = [
    {
      question: "How quickly can we get started?",
      answer:
        "Most projects kick off within one week after discovery and proposal approval.",
    },
    {
      question: "Do you support existing websites?",
      answer:
        "Yes. We optimize, redesign, and maintain existing sites with performance and SEO audits.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We work with local businesses, healthcare, retail, startups, and professional services.",
    },
    {
      question: "Is ongoing support available?",
      answer:
        "Absolutely. We offer monthly retainers for enhancements, monitoring, and strategy.",
    },
  ];


  return (
    <div className="bg-white text-slate-900" id="top">
      <main>
        <section style={topSectionStyle} className="relative isolate bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-200">
                  Edwardsville Tech Solutions
                </p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                  Launch-ready digital solutions that grow your business.
                </h1>
                <p className="text-lg text-slate-200">
                  We design, build, and optimize modern websites, AI tools, and automation systems so
                  your team can focus on what matters most.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                  >
                    Book a free consult
                  </a>
                  <a
                    href="#service"
                    className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
                  >
                    Explore services
                  </a>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <div className="space-y-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Fast start</p>
                  <h2 className="text-2xl font-semibold">Get a tailored plan in 48 hours</h2>
                  <ul className="space-y-3 text-sm text-slate-100">
                    <li>• Strategy + scope tailored to your goals</li>
                    <li>• Fixed timeline and transparent pricing</li>
                    <li>• Local team with rapid response times</li>
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900"
                  >
                    Start a project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-6 text-center sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="service" className="scroll-mt-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Services</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Solutions built for clarity and growth
              </h2>
              <p className="mt-4 text-base text-slate-600">
                From AI automation to full-scale web builds, we partner with you to deliver measurable
                results and long-term reliability.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{service.description}</p>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600"
                    >
                      {service.cta} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Why us</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Local expertise with enterprise-grade delivery
                </h2>
                <p className="mt-4 text-base text-slate-300">
                  We combine local partnership with a modern engineering stack to keep your business
                  competitive and secure.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  "Dedicated project manager",
                  "SEO + performance optimization",
                  "Security-first architecture",
                  "Transparent weekly updates",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="aboutUs" className="scroll-mt-28 bg-white">
          <AboutUs />
        </div>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Our process</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                A clear path from idea to launch
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {process.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-emerald-600">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Testimonials</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Clients trust us to deliver
              </h2>
            </div>
             <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="text-sm text-slate-600">“{testimonial.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="bg-emerald-600 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">Ready to launch a better digital presence?</h2>
                <p className="mt-3 text-base text-emerald-100">
                  Share your goals and we’ll send a tailored plan, timeline, and estimate.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href="#contact"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700"
                >
                  Schedule a call
                </a>
                <a
                  href="mailto:EdwardsvilleTechSolutions@gmail.com"
                  className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Answers, upfront</h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Let’s build something great</h2>
                <p className="mt-4 text-base text-slate-600">
                  Tell us about your goals and we’ll respond quickly with next steps.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  <p>📍 Edwardsville, IL</p>
                  <p>📧 EdwardsvilleTechSolutions@gmail.com</p>
                  <p>📞 (518) 879-6827</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formValues.message}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
                {submitStatus && (
                  <p className="text-sm text-slate-600" aria-live="polite">
                    {submitStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">Edwardsville Tech Solutions</p>
                <p className="mt-2 text-sm text-slate-600">
                  Local tech partners delivering modern web, AI, and automation solutions.
                </p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Quick links</p>
                <ul className="mt-3 space-y-2">
                  <li><a href="#service" className="hover:text-emerald-600">Services</a></li>
                  <li><a href="#aboutUs" className="hover:text-emerald-600">About</a></li>
                  <li><a href="#faq" className="hover:text-emerald-600">FAQ</a></li>
                  <li><a href="#contact" className="hover:text-emerald-600">Contact</a></li>
                </ul>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Contact</p>
                <p className="mt-3">Edwardsville, IL</p>
                <p>EdwardsvilleTechSolutions@gmail.com</p>
                <p>(518) 879-6827</p>
              </div>
            </div>
            <p className="mt-10 text-xs text-slate-500">© 2026 Edwardsville Tech Solutions. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
