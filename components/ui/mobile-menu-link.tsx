import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import type { MobileMenuLinkProps } from "@/types";

const MobileMenuLink = ({
  href,
  target,
  label,
  icon,
  onClick,
  index = 0,
}: MobileMenuLinkProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full"
    >
      <Link
        href={href}
        className="group text-app-mobile-menu-text hover:bg-app-mobile-menu-hover-bg hover:text-app-mobile-menu-hover-text flex w-full items-center justify-center gap-3 rounded-lg p-2 text-lg font-medium transition-colors"
        onClick={onClick}
        target={target}
      >
        {label}
        {icon && (
          <Image
            src={icon.src}
            alt={icon.alt}
            width={17}
            height={17}
            className="mt-0.5 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </Link>
    </motion.div>
  );
};

export default MobileMenuLink;
