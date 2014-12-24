/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(t,n){"use strict";function e(t){this.callback=t,this.ticking=!1}function i(n){return n&&"undefined"!=typeof t&&(n===t||n.nodeType)}function o(t){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var n,e,s=t||{};for(e=1;e<arguments.length;e++){var r=arguments[e]||{};for(n in r)s[n]="object"!=typeof s[n]||i(s[n])?s[n]||r[n]:o(s[n],r[n])}return s}function s(t){return t===Object(t)?t:{down:t,up:t}}function r(t,n){n=o(n,r.options),this.lastKnownScrollY=0,this.elem=t,this.debouncer=new e(this.update.bind(this)),this.tolerance=s(n.tolerance),this.classes=n.classes,this.offset=n.offset,this.scroller=n.scroller,this.initialised=!1,this.onPin=n.onPin,this.onUnpin=n.onUnpin,this.onTop=n.onTop,this.onNotTop=n.onNotTop}var a={bind:!!function(){}.bind,classList:"classList"in n.documentElement,rAF:!!(t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame)};t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,e.prototype={constructor:e,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},r.prototype={constructor:r,init:function(){return r.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var t=this.classes;this.initialised=!1,this.elem.classList.remove(t.unpinned,t.pinned,t.top,t.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var t=this.elem.classList,n=this.classes;(t.contains(n.pinned)||!t.contains(n.unpinned))&&(t.add(n.unpinned),t.remove(n.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var t=this.elem.classList,n=this.classes;t.contains(n.unpinned)&&(t.remove(n.unpinned),t.add(n.pinned),this.onPin&&this.onPin.call(this))},top:function(){var t=this.elem.classList,n=this.classes;t.contains(n.top)||(t.add(n.top),t.remove(n.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var t=this.elem.classList,n=this.classes;t.contains(n.notTop)||(t.add(n.notTop),t.remove(n.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(n.documentElement||n.body.parentNode||n.body).scrollTop},getViewportHeight:function(){return t.innerHeight||n.documentElement.clientHeight||n.body.clientHeight},getDocumentHeight:function(){var t=n.body,e=n.documentElement;return Math.max(t.scrollHeight,e.scrollHeight,t.offsetHeight,e.offsetHeight,t.clientHeight,e.clientHeight)},getElementHeight:function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},getScrollerHeight:function(){return this.scroller===t||this.scroller===n.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(t){var n=0>t,e=t+this.getViewportHeight()>this.getScrollerHeight();return n||e},toleranceExceeded:function(t,n){return Math.abs(t-this.lastKnownScrollY)>=this.tolerance[n]},shouldUnpin:function(t,n){var e=t>this.lastKnownScrollY,i=t>=this.offset;return e&&i&&n},shouldPin:function(t,n){var e=t<this.lastKnownScrollY,i=t<=this.offset;return e&&n||i},update:function(){var t=this.getScrollY(),n=t>this.lastKnownScrollY?"down":"up",e=this.toleranceExceeded(t,n);this.isOutOfBounds(t)||(t<=this.offset?this.top():this.notTop(),this.shouldUnpin(t,e)?this.unpin():this.shouldPin(t,e)&&this.pin(),this.lastKnownScrollY=t)}},r.options={tolerance:{up:0,down:0},offset:0,scroller:t,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},r.cutsTheMustard="undefined"!=typeof a&&a.rAF&&a.bind&&a.classList,t.Headroom=r}(window,document),/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(t){t&&(t.fn.headroom=function(n){return this.each(function(){var e=t(this),i=e.data("headroom"),o="object"==typeof n&&n;o=t.extend(!0,{},Headroom.options,o),i||(i=new Headroom(this,o),i.init(),e.data("headroom",i)),"string"==typeof n&&i[n]()})},t("[data-headroom]").each(function(){var n=t(this);n.headroom(n.data())}))}(window.Zepto||window.jQuery),/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
!function(t,n,e){var i=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=e(i):"function"==typeof define&&define.amd?define(function(){return n[t]=e(i)}):n[t]=e(i)}("enquire",this,function(t){"use strict";function n(t,n){var e,i=0,o=t.length;for(i;o>i&&(e=n(t[i],i),e!==!1);i++);}function e(t){return"[object Array]"===Object.prototype.toString.apply(t)}function i(t){return"function"==typeof t}function o(t){this.options=t,!t.deferSetup&&this.setup()}function s(n,e){this.query=n,this.isUnconditional=e,this.handlers=[],this.mql=t(n);var i=this;this.listener=function(t){i.mql=t,i.assess()},this.mql.addListener(this.listener)}function r(){if(!t)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!t("only all").matches}return o.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},s.prototype={addHandler:function(t){var n=new o(t);this.handlers.push(n),this.matches()&&n.on()},removeHandler:function(t){var e=this.handlers;n(e,function(n,i){return n.equals(t)?(n.destroy(),!e.splice(i,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){n(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";n(this.handlers,function(n){n[t]()})}},r.prototype={register:function(t,o,r){var a=this.queries,h=r&&this.browserIsIncapable;return a[t]||(a[t]=new s(t,h)),i(o)&&(o={match:o}),e(o)||(o=[o]),n(o,function(n){i(n)&&(n={match:n}),a[t].addHandler(n)}),this},unregister:function(t,n){var e=this.queries[t];return e&&(n?e.removeHandler(n):(e.clear(),delete this.queries[t])),this}},new r});/*!
 *  VictorSzeto.com JavaScript v0.0.1
 *  Source: https://github.com/victorvation/victorvation.github.io/tree/dev
 */
var headroomOptions={offset:120,tolerance:5,classes:{initial:"topbar",pinned:"topbar--pinned",unpinned:"topbar--unpinned",top:"topbar--top",notTop:"topbar--not-top"}};$(function(){var t=$(".navdrawer-container"),n=$("body"),e=$(".app-bar"),i=$(".menu"),o=$("main"),s=function(){n.toggleClass("open"),e.toggleClass("open"),t.toggleClass("open")},r=function(){n.removeClass("open"),e.removeClass("open"),t.removeClass("open")};o.on("click",r),i.on("click",s),e.headroom(headroomOptions),$("button.link-to-top").on("click",function(){return $("html, body").animate({scrollTop:0},"slow").promise().done(function(){a()}),!1}),t.find("li").each(function(){$(this).on("click",function(){var n=$(this).children().attr("href");return $("html, body").animate({scrollTop:$(n).offset().top},"slow"),(t.hasClass("topbar--pinned")||e.hasClass("topbar--pinned"))&&$("html, body").promise().done(function(){a(),r()}),!1})}),$(".fa-heart-o").on("mouseover mouseout",function(){$(this).toggleClass("fa-spin")});var a=function(){var n=t.hasClass("topbar--pinned")?t:e;n.data().headroom.unpin()};enquire.register("(min-width: 990px)",{match:function(){t.headroom(headroomOptions),t.on("mouseover",function(){t.data().headroom.pin()});var n=e.data();"undefined"!=typeof n.headroom&&(n.headroom.destroy(),delete n.headroom)},unmatch:function(){e.headroom(headroomOptions);var n=t.data();"undefined"!=typeof n.headroom&&(n.headroom.destroy(),delete n.headroom)}})});