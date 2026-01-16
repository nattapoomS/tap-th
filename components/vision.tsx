import { ChevronRight } from "lucide-react";

export default function Vision() {
    return (
        <section className="bg-white py-54 px-6 md:px-12 lg:px-48 w-full flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Title Section */}
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                <h2 className="text-xl font-medium text-black tracking-wide">วิสัยทัศน์</h2>
            </div>

            {/* Content Section */}
            <div className="max-w-2xl flex flex-col gap-10">
                <p className="text-xl md:text-4xl text-black font-light leading-relaxed">
                    บริษัทมีเป้าหมายที่จะพัฒนาธุรกิจอย่างต่อเนื่อง
                    โดยอาศัยประสบการณ์กว่า 30
                    ปีในการดำเนินธุรกิจเพื่อสร้างอนาคตที่ดีกว่าสำหรับคนรุ่นต่อไป
                    TAP มุ่งเน้นการให้บริการที่ตอบโจทย์ลูกค้า
                </p>

                <button className="w-fit px-8 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black transition-colors text-base">
                    เพิ่มเติม
                </button>
            </div>
        </section>
    );
}