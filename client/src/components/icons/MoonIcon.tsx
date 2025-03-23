import { cn } from "@/lib/utils";

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-full", className)}>
      <path
        d="M6.75125 2.7068A7.53775 7.53775 0 0 0 12.548 11.8041a5.5567 5.5567 0 0 1 -3.98745 1.69465c-0.06925 0 -0.1391 0.00255 -0.2089 0a5.5472 5.5472 0 0 1 -1.6004 -10.79195M7.49 1.5a0.5012 0.5012 0 0 0 -0.0873 0.0078A6.54795 6.54795 0 0 0 8.315 14.49865c0.08205 0.003 0.1641 0 0.24545 0a6.5362 6.5362 0 0 0 5.351 -2.7778 0.5047 0.5047 0 0 0 -0.39165 -0.7822A6.54 6.54 0 0 1 7.9446 2.19 0.50745 0.50745 0 0 0 7.49 1.5Z"
        fill="currentColor"
        strokeWidth="0.5"
      ></path>
      <path d="M0 0h16v16H0Z" fill="none" strokeWidth="0.5"></path>
    </svg>
  );
}
