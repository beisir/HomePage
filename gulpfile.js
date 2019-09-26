var gulp = require('gulp'),
    path = require('path'),
    gulputil = require('gulp-util'),
    rename = require('gulp-rename'),
    ftp = require('vinyl-ftp'),

    /**
     * [uploadPathPrefix 上传文件路径前缀，包含测试路径环境名称，及项目目录名称]
     * @type {String}
     */

     uploadPathPrefix = '/Aries/Project/homepage',

    /**
     * [uploadFullPath 上传文件目录网站路径]
     * @type {[type]}
     */
    uploadFullPath = path.join(uploadPathPrefix, '/style/js/projects/HomePageRevision/');

/**
 * [文件上传到中转机]
 */
gulp.task('uploadtest', function() {

    /**
     * [conn 创建连接对象]
     * @type {Object}
     */
    var conn_assets = ftp.create({
        host: '192.168.249.2',
        user: 'csftp01',
        password: 'ftp01asd',
        parallel: 10,
        log: gulputil.log
    });

    /**
     * [上传资源文件]
     */
    gulp.src([
            './dist/**/*.js',
            './dist/**/*.css'
        ], {
            base: '.',
            buffer: false
        })
        .pipe(conn_assets.newer(uploadFullPath))
        .pipe(conn_assets.dest(uploadFullPath));

    /**
     * [conn_html 上传HTML的链接对象]
     * @type {Object}
     */

    /******************************** 2018-06-12   不得使用构建上传index.htm ******************************************/
    /*
    var conn_html = ftp.create({
        host: 'ftp2.hc360.com',
        user: 'kuaix-info',
        password: 'l1On5usXau',
        parallel: 10,
        log: gulputil.log
    });
    */
    /******************************** 2018-06-12   不得使用构建上传index.htm ******************************************/
    /**
     * [上传HTML]
     */
    /*
    gulp.src([
            './dist/index.htm'
        ], {
            base: '.',
            buffer: false
        })
        .pipe(rename('indextemp1.htm'))
        .pipe(conn_html.newer('/publish/news/TEMPLATE/'))
        .pipe(conn_html.dest('/publish/news/TEMPLATE/'));
    */
    /******************************** 2018-06-12   不得使用构建上传index.htm ******************************************/
});

/**
 * [文件上传到中转机]
 */
// gulp.task('uploadonline', function() {

    /**
     * [conn 创建连接对象]
     * @type {Object}
     */
    // var conn_assets = ftp.create({
    //     host: '192.168.249.2',
    //     user: 'csftp01',
    //     password: 'ftp01asd',
    //     parallel: 10,
    //     log: gulputil.log
    // });

    /**
     * [上传资源文件]
     */
    // gulp.src([
    //         './dist/**/*.js',
    //         './dist/**/*.css'
    //     ], {
    //         base: '.',
    //         buffer: false
    //     })
    //     .pipe(conn_assets.newer(uploadFullPath))
    //     .pipe(conn_assets.dest(uploadFullPath));

    /**
     * [conn_html 上传HTML的链接对象]
     * @type {Object}
     */
    /******************************** 2018-06-12   不得使用构建上传index.htm ******************************************/
    /*
        host: 'ftp2.hc360.com',
        user: 'kuaix-info',
        password: 'l1On5usXau',
        parallel: 10,
        log: gulputil.log
    });


    // * [上传HTML]

    gulp.src([
            './dist/index.htm'
        ], {
            base: '.',
            buffer: false
        })
        .pipe(rename('index1.htm')) //index1正式环境 indextemp1测试环境
        .pipe(conn_html.newer('/publish/news/TEMPLATE/'))
        .pipe(conn_html.dest('/publish/news/TEMPLATE/'));
    */
    /******************************** 2018-06-12   不得使用构建上传index.htm ******************************************/
// });

/**
 * [默认上传到测试环境]
 */
gulp.task('default', ['uploadtest']);
