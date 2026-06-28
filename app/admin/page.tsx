"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Crusher, { CrusherCard } from "@/components/Crusher";
import Highlights, { HighlightSlide } from "@/components/Highlights";
import Link from "next/link";

// Modal component
type ModalState = 
  | { type: 'alert'; icon: string; title: string; message: string }
  | { type: 'confirm'; icon: string; title: string; message: string; onConfirm: () => void }
  | null;

function Modal({ modal, onClose }: { modal: ModalState; onClose: () => void }) {
  if (!modal) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-[340px] p-6 text-center animate-[modalIn_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">{modal.icon}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{modal.title}</h3>
        <p className="text-sm text-gray-500 mb-5">{modal.message}</p>
        {modal.type === 'alert' ? (
          <button onClick={onClose} className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition cursor-pointer">
            ตกลง
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 active:scale-[0.98] transition cursor-pointer">
              ยกเลิก
            </button>
            <button onClick={() => { modal.onConfirm(); onClose(); }} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 active:scale-[0.98] transition cursor-pointer">
              ลบ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ℹ️ Info tooltip — hover to show
function InfoTooltip() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.top - 6, left: Math.min(r.left, window.innerWidth - 240) });
    }
    setShow(true);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        className="w-4 h-4 rounded-full border border-blue-300 text-blue-500 inline-flex items-center justify-center text-[10px] font-bold hover:bg-blue-50 transition cursor-help leading-none select-none"
      >
        ?
      </button>
      {show && (
        <div
          className="fixed z-[101] w-56 bg-white border border-gray-200 rounded-xl p-3 shadow-xl text-xs text-gray-700 leading-relaxed pointer-events-none -translate-y-full"
          style={{ top: pos.top, left: pos.left }}
        >
          <p className="font-bold text-gray-900 mb-1.5 text-[13px]">📋 ข้อกำหนดรูปภาพ</p>
          <ul className="space-y-1">
            <li className="flex items-start gap-1.5"><span>✅</span> ไฟล์ <strong>PNG, JPG, WEBP</strong> เท่านั้น</li>
            <li className="flex items-start gap-1.5"><span>✅</span> ควรมีพื้นหลัง<strong>โปร่งใส</strong> (ถ้าเป็น PNG)</li>
            <li className="flex items-start gap-1.5"><span>📐</span> แนะนำ ~<strong>2500 × 2100px</strong></li>
            <li className="flex items-start gap-1.5"><span>📦</span> ไม่เกิน <strong>5MB</strong></li>
          </ul>
        </div>
      )}
    </>
  );
}

