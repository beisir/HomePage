webpackJsonp([1,3],{18:function(e,o){e.exports=function(){var e="ignoreIELowVersionPrompt",o=HC.util.cookie.get(e);HC.env.ie&&HC.env.ie<7&&0===HC.util.isPageInFrame()&&!o&&HC.util.addEventListener(window,"load",function(){HC.util.addCss("//style.org.hc360.cn/css/IE6/style.css",function(){var o=jQuery(['<div class="ie6UpgradeVersionPrompt">','<div class="ie6Box">','<div class="ie6alertCon">','<div class="ie6alertBorder"></div>','<div class="ie6proTop">',"<h2>","\u63d0\u793a","</h2>",'<a class="ie6close" href="javascript:void(0);" onclick="return false;"></a>',"</div>",'<div class="ie6proBox">',"<h3>","\u4f60\u77e5\u9053\u4f60\u7684Internet Explorer\u8fc7\u65f6\u4e86\u5417?","</h3>","<p>","\u4e3a\u4e86\u8ba9\u60a8\u5f97\u5230\u6700\u597d\u7684\u4f53\u9a8c\u6548\u679c,\u6211\u4eec\u5efa\u8bae\u60a8\u5347\u7ea7\u5230\u6700\u65b0\u7248\u672c\u7684IE\u6d4f\u89c8\u5668\u6216\u9009\u62e9\u5176\u4ed6\u6d4f\u89c8\u5668.\u63a8\u8350\u7ed9\u5927\u5bb6\u51e0\u6b3e\u725b\u903c\u7684\u6d4f\u89c8\u5668\u5427\uff01","</p>","</div>",'<div class="ie6BoxIco">','<a href="//www.google.cn/chrome/browser/desktop/index.html" class="chrome" target="_blank">chrome</a> <a href="//windows.microsoft.com/zh-cn/internet-explorer/download-ie" class="IE" target="_blank">IE</a> <a href="//se.360.cn/" class="l360" target="_blank">360\u5b89\u5168</a> <a href="//www.firefox.com.cn/" class="huohu" target="_blank">\u706b\u72d0</a> <a href="//ie.sogou.com/" class="sougou" target="_blank">\u641c\u72d7</a> <a href="//browser.qq.com/" class="LQQ" target="_blank">QQ</a>',"</div>","</div>","</div>",'<div class="ie6Bg"><iframe frameborder="0" scrolling="no" class="ie6BgFrame"></iframe></div>',"</div>"].join("")).appendTo("body");setTimeout(function(){jQuery("a.ie6close",o).focus()},0),document.getElementsByTagName("html")[0].style.overflow="hidden",document.body.onmousewheel=function(e){return!1};var i="resize."+Math.random();jQuery(window).bind(i,function(){var e=jQuery(this),i=e.height(),r=e.width(),s=e.scrollTop(),t=jQuery("div.ie6Box",o),a=jQuery("div.ie6Bg",o),n=jQuery("body").height(),c=t.outerWidth(),l=t.height(),d=r/2-c/2,u=s+(i-l)/2;n<i&&(n=i),t.css({left:d+"px",top:u+"px",position:"absolute",margin:"0px"}),a.css({height:n+"px"})}).resize(),jQuery("div.ie6Bg",o).css({height:jQuery(document).height()+"px"}),jQuery("a.ie6close",o).click(function(r){o.remove(),HC.util.cookie.set(e,"1",{expires:3650,path:"/",domain:"hc360.com"}),document.getElementsByTagName("html")[0].style.overflowX="auto",document.getElementsByTagName("html")[0].style.overflowY="scroll",document.body.onmousewheel=function(e){return!0},jQuery(window).unbind(i)})})})}}});