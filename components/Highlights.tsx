"use client";

import groupPhoto from "@/app/img/Generated.png";
import groupPhoto2 from "@/app/img/Generated2.png";
import groupPhoto3 from "@/app/img/Generated3.png";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface HighlightSlide {
    title: string;
    description: string;
    image: string | StaticImageData;
}

const slides: HighlightSlide[] = [
    {
        title: "รถขุดไฮดรอลิกประสิทธิภาพสูง",
        description: "พลังขุดลึกสูงสุด 12 เมตร พร้อมระบบควบคุมที่แม่นยำ",
        image: groupPhoto,
    },
    {
        title: "รถตักล้อยางขนาดใหญ่",
        description: "ความจุบุ้งกี๋ 5 ลูกบาศก์เมตร ทำงานหนักได้ทุกสภาพพื้นที่",
        image: groupPhoto2,
    },
    {
        title: "เครนยกของหนักระดับอุตสาหกรรม",
        description: "รับน้ำหนักได้สูงสุด 500 ตัน พร้อมระบบความปลอดภัยมาตรฐานสากล",
        image: groupPhoto3,
    },
    {
        title: "รถบรรทุกดั๊มพ์ขนาดยักษ์",
        description: "บรรทุกได้ 100 ตัน เหมาะสำหรับงานเหมืองและก่อสร้างขนาดใหญ่",
        image: groupPhoto2,
    },
];

export default function Highlights() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Scroll to specific slide
    const scrollToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.scrollWidth / slides.length;
            container.scrollTo({
                left: cardWidth * index,
                behavior: "smooth",
            });
        }
        setCurrentSlide(index);
    };

    // Handle scroll event to update current slide
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.scrollWidth / slides.length;
            const newIndex = Math.round(container.scrollLeft / cardWidth);
            if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
                setCurrentSlide(newIndex);
            }
        }
    };

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying) {
            autoPlayRef.current = setInterval(() => {
                setCurrentSlide((prev) => {
                    const next = (prev + 1) % slides.length;
                    scrollToSlide(next);
                    return next;
                });
            }, 3000);
        } else {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="overflow-hidden w-full min-h-screen bg-white py-40 px-6 flex flex-col justify-center pr-0">
            {/* Header */}
            <div className="max-w-7xl mx-auto w-full mb-12 pl-6 md:pl-20 ">
                <h2
                    className="text-5xl md:text-8xl leading-none tracking-wide drop-shadow-lg"
                    style={{
                        background: 'linear-gradient(185deg, #D9D9D9 0%, #767676 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '100% 100%',
                        WebkitTextStroke: '1.5px #999999',
                    }}
                >
                    ไฮไลท์ต่างๆ
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="max-w-[100rem] mx-auto w-full relative pr-0 md:pl-40">
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide pr-0"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[85%] md:w-[60%] lg:w-[45%] snap-start"
                        >
                            {/* Card */}
                            <div className="bg-gray-100 rounded-[32px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                {/* Image */}
                                <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-blue-100 to-blue-200">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Text Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl md:text-3xl font-medium text-neutral-800 leading-snug mb-2">
                                        {slide.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-neutral-500 font-light">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Peek space at the end */}
                    <div className="flex-shrink-0 w-8"></div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center gap-8 mt-12">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors"
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 text-neutral-800 fill-neutral-800" />
                    ) : (
                        <Play className="w-6 h-6 text-neutral-800 fill-neutral-800 ml-0.5" />
                    )}
                </button>

                {/* Dots Navigation */}
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-6 py-4 shadow-sm">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={`rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-10 h-2 bg-neutral-600"
                                : "w-2 h-2 bg-neutral-400 hover:bg-neutral-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
