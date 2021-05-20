// Webpack => Scss나 최신 JS를 CSS, 일반 JS로 변환하여 브라우저에서 인식하도록 하는 것
const path = require("path");
const mini_css_extract_plugin = require("mini-css-extract-plugin");
const auto_pre_fixer = require("autoprefixer");

// mode는 Package.json에서 가져온다 (Cross-env install)
const mode = process.env.WEBPACK_ENV;
// resolve => 파일, 절대 경로
const entry_file = path.resolve(__dirname, "assets", "js", "main.js");
// join => 디렉토리, 상대 경로
const output_dir = path.join(__dirname, "static");

const config = {
  // plugin은 설치 필요
  plugins: [new mini_css_extract_plugin({ filename: "style.css" })],
  entry: ["@babel/polyfill", entry_file],
  mode,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
      },
      {
        // 파일이 scss인지 테스트 해보라고 명령
        // 정규식 시작은 /\로 시작 마지막에 $/로 끝난다
        test: /\.(scss)$/,
        // scss 파일을 발견했을때 이것을 사용하세요
        use: [
          // css만 추출
          mini_css_extract_plugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  auto_pre_fixer({ overrideBrowserslist: "cover 99.5%" }),
                ],
              },
            },
          },
          "sass-loader",
        ],
        // css-loader => Webpack이 CSS이해 하도록함
        // sass-loader => sass를 css로 변환
        // postcss-loader => CSS의 호환성과 관련된걸 해결해줌 EX) IE 지원문법변환
      },
    ],
  },
  output: {
    path: output_dir,
    filename: "[name].js",
  },
};

// 구문법
module.exports = config;
