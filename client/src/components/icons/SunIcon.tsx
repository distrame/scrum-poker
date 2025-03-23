import { cn } from "@/lib/utils";

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-full", className)}
      viewBox="-0.5 -0.5 16 16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5 7.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0"
        strokeWidth="1"
      ></path>
      <path
        d="M1.875 7.5h0.625m5 -5.625v0.625m5 5h0.625m-5.625 5v0.625M3.5 3.5l0.4375 0.4375m7.5625 -0.4375 -0.4375 0.4375m0 7.125 0.4375 0.4375m-7.5625 -0.4375 -0.4375 0.4375"
        strokeWidth="1"
      ></path>
    </svg>
  );
}
