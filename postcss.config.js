import postcssNested from "postcss-nested";

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-nested": postcssNested,
  },
};
