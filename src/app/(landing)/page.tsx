'use client';

import React, { useState } from "react";
import type { FC } from "react";
import IntroMask from "./_components/IntroMask";
import useIntroAnimation from "@/hooks/useIntroAnimation";
import LandingPage from "./_components/LandingPage";

const Home: FC = () => {
    const [showContent, setShowContent] = useState(false);
    useIntroAnimation(setShowContent);

    return (
        <>
            {!showContent && <IntroMask />}
            {showContent && <LandingPage />}
        </>
    );
};

export default Home;