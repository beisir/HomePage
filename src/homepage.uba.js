/**
 * [商铺3.0页面底部脚本]
 * @param  {Object} window [窗口对象]
 * @param  {Object} document [文档对象]
 */
(function(window, document) {

	/**
	 * [全网百度统计代码]
	 */
	var _hmt = _hmt || [];
	(function() {
		if (HC.util.isPageInFrame() === 0) {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?e1e386be074a459371b2832363c0d7e7";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		}
	})();

	// var _hmt = _hmt || [];
	// (function() {
	//     var hm = document.createElement("script");
	//     hm.src = "https://hm.baidu.com/hm.js?a660dceb0ffa4117b87cfb3c2f4a7e19";
	//     var s = document.getElementsByTagName("script")[0];
	//     s.parentNode.insertBefore(hm, s);
	// })();



	/**
	 * [_vds growing用户行为分析系统]
	 */
	// var _vds = _vds || [];
	// window._vds = _vds;
	// (function() {
	//     _vds.push(['setAccountId', '9c75e186a1a30142']);
	//     (function() {
	//         var vds = document.createElement('script');
	//         vds.type = 'text/javascript';
	//         vds.async = true;
	//         vds.src = ('https:' == document.location.protocol ? '//' : '//') + 'dn-growing.qbox.me/vds.js';
	//         var s = document.getElementsByTagName('script')[0];
	//         s.parentNode.insertBefore(vds, s);
	//     })();
	// })();

	/**
	 * [_hcuba_ 加载用户行为分析脚本]  
	 */
	/* 2019-07-23 注释调此方法因为 logrecordservice.min.js 包含此方法， */
	/* var _hcuba_ = _hcuba_ || [];
	(function() {
		_hcuba_.push(['setAccountId', 'B005585D636AFB96E0DA28C288C5C650']);
		(function() {
			var uba = document.createElement('script');
			uba.type = 'text/javascript';
			uba.async = true;
			uba.src = ('https:' == document.location.protocol ? '//styles.hc360.com' : '//style.org.hc360.cn') + '/js/projects/UBA/dist/js/uba.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(uba, s);
		})();
	})(); */

	/**
	 * 载入用户行为分析脚本
	 */
	document.write('<script src="//style.org.hc360.cn/js/module/common/logrecordservice.min.js"><\/script>');

	/**
	 * [页面加载完后，载入前端性能分析脚本]
	 */
	HC.util.addEventListener(window, 'load', function() {
		HC.util.addScript('//style.org.hc360.cn/js/module/common/performance.min.js');
	});

	/**
	 * [页面加载完后，发送百度联盟广告曝光统计数据]
	 */
	HC.util.addEventListener(window, 'load', function() {
		/**
		 * [若未初始化百度网盟广告相关的全局变量，则直接返回]
		 */
		if (!(window.BAIDU_DUP && window.BAIDU_DUP.slot && window.BAIDU_DUP.slot.slotsMap)) {
			return;
		}

		/**
		 * [list 获取百度广告数据对象]
		 * @type {Array}
		 */
		var list = window.BAIDU_DUP.slot.slotsMap,

			/**
			 * [exposureadvert 曝光数据列表]
			 * @type {Array}
			 */
			exposureadvert = [],

			/**
			 * 当前鼠标悬浮的广告位对象
			 */
			activeContainer;

		/**
		 * [绑定窗口丢失焦点事件，获取当前鼠标悬浮的广告位对象，发送监测点数据；]
		 * [因为百度广告是以iframe的方式引入到页面的，所以无法直接通过绑定元素点击的方式绑定点击事件来发送监测数据；此处为广告位元素绑定了移入移出事件，通过一个相对宽泛作用域的变量在移入时记录移入的广告位数据对象，移出时清除广告数据对象。]
		 * [在window丢失焦点时，且广告为数据对象非空时视为广告位被点击，进而发送广告位点击检测数据]
		 */
		$(window).blur(function() {
			if (activeContainer) {
				HC.UBA.sendUserlogsElement('UserBehavior_adbaidu_' + activeContainer.slotId);
			}
		});

		/**
		 * [填充曝光数据列表并发送]
		 */
		$.each(list, function(index, node) {
			exposureadvert.push("gg_bdwm?pid=" + HC.PAGE_ID + "&bd=" + node.slotId);

			/**
			 * [绑定百度广告元素点击事件，并发送检测数据]
			 */
			if (node.containerId) {
				$('#' + node.containerId).mouseover(function(event) {
					activeContainer = node;
				}).mouseout(function() {
					activeContainer = null;
					window.focus();
				});
			}
		});

		/**
		 * [expdata 待发送数据集]
		 * @type {Object}
		 */
		var expdata = {
			exposurecompany: "",
			exposureproduct: "",
			exposureadvert: exposureadvert.join("#&#")
		};

		/**
		 * [发送数据，延迟两秒可能是怕影响到其他曝光数据的发送]
		 */
		setTimeout(function() {
			HC.exposure.sendexposurelog(expdata);
		}, 2000);
	});

})(window, document);
