export type AttackFingerprintInput = {
  commandId: string;
  reignId: string;
  turnId: string;
  expectedWorldVersion: number;
  simulationVersion: string;
  projectile?: "STANDARD" | "BREAKER";
  yaw: number;
  elevation: number;
  power: number;
};

/**
 * Stable request identity for retries. Transport serialization can introduce
 * harmless sub-micro-unit float noise, but a materially different aim remains
 * a different command and must be rejected for a reused commandId.
 */
export function attackCommandFingerprint(command: AttackFingerprintInput) {
  const quantize = (value: number) => Math.round(value * 1_000_000) / 1_000_000;
  return JSON.stringify({
    commandId: command.commandId,
    reignId: command.reignId,
    turnId: command.turnId,
    expectedWorldVersion: command.expectedWorldVersion,
    simulationVersion: command.simulationVersion,
    projectile: command.projectile ?? "STANDARD",
    yaw: quantize(command.yaw),
    elevation: quantize(command.elevation),
    power: quantize(command.power),
  });
}
