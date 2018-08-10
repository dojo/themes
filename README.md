# Dojo Themes

Package that contains a collection of Dojo themes.

**Please Note:** If you are looking for Dojo 1 themes, these have been relocated to [`@dojo/dijit-themes`](https://github.com/dojo/dijit-themes). The github url registered with bower has also been updated to point to the new repository, if you encounter any issues please run `bower cache clean` and try again.

## Usage

1. Install `@dojo/themes` with `npm i @dojo/themes`.
2. Import the theme CSS into your project's `main.css`: `@import '@dojo/themes/dojo`.
3. Import the theme module and pass it to the widgets you need themed:

``` javascript
import theme from '@dojo/themes/dojo';

render() {
	return w(Button, { theme }, [ 'Hello World' ]);
}
```

## Composition

To compose and extend the themes within a dojo project, run `npm i @dojo/themes` and use the `css-module` composes functionality.
Variables can be used by using `@import` to import the `variables.css` file from a theme. This functionality is added by a `post-css` plugin within the dojo build command.

``` css
/* myButton.m.css */
@import '@dojo/themes/dojo/variables.css';

.root {
	composes: root from '@dojo/themes/dojo/button.m.css';
	background-color: var(--dojo-green);
}
```

## Generating typings

The following `npm` scripts are available to facilitate development:

- `build:tcm`: generate `.m.css.d.ts` files
- `watch`: generate `.m.css.d.ts` files in watch mode
