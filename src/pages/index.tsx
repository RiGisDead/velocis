import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c10] to-[#1f2833] text-white font-sans">
      <Head>
        <title>Velocis | Web Development Company</title>
        <meta name="description" content="Speed-focused web development for businesses. One-time builds or monthly plans." />
        <meta name="keywords" content="Glen Ellyn Web Design, Website Developer, Fast Websites, Velocis Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">Velocis</h1>
        <p className="text-xl mb-6">Speed. Precision. Modern Web Development.</p>
        <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Services</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">One-Time Website</h3>
            <p className="text-gray-300 mb-4">Custom-built sites delivered fast. Perfect for businesses who want full ownership.</p>
            <span className="text-white font-bold">Starts at $700</span>
          </div>
          <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Monthly Plans</h3>
            <p className="text-gray-300 mb-4">Ongoing updates, hosting, and support with no upfront cost.</p>
            <span className="text-white font-bold">From $100/mo</span>
          </div>
          <div className="bg-[#1b1f23] rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
            <p className="text-gray-300 mb-4">Need something more complex? Let’s build something powerful together.</p>
            <span className="text-white font-bold">Let’s talk</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#0b0c10] py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Let's Work Together</h2>
        <form
          className="max-w-xl mx-auto space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
          
            const form = e.currentTarget;
            const formData = {
              name: form.name.value.trim(),
              email: form.email.value.trim(),
              message: form.message.value.trim(),
              company: form.company.value.trim() // Honeypot
            };
            
            if (formData.company !== "") {
              console.warn("Bot submission detected.");
              return; // silently stop the submit
            }
            
          
            // Simple client-side validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!formData.name || !formData.email || !formData.message) {
              alert("Please fill out all fields.");
              return;
            }
            if (!emailRegex.test(formData.email)) {
              alert("Please enter a valid email address.");
              return;
            }
          
            try {
              const res = await fetch("https://velocis-api.onrender.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
          
              const result = await res.json();
              alert(result.message);
              form.reset();
            } catch (err) {
              alert("There was an error submitting the form. Please try again later.");
              console.error(err);
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
            name="company"  // or any non-obvious name
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />
          <button type="submit" className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-200 transition">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b0c10] text-center text-sm text-gray-500 py-6">
        © {new Date().getFullYear()} Velocis. All rights reserved.
      </footer>
    </div>
  );
}