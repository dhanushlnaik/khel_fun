import React from "react";
import type { FC } from "react";

const HeroText: FC = () => (
  <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
    <h1 style={{ fontFamily: 'var(--font-knight-warrior), sans-serif' }} className="text-[12rem] leading-none text-center">khel.fun</h1>
  </div>
);

export default HeroText;