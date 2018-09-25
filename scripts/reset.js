const scripts = require('@dojo/scripts/utils/process');

(async function() {
	await scripts.runAsPromise('git', ['checkout', 'package.json', 'package-lock.json'], {});
})();
