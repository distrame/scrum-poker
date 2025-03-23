import { GithubLogo } from "@/components/icons";

export function GithubLink() {
  return (
    <a
      className="size-full"
      href="https://github.com/distrame/scrum-poker"
      target="_blank"
      rel="noreferrer"
    >
      <GithubLogo />
    </a>
  );
}
