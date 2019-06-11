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
