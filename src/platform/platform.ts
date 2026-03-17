import { platform } from "os";

export const isMacOS = platform() === "darwin";
export const isWindows = platform() === "win32";
