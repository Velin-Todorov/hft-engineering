export async function Newsletter() {
    // introduce a simple email service
    // and add logic here
    
    
    return (
    <div className="bg-gradient-to-br from-cyan-900/20 to-green-900/20 border border-cyan-800/30 rounded-lg p-6">
      <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-2 font-bold">
        Stay Updated
      </h3>
      <p className="text-xs text-gray-400 mb-4 leading-relaxed">
        Get the latest articles on low-latency systems delivered to your inbox.
      </p>
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 mb-3 focus:outline-none focus:border-cyan-400 transition-colors"
      />
      <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 rounded text-sm transition-colors">
        Subscribe
      </button>
    </div>
  );
}
