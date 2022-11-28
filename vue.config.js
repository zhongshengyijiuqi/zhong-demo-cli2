const path = require("path")
const glob = require("glob-all")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const PurgecssPlugin = require("purgecss-webpack-plugin")

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)

module.exports = {
  publicPath:  "./",
  // publicPath: process.env.VUE_APP_SRC || "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("extend", resolve("src/extend"))
      .set("plugins", resolve("src/plugins"))
      .set("request", resolve("src/request"))
      .set("store", resolve("src/store"))
      .set("utils", resolve("src/utils"))
      .set("views", resolve("src/views"))

    if (process.env.VUE_APP_MODE === 'analyze') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 1000000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,   
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
    
    if (IS_PROD) {
      const plugins = []

      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, "./src/**/*.vue"),
            path.join(__dirname, "./src/**/*.scss")
          ])
        })
      )
      config.plugins = [...config.plugins, ...plugins]
      config.devtool = 'none'
    } else {
      config.devtool = 'source-map'
    }
  },
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/variables.scss";@import "@/assets/scss/mixins.scss";`
      }
    },
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    open: false,
    host: '127.0.0.1',
    port: 8080,
    compress: true,
    https: false,
    hotOnly: true,
    before: app => {
      // `app` 是一个 express 实例
    }
  },

  // 三方插件的选项
  pluginOptions: {
    
  }
}
