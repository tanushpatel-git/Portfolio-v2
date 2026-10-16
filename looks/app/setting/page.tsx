"use client";

import { useCallback, useMemo, useRef, type ChangeEvent } from "react";
import { useSitePreferences } from "@/component/SitePreferences";

function WaveMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex h-10 items-center gap-[3px] ${className}`}>
      {[24, 12, 31, 17, 25, 10, 22].map((height, index) => <i key={index} className="block w-[5px] rounded-full bg-current" style={{ height }} />)}
    </span>
  );
}

function SettingSwitch({
  title,
  description,
  checked,
  onChange,
  onInteract,
  disabled = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  onInteract: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={`flex min-h-[82px] items-center justify-between gap-4 rounded-[22px] bg-[#f3f3f3] px-5 py-4 transition ${disabled ? "opacity-45" : ""}`}>
      <div className="min-w-0">
        <h3 className="m-0 text-sm font-semibold tracking-[-0.02em] sm:text-base">{title}</h3>
        <p className="mb-0 mt-1 max-w-lg text-xs leading-[1.45] text-[#777] sm:text-sm">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => {
          onInteract();
          onChange(!checked);
        }}
        className={`relative h-10 w-[68px] shrink-0 rounded-full p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0875ef] disabled:cursor-not-allowed ${checked ? "bg-[#3c3c3c]" : "bg-[#dedede]"}`}
      >
        <span className={`block size-8 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.12)] transition-transform ${checked ? "translate-x-7" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function Setting() {
  const { preferences, updatePreference, resetPreferences, preferencesLoaded } = useSitePreferences();
  const settingSoundRef = useRef<HTMLAudioElement>(null);
  const playSettingSound = useCallback(() => {
    const audio = settingSoundRef.current;
    if (!audio || !preferences.soundsEnabled || !preferences.navigationSounds || preferences.volume <= 0) return;
    audio.volume = preferences.volume / 100;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, [preferences.navigationSounds, preferences.soundsEnabled, preferences.volume]);
  const setToggle = useCallback((key: "soundsEnabled" | "navigationSounds" | "articleSounds" | "musicEnabled" | "musicAutoplay", value: boolean) => {
    updatePreference(key, value);
  }, [updatePreference]);
  const setVolume = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updatePreference("volume", Number(event.target.value));
  }, [updatePreference]);
  const soundDisabled = !preferences.soundsEnabled;
  const soundItems = useMemo(() => [
    { key: "navigationSounds" as const, title: "Navigation", description: "A soft tick as you move between sections.", checked: preferences.navigationSounds },
    { key: "articleSounds" as const, title: "Article turns", description: "A page-turn sound when About articles change.", checked: preferences.articleSounds },
    { key: "musicEnabled" as const, title: "About soundtrack", description: "Allow music playback in the About section.", checked: preferences.musicEnabled },
    { key: "musicAutoplay" as const, title: "Autoplay music", description: "Start the soundtrack when an article opens.", checked: preferences.musicAutoplay },
  ], [preferences.navigationSounds, preferences.articleSounds, preferences.musicEnabled, preferences.musicAutoplay]);

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

        <section aria-labelledby="sound-settings" className="border-t border-[#e7e7e7] pt-7 sm:pt-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">01 / AUDIO</p>
              <h2 id="sound-settings" className="m-0 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">Sound controls</h2>
            </div>
            <span className="rounded-full bg-[#ededed] px-3 py-1.5 text-xs font-medium text-[#666]">{preferences.soundsEnabled ? "Sound on" : "Sound off"}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <SettingSwitch title="Sound on this website" description="Master control for clicks, article turns and music." checked={preferences.soundsEnabled} onInteract={playSettingSound} onChange={(value) => setToggle("soundsEnabled", value)} />
            {soundItems.map((item) => (
              <SettingSwitch key={item.key} title={item.title} description={item.description} checked={item.checked} disabled={soundDisabled || (item.key === "musicAutoplay" && !preferences.musicEnabled)} onInteract={playSettingSound} onChange={(value) => setToggle(item.key, value)} />
            ))}
          </div>

          <div className={`mt-3 rounded-[22px] bg-[#f3f3f3] px-5 py-5 sm:px-6 ${soundDisabled ? "opacity-45" : ""}`}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="m-0 text-sm font-semibold sm:text-base">Volume</h3>
                <p className="mb-0 mt-1 text-xs text-[#777] sm:text-sm">Set the overall sound level.</p>
              </div>
              <output htmlFor="sound-volume" className="rounded-xl bg-white px-3 py-1.5 text-sm font-medium tabular-nums">{preferences.volume}%</output>
            </div>
            <input id="sound-volume" aria-label="Sound volume" type="range" min="0" max="100" step="1" value={preferences.volume} onChange={setVolume} disabled={soundDisabled} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#dedede] accent-[#3c3c3c] disabled:cursor-not-allowed" />
            <div className="mt-2 flex justify-between text-[10px] font-medium text-[#999]"><span>QUIET</span><span>MAXIMUM</span></div>
          </div>
        </section>

      </div>
    </main>
  );
}
