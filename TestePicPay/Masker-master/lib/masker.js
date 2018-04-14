var Generator = require('generate-js');

function makeMasks(masks) {
    if (typeof masks === 'string') {
        return [masks];
    } else if (masks instanceof Array) {
        for (var i = 0; i < masks.length; i++) {
            if (typeof masks[i] !== 'string') {
                throw new Error('masks must be a string or array of strings');
            }
        }
        return masks;
    }
    throw new Error('masks must be a string or array of strings');
}

var Masker = Generator.generate(function Masker(masks, filter) {
    var _ = this;
    _._masks = [];

    masks = makeMasks(masks);

    for (var i = 0; i < masks.length; i++) {
        _._masks.push({
            length: masks[i].replace(/[^_]/g, '')
                .length,
            mask: masks[i]
        });
    }

    _.__filter = filter;

    _._masks.sort(function (a, b) {
        return a.length - b.length;
    });

    _.inputListener = _._inputListener();
    _.keydownListener = _._keydownListener();
});

Masker.definePrototype({
    _mask: function _mask(val, selectionStart, selectionEnd, maskBlank) {
        var _ = this;

        var rule = _._unmask(val, selectionStart, selectionEnd);

        val = rule.text;
        selectionStart = rule.selectionStart;
        selectionEnd = rule.selectionEnd;

        var s = selectionStart;
        var e = selectionEnd;

        if (!maskBlank && !val.length) {
            return {
                text: '',
                selectionStart: selectionStart
            };
        }

        var mask = _._getMask(val.length);

        var text = '';

        for (var i = 0, j = 0; j <= val.length && i < mask.length; i++) {
            var mText = mask[i];
            var tText = val[j];

            if (mText === '_' && j < val.length) {
                text += tText;
                j++;
            } else if (mText !== '_' && j <= val.length) {
                text += mText;

                if (j <= s) {
                    selectionStart++;
                }

                if (j <= e) {
                    selectionEnd++;
                }
            } else {
                break;
            }
        }

        return {
            text: text,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
            selectionDirection: selectionStart <= selectionEnd ? 'forward' : 'backward'
        };
    },

    _unmask: function _unmask(val, selectionStart, selectionEnd) {
        var _ = this;

        var text = '';
        var s = selectionStart;
        var e = selectionEnd;

        for (var i = 0; i < val.length; i++) {
            if (_._filter(val[i])) {
                text += val[i];
            } else {
                if (i < s) {
                    selectionStart--;
                }

                if (i < e) {
                    selectionEnd--;
                }
            }
        }

        return {
            text: text,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
            selectionDirection: selectionStart <= selectionEnd ? 'forward' : 'backward'
        };
    },

    _filter: function _filter(ch) {
        var _ = this;

        if (typeof _.__filter === 'function') {
            return _.__filter(ch);
        } else if (_.__filter instanceof RegExp) {
            return _.__filter.test(ch);
        }

        return true;
    },

    _getMask: function _getMask(length) {
        var _ = this;

        for (var i = 0; i < _._masks.length; i++) {
            if (_._masks[i].length >= length) {
                return _._masks[i].mask;
            }
        }

        return _._masks[_._masks.length - 1].mask;
    },

    _keydownListener: function _keydownListener() {
        var masker = this;

        return function EVENTS_KEYDOWN(evt) {
            var el = evt.target,
                rule;

            var start = el.selectionStart,
                end = el.selectionEnd,
                val = el.value;

            if (evt.keyCode === 8) { // backspace
                rule = masker._unmask(val, start, end);

                start = rule.selectionStart;
                end = rule.selectionEnd;
                val = rule.text;

                if (start === end) {
                    start = Math.max(start - 1, 0);
                    end = Math.max(end, start);
                }

                val = val.slice(0, start) + val.slice(end);

                end = start;
                evt.preventDefault();
            } else if (evt.keyCode === 38 || (evt.metaKey && evt.keyCode === 37)) { // up
                if (evt.shiftKey) {
                    return;
                }

                start = 0;
                end = start;
                evt.preventDefault();
            } else if (evt.keyCode === 40 || (evt.metaKey && evt.keyCode === 39)) { // down
                if (evt.shiftKey) {
                    return;
                }

                start = val.length;
                end = start;
                evt.preventDefault();
            } else if (evt.keyCode === 37) { // left
                if (evt.shiftKey) {
                    return;
                }

                rule = masker._unmask(val, start, end);

                start = rule.selectionStart;
                end = rule.selectionEnd;
                val = rule.text;

                if (start === end) {
                    start = Math.max(start - 1, 0);
                    end = start;
                } else {
                    start = Math.max(0, Math.min(start, end));
                    end = start;
                }

                evt.preventDefault();
            } else if (evt.keyCode === 39) { // right
                if (evt.shiftKey) {
                    return;
                }

                rule = masker._unmask(val, start, end);

                start = rule.selectionStart;
                end = rule.selectionEnd;
                val = rule.text;

                if (start === end) {
                    start = Math.min(start + 1, val.length);
                    end = start;
                } else {
                    start = Math.min(val.length, Math.max(start, end));
                    end = start;
                }

                evt.preventDefault();
            } else {
                return;
            }

            rule = masker._mask(val, start, end, true);

            el.value = rule.text;
            el.setSelectionRange(
                rule.selectionStart,
                rule.selectionEnd,
                rule.selectionDirection
            );
        };
    },

    _inputListener: function _inputListener() {
        var masker = this;

        return function EVENTS_INPUT(evt) {
            var el = evt.target;

            var rule = masker._mask(el.value, el.selectionStart, el.selectionEnd,
                true);

            el.value = rule.text;
            el.setSelectionRange(rule.selectionStart, rule.selectionEnd);
        };
    },

    _maskInput: function _maskInput(el) {
        var _ = this;

        var rule = _._mask(el.value, el.selectionStart, el.selectionEnd);

        el.value = rule.text;
        el.setSelectionRange(rule.selectionStart, rule.selectionEnd);
    },

    _unmaskInput: function _unmaskInput(el) {
        var _ = this;

        var rule = _.unmask(el.value, el.selectionStart, el.selectionEnd);

        el.value = rule.text;
        el.setSelectionRange(rule.selectionStart, rule.selectionEnd);
    },

    mask: function mask(el) {
        var _ = this;

        el.addEventListener('input', _.inputListener, false);
        el.addEventListener('keydown', _.keydownListener, false);

        _._maskInput(el);
    },

    unmask: function unmask(el) {
        var _ = this;

        el.removeEventListener('input', _.inputListener, false);
        el.removeEventListener('keydown', _.keydownListener, false);

        _._unmaskInput(el);
    },

    maskVal: function maskVal(value) {
        var _ = this;

        var rule = _._mask(value, 0, 0);

        return rule.text;
    },

    unmaskVal: function unmaskVal(value) {
        var _ = this;

        var rule = _.unmask(value, 0, 0);

        return rule.text;
    },

    bind: function bind() {
        var _ = this;

        console.warn('masker.bind has been depreciated use masker.mask instead.');

        _.mask.apply(_, Array.prototype.slice.call(arguments));
    },

    unbind: function unbind() {
        var _ = this;

        console.warn('masker.unbind has been depreciated use masker.unmask instead.');

        _.unmask.apply(_, Array.prototype.slice.call(arguments));
    }
});


