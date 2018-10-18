const webpack = require('webpack');
const TemplatedPathPlugin = require('webpack/lib/TemplatedPathPlugin');
const CssModulePlugin = require("@dojo/webpack-contrib/css-module-plugin/CssModulePlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");
const fs = require("fs");
const loaderUtils = require("loader-utils");
const slash = require('slash');

const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const basePath = process.cwd();
const packageJsonPath = path.join(basePath, 'package.json');
const packageJson = fs.existsSync(packageJsonPath) ? require(packageJsonPath) : {};
const packageName = packageJson.name || '';
const allPaths = path.join(__dirname, 'dojo');

function colorToColorMod(style) {
	style.walkDecls((decl) => {
		decl.value = decl.value.replace('color(', 'color-mod(');
	});
}

const postcssImportConfig = {
	filter: (path) => {
		return /.*variables(\.m)?\.css$/.test(path);
	},
	load: (filename, importOptions = {}) => {
		return fs.readFileSync(filename, 'utf8').replace('color(', 'color-mod(');
	},
	resolve: (id, basedir, importOptions= {}) => {
		if (importOptions.filter) {
			const result = importOptions.filter(id);
			if (!result) {
				return id;
			}
		}
		if (id[0] === '~') {
			return id.substr(1);
		}
		return id;
	}
};

const postcssPresetConfig = {
	browsers: ['last 2 versions', 'ie >= 10'],
	insertBefore: {
		'color-mod-function': colorToColorMod
	},
	features: {
		'color-mod-function': true,
		'nesting-rules': true
	},
	autoprefixer: {
		grid: true
	}
};

function webpackConfigFactory(args) {
	const config = {
		entry: {
			'custom-element': `imports-loader?theme=${path.join(allPaths, 'index.ts')}!${path.join(__dirname, 'template', 'theme-installer.js')}`,
			dojo: path.join(allPaths, 'index.ts')
		},
		output: {
			filename: '[custom].js',
			path: path.resolve('./dist/release/dojo'),
			library: '[name]',
			libraryTarget: 'umd'
		},
		resolve: {
			modules: [basePath, path.join(basePath, 'node_modules')],
			extensions: ['.ts', '.js'],
			alias: {
				'fonts': path.resolve(__dirname, 'fonts')
			}
		},
		devtool: 'source-map',
		plugins: [
			new CssModulePlugin.default(basePath),
			new webpack.DefinePlugin({ THEME_NAME: JSON.stringify('dojo') }),
			new UglifyJsPlugin({ sourceMap: true, cache: true }),
			new ExtractTextPlugin({
				filename: function (getPath) { return getPath('[custom].css'); }
			}),
			new TemplatedPathPlugin(),
			function () {
				const compiler = this;
				const elementName = `dojo-${packageJson.version}`;
				const distName = 'index';
				compiler.plugin('compilation', (compilation) => {
					compilation.mainTemplate.plugin('asset-path', (template, chunkData) => {
						const chunkName = chunkData && chunkData.chunk && chunkData.chunk.name;
						return template.indexOf('[custom]') > -1 ?
							template.replace(/\[custom\]/, chunkName === 'custom-element' ? elementName : distName) :
							template;
					});
				});
			}
		],
		module: {
			rules: [
				{
					include: allPaths,
					test: /.*\.ts?$/,
					use: [
						{
							loader: 'ts-loader',
							options: { instance: 'dojo', compilerOptions: { declaration: false } }
						}
					]
				},
				{
					test: /.*\.(gif|png|jpe?g|svg|eot|ttf|woff|woff2)$/i,
					loader: 'file-loader?hash=sha512&digest=hex&name=[hash:base64:8].[ext]',
					options: {
						outputPath: 'fonts/',
						useRelativePath: true
					}
				},
				{
					include: allPaths,
					test: /.*\.css?$/,
					use: ExtractTextPlugin.extract({
						fallback: ['style-loader'],
						use: [
							'@dojo/webpack-contrib/css-module-decorator-loader',
							{
								loader: 'css-loader',
								options: {
									modules: true,
									sourceMap: true,
									importLoaders: 1,
									localIdentName: '[name]__[local]__[hash:base64:5]'
								}
							},
							{
								loader: 'postcss-loader?sourceMap',
								options: {
									ident: 'postcss',
									plugins: [
										postcssImport(postcssImportConfig),
										postcssPresetEnv(postcssPresetConfig)
									]
								}
							}
						]
					})
				}
			]
		}
	};
	return config;
}
exports.default = webpackConfigFactory;
