/**
 * 注册首屏大图轮播jQuery插件
 */
require('./homepage.slider.js');


/**
 * [首屏渲染模块]
 */
module.exports = function() {
	var navIndex = -1,
		cache_search = {
			normal: {},
			bw: {}
		};

	$(function() {
		ui.initFn();
	});


	//点击扣费的函数，p4p
	function dataProcessing(datalist, data, index, word, bigdata) {
		var self = this;
		var params = {};
		index = Number(index);
		params.keyword = encodeURIComponent(word) || '';
		params.providerid = data.searchResultfoProviderid;
		params.userid = data.searchResultfoUserId || '0';
		params.bcid = data.searchResultfoId;
		params.p4punique = data.searchResultfoUnique || data.searchResultfoUnique;
		params.username = data.searchResultfoUserName;
		params.unitid = data.searchResultfoUnitId || 0;
		params.planid = data.searchResultfoPlanId || 0;
		params.price = data.searchResultfoUseBid || 0;
		params.islike = data.searchResultfoMatchRule || 0;
		params.sortpos = index + 1;
		params.nextprice = datalist[index + 1] && datalist[index + 1].searchResultfoUseBid || 0;
		params.isnextlike = datalist[index + 1] && datalist[index + 1].searchResultfoMatchRule || 0;
		params.lastPrecisePrice = 0;
		params.clickreferer = 3;
		params.onekeytype = data.searchResultfoKypromote;
		params.nextonekeytype = datalist[index + 1] && datalist[index + 1].searchResultfoKypromote;
		params.abtest = bigdata || 0;
		params.pageid = new UUID().createUUID();
		params._ = new Date() * 1;
		return params;
	}

	//
	function UUID() {
		this.id = this.createUUID();
	}

	UUID.prototype.createUUID = function() {
		var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
		var dc = new Date();
		var t = dc.getTime() - dg.getTime();
		var h = '';
		var tl = UUID.getIntegerBits(t, 0, 31);
		var tm = UUID.getIntegerBits(t, 32, 47);
		var thv = UUID.getIntegerBits(t, 48, 59) + '1';
		var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
		var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
			UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
			UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
			UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
			UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
		return tl + h + tm + h + thv + h + csar + csl + h + n;
	};
	UUID.getIntegerBits = function(val, start, end) {
		var base16 = UUID.returnBase(val, 16);
		var quadArray = [];
		var quadString = '';
		var i = 0;
		for (i = 0; i < base16.length; i++) {
			quadArray.push(base16.substring(i, i + 1));
		};

		for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
			if (!quadArray[i] || quadArray[i] === '') {
				quadString += '0';
			} else {
				quadString += quadArray[i];
			};

		};

		return quadString;
	};
	UUID.returnBase = function(number, base) {
		var convert = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
		if (number < base) {
			var output = convert[number];
		} else {
			var MSD = '' + Math.floor(number / base);
			var LSD = number - MSD * base;
			var output;
			if (MSD >= base) {
				output = this.returnBase(MSD, base) + convert[LSD];
			} else {
				output = convert[MSD] + convert[LSD];
			};
		};
		return output;
	};
	UUID.rand = function(max) {
		return Math.floor(Math.random() * max);
	};

	var topSearchCol = $('#w');

	var ui = {
		/*首屏延时菜单*/
		delayOrder: function() {
			var index, timer; //when clearing,the animate and timer must be cleared!
			$("#H_Bside li").mouseover(function(event) {
				clearTimeout(timer);
				$(this).addClass('Navitem_hover').siblings().removeClass('Navitem_hover');
				$("#category").children().hide();
				index = $(this).index();
				$("#category").children().stop(true, false).eq(index).show().animate({
					left: 0,
					opacity: 1
				}, 200).siblings().css({
					left: -10,
					opacity: 1
				});
			});
			$("#H_Bside").mouseleave(function(event) {
				$(this).children().eq(index).removeClass("Navitem_hover");
				$("#category").children().eq(index).animate({
					left: -10,
					opacity: 0
				}, 300);
				timer = setTimeout(function() {
					$("#category").children().eq(index).hide();
				}, 300)
			});
			$("#category").children().mouseover(function() {
				clearTimeout(timer);
				$("#H_Bside").children().eq(index).addClass('Navitem_hover');
				$("#category").children().eq(index).stop(true, true).css({
					opacity: 1,
					left: 0
				}).show();
			}).mouseout(function() {
				$("#H_Bside").children().removeClass('Navitem_hover');
				var _this = this;
				timer = setTimeout(function() {
					$(_this).hide();
				}, 300);
			});

		},

		/***
		 * 谷昊光增加的的一些样式上的改动
		 */

		changeSearchStyle: function() {
			// topSearchCol.focus(function () {
			//   $(this).css({
			//     color: "#333"
			//   });
			//   $('.logo_search_l').addClass('logo_search_2');
			// }).blur(function () {
			//   $(this).css({
			//     color: "#999"
			//   });
			// }).mouseover(function () {
			//   $('.logo_search_l').addClass('logo_search_2');
			// });
			// $('#w2').focus(function () {
			//   $(this).css({
			//     color: "#333"
			//   });
			// }).blur(function () {
			//   $(this).css({
			//     color: "#999"
			//   });
			// }).click(function () {
			//   $(this).css({
			//     color: "#333"
			//   });
			// });
			this.moveNavList();
		},
		moveNavList: function() {
			$('[node-name="searchInput"]').keyup(function(event) {
				var list = $(this).parent().find('.cgListContent li'),
					keyCode = event.keyCode;
				if (keyCode == 38 || keyCode == 40) {
					if (keyCode == 38) { //上
						if (navIndex <= 0) {
							navIndex = list.length
						}
						navIndex--;
					} else if (keyCode == 40) { //下
						if (navIndex >= list.length - 1) {
							navIndex = -1
						}
						navIndex++;
					}
					list.removeClass('active');
					list.eq(navIndex).addClass('active');
					$('[node-name="searchInput"]').val(list.eq(navIndex).find('a').html());
				}
			})
		},

		switchText: function(text) {
			var addressStr = '';
			switch (text) {
				case '货源':
					addressStr += 'seller';
					break;
				case '求购':
					addressStr += 'buyer';
					break;
				case '服务':
					addressStr += 'service';
					break;
				case '供应商':
					addressStr += 'company';
					break;
				case '资讯':
					addressStr += 'news';
					break;
			};
			return addressStr;
		},

		/*搜索框部分*/
		searchbar: function() { //The search bar.
			this.changeSearchStyle();
			var words = ["请输入产品名称", "请输入产品名称", "请输入产品名称", "请输入公司名称或主营产品名称"],
				index = document.getElementById("indexList"),
				aA = index.getElementsByTagName("li"),
				address = "//s.hc360.com/",
				value = "",
				mc = "seller",
				self = this;

			$("<form>", {
				"id": "searchForm",
				"action": '//s.hc360.com/',
				"target": "_blank",
				"method": "get"
			}).appendTo("body");
			$("<input>", {
				"name": "w",
				"type": "hidden"
			}).appendTo($("#searchForm"));
			$("<input>", {
				"name": "mc",
				"type": "hidden"
			}).appendTo($("#searchForm"));

			/*
			 *供应求购公司点击事件
			 */
			for (var i = 0; i < aA.length; i++) {
				aA[i].index = i;
				aA[i].onclick = function(ev) {
					var ev = ev || event;
					$("#search").find(".searchdetail").html(words[this.index]);
					$(this).siblings().removeClass("seleCur");
					$(this).addClass("seleCur");
					$('.seleCon').find('p').text($(this).text());
					$('.searchSele').removeClass('seleShow');
					$('#indexList').slideUp();
					mc = this.id;
					if (ev.preventDefault) {
						ev.preventDefault();
					} else {
						return false;
					}
				}
			}


			/**
			 * 搜索按钮点击事件
			 */
			$("#navSearchBtn").bind("click", function() {
				var value = topSearchCol.val();
				var text = $('.seleCon').find('p').text();
				if (value !== "") {
					var newmc = self.switchText(text);
					self.Cookie.set("searchWord", value + '||' + newmc, 100);

					// console.log(address + newmc + '/search.html?kwd=' + encodeURI(value));

					window.open(address + newmc + '/search.html?kwd=' + encodeURI(value), '_blank');
				} else {
					alert("亲，请输入需要搜索的内容~")
				}
			});

			$('.seleCon').click(function() {
				var searchSele = $('.searchSele');
				if (searchSele.hasClass('seleShow')) {
					$('#indexList').slideUp();
					searchSele.removeClass('seleShow');
				} else {
					$('#indexList').slideDown();
					searchSele.addClass('seleShow');
				}
			});

			$(document).on('click', '.hotSearch li a', function() {
				var keyWord = $(this).html();
				var mc = $(this).attr('mc');
				self.Cookie.set("searchWord", keyWord + '||' + mc, 100);
			});

			//搜索框的键盘事件
			function searchEvent(event) {
				ui.adhide($(this));
				var value = $(this).val();

				if (event.keyCode == 38 || event.keyCode == 40) {
					return false;
				}
				if (event.keyCode == 13) {

					if (value !== "") {
						var texts = $('.seleCon').find('p').text();
						var newmc = self.switchText(texts);
						self.Cookie.set("searchWord", value + '||' + newmc, 100);
						window.open(address + newmc + '/search.html?kwd=' + encodeURI(value), '_blank');


						// self.Cookie.set("searchWord", value + '||' + newmc, 100);
						// window.open(address + "w=" + encodeURI(value) + "&mc=" + newmc, '_blank');
					} else {
						alert("亲，请输入需要搜索的内容~");
						return;
					}
				}
				if ($.trim(value).length === 0) {
					$("#w2").val(" ").next('.searchdetail').show();
					$("#search").find('.SearchWrap_cont').hide();
					$("#search").find('.SearchWrap_record').show();
					return;
				} else {
					$("#w2").next('.searchdetail').hide().end().val(value);
					self.showSearchBus(value, $("#search")); //显示联动商机词
					navIndex = -1
				}

			}

			if (typeof _ == "function") {
				var throwSearch = _.throttle(searchEvent, 300);
				topSearchCol.bind("keyup", throwSearch);
			} else {
				HC.HUB.addScript('//style.org.hc360.com/js/module/www/underscore-min.js', function() {
					var throwSearch = _.throttle(searchEvent, 300);
					topSearchCol.bind("keyup", throwSearch);

				});
			}

			//搜索框的点击事件
			topSearchCol.bind('click', function(evt) {
				var keyword = $(this).val();
				var searchBox = $("#search").find(".SearchWrap_cont");
				// if ($.trim(keyword) !== '' && $("#navCgList li").length > 0) {
				//   searchBox.show();
				// }
				$(this).css({
					color: "#333"
				});
				if ($.trim(keyword) !== '' && searchBox.is(":hidden")) {
					self.showSearchBus(keyword, $("#search")); //显示联动商机词
				}
				evt.stopPropagation();
			});


			//联想词注册点击事件
			$('#navCgList').on('click', 'li', function() {
				var keyword = $(this).find("a").text();
				$('[node-name="searchInput"]').next('.searchdetail').hide().end().val(keyword);
				// if ($('.seleCon').text() === '服务') {
				//
				// 	mc = mc + '&sf=1&pt=1';
				// };
				self.Cookie.set("searchWord", keyword + '||' + mc, 100);
				window.open(address + mc + '/search.html?kwd=' + encodeURI(keyword), '_blank');
			}).on('mouseover', 'li', function() {
				var index = $(this).index();
				navIndex = index;
				$('#navCgList li').removeClass('active');
				$(this).addClass('active');
			});

			//点击页面其他地方，联想词面板隐藏
			$("body").bind('click', function() {
				var panelnode = $(".SearchWrap_cont");
				if ($(this).closest(".SearchWrap").length === 0) {
					panelnode.hide();
				}
			});

		},
		//漂浮的搜素
		topSearch: function() {
			/**
			 * 搜索按钮点击事件
			 */
			var self = this,
				address = "//s.hc360.com/";
			$("#topSearchBtn").bind("click", function() {
				var value = $("#w2").val();
				if (value !== "") {
					self.Cookie.set("searchWord", value + '||' + 'seller', 100);
					window.open(address + "seller/search.html?kwd=" + encodeURI(value), '_blank');
				} else {
					alert("亲，请输入需要搜索的内容~")
				}
			});


			//搜索框的键盘事件
			function topSearch(event) {
				ui.adhide($(this));
				var value = $(this).val();
				var parentBox = $("#topSearchWrap");
				if (event.keyCode == 38 || event.keyCode == 40) {
					return false;
				}
				if (event.keyCode == 13) {

					if (value !== "") {
						self.Cookie.set("searchWord", value + '||' + 'seller', 100);
						window.open(address + "seller/search.html?kwd=" + encodeURI(value), '_blank')
					} else {
						alert("亲，请输入需要搜索的内容~");
						return;
					}
				}

				if ($.trim(value).length === 0) {
					topSearchCol.val(" ").next('.searchdetail').show();
					parentBox.find('.SearchWrap_cont').hide();
					parentBox.find('.SearchWrap_record').show();
					return;
				} else {
					/** 同步默认搜索框的搜索内容 **/
					topSearchCol.next('.searchdetail').hide().end().val(value);
					self.showSearchBus(value, parentBox);
					navIndex = -1;
				}
			}

			if (typeof _ == "function") {
				var throwtopSearch = _.throttle(topSearch, 300);
				$("#w2").bind("keyup", throwtopSearch);
			} else {
				HC.HUB.addScript('//style.org.hc360.com/js/module/www/underscore-min.js', function() {
					var throwtopSearch = _.throttle(topSearch, 300);
					$("#w2").bind("keyup", throwtopSearch);
				});
			}

			//搜索框的点击事件
			$("#w2").bind('click', function(evt) {
				var keyword = $(this).val();
				var searchBox = $("#topSearchWrap").find('.SearchWrap_cont');
				//漂浮搜索框点击
				if ($.trim(keyword) !== '' && searchBox.is(":hidden")) {
					self.showSearchBus(keyword, $("#topSearchWrap")); //显示联动商机词
					// searchBox.show();
				}
				evt.stopPropagation();
			});

			//联想词注册点击事件
			$("#topCglist").on('click', 'li', function() {
				var keyword = $(this).find("a").text();
				self.Cookie.set("searchWord", keyword + '||' + 'seller', 100);
				$('[node-name="searchInput"]').next('.searchdetail').hide().end().val(keyword);
				window.open(address + 'seller/search.html?kwd=' + encodeURI(keyword), '_blank');

			});


		},
		/**
		 * 隐藏最近搜索div
		 * @param content
		 */
		hideCache: function(content) {
			var resultSearch = content.find('.SearchWrap_cont');
			var locationSearch = content.find('.SearchWrap_record');
			if (resultSearch.is(':visible')) {
				locationSearch.hide();
			}
		},
		/**
		 起点升级项目：搜索框加标王联想商机(0-4个标王商机)、普通联想词(5-10个联想词)
		 耿一航起点再次升级项目：起点标位,与之前标王top1一致,满足显示，切之前标王位的第一位消除，后面补足标王展示位，如还不足，再用p4p补，不若还不够，则不用p4p补足
		 */
		showSearchBus: function(keyword, searchContent) {
			var self = this,
				bwList = $(".bwListContent", searchContent),
				cgList = $(".cgListContent", searchContent),
				ajaxUrl = {
					normal: '//s.hc360.com/cgi-bin/checkword',
					biaowang: '//champion.hc360.com/champion/search/busin'
				},
				param = {
					normal: {
						'type': 1,
						'w': keyword,
						'searchtype': 1
					},
					biaowang: {
						'keyword': encodeURIComponent(keyword)
					}
				};
			//起点最高位
			//需判断是否满足显示起点升级位
			var Bcid_q = "";
			$.ajax({
				url: '//champion.hc360.com/champion/search/getUpgradeInfo',
				timeout: 2000,
				data: {
					keyword: encodeURIComponent(keyword),
				},
				dataType: 'jsonp',
				jsonpCallback: 'callback',
				success: function(data_qidian) {
					// var data_qidian = {
					//   businTitle:"刘工GL396D二手液压立体式挖掘机3.5L型号，纯圆钢打造",
					//   bcid:458425107,
					//   param:{
					//     paramName1:"品牌",paramValue1:"大大",
					//     paramName2:"型号",paramValue2:"asd-1",
					//     paramName3:"材质",paramValue3:"不锈钢",
					//     paramName4:"产地",paramValue4:"大北京",
					//   },
					//   picpath:"//img010.hc360.cn/m7/M0D/75/5E/wKhQpFW_TSKER0UqAAAAANBiL9o022.JPG..100x100.JPG",
					//   authenType:"0",
					//   corName:"超级无敌大马甲公司",
					//   authenInfo:"大中华",
					//   userName:"liugongjx",
					//   providerid:""
					// }

					if (data_qidian != undefined) {
						Bcid_q = data_qidian.bcid;

						if (data_qidian.bcid != "") {
							var reg = new RegExp("(" + keyword + ")", "ig"),
								class_em = "",
								title_top = data_qidian.businTitle.replace(reg, "<b>" + keyword + "</b>");
							if (data_qidian.authenType == "1") {
								class_em = "topyzIco"
							} else if (data_qidian.authenType == "0") {
								class_em = "powerIco"
							}
							var str_canshu = '',
								arr_length = data_qidian.params.length;
							for (var i = 0; i < arr_length; i++) {
								str_canshu += '<p><span>' + data_qidian.params[i].paramName + '：</span>' + data_qidian.params[i].paramValue + '</p>'
							}
							var brr_qi =
								'<div class="qdUpgrade">' +
								'<h3><a href="https://b2b.hc360.com/supplyself/' + data_qidian.bcid + '.html" target="_blank">' + title_top + '</a></h3>' +
								'<div class="qdUpgradeLeft">' +
								'<dl>' +
								'<dt><a href="https://b2b.hc360.com/supplyself/' + data_qidian.bcid + '.html" target="_blank"><img src="' + data_qidian.picpath + '" onerror="imgonerror(this);"></a></dt>' +
								'<dd>' +
								str_canshu +
								'</dd>' +
								'</dl>' +
								'<div class="qdUpgradeRig">' +
								'<em class="' + class_em + '"></em>' +
								'<ol>' +
								'<li>' +
								'<span>公司信息：</span>' +
								'<p><b>【已核实】</b><a href="https://' + data_qidian.userName + '.b2b.hc360.com/" target="_blank">' + data_qidian.corName + '</a></p>' +
								'</li>' +
								'<li>' +
								'<span>认证信息：</span>' +
								'<p><em class="dblue">' + data_qidian.authenInfo + '</em>认证</p>' +
								'</li>' +
								'</ol>' +
								'</div>' +
								'</div>' +
								'</div>' +
								'<div class="qdUpgradeBotTit">' +
								'<h4>其他商家产品</h4>' +
								'</div>';
							$(".qidiantop").html(brr_qi);
						}
					} else {
						$(".qidiantop").html("");
					}
					//判断是否有起点升级位
					if (Bcid_q != "") {

						if (!cache_search.bw[keyword]) {
							var bwData = self.getData(ajaxUrl.biaowang, param.biaowang);
							bwData.done(function(result) {
								self.appendBwHtml_top(result, searchContent, data_qidian.bcid);
								if (result && result.length) {
									cache_search.bw[keyword] = result;
								}
							})
						} else {
							self.appendBwHtml_top(cache_search.bw[keyword], searchContent, data_qidian.bcid);
						}
					} else {

						//标王联动商机
						if (!cache_search.bw[keyword]) {
							var bwData = self.getData(ajaxUrl.biaowang, param.biaowang);
							bwData.done(function(result) {
								self.appendBwHtml(result, searchContent);
								if (result && result.length) {
									cache_search.bw[keyword] = result;
								}
							})
						} else {
							self.appendBwHtml(cache_search.bw[keyword], searchContent);
						}
					}
				},
				error: function() {
					//标王联动商机
					if (!cache_search.bw[keyword]) {
						var bwData = self.getData(ajaxUrl.biaowang, param.biaowang);
						bwData.done(function(result) {
							self.appendBwHtml(result, searchContent);
							if (result && result.length) {
								cache_search.bw[keyword] = result;
							}
						})
					} else {
						self.appendBwHtml(cache_search.bw[keyword], searchContent);
					}
				}
			})

			//普通联想词
			if (!cache_search.normal[keyword]) { //缓存普通联想词
				var normalData = self.getData(ajaxUrl.normal, param.normal, "jsoncallback");
				normalData.done(function(result) {
					self.appendNormalHtml(result.words, searchContent);
					if (result.words && result.words.length > 0) {
						cache_search.normal[keyword] = result.words;
					}
				})
			} else {
				self.appendNormalHtml(cache_search.normal[keyword], searchContent);
			}


		},
		//展示搜索框的标王联想词
		appendBwHtml: function(data, context) {
			var self = this,
				strarr = [],
				cgList = $(".cgListContent", context),
				bwList = $(".bwListContent", context);
			var bwarr = [],
				// totalnum = 5;
				totalnum = context.attr('id') == 'topSearchWrap' ? 5 : 4;
			if (data && data.length !== 0) {
				totalnum = data.length > totalnum ? totalnum : data.length;
				for (var i = 0; i < totalnum; i++) {
					var obj = data[i];
					var price = (isNaN(parseInt(obj.pricerange)) || parseInt(obj.pricerange) == 0) ? '电话议价' : "&yen;" + obj.pricerange;
					bwarr.push("<dd><div class='picbox'><a href='//b2b.hc360.com/supplyself/" + obj.infoid + ".html' target='_blank' title='" + decodeURIComponent(obj.title) + "' onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_pic0" + (i + 1) + "\')\"><img src='" + obj.picpath + "' onerror='imgonerror(this);'/></a></div>");
					bwarr.push("<p class='txtil'><a href='//b2b.hc360.com/supplyself/" + obj.infoid + ".html' title='" + decodeURIComponent(obj.title) + "' target='_blank'  onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_txt0" + (i + 1) + "\')\">" + decodeURIComponent(obj.title) + "</a></p>");
					bwarr.push("<p class='pay'>" + price + "</p></dd>");
				}
				if (bwarr.length > 0) {
					bwList.find("dl").html(bwarr.join(''));
					/****
					 * 普通联想词如果大于5个，则只显示前五个
					 */
					if (cgList.find("li").length > 5) {
						cgList.find("li").each(function(index) {
							if (index >= 5) {
								$(this).hide();
							}
						})
					}
				}
				bwList.show();
				$(".SearchWrap_cont", context).show();
			} else {
				bwList.hide();
				bwList.find("dl").html('');
			}
			self.hideCache(context);
		},
		//增加起点升级位，后标王需去掉第一个重复的
		appendBwHtml_top: function(data, context, BCID_) {
			var self = this,
				strarr = [],
				cgList = $(".cgListContent", context),
				bwList = $(".bwListContent", context);
			var bwarr = [],
				// totalnum = 5;
				totalnum = context.attr('id') == 'topSearchWrap' ? 5 : 4;
			if (data && data.length !== 0) {

				//totalnum = data.length > totalnum ? totalnum : data.length;
				var data_long;
				var oneandzero = 0;
				for (var i = 0; i < data.length; i++) {
					if (data[i].infoid == BCID_) {
						oneandzero = 1;
						data.splice(i, 1);
						break;
					}
				}
				//判断下面是否有标1位置
				data_long = data.length > totalnum ? totalnum : data.length;
				// if(oneandzero == 1){
				//   data_long = data.length > totalnum ? totalnum + 1 : data.length;
				// }else{
				//   data_long = data.length > totalnum ? totalnum : data.length;
				// }
				for (var i = 0; i < data_long; i++) {
					var obj = data[i];
					if (obj.infoid) {
						var price = (isNaN(parseInt(obj.pricerange)) || parseInt(obj.pricerange) == 0) ? '电话议价' : "&yen;" + obj.pricerange;
						bwarr.push("<dd><div class='picbox'><a href='//b2b.hc360.com/supplyself/" + obj.infoid + ".html' target='_blank' title='" + decodeURIComponent(obj.title) + "' onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_pic0" + (i + 1) + "\')\"><img src='" + obj.picpath + "' onerror='imgonerror(this);'/></a></div>");
						bwarr.push("<p class='txtil'><a href='//b2b.hc360.com/supplyself/" + obj.infoid + ".html' title='" + decodeURIComponent(obj.title) + "' target='_blank'  onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_txt0" + (i + 1) + "\')\">" + decodeURIComponent(obj.title) + "</a></p>");
						bwarr.push("<p class='pay'>" + price + "</p></dd>");
					}
				}
				//追加判断，如果不够totalnum长度，则用p4p补足
				if (totalnum > data_long) {
					if (data_long <= 0) {
						$(".bwListContent").hide()
					} else {
						$.ajax({
							url: '//s.hc360.com/getmmtlast.cgi',
							data: {
								source: 70,
								w: topSearchCol.val(),
								mc: 'seller',
								sys: 'ls',
								p4p: '1'
							},
							dataType: 'jsonp',
							jsonp: 'jsoncallback',

						}).done(function(data_p4p) {
							var searchdata = data_p4p.searchResultInfo;
							var bigdate = data_p4p.searchResultfoGrayScale;
							var totalnum_q = 3 * totalnum;
							//var num_p4p = searchdata.length > (totalnum - data_long + oneandzero) ? totalnum - data_long + oneandzero : searchdata.length
							for (var i = 0; i < searchdata.length; i++) {
								var obj_p4p = searchdata[i];
								if (bwarr.length < totalnum_q) {
									var kum = 0;
									if (obj_p4p.searchResultfoId != BCID_) {
										for (var k = 0; k < data_long; k++) {
											if (data[k].infoid != obj_p4p.searchResultfoId) {
												if (kum == data_long - 1) {
													var price_p4p = (isNaN(parseInt(obj_p4p.searchResultfoUnitPrice)) || parseInt(obj_p4p.searchResultfoUnitPrice) == 0) ? '电话议价' : "&yen;" + obj_p4p.searchResultfoUnitPrice;
													bwarr.push("<dd class='p4p_qidian' node-name='" + i + "'><div class='picbox'><a href='//b2b.hc360.com/supplyself/" + obj_p4p.searchResultfoId + ".html' target='_blank' title='" + decodeURIComponent(obj_p4p.searchResultfoTitle) + "' onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_pic0" + (i + 1) + "\')\"><img src='" + obj_p4p.searchResultfoImageBig + "' onerror='imgonerror(this);'/></a></div>");
													bwarr.push("<p class='txtil'><a href='//b2b.hc360.com/supplyself/" + obj_p4p.searchResultfoId + ".html' title='" + decodeURIComponent(obj_p4p.searchResultfoTitle) + "' target='_blank'  onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_txt0" + (i + 1) + "\')\">" + decodeURIComponent(obj_p4p.searchResultfoTitle) + "</a></p>");
													bwarr.push("<p class='pay'>" + price_p4p + "</p></dd>");
												}
												kum++;


											}


										}
									}
								}


							}
							//

							bwList.find("dl").html(bwarr.join(''));
							$(".bwListContent").show();
							$(".p4p_qidian").on("click", function() {

								$.ajax({
									url: '//p4pserver.org.hc360.com/p4pserver/doAnticheating',
									data: dataProcessing(searchdata, searchdata[$(this).attr("node-name")], $(this).attr("node-name"), topSearchCol.val(), bigdate),
									dataType: 'jsonp',
									jsonp: 'jsoncallback',
									cache: false,
									timeout: 3000
								})
							})
							$(".picbox a").on("click", function() {
								HC && HC.UBA && HC.UBA.sendUserlogsElement('UserBehavior_p4p_qidiantop_img');
							})
							$(".txtil a").on("click", function() {
								HC && HC.UBA && HC.UBA.sendUserlogsElement('UserBehavior_p4p_qidiantop_title');
							})
						})
					}
				} else {
					bwList.find("dl").html(bwarr.join(''));
					$(".bwListContent").show()
				}
				// if (bwarr.length > 0) {
				//   bwList.find("dl").html(bwarr.join(''));
				//   /****
				//    * 普通联想词如果大于5个，则只显示前五个
				//    */
				//   if (cgList.find("li").length > 5) {
				//     cgList.find("li").each(function (index) {
				//       if (index >= 5) {
				//         $(this).hide();
				//       }
				//     })
				//   }
				// }
				if (cgList.find("li").length > 5) {
					cgList.find("li").each(function(index) {
						if (index >= 5) {
							$(this).hide();
						}
					})
				}
				//bwList.show();
				$(".SearchWrap_cont", context).show();
			} else {
				bwList.hide();
				bwList.find("dl").html('');
			}
			self.hideCache(context);
		},
		//展示搜索框的普通联想词
		appendNormalHtml: function(data, context) {
			var self = this,
				strarr = [],
				cgList = $(".cgListContent", context),
				bwList = $(".bwListContent", context);
			if (data && data.length !== 0) {
				var _leng = data.length > 5 ? (bwList.find("dd").length > 0 ? 5 : 10) : data.length; //如果没有标王词，则显示10条普通联想词，如果有标王词，则显示5条联想词。
				for (var i = 0; i < _leng; i++) {
					var obj = data[i];
					if (obj && obj.resultnum) {
						strarr.push("<li onmousedown=\"return hcclick(\'?hcjsy_homepage=hcjsybw_homepage_top_txt00" + (i + 1) + "\')\"><span>约" + obj.resultnum + "个结果</span><a href='javascript:void(0);' title='" + decodeURIComponent(obj.keyword) + "'>" + decodeURIComponent(obj.keyword) + "</a></li>")
					}
				}
				if (strarr.length > 0) {
					cgList.html(strarr.join(''));
				}
				cgList.show();
				if (!$(".SearchWrap_cont", context).is(":visible")) {
					$(".SearchWrap_cont", context).show();
				}
			} else {
				cgList.hide();
			}
			self.hideCache(context);
		},
		/**
		 * 最近搜索过的；
		 */
		recentsearch: function() {
			var self = this;
			/**
			 * 滚动展示顶部的搜索框
			 */
			$(window).scroll(function() {
				var s_top = parseInt(jQuery(window).scrollTop());
				var topSearch = $('#w2'),
					navSearch = topSearchCol;
				/***
				 * 滑动页面后，搜索框的下拉框消失，搜索框变红色，字体改变颜色
				 */
				$("#search .logo_search_l").removeClass("logo_search_2");
				$("#search").find(".SearchWrap_cont").hide();
				if (s_top > 300) {
					$(".Searchfollow").show();
					$('.grab-space').addClass('bounce-out');
				} else {
					$('.grab-space').removeClass('bounce-out');
					navIndex = -1;
				}
				$('#search-top').find('.SearchWrap_cont').hide();
			});

			/*
			       最近搜素过的词
			       */

			topSearchCol.focus(function() {
				var _wrap = $(this).parents('.logo_search_l');
				var ids = _wrap.find("input").attr("id");
				var result = self.searchHtml(ids);
				var thisVal = _wrap.find('input[node-name="searchInput"]').val();
				/**
				 * 如果有搜索过的词并且当前输入框没有填写任何内容，最近搜过的展示出来；
				 */
				if (result && thisVal == '') {
					_wrap.addClass("logo_search_2");
					_wrap.find('.SearchWrap_cont').hide();
					_wrap.find(".SearchWrap_record").slideDown();
				}
			}).blur(function() {
				var _wrap = $(this).parents('.logo_search_l');
				_wrap.removeClass("logo_search_2");
				setTimeout(function() {
					_wrap.find(".SearchWrap_record").hide();
				}, 500)
			});

		},
		Cookie: {
			/**
			 * 获取页面的cookie
			 * @param key 存cookie的名字
			 * @returns {*} 返回key对应的value值;
			 */
			get: function(key) {
				return window.HC.util.cookie.get(key);
			},
			/**
			 * 设置cookie
			 * @param key 名称
			 * @param val 值
			 * @param t 时间
			 */
			set: function(key, val, t) {
				var keys = decodeURIComponent(this.get(key)),
					values = keys.indexOf(',') >= 0 ? keys.split(',') : [],
					attributes = {
						expires: t,
						// domain: '.hc360.com'
						domain: ((window.location.hostname === 'localhost') ? 'localhost' : '.hc360.com')
					};
				/****
				 * 如果设置的存的val值已经存过，则忽略
				 */
				if (values && values.length > 0) {
					for (var i = 0; i < values.length; i++) {
						if (val == values[i]) {
							return false;
						}
					}
				}
				if (keys && keys != 'undefined') {
					if (keys === val) {
						return false;
					};
					window.HC.util.cookie.set(key, keys + ',' + val, attributes);
				} else {
					window.HC.util.cookie.set(key, val, attributes);
				}
			}
		},
		/**
		 * 创建一个最近搜索过的dom结构
		 * @returns {*} 如果有所搜过数据返回true 没有返回false
		 */
		searchHtml: function(ids) {
			var that = this,
				mc = 'seller';
			$("#indexList li").each(function() {
				if ($(this).hasClass('seleCur')) {
					mc = $(this).attr("id");
				}
			});
			if (ids == 'w2') { // 如果是顶部搜索 只搜供应产品
				mc = 'seller';
			}
			var hotStr = that.hotSearch(mc);
			var SearchWordCookie = that.Cookie.get("searchWord");
			var searchStr = '<p class="history_title">最近搜过</p><div class="history_word"><ul>';
			var text = 0,
				index;
			if (SearchWordCookie && SearchWordCookie.length > 0) {
				var searchResult = decodeURIComponent(SearchWordCookie).split(',');
				for (var i = searchResult.length - 1; i >= 0; i--) {
					text++;
					index = text < 10 ? '0' + text : text;
					var newReuslt = searchResult[i].split('||');
					var hrefStr = '//s.hc360.com/' + newReuslt[1] + '/search.html?kwd=' + encodeURI(newReuslt[0]);
					searchStr += '<li><a href="' + hrefStr + '" target="_blank" onmousedown="return hcclick(\'?hcjsy_homepage=hcjsy_homepage_recently_Search_txt' + text + '\')">' + newReuslt[0] + '</a></li>'
				}
				searchStr += '</ul></div>';
				searchStr += hotStr;
				$('.SearchWrap_record').html(searchStr);
			} else {
				$('.SearchWrap_record').html(hotStr);
			}
			return true;
		},
		/**
		 * 正在热搜中
		 */
		hotSearch: function(mc) {
			var self = this;
			var keyWord = ['外墙涂料', '墙面漆', '洗车机', '二手货车', '拉力机', 'LED显示屏', '自动售货机', 'T恤', '风机', '地板'];
			var hotSearchStr = '<p class="hotSearch_tt">正在热搜中</p><div class="hotSearch_word"><ul class="hotSearch">';
			var text = 0,
				index;
			for (var i = 0; i < keyWord.length; i++) {
				text++;
				index = text < 10 ? '0' + text : text;
				hotSearchStr += '<li><a href="//s.hc360.com/' + mc + '/search.html?kwd=' + encodeURI(keyWord[i]) + '" mc="' + mc + '" target="_blank" onmousedown="return hcclick(\'?hcjsy_homepage=hcjsy_homepage_hot_Search_txt' + index + '\')">' + keyWord[i] + '</a></li>';
			}
			hotSearchStr += '</ul></div>';
			return hotSearchStr;
		},
		/**
		 封装ajax请求
		 url是请求地址，param是请求参数，_callback是执行的回调，_jsonp是给后端的回调函数名。
		 */
		getData: function(url, param, _jsonp) {
			return $.ajax({
				url: url,
				data: param,
				dataType: 'jsonp',
				jsonp: _jsonp || 'callback',
				timeout: 3000
			});

		},
		ie: (function() {
			var undef, v = 3,
				div = document.createElement('div');
			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i>< ![endif]-->',
				div.getElementsByTagName('i')[0]
			)
				return v > 4 ? v : undef;
		}()),
		/*琐碎的地方，例如部分移入移出功能*/
		other: function() { //The other little parts.

			$('#regAlert-colse').on('click', function() {
				$(this).parent('.regAlert').hide();
			})


			var self = this;
			$(".ad-top").find("span").click(function() { /*最顶部广告*/
				$(".ad-top").remove();
				if (typeof(ui.ie) != "undefined" && ui.ie <= 7) { /*修复ie67页面错乱问题*/
					$(".logo_search_l").css("float", "left");
					$(".nav li").css("float", "left")
				}
			});
			//右侧底部滑动效果
			$(".r_sidebar_con li a,#backtop,.rigCloseBtn a,.rigAnBtn a").hover(function() {
					$(this).children("span").show(200)
				},
				function() {
					$(this).children("span").hide()
				}
			);
			$('#navSeleCur').hover(function() {
				$(this).addClass('navSeleCur')
			}, function() {
				$(this).removeClass('navSeleCur')
			});


			$("#backtop").click(function() {
				$("html, body").animate({
					scrollTop: 0
				}, 500);
			});

			/**
			 * [绑定首屏 我是买家 我是卖家 按钮点击事件]
			 */
			$('.tabCon dd').mouseover(function(event) {
				var _this = $(this),
					_index = _this.index();

				_this.toggleClass('tabCur').siblings().toggleClass('tabCur');
				$('.tabCon .tabConStep').eq(_index).show().siblings('.tabConStep').hide();

			});

			/*
			       右侧登录 注册上面的内容；
			       */
			var welcomeNode = $("#welcomeNode s"),
				nowHours = new Date().getHours();
			if (nowHours >= 5 && nowHours < 8) {
				welcomeNode.html("早上好，");
			} else if (nowHours >= 8 && nowHours < 11) {
				welcomeNode.html("上午好，");
			} else if (nowHours >= 11 && nowHours < 13) {
				welcomeNode.html("中午好，");
			} else if (nowHours >= 13 && nowHours < 18) {
				welcomeNode.html("下午好，");
			} else if (nowHours >= 18 && nowHours <= 23 || nowHours >= 0 && nowHours < 5) {
				welcomeNode.html("晚上好，");
			}
			//登录状态，需要显示
			if (self.Cookie.get("LoginID") && self.Cookie.get("HC360.SSOUser")) {
				ui.s('login-after').show();
				ui.s('user-name').text(self.Cookie.get("LoginID"));
				// $("#welcomeNode").show().siblings().hide();
				$(".loginBefore").hide();
				$(".loginAfter").show();
				$(".botRegFixed").hide();

				/**
				 * [url 获取消息接口]
				 * @type {String}
				 */
				$.ajax({
					url: '//my.b2b.hc360.com/my/turbine/action/remind.RemindAction/eventsubmit_docountmessage/doCountmessage',
					type: 'get',
					dataType: 'jsonp',
					timeout: 5000,
					jsonp: 'callback',
					jsonpCallback: 'getMessagecount',
					success: function(data) {
						if (data.code) {
							data.code = data.code > 99 ? '99+' : data.code;
							$('.newsBtn').find('span').text(data.code);
						}
					},
					error: function() {
						console.log("获取消息接口失败");
					}
				});
				/**
				 * [获取采购单数量接口]
				 * @type {[type]}
				 */
				$.ajax({
					url: '//my.b2b.hc360.com/my/turbine/action/detail.DetailRemindAction/eventsubmit_docartnum/doCartnum',
					dataType: 'jsonp',
					timeout: 5000,
					success: function(result) {
						$('.purchaselist').find('span').text(result);
					},
					error: function() {
						console.log("获取采购单接口失败");
					}
				});
				$.getJSON('//my.b2b.hc360.com/my/turbine/action/detail.DetailRemindAction/eventsubmit_docartnum/doCartnum?callback=?', function(result) {
					$('.purchaselist').find('span').text(result);
				});
			} else {
				$(".botRegFixed").show();
				$(".closeBtn").on("click", function() {
					$(".botRegFixed").hide();
				});
				ui.s('login-before').show();
			}


		},
		adhide: function(input) {
			if (input.val() != "") {
				input.next(".searchdetail").hide();
			} else {
				input.next(".searchdetail").show();
			}
		},
		initFn: function() {
			ui.delayOrder();
			ui.searchbar();
			ui.other();
			ui.topSearch();
			ui.recentsearch();
			ui.bindEvent();
			ui.retutntop();
			ui.guanggao();

			// 采购市场 数据
			ui.getPurchasingData();

			ui.eventChasing();

			ui.inputValidation();

			ui.s();
			//初始化通用模拟select
			ui.fakeSelect();

			// 初始化tabslide
			ui.tabSlide();

			//初始化swiper
			ui.hotEvent();
		},

		/**
		 * [submitChasing 绑定右侧 帮我找好货 近24小时采购单数 操作事件]
		 * @return {[type]} [description]
		 */
		eventChasing: function() {
			var _this = this;
			$('button[class="chasing-submit"]').on('click', function() {
				var queryForm = $(this).parent().find('[data-query="form"]');
				var sendParams = {};
				$.each(_this.validationList, function(i, verifyObj) {
					var element = queryForm.find(verifyObj.element);
					if (element.length) {
						element.trigger('blur');
						sendParams[element.data('query')] = encodeURIComponent(element.val());
					}
				});
				// // 校验否通过
				if (queryForm.find('.error').length === 0) {
					sendParams['buyerSourceId'] = queryForm.data('reffer');
					_this.submitChasing(sendParams);
				}
			});

			$('.purchase_list').on('click', '.error', function() {
				$(this).hide().prev().removeClass('borderRed').focus();
			});
		},
		// 隐藏错误提示
		hideNullValidation: function() {
			if ($(this).hasClass('error')) {
				$(this).removeClass('error');
			}
		},
		// 失去焦点非空校验
		nullValidation: function() {
			var valLen = $.trim($(this).val()).length;
			if (valLen !== 0) {
				$(this).removeClass('error');
			} else {
				$(this).addClass('error');
				// errorInfo.show();
			};
		},
		// /**
		//  * [datepicker 初始化选择时间插件]
		//  * @return {[type]} [description]
		//  */
		// datepicker: function () {
		//   HC.W.load('datepicker', function () {
		//     $.datepicker.regional['zh-CN'] = {
		//       monthNames: [
		//         '一月',
		//         '二月',
		//         '三月',
		//         '四月',
		//         '五月',
		//         '六月',
		//         '七月',
		//         '八月',
		//         '九月',
		//         '十月',
		//         '十一月',
		//         '十二月'
		//       ],
		//       monthNamesShort: [
		//         '一',
		//         '二',
		//         '三',
		//         '四',
		//         '五',
		//         '六',
		//         '七',
		//         '八',
		//         '九',
		//         '十',
		//         '十一',
		//         '十二'
		//       ],
		//       dayNames: [
		//         '星期日',
		//         '星期一',
		//         '星期二',
		//         '星期三',
		//         '星期四',
		//         '星期五',
		//         '星期六'
		//       ],
		//       dayNamesShort: [
		//         '周日',
		//         '周一',
		//         '周二',
		//         '周三',
		//         '周四',
		//         '周五',
		//         '周六'
		//       ],
		//       dayNamesMin: [
		//         '日',
		//         '一',
		//         '二',
		//         '三',
		//         '四',
		//         '五',
		//         '六'
		//       ],
		//       dateFormat: 'yy-mm-dd'
		//     };
		//     $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
		//     var tom = new Date();
		//     tom.setDate(tom.getDate() + 1);
		//     $.datepicker._hideDatepicker()
		//     $('[data-query="deadline"]').datepicker({
		//       minDate: tom
		//     });
		//   });
		// },
		// input表单验证
		inputValidation: function() {
			var that = this;
			that.validationList = [{
					// 采购产品*/
					element: '[data-query="product"]',
					handler: [{
						event: 'keyup',
						fn: function() {
							$(this).val($.trim($(this).val().replace(/[§〃〓○△▲◎☆★◇◆□■▽▼㊣★]/g, "")))
						}
					}, {
						event: 'blur',
						fn: function() {
							that.nullValidation.call(this);
						}
					}, {
						event: 'click',
						fn: function() {
							that.hideNullValidation.call(this);
						}
					}]
				},
				{
					/**采购数量验证信息 */
					element: '[data-query="inquiryNum"]',
					handler: [{
						event: 'keyup',
						fn: function() {
							var parnt = /^[1-9]\d*(\.\d+)?$/;
							if (!parnt.exec($(this).val())) {
								$(this).val('');
							}
						}
					}, {
						event: 'blur',
						fn: function() {
							that.nullValidation.call(this);
						}
					}, {
						event: 'click',
						fn: function() {
							that.hideNullValidation.call(this);
						}
					}]
				},
				// {
				//   /**截止日期 */
				//   element: '[data-query="deadline"]',
				//   handler: [{
				//     event: 'blur',
				//     fn: function () {
				//       var that = this;
				//       var timer = setTimeout(function () {
				//         if (that.val().length !== 0) {
				//           $(that).removeClass("error");
				//         } else {
				//           $(that).addClass("error");
				//         }
				//         ;
				//         clearTimeout(timer);
				//       }, 300)
				//     }
				//   }, {
				//     event: 'click',
				//     fn: function () {
				//       $(this).removeClass("error");
				//     }
				//   }]
				// },
				{
					/**采购数量验证信息 */
					element: '[data-query="inquiryNum"]',
					handler: [{
						event: 'keyup',
						fn: function() {
							var parnt = /^[1-9]\d*(\.\d+)?$/;
							if (!parnt.exec($(this).val())) {
								$(this).val('');
							}
						}
					}, {
						event: 'blur',
						fn: function() {
							that.nullValidation.call(this);
						}
					}, {
						event: 'click',
						fn: function() {
							that.hideNullValidation.call(this);
						}
					}]
				},
				{
					/**采购单位 */
					element: '[data-query="unit"]',
					handler: [{
							event: 'keyup',
							fn: function() {
								var reg = /^[a-zA-Z\u4e00-\u9fa5]{0,4}$/g;
								var val = $.trim($(this).val());
								if (!reg.exec(val)) {
									$(this).val('');
								};
							}
						},
						{
							event: 'blur',
							fn: function() {
								var reg = /^[a-zA-Z\u4e00-\u9fa5]{0,4}$/g;
								var val = $.trim($(this).val())
								if (val.length == "") {
									that.nullValidation.call(this);
								} else if (!reg.test(val)) {
									$(this).addClass('error').val('单位错误');
								}
							}
						}, {
							event: 'click',
							fn: function() {
								var val = $(this).val();
								if (val === '单位错误') {
									$(this).val('');
								};
								that.hideNullValidation.call(this);
							}
						}
					]
				},
				{
					// 手机号码
					element: '[data-query="telPhone"]',
					handler: [{
						event: 'keyup',
						fn: function() {
							var v = $.trim($(this).val().replace(/\D/g, ""));
							$(this).val(v.length > 11 ? v.substring(0, 11) : v);
						}
					}, {
						event: 'blur',
						fn: function() {
							if ($.trim($(this).val()).length == "") {
								that.nullValidation.call(this);
							} else if (!/^1[34578]\d{9}/i.test($(this).val())) {
								$(this).addClass('error').val('手机号码错误！');
							}
						}
					}, {
						event: 'click',
						fn: function() {
							var val = $(this).val();
							if (val === '手机号码错误！') {
								$(this).val('');
							};
							that.hideNullValidation.call(this);
						}
					}]
				},
				{
					// 详细说明
					element: '[data-query="purchaseInfo"]',
					handler: []
				}
			];
			/**
			 * 循环form绑定input事件
			 */
			$.each(that.validationList, function(i, verifyObj) {
				var element = verifyObj.element;
				$(element).val('');
				$.each(verifyObj.handler, function(i, handler) {
					$('[data-query="form"]').on(handler.event, element, function() {
						handler.fn.call($(this));
					});
				});
			});

			$('#sureBtn').on('click', function() {
				$('.purchaseSucc').hide();
				$('#queryForm')[0].reset();
			});


		},

		/**
		 * [submitChasing 提交帮我找好货 和采购信息]
		 * @return {[type]} [description]
		 */
		submitChasing: function(sendParams) {
			var _this = this;
			var data = {
				areaName: '',
				areaid: '',
				businId: '',
				businTitle: '',
				comeUrl: '',
				companyName: '',
				contact: '',
				isbusin: '',
				sellerProviderId: '',
				supcatId: '',
				supcatName: '',
				sysFlag: '',
				telPhone: '',
				purchaseInfo: '',
				type: '3',
				buyerSourceId: '',
				charset: 'utf8',
				inquiryNum: '',
				deadline: '',
				product: '',
				mobileCheck: false,
				unit: ''
			};
			for (var i in sendParams) {
				data[i] = sendParams[i];
			};
			$.ajax({
				url: '//my.b2b.hc360.com/my/turbine/action/inquiry.InquiryAction/eventsubmit_doPerform/doperform',
				dataType: 'jsonp',
				data: data,
				success: function(result) {
					_this.secCallBack();
					// window.location.href = '//my.b2b.hc360.com/my/turbine/template/firstview,quickplansavebuy.html';
				},
				error: function() {
					alert('提交失败');
				}
			});
		},

		secCallBack: function() {
			$('.purchaseSucc').show();
			var timeCount = 5;

			var timer = setInterval(function() {
				if (timeCount <= 0) {
					$('#sureBtn').trigger('click');
					clearInterval(timer);
				} else {
					$('#sureBtn').text('确定（' + timeCount + 's）');
					timeCount--;
				};
			}, 1000);
		},
		/**
		 * [PurchasingInfo 创建内容区域滚动事件]
		 * @type {[type]}
		 */
		PurchasingInfo: function(data) {
			var template = this.renderPurchasing(data);
			var purchaseList = $('#cg_market .purchaseList');
			purchaseList.find('ul').html(template);
			$('.purchaseList-loading').hide();
			var speed = 40;
			var tobodyHeight = Math.abs(purchaseList.height() - purchaseList.find('ul').height());

			function Marquee() {
				var top = purchaseList.scrollTop();
				if (top >= tobodyHeight) {
					purchaseList.scrollTop(0);
				} else {
					purchaseList.scrollTop(top + 1);
				};
			};
			var MyMar = setInterval(Marquee, speed);

			purchaseList.hover(function() {
				clearInterval(MyMar);
				$(this).css('overflow', 'auto');
			}, function() {
				MyMar = setInterval(Marquee, speed);
				$(this).css('overflow', 'inherit');
			});
		},
		/**
		 * [renderPurchasing 渲染采购市场dom 结构]
		 * @param  {[type]} recordList [数据列表]
		 * @return {[type]}            [description]
		 */
		renderPurchasing: function(recordList) {
			var _this = this;
			var templateString = '';

			$.each(recordList, function(index, item) {
				if (item.bnum) {
					var pathObj = _this.renderBjPath(item);
					templateString += '<li class="bnum_' + (item.bnum || '0') + '"><dl>' +
						'<dt>' +
						'<div class="purchaseTit"><a href="' + pathObj.buyePrice + '" target="_blank" title="' + item.title + '">' + item.title + '</a></div>' +
						'<a class="quoteBtn" href="' + pathObj.bjpath + '" target="_blank">立即报价</a>' +
						'</dt>' +
						'<dd>' +
						'<p>采购数量：<b>' + item.bnum + '</b></p>' +
						'<span>截止日期：' + item.enddate.slice(0, 10) + '</span>' +
						'</dd>' +
						'</dl></li>';
				};
			});
			return templateString;
		},
		/**
		 * [renderBjPath 是否是大买家数据 跳转大买家报价地址]
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		renderBjPath: function(item) {
			var url = '',
				byPath = '';
			if (item.isbigbuy === 1) {
				// url = 'http://my.b2b.hc360.com/my/turbine/template/pubinfo,inquire,inquire.html?infoid=' + item.bcid + '&infotype=1'
				url = 'https://detail.b2b.hc360.com/detail/turbine/template/business,inquiryPriceDetail.html?stid=' + item.prooder;
				byPath = 'http://my.b2b.hc360.com/my/turbine/template/buycenter,inquiryquotation,GivenPriceForm.html?givenPriceId=' + item.prooder + '&addresstype=1'
			} else {
				url = 'http://my.b2b.hc360.com/my/turbine/template/pubinfo,inquire,sendbusnotes.html?logincode=5&loginparam=buyend_ssobaojia&traceaction=buydetail&infotype=1&isFromInquire=1&procurementPlanId=' + item.providerid + '&infoid=' + item.bcid + '&isBjReg=1 '
				byPath = '//b2b.hc360.com/buy/' + item.bcid + '.html';
			};
			return {
				bjpath: url,
				buyePrice: byPath
			};
		},
		/**
		 * [getPurchasingData 获取采购市场数据]
		 * @return {[type]} [description]
		 */
		getPurchasingData: function() {
			var _this = this;
			$.ajax({
				url: '//esapi.org.hc360.com/interface/getinfos.html',
				dataType: 'jsonp',
				data: {
					collapsef: "providerid",
					index: 'buyerbusininfo',
					v: 4,
					psize: 18,
					// isbigbuy: '0',
					sys: 'hc360',
					bus: 'buyerlist'
				},
				success: function(options) {
					if (options && options.recordList) {
						_this.PurchasingInfo(options.recordList);
						$('#purchaseList_num').html(options.recordCount * 10);
					};
				},
				error: function() {
					console.log('数据获取失败!');
				}
			});
		},
		/***
		 * 绑定事件
		 */
		bindEvent: function() {
			/****
			 * 标王直达
			 */
			var cham = document.getElementById("championSearch");
			$('[data-name="championNode"]').click(function() {
				cham.action = "//my.b2b.hc360.com/my/turbine/template/pubinfo%2Ckeyword%2Cchampion_drump.html";
				cham.keyword.value = topSearchCol.val();
				cham.submit();
			});
			this.leftSideBar();

			// this.infoScroll();

			//点击发送买点信息
			function sendUserlogs(arr){

				$(arr).each(function(i,item){
					$(document).delegate("*["+item+"]", "click", function(e){
						var flag = $(this).attr(item)
						flag && HC && HC.UBA && HC.UBA.sendUserlogsElement(flag)
					});
				})

				// 采购市场买点信息
				var logText = $("[data-click-log-purchaseBox]").attr('data-click-log-purchaseBox')
				$(document).delegate(".purchaseLeft .purchaseList .quoteBtn", "click", function(e){
					HC && HC.UBA && HC.UBA.sendUserlogsElement(logText)
				})
			}

			sendUserlogs(['data-click','uba-click'])
		},
		/****
		 *  左侧导航跟随
		 */
		leftSideBar: function() {
			var sidebarWrap = $('.l_sidebar_wrap'),
				sidebarList = sidebarWrap.find('a'),
				f0 = parseInt($('#cg_market').offset().top),
				f1 = parseInt($("#newBox1").offset().top),
				f2 = parseInt($('#newBox2').offset().top),
				winHeight = parseInt($(window).height() / 2),
				f3 = parseInt($('#newBox3').offset().top),
				f4 = parseInt($('#proBox').offset().top),
				f5 = parseInt($('#newsBox').offset().top),
				footerOffset,
				sidebarWinHeight;
			/****
			 * 滚动页面渲染左侧对应楼层的样式
			 */
			$(window).scroll(function() {
				scrollTop = parseInt($(window).scrollTop()),
					f3 = parseInt($('#newBox3').offset().top),
					f4 = parseInt($('#proBox').offset().top),
					f5 = parseInt($('#newsBox').offset().top),
					footerOffset = parseInt($('#frdLink').offset().top),
					sidebarWinHeight = parseInt(sidebarWrap.offset().top - scrollTop + sidebarWrap.height()),
					s_top = scrollTop + sidebarWinHeight;
				if (s_top > 300) {
					sidebarWrap.show();
				}
				sidebarList.removeClass('redLink');
				if (s_top >= f0 && s_top < f1) {
					sidebarList.eq(1).addClass('redLink')
				} else if (s_top >= f1 && s_top < f2) {
					sidebarList.eq(2).addClass('redLink')
				} else if (s_top >= f2 && s_top < f3) {
					sidebarList.eq(3).addClass('redLink')
				} else if (s_top >= f3 && s_top < f4) {
					sidebarList.eq(4).addClass('redLink')
				} else if (s_top >= f4 && s_top < f5) {
					sidebarList.eq(5).addClass('redLink')
				} else if (s_top >= f4 && s_top < footerOffset) {
					sidebarList.eq(6).addClass('redLink')
				}
			});
			/****
			 * 点击左侧楼层滚动到固定位置
			 */
			sidebarList.click(function() {
				var _index = $(this).index(),
					top;
				switch (_index) {
					case 0:
						top = 0;
						break;
					case 1:
						top = f0 - winHeight;
						break;
					case 2:
						top = f1 - winHeight;
						break;
					case 3:
						top = f2 - winHeight;
						break;
					case 4:
						top = f3 - winHeight;
						break;
					case 5:
						top = f4 - winHeight;
						break;
					case 6:
						top = f5 - winHeight;
						break;
				}
				$('body,html').animate({
					scrollTop: top
				}, 200)
			})

		},

		//右侧返回顶部下面的展开收起
		//右侧求购和供应信息轮换
		retutntop: function() {
			$(".rigCloseBtn").on("click", function() {
				$(".r_sidebar").addClass("r_sidebarHide");
			})

			$(".rigAnBtn").on("click", function() {
				$(".r_sidebar").removeClass("r_sidebarHide")
			})

			$(".topRigTab dd").hover(function() {
				$(this).addClass("tabTitCur").siblings().removeClass("tabTitCur")
				if ($(this).hasClass("tabTit1")) {
					$(".ttLinkList").show()
					$(".ttLinkList_1").hide()
				}
				if ($(this).hasClass("tabTit2")) {
					$(".ttLinkList_1").show()
					$(".ttLinkList").hide()
				}
			})
		},

		// 设置广告延时
		guanggao: function() {
			var timer = setTimeout(function() {
				$('.advertisement').each(function(item, index) {
					if ($(this).height() === 0) {
						$(this).hide();
					};
				});
				clearTimeout(timer);
			}, 1000)
		},

		//自定义选择器selector
		s: function(_selector, _root) {
			return $('[data-selector="' + _selector + '"]', _root || $('body'));
		},

		//通用模拟select
		fakeSelect: function() {
			ui.s('select-group').click(function(event) {
				event.stopPropagation();
				var self = $(this);
				ui.s('select-group').not(self).removeClass('show-select');
				self.toggleClass('show-select');
			});
			ui.s('select-list').find('li').click(function() {
				var self = $(this),
					_ul = self.parent('ul');
				_ul.siblings('[data-selector="select-trigger"]').val(self.text());
				self.siblings('[type=hidden]').val(self.data('value'));
			});
			$(document).click(function() {
				ui.s('select-group').removeClass('show-select');
			});
		},

		//通用模拟tab切换
		tabSlide: function() {
			ui.s('slide-tab').hover(function() {
				var self = $(this),
					_index = self.index(),
					_wrap = self.parents('[data-selector="slide-group"]'),
					_con = _wrap.find('[data-selector="slide-content"]');
				_con.hide();
				_con.eq(_index).show();
				self.addClass('titCur').siblings('[data-selector="slide-tab"]').removeClass('titCur');
			});
		},

		//banner右下方热点轮播
		hotEvent: function() {
			var hotEvent = new Swiper('#hot-event', {
				direction: 'vertical',
				slidesPerView: 'auto',
				loopedSlides: 30,
				freeMode: false,
				freeModeSticky: true,
				autoplay: 2000,
				loop: true,
				onInit: function() {
					$('#hot-event').addClass('visible');
				}
			});
			$('#hot-event').mouseenter(function() {
				hotEvent.stopAutoplay();
			}).mouseleave(function() {
				hotEvent.startAutoplay();
			});

			var setTimer = setTimeout(function() {
				$('.adImg1').slideUp();
				clearTimeout(setTimer)
			}, 3000);
		}
	};
};
