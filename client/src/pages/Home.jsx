import React from "react";
import Banner from "../components/home/Banner";
import ToolPage from "../components/home/ToolPage";
import Review from "../components/home/Review";
import Subscription from "../components/home/Subscription";
import HowItWorks from "../components/home/HowItWorks";
import FAQ from "../components/home/FAQ";

const Home = () => {
  return (
    <>
      <Banner />
      <HowItWorks />
      <ToolPage />
      <Review />
      <Subscription />
      <FAQ />
    </>
  );
};

export default Home;
