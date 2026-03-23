import { colors } from "./src/themes/colors";

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: colors,
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
