"use client";

import { useState } from "react";
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
        title: "CarPlay ที่ออกแบบมาใหม่พร้อม Liquid Glass",
        description: "ตอบกลับด้วย Tapback ในแอปข้อความ ติดตามกิจกรรมสด และดูข้อมูลได้มากขึ้น เพียงแค่เหลือบมอง เพื่อให้คุณต่อติดกับทุกเรื่องได้เลยโดยไม่เสียสมาธิระหว่างขับรถ*",
        footer: "จะใช้งานได้บน iPhone",
        image: "/mockup.png",
    },
    {
        title: "แผนที่ที่เข้าใจว่าคุณอยากไปทางไหนมากกว่า",
        description: "แอปแผนที่จะเรียนรู้เส้นทางที่คุณใช้เป็นประจำและสามารถแจ้งเตือนความล่าช้าที่หนักติดบกสี่ให้คุณรู้ล่วงหน้าได้ตั้งแต่ก่อนออกจากบ้าน ไม่ว่าที่จะัตร ของคุณจะเปลี่ยนไปอย่างไร iPhone ก็ปรับตามได้ เพื่อให้การเดินทางของคุณราบรื่นเสมอ",
        footer: "จะใช้งานได้บน iPhone",
        image: "/mockup.png",
    },
    {
        title: "คุณสมบัติ \"ที่ที่เคยไป\" ในแอปแผนที่",
        description: "ไม่สื้อจริก ว่าเคลย่ไหนบ้าง เมื่อมีคุณสมบัติ \"ที่ที่เคยไป\" มาเป็นผู้ช่วยร่า ตราวนี้ คุณก็ค้นหาภาพถ่ายๆ ที่เกยละ-ระหว่างทริป แล้วแชร์ได้ง่ายๆ แค่แตะครั้งเดียว*",
        footer: "จะใช้งานได้บน iPhone",
        image: "/mockup.png",
    },
];

export default function Crusher() {
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 3;
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const visibleCards = cards.slice(
        currentPage * cardsPerPage,
        currentPage * cardsPerPage + cardsPerPage
    );

    return (
        <section className=" pb-24 pl-40 w-full min-h-screen bg-white px-8 md:px-16 lg:px-24">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <p className="text-lg text-neutral-800 font-medium mb-2">Crusher</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 leading-tight mb-6">
                    พร้อมสยบทุกงาน
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-4xl">
                    ไม่ว่าจะจัดการงานทั่วไปในแต่ละวันอย่างรวดเร็ว ทำกิจกรรมที่คุณชื่นชอบ
                    หรือติดเทอร์โบให้เวิร์กโฟลว์ระดับโปร คุณก็ทำทั้งหมดนี้ได้โดยแทบไม่ต้อง
                    ออกแรงเลย
                </p>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {visibleCards.map((card, index) => (
                        <div key={index} className="flex flex-col">
                            {/* Image Placeholder */}
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

                {/* Navigation Arrows */}
                {totalPages > 1 && (
                    <div className="flex justify-end gap-3 mt-12">
                        <button
                            onClick={prevPage}
                            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-6 h-6 text-neutral-600" />
                        </button>
                        <button
                            onClick={nextPage}
                            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6 text-neutral-600" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
