import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c10] to-[#1f2833] text-white font-sans">
      <Head>
        <title>Velocis | Fast, Modern Website Development</title>
        <meta name="description" content="Custom websites for small businesses, freelancers, and creators. One-time builds or monthly plans. Based in Glen Ellyn, serving clients everywhere." />
        <meta name="keywords" content="web design, web development, Glen Ellyn, freelance developer, small business website, Velocis, ecommerce websites, site redesign, modern websites, fast websites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph */}
        <meta property="og:title" content="Velocis | Fast, Modern Website Development" />
        <meta property="og:description" content="Need a website? We build fast, professional sites for businesses and creators. One-time or monthly plans available." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://velocis.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Velocis | Fast, Modern Website Development" />
        <meta name="twitter:description" content="Custom websites for small businesses, creators, and more. Fast, sleek, and scalable." />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-[#13161a] text-center py-16 px-4 border-gray-700">
        <h1 className="text-7xl font-bold mb-4">VELOCIS</h1>
        <h2 className="text-2xl font-semibold mb-2">Need a website that actually converts?</h2>
        <p className="text-lg mb-4 text-white-300 max-w-xl mx-auto">
          We build clean, high-performance websites for small businesses — delivered in 7 days or less.
        </p>
        <p className="text-md text-white font-medium">Get a free homepage preview — no strings attached.</p>
      </section>

      {/* Services Section */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Business Website Builds</h3>
          <p className="text-gray-300 mb-4">Fast, responsive websites tailored to your business with full ownership.</p>
          <span className="text-white font-bold">From $300</span>
        </div>
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Monthly Website Plans</h3>
          <p className="text-gray-300 mb-4">Get a pro website with no large upfront cost. Hosting, updates, and support included.</p>
          <span className="text-white font-bold">From $100/mo</span>
        </div>
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Portfolio & Personal Sites</h3>
          <p className="text-gray-300 mb-4">Whether you're a creator, freelancer, or professional — we’ll make your personal brand stand out.</p>
          <span className="text-white font-bold">From $150</span>
        </div>
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">E-Commerce Ready</h3>
          <p className="text-gray-300 mb-4">Launch your online store fast. Secure checkout, product listings, and more.</p>
          <span className="text-white font-bold">Starting at $1000</span>
        </div>
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Redesign & Modernization</h3>
          <p className="text-gray-300 mb-4">Have a slow or outdated website? We’ll rebuild it for speed, mobile, and SEO.</p>
          <span className="text-white font-bold">Dependant on site requirements/size</span>
        </div>
        <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2">Custom Integrations</h3>
          <p className="text-gray-300 mb-4">Need something specific? We handle custom backends, booking systems, dashboards and more.</p>
          <span className="text-white font-bold">Tailored Quote</span>
        </div>
      </div>

      {/* Contact Form */}
      <section className="bg-[#0b0c10] py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Let's Work Together</h2>
        <form
          className="max-w-xl mx-auto space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setFormStatus("idle");
            setIsLoading(true);

            const form = e.currentTarget;
            const nameInput = form.elements.namedItem("name") as HTMLInputElement;
            const emailInput = form.elements.namedItem("email") as HTMLInputElement;
            const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement;
            const honeypotInput = form.elements.namedItem("company") as HTMLInputElement;

            const formData = {
              name: nameInput.value.trim(),
              email: emailInput.value.trim(),
              message: messageInput.value.trim(),
              company: honeypotInput.value.trim()
            };

            if (formData.company !== "") {
              console.warn("Bot submission detected.");
              setIsLoading(false);
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.name || !formData.email || !formData.message) {
              setFormStatus("error");
              setIsLoading(false);
              return;
            }
            if (!emailRegex.test(formData.email)) {
              setFormStatus("error");
              setIsLoading(false);
              return;
            }

            try {
              const res = await fetch("https://velocis-api.onrender.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });

              const result = await res.json();
              if (result.status === "success") {
                setFormStatus("success");
                form.reset();
              } else {
                setFormStatus("error");
              }
            } catch (err) {
              console.error(err);
              setFormStatus("error");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-[#1f2833] border border-gray-600 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-[#1f2833] border border-gray-600 text-white"
            required
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows={4}
            className="w-full p-3 rounded bg-[#1f2833] border border-gray-600 text-white"
            required
          ></textarea>
          <input
            type="text"
            name="company"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          {formStatus === "success" && (
            <p className="text-green-400 mt-4 text-sm">Thanks! We'll be in touch soon.</p>
          )}
          {formStatus === "error" && (
            <p className="text-red-400 mt-4 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0c10] text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Velocis. All rights reserved.
      </footer>
    </div>
  );
}