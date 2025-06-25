'use client';

import { useWindowWidth } from '@react-hook/window-size';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';

import { animation } from './HeroSection';
import { getHosturl } from '@/lib/utils';

const RunningBanner = () => {
  const width = useWindowWidth()

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: width < 1024 ? 1 : 2,
      spacing: 0,
    },
    renderMode: 'performance',
    drag: false,
    created(s: {
      moveToIdx: (
        arg0: number,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
    }) {
      s.moveToIdx(5, true, animation);
    },
    updated(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s: {
      moveToIdx: (
        arg0: any,
        arg1: boolean,
        arg2: { duration: number; easing: (t: number) => number },
      ) => void;
      track: { details: { abs: number } };
    }) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  return (
    <div
      ref={ref}
      className="keen-slider h-10 bg-gradient-to-r from-[#19191b] to-[#19191b] text-white text-[14px]"
    >
      <Link target='_blank' href={`/`} className="keen-slider__slide flex items-center text-nowrap ">
        ⚡ New name. Bigger vision. STRKFarm is now Troves
      </Link>

      <Link target='_blank' href={`/`} className="keen-slider__slide items-center text-nowrap hidden lg:flex">
        ⚡ New name. Bigger vision. STRKFarm is now Troves
      </Link>

      <Link target='_blank' href={`/`} className="keen-slider__slide items-center text-nowrap hidden lg:flex" >
        ⚡ New name. Bigger vision. STRKFarm is now Troves
      </Link>
    </div >
  );
};

export default RunningBanner;
