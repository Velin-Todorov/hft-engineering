"use client";

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add newsletter subscription logic
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Newsletter subscription:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="your@email.com"
        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 mb-3 focus:outline-none focus:border-cyan-400 transition-colors"
        required
      />
      <button
        type="submit"
        className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 rounded text-sm transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}

