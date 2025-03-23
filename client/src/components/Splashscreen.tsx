import { Logo } from "./icons";

export function Splashscreen() {
  return (
    <div className="flex h-screen w-screen animate-pulse flex-col items-center justify-center">
      <Logo className="size-16" />
    </div>
  );
}
