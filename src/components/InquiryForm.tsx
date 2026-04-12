"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  occasionDate: string;
  stylePreference: string;
  budget: string;
  whatsappNumber: string;
  additionalNotes: string;
}

const styleOptions = ["Bridal", "Reception", "Festive", "Party Wear", "Custom Design"];
const budgetOptions = [
  "Under ₹5,000",
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹20,000",
  "₹20,000+",
  "Not Sure"
];

export function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    occasionDate: "",
    stylePreference: "",
    budget: "",
    whatsappNumber: "",
    additionalNotes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (normally would send to backend)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // You can add actual form submission logic here
    console.log("Form submitted:", formData);

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        occasionDate: "",
        stylePreference: "",
        budget: "",
        whatsappNumber: "",
        additionalNotes: ""
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brass/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-brass"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-[clamp(20px,4vw,28px)] font-display text-charcoal font-semibold">
              Thank you!
            </h3>
            <p className="text-[clamp(14px,2.5vw,16px)] text-charcoal/70 mt-2">
              We&apos;ll be in touch soon. Check your email &amp; WhatsApp.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="relative w-full bg-cream px-4 py-20 sm:px-6 md:px-[8%] md:py-32">
      <div className="relative z-10 space-y-[clamp(60px,8vw,80px)] max-w-3xl mx-auto">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-semibold text-charcoal sm:text-5xl md:text-6xl">
            Start Your Design
          </h2>
          <p className="text-[clamp(14px,2.5vw,16px)] text-charcoal/70">
            Tell us about your vision. We&apos;ll work closely with you to bring it to life.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-[clamp(20px,4vw,28px)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(16px,3vw,24px)]">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
                placeholder="Priya Sharma"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
                placeholder="priya@example.com"
              />
            </div>

            {/* Occasion Date */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                Occasion Date *
              </label>
              <input
                type="date"
                name="occasionDate"
                value={formData.occasionDate}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Style Preference */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                Design Style *
              </label>
              <select
                name="stylePreference"
                value={formData.stylePreference}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
              >
                <option value="">Select a style...</option>
                {styleOptions.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
                Budget Range *
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(10px,2vw,12px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all"
              >
                <option value="">Select a budget...</option>
                {budgetOptions.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-[clamp(12px,2vw,14px)] font-semibold text-charcoal">
              Design Ideas & Details
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full px-[clamp(12px,2.5vw,16px)] py-[clamp(12px,2.5vw,16px)] rounded-[clamp(6px,1.5vw,10px)] border border-charcoal/15 bg-white text-[clamp(14px,2.5vw,16px)] text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brass/30 focus:border-transparent transition-all resize-none h-[clamp(100px,20vw,140px)]"
              placeholder="Describe your vision, color preferences, motifs, etc."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary py-[clamp(12px,2.5vw,16px)] text-[clamp(14px,2.5vw,16px)] font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {isSubmitting ? "Submitting..." : "Start Your Design"}
          </motion.button>

          <p className="text-center text-[clamp(12px,2vw,14px)] text-charcoal/60">
            We&apos;ll connect with you within 24 hours.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
