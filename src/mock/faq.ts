import type { Faq } from "@/lib/types";

export const defaultFaqs: Faq[] = [
  {
    id: "f1",
    question: "How do I book tickets for a match?",
    answer:
      "Browse the Matches page, pick your fixture and click Book Now. Choose your seat category and number of tickets, then confirm — you'll get an instant booking summary with your booking ID.",
  },
  {
    id: "f2",
    question: "What are the different seat categories?",
    answer:
      "We offer four tiers: VIP (lounge seats with complimentary F&B), Premium (mid-tier with lounge access), Standard (excellent pitch views) and Economy (great value). Prices vary per match.",
  },
  {
    id: "f3",
    question: "Can I get a refund or resell my tickets?",
    answer:
      "Yes. Tickets can be refunded up to 48 hours before the match starts, minus a small processing fee. Contact our support desk with your booking ID to process a refund.",
  },
  {
    id: "f4",
    question: "What time do the gates open?",
    answer:
      "Gates typically open 2 hours before kick-off for football and 3 hours before the first ball in cricket. Your ticket mentions the exact gate opening time.",
  },
  {
    id: "f5",
    question: "Is parking available at the stadium?",
    answer:
      "Yes, we have over 4,000 parking bays across four lots. Premium and VIP ticket holders get reserved parking. We also run free shuttle services from key metro stations on match days.",
  },
  {
    id: "f6",
    question: "Are outside food and drinks allowed?",
    answer:
      "Outside food is not permitted, but the stadium has 40+ food and beverage counters serving everything from local street food to international cuisine.",
  },
];
