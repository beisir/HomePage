/**
 * 引入首页样式表
 */
require('./assets/css/index2019.css');

/**
 * 引入浏览器兼容模块
 */
require('json2');
// require('es5-shim');
// require('es5-shim/es5-sham');

/**
 * 引入jQuery模块
 */
require('jquery');

/**
 * 导入窗口适配模块
 */
require('./homepage.layout')();

/**
 * 引入首页初始化模块
 */
require('./homepage.init');

/**
 *引入物流模块
 */
require('./homepage.jsxg');


/**
 * [注册DOMContentLoaded事件]
 */
$(function() {

	/**
	 * 首页核心逻辑，主要为旧有业务整理
	 */
	require('./homepage.core')();

	/**
	 * 加载楼层业务逻辑模块
	 */
	var FloorBusinessLogic = require('./homepage.floor'),
		floorBusinessLogicEntity = new FloorBusinessLogic();
	floorBusinessLogicEntity.init();

	/**
	 * 绑定慧付宝链接点击行为事件
	 */
	// require('./homepage.hfb')();

	/**
	 * 加载新人专享P4P模块
	 */
	HC.HUB.addScript('//style.org.hc360.cn/js/module/p4p/dist/p4p.www.homepage.js', function() {});

	/**
	 * 商学院模块
	 */
	// var BusinessSchool = require('./homepage.businessSchool'),
	//     businessSchoolEntity = new BusinessSchool();
	// businessSchoolEntity.init();
});

/**
 * 引入用户行为分析模块
 */
require('./homepage.uba');
