<#assign coreContext='app_angular_poui'>

<link href="/${coreContext}/resources/styles.css" rel="stylesheet"/>

<app-root></app-root>

<script>

	/**
	 * The script below sets some enviroment variables to be used inside
	 * Angular application. (see: app.config.ts)
	 */
	(function setEnvironmentParams() {

		var protectedContextPath = '${protectedContextPath!""}';
		var contextPath = '${contextPath!""}';

		// base url for frontend application
		var baseUrl = protectedContextPath + '/${tenantCode!""}';

		// replace '/p' for public pages
		if (window.location.href.indexOf(protectedContextPath) === -1) {
			baseUrl = baseUrl.replace(protectedContextPath, contextPath);
		}

		// base url for frontend application
		window['_app_baseUrl'] = baseUrl;

		// get page code
		window['_app_pageCode'] = '${(pageCode!"")}';

	})();

</script>

<script src="/${coreContext}/resources/runtime.js" defer></script>
<script src="/${coreContext}/resources/polyfills-es5.js" nomodule defer></script>
<script src="/${coreContext}/resources/polyfills.js" defer></script>
<script src="/${coreContext}/resources/scripts.js" defer></script>
<script src="/${coreContext}/resources/main.js" defer></script>
