module.exports = function() {
	/**
	 * [IE浏览器版本低于7、非引用于框架页、无忽略IE低版本提示cookie]
	 * [ie6UpgradeVersionPrompt 获取IE低版本提示cookie值]
	 */
	var ie6UpgradeVersionPromptCookieKey = 'ignoreIELowVersionPrompt';
	var ie6UpgradeVersionPrompt = HC.util.cookie.get(ie6UpgradeVersionPromptCookieKey);
	if (HC.env.ie && (HC.env.ie < 7) && (HC.util.isPageInFrame() === 0) && (!ie6UpgradeVersionPrompt)) {
		HC.util.addEventListener(window, 'load', function() {
			HC.util.addCss('//style.org.hc360.cn/css/IE6/style.css', function() {
				var htmlEntity = jQuery([
					'<div class="ie6UpgradeVersionPrompt">',
					'<div class="ie6Box">',
					'<div class="ie6alertCon">',
					'<div class="ie6alertBorder"></div>',
					'<div class="ie6proTop">',
					'<h2>',
					'提示',
					'</h2>',
					'<a class="ie6close" href="javascript:void(0);" onclick="return false;"></a>',
					'</div>',
					'<div class="ie6proBox">',
					'<h3>',
					'你知道你的Internet Explorer过时了吗?',
					'</h3>',
					'<p>',
					'为了让您得到最好的体验效果,我们建议您升级到最新版本的IE浏览器或选择其他浏览器.推荐给大家几款牛逼的浏览器吧！',
					'</p>',
					'</div>',
					'<div class="ie6BoxIco">',
					'<a href="//www.google.cn/chrome/browser/desktop/index.html" class="chrome" target="_blank">chrome</a> <a href="//windows.microsoft.com/zh-cn/internet-explorer/download-ie" class="IE" target="_blank">IE</a> <a href="//se.360.cn/" class="l360" target="_blank">360安全</a> <a href="//www.firefox.com.cn/" class="huohu" target="_blank">火狐</a> <a href="//ie.sogou.com/" class="sougou" target="_blank">搜狗</a> <a href="//browser.qq.com/" class="LQQ" target="_blank">QQ</a>',
					'</div>',
					'</div>',
					'</div>',
					'<div class="ie6Bg"><iframe frameborder="0" scrolling="no" class="ie6BgFrame"></iframe></div>',
					'</div>'
				].join('')).appendTo('body');
				/**
				 * [默认设置弹出框关闭按钮获取焦点]
				 */
				setTimeout(function() {
					jQuery('a.ie6close', htmlEntity).focus();
				}, 0);

				/**
				 * [设置窗口不能滚动]
				 */
				document.getElementsByTagName("html")[0].style.overflow = "hidden";
				document.body.onmousewheel = function(event) {
					return false;
				};

				/**
				 * [绑定窗口 resize 事件]
				 */
				var _eventName = 'resize.' + Math.random();
				jQuery(window).bind(_eventName, function() {
					var $window = jQuery(this),
						$windowHeight = $window.height(),
						$windowWidth = $window.width(),
						$windowScrollTop = $window.scrollTop(),
						$dialog = jQuery('div.ie6Box', htmlEntity),
						$dialogOverlayer = jQuery('div.ie6Bg', htmlEntity),
						$bodyHeight = jQuery('body').height(),
						eleWidth = $dialog.outerWidth(),
						eleHeight = $dialog.height(),
						left = $windowWidth / 2 - eleWidth / 2,
						top = $windowScrollTop + ($windowHeight - eleHeight) / 2;
					if ($bodyHeight < $windowHeight) {
						$bodyHeight = $windowHeight;
					}
					$dialog.css({
						'left': left + 'px',
						'top': top + 'px',
						'position': 'absolute',
						'margin': '0px'
					});
					$dialogOverlayer.css({
						'height': $bodyHeight + 'px'
					});
				}).resize();

				/**
				 * 设置遮罩层高度
				 */
				jQuery('div.ie6Bg', htmlEntity).css({
					'height': jQuery(document).height() + 'px'
				});

				/**
				 * [绑定弹出框关闭按钮事件]
				 */
				jQuery('a.ie6close', htmlEntity).click(function(event) {
					htmlEntity.remove();

					/**
					 * [写入 ignoreIELowVersionPrompt 下次不再提醒的cookie]
					 */
					HC.util.cookie.set(ie6UpgradeVersionPromptCookieKey, '1', {
						expires: 3650,
						path: '/',
						domain: 'hc360.com'
					});

					/**
					 * [恢复窗口滚动]
					 */
					document.getElementsByTagName("html")[0].style.overflowX = "auto";
					document.getElementsByTagName("html")[0].style.overflowY = "scroll";
					document.body.onmousewheel = function(event) {
						return true;
					};

					/**
					 * 解除窗口 resize 事件绑定
					 */
					jQuery(window).unbind(_eventName);
				});
			});
		});
	}
};