import React, { useState } from "react";
import Container from "../common/Container";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Quick.ai and who is it for?",
      answer:
        "Quick.ai is an AI-powered content generation platform built for marketers, content creators, startup founders, and freelancers. Whether you need landing page copy, email campaigns, SEO content, or social media posts — Quick.ai helps you create high-quality content in seconds, without staring at a blank page.",
    },
    {
      id: 2,
      question: "Do I need any writing or technical experience to use it?",
      answer:
        "None at all. Quick.ai is designed to be used by anyone. Simply choose a tool, fill in a few details about your goal and audience, and the AI generates polished content for you. If you can describe what you want in plain English, you can use Quick.ai.",
    },
    {
      id: 3,
      question: "How many tools are included in the free plan?",
      answer:
        "The free plan gives you access to Title Generation and Article Generation tools with no time limit. To unlock all 18+ AI tools — including the Resume Analyzer, SEO Optimizer, Script Generator, and more — you can upgrade to the Premium or Enterprise plan at any time.",
    },
    {
      id: 4,
      question: "Is the AI-generated content unique and plagiarism-free?",
      answer:
        "Yes. Every output is generated fresh based on your specific inputs. The AI does not copy or repurpose existing content from the web. That said, we always recommend reviewing and personalizing the output before publishing to ensure it fully reflects your brand voice.",
    },
    {
      id: 5,
      question: "Can I cancel my subscription at any time?",
      answer:
        "Absolutely. There are no long-term commitments. You can cancel your Premium or Enterprise subscription at any time from your account settings. You will continue to have access to your paid features until the end of your current billing period.",
    },
    {
      id: 6,
      question: "What makes Quick.ai different from other AI writing tools?",
      answer:
        "Unlike generic AI tools, Quick.ai is purpose-built for marketing and content workflows. Each of our 18+ tools is designed around a specific use case — with tailored prompts, structured inputs, and outputs optimized for real-world use. You get better results faster because the AI already knows the context.",
    },
  ];

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-14 sm:py-16 md:py-20" id='faq'>
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-semibold text-[#3B3B3B] leading-tight">
            Frequently Asked <span className="text-[#5044E5]">Questions</span>
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Everything you need to know about CopyAI. Can't find the answer
            you're looking for? Reach out to our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto mt-12 flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl bg-[rgba(253,253,254,0.60)] backdrop-blur-md shadow-[0_4px_30px_0_rgba(0,0,0,0.10)] transition-all duration-300
                  ${isOpen ? "shadow-xl" : "hover:shadow-xl hover:-translate-y-0.5"}`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`text-[15px] font-medium leading-snug transition-colors duration-200
                      ${isOpen ? "text-[#5044E5]" : "text-[#3B3B3B]"}`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200
                      ${
                        isOpen
                          ? "bg-[#5044E5] text-white"
                          : "bg-[#F0F0F0] text-[#727272]"
                      }`}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#E8E8E8] pt-4">
                      <p className="text-[#727272] text-[14px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-[#9A9A9A] text-[14px]">
            Still have questions?{" "}
            <a
              href="#"
              className="text-[#5044E5] font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
