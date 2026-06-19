"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CrusherCard {
    title: string;
    description: string;
    footer?: string;
    image: string;
}

const cards: CrusherCard[] = [
    {
        title: "JW Series Jaw Crusher",
        description: "เครื่องโม่กรามพร้อมระบบปรับ CSS ไฮดรอลิก แข็งแรงทนทาน รองรับทั้งแบบตีนตะขาบ ล้อ และติดตั้งอยู่กับที่",
        footer: "Stationary · Jaw",
        image: "/products/crusher-jw.png",
    },
    {
        title: "GC Series Single-Cylinder Hydraulic Cone Crusher",
        description: "บดหินแข็ง กรวด และเศษวัสดุก่อสร้าง ด้วยระบบบดอัจฉริยะ ลดต้นทุน เพิ่มประสิทธิภาพ และลดแรงงาน",
        footer: "Stationary · Cone",
        image: "/products/crusher-gc.png",
    },
    {
        title: "TC Series Multi-Cylinder Hydraulic Cone Crusher",
        description: "ให้หินคุณภาพสูง อัตราการบดสูง รูปทรงเม็ดดี พร้อมระบบไฮดรอลิกตั้งค่าและป้องกัน overload",
        footer: "Stationary · Cone",
        image: "/products/crusher-tc.png",
    },
    {
        title: "IH Series Horizontal Shaft Impact Crusher",
        description: "ดีไซน์ไฮดรอลิกเต็มระบบ ควบคุมอัจฉริยะ บำรุงรักษาง่าย กำลังผลิตสูงและอายุการใช้งานยาว",
        footer: "Stationary · Impact",
        image: "/products/crusher-ih.png",
    },
    {
        title: "Tracked Jaw Crusher",
        description: "เครื่องโม่กรามแบบเคลื่อนที่ตีนตะขาบ ย้ายระหว่างไซต์งานได้สะดวก พร้อมทำงานได้ทันที",
        footer: "Tracked Mobile",
        image: "/products/tracked-jaw.png",
    },
    {
        title: "Tracked Hydraulic Cone Crusher",
        description: "เครื่องโม่กรวยไฮดรอลิกแบบเคลื่อนที่ สำหรับการบดขั้นกลางถึงละเอียดในงานภาคสนาม",
        footer: "Tracked Mobile",
        image: "/products/tracked-cone.png",
    },
    {
        title: "Tracked Multi-Cylinder Hydraulic Cone Crusher",
        description: "เครื่องโม่กรวยหลายสูบแบบเคลื่อนที่ กำลังผลิตสูง เหมาะกับงานบดหินปริมาณมาก",
        footer: "Tracked Mobile",
        image: "/products/tracked-multicone.jpeg",
    },
];

export default function Crusher() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollByCard = (dir: number) => {
        const el = scrollRef.current;
        if (!el) return;
        // เลื่อนทีละ ~ความกว้างการ์ดใบแรก (รวม gap) แบบ smooth
        const card = el.firstElementChild as HTMLElement | null;
        const amount = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    return (
        <section className="pb-24 w-full min-h-screen bg-white overflow-x-hidden">
            {/* Header — ขอบซ้ายตรงกับ "โซลูชันของเรา" ผ่าน --page-gutter */}
            <div className="mb-16 pr-6 pl-[var(--page-gutter)]">
                <p className="text-lg text-neutral-800 font-medium mb-2">Crusher</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 leading-tight mb-6">
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
                className="flex gap-8 w-full overflow-x-auto scroll-smooth snap-x snap-proximity pb-4 pr-6 pl-[var(--page-gutter)] [scroll-padding-left:var(--page-gutter)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex shrink-0 snap-start flex-col w-[78%] sm:w-[46%] lg:w-[31%] xl:w-[24%]"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-6">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-neutral-900 leading-snug mb-3">
                                {card.title}
                            </h3>
                            <p className="text-base text-neutral-600 leading-relaxed mb-4">
                                {card.description}
                            </p>
                            {card.footer && (
                                <p className="text-sm text-neutral-400">
                                    {card.footer}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows — เลื่อน scroll แบบ smooth */}
            <div className="mt-12 pr-6 pl-[var(--page-gutter)] flex justify-end gap-3">
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
