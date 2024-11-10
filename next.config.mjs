export default {
  async headers() {
    return [
      {
        source: "/api/:path*", // Adjust the path to match your API routes
        headers: [
          {
            key: "x-user-id",
            value: "your-default-user-id", // This should be dynamically set based on the user's ID
          },
        ],
      },
    ];
  },
};