// Image upload component
function ImageUpload({ currentSrc, onUploaded }: { currentSrc: string; onUploaded: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");

    // Client-side pre-checks
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError("❌ ไฟล์ต้องเป็นรูป (PNG, JPG, WEBP) เท่านั้น");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("❌ ไฟล์ต้องไม่เกิน 5MB");
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) {
        setError(`❌ ${json.error}`);
      } else {
        onUploaded(json.url);
      }
    } catch {
      setError("❌ อัพโหลดล้มเหลว");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider flex items-center gap-1.5">
        Image <InfoTooltip />
      </label>
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        {currentSrc && (
          <div 
            onClick={() => fileRef.current?.click()}
            className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-blue-400 hover:opacity-80 transition group relative"
            title="คลิกเพื่อเปลี่ยนรูป"
          >
            <img src={typeof currentSrc === 'string' ? currentSrc : ''} alt="" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <span className="text-[10px] text-white font-semibold">เปลี่ยน</span>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex-1 border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition disabled:opacity-50 cursor-pointer"
        >
          {uploading ? "กำลังอัพโหลด..." : "เลือกรูปภาพ"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-2.5 py-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}

type DataState = { crusher: CrusherCard[], highlights: HighlightSlide[] };

export default function AdminPage() {
  const [data, setData] = useState<DataState>({ crusher: [], highlights: [] });
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"crusher" | "highlights">("crusher");
  const [activeCardIndex, setActiveCardIndex] = useState<number | undefined>(undefined);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [modal, setModal] = useState<ModalState>(null);

  const showAlert = useCallback((icon: string, title: string, message: string) => {
    setModal({ type: 'alert', icon, title, message });
  }, []);

  const showConfirm = useCallback((icon: string, title: string, message: string, onConfirm: () => void) => {
    setModal({ type: 'confirm', icon, title, message, onConfirm });
  }, []);

  // Undo/Redo history
  const historyRef = useRef<DataState[]>([]);
  const futureRef = useRef<DataState[]>([]);

  const pushHistory = (current: DataState) => {
    historyRef.current = [...historyRef.current, JSON.parse(JSON.stringify(current))];
    futureRef.current = [];
  };

  const undo = () => {
    if (historyRef.current.length === 0) return;
    const prev = historyRef.current[historyRef.current.length - 1];
    historyRef.current = historyRef.current.slice(0, -1);
    futureRef.current = [...futureRef.current, JSON.parse(JSON.stringify(data))];
    setData(prev);
  };

  const redo = () => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current[futureRef.current.length - 1];
    futureRef.current = futureRef.current.slice(0, -1);
    historyRef.current = [...historyRef.current, JSON.parse(JSON.stringify(data))];
    setData(next);
  };

  // Force re-render for history button states
  const [, forceUpdate] = useState(0);

  const setDataWithHistory = (newData: DataState) => {
    pushHistory(data);
    setData(newData);
    forceUpdate(n => n + 1);
  };

  const toggleExpand = (idx: number) => {
    setExpandedCards(prev => {
      if (prev.has(idx)) return new Set();
      return new Set([idx]);
    });
  };

  const handleTabChange = (tab: "crusher" | "highlights") => {
      setActiveTab(tab);
      setActiveCardIndex(undefined);
      setExpandedCards(new Set());
  };

  const handleCardSelect = (idx: number) => {
      setActiveCardIndex(idx);
      setExpandedCards(new Set([idx]));
      setTimeout(() => {
        document.getElementById(`edit-card-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
  };

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, data })
    });
    if (res.ok) showAlert('✅', 'บันทึกสำเร็จ!', 'ข้อมูลถูกบันทึกลงเซิร์ฟเวอร์เรียบร้อยแล้ว');
    else showAlert('❌', 'บันทึกไม่สำเร็จ', 'รหัสผ่านผิดพลาด หรือเซิร์ฟเวอร์มีปัญหา');
  };

  const updateCrusherCard = (index: number, key: keyof CrusherCard, value: string) => {
    pushHistory(data);
    const newCrusher = [...data.crusher];
    newCrusher[index] = { ...newCrusher[index], [key]: value };
    setData({ ...data, crusher: newCrusher });
    futureRef.current = [];
    forceUpdate(n => n + 1);
  };

  const updateHighlightSlide = (index: number, key: keyof HighlightSlide, value: string) => {
    pushHistory(data);
    const newHighlights = [...data.highlights];
    newHighlights[index] = { ...newHighlights[index], [key]: value };
    setData({ ...data, highlights: newHighlights });
    futureRef.current = [];
    forceUpdate(n => n + 1);
  };

  const deleteCrusherCard = (idx: number) => {
    showConfirm('🗑️', `ลบ Card ?`, `ต้องการลบ "${data.crusher[idx]?.title || `Card ${idx + 1}`}" หรือไม่?`, () => {
      setDataWithHistory({ ...data, crusher: data.crusher.filter((_, i) => i !== idx) });
      setActiveCardIndex(undefined);
      setExpandedCards(new Set());
    });
  };

  const deleteHighlightSlide = (idx: number) => {
    showConfirm('🗑️', `ลบ Slide ?`, `ต้องการลบ "${data.highlights[idx]?.title || `Slide ${idx + 1}`}" หรือไม่?`, () => {
      setDataWithHistory({ ...data, highlights: data.highlights.filter((_, i) => i !== idx) });
      setActiveCardIndex(undefined);
      setExpandedCards(new Set());
    });
  };

  const addItem = () => {
    pushHistory(data);
    if (activeTab === "crusher") {
      const newCard: CrusherCard = { title: "New Crusher Card", description: "Description...", footer: "", image: "" };
      const newCrusher = [...data.crusher, newCard];
      setData({ ...data, crusher: newCrusher });
      const newIndex = newCrusher.length - 1;
      setActiveCardIndex(newIndex);
      setExpandedCards(new Set([newIndex]));
      setTimeout(() => {
        document.getElementById(`edit-card-${newIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const newSlide: HighlightSlide = { title: "New Highlight Slide", description: "Description...", subDescription: "Sub Description...", image: "", badge: "" };
      const newHighlights = [...data.highlights, newSlide];
      setData({ ...data, highlights: newHighlights });
      const newIndex = newHighlights.length - 1;
      setActiveCardIndex(newIndex);
      setExpandedCards(new Set([newIndex]));
      setTimeout(() => {
        document.getElementById(`edit-card-${newIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
    futureRef.current = [];
    forceUpdate(n => n + 1);
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row h-screen font-[family-name:var(--font-kanit)] bg-gray-50 overflow-hidden">
      {/* PREVIEW PANEL - Scaled 80% */}
      <div className="flex-1 bg-white overflow-hidden border-r-2 border-gray-100 relative">
         <Link href="/" className="absolute top-4 left-4 z-10 bg-black/70 hover:bg-black/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow flex items-center gap-2 transition active:scale-95 cursor-pointer">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           กลับไปหน้าหลัก
         </Link>
         {/* Container responsive size 125% scaled down to 80 to fit perfectly - scrollbar hidden */}
         <div className="w-[125%] h-[125%] origin-top-left scale-80 bg-white shadow-inner overflow-y-auto pb-40 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {activeTab === "crusher" && (
                <div className="w-full h-full pt-10">
                    <Crusher 
                        previewData={data.crusher} 
                        activeIndex={activeCardIndex}
                        onSelect={handleCardSelect}
                        disableAnimation={true}
                    />
                </div>
            )}
            {activeTab === "highlights" && (
                <div className="w-full h-full">
                    <Highlights 
                        previewData={data.highlights}
                        activeIndex={activeCardIndex}
                        onSelect={handleCardSelect}
                        disableAnimation={true}
                    />
                </div>
            )}
         </div>
      </div>

      {/* EDIT PANEL */}
      <div className="w-full lg:w-[450px] bg-white h-screen overflow-y-auto p-6 shadow-xl flex flex-col z-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Website Editor</h1>
          <div className="flex gap-1">
            <button
              onClick={() => { undo(); forceUpdate(n => n + 1); }}
              disabled={historyRef.current.length === 0}
              title="Undo"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" /></svg>
            </button>
            <button
              onClick={() => { redo(); forceUpdate(n => n + 1); }}
              disabled={futureRef.current.length === 0}
              title="Redo"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2M21 10l-4-4M21 10l-4 4" /></svg>
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
          <button 
            onClick={() => handleTabChange("crusher")} 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'crusher' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Crusher
          </button>
          <button 
            onClick={() => handleTabChange("highlights")} 
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activeTab === 'highlights' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Highlights
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-3">
          {/* CRUSHER CARDS */}
          {activeTab === "crusher" && data.crusher?.map((card, idx) => {
            const isOpen = expandedCards.has(idx);
            return (
             <div 
                key={idx} 
                id={`edit-card-${idx}`}
                className={`border rounded-xl shadow-sm transition-all duration-300 ${activeCardIndex === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50/50'}`}
             >
                {/* Collapsible Header */}
                <div className="flex items-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="flex-1 flex items-center gap-2 text-left min-w-0 cursor-pointer hover:opacity-80 transition group/header"
                  >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 group-hover/header:bg-blue-200 transition-colors">{idx + 1}</span>
                      <span className="font-bold text-gray-700 flex-1 truncate text-sm group-hover/header:text-blue-600 transition-colors">{card.title || `Card ${idx + 1}`}</span>
                      <svg className={`w-4 h-4 text-gray-400 group-hover/header:text-blue-500 transition-all flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button type="button" onClick={() => deleteCrusherCard(idx)} title="ลบ" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 hover:scale-105 active:scale-95 transition cursor-pointer flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>

                {/* Collapsible Content */}
                {isOpen && (
                <div className="px-5 pb-5 space-y-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Title</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={card.title} onChange={e => updateCrusherCard(idx, 'title', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                        <textarea className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none" rows={3} value={card.description} onChange={e => updateCrusherCard(idx, 'description', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Footer / Badge</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={card.footer || ''} onChange={e => updateCrusherCard(idx, 'footer', e.target.value)} />
                    </div>
                    <ImageUpload
                      currentSrc={typeof card.image === 'string' ? card.image : ''}
                      onUploaded={(url) => updateCrusherCard(idx, 'image', url)}
                    />
                </div>
                )}
             </div>
            );
          })}

          {/* HIGHLIGHTS SLIDES */}
          {activeTab === "highlights" && data.highlights?.map((slide, idx) => {
            const isOpen = expandedCards.has(idx);
            return (
             <div 
                key={idx} 
                id={`edit-card-${idx}`}
                className={`border rounded-xl shadow-sm transition-all duration-300 ${activeCardIndex === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50/50'}`}
             >
                {/* Collapsible Header */}
                <div className="flex items-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="flex-1 flex items-center gap-2 text-left min-w-0 cursor-pointer hover:opacity-80 transition group/header"
                  >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs flex-shrink-0 group-hover/header:bg-blue-200 transition-colors">{idx + 1}</span>
                      <span className="font-bold text-gray-700 flex-1 truncate text-sm group-hover/header:text-blue-600 transition-colors">{slide.title || `Slide ${idx + 1}`}</span>
                      <svg className={`w-4 h-4 text-gray-400 group-hover/header:text-blue-500 transition-all flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button type="button" onClick={() => deleteHighlightSlide(idx)} title="ลบ" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 hover:scale-105 active:scale-95 transition cursor-pointer flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>

                {/* Collapsible Content */}
                {isOpen && (
                <div className="px-5 pb-5 space-y-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Title</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={slide.title} onChange={e => updateHighlightSlide(idx, 'title', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={slide.description} onChange={e => updateHighlightSlide(idx, 'description', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sub Description</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={slide.subDescription} onChange={e => updateHighlightSlide(idx, 'subDescription', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Badge (Optional)</label>
                        <input className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={slide.badge || ''} onChange={e => updateHighlightSlide(idx, 'badge', e.target.value)} />
                    </div>
                    <ImageUpload
                      currentSrc={typeof slide.image === 'string' ? slide.image : ''}
                      onUploaded={(url) => updateHighlightSlide(idx, 'image', url)}
                    />
                </div>
                )}
             </div>
             );
          })}
          {/* Add Item Button */}
          <button
            type="button"
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-blue-400 hover:text-blue-500 active:scale-[0.98] transition cursor-pointer bg-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            เพิ่ม {activeTab === "crusher" ? "Card" : "Slide"} ใหม่
          </button>
        </div>

        <div className="mt-4 pt-5 border-t border-gray-200">
           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Admin Password</label>
           <input 
             type="password" 
             placeholder="Enter password to save..." 
             value={password}
             onChange={e => setPassword(e.target.value)} 
             className="w-full border border-gray-200 p-3 mb-4 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" 
           />
           <button onClick={handleSave} className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition  cursor-pointer shadow-md">
             บันทึกการเปลี่ยนแปลง (Save)
           </button>
        </div>
      </div>
    </div>

    {/* Modal */}
    <Modal modal={modal} onClose={() => setModal(null)} />

    {/* Animation keyframe */}
    <style jsx global>{`
      @keyframes modalIn {
        from { opacity: 0; transform: scale(0.9) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `}</style>
    </>
  );
}
