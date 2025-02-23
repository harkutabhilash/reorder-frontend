const config = {
  mode: 'production', // "production" | "development" | "none"
  resolve: {
    extensions: ['*', '.mjs', '.js', '.json'],
    fullySpecified: false, // ✅ Fix for ".mjs" module imports
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  }
}

module.exports = config