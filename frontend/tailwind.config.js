// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: "class",
//   content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/lib/esm/**/*.js',],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: "#eff6ff",
//           100: "#dbeafe",
//           200: "#bfdbfe",
//           300: "#93c5fd",
//           400: "#60a5fa",
//           500: "#3b82f6",
//           600: "#2563eb",
//           700: "#1d4ed8",
//           800: "#1e40af",
//           900: "#1e3a8a",
//           950: "#172554",
//         },
//       },
//     },
//     fontFamily: {
//       body: [
//         "Inter",
//         "ui-sans-serif",
//         "system-ui",
//         "-apple-system",
//         "system-ui",
//         "Segoe UI",
//         "Roboto",
//         "Helvetica Neue",
//         "Arial",
//         "Noto Sans",
//         "sans-serif",
//         "Apple Color Emoji",
//         "Segoe UI Emoji",
//         "Segoe UI Symbol",
//         "Noto Color Emoji",
//       ],
//       sans: [
//         "Inter",
//         "ui-sans-serif",
//         "system-ui",
//         "-apple-system",
//         "system-ui",
//         "Segoe UI",
//         "Roboto",
//         "Helvetica Neue",
//         "Arial",
//         "Noto Sans",
//         "sans-serif",
//         "Apple Color Emoji",
//         "Segoe UI Emoji",
//         "Segoe UI Symbol",
//         "Noto Color Emoji",
//       ],
//     },
//   },
//   plugins: [require("flowbite/plugin"), require("daisyui"),require('flowbite/plugin')],
// };


const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
    require("flowbite/plugin"),
    require("tailwindcss-animate"),
  ],
};
