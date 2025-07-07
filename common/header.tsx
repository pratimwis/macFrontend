// components/Header.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { checkAuth } from '@/utils/checkAuth';
import { useRouter } from 'next/navigation';

const navItems = ['Solutions', 'Community', 'Pricing', 'Company'];

const Header: React.FC<{ onSignOut?: () => void }> = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const onSignOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();

            if (data.success) {
                alert("Signed out successfully!");
                router.push("/signIn");
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await checkAuth();
            setUserData(userData);
        };
        fetchUserData();
    }, []);

    return (
        <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative">
            {/* Left section */}
            <div className="flex items-center gap-6">
                {/* Hamburger */}
                <button
                    className="block lg:hidden text-gray-950 text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <Menu size={24} />
                </button>

                {/* Logo SVG */}
                <svg
                    width="50"
                    height="39"
                    viewBox="0 0 50 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-gray-800"
                >
                    <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
                    <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
                </svg>
                <span className='text-2xl font-bold'>WIS EMS Portal</span>

                {/* Desktop Nav Links */}
                {navItems.map((item) => (
                    <a
                        key={item}
                        href="#"
                        rel="nofollow"
                        className="hidden lg:block h-[30px] overflow-hidden font-medium"
                    >
                        <div>
                            <span className="flex items-center h-[30px] text-gray-500">{item}</span>
                            <span className="flex items-center h-[30px] text-indigo-600">{item}</span>
                        </div>
                    </a>
                ))}
            </div>

            {/* Right buttons */}
            <div className="flex items-center gap-4">
                {userData ? (
                    <button
                        onClick={onSignOut}
                        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                        <a
                            href="/signIn"
                            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
                        >
                            Sign in
                        </a>
                        <a
                            href="/signUp"
                            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
                        >
                            Sign up
                        </a>
                    </>
                )}
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'scale-y-100' : 'scale-y-0'
                    }`}
                style={{ transformOrigin: 'top' }}
            >
                {navItems.map((item) => (
                    <a
                        key={item}
                        href="#"
                        rel="nofollow"
                        className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
                    >
                        <span>
                            <ChevronRight className="h-[30px] text-gray-950" />
                        </span>
                        <div>
                            <span className="flex items-center h-[30px] text-gray-500">{item}</span>
                            <span className="flex items-center h-[30px] text-indigo-600">{item}</span>
                        </div>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Header;
