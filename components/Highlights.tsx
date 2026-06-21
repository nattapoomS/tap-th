"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Play, Pause } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cardImg37 from "@/app/img/card-content/image 37.png";
import cardImg35 from "@/app/img/card-content/image 35.png";
import cardImg351 from "@/app/img/card-content/image 35-1.png";
import cardImg352 from "@/app/img/card-content/image 35-2.png";

interface HighlightSlide {
    title: string;
    description: string;
    subDescription: string;
    image: StaticImageData;
    badge?: string;
}

const slides: HighlightSlide[] = [
    {
        title: "LBNZ Counter-flow",
        description: "NFLG NAF1038 chain feeder รองรับวัสดุขนาดใหญ่",
        subDescription: "วัสดุกัดกร่อนสูง ดินเหนียว",
        image: cardImg352,
        badge: "ใหม่",
    },
    {
        title: "LBG high-position",
        description: "NFLG NAF1038 chain feeder รองรับวัสดุขนาดใหญ่",
        subDescription: "วัสดุกัดกร่อนสูง ดินเหนียว",
        image: cardImg35,
        badge: "ใหม่",
    },
    {
        title: "LBGZ Integrated",
        description: "NFLG NAF1038 chain feeder รองรับวัสดุขนาดใหญ่",
        subDescription: "วัสดุกัดกร่อนสูง ดินเหนียว",
        image: cardImg351,
    },
    {
        title: "LBNZ Series",
        description: "NFLG NAF1038 chain feeder รองรับวัสดุขนาดใหญ่",
        subDescription: "วัสดุกัดกร่อนสูง ดินเหนียว",
        image: cardImg37,
    },
];

export default function Highlights() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
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

    // การ์ดค่อยๆ โผล่แบบ stagger ตอน scroll เข้ามา
    useLayoutEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(headingRef.current, {
                y: 30,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
            });
            // .slice() กัน div peek ท้ายสุด (ไม่ใช่การ์ด)
            const cards = gsap.utils.toArray<HTMLElement>(el.children).slice(0, slides.length);
            gsap.from(cards, {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%" },
            });
        });
        return () => mm.revert();
    }, []);

    // ลากด้วยเมาส์: กดค้างแล้วลากเพื่อเลื่อน
    const drag = useRef({ down: false, startX: 0, startScroll: 0 });

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = scrollContainerRef.current;
        if (!el) return;
        drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
        el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = scrollContainerRef.current;
        if (!el || !drag.current.down) return;
        el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    };

    const endDrag = () => {
        drag.current.down = false;
    };

    return (
        <section id="solutions" className="overflow-hidden w-full min-h-screen bg-[#F4F5F6] py-40 flex flex-col justify-center ">
            {/* Header — ขอบซ้ายผ่าน --page-gutter (ตรงกับ Crusher) */}
            <div className="mb-20 pr-6 pl-[var(--page-gutter)]">
                <h2
                    ref={headingRef}
                    className="text-5xl md:text-6xl lg:text-9xl leading-tight tracking-wide drop-shadow-lg"
                    style={{
                        background: 'linear-gradient(185deg, #D9D9D9 0%, #000000ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '100% 100%',
                        WebkitTextStroke: '0.5px #979797ff',
                    }}
                >
                    ดูไฮไลท์ต่างๆ
                </h2>
            </div>

            {/* Carousel — full-bleed: ใบแรกตรงหัวข้อ (--page-gutter) เลื่อนหลุดจอขวาได้ */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="flex gap-6 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pt-6 pb-10 pr-6 pl-[var(--page-gutter)] [scroll-padding-left:var(--page-gutter)] cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[78%] sm:w-[55%] md:w-[40%] lg:w-[28%] snap-start"
                        >
                            {/* Card */}
                            <div className="flex h-[620px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)]">
                                {/* Text Content */}
                                <div className="px-8 pt-9">
                                    <div className="mb-3 h-6">
                                        {slide.badge && (
                                            <span className="text-sm font-semibold text-[#C02834]">
                                                {slide.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-neutral-800">
                                        {slide.title}
                                    </h3>
                                    <p className="mb-1.5 text-base font-medium leading-relaxed text-neutral-700">
                                        {slide.description}
                                    </p>
                                    <p className="text-base font-normal text-neutral-400">
                                        {slide.subDescription}
                                    </p>
                                </div>
                                {/* Image — anchored to the bottom of the card */}
                                <div className="relative flex flex-grow items-end justify-center">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        className="h-auto max-h-full w-[90%] object-contain object-bottom"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                {/* Peek space at the end */}
                <div className="flex-shrink-0 w-8"></div>
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
