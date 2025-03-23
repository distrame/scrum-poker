import { DarKThemeToggle } from "@/components/DarkThemeToggle";
import { GithubLink } from "@/components/GithubLink";
import { PlayerSettingsButton } from "@/components/PlayerSettingsButton";

export function HeaderSettings() {
  return (
    <div className="flex h-full items-center gap-4 py-1">
      <GithubLink />

      <PlayerSettingsButton />

      <DarKThemeToggle />
    </div>
  );
}
