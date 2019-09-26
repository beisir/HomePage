// module.exports = function () {
//   /**
//    * [点击页面中慧付宝、交易安全链接时，跳转页面前的逻辑判断]
//    */
//   $(document).delegate("[node-name='hfb'],[node-name='security']", 'click', function (event) {
//     var zhifuIndex = '//sso.hc360.com/ssologin?hfbloginsign=1', //正式环境地址
//       zhifuTextIndex = '//www.hczhifucs.com/', //测试环境地址
//       LoginHref = $(event.target).attr('node-name') == 'hfb' ? '//uc.hczhifu.com/ucenter/' : '//uc.hczhifu.com/ucenter/security/index.html', //如果点击的是慧付宝，跳转第一个网址，交易安全跳转第二个
//       tempwindow; //先打开临时窗体，由于是点击事件内触发，不会被拦截
//     //获取模拟登录链接（异步跨域）
//     $.ajax({
//       type: "GET",
//       url: '//my.b2b.hc360.com/my/turbine/action/hfbauthorize.AnalogLoginAuthorizeAction/eventsubmit_doAuthorize/doAuthorize',
//       dataType: "jsonp",
//       data: {'isHFB': 'yes'},
//       jsonp: "jsoncallback",
//       success: function (data) {
//         // 如果是模拟登录，禁止通过模拟登陆慧付宝
//         if (data.isALogin == true ) {
//           alert('您无权登录!');
//           return false;
//         }
//         tempwindow= window.open();
//         //返回值不为空，请求模拟登录
//         if (data.url != "") {
//           //模拟登录成功跳转到慧付宝
//           jQuery.ajax({
//             type: "GET",
//             url: data.url,
//             dataType: "jsonp",
//             jsonp: "callback",
//             success: function (result) {
//               if (result.isLogin) {
//                 tempwindow.location = LoginHref;
//               } else {
//                 tempwindow.location = zhifuIndex;
//               }
//             }
//           });
//         } else {
//           tempwindow.location = zhifuIndex;
//         }
//       },
//       error: function () {
//         window.open().location = zhifuIndex;
//       }
//     });
//   });
// };
