/**
 * 首屏大图下面轮播
 */
// (function($, window, document, undefined) {
//     var methods = {
//         init: function(options) {
//             var $this = this;

//             //获取并初始化配置信息
//             var opt = $this.data('data-options');
//             if (!opt) {
//                 if (options.auto) {
//                     options.timer = setInterval(function() {
//                         methods.next.call($this);
//                     }, options.duration);
//                 }
//                 options.itemLength = $(options.itemWrap).children().length;
//                 options.itemWidth = $(options.itemWrap).children().outerWidth();

//                 //初始化滚动元素宽度
//                 $(options.itemWrap).css({
//                     left: '0px',
//                     width: options.itemWidth * options.itemLength + 'px'
//                 });

//                 //设置首项和末项样式
//                 $(options.itemWrap).children().css({
//                     'position': 'relative'
//                 });
//             }
//             $this.data('data-options', $.extend({}, opt, options));

//             //显示指定项
//             methods.next.call($this, options.index);

//             //绑定向左滚动按钮事件
//             $(options.btnLeft).click(function() {
//                 methods.prev.call($this);
//             });

//             //绑定向右滚动按钮事件
//             $(options.btnRight).click(function() {
//                 methods.next.call($this);
//             });

//             //绑定索引按钮事件
//             $(options.navWrap).children().click(function() {
//                 methods.next.call($this, $(this).index());
//             });

//             //监听鼠标事件
//             if (options.mouse) {
//                 $this.bind('mouseover', function() {
//                     var _this = $(this),
//                         _opt = _this.data('data-options');
//                     window.clearInterval(_opt.timer);
//                     $(_opt.btnLeft + ',' + _opt.btnRight).show();
//                     if (_opt.mouseoverCallBackFunc) {
//                         _opt.mouseoverCallBackFunc();
//                     }
//                     _this.data('data-options', opt);
//                 }).bind('mouseout', function() {
//                     var _this = $(this),
//                         _opt = _this.data('data-options');
//                     if (_opt.auto) {
//                         _opt.timer = setInterval(function() {
//                             methods.next.call($this);
//                         }, _opt.duration);
//                         $(_opt.btnLeft + ',' + _opt.btnRight).hide();
//                     }
//                     _this.data('data-options', opt);
//                 });
//             }

//             /**
//              * [窗口大小变化时，让轮播图自适应]
//              */
//             $(window).on('resize.slider', methods.throttle(function() {
//                 methods.resize.call($this);
//             }, 100));
//         },
//         next: function(index) {
//             var $this = this;
//             var opt = $this.data('data-options');
//             if (opt && opt.animate) {
//                 opt.index = (typeof index != 'undefined') ? index : ++opt.index;
//                 if (opt.index == opt.itemLength) {
//                     $(opt.itemWrap).children(':first').css({
//                         'left': opt.itemLength * opt.itemWidth + 'px'
//                     });
//                 } else if (opt.index > opt.itemLength) {
//                     $(opt.itemWrap).children(':first').css({
//                         'left': '0px'
//                     });
//                     $(opt.itemWrap).css({
//                         'left': '0px'
//                     });
//                     opt.index = opt.index - opt.itemLength;
//                 }
//                 $this.data('data-options', opt);
//                 methods.animate.call($this);
//             }
//         },
//         prev: function(index) {
//             var $this = this;
//             var opt = $this.data('data-options');
//             if (opt && opt.animate) {
//                 opt.index = (typeof index != 'undefined') ? index : --opt.index;
//                 if (opt.index == -1) {
//                     $(opt.itemWrap).children(':last').css({
//                         'left': -(opt.itemLength * opt.itemWidth) + 'px'
//                     });
//                 } else if (opt.index < -1) {
//                     $(opt.itemWrap).children(':last').css({
//                         'left': '0px'
//                     });
//                     $(opt.itemWrap).css({
//                         'left': -(opt.itemLength - 1) * opt.itemWidth
//                     });
//                     opt.index = opt.itemLength + opt.index;
//                 }
//                 $this.data('data-options', opt);
//                 methods.animate.call($this);
//             }
//         },
//         animate: function() {
//             var $this = this;
//             var opt = $this.data('data-options');
//             opt.animate = false;
//             if (opt.index == 0) {
//                 $(opt.itemWrap).children(':first').css({
//                     'left': '0px'
//                 });
//             }
//             if (opt.index == opt.itemLength) {
//                 $(opt.itemWrap).children(':last').css({
//                     'left': '0px'
//                 });
//             }
//             $(opt.itemWrap).animate({
//                 "left": -(opt.index * opt.itemWidth)
//             }, "normal", function() {
//                 opt.animate = true;
//                 $(opt.navWrap).children()
//                     .removeClass(opt.navActiveClass)
//                     .eq(opt.index == opt.itemLength ? 0 : opt.index).addClass(opt.navActiveClass);
//             });
//             $this.data('data-options', opt);
//         },

