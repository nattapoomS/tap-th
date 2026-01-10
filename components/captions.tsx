"use client";

import Image from "next/image";
import profileImage from "@/app/img/image 13.png";

export default function Captions() {
    return (
        <section className="w-full h-screen bg-neutral-100 flex items-center justify-center p-5">
            {/* Bento Grid Container - Full Width */}
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Bento Box - Quote */}
                <div className="bg-white rounded-[48px] p-12 lg:p-20 flex flex-col justify-center shadow-sm">
                    <span className="text-orange-500 text-xl font-medium mb-8">วิธีคิด</span>
                    <blockquote className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-neutral-800">
                        <span className="text-neutral-400">" </span>
                        โลกจะเปลี่ยนไป
                        <br />
                        เพราะตัวอย่าง
                        <br />
                        ของคุณ
                        <br />
                        ไม่ใช่เพราะความคิด
                        <br />
                        เห็นของคุณ
                        <span className="text-neutral-400"> "</span>
                    </blockquote>
                </div>

                {/* Right Bento Box - Profile Image */}
                <div className="bg-[#c70000]/80 rounded-[48px] p-8 flex items-center justify-center shadow-sm overflow-hidden">
                    <div className="relative w-full h-full max-w-[800px] max-h-[800px] aspect-square rounded-full overflow-hidden">
                        <Image
                            src={profileImage}
                            alt="Profile"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}