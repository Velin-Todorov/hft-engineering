import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <div className="bg-gradient-to-br from-cyan-900/20 to-green-900/20 border border-cyan-800/30 rounded-lg p-6">
      <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-2 font-bold">
        Stay Updated
      </h3>
      <p className="text-xs text-gray-400 mb-4 leading-relaxed">
        Get the latest articles on low-latency systems delivered to your inbox.
      </p>
      <NewsletterForm />
    </div>
  );
}