//         /**
//          * [resize 窗口大小变化后，根据实际的元素尺寸重新初始化轮播图插件]
//          */
//         resize: function() {
//             var _this = this,
//                 _opt = _this.data('data-options'),
//                 _idx = _opt.index || 0;

//             /**
//              * 暂停轮播
//              */
//             clearTimeout(_opt.timer);

//             /**
//              * [重新获取轮播包裹元素宽度]
//              */
//             _opt.itemWidth = $(_opt.itemWrap).children().outerWidth();

//             /**
//              * [设置滚动元素宽度，并按照当前滚动位置设置滚动元素偏移量]
//              */
//             $(_opt.itemWrap).css({
//                 left: -(_opt.itemWidth * _idx) + 'px',
//                 width: _opt.itemWidth * _opt.itemLength + 'px'
//             });

//             /**
//              * [按照新配置开始轮播]
//              */
//             _opt.timer = setInterval(function() {
//                 methods.next.call(_this);
//             }, _opt.duration);

//             /**
//              * 保存配置
//              */
//             _this.data('data-options', _opt);

//             /**
//              * 显示指定页
//              */
//             methods.next.call(_this, _opt.index);
//         },

//         /**
//          * [throttle 绑定窗口 resize 事件]
//          */
//         throttle: function(fn, delay) {
//             var _timer = null;
//             return function() {
//                 var _this = this,
//                     _args = arguments;
//                 clearTimeout(_timer);
//                 _timer = setTimeout(function() {
//                     fn.apply(_this, _args);
//                 }, delay);
//             };
//         }
//     };
//     $.fn.slider = function() {
//         var options = {
//             duration: 4000, //滚动延迟事件
//             auto: true, //自动滚动
//             index: 0, //当前项索引
//             stepSize: 3, //每次滚动项数目
//             mouse: true, //是否监听鼠标事件
//             animate: true, //动画是否执行完毕
//             itemWrap: '.itemWrap', //图片列表包裹元素
//             navWrap: '.navWrap', //图片导航包裹元素
//             navActiveClass: 'curr', //当前图片导航样式名
//             btnLeft: '.btnLeft', //左方向按钮元素
//             btnRight: '.btnRight', //右方向按钮元素
//             mouseoverCallBackFunc: null
//         };
//         if (methods[arguments[0]]) {
//             return methods[arguments[0]].apply(this, Array.prototype.slice.call(arguments, 1));
//         } else if (typeof arguments[0] === 'object' || !arguments[0]) {
//             return methods.init.call(this, $.extend({}, options, arguments[0]));
//         }
//     };
// })(jQuery, window, document);


