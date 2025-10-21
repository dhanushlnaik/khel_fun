import React from "react";
import type { FC } from "react";
import type { HeroTextContent } from "@/content/heroText"; 
import heroText from "@/content/heroText";

const CharacterSection: FC = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <div className="cntnr flex text-white w-full h-[80%]">
      <div className="limg relative w-1/2 h-full">
        <img
          className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src="./imag.png"
          alt="Character illustration or main image"
        />
      </div>
      <div className="rg w-[30%] py-30">
        <h1 className="text-8xl">{heroText.heading1}</h1>
        <h1 className="text-8xl">{heroText.heading2}</h1>
        {(heroText as HeroTextContent).paragraphs.map((para, i) => (
          <p key={i} className="mt-5 text-xl font-[Helvetica_Now_Display]">
            {para}
          </p>
        ))}
        <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
          Download Now
        </button>
      </div>
    </div>
  </div>
);

export default CharacterSection;