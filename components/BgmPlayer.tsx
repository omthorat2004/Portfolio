"use client";

import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { name: "Heroic", src: "/bgm/heroic.mp3" },
  { name: "Lofi", src: "/bgm/lofi.mp3" },
  { name: "Synthwave", src: "/bgm/synthwave.mp3" },
  { name: "Focus", src: "/bgm/focus.mp3" },
];

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.play().catch(() => {});
    setPlaying(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio || index === trackIndex) return;
    setTrackIndex(index);
    const wasPlaying = playing;
    audio.src = TRACKS[index].src;
    audio.load();
    if (wasPlaying) play();
  };

  return (
    <div className="relative" ref={wrapRef}>
      <audio ref={audioRef} src={TRACKS[0].src} loop preload="none" />
      <button
        type="button"
        className={`toggle-btn flex items-center justify-center w-8 h-8 border border-border bg-surface text-fg cursor-pointer transition-[border-color,transform] duration-150 ease-in-out hover:border-current hover:-translate-y-px active:translate-y-0 active:scale-[0.92] [&_svg]:w-[15px] [&_svg]:h-[15px] ${playing ? "toggle-playing" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Background music options"
      >
        <span className="icon-spin-in flex" key={String(playing)}>
          {playing ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path strokeLinecap="round" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path strokeLinecap="round" d="M16 9l5 6M21 9l-5 6" />
            </svg>
          )}
        </span>
      </button>

      {open ? (
        <div className="absolute top-11 right-0 z-10 w-[220px] p-4 bg-surface border border-border rounded-[10px] shadow-[0_16px_40px_var(--shadow-2)] font-sans">
          <p className="text-[0.6875rem] font-semibold tracking-[0.04em] text-muted mb-2">Track</p>
          <div className="flex flex-col gap-1 mb-4">
            {TRACKS.map((track, index) => (
              <button
                key={track.name}
                type="button"
                className={`flex items-center gap-2 w-full text-left px-[10px] py-[9px] rounded-[6px] text-[0.875rem] cursor-pointer transition-colors duration-150 ease-in-out group ${
                  index === trackIndex
                    ? "text-surface bg-fg font-semibold hover:text-surface hover:bg-fg"
                    : "text-muted hover:text-fg hover:bg-surface-alt"
                }`}
                onClick={() => {
                  selectTrack(index);
                  if (!playing) play();
                }}
              >
                <span
                  className={`flex-none w-1.5 h-1.5 rounded-full bg-current ${
                    index === trackIndex ? "opacity-100" : "opacity-35"
                  }`}
                />
                {track.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 py-[10px] px-0.5 border-t border-b border-border mb-3.5">
            <button
              type="button"
              className="flex items-center gap-[7px] text-[0.875rem] font-semibold text-fg bg-transparent border-none cursor-pointer [&_svg]:w-4 [&_svg]:h-4"
              onClick={togglePlay}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M8 5v14M16 5v14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 5l12 7-12 7V5Z" />
                </svg>
              )}
              {playing ? "Pause" : "Play"}
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="w-[15px] h-[15px] text-muted flex-none"
            >
              <path strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path strokeLinecap="round" d="M16.5 8.5a5 5 0 0 1 0 7" />
            </svg>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="flex-1 accent-fg h-[18px]"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
