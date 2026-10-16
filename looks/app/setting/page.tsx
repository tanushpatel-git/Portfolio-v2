"use client";

import { useCallback, useRef } from "react";
import { useSitePreferences } from "@/component/SitePreferences";

function WaveMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex h-10 items-center gap-[3px] ${className}`}>
      {[24, 12, 31, 17, 25, 10, 22].map((height, index) => <i key={index} className="block w-[5px] rounded-full bg-current" style={{ height }} />)}
    </span>
  );
}

export default function Setting() {
  const { resetPreferences } = useSitePreferences();
  const settingSoundRef = useRef<HTMLAudioElement>(null);
  const playSettingSound = useCallback(() => {
    const audio = settingSoundRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);

  return (
    <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white text-[#3e3e3e]">
      <audio ref={settingSoundRef} src="/SoundBar/engineering-select.wav" preload="auto" className="hidden" />
      <div className="mx-auto w-full max-w-[1080px] px-5 pb-12 pt-7 sm:px-10 sm:pb-16 sm:pt-10 lg:px-16">
        <header className="flex items-start justify-between gap-4">
          <div>
            <WaveMark className="text-[#414141]" />
            <p className="mb-0 mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#999]">TLUX · PORTFOLIO</p>
          </div>
          <button type="button" onClick={() => { playSettingSound(); resetPreferences(); }} className="mt-1 rounded-full bg-[#ededed] px-4 py-2.5 text-xs font-semibold transition hover:bg-[#e2e2e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0875ef] sm:px-5 sm:text-sm">Reset</button>
        </header>

        <div className="mb-10 mt-12 sm:mb-14 sm:mt-[clamp(4rem,10vh,7.5rem)]">
          <p className="mb-2 text-sm font-medium text-[#9a9a9a]">A little more comfortable</p>
          <h1 className="m-0 max-w-3xl text-[clamp(3.15rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#c7c7c7]">Make it yours<span className="text-[#414141]">.</span></h1>
          <p className="mb-0 mt-5 max-w-xl text-sm leading-6 text-[#777] sm:text-base">Choose how the portfolio sounds and moves. Your preferences stay saved on this device.</p>
        </div>
      </div>
    </main>
  );
}
