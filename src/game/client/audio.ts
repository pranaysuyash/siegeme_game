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
