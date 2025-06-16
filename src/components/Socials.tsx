"use client";

import clsx from "clsx";
import Link from "next/link";
import { FadeIn, FadeInStagger } from "./FadeIn";
import Button from "./Button";
import LinkedinIcon from "@/icons/linkedin";
import GitHubIcon from "@/icons/github";

export const socialMediaProfiles = [
  { title: "Linkedin", href: "https://www.linkedin.com/in/subhayu-das/" },
  { title: "GitHub", href: "https://github.com/subhayudas" },
];

export default function Socials({
  className,
  showContactMe = true,
}: {
  className?: string;
  showContactMe?: boolean;
}) {
  return (
    <FadeInStagger
      role="list"
      className={clsx("flex gap-x-4 text-white mt-5", className)}
    >
      {socialMediaProfiles.map(({ title, href }) => (
        <FadeIn key={title}>
          <Link
            href={href}
            target="_blank"
            aria-label={title}
            className="transition hover:text-white/80 duration-200"
          >
            {title === "Linkedin" && (
              <LinkedinIcon className="h-6 w-6 fill-current" />
            )}
            {title === "GitHub" && (
              <GitHubIcon className="h-6 w-6 fill-current" />
            )}
          </Link>
        </FadeIn>
      ))}
      {showContactMe && (
        <FadeIn>
          <Button
            className="flex items-center gap-x-2"
            href="/#contact"
            variant="secondary"
            arrow="right"
          >
            Contact Me
          </Button>
        </FadeIn>
      )}
    </FadeInStagger>
  );
}
