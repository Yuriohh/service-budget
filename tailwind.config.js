module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: {
          purpleLight: "#DFDAF2",
          purpleBase: "#6A46EB",
        },
        base: {
          gray100: "#FAFAFA",
          gray200: "#F0F0F0",
          gray300: "#E6E5E5",
          gray400: "#A1A2A1",
          gray500: "#676767",
          gray600: "#4A4A4A",
          gray700: "#0F0F0F",
        },
        feedback: {
          dangerLight: "#FFD6D6",
          dangerBase: "#DB4D4D",
          dangerDark: "#9E4949",
          successLight: "#BFF7BE",
          successBase: "#4BB84A",
          successDark: "#30752F",
          infoLight: "#CEEFFF",
          infoBase: "#2AA1D9",
          infoDark: "#1D7096",
        },
      },
      fontFamily: {
        regular: ["Lato_400Regular"],
        bold: ["Lato_700Bold"],
      },
      fontSize: {
        "title-lg": ["18px", "140%"],
        "title-md": ["16px", "140%"],
        "title-sm": ["14px", "140%"],
        "title-xs": ["12px", "140%"],
        "text-md": ["16px", "140%"],
        "text-sm": ["14px", "140%"],
        "text-xs": ["12px", "140%"],
      },
    },
  },
  plugins: [],
};
