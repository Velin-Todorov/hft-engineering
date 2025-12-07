export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(0,212,255,0.1)' stroke-width='0.5'/></pattern></defs><rect width='100' height='100' fill='url(%23grid)'/></svg>")`,
        }}
      />
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent font-mono">
          HFT Engineering
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
          Deep dives into High-Frequency Trading systems, lock-free programming,
          and microsecond-level optimizations.
        </p>
      </div>
    </section>
  );
}
