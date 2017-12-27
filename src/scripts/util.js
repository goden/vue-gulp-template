// import $ from 'jquery';
// import swal from 'sweetalert2';

var utils = {
    test: function() {
        console.log('Hello world!');
    },
    isFunction: function (f) {
        return typeof f === 'function';
    },
    queryString: function (key) {
        let _regexp = new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)");
        return (document.location.search.match(_regexp) || ['', null])[1];
    },
    isWKWebView: function () {

        if (navigator.platform.substr(0, 2) !== 'iP') return false;

        //iOS (iPhone, iPod or iPad)
        var lte9 = /constructor/i.test(window.HTMLElement);
        var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
        if ((ua.indexOf('Safari') !== -1 || ua.indexOf('QHBrowser') !== -1 ||
            ua.indexOf('2345') !== -1 || ua.indexOf('Fxi') !== -1) && !nav.standalone) return false;

        // Safari (WKWebView/Nitro since 6+)
        if ((!idb && lte9) || !window.statusbar.visible) return false;

        // UIWebView
        if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) return true;
        return false;

    },
    isAndroidWebview: function () {
        return /mobilebgh5/.test(navigator.userAgent);
    },

    isAppWebview: function () {
        return this.isWKWebview() || this.isAndroidWebview();
    },
    setCookie: function (name, value, days) {
        var Days = days || 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    setCookieTime: function (name, value) {
        var Days = 1;
        var exp = new Date(value);
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = name + "=;path=/;expires=" + exp.toGMTString();
    },
}

module.exports = utils;