var theme = theme.default;
var _theme;

if (theme) {
	if (!window.dojoce) {
		window.dojoce = {};
	}

	if (!window.dojoce.themes) {
		window.dojoce.themes = {};
	}

	if (!window.dojoce.theme) {
		Object.defineProperty(window.dojoce, 'theme', {
			set: function(value) {
				if (value === window.dojo.theme) {
					return;
				}
				if (window.dojo.themes[value]) {
					window.dispatchEvent(new CustomEvent('dojo-theme-set', {}));
					_theme = value;
				}
			},
			get: function() {
				return _theme;
			}
		});
	}

	window.dojoce.themes[THEME_NAME] = theme;
	window.dojoce.theme = THEME_NAME;
}
