import Image from "next/image";

import { FadeIn } from "@/components/ui/fade-in";
import type { HeadingTagProps } from "@/types";

const HeadingTag = ({ text, icon, text2, delay }: HeadingTagProps) => {
  return (
    <FadeIn
      delay={delay}
      className="group bg-app-badge-bg text-app-primary-text flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-medium lg:px-6 lg:py-3 lg:text-sm"
    >
      {text}{" "}
      {icon && (
        <Image
          className="h-4 w-4 transition-all group-hover:animate-[spin_5s_linear_infinite] lg:h-5 lg:w-5"
          src={icon}
          alt={text2 ? `${text2} logo` : `${text} icon`}
          width={15}
          height={15}
        />
      )}{" "}
      {text2 && text2}
    </FadeIn>
  );
};

export default HeadingTag;
