"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Play, Pause } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HighlightSlide {
    title: string;
    description: string;
    image: string;
}

const slides: HighlightSlide[] = [
    {
        title: "Raw Material Conveying Unit",
        description: "NFLG NAF1038 chain feeder รองรับวัสดุขนาดใหญ่ วัสดุกัดกร่อนสูง ดินเหนียวและวัสดุเปียก พร้อม Heavy Duty Screen คัดแยกวัสดุ",
        image: "/products/raw-material.jpg",
    },
    {
        title: "Washing & Grading",
        description: "NT & YS Series Washing Screen ล้างและคัดเกรดหินด้วยระบบสั่นสะเทือน เพิ่มอัตราการนำวัสดุกลับมาใช้",
        image: "/products/washing-grading.png",
    },
    {
        title: "Fine Sand Recycling",
        description: "FWD & FW Series Sand Washing Machine กู้คืนทรายละเอียด ลดการสูญเสียเนื้อทรายในกระบวนการล้าง",
        image: "/products/fine-sand.png",
    },
    {
        title: "Aggregate Washing",
        description: "XSJ60A Stone Washing Machine ล้างหินคุณภาพสูง พร้อมระบบบำบัดน้ำหมุนเวียน zero-emission",
        image: "/products/aggregate.png",
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
        <section id="solutions" className="overflow-hidden w-full min-h-screen bg-white py-40 flex flex-col justify-center">
            {/* Header — ขอบซ้ายผ่าน --page-gutter (ตรงกับ Crusher) */}
            <div className="mb-12 pr-6 pl-[var(--page-gutter)]">
                <h2
                    ref={headingRef}
                    className="text-5xl md:text-6xl lg:text-7xl leading-tight tracking-wide drop-shadow-lg"
                    style={{
                        background: 'linear-gradient(185deg, #D9D9D9 0%, #767676 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '100% 100%',
                        WebkitTextStroke: '1.5px #999999',
                    }}
                >
                    โซลูชันของเรา
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
                className="flex gap-6 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pr-6 pl-[var(--page-gutter)] [scroll-padding-left:var(--page-gutter)] cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                                    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C71F2F] mb-3">
                                        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                                        <span
                                            className="h-px w-12"
                                            style={{ background: "linear-gradient(to right,#C71F2F,#C71F2F,#c71f3075,#c71f3000)" }}
                                        />
                                        <span className="text-neutral-400">Step {index + 1} of {slides.length}</span>
                                    </p>
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
