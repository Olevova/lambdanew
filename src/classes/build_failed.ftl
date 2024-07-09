<#-- Uses FreeMarker template syntax, template guide can be found at http://freemarker.org/docs/dgui.html -->

<#import "common.ftl" as common>
<#import "responsibility.ftl" as resp>

<#global subject>[<@common.subjMarker/> FAILED] ${project.name}:${buildType.name} - Build: ${build.buildNumber}</#global>

<#global body>Build ${project.fullName} :: ${buildType.name} <@common.short_build_info build/> failed  ${var.buildShortStatusDescription}.
<@resp.buildTypeInvestigation buildType true/>
Agent: ${agentName}
Build results: ${link.buildResultsLink}

${var.buildCompilationErrors}${var.buildFailedTestsErrors}${var.buildChanges}
<@common.footer/></#global>

<#global bodyHtml>
<div>
  <div>
    <p>Best team Colorjob</p>
    Build <b>${project.fullName?html} :: ${buildType.name?html}</b> <a href='${link.buildResultsLink}'><@common.short_build_info build/></a> failed
    ${var.buildShortStatusDescription}
  </div>
  <div><@resp.buildTypeInvestigation buildType true/></div>
  <@common.build_agent build/>
  <@common.build_comment build/>

<#-- MODIFICATION START -->
<#-- You can make conditional process with build.name = "PROJECT_NAME" && buildType.name="CONFIGURATION_NAME" instead. -->
  <#if buildType.externalId = "YOUR_BUILD_CONFIGURATION_ID">
	<br>
    <a href='http://www.your-teamcity-site.net/repository/download/${buildType.externalId}/.lastSuccessful/bapul-release-${build.buildNumber}.apk'>Click here to download apk.</a>
	<br>
  </#if>
<#-- MODIFICATION END -->
 
  <br>
  <@common.build_changes var.changesBean/>
  <@common.compilation_errors var.compilationBean/>
  <@common.test_errors var.failedTestsBean/>
  <@common.footerHtml/>
</div>
</#global>