// JavaScript Document
var addressData = {}; //地址json串
var _mobj = {}; //始发地obj
var _mobj2 = {}; //目的地obj

$(function() {

	$(document).click(function(event) {

		var E = event || window.event;
		var target = E.target || E.srcElement;
		if (target.id != 'text1' && target.id != 'text2') {
			$(".ss_dk").hide();
			$('.te1').removeClass('show-select');
		}

	});

	function stopEvent(event) {
		var E = event || window.event;
		if (E.stopPropagation) {
			E.stopPropagation();
		} else {
			E.cancelBubble = true;
		}
	}

	//加载地址库
	jQuery.ajax({
		type: "GET",
		url: "//56.hc360.com/wlorder/getarea.html",
		dataType: 'jsonp',
		jsonpCallback: 'callbackAddressJson',
		success: function(msg) {
			addressData = msg.addressData;
			//初始化code
			initCode();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(textStatus + "---" + textStatus + "=====" + errorThrown);
		}
	});
	//第一次点击选择地址栏
	var isFirstChooseArea = true;
	//展示上次查询结果
	var fhIndex = getWlCookie('fhIndex');
	//var shIndex = getWlCookie('shIndex');
	var fhpCode = getWlCookie('fhpCode');
	//var shpCode = getWlCookie('shpCode');
	var fhcityCode = getWlCookie('fhcityCode');
	//var shcityCode = getWlCookie('shcityCode');
	var fhcountyCode = getWlCookie('fhcountyCode');
	//var shcountyCode = getWlCookie('shcountyCode');
	var fhv = getWlCookie('fhv');
	//var shv = getWlCookie('shv');

	if ($("#showLineType").val() == "1") {
		//搜索结果页
	} else {
		//搜索首页
		$("#startProvince").val(fhpCode);
		$("#startCity").val(fhcityCode);
		$("#startCounty").val(fhcountyCode);
		//$("#endProvince").val(shpCode);
		//$("#endCity").val(shcityCode);
		//$("#endCounty").val(shcountyCode);
		if (fhv) {
			$("#text1").val(fhv);
		}
		//$("#text2").val(shv);
	}

	/**
	 * 根据地区名称初始化其code
	 */
	function initCode() {
		//始发地
		if ($('#text1').val() != "") {
			var _obj = getAddressCodeObj($('#text1').val());
			fhIndex = _obj.pIndex;
			fhpCode = _obj.pCode;
			fhcityCode = _obj.cityCode;
			fhcountyCode = _obj.countyCode;
			//设置省市县Cookie
			setAddrCodeCookie('text1', fhpCode, fhcityCode, fhcountyCode);
			//设置text框Cookie
			setCookie("fhv", $('#text1').val());
		} else {
			//$('#text1').val(fhv);
		}
		//目的地
		if ($('#text2').val() != "") {
			var _obj = getAddressCodeObj($('#text2').val());
			shIndex = _obj.pIndex;
			shpCode = _obj.pCode;
			shcityCode = _obj.cityCode;
			shcountyCode = _obj.countyCode;
			//设置省市县Cookie
			setAddrCodeCookie('text2', shpCode, shcityCode, shcountyCode);
			//设置text框Cookie
			setCookie("shv", $('#text2').val());

		} else {
			shpCode = '';
			shcityCode = '';
			shcountyCode = '';
			shIndex = 0;
			//$('#text2').val(shv);
		}

		//设置HiddenCode
		setHiddenCode("text1", fhpCode, fhcityCode, fhcountyCode);
		setHiddenCode("text2", shpCode, shcityCode, shcountyCode);

		_mobj = {
			pIndex: fhIndex,
			pCode: fhpCode,
			cityCode: fhcityCode,
			countyCode: fhcountyCode
		};
		_mobj2 = {
			pIndex: shIndex,
			pCode: shpCode,
			cityCode: shcityCode,
			countyCode: shcountyCode
		};
	}

	//控制面板的显示和隐藏
	$("#text1,#text2").click(function() {
		var self = $(this);
		self.parents('.te1').addClass('show-select');
		if (isFirstChooseArea && jQuery.isEmptyObject(addressData)) {
			isFirstChooseArea = false;
			$.ajax({
				type: "GET",
				url: "//56.hc360.com/wlorder/getarea.html",
				dataType: 'jsonp',
				jsonpCallback: 'callbackAddressJson',
				async: false,
				success: function(msg) {
					addressData = msg.addressData;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//alert(textStatus + "---" + textStatus + "=====" + errorThrown);
				}
			});

		}

		//主要用于存放出发地和目的地的变量
		if (this.id.indexOf('1') != -1) {
			window[this.id] = _mobj;
		} else {
			window[this.id] = _mobj2;
		}

		// 初次点击的时候 显示第一个tab
		var $tabs = $(this).parent().find('.ss_dk .tabt ul'); //面板内容ul
		var $tab_c = $(this).parent().find('.ss_dk .cl'); //面板内容div

		showX({
			index: window[this.id].pIndex ? window[this.id].pIndex : 0,
			$tab_c: $tab_c,
			nodeList: $tabs.children(),
			code: '',
			btnId: this.id
		});
		$(this).parent().parent().find('.ss_dk').hide();
		$(this).siblings(".ss_dk").show();

		// 关掉所有的,打开当前的
		tab($tabs.children(), $tab_c, this.id);
	});

	// 控制面板tab的切换和内容的切换
	function tab(nodeList, $tab_c, btnId) {

		for (var i = 0, len = nodeList.size(); i < len; i++) {
			(function(index) {

				nodeList[i].onclick = function(event) {

					stopEvent(event);
					nodeList.removeClass('hover4');
					$(this).addClass('hover4');

					showX({
						index: index,
						$tab_c: $tab_c,
						nodeList: nodeList,
						code: '',
						btnId: btnId
					});
				};
			})(i);
		}
	}

	// index,$tab_c,nodeList,code,btnId
	function showX(option) {
		option.nodeList.removeClass('hover4');
		$(option.nodeList[parseInt(option.index)]).addClass('hover4');
		window[option.btnId].pIndex = option.index;
		if (option.btnId.indexOf('1') != -1) {
			setCookie("fhIndex", option.index);
		} else {
			setCookie("shIndex", option.index);
		}

		option.$tab_c.children().hide();
		$(option.$tab_c.children()[option.index]).show(); //显示当前点击的面板
		var arr = ['hotCity', 'province', 'city', 'county'];
		var obj = addressData[arr[option.index]];
		var tab_c = option.$tab_c.children();

		if (option.index == 1) { //代表省份

			tab_c[option.index].innerHTML = '';
			var temp = '';
			for (var i in obj) {
				temp += '<p>' + i + '</p><ul>';
				var child = obj[i];
				for (var j in child) {
					if (j == window[option.btnId].pCode) {
						temp += '<li data=' + j + '  class="hoverbg">' + child[j] + '</li>';
					} else {
						temp += '<li data=' + j + '>' + child[j] + '</li>';
					}
				}
				temp += '</ul>';
			}
			tab_c[option.index].innerHTML = temp;

			$(tab_c[option.index]).find('li').click(function(event) {
				stopEvent(event);
				var code = $(this).attr('data');
				option.nodeList.removeClass('hover4');
				$(this).addClass('hoverbg');
				$(option.nodeList[2]).addClass('hover4');

				//表示点击完省份以后 重新规划市
				window[option.btnId].pCode = code;
				window[option.btnId].cityCode = "";
				window[option.btnId].countyCode = "";

				showX({
					index: 2,
					$tab_c: option.$tab_c,
					nodeList: option.nodeList,
					code: code,
					btnId: option.btnId
				});

				//设置省市县Cookie
				setAddrCodeCookie(option.btnId, code, "", "");
				//设置text框Cookie
				setAddrInputCookie(option.btnId, $(this).html());
				//点击省的话 直接显示省
				$(this).parent().parent().parent().parent().siblings().val($(this).html());
				// 设置HiddenCode
				setHiddenCode(option.btnId, code, "", "");
			});

		} else if (option.index == 0) { //常用
			tab_c[option.index].children[0].innerHTML = '';
			var lis = tab_c[option.index].children[0].children;
			var s = '';
			for (var i in obj) {
				if (i == window[option.btnId].cityCode) {
					s += '<li data=' + i + ' class="hoverbg">' + obj[i] + '</li>';
				} else {
					s += '<li data=' + i + '>' + obj[i] + '</li>';
				}
			}
			tab_c[option.index].children[0].innerHTML = s;

			$(tab_c[option.index].children[0].children).click(function(event) {
				stopEvent(event);
				var code = $(this).attr('data');
				option.nodeList.removeClass('hover4');
				$(this).addClass('hoverbg');
				$(option.nodeList[3]).addClass('hover4');

				// 更新input 中的值 先找省
				var pId = code.substring(0, 5) + "000000";
				window[option.btnId].pCode = pId;
				window[option.btnId].cityCode = code;
				window[option.btnId].countyCode = "";

				showX({
					index: 3,
					$tab_c: option.$tab_c,
					nodeList: option.nodeList,
					code: code,
					btnId: option.btnId
				});

				var pName = getAddressName(pId, 1);
				var cityName = getAddressName(code, 2);

				//设置省市县Cookie
				setAddrCodeCookie(option.btnId, pId, code, "");
				//设置text框Cookie
				var tempVal = pName + "-" + cityName;
				setAddrInputCookie(option.btnId, tempVal);
				$(this).parent().parent().parent().parent().siblings().val(tempVal);

				//设置HiddenCode
				setHiddenCode(option.btnId, pId, code, "");
			});

		} else if (option.index == 3) { //区县

			tab_c[option.index].children[0].innerHTML = '';
			var lis = tab_c[option.index].children[0].children;
			var s = '';
			var code = option.code || window[option.btnId].cityCode;
			for (var i in obj[code]) {
				if (i == window[option.btnId].countyCode) {
					s += '<li class="hoverbg" data=' + i + '>' + obj[code][i] + '</li>';
				} else {
					s += '<li data=' + i + '>' + obj[code][i] + '</li>';
				}
			}
			tab_c[option.index].children[0].innerHTML = s;

			$(tab_c[option.index].children[0]).find('li').click(function(event) {

				stopEvent(event);
				var code = $(this).attr('data');
				window[option.btnId].countyCode = code;

				//设置省市县Cookie
				setAddrCodeCookie(option.btnId, "-1", "-1", code);
				//设置text框Cookie
				var tempVal = getAddressName(code, 1) + '-' + getAddressName(code, 2) + '-' + $(this).html();
				setAddrInputCookie(option.btnId, tempVal);

				$(this).parent().parent().parent().parent().siblings().val(tempVal);
				$(this).parent().parent().parent().parent().hide();

				$(this).parents('.te1').removeClass('show-select');

				//设置HiddenCode
				setHiddenCode(option.btnId, "-1", "-1", code);
			});

		} else if (option.index == 2) { //市

			tab_c[option.index].children[0].innerHTML = '';
			var lis = tab_c[option.index].children[0].children;
			var s = '';
			if (option.code || window[option.btnId].cityCode || window[option.btnId].pCode) {

				var code = option.code || window[option.btnId].cityCode || window[option.btnId].pCode;
				var cityCode = '';
				var pCode = '';
				for (var i in obj) {

					if (i == code) {
						//说明是从省过来的
						pCode = i;
						//window.pCode = i;
						break;
					}
					var child = obj[i];
					for (var j in child) {

						if (j == code) {
							//说明是从市过来的
							cityCode = j;
							pCode = i;
							break;
						}
					}
				}

				if (pCode) {

					for (var i in obj[pCode]) {
						if (i == code) {
							s += '<li data=' + i + ' class="hoverbg">' + obj[pCode][i] + '</li>';
						} else {
							s += '<li data=' + i + '>' + obj[pCode][i] + '</li>';
						}
					}

				}

				tab_c[option.index].children[0].innerHTML = s;

				$(tab_c[option.index].children[0]).find('li').click(function(event) {

					stopEvent(event);
					var code = $(this).attr('data');
					option.nodeList.removeClass('hover4');
					$(this).addClass('hoverbg');
					$(option.nodeList[3]).addClass('hover4');

					window[option.btnId].pCode = pCode;
					window[option.btnId].cityCode = code;
					window[option.btnId].countyCode = "";

					showX({
						index: 3,
						$tab_c: option.$tab_c,
						nodeList: option.nodeList,
						code: code,
						btnId: option.btnId
					});

					//设置省市县Cookie
					setAddrCodeCookie(option.btnId, pCode, code, "");
					//设置text框Cookie
					var tempVal = getAddressName(pCode, 1) + '-' + $(this).html();
					setAddrInputCookie(option.btnId, tempVal);

					$(this).parent().parent().parent().parent().siblings().val(tempVal);

					//设置HiddenCode
					setHiddenCode(option.btnId, pCode, code, "");
				});

			}
		}

	}

	/**
	 * 设置省市县Cookie
	 * @param btnId text控件ID
	 * @param pcode
	 * @param citycode
	 * @param countycode
	 */
	function setAddrCodeCookie(btnId, pcode, citycode, countycode) {
		if (pcode != "-1") {
			if (btnId.indexOf('1') != -1) {
				setCookie("fhpCode", pcode);
			} else {
				setCookie("shpCode", pcode);
			}
		}
		if (citycode != "-1") {
			if (btnId.indexOf('1') != -1) {
				setCookie("fhcityCode", citycode);
			} else {
				setCookie("shcityCode", citycode);
			}
		}
		if (countycode != "-1") {
			if (btnId.indexOf('1') != -1) {
				setCookie("fhcountyCode", countycode);
			} else {
				setCookie("shcountyCode", countycode);
			}
		}
	}

	/**
	 * 设置text控件值Cookie
	 * @param btnId text控件ID
	 * @param val
	 */
	function setAddrInputCookie(btnId, val) {
		if (btnId.indexOf('1') != -1) {
			setCookie("fhv", val);
		} else {
			setCookie("shv", val);
		}
	}

	//新增之前的内容
	function ck1(ob1, hover_bg) {
		ob1.click(function() {
			var index = $(this).index();
			$(this).addClass(hover_bg).siblings().removeClass(hover_bg);
		});
	};
	ck1($(".fwsx li"), "hover3");
	ck1($(".px_box_left li"), "hover5");
	//    ck1($(".feny ol li"), "hoverbg1");
	ck1($(".feny ol li:not(.feny ol li:last-child)"), "hoverbg1");

	//$(".nav_box ul li").click(function () {
	//   $(this).addClass("hover1").siblings().removeClass("hover1");
	//})

	$(".sl_box").hover(function() {
		$(this).addClass("sl_boxbg");
	}, function() {
		$(this).removeClass("sl_boxbg");
	});

	$(".t3").hover(function() {
		$(this).addClass("t4");
	}, function() {
		$(this).removeClass("t4");
	});
	$("#text1").click(function() {
		$("text1").val("");
		$(".csxz").addClass("csxzw")
	});
	$("#gb1").click(function() {
		$(".csxz").removeClass("csxzw")
	});
	$("#text2").click(function() {
		$("text2").val("");
		$(".csxz1").addClass("csxzw")
	});
	$("#gb2").click(function() {
		$(".csxz1").removeClass("csxzw")
	});

	//排序按钮
	$('#icon1').click(function() {
		$('#icon2').removeClass('icos').removeClass('ico1x').addClass('ico1');
		$('#icon3').removeClass('icos').addClass('ico2');
		$(this).removeClass('ico1').addClass('ico1x');

		if ($(this).hasClass('icos')) {
			$(this).removeClass('icos').addClass('ico1x');
		} else if ($(this).hasClass('ico1x')) {
			$(this).removeClass('ico1x').addClass('icos');
		}

	})
	$('#icon2').click(function() {
		$('#icon1').removeClass('icos').removeClass('ico1x').addClass('ico1');
		$('#icon3').removeClass('icos').addClass('ico2');
		$(this).removeClass('ico1').addClass('ico1x');

		if ($(this).hasClass('icos')) {
			$(this).removeClass('icos').addClass('ico1x');
		} else if ($(this).hasClass('ico1x')) {
			$(this).removeClass('ico1x').addClass('icos');
		}
	})

	$('#icon3').click(function() {
		$(this).removeClass('ico2').addClass('icos');
		$('.ranking').removeClass('ico1x').removeClass('icos').addClass('ico1');
	})
	//排序按钮 结束
	//新增之前的内容

});

