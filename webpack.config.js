require("dotenv").config();
const os = require("os");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const paths = {
  dist: "dist",
  build: "build",
};

/* -------------------------------------------------------------------------- */

const pages = [
  "index",
  "mbti-r-1",
  "mbti-r-2",
  "mbti-r-3",
  "mbti-r-4",
  "mbti",
  "supportUs",
];

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval" : false,
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  output: {
    publicPath: "/",
    path: path.join(__dirname, isDevelopment ? paths.dist : paths.build),
    filename: "js/[name].bundle.js",
    assetModuleFilename: "images/[name][ext]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: isDevelopment ? false : true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  module: {
    rules: [{
        test: /\.s(a|c)ss$/i,
        exclude: /node_modules/,
        use: [
          isDevelopment ? "style-loader" : MiniCSSExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      stage: 3,
                      features: {
                        "nesting-rules": true,
                      },
                      autoprefixer: {
                        grid: true,
                      },
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /js\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      linkType: false,
      filename: "./css/style.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src",
        },
      ],
    }),
  ].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
};
