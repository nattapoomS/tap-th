export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white via-pink-50 to-pink-100 py-24 lg:py-32">
            {/* Large Watermark Text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <h2 className="text-[20rem] lg:text-[28rem] font-bold text-gray-200/30 leading-none select-none pointer-events-none whitespace-nowrap">

                </h2>
            </div>

            {/* Content Container */}
            <div className="relative left-20 z-10 container mx-auto px-6 lg:px-10">
                {/* Demo Tag */}
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                        GET A PERSONALIZED DEMO
                    </span>
                </div>

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-40">
                    {/* Left Side - Heading */}
                    <div>
                        <h2 className="text-5xl lg:text-6xl xl:text-7xl  leading-tight text-gray-900">
                            พร้อมที่จะเห็น
                            <br />
                            ตัวแทน Giga AI
                            <br />
                            ในการทำงาน?
                        </h2>
                    </div>

                    {/* Right Side - Description & Button */}
                    <div className="flex pl-29  flex-col gap-8 lg:pt-4">
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            ตัวแทน AI ของ Giga จัดการเวิร์กโฟลว์ที่ซับซ้อนในระดับใหญ่
                            ตั้งแต่ปัญหาการจัดส่งสดไปจนถึงการตัดสินใจด้านการปฏิบัติตามกฎระเบียบ
                            ในขณะที่รักษาความแม่นยำในการผลิตไว้มากกว่า 90%
                        </p>

                        <div>
                            <button className="group bg-black hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                พูดคุยกับเรา
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
