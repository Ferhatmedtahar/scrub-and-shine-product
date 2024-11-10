"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen bg-red-100 p-4 rounded-lg shadow-md">
      <h1 className="text-red-500 font-semibold text-4xl text-center">
        Something Went Wrong!
      </h1>
      <p className="text-lg text-gray-700">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="rounded-lg text-white bg-red-600 py-2 px-8 border-2 border-red-500 hover:bg-red-500 transition-colors duration-150 shadow-lg"
      >
        Try Again
      </button>
    </div>
  );
}
