/**
 * [store 导入存储模块]
 * @type {Object}
 */
var store = require('store');

/**
 * [floorBusinessLogic 楼层业务对象]
 */
function floorBusinessLogic(options) {
	var _this = this;
	$.extend(true, _this, {

		/**
		 * [floorSelected 当前选中楼层]
		 */
		floorSelected: null,

		/**
		 * [floorSetting 当前设置选中楼层]
		 * @type {Object}
		 */
		floorSetting: null,

		/**
		 * [floorSettingTemp 当前设置选中楼层临时变量]
		 * @type {Object}
		 */
		floorSettingTemp: null,

		/**
		 * [floorList 楼层列表]
		 * @type {Array}
		 */
		floorList: [{
			name: "机械工业"
		}, {
			name: "工程机械"
		}, {
			name: "暖通行业"
		}, {
			name: "净水行业"
		}, {
			name: "音响灯光"
		}, {
			name: "广电教育"
		}, {
			name: "汽车行业"
		}, {
			name: "五金行业"
		}, {
			name: "消防行业"
		}, {
			name: "家居家电"
		}, {
			name: "建材家装"
		}, {
			name: "服装纺织"
		}, {
			name: "包装印刷"
		}, {
			name: "礼品玩具"
		}, {
			name: "化工行业"
		}, {
			name: "电子行业"
		}, {
			name: "安防行业"
		}, {
			name: "LED屏"
		}],

		/**
		 * [btnToggleWrapSelectIndustry 设置行业按钮元素]
		 * @type {Object}
		 */
		btnToggleWrapSelectIndustry: $('.tabBoxCon li[data-node-name="btnToggleWrapSelectIndustry"]'),

		/**
		 * [wrapSelectIndustry 设置行业包裹元素]
		 * @type {Object}
		 */
		wrapSelectIndustry: $('.tabBoxCon [data-node-name="wrapSelectIndustry"]'),

		/**
		 * [floorNavWrap 楼层导航包裹元素]
		 * @type {Object}
		 */
		floorNavWrap: $('.tabBoxCon li[data-name]'),

		/**
		 * [mainFloorWrap 主楼层包裹元素]
		 * @type {Object}
		 */
		mainFloorWrap: $('.tabBoxList[data-name]'),

		/**
		 * [deputyFloorWrap 副楼层包裹元素]
		 * @type {Object}
		 */
		deputyFloorWrap: $('.industryListCon'),

		/**
		 * [deputyFloorContainer 副楼层外层包裹元素]
		 * @type {Object}
		 */
		deputyFloorContainer: $('.floorBoxCon'),

		/**
		 * [deputyFloorNumLimitOfFloorContainer 每个副楼层外层包裹元素最多容纳的副楼层数量]
		 * @type {Number}
		 */
		deputyFloorNumLimitOfFloorContainer: 6,

		/**
		 * 用户设置楼层本地存储键
		 */
		storeKeySelectedFloor: 'homepageselectedfloorname',

		/**
		 * [storeKeyFloorClickNum 楼层点击计数本地存储键]
		 * @type {String}
		 */
		storeKeyFloorClickNum: 'homepagefloorclicknum'

	}, options);
}

/**
 * [prototype 楼层业务对象实例方法集]
 * @type {Object}
 */
