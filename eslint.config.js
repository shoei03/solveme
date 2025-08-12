// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      // Import文のソート設定
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.jsの組み込みモジュール
            "external", // npm パッケージ
            "internal", // 内部パッケージ
            "parent", // 親ディレクトリからのimport
            "sibling", // 同じディレクトリからのimport
            "index", // index ファイルからのimport
          ],
          "newlines-between": "always", // グループ間に改行を入れる
          alphabetize: {
            order: "asc", // アルファベット順
            caseInsensitive: true, // 大文字小文字を区別しない
          },
        },
      ],
    },
  },
]);
