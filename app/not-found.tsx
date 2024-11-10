export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-slate-700">
      {/* Optional Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url("/your-background-image.jpg")' }}
      ></div>

      <h2 className="relative z-10 text-3xl lg:text-4xl font-bold mb-4">
        Oops! Page Not Found
      </h2>
      <p className="relative z-10 text-lg mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/" // Link to the homepage or another page
        className="relative z-10 px-6 py-3 bg-primary-300 text-white rounded-lg shadow-lg hover:bg-primary-200 transition duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
}
