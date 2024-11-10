/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        primary: {
          100: "#0077C2", // Blue primary shade
          200: "#0095f5", // Lighter blue
          300: "#02a5f5", // Very light blue
        },
        accent: {
          100: "#0bee71",
          200: "#08cc69", // Bright green
          300: "#08bc59", // Darker green
        },
        text: {
          100: "#10305f",
          200: "#5c5c5c",
        },
        bg: {
          100: "#FFFFFF",
          200: "#f5f5f5",
          300: "#f5fcfc",
          400: "#efffff",
        },
        // Dark Mode Colors
        darkPrimary: {
          100: "#0072ff", // Darker blue primary
          200: "#008fff",
          300: "#69b4ff", // Lighter blue
          400: "#e0ffff", // Very light blue
        },
        darkAccent: {
          100: "#00ff64", // light green accent
          200: "#e1ffff", // Light blue accent
        },
        darkText: {
          100: "#FFFFFF", // White text
          200: "#9e9e9e", // Light gray text
        },
        darkBg: {
          100: "#1E1E1E", // Dark gray background
          200: "#2d2d2d", // Darker gray background
          300: "#454545", // Medium dark gray background
        },
        // Additional Colors
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        blue: {
          70: "#021639",
        },
      },
      backgroundImage: {
        "bg-img-1": "url('/background.png')",
        "bg-main": "url('/bgbg.jpg')",
        // "bg-img-2": "url('/img-2.png')",
        // "feature-bg": "url('/feature-bg.png')",
        // pattern: "url('/pattern.png')",
        // "pattern-2": "url('/pattern-bg.png')",
      },
      screens: {
        xxs: "300px",
        xs: "380px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  plugins: [],
};
