"use client";

import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface HighlightSlide {
    title: string;
    description: string;
    bgColor?: string;
}

const slides: HighlightSlide[] = [
    {
        title: "ดีไซน์ใหม่พร้อม Liquid Glass ทั้งสวยงาม",
        description: "เพลิดเพลิน และรู้สึกคุ้นเคยในทันที",
        bgColor: "bg-white",
    },
    {
        title: "ประสบการณ์การขับขี่ที่ไร้รอยต่อ",
        description: "เทคโนโลยีที่ทำให้คุณสะดวกสบาย",
        bgColor: "bg-white",
    },
    {
        title: "ความปลอดภัยระดับสูงสุด",
        description: "ปกป้องคุณและครอบครัวทุกการเดินทาง",
        bgColor: "bg-white",
    },
];

export default function Highlights() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="w-full min-h-screen bg-neutral-50 py-20 px-6 flex flex-col justify-center">
            {/* Header */}
            <div className="max-w-[90rem] mx-auto w-full mb-12 pl-4">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-400">
                    ดูไฮไลท์ต่างๆ
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="max-w-[90rem] mx-auto w-full relative">
                <div className="flex gap-8 overflow-visible">
                    {/* Main Slide */}
                    <div
                        className="flex-shrink-0 w-full lg:w-[85%] bg-blue-50/50 rounded-[48px] border-[3px] border-blue-500 p-10 lg:p-0 min-h-[600px] lg:h-[700px] flex flex-col lg:flex-row items-center overflow-hidden relative"
                    >
                        {/* Text Content */}
                        <div className="flex-1 lg:max-w-[40%] flex flex-col justify-center px-8 lg:pl-20 z-10">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-800 leading-relaxed mb-4">
                                {slides[currentSlide].title}
                            </h3>
                            <p className="text-2xl md:text-3xl text-neutral-500 font-light">
                                {slides[currentSlide].description}
                            </p>
                        </div>

                        {/* Device Mockup - Tablet Landscape */}
                        <div className="flex-1 w-full h-full relative flex items-center justify-end lg:-mr-24 mt-10 lg:mt-0">
                            <div className="relative w-[800px] h-[600px] bg-black rounded-[42px] shadow-2xl border-[14px] border-black overflow-hidden transform scale-90 lg:scale-100 origin-right">
                                {/* Screen Content */}
                                <Image
                                    src="/mockup.png"
                                    alt="Device Mockup"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Side Peek Slide (Next Item) */}
                    <div className="hidden lg:block w-[15%] bg-gray-100 rounded-[48px] border-2 border-transparent opacity-50 scale-95 origin-left">
                        {/* Placeholder for next slide peek */}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                    <ChevronLeft className="w-8 h-8 text-neutral-700" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                    <ChevronRight className="w-8 h-8 text-neutral-700" />
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center gap-8 mt-20">
                {/* Play Button */}
                <button className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors">
                    <Play className="w-6 h-6 text-neutral-800 fill-neutral-800 ml-0.5" />
                </button>

                {/* Dots Navigation */}
                <div className="flex items-center gap-4 bg-gray-100 rounded-full px-8 py-5 shadow-sm">
                    <div className="w-12 h-2 bg-neutral-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
