/**
 * [exports 导出浏览器窗口适配模块]
 */
module.exports = function() {

	/**
	 * [throttle 函数节流]
	 */
	function throttle(fn, delay) {
		var timer = null;
		return function() {
			var _this = this,
				_args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(_this, _args);
			}, delay);
		};
	}

	/**
	 * [resetBodyWidth 重置body大小]
	 */
	function resetBodyWidth() {
		var _width = $(window).width(),
			_body = $(document.body);

		if (_width < 1190) {
			_body.addClass('layout-990');
		} else {
			_body.removeClass('layout-990');
		}
	}

	/**
	 * [绑定窗口大小变化事件]
	 */
	$(window).on('resize.layout', throttle(function() {

		/**
		 * 重置body大小
		 */
		resetBodyWidth();
	}, 100));

	/**
	 * 重置body大小
	 */
	resetBodyWidth();
};
