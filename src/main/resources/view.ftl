<#assign coreContext='app_angular_thf'>

<#--
	Esse parâmetro é utilizado para não exibir as widgets de header, menu, footer e help.
	É necessário esse tratamento para que não tenha o comportamento de exibir e esconder
	esses itens no carregamento da página.
-->
<#if pageRender.getParameterUrl("isFullScreen")?has_content>
	<#assign isFullScreen = pageRender.getParameterUrl("isFullScreen") == "true">
<#else>
	<#assign isFullScreen = false>
</#if>

<#import "/wcm.ftl" as wcm/>
<div class="wcm-wrapper-content <#if isFullScreen>fs</#if>">
	<#if !isFullScreen>
		<@wcm.header />
		<@wcm.menu />
	</#if>
	<div class="wcm-all-content">
		<div id="wcm-content" class="clearfix wcm-background">
			<div id="wcm_widget" class="clearfix">
				<#if !isFullScreen>
					<@wcm.help />
				</#if>
				<link href="/${coreContext}/resources/styles.css" rel="stylesheet"/>
				<app-root></app-root>
			</div>
			<#if !isFullScreen>
				<@wcm.footer layoutuserlabel="wcm.user.footer" />
			</#if>
		</div>
	</div>
</div>

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

<script type="text/javascript" src="/${coreContext}/resources/runtime.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/polyfills.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/scripts.js"></script>
<script type="text/javascript" src="/${coreContext}/resources/main.js"></script>

