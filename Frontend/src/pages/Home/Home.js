import React, { useRef } from "react";
import "./Home.css";
import { useScroll, useTransform, motion } from "framer-motion";
import HomeHeader from "../../components/Home/HomeHeader/HomeHeader";
import DescriptionSection from "../../components/Home/DescriptionSection/DescriptionSection";
function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "170%"]);
  return (
    <div className="home-container">
      <div className="banner-container" ref={ref}>
        <motion.div style={{ y: textY }} className="home-title-container">
          <HomeHeader />
        </motion.div>
        <motion.div
          style={{ y: backgroundY }}
          className="linear-gradient-background"
        />
      </div>

      <div className="content-container-home">
        <div className="spacer layered-waves">
          <i class="fas fa-caret-down"></i>
        </div>
        <DescriptionSection />
      </div>
    </div>
  );
}

export default Home;
