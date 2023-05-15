// ==UserScript==
// @name         萌百去广告
// @namespace    http://projectxero.top/
// @version      1.0
// @description  移除萌百广告。
// @author       ProjectXero
// @match        *://*.moegirl.org.cn/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const rewrite = function(url) {
        if (url === "https://app.moegirl.org.cn/insight/ads.config.yml.json") {
            return "https://projectxero.top/moeskin-remove-ads/ads.config.yml.json";
        }
        if (url === "https://storage.moegirl.org.cn/insight/configs.json") {
            return "https://projectxero.top/moeskin-remove-ads/insight.configs.json";
        }
        return url;
    };
    const hookFunc = (obj, prop, hook) => {
        const original = obj[prop];
        const hooked = function() {
            hook.call(this, arguments);
        };
        hooked.toString = original.toString.bind(original);
        Object.defineProperty(obj, prop, { value: hook, writable: true });
        return original;
    };
    const xhrOpen = hookFunc(XMLHttpRequest.prototype, "open", function(method, url, async, user, password) {
        if (typeof url === "string") {
            url = rewrite(url);
        }
        return xhrOpen.call(this, method, url, async, user, password);
    });
    const origFetch = hookFunc(window, "fetch", function(resource, options) {
        if (typeof resource === "string") {
            resource = rewrite(resource);
        }
        return origFetch.call(this, resource, options);
    });
})();