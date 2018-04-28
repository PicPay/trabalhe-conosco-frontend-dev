"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(t){return null!==t&&t===t.window}function n(t){return e(t)?t:9===t.nodeType&&t.defaultView}function o(t){var e,o,a={top:0,left:0},i=t&&t.ownerDocument;return e=i.documentElement,"undefined"!==_typeof(t.getBoundingClientRect)&&(a=t.getBoundingClientRect()),o=n(i),{top:a.top+o.pageYOffset-e.clientTop,left:a.left+o.pageXOffset-e.clientLeft}}function a(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function i(t){if(!1===d.allowEvent(t))return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentNode;){if(!(n instanceof SVGElement)&&-1!==n.className.indexOf("waves-effect")){e=n;break}n=n.parentNode}return e}function r(e){var n=i(e);null!==n&&(c.show(e,n),"ontouchstart"in t&&(n.addEventListener("touchend",c.hide,!1),n.addEventListener("touchcancel",c.hide,!1)),n.addEventListener("mouseup",c.hide,!1),n.addEventListener("mouseleave",c.hide,!1),n.addEventListener("dragend",c.hide,!1))}var u=u||{},s=document.querySelectorAll.bind(document),c={duration:750,show:function(t,e){if(2===t.button)return!1;var n=e||this,i=document.createElement("div");i.className="waves-ripple",n.appendChild(i);var r=o(n),u=t.pageY-r.top,s=t.pageX-r.left,d="scale("+n.clientWidth/100*10+")";"touches"in t&&(u=t.touches[0].pageY-r.top,s=t.touches[0].pageX-r.left),i.setAttribute("data-hold",Date.now()),i.setAttribute("data-scale",d),i.setAttribute("data-x",s),i.setAttribute("data-y",u);var l={top:u+"px",left:s+"px"};i.className=i.className+" waves-notransition",i.setAttribute("style",a(l)),i.className=i.className.replace("waves-notransition",""),l["-webkit-transform"]=d,l["-moz-transform"]=d,l["-ms-transform"]=d,l["-o-transform"]=d,l.transform=d,l.opacity="1",l["-webkit-transition-duration"]=c.duration+"ms",l["-moz-transition-duration"]=c.duration+"ms",l["-o-transition-duration"]=c.duration+"ms",l["transition-duration"]=c.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",i.setAttribute("style",a(l))},hide:function(t){d.touchup(t);var e=this,n=(e.clientWidth,null),o=e.getElementsByClassName("waves-ripple");if(!(o.length>0))return!1;n=o[o.length-1];var i=n.getAttribute("data-x"),r=n.getAttribute("data-y"),u=n.getAttribute("data-scale"),s=Date.now()-Number(n.getAttribute("data-hold")),l=350-s;l<0&&(l=0),setTimeout(function(){var t={top:r+"px",left:i+"px",opacity:"0","-webkit-transition-duration":c.duration+"ms","-moz-transition-duration":c.duration+"ms","-o-transition-duration":c.duration+"ms","transition-duration":c.duration+"ms","-webkit-transform":u,"-moz-transform":u,"-ms-transform":u,"-o-transform":u,transform:u};n.setAttribute("style",a(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},c.duration)},l)},wrapInput:function(t){for(var e=0;e<t.length;e++){var n=t[e];if("input"===n.tagName.toLowerCase()){var o=n.parentNode;if("i"===o.tagName.toLowerCase()&&-1!==o.className.indexOf("waves-effect"))continue;var a=document.createElement("i");a.className=n.className+" waves-input-wrapper";var i=n.getAttribute("style");i||(i=""),a.setAttribute("style",i),n.className="waves-button-input",n.removeAttribute("style"),o.replaceChild(a,n),a.appendChild(n)}}}},d={touches:0,allowEvent:function(t){var e=!0;return"touchstart"===t.type?d.touches+=1:"touchend"===t.type||"touchcancel"===t.type?setTimeout(function(){d.touches>0&&(d.touches-=1)},500):"mousedown"===t.type&&d.touches>0&&(e=!1),e},touchup:function(t){d.allowEvent(t)}};u.displayEffect=function(e){e=e||{},"duration"in e&&(c.duration=e.duration),c.wrapInput(s(".waves-effect")),"ontouchstart"in t&&document.body.addEventListener("touchstart",r,!1),document.body.addEventListener("mousedown",r,!1)},u.attach=function(e){"input"===e.tagName.toLowerCase()&&(c.wrapInput([e]),e=e.parentNode),"ontouchstart"in t&&e.addEventListener("touchstart",r,!1),e.addEventListener("mousedown",r,!1)},t.Waves=u,document.addEventListener("DOMContentLoaded",function(){u.displayEffect()},!1)}(window);