import { Link } from '@inertiajs/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

import logo from '@/assets/svg/logo.svg';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Beranda', href: '' },
        { name: 'Cari Klinik', href: 'cari-klinik' },
        { name: 'Untuk Klinik', href: 'untuk-klinik' },
        { name: 'Tentang Kami', href: 'tentang-kami' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between sm:h-16 lg:grid lg:h-16 lg:grid-cols-3">
                        {/* Left - Logo */}
                        <div className="flex items-center">
                            <Link href="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="h-7 w-auto sm:h-8 lg:h-10"
                                />
                            </Link>
                        </div>

                        {/* Center - Navigation (hidden on mobile) */}
                        <ul className="hidden items-center justify-center gap-4 text-sm font-medium text-gray-700 lg:flex xl:gap-6">
                            {menuItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="cursor-pointer whitespace-nowrap transition hover:text-emerald-600"
                                >
                                    <Link href={`/${item.href}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Right - Buttons + Hamburger */}
                        <div className="flex items-center gap-2 sm:gap-3 lg:justify-end">
                            <Link
                                href="/kontak-kami"
                                className="hidden items-center rounded-full border border-emerald-600 px-3 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 lg:flex lg:px-4 lg:py-2"
                            >
                                Daftarkan Klinik
                            </Link>
                            <Link
                                href="/login"
                                className="hidden items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700 sm:flex sm:px-4 sm:py-2"
                            >
                                Masuk
                                <ArrowUpRight size={16} />
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="rounded-lg p-1.5 text-gray-700 transition hover:bg-gray-100 sm:p-2 lg:hidden"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                                ) : (
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-14 right-0 left-0 z-40 origin-top transform transition-all duration-200 ease-out sm:top-16 lg:hidden ${
                    isMenuOpen
                        ? 'scale-y-100 opacity-100'
                        : 'pointer-events-none scale-y-95 opacity-0'
                }`}
            >
                <div className="flex flex-col items-end border-t border-gray-200 bg-white px-4 py-4 text-end shadow-xl sm:px-6">
                    <ul className="space-y-1">
                        {menuItems.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={`/${item.href}`}
                                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-emerald-600 sm:py-3"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Buttons */}
                    <div className="mt-4 flex items-center gap-2 sm:hidden">
                        <Link
                            href="/kontak-kami"
                            className="flex w-fit items-center justify-center rounded-full border border-emerald-600 px-4 py-1.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Daftarkan Klinik
                        </Link>
                        <Link
                            href="/login"
                            className="flex w-fit items-center justify-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Masuk
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
