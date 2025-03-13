// craco.config.js (no projeto home)
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Define o publicPath para que os chunks sejam carregados do endereço correto
      webpackConfig.output.publicPath = "http://localhost:3001/";

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "home",
          filename: "remoteEntry.ts",
          exposes: {
            "./App": "./src/App",
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: "^18.3.1" },
            "react-dom": {
              singleton: true,
              eager: true,
              requiredVersion: "^18.3.1",
            },
          },
        })
      );

      // // Encontra a regra de CSS existente e ajusta os loaders
      // const cssRuleIndex = webpackConfig.module.rules.findIndex(
      //   (rule) => rule.test && rule.test.toString().includes("css")
      // );

      // if (cssRuleIndex !== -1) {
      //   webpackConfig.module.rules[cssRuleIndex] = {
      //     test: /\.css$/,
      //     use: [
      //       "style-loader", // Injeta CSS no DOM
      //       "css-loader", // Interpreta @import e url()
      //       {
      //         loader: "postcss-loader", // Processa o CSS com PostCSS
      //         options: {
      //           postcssOptions: {
      //             plugins: [
      //               require("tailwindcss"), // Adiciona o Tailwind CSS
      //               require("autoprefixer"), // Adiciona o Autoprefixer
      //             ],
      //           },
      //         },
      //       },
      //     ],
      //   };
      // }

      return webpackConfig;
    },
  },
};
