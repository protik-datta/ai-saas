import React from "react";
import Container from "../common/Container";
import { showError } from "../../utils/toast";

const Subscription = () => {
  const subscriptionPlans = [
    {
      id: 1,
      title: "Free",
      price: "$0",
      period: "Always free",
      features: [
        { name: "Title Generation", included: true },
        { name: "Article Generation", included: true },
        { name: "Generate Images", included: false },
        { name: "Remove Background", included: false },
        { name: "Remove Object", included: false },
        { name: "Resume Review", included: false },
      ],
      buttonText: "Subscribe",
    },
    {
      id: 2,
      title: "Premium",
      price: "$16",
      period: "/Month • Billed annually",
      features: [
        { name: "Title Generation", included: true },
        { name: "Article Generation", included: true },
        { name: "Generate Images", included: true },
        { name: "Remove Background", included: true },
        { name: "Remove Object", included: true },
        { name: "Resume Review", included: true },
      ],
      buttonText: "Subscribe",
    },
    {
      id: 3,
      title: "Enterprise",
      price: "$49",
      period: "/Month • Custom billing",
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Custom Templates", included: true },
        { name: "Priority Support", included: true },
      ],
      buttonText: "Subscribe",
    },
  ];
  return (
    <Container>
      <section className="py-14 sm:py-16 md:py-10" id='pricing'>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Join Thousands of{" "}
            <span className="text-[#5044E5]">Marketers & Creators</span>
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Unlock the full potential of AI-powered copywriting and content
            generation. Get unlimited access to all tools, templates, and
            premium features.
          </p>
        </div>

        {/* review card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative group flex flex-col p-6 sm:p-7 rounded-xl backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300
            ${
              plan.highlighted
                ? "bg-[#3B3B3B] text-white"
                : "bg-[rgba(253,253,254,0.60)] text-[#3B3B3B]"
            }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#3B3B3B] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Plan Title */}
              <h3
                className={`text-[15px] font-semibold tracking-wide uppercase ${
                  plan.highlighted ? "text-gray-300" : "text-[#9E9E9E]"
                }`}
              >
                {plan.title}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-end gap-1">
                <span className="text-[38px] font-bold leading-none">
                  {plan.price}
                </span>
              </div>

              {/* Period */}
              <p
                className={`mt-1 text-[13px] ${
                  plan.highlighted ? "text-gray-400" : "text-[#9E9E9E]"
                }`}
              >
                {plan.period}
              </p>

              {/* Divider */}
              <div
                className={`border-b mt-6 mb-6 ${
                  plan.highlighted ? "border-white/20" : "border-[#C7C7C7]"
                }`}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {/* Check / Cross Icon */}
                    <span
                      className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-full
                    ${
                      feature.included
                        ? plan.highlighted
                          ? "bg-white/20"
                          : "bg-[#3B3B3B]/8"
                        : "bg-transparent"
                    }`}
                    >
                      {feature.included ? (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke={plan.highlighted ? "#fff" : "#3B3B3B"}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 3l6 6M9 3l-6 6"
                            stroke="#C7C7C7"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </span>

                    <span
                      className={`text-[14px] ${
                        feature.included
                          ? plan.highlighted
                            ? "text-gray-200"
                            : "text-[#656565]"
                          : "text-[#C7C7C7]"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() =>
                  showError("Subscription is not available right now")
                }
                className={`mt-8 w-full py-3 rounded-lg text-[14px] font-medium
              transition-all duration-200 active:scale-95
              ${
                plan.highlighted
                  ? "bg-white text-[#3B3B3B] hover:bg-gray-100"
                  : "bg-[#3B3B3B] text-white hover:bg-[#2a2a2a]"
              }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Subscription;
