import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-zinc-900 font-kanit">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-80"
                >
                    {/* Using a stock industrial footage placeholder */}
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                {/* subtle overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-10 pl-0">
                <div className="max-w-2xl">
                    <h1 className="text-8xl text-stroke-red-50 text-white/80 leading-[1.1] tracking-wide drop-shadow-lg">
                        ตัวแทนจำหน่าย <br />
                        <span className="text-white/80">อย่างเป็น ทางการ</span>
                    </h1>
                </div>
            </div>

            {/* Map Card */}
            <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
                <div className="w-[300px] h-[160px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md relative group cursor-pointer transition-transform hover:scale-105">
                    {/* Map Placeholder Image */}
                    
                    
                    {/* Pin Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9598.745140781646!2d100.271515!3d13.728498!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e295473834ec8f%3A0x475736c129104b66!2sAggregate%20Pioneer%20(Thailand)%20Co.%2C%20Ltd.!5e1!3m2!1sth!2sth!4v1767681151368!5m2!1sth!2sth"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
