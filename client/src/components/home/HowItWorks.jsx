import React from "react";
import Container from "../common/Container";
import { ClipboardList, Sparkles, Rocket } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: ClipboardList,
      title: "Choose Your Tool",
      description:
        "Browse 18+ AI-powered tools built for marketers, creators, and founders. Pick the one that fits your task — from email writing to SEO optimization.",
      bg: { from: "#3588F2", to: "#0BB0D7" },
      connector: true,
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Fill In Your Details",
      description:
        "Answer a few quick questions about your goal, audience, and tone. No technical skills needed — just describe what you want in plain language.",
      bg: { from: "#B153EA", to: "#E549A3" },
      connector: true,
    },
    {
      id: 3,
      icon: Rocket,
      title: "Generate & Use",
      description:
        "Instantly generate high-quality AI content tailored to your needs. Refine, customize, and publish effortlessly — turning hours of work into minutes.",
      bg: { from: "#10B981", to: "#06B6D4" },
      connector: false,
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20" id='how-it-works'>
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Get Results in{" "}
            <span className="text-[#5044E5]">3 Simple Steps</span>
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            No learning curve. No complicated setup. Just pick a tool, fill in
            your details, and let AI do the heavy lifting for you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 flex flex-col lg:flex-row items-start gap-6 lg:gap-0">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative flex-1 flex flex-col items-center text-center px-4 lg:px-8"
              >
                {/* Connector Line (desktop) */}
                {step.connector && (
                  <div className="hidden lg:block absolute top-6.5 left-[calc(50%+48px)] right-0 h-px border-t-2 border-dashed border-[#D4D0F8] z-0" />
                )}

                {/* Connector Line (mobile) */}
                {step.connector && (
                  <div className="lg:hidden w-px h-8 border-l-2 border-dashed border-[#D4D0F8] mt-4 mb-2" />
                )}

                {/* Step Number Badge */}
                <div className="relative z-10 mb-5">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-2xl text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${step.bg.from}, ${step.bg.to})`,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white border-2 text-[10px] font-bold flex items-center justify-center"
                    style={{ color: step.bg.from, borderColor: step.bg.from }}
                  >
                    {step.id}
                  </span>
                </div>

                {/* Content Card */}
                <div className="group p-6 rounded-xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full">
                  <h3 className="text-[18px] font-semibold text-[#3E3E3E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#9A9A9A] text-[14px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
