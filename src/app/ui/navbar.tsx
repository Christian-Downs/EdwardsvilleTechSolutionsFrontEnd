"use client";

import Image from 'next/image';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

const initialNavigation = [
    { name: 'Home', href: '#top', current: true },
    { name: 'Services', href: '#service', current: false },
    { name: 'About Us', href: '#aboutUs', current: false },
    { name: 'FAQ', href: '#faq', current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [navItems, setNavItems] = useState(initialNavigation);

    function handleClick(selected: string) {
        const updatedNav = navItems.map((item) =>
            item.name === selected
                ? { ...item, current: true }
                : { ...item, current: false }
        );
        setNavItems(updatedNav);
    }

    return (
        <Disclosure as="nav" className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <Image
                                alt="Edwardsville Tech Solutions"
                                src="/icon.png"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex items-center space-x-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        onClick={() => handleClick(item.name)}
                                        className={classNames(
                                            item.current ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600',
                                            'rounded-md px-3 py-2 text-sm font-medium transition',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    className="ml-4 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                                >
                                    Get a quote
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navItems.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            onClick={() => handleClick(item.name)}
                            className={classNames(
                                item.current ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    <a
                        href="#contact"
                        className="block rounded-md bg-emerald-600 px-3 py-2 text-center text-base font-semibold text-white"
                    >
                        Get a quote
                    </a>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
