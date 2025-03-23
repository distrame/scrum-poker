import { cn } from "@/lib/utils";

export function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-full", className)}
      viewBox="-0.5 -0.5 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.5 4.375h-5.625" strokeWidth="1"></path>
      <path d="M8.75 10.625H3.125" strokeWidth="1"></path>
      <path
        d="M8.75 10.625a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 1 0 -3.75 0"
        strokeWidth="1"
      ></path>
      <path
        d="M2.5 4.375a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 1 0 -3.75 0"
        strokeWidth="1"
      ></path>
    </svg>
  );
}
