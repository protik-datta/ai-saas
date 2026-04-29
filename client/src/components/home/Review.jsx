import React, { useRef, useEffect } from "react";
import Container from "../common/Container";
import fullStar from "../../assets/star_icon.svg";
import fadedStar from "../../assets/star_dull_icon.svg";
import userPic from "../../assets/profile_img_1.png";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Khan",
      role: "Digital Marketer",
      star: 5,
      review:
        "This tool completely changed how I write ad copy. I can now create high-converting campaigns in minutes instead of hours.",
    },
    {
      id: 2,
      name: "Rahim Ahmed",
      role: "Startup Founder",
      star: 4,
      review:
        "As a founder, I don't have time to write everything. CopyAI helps me generate landing pages and emails effortlessly.",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Content Creator",
      star: 5,
      review:
        "I love how easy it is to generate social media posts. It keeps my content consistent and saves me so much time.",
    },
    {
      id: 4,
      name: "Tanvir Hasan",
      role: "Freelancer",
      star: 4,
      review:
        "Writing client content used to be stressful. Now I can deliver faster and better quality work using AI tools.",
    },
    {
      id: 5,
      name: "Michael Lee",
      role: "Email Marketer",
      star: 5,
      review:
        "The email generator is a game changer. My open rates improved significantly after using this platform.",
    },
  ];

  const extendedReviews = [
    ...reviews.map((r) => ({ ...r, uid: `clone-end-${r.id}` })),
    ...reviews.map((r) => ({ ...r, uid: `original-${r.id}` })),
    ...reviews.map((r) => ({ ...r, uid: `clone-start-${r.id}` })),
  ];

  const carouselRef = useRef(null);
  const isJumping = useRef(false);
  const CARD_WIDTH = 360;

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = reviews.length * CARD_WIDTH;
  }, [reviews.length]);

  const scrollSlide = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * CARD_WIDTH, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el || isJumping.current) return;

    const totalOriginalWidth = reviews.length * CARD_WIDTH;

    if (el.scrollLeft < totalOriginalWidth * 0.5) {
      isJumping.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft += totalOriginalWidth;
      void el.offsetLeft;
      el.style.scrollBehavior = "smooth";
      isJumping.current = false;
    }

    if (el.scrollLeft >= totalOriginalWidth * 2) {
      isJumping.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= totalOriginalWidth;
      void el.offsetLeft;
      el.style.scrollBehavior = "smooth";
      isJumping.current = false;
    }
  };

  const StarRating = ({ stars }) => {
    return (
      <div className="flex items-center mt-2 gap-1">
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src={index < stars ? fullStar : fadedStar}
            alt="star"
            className="w-3 h-3 object-contain"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-14 sm:py-16 md:py-20">
      {/* Header */}
      <Container>
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Loved by Creators & Marketers Worldwide
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            See how people are using AI to create high-converting content
            faster, save time, and grow their businesses effortlessly.
          </p>
        </div>
      </Container>

      {/* Carousel */}
      <div className="relative mt-10">
        {/* Left Arrow */}
        <button
          onClick={() => scrollSlide(-1)}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 sm:w-11 sm:h-11
            flex items-center justify-center
            bg-white text-gray-600 rounded-full
            shadow-[0_4px_20px_rgba(0,0,0,0.12)]
            border border-gray-100
            hover:bg-gray-50 hover:text-gray-900 hover:shadow-[0_6px_24px_rgba(0,0,0,0.16)]
            hover:scale-105 active:scale-95
            transition-all duration-200"
          aria-label="Previous"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollSlide(1)}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 sm:w-11 sm:h-11
            flex items-center justify-center
            bg-white text-gray-600 rounded-full
            shadow-[0_4px_20px_rgba(0,0,0,0.12)]
            border border-gray-100
            hover:bg-gray-50 hover:text-gray-900 hover:shadow-[0_6px_24px_rgba(0,0,0,0.16)]
            hover:scale-105 active:scale-95
            transition-all duration-200"
          aria-label="Next"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Cards */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 py-4 px-10 sm:px-16"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
          }}
        >
          {extendedReviews.map((r) => (
            <div
              key={r.uid}
              className="min-w-70 sm:min-w-75 md:min-w-85 group p-6 sm:p-7 rounded-xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <StarRating stars={r.star} />
              <p className="mt-6 text-[#727272] text-[14px] font-normal leading-5 pr-6">
                "{r.review}"
              </p>
              <div className="border-b border-b-[#C7C7C7] mt-8"></div>
              <div className="mt-7 flex items-center gap-6">
                <img src={userPic} alt="user" className="w-11 object-cover" />
                <div>
                  <h3 className="text-[#656565] font-outfit text-[14px] font-medium">
                    {r.name}
                  </h3>
                  <p className="text-[#9E9E9E] font-outfit text-[12px] font-normal leading-normal">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