Masker.jQueryPlugin = function ($) {
    $.fn.mask = function (patterns, _filter) {
        var masker;

        if (Masker.isCreation(patterns)) {
            masker = patterns;
        } else {
            masker = new Masker(patterns, _filter);
        }

        this.unmask();

        this.each(function () {
            var $el = $(this);

            $el.data('$_maskerjs_$', masker);
            $el.on('input', masker.inputListener);
            $el.on('keydown', masker.keydownListener);

            masker._maskInput(this);
        });

        return this;
    };

    $.fn.unmask = function () {
        this.each(function () {
            var $el = $(this);
            var masker = $el.data('$_maskerjs_$');

            if (!masker) return;

            $el.removeData('$_maskerjs_$');
            $el.off('input', masker.inputListener);
            $el.off('keydown', masker.keydownListener);

            masker._unmaskInput(this);
        });

        return this;
    };

    $.fn.maskVal = function (patterns, _filter) {
        var masker;

        if (Masker.isCreation(patterns)) {
            masker = patterns;
        } else {
            masker = new Masker(patterns, _filter);
        }

        return masker.maskVal(this.val());
    };

    $.fn.unmaskVal = function () {
        var masker = this.data('$_maskerjs_$');

        if (!masker) return this.val();

        return masker.unmaskVal(this.val());
    };
};

module.exports = Masker;
