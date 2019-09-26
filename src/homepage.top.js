(function() {
	/**
	 * [_isMobile 导入是否移动设备判断模块]
	 * @type {Object}
	 */
	var _isMobile = require('ismobilejs'),

		/**
		 * [获取全局对象引用]
		 */
		_global = (function() {
			return this;
		}());

	/**
	 * [若当前客户端设备为手机设备，且请求参数中不包含强制不跳转移动站的参数，则跳转到移动站]
	 */
	if (_isMobile.phone && (_global.location.search.indexOf('ads') === -1)) {
		_global.location.href = '//m.hc360.com';
		return;
	}

	/**
	 * [初始化命名空间、初始化页面开始加载事件]
	 * @type {Object}
	 */
	_global.HC = _global.HC || {};
	_global.startTime = +new Date();
}());
