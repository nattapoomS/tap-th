"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900">
            {/* Logo or Brand */}
            <div className="mb-8">
                <h1 className="text-6xl font-bold text-white font-kanit">
                    TAP
                </h1>
            </div>

            {/* Animated Spinner - CSS only, no GSAP */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
            </div>

            {/* Loading Text */}
            <p className="mt-8 text-white/60 text-sm font-kanit animate-pulse">
                กำลังโหลด...
            </p>
        </div>
    );
}