$(function() {
	// 轮播图开始
	var left = $('.ScrLeft'); //获取左点击
	var right = $('.ScrRight'); //获取右点击
	var aSmall = $('.Snumb li');
	var aLi = $('.mad_bx ul li');
	var iNow = 0;
	var flag_ = false;
	var timer;
	$("#picList li:eq(0)").addClass("cur");
	aLi.eq(0).stop().animate({
		opacity: 1
	}, 0);
	// 左点击
	left.click(function() {
		clearInterval(timer);

		iNow--;
		// 判断回流
		if (iNow < 0) {
			iNow = 5;
		}
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 0);
		aLi.eq(iNow).stop().animate({
			opacity: 1

		}, 0);
		aLi.eq(iNow).addClass("cur").siblings().removeClass("cur");
		aSmall.eq(iNow).addClass('Scur').siblings().removeClass('Scur');

	});
	// 右点击切换
	right.click(function() {
		clearInterval(timer);

		iNow++;
		if (iNow > 3) {
			iNow = 0;
		}
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 0);
		aLi.eq(iNow).stop().animate({
			opacity: 1

		}, 0);
		aLi.eq(iNow).addClass("cur").siblings().removeClass("cur");
		aSmall.eq(iNow).addClass('Scur').siblings().removeClass('Scur');

	});

	//手动切换
	aSmall.click(function() {
		clearInterval(timer);
		var n = $(this).index();

		//        var iNow = $(this).index();
		//        alert(iNow);
		iNow = n;
		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 0);
		aLi.eq(iNow).stop().animate({
			opacity: 1

		}, 0);
		aLi.eq(iNow).addClass("cur").siblings().removeClass("cur");
		aSmall.eq(iNow).addClass('Scur').siblings().removeClass('Scur');

	});
	// 封装函数体
	function move1() {

		aLi.eq(iNow).siblings().stop().animate({
			opacity: 0

		}, 0);
		aLi.eq(iNow).stop().animate({
			opacity: 1
		}, 0);
		aLi.eq(iNow).addClass("cur").siblings().removeClass("cur");
		aSmall.eq(iNow).addClass('Scur').siblings().removeClass('Scur');
	}

	// 定个定时器的初始值

	function run2() {

		iNow++;
		if (iNow > 3) {
			iNow = 0;
		}
		move1();
	}

	// 定时器
	timer = setInterval(run2, 4000);



	//当鼠标划入，停止轮播图切换
	$(".scrollpic").hover(function() {
		clearInterval(timer);

	}, function() {
		timer = setInterval(run2, 4000);

	})
})
lunbo_down();

function lunbo_down() {
	$(".picScrRight").on("click", function() {
		var ulwidth = -$(".picListScroll ul").width() / 2;
		$(".picListScroll ul").animate({
			'left': ulwidth
		}, 1000);
		$(this).addClass("grayBtn");
		$(".picScrLeft").removeClass("grayBtn")
	});
	$(".picScrLeft").on("click", function() {
		$(".picListScroll ul").animate({
			'left': 0
		}, 1000);
		$(this).addClass("grayBtn");
		$(".picScrRight").removeClass("grayBtn")
	})
}
//右侧求购信息轮播
buy_lunbo();

function buy_lunbo() {
	var index = 0,
		timer_k;

	function move_qiu() {
		index++;
		if (index >= 8) {
			index = 0;

			$(".ttLinkList").animate({
				top: 0
			}, 0)
			clearInterval(timer_k);
			timer_k = setInterval(move_qiu, 2800)
		} else {
			$(".ttLinkList").animate({
				top: -index * 78
			}, 3000)
		}

	}
	timer_k = setInterval(move_qiu, 2800)
	//当鼠标划入，停止轮播图切换
	$(".ttLinkList").hover(function() {
		$(this).stop()
		clearInterval(timer_k);

	}, function() {
		clearInterval(timer_k);
		timer_k = setInterval(move_qiu, 2800);

	})
}
//右侧供应信息轮播
gongying_lunbo();

function gongying_lunbo() {
	var index = 0,
		timer_k;

	function move_gong() {
		index++;
		if (index >= 8) {
			index = 0;

			$(".ttLinkList_1").animate({
				top: 0
			}, 0)
			clearInterval(timer_k);
			timer_k = setInterval(move_gong, 2800)
		} else {
			$(".ttLinkList_1").animate({
				top: -index * 78
			}, 3000)
		}

	}
	timer_k = setInterval(move_gong, 2800)
	//当鼠标划入，停止轮播图切换
	$(".ttLinkList_1").hover(function() {
		$(this).stop()
		clearInterval(timer_k);

	}, function() {
		clearInterval(timer_k);
		timer_k = setInterval(move_gong, 2800);

	})
}
