"use client";

import { useRef, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CrusherCard {
    title: string;
    description: string;
    footer?: string;
    image: string;
}

const cards: CrusherCard[] = [

    {
        title: "GC Series Cone Crusher",
        description: "บดหินแข็งและกรวด ระบบบดอัจฉริยะ ลดต้นทุน",
        footer: "Stationary · Cone",
        image: "/products/crusher-gc.png",
    },
    {
        title: "TC Series Cone Crusher",
        description: "หินคุณภาพสูง อัตราการบดสูง ป้องกัน overload",
        footer: "Stationary · Cone",
        image: "/products/crusher-tc.png",
    },
    {
        title: "IH Series Impact Crusher",
        description: "ไฮดรอลิกเต็มระบบ บำรุงรักษาง่าย กำลังผลิตสูง",
        footer: "Stationary · Impact",
        image: "/products/crusher-ih.png",
    },
        {
        title: "Tracked Jaw Crusher",
        description: "เครื่องโม่กรามตีนตะขาบ ย้ายไซต์งานสะดวก",
        footer: "Tracked Mobile",
        image: "/products/tracked-jaw.png",
    },
    {
        title: "Tracked Cone Crusher",
        description: "โม่กรวยไฮดรอลิกเคลื่อนที่ บดกลางถึงละเอียด",
        footer: "Tracked Mobile",
        image: "/products/tracked-cone.png",
    },
    {
        title: "Tracked Multi-Cone Crusher",
        description: "โม่กรวยหลายสูบเคลื่อนที่ กำลังผลิตสูง",
        footer: "Tracked Mobile",
        image: "/products/tracked-multicone.jpeg",
    },
];

export default function Crusher() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // การ์ดค่อยๆ โผล่แบบ stagger ตอน scroll เข้ามา
    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.from(el.children, {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 80%" },
            });
        });
        return () => mm.revert();
    }, []);

    const scrollByCard = (dir: number) => {
        const el = scrollRef.current;
        if (!el) return;
        // เลื่อนทีละ ~ความกว้างการ์ดใบแรก (รวม gap) แบบ smooth
        const card = el.firstElementChild as HTMLElement | null;
        const amount = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    // ลากด้วยเมาส์: กดค้างแล้วลากเพื่อเลื่อน
    const drag = useRef({ down: false, startX: 0, startScroll: 0 });

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = scrollRef.current;
        if (!el) return;
        drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
        el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = scrollRef.current;
        if (!el || !drag.current.down) return;
        el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    };

    const endDrag = () => {
        drag.current.down = false;
    };

    return (
        <section id="crusher" className="pb-24 w-full min-h-screen bg-[#F4F5F6] overflow-x-hidden">
            {/* Header — ขอบซ้ายตรงกับ "โซลูชันของเรา" ผ่าน --page-gutter */}
            <div className="mb-16 pr-6 pl-(--page-gutter)">
                <p className="text-lg text-neutral-800 font-medium mb-5">Crusher</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-tight mb-8">
                    เครื่องโม่หินครบไลน์
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-4xl">
                    ตั้งแต่ Stationary Crushing &amp; Screening จนถึง Tracked Mobile Crusher จาก NFLG —
                    บด ย่อย และคัดขนาดหินได้ตรงสเปกทุกงาน ด้วยระบบไฮดรอลิกและการควบคุมอัจฉริยะ
                </p>
            </div>

            {/* Cards — full-bleed: ใบแรกเริ่มตรงหัวข้อ (--page-gutter) แต่เลื่อนหลุดจอขวาได้ */}
            <div
                ref={scrollRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="flex gap-8 w-full overflow-x-auto scroll-smooth snap-x snap-proximity pt-6 pb-10 pr-6 pl-(--page-gutter) scroll-pl-(--page-gutter) cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex h-[540px] shrink-0 snap-start flex-col w-[78%] sm:w-[46%] lg:w-[31%] xl:w-[24%] overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)]"
                    >
                        {/* Text Content */}
                        <div className="px-7 pt-7">
                            <div className="mb-2 h-5">
                                {card.footer && (
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C02834]">
                                        {card.footer}
                                    </span>
                                )}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-neutral-800">
                                {card.title}
                            </h3>
                            <p className="text-sm font-normal leading-relaxed text-neutral-400 line-clamp-3">
                                {card.description}
                            </p>
                        </div>

                        {/* Image — anchored to the bottom of the card */}
                        <div className="flex min-h-0 flex-grow items-end justify-center">
                            <div className="relative h-full w-[90%]">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:640px) 46vw, 78vw"
                                    className="object-contain object-bottom"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows — เลื่อน scroll แบบ smooth */}
            <div className="mt-12 mr-24 pr-6 pl-(--page-gutter) flex justify-end gap-3">
                <button
                    onClick={() => scrollByCard(-1)}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label="เลื่อนซ้าย"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-600" />
                </button>
                <button
                    onClick={() => scrollByCard(1)}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label="เลื่อนขวา"
                >
                    <ChevronRight className="w-6 h-6 text-neutral-600" />
                </button>
            </div>
        </section>
    );
}
