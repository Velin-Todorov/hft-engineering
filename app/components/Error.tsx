import Link from "next/link";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
}

const Icon = ({
  children,
  className = "w-5 h-5",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default function Error({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  onRetry,
  showHomeLink = true,
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div role="alert" className="max-w-md w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 border-2 border-red-500/30 
                       rounded-full flex items-center justify-center"
            role="img"
            aria-label="Error"
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-red-400">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </Icon>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        {(onRetry || showHomeLink) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <button
                onClick={onRetry}
                className="min-w-[140px] px-6 py-3 bg-cyan-400 text-black font-bold rounded 
                           hover:bg-cyan-300 active:bg-cyan-500 
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 
                           focus-visible:ring-offset-2 focus-visible:ring-offset-black
                           transition-colors flex items-center justify-center gap-2
                           touch-manipulation"
              >
                <Icon>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </Icon>
                Try Again
              </button>
            )}

            {showHomeLink && (
              <Link
                href="/"
                className="min-w-[140px] px-6 py-3 bg-gray-800 border border-gray-700 
                           text-gray-100 font-bold rounded 
                           hover:bg-gray-700 hover:border-cyan-400 
                           active:bg-gray-600
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 
                           focus-visible:ring-offset-2 focus-visible:ring-offset-black
                           transition-colors flex items-center justify-center gap-2
                           touch-manipulation"
              >
                <Icon>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </Icon>
                Go Home
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}