"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),_get=function t(e,i,o){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,i);if(void 0===n){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,i,o)}if("value"in n)return n.value;var l=n.get;if(void 0!==l)return l.call(o)};!function(t,e){var i={exitDelay:200,enterDelay:0,html:null,margin:5,inDuration:250,outDuration:200,position:"bottom",transitionMovement:10},o=function(o){function n(e,i){_classCallCheck(this,n);var o=_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,n,e,i));return o.el.M_Tooltip=o,o.options=t.extend({},n.defaults,i),o.isOpen=!1,o.isHovered=!1,o.isFocused=!1,o._appendTooltipEl(),o._setupEventHandlers(),o}return _inherits(n,o),_createClass(n,[{key:"destroy",value:function(){t(this.tooltipEl).remove(),this._removeEventHandlers(),this.el.M_Tooltip=void 0}},{key:"_appendTooltipEl",value:function(){var t=document.createElement("div");t.classList.add("material-tooltip"),this.tooltipEl=t;var e=document.createElement("div");e.classList.add("tooltip-content"),e.innerHTML=this.options.html,t.appendChild(e),document.body.appendChild(t)}},{key:"_updateTooltipContent",value:function(){this.tooltipEl.querySelector(".tooltip-content").innerHTML=this.options.html}},{key:"_setupEventHandlers",value:function(){this._handleMouseEnterBound=this._handleMouseEnter.bind(this),this._handleMouseLeaveBound=this._handleMouseLeave.bind(this),this._handleFocusBound=this._handleFocus.bind(this),this._handleBlurBound=this._handleBlur.bind(this),this.el.addEventListener("mouseenter",this._handleMouseEnterBound),this.el.addEventListener("mouseleave",this._handleMouseLeaveBound),this.el.addEventListener("focus",this._handleFocusBound,!0),this.el.addEventListener("blur",this._handleBlurBound,!0)}},{key:"_removeEventHandlers",value:function(){this.el.removeEventListener("mouseenter",this._handleMouseEnterBound),this.el.removeEventListener("mouseleave",this._handleMouseLeaveBound),this.el.removeEventListener("focus",this._handleFocusBound,!0),this.el.removeEventListener("blur",this._handleBlurBound,!0)}},{key:"open",value:function(){this.isOpen||(this.isOpen=!0,this.options=t.extend({},this.options,this._getAttributeOptions()),this._updateTooltipContent(),this._setEnterDelayTimeout())}},{key:"close",value:function(){this.isOpen&&(this.isOpen=!1,this._setExitDelayTimeout())}},{key:"_setExitDelayTimeout",value:function(){var t=this;clearTimeout(this._exitDelayTimeout),this._exitDelayTimeout=setTimeout(function(){t.isHovered||t.isFocused||t._animateOut()},this.options.exitDelay)}},{key:"_setEnterDelayTimeout",value:function(){var t=this;clearTimeout(this._enterDelayTimeout),this._enterDelayTimeout=setTimeout(function(){(t.isHovered||t.isFocused)&&t._animateIn()},this.options.enterDelay)}},{key:"_positionTooltip",value:function(){var e=this.el,i=this.tooltipEl,o=e.offsetHeight,n=e.offsetWidth,s=i.offsetHeight,l=i.offsetWidth,r=void 0,u=this.options.margin,a=void 0,h=void 0;this.xMovement=0,this.yMovement=0,a=e.getBoundingClientRect().top+M.getDocumentScrollTop(),h=e.getBoundingClientRect().left+M.getDocumentScrollLeft(),"top"===this.options.position?(a+=-s-u,h+=n/2-l/2,this.yMovement=-this.options.transitionMovement):"right"===this.options.position?(a+=o/2-s/2,h+=n+u,this.xMovement=this.options.transitionMovement):"left"===this.options.position?(a+=o/2-s/2,h+=-l-u,this.xMovement=-this.options.transitionMovement):(a+=o+u,h+=n/2-l/2,this.yMovement=this.options.transitionMovement),r=this._repositionWithinScreen(h,a,l,s),t(i).css({top:r.y+"px",left:r.x+"px"})}},{key:"_repositionWithinScreen",value:function(t,e,i,o){var n=M.getDocumentScrollLeft(),s=M.getDocumentScrollTop(),l=t-n,r=e-s,u={left:l,top:r,width:i,height:o},a=this.options.margin+this.options.transitionMovement,h=M.checkWithinContainer(document.body,u,a);return h.left?l=a:h.right&&(l-=l+i-window.innerWidth),h.top?r=a:h.bottom&&(r-=r+o-window.innerHeight),{x:l+n,y:r+s}}},{key:"_animateIn",value:function(){this._positionTooltip(),this.tooltipEl.style.visibility="visible",e.remove(this.tooltipEl),e({targets:this.tooltipEl,opacity:1,translateX:this.xMovement,translateY:this.yMovement,duration:this.options.inDuration,easing:"easeOutCubic"})}},{key:"_animateOut",value:function(){e.remove(this.tooltipEl),e({targets:this.tooltipEl,opacity:0,translateX:0,translateY:0,duration:this.options.outDuration,easing:"easeOutCubic"})}},{key:"_handleMouseEnter",value:function(){this.isHovered=!0,this.open()}},{key:"_handleMouseLeave",value:function(){this.isHovered=!1,this.close()}},{key:"_handleFocus",value:function(){this.isFocused=!0,this.open()}},{key:"_handleBlur",value:function(){this.isFocused=!1,this.close()}},{key:"_getAttributeOptions",value:function(){var t={},e=this.el.getAttribute("data-tooltip"),i=this.el.getAttribute("data-position");return e&&(t.html=e),i&&(t.position=i),t}}],[{key:"init",value:function(t,e){return _get(n.__proto__||Object.getPrototypeOf(n),"init",this).call(this,this,t,e)}},{key:"getInstance",value:function(t){return(t.jquery?t[0]:t).M_Tooltip}},{key:"defaults",get:function(){return i}}]),n}(Component);M.Tooltip=o,M.jQueryLoaded&&M.initializeJqueryWrapper(o,"tooltip","M_Tooltip")}(cash,M.anime);