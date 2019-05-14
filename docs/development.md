# Dojo Themes Development

## Building `@dojo/themes`

The `build` script will build `@dojo/themes`:

```sh
dojo/themes$ npm run build
```

The build process produces a single optimized build file, e.g. `dist/src/dojo/dojo-5.0.0.css` and also copies all of
the unbuilt source modules to the `dist` folder.

## Testing themes in the browser

Dojo themes can be tested with the [Widget Showcase](https://github.com/dojo/examples/tree/master/widget-showcase) in
[`@dojo/examples`](https://github.com/dojo/examples). Local testing can be done by following the steps below:

1. Build `@dojo/themes`:

```sh
dojo/themes$ npm run build
dojo/themes$ npm run release:prepare
dojo/themes$ npm run dojo-package
```

2. Install the local themes build in `widget-showcase`:


```sh
dojo/examples/widget-showcase$ npm install ../../themes/dist/release
```

This creates a symlink in `widget-showcase/node_modules` to `../../themes/dist/release`, so on further rebuilds of
`themes` you don't need to re-run `npm install`.

3. Build `widget-showcase`:

```sh
dojo/examples/widget-showcase$ npm run build
```

With an HTTP server running you can open `dojo/examples/widget-showcase/output/dist/index.html` in your browser.
