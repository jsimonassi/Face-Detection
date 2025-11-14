export type UserAction = "moveUp" | "moveDown" | "goBack" | "selection" | "none";

export interface FaceMetrics {
  pitchAngle: number;
  leftEyeOpenProbability: number;
  rightEyeOpenProbability: number;
  yawAngle: number;
}