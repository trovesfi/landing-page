import Image from "next/image";

import { cn } from "@/lib/utils";
import type { TestimonialCardProps } from "@/types";

const TestimonialCard = ({
  quote,
  author,
  role,
  rating = 5,
  avatar = "/avatars/people.svg",
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "border-app-testimonial-card-border from-app-testimonial-card-start to-app-testimonial-card-end flex h-full w-full flex-col justify-between rounded-3xl border bg-linear-to-b px-5 py-5 lg:px-6 lg:py-7",
        className,
      )}
    >
      <div className="w-full space-y-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <Image
              key={`${author}-star-${index}`}
              src="/icons/starred.svg"
              alt="Rating star"
              width={16}
              height={16}
            />
          ))}
        </div>

        <blockquote className="text-app-text-secondary pb-5 text-xs lg:text-sm">
          <p>“{quote}”</p>
        </blockquote>
      </div>

      <div className="border-app-border flex items-center gap-2 border-t pt-2 lg:gap-3">
        <div className="border-app-testimonial-accent w-fit rounded-full border p-1.5">
          <Image
            src={avatar}
            alt={`${author} avatar`}
            width={18}
            height={18}
            className="size-[12px] lg:size-[18px]"
          />
        </div>

        <div className="flex flex-col items-start">
          <cite className="text-app-text-primary text-xs font-semibold not-italic lg:text-sm">
            {author}
          </cite>
          <p className="text-app-text-stat text-[10px] font-semibold lg:text-xs">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
