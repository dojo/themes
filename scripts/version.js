const scripts = require('@dojo/scripts/utils/process');

let release = null;

process.argv.forEach((arg) => {
	if (arg.indexOf('--release') !== -1) {
		release = arg.split('=')[1];
	}
});

if (!release) {
	throw new Error('No release found');
}

(async function() {
	await scripts.runAsPromise('npm', ['version', release, '--no-git-tag-version'], {});
})();
