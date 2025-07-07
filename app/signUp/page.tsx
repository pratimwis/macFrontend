'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: form.email,
                        fullName: form.name,
                        password: form.password,
                    }),
                }
            );

            const data = await response.json();
            if (!data?.success) {
                window.alert(data?.message || "Something went wrong");
            } else {
                alert('Signup successful!');
                router.push("/")
            }
        } catch (error: any) {
            alert(error.message || "Signup failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: 'linear-gradient(to bottom right, #EEAECA, #94BBE9)',
            }}>
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex overflow-hidden">
                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-indigo-700 mb-2 text-center">Create an Account</h2>
                    <p className="text-gray-500 mb-8 text-center">Sign up to get started with our platform</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                                placeholder="********"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 mt-8">
                        Already have an account?{' '}
                        <a href="/signIn" className="text-indigo-600 font-semibold hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
                {/* Right: Image */}
                <div className="hidden md:flex w-1/2 bg-indigo-100 items-center justify-center">
                    <img
                        src="http://103.211.218.245/assets/img/wis_logo.png"
                        alt="Sign up illustration"
                        className="object-cover w-[400px] h-[300px]"
                    />
                </div>
            </div>
        </div>
    )
}