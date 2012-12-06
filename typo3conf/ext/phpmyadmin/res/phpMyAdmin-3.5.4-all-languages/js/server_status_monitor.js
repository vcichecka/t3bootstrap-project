$(function(){function K(){if(window.localStorage){if(window.localStorage.monitorCharts)e.charts=$.parseJSON(window.localStorage.monitorCharts);if(window.localStorage.monitorSettings)m=$.parseJSON(window.localStorage.monitorSettings);$('a[href="#clearMonitorConfig"]').toggle(e.charts!=null);if(e.charts!=null&&L!=window.localStorage.monitorVersion){$("div#emptyDialog").dialog({title:PMA_messages.strIncompatibleMonitorConfig});$("div#emptyDialog").html(PMA_messages.strIncompatibleMonitorConfigDescription);
var a={};a[PMA_messages.strClose]=function(){$(this).dialog("close")};$("div#emptyDialog").dialog({width:400,buttons:a})}}if(e.charts==null)e.charts=defaultChartGrid;if(m==null)m=W;$('select[name="gridChartRefresh"]').attr("value",m.gridRefresh/1E3);$('select[name="chartColumns"]').attr("value",m.columns);e.gridMaxPoints=m.gridMaxPoints=="auto"?Math.round((m.chartSize.width-40)/12):m.gridMaxPoints;e.xmin=(new Date).getTime()-server_time_diff-e.gridMaxPoints*m.gridRefresh;e.xmax=(new Date).getTime()-
server_time_diff+m.gridRefresh;$("table#chartGrid").html("<tr><td></td><td></td></tr><tr><td></td><td></td></tr>");M={width:$("table#chartGrid td:nth-child(2)").offset().left-$("table#chartGrid td:nth-child(1)").offset().left,height:$("table#chartGrid tr:nth-child(2) td:nth-child(2)").offset().top-$("table#chartGrid tr:nth-child(1) td:nth-child(1)").offset().top};$("table#chartGrid").html("");var b=[];$.each(e.charts,function(d){b.push(d)});b.sort();for(a=0;a<b.length;a++)N(e.charts[b[a]],true);a=
$("table#chartGrid .monitorChart").length;var c=(m.columns-a%m.columns)%m.columns;for(a=0;a<c;a++)$("table#chartGrid tr:last").append("<td></td>");$("table#chartGrid tr td").css("width",G().width+"px");O();H()}function X(){e.charts&&$.each(e.charts,function(c,d){try{d.chart.destroy()}catch(f){}});try{e.refreshRequest.abort()}catch(a){}try{clearTimeout(e.refreshTimeout)}catch(b){}$("table#chartGrid").html("");e.charts=null;e.chartAI=0;m=null}function I(){var a=null;if(e.charts){a={};$.each(e.charts,
function(b,c){for(var d=0;d<c.nodes.length;d++){a[c.nodes[d].dataPoint]=[];for(var f=0;f<c.chart.series[d].data.length;f++)a[c.nodes[d].dataPoint].push([c.chart.series[d].data[f].x,c.chart.series[d].data[f].y])}})}X();K();a&&$.each(e.charts,function(b,c){for(var d=0;d<c.nodes.length;d++)a[c.nodes[d].dataPoint]&&c.chart.series[d].setData(a[c.nodes[d].dataPoint])})}function G(){var a=$("div#logTable").innerWidth()/m.columns-(m.columns-1)*M.width;return{width:a,height:0.75*a}}function N(a,b){var c={title:a.title,
grid:{drawBorder:false,shadow:false,background:"rgba(0,0,0,0)"},axes:{xaxis:{renderer:$.jqplot.DateAxisRenderer,tickOptions:{formatString:"%H:%M:%S",showGridline:false},min:e.xmin,max:e.xmax},yaxis:{min:0,max:100,tickInterval:20}},seriesDefaults:{rendererOptions:{smooth:true}},highlighter:{show:true,showTooltip:false}};c.series=a.series;if($("#gridchart"+e.chartAI).length==0){var d=$("table#chartGrid .monitorChart").length;if(d==0||!(d%m.columns))$("table#chartGrid").append("<tr></tr>");$("table#chartGrid tr:last").append('<td><div class="ui-state-default monitorChart" id="gridchart'+
e.chartAI+'"></div></td>')}d=[];var f=Array(2);for(i in a.series)d.push([f]);a.chart=$.jqplot("gridchart"+e.chartAI,d,c);a.numPoints=0;if(b!=true){e.charts["c"+e.chartAI]=a;O()}$("#gridchart"+e.chartAI).bind("jqplotMouseDown",function(h,k,g){z=true;u.push(g.xaxis);$("#selection_box").length&&$("#selection_box").remove();selectionBox=$('<div id="selection_box" style="z-index:1000;height:250px;position:absolute;background-color:#87CEEB;opacity:0.4;filter:alpha(opacity=40);pointer-events:none;">');$(document.body).append(selectionBox);
E=h.pageX;P=h.pageY;selectionBox.attr({id:"selection_box"}).css({top:P-k.y,left:E}).fadeIn()});$("#gridchart"+e.chartAI).bind("jqplotMouseUp",function(h,k,g){if(z){u.push(g.xaxis);if(u[1]<u[0])u=[];else{Y(new Date(Math.ceil(u[0])),new Date(Math.ceil(u[1])));u=[];z=false}}});$("#gridchart"+e.chartAI).bind("jqplotMouseMove",function(h,k,g,l){if(l!=null){$("#tooltip_box").length&&$("#tooltip_box").css({left:h.pageX+15,top:h.pageY+15,padding:"5px"}).fadeIn();var j=new Date(Math.ceil(l.data[0]));k=j.getHours();
k<10&&(k="0"+k);g=j.getMinutes();g<10&&(g="0"+g);j=j.getSeconds();j<10&&(j="0"+j);j=k+":"+g+":"+j;l="<b>"+j+"<br/>"+l.data[1]+"</b>";$("#tooltip_box").html(l)}z&&E!=undefined&&$("#selection_box").css({width:Math.ceil(h.pageX-E)}).fadeIn()});$("#gridchart"+e.chartAI).bind("jqplotMouseEnter",function(h){$("#tooltip_box").length&&A.remove();A=$('<div style="z-index:1000;height:40px;position:absolute;background-color:#FFFFFD;opacity:0.8;filter:alpha(opacity=80);">');$(document.body).append(A);A.attr({id:"tooltip_box"}).css({top:h.pageY+
15,left:h.pageX+15}).fadeIn()});$("#gridchart"+e.chartAI).bind("jqplotMouseLeave",function(){$("#tooltip_box").length&&A.remove();z=false});$(document.body).mouseup(function(){$("#selection_box").length&&selectionBox.remove()});$("table#chartGrid div svg").find("*[zIndex=20], *[zIndex=21], *[zIndex=19]").toggle(v);e.chartAI++}function Y(a,b){$('#logAnalyseDialog input[name="dateStart"]').attr("value",formatDate(a,"yyyy-MM-dd HH:mm:ss"));$('#logAnalyseDialog input[name="dateEnd"]').attr("value",formatDate(b,
"yyyy-MM-dd HH:mm:ss"));var c={};c[PMA_messages.strFromSlowLog]=function(){Q("slow",a,b);$(this).dialog("close")};c[PMA_messages.strFromGeneralLog]=function(){Q("general",a,b);$(this).dialog("close")};$("#logAnalyseDialog").dialog({width:"auto",height:"auto",buttons:c})}function Q(a,b,c){b=Date.parse($('#logAnalyseDialog input[name="dateStart"]').prop("value"))||b;c=Date.parse($('#logAnalyseDialog input[name="dateEnd"]').prop("value"))||c;Z({src:a,start:b,end:c,removeVariables:$("input#removeVariables").prop("checked"),
limitTypes:$("input#limitTypes").prop("checked")})}function H(){e.refreshRequest=$.post("server_status.php?"+url_query,{ajax_request:true,chart_data:1,type:"chartgrid",requiredData:$.toJSON(e.dataList)},function(a){var b;try{b=$.parseJSON(a)}catch(c){return serverResponseError()}var d,f=0,h;$.each(e.charts,function(k,g){var l=g.chartID,j=1;if(b[l]){for(var n=0;n<g.nodes.length;n++){if(f==0&&n==0){h=s==null?b.x-e.xmax:parseInt(b.x-s.x);e.xmin+=h;e.xmax+=h}if(g.nodes[n].transformFn)d=aa(g.nodes[n].transformFn,
b[l][n],s==null||s[l]==null?null:s[l][n]);else{d=parseFloat(b[l][n][0].value);if(g.nodes[n].display=="differential"){if(s==null||s[l]==null)continue;d-=s[l][n][0].value}if(g.nodes[n].valueDivisor)d/=g.nodes[n].valueDivisor}if(d!=undefined){g.chart.series[n].data.push([b.x,d]);j=j>d?j:d}}g.maxYLabel.length==0&&g.maxYLabel.push([e.xmax,1]);if(j>g.maxYLabel[g.maxYLabel.length-1][1])g.maxYLabel.push([b.x,Math.ceil(j*1.2)]);else j>g.maxYLabel[0][1]&&g.maxYLabel.splice(1,0,[b.x,Math.ceil(j*1.2)]);if(g.maxYLabel.length>
1&&g.maxYLabel[g.maxYLabel.length-1][0]<e.xmin){g.maxYLabel.pop();g.maxYLabel.sort(function(o,F){return o[1]-F[1]})}g.chart.axes.xaxis.max=e.xmax;g.chart.axes.xaxis.min=e.xmin;g.chart.axes.yaxis.max=g.maxYLabel[g.maxYLabel.length-1][1];g.chart.axes.yaxis.tickInterval=g.maxYLabel[g.maxYLabel.length-1][1]/5;f++;e.charts[k].numPoints++;e.redrawCharts&&g.chart.replot()}});s=b;e.refreshTimeout=setTimeout(H,m.gridRefresh)})}function aa(a,b,c){switch(a){case "cpu-linux":if(c==null)break;b=b[0];c=c[0];a=
b.busy+b.idle-(c.busy+c.idle);return 100*(a-(b.idle-c.idle))/a;case "qce":if(c==null)break;a=b[0].value-c[0].value;if(b[1].value-c[1].value==0)return 0;return a/(b[1].value-c[1].value+a)*100;case "qcu":if(b[1].value==0)return 0;return 100-b[0].value/b[1].value*100}}function O(){e.dataList={};var a=0;$.each(e.charts,function(b,c){e.dataList[a]=[];for(var d=0;d<c.nodes.length;d++)e.dataList[a][d]=c.nodes[d].dataPoints;e.charts[b].chartID=a;a++})}function Z(a){function b(f){var h=false,k,g=$("div#logTable input#filterQueryText").val();
k=g.length==0?null:RegExp(g,"i");var l=0,j=0,n=0,o,F=$("div#logTable input#noWHEREData").attr("checked"),ba=/([^=]+)=(\d+|((\'|"|).*?[^\\])\4((\s+)|$))/gi,ca=/([a-z0-9_]+)\(.+?\)/gi,B={},R={},C=false,w,da=e.logDataCols[e.logDataCols.length-2],ea=e.logDataCols[e.logDataCols.length-1],J=a.src=="slow",r={};$("div#logTable table tbody tr td:nth-child("+(e.logDataCols.length-1)+")").each(function(){if(f&&$(this).html().match(/^SELECT/i))if(F){o=$(this).text().replace(ba,"$1=...$6").trim();o=o.replace(ca,
" $1(...)");if(B[o]){B[o]+=parseInt($(this).next().text());j+=parseInt($(this).next().text());C=true}else{B[o]=parseInt($(this).next().text());R[o]=n;$(this).text(o)}if(J){var p=o,x=$(this).parent().html().match(/<td>(.*?)<\/td>/gi);r[p]||(r[p]=[0,0,0,0]);r[p][0]+=S(x[2].replace(/(<td>|<\/td>)/gi,""));r[p][1]+=S(x[3].replace(/(<td>|<\/td>)/gi,""));r[p][2]+=parseInt(x[4].replace(/(<td>|<\/td>)/gi,""));r[p][3]+=parseInt(x[5].replace(/(<td>|<\/td>)/gi,""))}}else{w=$(this).parent().data("query");$(this).text(w[da]);
$(this).next().text(w[ea]);if(J){$(this).parent().children("td:nth-child(3)").text(w.query_time);$(this).parent().children("td:nth-child(4)").text(w.lock_time);$(this).parent().children("td:nth-child(5)").text(w.rows_sent);$(this).parent().children("td:nth-child(6)").text(w.rows_examined)}}if(!C&&k!=null&&!k.exec($(this).text()))C=true;if(C)$(this).parent().css("display","none");else{j+=parseInt($(this).next().text());l++;h=!h;$(this).parent().css("display","");if(h){$(this).parent().addClass("odd");
$(this).parent().removeClass("even")}else{$(this).parent().addClass("even");$(this).parent().removeClass("odd")}}C=false;n++});if(f){if(F){var T,y,fa=$("div#logTable table tbody");$.each(R,function(p,x){if(!(B[p]<=1)){y=fa.children("tr:nth-child("+(x+1)+")");T=y.children(":nth-child("+e.logDataCols.length+")");T.text(B[p]);if(J){y.children("td:nth-child(3)").text(U(r[p][0]));y.children("td:nth-child(4)").text(U(r[p][1]));y.children("td:nth-child(5)").text(r[p][2]);y.children("td:nth-child(6)").text(r[p][3])}}})}$("div#logTable table").trigger("update");
setTimeout(function(){$("div#logTable table").trigger("sorton",[[[e.logDataCols.length-1,1]]])},0)}$("div#logTable table tfoot tr").html('<th colspan="'+(e.logDataCols.length-1)+'">'+PMA_messages.strSumRows+" "+l+'<span style="float:right">'+PMA_messages.strTotal+'</span></th><th align="right">'+j+"</th>")}var c=null;if(!a.removeVariables)a.removeVariables=false;if(!a.limitTypes)a.limitTypes=false;$("#emptyDialog").dialog({title:PMA_messages.strAnalysingLogsTitle});$("#emptyDialog").html(PMA_messages.strAnalysingLogs+
' <img class="ajaxIcon" src="'+pmaThemeImage+'ajax_clock_small.gif" alt="">');var d={};d[PMA_messages.strCancelRequest]=function(){c!=null&&c.abort();$(this).dialog("close")};$("#emptyDialog").dialog({width:"auto",height:"auto",buttons:d});c=$.get("server_status.php?"+url_query,{ajax_request:true,log_data:1,type:a.src,time_start:Math.round(a.start/1E3),time_end:Math.round(a.end/1E3),removeVariables:a.removeVariables,limitTypes:a.limitTypes},function(f){var h;try{h=$.parseJSON(f)}catch(k){return serverResponseError()}if(h.rows.length!=
0){e.logDataCols=ga(h);$("#emptyDialog").dialog({title:PMA_messages.strLoadingLogs});$("#emptyDialog").html("<p>"+PMA_messages.strLogDataLoaded+"</p>");$.each(h.sum,function(g,l){g=g.charAt(0).toUpperCase()+g.slice(1).toLowerCase();if(g=="Total")g="<b>"+g+"</b>";$("#emptyDialog").append(g+": "+l+"<br/>")});if(h.numRows>12){$("div#logTable").prepend('<fieldset id="logDataFilter">\t<legend>'+PMA_messages.strFiltersForLogTable+'</legend>\t<div class="formelement">\t\t<label for="filterQueryText">'+PMA_messages.strFilterByWordRegexp+
'</label>\t\t<input name="filterQueryText" type="text" id="filterQueryText" style="vertical-align: baseline;" />\t</div>'+(h.numRows>250?' <div class="formelement"><button name="startFilterQueryText" id="startFilterQueryText">'+PMA_messages.strFilter+"</button></div>":"")+'\t<div class="formelement">       <input type="checkbox" id="noWHEREData" name="noWHEREData" value="1" />        <label for="noWHEREData"> '+PMA_messages.strIgnoreWhereAndGroup+"</label>   </div</fieldset>");$("div#logTable input#noWHEREData").change(function(){b(true)});
h.numRows>250?$("div#logTable button#startFilterQueryText").click(b):$("div#logTable input#filterQueryText").keyup(b)}f={};f[PMA_messages.strJumpToTable]=function(){$(this).dialog("close");$(document).scrollTop($("div#logTable").offset().top)}}else{$("#emptyDialog").dialog({title:PMA_messages.strNoDataFoundTitle});$("#emptyDialog").html("<p>"+PMA_messages.strNoDataFound+"</p>");f={};f[PMA_messages.strClose]=function(){$(this).dialog("close")}}$("#emptyDialog").dialog("option","buttons",f)})}function S(a){a=
a.split(":");return parseInt(a[0]*3600)+parseInt(a[1]*60)+parseInt(a[2])}function U(a){hours=Math.floor(a/3600);a-=hours*3600;minutes=Math.floor(a/60);a-=minutes*60;if(hours<10)hours="0"+hours;if(minutes<10)minutes="0"+minutes;if(a<10)a="0"+a;return hours+":"+minutes+":"+a}function ga(a){var b=a.rows,c=[],d=$('<table border="0" class="sortable"></table>'),f,h,k;$("#logTable").html(d);for(var g=function(n,o){switch(n){case "user_host":return o.replace(/(\[.*?\])+/g,"")}return o},l=0;l<b.length;l++){if(l==
0){$.each(b[0],function(n){c.push(n)});d.append('<thead><tr><th class="nowrap">'+c.join('</th><th class="nowrap">')+"</th></tr></thead>");d.append(f=$("<tbody></tbody>"))}f.append(h=$('<tr class="noclick"></tr>'));for(var j=0;j<c.length;j++){if(j==c.length-2&&b[l][c[j]].match(/^SELECT/i)){h.append(k=$('<td class="linkElem">'+g(c[j],b[l][c[j]])+"</td>"));k.click(ha)}else h.append("<td>"+g(c[j],b[l][c[j]])+"</td>");h.data("query",b[l])}}d.append('<tfoot><tr><th colspan="'+(c.length-1)+'">'+PMA_messages.strSumRows+
" "+a.numRows+'<span style="float:right">'+PMA_messages.strTotal+'</span></th><th align="right">'+a.sum.TOTAL+"</th></tr></tfoot>");if($("#logTable th:last").html()=="#"){$("#logTable th:last").append("&nbsp;"+PMA_getImage("b_docs.png","",{"class":"qroupedQueryInfoIcon"}));a=PMA_messages.strCountColumnExplanation;if(groupInserts)a+="<p>"+PMA_messages.strMoreCountColumnExplanation+"</p>";$("img.qroupedQueryInfoIcon").qtip({content:a,position:{corner:{target:"bottomMiddle",tooltip:"topRight"}},hide:{delay:1E3}})}$("div#logTable table").tablesorter({sortList:[[c.length-
1,1]],widgets:["fast-zebra"]});$("div#logTable table thead th").append('<img class="icon sortableIcon" src="themes/dot.gif" alt="">');return c}function ha(){var a=$(this).parent().data("query"),b=a.argument||a.sql_text;b=PMA_SQLPrettyPrint(b);codemirror_editor.setValue(b);setTimeout(function(){codemirror_editor.refresh()},50);b={};b[PMA_messages.strAnalyzeQuery]=function(){ia(a)};b[PMA_messages.strClose]=function(){$("div#queryAnalyzerDialog div.placeHolder").html("");codemirror_editor.setValue("");
$(this).dialog("close")};$("div#queryAnalyzerDialog").dialog({width:"auto",height:"auto",resizable:false,buttons:b})}function ia(a){a=a.db||"";$("div#queryAnalyzerDialog div.placeHolder").html(PMA_messages.strAnalyzing+' <img class="ajaxIcon" src="'+pmaThemeImage+'ajax_clock_small.gif" alt="">');$.post("server_status.php?"+url_query,{ajax_request:true,query_analyzer:true,query:codemirror_editor.getValue(),database:a},function(b){b=$.parseJSON(b);var c=0;if(b.error)$("div#queryAnalyzerDialog div.placeHolder").html('<div class="error">'+
b.error+"</div>");else{$("div#queryAnalyzerDialog div.placeHolder").html('<table width="100%" border="0"><tr><td class="explain"></td><td class="chart"></td></tr></table>');var d="<b>"+PMA_messages.strExplainOutput+"</b> "+explain_docu;if(b.explain.length>1){d+=" (";for(var f=0;f<b.explain.length;f++){if(f>0)d+=", ";d+='<a href="#showExplain-'+f+'">'+f+"</a>"}d+=")"}d+="<p></p>";for(f=0;f<b.explain.length;f++){d+='<div class="explain-'+f+'"'+(f>0?'style="display:none;"':"")+">";$.each(b.explain[f],
function(l,j){j=j==null?"null":j;if(l=="type"&&j.toLowerCase()=="all")j='<span class="attention">'+j+"</span>";if(l=="Extra")j=j.replace(/(using (temporary|filesort))/gi,'<span class="attention">$1</span>');d+=l+": "+j+"<br />"});d+="</div>"}d+="<p><b>"+PMA_messages.strAffectedRows+"</b> "+b.affectedRows;$("div#queryAnalyzerDialog div.placeHolder td.explain").append(d);$('div#queryAnalyzerDialog div.placeHolder a[href*="#showExplain"]').click(function(){var l=$(this).attr("href").split("-")[1];$(this).parent().find('div[class*="explain"]').hide();
$(this).parent().find('div[class*="explain-'+l+'"]').show()});if(b.profiling){var h=[],k='<table class="queryNums"><thead><tr><th>'+PMA_messages.strStatus+"</th><th>"+PMA_messages.strTime+"</th></tr></thead><tbody>",g;for(f=0;f<b.profiling.length;f++){g=parseFloat(b.profiling[f].duration);h.push([b.profiling[f].state,g]);c+=g;k+="<tr><td>"+b.profiling[f].state+" </td><td> "+PMA_prettyProfilingNum(g,2)+"</td></tr>"}k+="<tr><td><b>"+PMA_messages.strTotalTime+"</b></td><td>"+PMA_prettyProfilingNum(c,
2)+"</td></tr>";k+="</tbody></table>";$("div#queryAnalyzerDialog div.placeHolder td.chart").append("<b>"+PMA_messages.strProfilingResults+" "+profiling_docu+'</b> (<a href="#showNums">'+PMA_messages.strTable+'</a>, <a href="#showChart">'+PMA_messages.strChart+"</a>)<br/>"+k+' <div id="queryProfiling"></div>');$('div#queryAnalyzerDialog div.placeHolder a[href="#showNums"]').click(function(){$("div#queryAnalyzerDialog div#queryProfiling").hide();$("div#queryAnalyzerDialog table.queryNums").show();return false});
$('div#queryAnalyzerDialog div.placeHolder a[href="#showChart"]').click(function(){$("div#queryAnalyzerDialog div#queryProfiling").show();$("div#queryAnalyzerDialog table.queryNums").hide();return false});profilingChart=PMA_createProfilingChartJqplot("queryProfiling",h);$("div#queryProfiling").resizable()}}})}function D(){var a={};$.each(e.charts,function(b,c){a[b]={};a[b].nodes=c.nodes;a[b].settings=c.settings;a[b].title=c.title});if(window.localStorage){window.localStorage.monitorCharts=$.toJSON(a);
window.localStorage.monitorSettings=$.toJSON(m);window.localStorage.monitorVersion=L}$('a[href="#clearMonitorConfig"]').show()}$("div#statustabs_charting div.tabLinks").show();$("div#statustabs_charting img#loadingMonitorIcon").remove();if(!codemirror_editor){var V=$("#sqlquery");if(V.length>0&&typeof CodeMirror!="undefined")codemirror_editor=CodeMirror.fromTextArea(V[0],{lineNumbers:true,matchBrackets:true,indentUnit:4,mode:"text/x-mysql"})}$("div#logAnalyseDialog .datetimefield").each(function(){PMA_addDatepicker($(this))});
var s=null,q=null,M,L="1.0",e={charts:null,refreshTimeout:null,refreshRequest:null,chartAI:0,redrawCharts:false,dataList:[],gridMaxPoints:20,xmin:-1,xmax:-1},m=null,W={columns:3,chartSize:{width:295,height:250},gridMaxPoints:"auto",gridRefresh:5E3},v=false,t={qce:{title:PMA_messages.strQueryCacheEfficiency,series:[{label:PMA_messages.strQueryCacheEfficiency}],nodes:[{dataPoints:[{type:"statusvar",name:"Qcache_hits"},{type:"statusvar",name:"Com_select"}],transformFn:"qce"}],maxYLabel:[]},qcu:{title:PMA_messages.strQueryCacheUsage,
series:[{label:PMA_messages.strQueryCacheUsed}],nodes:[{dataPoints:[{type:"statusvar",name:"Qcache_free_memory"},{type:"servervar",name:"query_cache_size"}],transformFn:"qcu"}],maxYLabel:[]}},u=[],E,P,z=false,A;switch(server_os){case "WINNT":$.extend(t,{cpu:{title:PMA_messages.strSystemCPUUsage,series:[{label:PMA_messages.strAverageLoad}],nodes:[{dataPoints:[{type:"cpu",name:"loadavg"}]}],maxYLabel:[]},memory:{title:PMA_messages.strSystemMemory,series:[{label:PMA_messages.strTotalMemory,fill:true,
stackSeries:true},{dataType:"memory",label:PMA_messages.strUsedMemory,fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"MemTotal"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"MemUsed"}],valueDivisor:1024}],maxYLabel:[]},swap:{title:PMA_messages.strSystemSwap,series:[{label:PMA_messages.strTotalSwap,fill:true,stackSeries:true},{label:PMA_messages.strUsedSwap,fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"SwapTotal"}]},{dataPoints:[{type:"memory",
name:"SwapUsed"}]}],maxYLabel:[]}});break;case "Linux":$.extend(t,{cpu:{title:PMA_messages.strSystemCPUUsage,series:[{label:PMA_messages.strAverageLoad}],nodes:[{dataPoints:[{type:"cpu",name:"irrelevant"}],transformFn:"cpu-linux"}],maxYLabel:[]},memory:{title:PMA_messages.strSystemMemory,series:[{label:PMA_messages.strUsedMemory,fill:true,stackSeries:true},{label:PMA_messages.strCachedMemory,fill:true,stackSeries:true},{label:PMA_messages.strBufferedMemory,fill:true,stackSeries:true},{label:PMA_messages.strFreeMemory,
fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"MemUsed"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"Cached"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"Buffers"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"MemFree"}],valueDivisor:1024}],maxYLabel:[]},swap:{title:PMA_messages.strSystemSwap,series:[{label:PMA_messages.strUsedSwap,fill:true,stackSeries:true},{label:PMA_messages.strCachedSwap,fill:true,stackSeries:true},{label:PMA_messages.strFreeSwap,
fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"SwapUsed"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"SwapCached"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"SwapFree"}],valueDivisor:1024}],maxYLabel:[]}});break;case "SunOS":$.extend(t,{cpu:{title:PMA_messages.strSystemCPUUsage,series:[{label:PMA_messages.strAverageLoad}],nodes:[{dataPoints:[{type:"cpu",name:"loadavg"}]}],maxYLabel:[]},memory:{title:PMA_messages.strSystemMemory,series:[{label:PMA_messages.strUsedMemory,
fill:true,stackSeries:true},{label:PMA_messages.strFreeMemory,fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"MemUsed"}],valueDivisor:1024},{dataPoints:[{type:"memory",name:"MemFree"}],valueDivisor:1024}],maxYLabel:[]},swap:{title:PMA_messages.strSystemSwap,series:[{label:PMA_messages.strUsedSwap,fill:true,stackSeries:true},{label:PMA_messages.strFreeSwap,fill:true,stackSeries:true}],nodes:[{dataPoints:[{type:"memory",name:"SwapUsed"}],valueDivisor:1024},{dataPoints:[{type:"memory",
name:"SwapFree"}],valueDivisor:1024}],maxYLabel:[]}})}defaultChartGrid={c0:{title:PMA_messages.strQuestions,series:[{label:PMA_messages.strQuestions}],nodes:[{dataPoints:[{type:"statusvar",name:"Questions"}],display:"differential"}],maxYLabel:[]},c1:{title:PMA_messages.strChartConnectionsTitle,series:[{label:PMA_messages.strConnections},{label:PMA_messages.strProcesses}],nodes:[{dataPoints:[{type:"statusvar",name:"Connections"}],display:"differential"},{dataPoints:[{type:"proc",name:"processes"}]}],
maxYLabel:[]},c2:{title:PMA_messages.strTraffic,series:[{label:PMA_messages.strBytesSent},{label:PMA_messages.strBytesReceived}],nodes:[{dataPoints:[{type:"statusvar",name:"Bytes_sent"}],display:"differential",valueDivisor:1024},{dataPoints:[{type:"statusvar",name:"Bytes_received"}],display:"differential",valueDivisor:1024}],maxYLabel:[]}};if(server_db_isLocal){defaultChartGrid.c3=t.cpu;defaultChartGrid.c4=t.memory;defaultChartGrid.c5=t.swap}$('a[href="#rearrangeCharts"], a[href="#endChartEditMode"]').click(function(){v=
!v;if($(this).attr("href")=="#endChartEditMode")v=false;$("table#chartGrid div svg").find("*[zIndex=20], *[zIndex=21], *[zIndex=19]").toggle(v);$('a[href="#endChartEditMode"]').toggle(v);if(v){$("#statustabs_charting .popupContent").hide().removeClass("openedPopup");$("#chartGrid").sortableTable({ignoreRect:{top:8,left:G().width-63,width:54,height:24},events:{drop:function(a,b,c){var d,f,h,k=$(a).children().first().attr("id");if($(b).children().length>0)h=$(b).children().first().attr("id");$.each(e.charts,
function(j,n){if(n.chart.options.chart.renderTo==k)d=j;if(h&&n.chart.options.chart.renderTo==h)f=j});if(f){if(d){dragChart=e.charts[d];e.charts[d]=e.charts[f];e.charts[f]=dragChart}else{var g=[];parseInt(f.substr(1));a=c.col+c.row*m.columns;b={};c=0;$.each(e.charts,function(j){j!=f&&g.push(j)});g.sort();for(var l=0;l<g.length;l++){if(g[l]==a){b["c"+c++]=e.charts[f];a=-1}b["c"+c++]=e.charts[g[l]]}if(a!=-1)b["c"+c++]=e.charts[f];e.charts=b}D()}}}})}else{$("#chartGrid").sortableTable("destroy");D()}return false});
$('div#statustabs_charting div.popupContent select[name="chartColumns"]').change(function(){m.columns=parseInt(this.value);var a=G();$("table#chartGrid tr td").css("width",a.width+"px");for(var b,c=$("table#chartGrid tr:first"),d=0;c.length!=0;){b=1;c.find("td").each(function(){if(b>m.columns){c.next().length==0&&c.after("<tr></tr>");c.next().prepend($(this))}b++});if(c.next().length>0)for(var f=m.columns-c.find("td").length,h=0;h<f;h++){c.append(c.next().find("td:first"));c.nextAll().each(function(){$(this).next().length!=
0&&$(this).append($(this).next().find("td:first"))})}c=c.next();d++}$.each(e.charts,function(k,g){g.chart.setSize(a.width,a.height,false)});if(m.gridMaxPoints=="auto")e.gridMaxPoints=Math.round((a.width-40)/12);e.xmin=(new Date).getTime()-server_time_diff-e.gridMaxPoints*m.gridRefresh;e.xmax=(new Date).getTime()-server_time_diff+m.gridRefresh;v&&$("#chartGrid").sortableTable("refresh");D()});$('div#statustabs_charting div.popupContent select[name="gridChartRefresh"]').change(function(){m.gridRefresh=
parseInt(this.value)*1E3;clearTimeout(e.refreshTimeout);e.refreshRequest&&e.refreshRequest.abort();e.xmin=(new Date).getTime()-server_time_diff-e.gridMaxPoints*m.gridRefresh;e.xmax=(new Date).getTime()-server_time_diff+m.gridRefresh;$.each(e.charts,function(a,b){b.chart.axes.xaxis.max=e.xmax;b.chart.axes.xaxis.min=e.xmin});e.refreshTimeout=setTimeout(H,m.gridRefresh);D()});$('a[href="#addNewChart"]').click(function(){var a={};a[PMA_messages.strAddChart]=function(){if($('input[name="chartType"]:checked').val()==
"preset")q=t[$('div#addChartDialog select[name="presetCharts"]').prop("value")];else if(!q||!q.nodes||q.nodes.length==0){alert(PMA_messages.strAddOneSeriesWarning);return}q.title=$('input[name="chartTitle"]').attr("value");N($.extend(true,{},q));q=null;D();$(this).dialog("close")};a[PMA_messages.strClose]=function(){q=null;$("span#clearSeriesLink").hide();$("#seriesPreview").html("");$(this).dialog("close")};var b=$('div#addChartDialog select[name="presetCharts"]');if(b.html().length==0){$.each(t,
function(c,d){b.append('<option value="'+c+'">'+d.title+"</option>")});b.change(function(){$("input#chartPreset").trigger("click");$('input[name="chartTitle"]').attr("value",t[$(this).prop("value")].title)})}$("div#addChartDialog").dialog({width:"auto",height:"auto",buttons:a});$("div#addChartDialog #seriesPreview").html("<i>"+PMA_messages.strNone+"</i>");return false});$('a[href="#exportMonitorConfig"]').click(function(){var a={};$.each(e.charts,function(d,f){a[d]={};a[d].nodes=f.nodes;a[d].settings=
f.settings;a[d].title=f.title});var b={monitorCharts:a,monitorSettings:m},c;$("body").append(c=$('<form method="post" action="file_echo.php?'+url_query+'&filename=1" style="display:none;"></form>'));c.append('<input type="hidden" name="monitorconfig" value="'+encodeURI($.toJSON(b))+'">');c.submit();c.remove()});$('a[href="#importMonitorConfig"]').click(function(){$("div#emptyDialog").dialog({title:PMA_messages.strImportDialogTitle});$("div#emptyDialog").html(PMA_messages.strImportDialogMessage+':<br/><form action="file_echo.php?'+
url_query+'&import=1" method="post" enctype="multipart/form-data"><input type="file" name="file"> <input type="hidden" name="import" value="1"> </form>');var a={};a[PMA_messages.strImport]=function(){var b;$("body").append(b=$('<iframe id="monitorConfigUpload" style="display:none;"></iframe>'));var c=b[0].contentWindow.document;c.open();c.close();mew=c;b.load(function(){var d;try{var f=$("body",$("iframe#monitorConfigUpload")[0].contentWindow.document).html();d=$.secureEvalJSON(f.substring(f.indexOf("{"),
f.lastIndexOf("}")+1))}catch(h){alert(PMA_messages.strFailedParsingConfig);$("div#emptyDialog").dialog("close");return}if(!d||!d.monitorCharts||!d.monitorCharts)alert(PMA_messages.strFailedParsingConfig);else try{window.localStorage.monitorCharts=$.toJSON(d.monitorCharts);window.localStorage.monitorSettings=$.toJSON(d.monitorSettings);I()}catch(k){alert(PMA_messages.strFailedBuildingGrid);window.localStorage.removeItem("monitorCharts");window.localStorage.removeItem("monitorSettings");I()}$("div#emptyDialog").dialog("close")});
$("body",c).append(b=$("div#emptyDialog").find("form"));b.submit();$("div#emptyDialog").append('<img class="ajaxIcon" src="'+pmaThemeImage+'ajax_clock_small.gif" alt="">')};a[PMA_messages.strCancel]=function(){$(this).dialog("close")};$("div#emptyDialog").dialog({width:"auto",height:"auto",buttons:a})});$('a[href="#clearMonitorConfig"]').click(function(){window.localStorage.removeItem("monitorCharts");window.localStorage.removeItem("monitorSettings");window.localStorage.removeItem("monitorVersion");
$(this).hide();I()});$('a[href="#pauseCharts"]').click(function(){e.redrawCharts=!e.redrawCharts;if(e.redrawCharts){$(this).html(PMA_getImage("pause.png")+" "+PMA_messages.strPauseMonitor);if(!e.charts){K();$('a[href="#settingsPopup"]').show()}}else $(this).html(PMA_getImage("play.png")+" "+PMA_messages.strResumeMonitor);return false});$('a[href="#monitorInstructionsDialog"]').click(function(){var a=$("div#monitorInstructionsDialog");a.dialog({width:595,height:"auto"}).find("img.ajaxIcon").show();
var b=function(c){vars={ajax_request:true,logging_vars:true};c&&$.extend(vars,c);$.get("server_status.php?"+url_query,vars,function(d){d=$.parseJSON(d);var f=PMA_getImage("s_success.png"),h="",k="";if(d.general_log=="ON")h=d.slow_query_log=="ON"?PMA_messages.strBothLogOn:PMA_messages.strGenLogOn;if(h.length==0&&d.slow_query_log=="ON")h=PMA_messages.strSlowLogOn;if(h.length==0){f=PMA_getImage("s_error.png");h=PMA_messages.strBothLogOff}k="<b>"+PMA_messages.strCurrentSettings+'</b><br><div class="smallIndent">';
k+=f+h+"<br />";k+=d.log_output!="TABLE"?PMA_getImage("s_error.png")+" "+PMA_messages.strLogOutNotTable+"<br />":PMA_getImage("s_success.png")+" "+PMA_messages.strLogOutIsTable+"<br />";if(d.slow_query_log=="ON"){if(d.long_query_time>2)k+=PMA_getImage("s_attention.png")+" "+$.sprintf(PMA_messages.strSmallerLongQueryTimeAdvice,d.long_query_time)+"<br />";if(d.long_query_time<2)k+=PMA_getImage("s_success.png")+" "+$.sprintf(PMA_messages.strLongQueryTimeSet,d.long_query_time)+"<br />"}k+="</div>";if(is_superuser){k+=
"<p></p><b>"+PMA_messages.strChangeSettings+"</b>";k+='<div class="smallIndent">';k+=PMA_messages.strSettingsAppliedGlobal+"<br/>";f="TABLE";if(d.log_output=="TABLE")f="FILE";k+='- <a class="set" href="#log_output-'+f+'">'+$.sprintf(PMA_messages.strSetLogOutput,f)+" </a><br />";k+=d.general_log!="ON"?'- <a class="set" href="#general_log-ON">'+$.sprintf(PMA_messages.strEnableVar,"general_log")+" </a><br />":'- <a class="set" href="#general_log-OFF">'+$.sprintf(PMA_messages.strDisableVar,"general_log")+
" </a><br />";k+=d.slow_query_log!="ON"?'- <a class="set" href="#slow_query_log-ON">'+$.sprintf(PMA_messages.strEnableVar,"slow_query_log")+" </a><br />":'- <a class="set" href="#slow_query_log-OFF">'+$.sprintf(PMA_messages.strDisableVar,"slow_query_log")+" </a><br />";f=5;if(d.long_query_time>2)f=1;k+='- <a class="set" href="#long_query_time-'+f+'">'+$.sprintf(PMA_messages.setSetLongQueryTime,f)+" </a><br />"}else k+=PMA_messages.strNoSuperUser+"<br/>";k+="</div>";a.find("div.monitorUse").toggle(d.log_output==
"TABLE"&&(d.slow_query_log=="ON"||d.general_log=="ON"));a.find("div.ajaxContent").html(k);a.find("img.ajaxIcon").hide();a.find("a.set").click(function(){var g=$(this).attr("href").split("-");b({varName:g[0].substr(1),varValue:g[1]});a.find("img.ajaxIcon").show()})})};b();return false});$('input[name="chartType"]').change(function(){$("#chartVariableSettings").toggle(this.checked&&this.value=="variable");var a=$('input[name="chartTitle"]').attr("value");if(a==PMA_messages.strChartTitle||a==$('label[for="'+
$('input[name="chartTitle"]').data("lastRadio")+'"]').text())$('input[name="chartTitle"]').data("lastRadio",$(this).attr("id")).attr("value",$('label[for="'+$(this).attr("id")+'"]').text())});$('input[name="useDivisor"]').change(function(){$("span.divisorInput").toggle(this.checked)});$('input[name="useUnit"]').change(function(){$("span.unitInput").toggle(this.checked)});$('select[name="varChartList"]').change(function(){this.selectedIndex!=0&&$("#variableInput").attr("value",this.value)});$('a[href="#kibDivisor"]').click(function(){$('input[name="valueDivisor"]').attr("value",
1024);$('input[name="valueUnit"]').attr("value",PMA_messages.strKiB);$("span.unitInput").toggle(true);$('input[name="useUnit"]').prop("checked",true);return false});$('a[href="#mibDivisor"]').click(function(){$('input[name="valueDivisor"]').attr("value",1048576);$('input[name="valueUnit"]').attr("value",PMA_messages.strMiB);$("span.unitInput").toggle(true);$('input[name="useUnit"]').prop("checked",true);return false});$('a[href="#submitClearSeries"]').click(function(){$("#seriesPreview").html("<i>"+
PMA_messages.strNone+"</i>");q=null;$("span#clearSeriesLink").hide()});$('a[href="#submitAddSeries"]').click(function(){if($("input#variableInput").attr("value").length==0)return false;if(q==null){$("#seriesPreview").html("");q={title:$('input[name="chartTitle"]').attr("value"),nodes:[]}}var a={dataPoints:[{type:"statusvar",name:$("input#variableInput").attr("value")}],name:$("input#variableInput").attr("value"),display:$('input[name="differentialValue"]').attr("checked")?"differential":""};if(a.dataPoint==
"Processes")a.dataType="proc";if($('input[name="useDivisor"]').attr("checked"))a.valueDivisor=parseInt($('input[name="valueDivisor"]').attr("value"));if($('input[name="useUnit"]').attr("checked"))a.unit=$('input[name="valueUnit"]').attr("value");var b=a.display=="differential"?", "+PMA_messages.strDifferential:"";b+=a.valueDivisor?", "+$.sprintf(PMA_messages.strDividedBy,a.valueDivisor):"";b+=a.unit?", "+PMA_messages.strUnit+": "+a.unit:"";$("#seriesPreview").append("- "+a.name+b+"<br>");q.nodes.push(a);
$("input#variableInput").attr("value","");$('input[name="differentialValue"]').attr("checked",true);$('input[name="useDivisor"]').attr("checked",false);$('input[name="useUnit"]').attr("checked",false);$('input[name="useDivisor"]').trigger("change");$('input[name="useUnit"]').trigger("change");$('select[name="varChartList"]').get(0).selectedIndex=0;$("span#clearSeriesLink").show();return false});$("input#variableInput").autocomplete({source:variableNames})});$(function(){$('a[href="#pauseCharts"]').trigger("click")});