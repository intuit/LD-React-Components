import path from 'path';

export default () => ({
  mode: 'production',
  entry: {
    index: path.join(__dirname, 'src/docs/index.js')
  },
  output: {
    path: path.join(__dirname, 'src/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },

  externals: {
    react: 'react',
    reactDOM: 'react-dom'
  }
});
