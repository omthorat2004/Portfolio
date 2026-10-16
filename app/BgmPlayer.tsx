"use client";

import { useEffect, useRef, useState } from "react";
import toggleStyles from "./ThemeToggle.module.css";
import styles from "./BgmPlayer.module.css";

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
    <div className={styles.wrap} ref={wrapRef}>
      <audio ref={audioRef} src={TRACKS[0].src} loop preload="none" />
      <button
        type="button"
        className={`${toggleStyles.toggle} ${playing ? toggleStyles.playing : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Background music options"
      >
        <span className={toggleStyles.iconSpin} key={String(playing)}>
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
        <div className={styles.panel}>
          <p className={styles.sectionLabel}>Track</p>
          <div className={styles.tracks}>
            {TRACKS.map((track, index) => (
              <button
                key={track.name}
                type="button"
                className={`${styles.trackButton} ${index === trackIndex ? styles.trackActive : ""}`}
                onClick={() => {
                  selectTrack(index);
                  if (!playing) play();
                }}
              >
                <span className={styles.dot} />
                {track.name}
              </button>
            ))}
          </div>

          <div className={styles.playRow}>
            <button type="button" className={styles.playButton} onClick={togglePlay}>
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

          <div className={styles.volumeRow}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
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
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
