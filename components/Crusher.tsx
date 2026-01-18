"use client";

import groupPhoto from "@/app/img/Generated.png";
import groupPhoto2 from "@/app/img/Generated2.png";
import groupPhoto3 from "@/app/img/Generated3.png";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CrusherCard {
    title: string;
    description: string;
    footer?: string;
    image: StaticImageData;
}

const cards: CrusherCard[] = [
    {
        title: "เครื่องบดคอนกรีตแบบกราม (Jaw Crusher)",
        description: "ออกแบบมาเพื่อบดคอนกรีตขนาดใหญ่ให้เป็นชิ้นเล็ก รองรับวัสดุขนาดสูงสุด 1,200 มม. พร้อมกำลังการผลิต 500 ตัน/ชั่วโมง เหมาะสำหรับงานรื้อถอนอาคารและโครงสร้างขนาดใหญ่",
        footer: "มาตรฐาน ISO 9001:2015",
        image: groupPhoto,
    },
    {
        title: "เครื่องบดคอนกรีตแบบกรวย (Cone Crusher)",
        description: "เทคโนโลยีบดขั้นที่สองที่มีประสิทธิภาพสูง ให้ขนาดวัสดุสม่ำเสมอ ระบบไฮดรอลิกอัตโนมัติปรับช่องบดได้ตามต้องการ ประหยัดพลังงานสูงสุด 30%",
        footer: "รับประกัน 3 ปี",
        image: groupPhoto2,
    },
    {
        title: "เครื่องบดคอนกรีตแบบกระแทก (Impact Crusher)",
        description: "เหมาะสำหรับการบดคอนกรีตเสริมเหล็ก แยกเหล็กออกจากคอนกรีตได้อัตโนมัติ ผลิตมวลรวมรีไซเคิลคุณภาพสูง พร้อมระบบกรองฝุ่นมาตรฐานสิ่งแวดล้อม",
        footer: "ลดต้นทุน 40%",
        image: groupPhoto3,
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
        <section className=" pb-24 pl-6 md:pl-40 w-full min-h-screen bg-white px-8 md:px-16 lg:px-24">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16">
                <p className="text-lg text-neutral-800 font-medium mb-2">Crusher</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-neutral-900 leading-tight mb-6">
                    พร้อมสยบทุกงาน
                </h1>
                <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-4xl">
                    ไม่ว่าจะเป็นงานรื้อถอนอาคารขนาดใหญ่ งานรีไซเคิลคอนกรีตเก่า
                    หรือการผลิตมวลรวมคุณภาพสูง เครื่องบด Crusher ของเราพร้อมรองรับ
                    ทุกความต้องการด้วยประสิทธิภาพสูงสุด
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
