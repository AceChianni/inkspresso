// /page/legal/faqs.js

import { useState } from "react";

const faqs = [
  {
    question: "What is Inkspresso?",
    answer: "Inkspresso is a cozy online shop for coffee lovers and book enthusiasts!",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards and Shopify Payments.",
  },
  {
    question: "How long does shipping take?",
    answer: "Orders typically ship within 3-5 business days.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we accept returns within 14 days for unused items.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-xl font-semibold flex justify-between items-center">
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </h2>
            {openIndex === index && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center">Still have questions? <a href="/contact" className="text-blue-500 dark:text-blue-400 underline">Contact us</a>.</p>
    </main>
  );
}
