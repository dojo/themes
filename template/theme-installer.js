var theme = theme.default;

if (theme && typeof window !== 'undefined') {
	if (!window.dojoce) {
		window.dojoce = {};
	}

	if (!window.dojoce.themes) {
		window.dojoce.themes = {
			noTheme: {}
		};
	}

	window.dojoce.themes[THEME_NAME] = theme;

	if (!window.dojoce.theme) {
		Object.defineProperty(window.dojoce, 'theme', {
			set: function(value) {
				value = value === '' ? 'noTheme' : value;
				if (value === window.dojoce.theme) {
					return;
				}
				if (window.dojoce.themes[value]) {
					window.dojoce._theme = value;
					window.dispatchEvent(new CustomEvent('dojo-theme-set', {}));
				}
			},
			get: function() {
				return window.dojoce._theme;
			}
		});
	}
	window.dojoce.theme = THEME_NAME;
}
