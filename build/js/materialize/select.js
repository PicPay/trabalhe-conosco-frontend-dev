"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),_get=function e(t,i,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,i);if(void 0===o){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,i,n)}if("value"in o)return o.value;var l=o.get;if(void 0!==l)return l.call(n)};!function(e){var t={classes:"",dropdownOptions:{}},i=function(i){function n(t,i){_classCallCheck(this,n);var o=_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,n,t,i));return o.$el.hasClass("browser-default")?_possibleConstructorReturn(o):(o.el.M_FormSelect=o,o.options=e.extend({},n.defaults,i),o.isMultiple=o.$el.prop("multiple"),o.el.tabIndex=-1,o._keysSelected={},o._valueDict={},o._setupDropdown(),o._setupEventHandlers(),o)}return _inherits(n,i),_createClass(n,[{key:"destroy",value:function(){this._removeEventHandlers(),this._removeDropdown(),this.el.M_FormSelect=void 0}},{key:"_setupEventHandlers",value:function(){var t=this;this._handleSelectChangeBound=this._handleSelectChange.bind(this),this._handleOptionClickBound=this._handleOptionClick.bind(this),this._handleInputClickBound=this._handleInputClick.bind(this),e(this.dropdownOptions).find("li:not(.optgroup)").each(function(e){e.addEventListener("click",t._handleOptionClickBound)}),this.el.addEventListener("change",this._handleSelectChangeBound),this.input.addEventListener("click",this._handleInputClickBound)}},{key:"_removeEventHandlers",value:function(){var t=this;e(this.dropdownOptions).find("li:not(.optgroup)").each(function(e){e.removeEventListener("click",t._handleOptionClickBound)}),this.el.removeEventListener("change",this._handleSelectChangeBound),this.input.removeEventListener("click",this._handleInputClickBound)}},{key:"_handleSelectChange",value:function(e){this._setValueToInput()}},{key:"_handleOptionClick",value:function(t){t.preventDefault();var i=e(t.target).closest("li")[0],n=i.id;if(!e(i).hasClass("disabled")&&!e(i).hasClass("optgroup")&&n.length){var o=!0;if(this.isMultiple){var s=e(this.dropdownOptions).find("li.disabled.selected");s.length&&(s.removeClass("selected"),s.find('input[type="checkbox"]').prop("checked",!1),this._toggleEntryFromArray(s[0].id));var l=e(i).find('input[type="checkbox"]');l.prop("checked",!l.prop("checked")),o=this._toggleEntryFromArray(n)}else e(this.dropdownOptions).find("li").removeClass("active"),e(i).toggleClass("active"),this.input.value=i.textContent;this._activateOption(e(this.dropdownOptions),i),e(this._valueDict[n].el).prop("selected",o),this.$el.trigger("change")}t.stopPropagation()}},{key:"_handleInputClick",value:function(){this.dropdown&&this.dropdown.isOpen&&(this._setValueToInput(),this._setSelectedStates())}},{key:"_setupDropdown",value:function(){var t=this;this.wrapper=document.createElement("div"),e(this.wrapper).addClass("select-wrapper "+this.options.classes),this.$el.before(e(this.wrapper)),this.wrapper.appendChild(this.el),this.el.disabled&&this.wrapper.classList.add("disabled"),this.$selectOptions=this.$el.children("option, optgroup"),this.dropdownOptions=document.createElement("ul"),this.dropdownOptions.id="select-options-"+M.guid(),e(this.dropdownOptions).addClass("dropdown-content select-dropdown "+(this.isMultiple?"multiple-select-dropdown":"")),this.$selectOptions.length&&this.$selectOptions.each(function(i){if(e(i).is("option")){var n=void 0;n=t.isMultiple?t._appendOptionWithIcon(t.$el,i,"multiple"):t._appendOptionWithIcon(t.$el,i),t._addOptionToValueDict(i,n)}else if(e(i).is("optgroup")){var o=e(i).children("option");e(t.dropdownOptions).append(e('<li class="optgroup"><span>'+i.getAttribute("label")+"</span></li>")[0]),o.each(function(e){var i=t._appendOptionWithIcon(t.$el,e,"optgroup-option");t._addOptionToValueDict(e,i)})}}),this.$el.after(this.dropdownOptions),this.input=document.createElement("input"),e(this.input).addClass("select-dropdown dropdown-trigger"),this.input.setAttribute("type","text"),this.input.setAttribute("readonly","true"),this.input.setAttribute("data-target",this.dropdownOptions.id),this.el.disabled&&e(this.input).prop("disabled","true"),this.$el.before(this.input),this._setValueToInput();var i=e('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');if(this.$el.before(i[0]),!this.el.disabled){var n=e.extend({},this.options.dropdownOptions);n.onOpenEnd=function(i){var n=e(t.dropdownOptions).find(".selected").first();if(t.dropdown.isScrollable&&n.length){var o=n[0].getBoundingClientRect().top-t.dropdownOptions.getBoundingClientRect().top;o-=t.dropdownOptions.clientHeight/2,t.dropdownOptions.scrollTop=o}},this.isMultiple&&(n.closeOnClick=!1),this.dropdown=M.Dropdown.init(this.input,n)}this._setSelectedStates()}},{key:"_addOptionToValueDict",value:function(e,t){var i=Object.keys(this._valueDict).length,n=this.dropdownOptions.id+i,o={};t.id=n,o.el=e,o.optionEl=t,this._valueDict[n]=o}},{key:"_removeDropdown",value:function(){e(this.wrapper).find(".caret").remove(),e(this.input).remove(),e(this.dropdownOptions).remove(),e(this.wrapper).before(this.$el),e(this.wrapper).remove()}},{key:"_appendOptionWithIcon",value:function(t,i,n){var o=i.disabled?"disabled ":"",s="optgroup-option"===n?"optgroup-option ":"",l=this.isMultiple?'<label><input type="checkbox"'+o+'"/><span>'+i.innerHTML+"</span></label>":i.innerHTML,r=e("<li></li>"),p=e("<span></span>");p.html(l),r.addClass(o+" "+s),r.append(p);var a=i.getAttribute("data-icon");i.getAttribute("class");if(a){var d=e('<img alt="" src="'+a+'">');r.prepend(d)}return e(this.dropdownOptions).append(r[0]),r[0]}},{key:"_toggleEntryFromArray",value:function(t){var i=!this._keysSelected.hasOwnProperty(t);return i?this._keysSelected[t]=!0:delete this._keysSelected[t],e(this._valueDict[t].optionEl).toggleClass("active"),e(this._valueDict[t].el).prop("selected",i),i}},{key:"_setValueToInput",value:function(){var t="";if(this.$el.find("option").each(function(i){if(e(i).prop("selected")){var n=e(i).text();t+=""===t?n:", "+n}}),""===t){var i=this.$el.find("option:disabled").eq(0);i.length&&(t=i.text())}this.input.value=t}},{key:"_setSelectedStates",value:function(){this._keysSelected={};for(var t in this._valueDict){var i=this._valueDict[t];e(i.el).prop("selected")?(e(i.optionEl).find('input[type="checkbox"]').prop("checked",!0),this._activateOption(e(this.dropdownOptions),e(i.optionEl)),this._keysSelected[t]=!0):(e(i.optionEl).find('input[type="checkbox"]').prop("checked",!1),e(i.optionEl).removeClass("selected"))}}},{key:"_activateOption",value:function(t,i){if(i){this.isMultiple||t.find("li.selected").removeClass("selected");e(i).addClass("selected")}}},{key:"getSelectedValues",value:function(){var e=[];for(var t in this._keysSelected)e.push(this._valueDict[t].el.value);return e}}],[{key:"init",value:function(e,t){return _get(n.__proto__||Object.getPrototypeOf(n),"init",this).call(this,this,e,t)}},{key:"getInstance",value:function(e){return(e.jquery?e[0]:e).M_FormSelect}},{key:"defaults",get:function(){return t}}]),n}(Component);M.FormSelect=i,M.jQueryLoaded&&M.initializeJqueryWrapper(i,"formSelect","M_FormSelect")}(cash);