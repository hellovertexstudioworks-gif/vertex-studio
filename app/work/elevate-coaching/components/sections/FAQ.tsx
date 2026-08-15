"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const faqs = [
  {
    question: "Who is coaching for?",
    answer:
      "Coaching is for anyone who wants greater clarity, confidence, accountability, or direction. You don't need to have everything figured out before starting. The coaching process helps you understand where you are and decide where you want to go.",
  },
  {
    question: "What happens during a coaching session?",
    answer:
      "Each session is built around what matters most to you at that moment. We'll explore challenges, identify patterns, clarify priorities, and turn insights into practical next steps you can take.",
  },
  {
    question: "How long are coaching sessions?",
    answer:
      "Sessions typically last around 60 minutes. The exact structure can be adjusted depending on your goals and the coaching program you choose.",
  },
  {
    question: "Do you offer online coaching?",
    answer:
      "Yes. Coaching sessions can be conducted remotely, making it possible to work together regardless of location.",
  },
  {
    question: "How often should I have coaching sessions?",
    answer:
      "Most clients begin with regular sessions to build momentum and accountability. The frequency can then be adjusted based on your goals, progress, and schedule.",
  },
  {
    question: "How do I know which coaching program is right for me?",
    answer:
      "You don't need to decide on your own. A discovery conversation gives us the opportunity to understand your goals and recommend the coaching approach that best fits your situation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#f4f0e9] text-[#1b1b19]"
    >
      <Container className="py-24 sm:py-28 lg:py-32">
        {/* Main Layout */}

        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          {/* Left Side */}

          <div>
            <div className="max-w-md">
              <SectionTitle
                align="left"
                eyebrow="FAQ"
                title="Questions before"
                highlight="you begin?"
                description="Starting something new can come with questions. Here are a few of the things clients commonly want to know before their first session."
              />
            </div>

            {/* Desktop CTA */}

            <div className="mt-12 hidden border-l border-[#9a7b4f] pl-5 lg:block">
              <p className="text-[9px] font-bold uppercase leading-6 tracking-[0.2em] text-[#9a7b4f]">
                Still have a question?
              </p>

              <a
                href="#contact"
                className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#1b1b19] transition-colors duration-300 hover:text-[#9a7b4f]"
              >
                Start a conversation

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          {/* FAQ List */}

          <div className="border-t border-[#1b1b19]/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#1b1b19]/10"
                >
                  {/* Question */}

                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left sm:py-8"
                  >
                    <span className="flex min-w-0 items-start gap-5">
                      <span
                        className={`pt-1 text-[9px] font-bold tracking-[0.2em] transition-colors duration-300 ${
                          isOpen
                            ? "text-[#9a7b4f]"
                            : "text-[#1b1b19]/25"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`text-base font-medium tracking-[-0.015em] transition-colors duration-300 sm:text-lg ${
                          isOpen
                            ? "text-[#9a7b4f]"
                            : "text-[#1b1b19] group-hover:text-[#9a7b4f]"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </span>

                    {/* Icon */}

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 border-[#9a7b4f] bg-[#9a7b4f] text-white"
                          : "border-[#1b1b19]/15 text-[#1b1b19] group-hover:border-[#9a7b4f] group-hover:text-[#9a7b4f]"
                      }`}
                    >
                      <ChevronDown
                        size={17}
                        strokeWidth={1.4}
                      />
                    </span>
                  </button>

                  {/* Answer */}

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8 pl-10 pr-4 sm:pl-12 sm:pr-14">
                        <p className="max-w-2xl text-sm leading-7 text-[#1b1b19]/50 sm:text-base sm:leading-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile CTA */}

        <div className="mt-12 border-l border-[#9a7b4f] pl-5 lg:hidden">
          <p className="text-[9px] font-bold uppercase leading-6 tracking-[0.2em] text-[#9a7b4f]">
            Still have a question?
          </p>

          <a
            href="#contact"
            className="group mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#1b1b19] transition-colors duration-300 hover:text-[#9a7b4f]"
          >
            Start a conversation

            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}