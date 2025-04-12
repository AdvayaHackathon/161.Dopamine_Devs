module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#138808",
        secondary: "#FF9933",
        accent: "#000080",
        dark: "#2D3748",
        light: "#F7FAFC",
        gold: "#D4AF37",
        maroon: "#800000",
        "spice-red": "#C04000",
        "peacock-blue": "#0C6170",
        "marigold": "#EAA221",
        "mehendi": "#94854A"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'india-flag': "linear-gradient(to right, var(--saffron), var(--white), var(--green))",
        'mandala-pattern': "url('../images/mandala-pattern.png')",
      }
    },
  },
  plugins: [],
}; 