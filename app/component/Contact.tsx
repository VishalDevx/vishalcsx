"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // TODO: integrate with email API or backend
  };

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 md:px-20">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-5xl font-extrabold bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
      >
        Contact Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center text-gray-400 text-lg mt-3 mb-12 max-w-3xl mx-auto"
      >
        Got a project, question, or just want to say hi? Drop me a message below!
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-900/60 p-8 rounded-3xl shadow-lg flex flex-col gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-800/70 p-4 rounded-xl border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-gray-800/70 p-4 rounded-xl border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="bg-gray-800/70 p-4 rounded-xl border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all"
        >
          Send Message
        </motion.button>

        {submitted && (
          <p className="text-green-400 text-center mt-3">
            Thank you! Your message has been sent.
          </p>
        )}
      </motion.form>
    </section>
  );
}