/**
 * 设置cookie
 * @param name
 * @param value
 * @author hulijie
 */
function setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=hc360.com";
};

/**
 * 获取cookie
 * @param name
 * @author hulijie
 */
function getWlCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name) {
			return unescape(arr[1]);
		}

	}
	return "";
};

/**
 * 设置HiddenCode
 * @param btnId text控件ID
 * @param pcode
 * @param citycode
 * @param countycode
 * @author hulijie
 */
function setHiddenCode(btnId, pcode, citycode, countycode) {
	if (pcode != "-1") {
		if (btnId.indexOf('1') != -1) {
			$("#startProvince").val(pcode);
		} else {
			$("#endProvince").val(pcode);
		}
	}
	if (citycode != "-1") {
		if (btnId.indexOf('1') != -1) {
			$("#startCity").val(citycode);
		} else {
			$("#endCity").val(citycode);
		}
	}
	if (countycode != "-1") {
		if (btnId.indexOf('1') != -1) {
			$("#startCounty").val(countycode);
		} else {
			$("#endCounty").val(countycode);
		}
	}
}

/**
 * 根据code查找name
 * @param addrId 地区code
 * @param index 1-省份,2-城市,3-区县
 * @author hulijie
 */
function getAddressName(addrId, index) {
	if (addrId == "") {
		return "";
	}
	if (index == 1) {
		addrId = addrId.substring(0, 5) + "000000";
		var p_json = addressData["province"];
		for (var i in p_json) {
			var child = p_json[i];
			for (var j in child) {
				if (j == addrId) {
					return child[j];
				}
			}
		}
	} else if (index == 2) {
		var parentId = addrId.substring(0, 5) + "000000";
		addrId = addrId.substring(0, 7) + "0000";
		var city_json = addressData["city"];
		var child = city_json[parentId];
		for (var j in child) {
			if (j == addrId) {
				return child[j];
			}
		}
	} else if (index == 3) {
		var parentId = addrId.substring(0, 7) + "0000";
		var county_json = addressData["county"];
		var child = county_json[parentId];
		for (var j in child) {
			if (j == addrId) {
				return child[j];
			}
		}
	}
	return "";
}

