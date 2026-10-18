/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#141414",
          elevated: "#1A1A1A",
          interactive: "#222222",
          lowest: "#0A0A0A",
          low: "#111111",
          card: "#141414",
          container: "#1A1A1A",
          high: "#222222",
          highest: "#2A2A2A",
        },
        border: {
          DEFAULT: "#262626",
          subtle: "rgba(255, 255, 255, 0.08)",
          focus: "#FF5A1F",
        },
        primary: {
          DEFAULT: "#FF5A1F",
          container: "#FF5A1F",
          hover: "#E04B14",
          dark: "#AE3200",
          dim: "#FFB59E",
          on: "#000000",
        },
        text: {
          heading: "#FFFFFF",
          body: "#A3A3A3",
          muted: "#737373",
          inverse: "#000000",
        },
        status: {
          error: "#FF4D4D",
          "error-container": "#2B1313",
          success: "#25D366",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        headline: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
        lg: "4px",
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
        margin: "3rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
      },
    },
  },
  plugins: [],
}
