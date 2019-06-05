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
				<!-- Meu APP ROOT -->
			</div>
			<#if !isFullScreen>
				<@wcm.footer layoutuserlabel="wcm.user.footer" />
			</#if>
		</div>
	</div>
</div>
