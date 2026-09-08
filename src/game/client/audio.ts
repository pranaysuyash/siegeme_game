export type AudioSettings = { muted: boolean; effectsVolume: number };

export const AUDIO_SETTINGS_KEY = "siegeme:audio-settings";
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = { muted: false, effectsVolume: 0.8 };

export function normalizeAudioSettings(value: Partial<AudioSettings> | null | undefined): AudioSettings {
  return {
    muted: value?.muted === true,
    effectsVolume: Math.min(1, Math.max(0, typeof value?.effectsVolume === "number" && Number.isFinite(value.effectsVolume) ? value.effectsVolume : DEFAULT_AUDIO_SETTINGS.effectsVolume)),
  };
}

export function readAudioSettings(): AudioSettings {
  if (typeof window === "undefined") return DEFAULT_AUDIO_SETTINGS;
  try {
    const raw = window.localStorage.getItem(AUDIO_SETTINGS_KEY);
    return raw ? normalizeAudioSettings(JSON.parse(raw) as Partial<AudioSettings>) : DEFAULT_AUDIO_SETTINGS;
  } catch {
    return DEFAULT_AUDIO_SETTINGS;
  }
}

export function saveAudioSettings(settings: AudioSettings) {
  const normalized = normalizeAudioSettings(settings);
  if (typeof window === "undefined") return normalized;
  try { window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(normalized)); } catch {}
  window.dispatchEvent(new CustomEvent("siegeme:audio-settings", { detail: normalized }));
  return normalized;
}

let context: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

/** Called only by a player gesture; spectators are never forced into audio. */
export function unlockBattleAudio() {
  if (typeof window === "undefined" || readAudioSettings().muted) return;
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume().catch(() => {});
  } catch { /* Graphics and controls remain usable when audio is unavailable. */ }
}

export function playBattleSound(kind: "launch" | "stone" | "energy" | "core") {
  const settings = readAudioSettings();
  if (!context || context.state !== "running" || settings.muted || settings.effectsVolume <= 0) return;
  const now = context.currentTime;
  const energy = kind === "energy" || kind === "core";
  const duration = energy ? 0.44 : kind === "launch" ? 0.3 : 0.38;
  const tone = context.createOscillator();
  const gain = context.createGain();
  tone.type = energy ? "sine" : "triangle";
  tone.frequency.setValueAtTime(energy ? 740 : 130, now);
  tone.frequency.exponentialRampToValueAtTime(energy ? 220 : 38, now + duration);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(settings.effectsVolume * (energy ? 0.09 : 0.14), now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  tone.connect(gain).connect(context.destination);
  tone.start(now); tone.stop(now + duration);
  tone.onended = () => { tone.disconnect(); gain.disconnect(); };
  if (energy) return;
  if (!noiseBuffer) {
    noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.45), context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.sin(i * 127.1) * 43758.5453 % 1);
  }
  const noise = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  noise.buffer = noiseBuffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(kind === "launch" ? 1100 : 1800, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + duration);
  noiseGain.gain.setValueAtTime(settings.effectsVolume * 0.16, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  noise.connect(filter).connect(noiseGain).connect(context.destination);
  noise.start(now); noise.stop(now + duration);
  noise.onended = () => { noise.disconnect(); filter.disconnect(); noiseGain.disconnect(); };
}
