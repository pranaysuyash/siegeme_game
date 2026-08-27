import { describe, expect, it } from "vitest";
import { DEFAULT_AUDIO_SETTINGS, normalizeAudioSettings } from "@/game/client/audio";

describe("audio settings", () => {
  it("normalizes malformed volume and mute values", () => {
    expect(normalizeAudioSettings({ muted: true, effectsVolume: 2 })).toEqual({ muted: true, effectsVolume: 1 });
    expect(normalizeAudioSettings({ effectsVolume: -1 })).toEqual({ muted: false, effectsVolume: 0 });
    expect(normalizeAudioSettings({ effectsVolume: Number.NaN })).toEqual(DEFAULT_AUDIO_SETTINGS);
  });
});
