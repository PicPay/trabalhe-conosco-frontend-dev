"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){t.Package?M={}:t.M={},M.jQueryLoaded=!!t.jQuery}(window),"function"==typeof define&&define.amd?define("M",[],function(){return M}):"undefined"==typeof exports||exports.nodeType||("undefined"!=typeof module&&!module.nodeType&&module.exports&&(exports=module.exports=M),exports.default=M),M.keys={TAB:9,ENTER:13,ESC:27,ARROW_UP:38,ARROW_DOWN:40},M.tabPressed=!1;var docHandleKeydown=function(t){t.which===M.keys.TAB&&(M.tabPressed=!0)},docHandleKeyup=function(t){t.which===M.keys.TAB&&(M.tabPressed=!1)};document.addEventListener("keydown",docHandleKeydown),document.addEventListener("keyup",docHandleKeyup),M.initializeJqueryWrapper=function(t,e,o){jQuery.fn[e]=function(n){if(t.prototype[n]){var i=Array.prototype.slice.call(arguments,1);if("get"===n.slice(0,3)){var r=this.first()[0][o];return r[n].apply(r,i)}return this.each(function(){var t=this[o];t[n].apply(t,i)})}if("object"===(void 0===n?"undefined":_typeof(n))||!n)return t.init(this,arguments[0]),this;jQuery.error("Method "+n+" does not exist on jQuery."+e)}},M.AutoInit=function(t){var e=t||document.body,o={Autocomplete:e.querySelectorAll(".autocomplete:not(.no-autoinit)"),Carousel:e.querySelectorAll(".carousel:not(.no-autoinit)"),Chips:e.querySelectorAll(".chips:not(.no-autoinit)"),Collapsible:e.querySelectorAll(".collapsible:not(.no-autoinit)"),Datepicker:e.querySelectorAll(".datepicker:not(.no-autoinit)"),Dropdown:e.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),Materialbox:e.querySelectorAll(".materialboxed:not(.no-autoinit)"),Modal:e.querySelectorAll(".modal:not(.no-autoinit)"),Parallax:e.querySelectorAll(".parallax:not(.no-autoinit)"),Pushpin:e.querySelectorAll(".pushpin:not(.no-autoinit)"),ScrollSpy:e.querySelectorAll(".scrollspy:not(.no-autoinit)"),FormSelect:e.querySelectorAll("select:not(.no-autoinit)"),Sidenav:e.querySelectorAll(".sidenav:not(.no-autoinit)"),Tabs:e.querySelectorAll(".tabs:not(.no-autoinit)"),TapTarget:e.querySelectorAll(".tap-target:not(.no-autoinit)"),Timepicker:e.querySelectorAll(".timepicker:not(.no-autoinit)"),Tooltip:e.querySelectorAll(".tooltipped:not(.no-autoinit)"),FloatingActionButton:e.querySelectorAll(".fixed-action-btn:not(.no-autoinit)")};for(var n in o){M[n].init(o[n])}},M.objectSelectorString=function(t){return((t.prop("tagName")||"")+(t.attr("id")||"")+(t.attr("class")||"")).replace(/\s/g,"")},M.guid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}(),M.escapeHash=function(t){return t.replace(/(:|\.|\[|\]|,|=|\/)/g,"\\$1")},M.elementOrParentIsFixed=function(t){var e=$(t),o=e.add(e.parents()),n=!1;return o.each(function(){if("fixed"===$(this).css("position"))return n=!0,!1}),n},M.checkWithinContainer=function(t,e,o){var n={top:!1,right:!1,bottom:!1,left:!1},i=t.getBoundingClientRect(),r=t.scrollLeft,l=t.scrollTop,u=e.left-r,a=e.top-l;return(u<i.left+o||u<o)&&(n.left=!0),(u+e.width>i.right-o||u+e.width>window.innerWidth-o)&&(n.right=!0),(a<i.top+o||a<o)&&(n.top=!0),(a+e.height>i.bottom-o||a+e.height>window.innerHeight-o)&&(n.bottom=!0),n},M.checkPossibleAlignments=function(t,e,o,n){var i={top:!0,right:!0,bottom:!0,left:!0,spaceOnTop:null,spaceOnRight:null,spaceOnBottom:null,spaceOnLeft:null},r="visible"===getComputedStyle(e).overflow,l=e.getBoundingClientRect(),u=Math.min(l.height,window.innerHeight),a=Math.min(l.width,window.innerWidth),c=t.getBoundingClientRect(),d=e.scrollLeft,p=e.scrollTop,s=o.left-d,f=o.top-p,y=o.top+c.height-p;return i.spaceOnRight=r?window.innerWidth-(c.left+o.width):a-(s+o.width),i.spaceOnRight<0&&(i.left=!1),i.spaceOnLeft=r?c.right-o.width:s-o.width+c.width,i.spaceOnLeft<0&&(i.right=!1),i.spaceOnBottom=r?window.innerHeight-(c.top+o.height+n):u-(f+o.height+n),i.spaceOnBottom<0&&(i.top=!1),i.spaceOnTop=r?c.bottom-(o.height+n):y-(o.height-n),i.spaceOnTop<0&&(i.bottom=!1),i},M.getOverflowParent=function(t){return null==t?null:t===document.body||"visible"!==getComputedStyle(t).overflow?t:M.getOverflowParent(t.parentElement)},M.getIdFromTrigger=function(t){var e=t.getAttribute("data-target");return e||(e=t.getAttribute("href"),e=e?e.slice(1):""),e},M.getDocumentScrollTop=function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},M.getDocumentScrollLeft=function(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0};var getTime=Date.now||function(){return(new Date).getTime()};M.throttle=function(t,e,o){var n=void 0,i=void 0,r=void 0,l=null,u=0;o||(o={});var a=function(){u=!1===o.leading?0:getTime(),l=null,r=t.apply(n,i),n=i=null};return function(){var c=getTime();u||!1!==o.leading||(u=c);var d=e-(c-u);return n=this,i=arguments,d<=0?(clearTimeout(l),l=null,u=c,r=t.apply(n,i),n=i=null):l||!1===o.trailing||(l=setTimeout(a,d)),r}};