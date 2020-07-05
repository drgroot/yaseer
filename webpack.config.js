const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Showdown = require('showdown');

const mdConverter = new Showdown.Converter();

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/nav.file',
          force: true,
          to: 'navindex.js',
          transform() {
            const files = fs.readdirSync(path.join(__dirname, 'pages'))
              .map((f) => f.replace(/\..*$/, ''));
            return Buffer.from(`var pages = ['${files.join("','")}'];\n`);
          },
        },
        {
          from: path.join(__dirname, 'pages/*.md'),
          to: '[name].html',
          toType: 'template',
          transform(content) {
            const innerContent = content.toString();
            const templ = fs.readFileSync(path.join(__dirname, 'src/template.file')).toString();

            return Buffer.from(templ.replace('CONTENT', mdConverter.makeHtml(innerContent)));
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|md|jpg|ico|jpeg)$/,
        use: 'file-loader',
      },
    ],
  },
};
