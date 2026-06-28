"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const performances = [
  {
    id: 1,
    label: "Language",
    labelTh: "ภาษา",
    note: "*ประเมินเฉพาะอังกฤษ (มีผลคะแนนสอบในระดับดีมาก) EX.Toeic 650+",
  },
  { id: 2, label: "Time", labelTh: "เวลาทำงาน" },
  { id: 3, label: "Personality", labelTh: "บุคลิกภาพ,การแต่งกาย" },
  { id: 4, label: "Communication", labelTh: "การสื่อสาร" },
  { id: 5, label: "Skill", labelTh: "ทักษะระบบงานภายใน" },
  { id: 6, label: "Problem Solving", labelTh: "แก้ปัญหาเฉพาะหน้า" },
  { id: 7, label: "Responsible", labelTh: "ความรับผิดชอบ" },
];

const ratings = ["Excellent", "Fair", "Poor", "Bad"] as const;
type Rating = (typeof ratings)[number];

const tooltips: Record<number, string> = {
  1: "ประเมินทักษะภาษาอังกฤษ โดยพิจารณาจากผลสอบมาตรฐาน เช่น TOEIC 650 ขึ้นไป",
  2: "ประเมินความตรงต่อเวลาและการบริหารจัดการเวลาในการทำงาน",
  3: "ประเมินบุคลิกภาพโดยรวมและการแต่งกายที่เหมาะสม",
  4: "ประเมินทักษะการสื่อสารทั้งภายในและภายนอกองค์กร",
  5: "ประเมินทักษะการใช้งานระบบและเครื่องมือภายในองค์กร",
  6: "ประเมินความสามารถในการแก้ไขปัญหาเฉพาะหน้าได้อย่างมีประสิทธิภาพ",
  7: "ประเมินความรับผิดชอบต่อหน้าที่และงานที่ได้รับมอบหมาย",
};

export default function PerformanceEvaluationPage() {
  const [answers, setAnswers] = useState<Record<number, Rating>>({});
  const [remark, setRemark] = useState("");
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [config, setConfig] = useState({ performances, tooltips });

  // Add useEffect to fetch config from api
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data?.performances?.length) setConfig(data);
      })
      .catch(console.error);
  }, []);

  const handleSelect = (id: number, rating: Rating) => {
    setAnswers((prev) => ({ ...prev, [id]: rating }));
  };

  const handleSubmit = () => {
    const data = {
      answers: config.performances.map((p) => ({
        id: p.id,
        label: `${p.label} (${p.labelTh})`,
        rating: answers[p.id] ?? null,
      })),
      remark,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("performanceEvaluation", JSON.stringify(data));
    console.log("Submitted:", data);
    setSubmitted(true);
  };

  const handleCancel = () => {
    setAnswers({});
    setRemark("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center gap-4">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-semibold text-gray-800">บันทึกข้อมูลสำเร็จ</h2>
          <p className="text-gray-500 text-sm">ข้อมูลการประเมินถูกบันทึกเรียบร้อยแล้ว</p>
          <button
            onClick={handleCancel}
            className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition"
          >
            ประเมินใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-kanit)]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-blue-500 font-bold text-xl tracking-wide flex items-center gap-1">
            <span className="text-2xl">🔵</span>
            <span>EXPO<span className="text-gray-800">PASS</span></span>
          </div>
        </div>
        <span className="text-gray-700 font-medium">Event Name</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Organizers01</span>
          <div className="w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">Performance Evaluation</h1>
            <span className="text-2xl">📋</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition">
            ←
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_auto_repeat(4,80px)] bg-blue-400 text-white font-medium text-sm px-6 py-3 items-center">
            <span>Performance</span>
            <span className="w-8" />
            {ratings.map((r) => (
              <span key={r} className="text-center">{r}</span>
            ))}
          </div>

          {/* Rows */}
          {config.performances.map((p, idx) => (
            <div
              key={p.id}
              className={`grid grid-cols-[1fr_auto_repeat(4,80px)] px-6 py-4 items-center border-b border-gray-100 last:border-0 ${
                idx % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              {/* Label */}
              <div>
                <span className="font-medium text-gray-800">
                  {p.id}. {p.label}{" "}
                  <span className="font-normal text-gray-600">({p.labelTh})</span>
                </span>
                {p.note && (
                  <p className="text-xs text-gray-400 mt-0.5">{p.note}</p>
                )}
              </div>

              {/* Info icon */}
              <div className="relative w-8 flex justify-center">
                <button
                  className="text-gray-500 hover:text-blue-500 transition"
                  onMouseEnter={() => setTooltip(p.id)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M12 8h.01M12 11v5" />
                  </svg>
                </button>
                {tooltip === p.id && (
                  <div className="absolute z-10 left-8 top-0 w-60 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                    {config.tooltips[p.id as keyof typeof config.tooltips]}
                  </div>
                )}
              </div>

              {/* Radio buttons */}
              {ratings.map((rating) => (
                <div key={rating} className="flex justify-center">
                  <button
                    onClick={() => handleSelect(p.id, rating)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[p.id] === rating
                        ? "border-blue-500 bg-blue-500"
                        : "border-purple-300 bg-white hover:border-blue-400"
                    }`}
                  >
                    {answers[p.id] === rating && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Blue footer bar */}
          <div className="bg-blue-400 h-3" />
        </div>

        {/* Remark */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Remark</label>
          <div className="relative">
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value.slice(0, 500))}
              maxLength={500}
              rows={3}
              placeholder="กรอกหมายเหตุ..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {remark.length}/500
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="px-12 py-3 bg-blue-500 text-white rounded-full font-semibold text-base hover:bg-blue-600 active:scale-95 transition-all shadow"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="px-12 py-3 bg-red-500 text-white rounded-full font-semibold text-base hover:bg-red-600 active:scale-95 transition-all shadow"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
