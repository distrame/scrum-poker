import { cn } from "@/lib/utils";
import { useDarkMode } from "@/components/DarkModeProvider";
import { SunIcon, MoonIcon } from "@/components/icons";

export function DarKThemeToggle({ className }: { className?: string }) {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div
      className={cn("size-full cursor-pointer", className)}
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </div>
  );
}