/**
 * 根据name查找codeObj
 * @param addrName 地区name
 * @author hulijie
 */
function getAddressCodeObj(addrName) {
	var index = 0; //tab序号
	var pCode = ""; //省份
	var cityCode = ""; //市
	var countyCode = ""; //区县

	if (addrName != "" && addrName.indexOf('-') != -1) {
		var array = addrName.split('-');
		var pName = array[0];
		var cityName = array[1];

		if (pName != "") {
			var p_json = addressData["province"];
			for (var i in p_json) {
				var child = p_json[i];
				for (var j in child) {
					if (child[j] == pName) {
						pCode = j;
						index = 2;
						break;
					}
				}
			}
		}

		if (pCode != "" && cityName != "") {
			var city_json = addressData["city"];
			var child = city_json[pCode];
			for (var j in child) {
				if (child[j] == cityName) {
					cityCode = j;
					index = 3;
					break;
				}
			}
		}

		if (array.length > 2 && cityCode != "") {
			var countyName = array[2];
			if (countyName != "") {
				var county_json = addressData["county"];
				var child = county_json[cityCode];
				for (var j in child) {
					if (child[j] == countyName) {
						countyCode = j;
						index = 3;
						break;
					}
				}
			}
		}

	}

	var obj = {
		pIndex: index, //tab序号
		pCode: pCode, //省份
		cityCode: cityCode, //市
		countyCode: countyCode //区县
	}
	return obj;
}

$('#scform').submit(function() {
	var self = $(this);
	var _s = $('#startCounty').val() ? $('#startCounty').val() : $('#startCity').val(),
		_e = $('#endCounty').val() ? $('#endCounty').val() : $('#endCity').val();
	if (_s && _e) {
		self.attr('action', 'https://56.hc360.com/wlorder/xianlu-' + _s + '-' + _e + '.html');
	} else {
		alert("亲，请正确选择省市地区~");
		return false;
	}
});
