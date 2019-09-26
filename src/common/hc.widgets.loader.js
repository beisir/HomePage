var loadDict = {}; //所有加载文件的详细信息字典，键为url标识，值为加载状态（1-正在加载中，2-加载完成）
var taskQueue = {};
var linkDict = {};

var LOADER_URL = '//style.org.hc360.cn/js/build/source/widgets/loader/';

/**
 * 组件统一加载对象构造方法
 * @param moduleName String  组件模块名称
 * @param fn Function 组件依赖文件加载完成后的回调函数
 */
var Loader = function(moduleName, fn) {
    this.init.call(this, moduleName, fn);
};
Loader.prototype = {
    /**
     * 组件统一初始化判断
     * @param moduleName String  组件模块名称
     * @param fn Function 组件依赖文件加载完成后的回调函数
     */
    init: function(moduleName, fn) {
        var _this = this;
        var link = document.getElementsByTagName('link');
        /***
         *  获取页面所有连接地址放入一个数组里面
         */
        for (var i = 0, len = link.length; i < len; i++) {
            linkDict[link[i].href] = 1;
        }
        /***
         * 如果加载过组件，会在HC.W上有当前组件加Urls的属性名，属性值是一个数组
         */
        if (HC.W[moduleName + 'Urls']) {
            _this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
        } else {
            if (loadDict[moduleName]) {
                _this.addTaskQueue(moduleName, function() {
                    _this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
                });
            } else {
                loadDict[moduleName] = 1;
                HC.HUB.addScript(LOADER_URL + 'hc.' + moduleName + '.urls.js', function() {
                    loadDict[moduleName] = 0;
                    _this.loadUrls(0, HC.W[moduleName + 'Urls'], fn);
                    _this.callTaskQueue(moduleName);
                });
            }
        }
    },
    /***
     * 添加组件
     * @param moduleName
     * @param fn
     */
    addTaskQueue: function(moduleName, fn) {
        if (!taskQueue[moduleName]) {
            taskQueue[moduleName] = [];
        }
        taskQueue[moduleName].push(fn);
    },
    callTaskQueue: function(moduleName) {
        if (taskQueue[moduleName]) {
            for (var i = 0, len = taskQueue[moduleName].length; i < len; i++) {
                taskQueue[moduleName][i]();
            }
            taskQueue[moduleName].length = 0;
        }
    },
    /**
     * 批量添加资源文件
     * @param index  Number  当前加载的数组序号
     * @param moduleUrls Array  组件模块url数组
     * @param moduleFn Function  组件模块文件加载完成以后的回调函数
     */
    loadUrls: function(index, moduleUrls, moduleFn) {
        var _this = this;
        var i = index;
        if (i === moduleUrls.length) { //该组件的url尚未被完全加载
            moduleFn && moduleFn();
            moduleFn = null; //清除回调函数，避免重复执行
        } else { //url已全部加载完
            var urlObj = moduleUrls[i];

            /**
             * 异步加载一个url
             * @param url  要加载的地址
             * @param type  类型   addCss  addScript
             */
            function loadUrl(url, type) {
                if (loadDict[url]) {
                    _this.addTaskQueue(url, function() {
                        _this.loadUrls(++i, moduleUrls, moduleFn);
                    });
                } else {
                    loadDict[url] = 1;
                    HC.HUB[type](url, function() {
                        loadDict[url] = 0;
                        _this.loadUrls(++i, moduleUrls, moduleFn);
                        if (type === 'css') {
                            linkDict[url] = 1;
                        }
                        _this.callTaskQueue(url);
                    });
                }
            }
            if (urlObj.css) {
                if (linkDict[urlObj.css]) {
                    _this.loadUrls(++i, moduleUrls, moduleFn);
                } else {
                    loadUrl(urlObj.css, 'addCss');
                }
            } else {
                try {
                    if (eval(urlObj.isExisted)) {
                        _this.loadUrls(++i, moduleUrls, moduleFn);
                    } else {
                        loadUrl(urlObj.js, 'addScript');
                    }
                } catch (ex) {
                    loadUrl(urlObj.js, 'addScript');
                }
            }
        }
    }
};

module.exports = {
    Loader: Loader,

    /**
     * [修改调用方式，这里采用增加一个方法对Loader进行调用使用户易于理解和简单使用，用户依然可以使用Loader获得高级功能。]
     * @param  {[type]}   moduleName [description]
     * @param  {Function} fn         [description]
     * @return {[type]}              [description]
     */
    load: function(moduleName, fn) {
        new Loader(moduleName, fn);
    }
};