floorBusinessLogic.prototype = {

	/**
	 * [init 初始化楼层数据]
	 * @type {Object}
	 */
	init: function() {
		var _this = this;

		/**
		 * 初始化楼层导航包裹元素
		 */
		var floorNavData = {};
		_this.floorNavWrap.each(function(index, elem) {
			var $elem = $(elem),
				name = $.trim($elem.attr('data-name'));
			floorNavData[name] = $(elem);
		});

		/**
		 * 初始化主楼层包裹元素
		 */
		var mainFloorData = {};
		_this.mainFloorWrap.each(function(index, elem) {
			var $elem = $(elem),
				name = $.trim($elem.attr('data-name'));
			mainFloorData[name] = $(elem);
		});

		/**
		 * 初始化副楼层包裹元素
		 */
		var deputyFloorData = {};
		_this.deputyFloorWrap.each(function(index, elem) {
			var $elem = $(elem),
				name = $.trim($elem.find('h5').text());
			deputyFloorData[name] = $(elem);
		});

		/**
		 * [floorClickNum 从本地存储中获取导航点击次数]
		 * @type {Object}
		 */
		var floorClickNum = {},
			floorClickData = store.get(_this.storeKeyFloorClickNum) || [];
		$.each(floorClickData, function(index, floor) {
			floorClickNum[floor.name] = parseInt(floor.clicknum) || 0;
		});

		/**
		 * [将楼层导航包裹元素、主楼层包裹元素、副楼层包裹元素填充到楼层列表中]
		 */
		$.each(_this.floorList, function(index, floor) {
			floor.nav = floorNavData[floor.name];
			floor.main = mainFloorData[floor.name];
			floor.deputy = deputyFloorData[floor.name];
			floor.clicknum = floorClickNum[floor.name] || 0;

			// console.log(floor.name, floor.nav.length, floor.main.length, floor.deputy.length, floor.clicknum);
		});

		/**
		 * [绑定导航点击事件]
		 */
		_this.floorNavWrap.click(function(event) {
			var name = $(this).attr('data-name');

			/**
			 * 添加当前行业点击计数
			 */
			_this.addClickNum(name);
			$.each(_this.floorList, function(index, floor) {
				if (floor.name === name) {
					/**
					 * [floorSelected 设置选中楼层]
					 * @type {Object}
					 */
					_this.floorSelected = floor;

					/**
					 * 显示当前选中楼层对象
					 */
					_this.render();
					return false;
				}
			});
		});

		/**
		 * [点击行业分类 主楼层 副楼层里面的链接时，将相应行业的点击次数加1]
		 */
		$(document).delegate([
			_this.deputyFloorWrap.find('a').selector,
			_this.mainFloorWrap.find('a').selector,
			'#H_Bside li[data-name] a',
			'#category H_sideBar_list[data-name] a'
		], 'click', function(event) {
			var name = $(event.target).closest('[data-name]').attr('data-name') || '';

			/**
			 * [判断所在行业是否为空]
			 */
			if (!$.trim(name).length) {
				return;
			}

			/**
			 * 添加当前行业点击计数
			 */
			_this.addClickNum(name);
		});

		/**
		 * [btnSaveSelectIndustry 保存设置行业按钮元素]
		 * @type {Object}
		 */
		// _this.btnSaveSelectIndustry = _this.wrapSelectIndustry.find('button');

		/**
		 * [radioSelectIndustry 设置行业单选按钮元素]
		 * @type {Object}
		 */
		_this.radioSelectIndustry = _this.wrapSelectIndustry.find('[data-name]');

		//
		/**
		 * 绑定设置行业按钮元素点击事件
		 */
		_this.btnToggleWrapSelectIndustry.click(function(event) {
			_this.wrapSelectIndustry.toggle();
		});

		/**
		 * [点击到设置行业区域以外时隐藏设置行业区域]
		 */
		$(document).click(function(event) {
			var target = $(event.target);
			if ((target.closest('[data-node-name="btnToggleWrapSelectIndustry"]').length === 0) && (target.closest('[data-node-name="wrapSelectIndustry"]').length === 0)) {
				_this.wrapSelectIndustry.hide();
			}
		});

		/**
		 * [保存用户设置行业]
		 */
		// _this.btnSaveSelectIndustry.click(function(event) {
		//
		//     /**
		//      * 隐藏设置行业区域
		//      */
		//     _this.wrapSelectIndustry.hide();
		//
		//     /**
		//      * [未选中任何行业]
		//      */
		//     if (!_this.floorSettingTemp.length) {
		//         return;
		//     }
		//
		//     /**
		//      * [floorSetting 同步数据]
		//      * @type {String}
		//      */
		//     _this.floorSetting = _this.floorSettingTemp;
		//
		//     /**
		//      * 保存用户设置行业
		//      */
		//     store.set(_this.storeKeySelectedFloor, _this.floorSetting);
		//
		//     /**
		//      * [重新初始化]
		//      */
		//     _this.initSelectedFloor();
		//
		//     /**
		//      * 渲染页面
		//      */
		//     _this.render();
		// });

		/**
		 * [绑定用户设置行业单选按钮事件]
		 */
		_this.radioSelectIndustry.click(function(event) {
			var _t = $(this),
				_k = $.trim(_t.attr('data-name'));
			/**
			 * [未选中任何行业]
			 */
			if (!_t.length) {
				return;
			}

			/**
			 * 切换显示样式
			 */
			_t.addClass('sCurrent').siblings('[data-name]').removeClass('sCurrent');

			/**
			 * [floorSettingTemp 将当前点击的行业存储到临时变量中]
			 * @type {Object}
			 */
			_this.floorSettingTemp = _k;
		});

		/**
		 * 设置当前选中楼层对象
		 */
		_this.initSelectedFloor();

		/**
		 * 渲染页面
		 */
		_this.render();
	},

	/**
	 * [addClickNum 添加行业点击次数]
	 */
	addClickNum: function(name) {
		var _this = this;
		$.each(_this.floorList, function(index, floor) {
			if (floor.name === name) {
				/**
				 * 更新点击次数
				 */
				floor.clicknum++;
				_this.storeClickNum();
			} else {
				floor.clicknum = 0;
			}
		});
	},

	/**
	 * [storeClickNum 存储用户点击次数]
	 */
	storeClickNum: function() {
		var _this = this;
		var storeObject = $.map(_this.floorList, function(floor, index) {
			return {
				name: floor.name,
				clicknum: floor.clicknum
			};
		});
		store.set(_this.storeKeyFloorClickNum, storeObject);
	},

	/**
	 * [initSelectedFloor 设置当前选中楼层对象]
	 */
	initSelectedFloor: function() {
		var _this = this;

		/**
		 * [获取用户设置的选中行业名称]
		 * @type {String}
		 */
		_this.floorSetting = _this.floorSettingTemp = $.trim(store.get(_this.storeKeySelectedFloor) || '');

		/**
		 * [优先使用用户设置的选中行业]
		 */
		_this.radioSelectIndustry.find('[data-name]').removeClass('sCurrent');

		if (_this.floorSetting.length) {

			/**
			 * 在用户设置行业界面，设置选中行业
			 */
			_this.radioSelectIndustry.filter('[data-name="' + _this.floorSetting + '"]').addClass('sCurrent');

			/**
			 * [查找并设置当前选中行业]
			 */
			$.each(_this.floorList, function(index, floor) {
				if (floor.name === _this.floorSetting) {
					_this.floorSelected = floor;
					return false;
				}
			});

			/**
			 * [找到用户设置的选中]
			 */
			if (_this.floorSelected) {
				return;
			}
		}

		/**
		 * 如用户未设置选中行业，则获取点击次数最高的行业
		 */
		_this.floorSelected = _this.floorList[0];
		$.each(_this.floorList, function(index, floor) {
			if (floor.clicknum > _this.floorSelected.clicknum) {
				_this.floorSelected = floor;
			}
		});
	},
	/**
	 * 交换广告和副楼层的位置以避免出现视觉断层
	 */
	exchangeDeputyFloorAndAd: function() {
		var _this = this;
		// var adCount = $(_this.deputyFloorContainer).find('.allyesAdCon').length;
		//广告1
		var ad = $(_this.deputyFloorContainer).find('.allyesAdCon_1');
		//广告2
		var ad2 = $(_this.deputyFloorContainer).find('.allyesAdCon_2');
		//广告1位置设为7
		var adPos = 7;
		//广告2位置设为12
		var ad2Pos = 12;
		/**
		 * [把两个广告放到设置的位置上]
		 */
		var _childList = $(_this.deputyFloorContainer).children();
		var _adIndex = 0;
		$(_childList).each(function(index, item) {
			if ($(item).css('display') != "none") {
				_adIndex++;
				if ($(item).hasClass('allyesAdCon_1')) {
					//广告1位置需要设为7
					var offset1 = _adIndex - adPos;
					if (offset1 < 0) {
						while (offset1 < 0) {
							ad.next().insertBefore(ad)
								++offset1;
						}
					} else if (offset1 > 0) {
						while (offset1 > 0) {
							ad.prev().insertAfter(ad)
								--offset1;
						}
					}
				}


				if ($(item).hasClass('allyesAdCon_2')) {
					//广告2位置需要设为12
					var offset2 = _adIndex - ad2Pos;
					if (offset2 < 0) {
						while (offset2 < 0) {
							ad2.next().insertBefore(ad2)
								++offset2;
						}
					} else if (offset2 > 0) {
						while (offset2 > 0) {
							ad2.prev().insertAfter(ad2)
								--offset2;
						}
					}
				}

			}

		})

		//测试
		/* _adIndex = 0;
		var _childList1 = $(_this.deputyFloorContainer).children();
		$(_childList1).each(function(index,item){
			if($(item).css('display')!="none"){
				_adIndex++;
				if($(item).hasClass('allyesAdCon')){
					console.log(_adIndex,$(item).attr('class'))
				}
			}
		}) */
	},

	/**
	 * [render 渲染页面]
	 */
	render: function() {
		var _this = this,
			_deputyFloorContainerList = _this.deputyFloorContainer.slice(0),
			_floorList = _this.floorList.slice(0);

		/**
		 * 设置导航显示状态
		 */
		_this.floorSelected.nav && _this.floorSelected.nav.addClass('tbCur').siblings('[data-name]').removeClass('tbCur');

		/**
		 * 设置主楼层显示状态
		 */
		_this.floorSelected.main && _this.floorSelected.main.show().siblings('[data-name]').hide();

		/**
		 * 设置副楼层显示状态
		 */
		_this.deputyFloorWrap.show();
		// _this.floorSelected.deputy && _this.floorSelected.deputy.hide();

		/**
		 * 交换广告和副楼层的位置以避免出现视觉断层
		 */
		_this.exchangeDeputyFloorAndAd();

		/**
		 * 显示懒加载图片
		 */
		$('[data-original]').trigger('appear');
	}
};

module.exports = floorBusinessLogic;
