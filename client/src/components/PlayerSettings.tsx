import { Input } from "./ui";

export function PlayerSettings({
  currentPlayerName,
  setCurrentPlayerName,
}: {
  currentPlayerName: string;
  setCurrentPlayerName: (name: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-nowrap">
      Player Name:
      <Input
        type="text"
        value={currentPlayerName}
        onChange={(e) => setCurrentPlayerName(e.target.value)}
      />
    </label>
  );
}
