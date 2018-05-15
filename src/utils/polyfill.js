require('core-js/fn/object/values')
import 'promise-polyfill/src/polyfill';

Number.isNaN = Number.isNaN || function(value) {     
  return value !== value;
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function flatten(depth) {
    if (depth === undefined) return this.flatten(1)
    else if (typeof depth !== 'number' || depth < 1) return Array.from(this)
    return this.filter(x => x !== undefined)
      .reduce((prev, curr) => (Array.isArray(curr) ? [...prev, ...curr] : [...prev, curr]), [])
      .flatten(depth - 1)
  }
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function indexOf(member, startFrom) {
    /*
    In non-strict mode, if the `this` variable is null or undefined, then it is
    set to the window object. Otherwise, `this` is automatically converted to an
    object. In strict mode, if the `this` variable is null or undefined, a
    `TypeError` is thrown.
    */
    if (this == null) {
      throw new TypeError("Array.prototype.indexOf() - can't convert `" + this + "` to object");
    }

    var
      index = isFinite(startFrom) ? Math.floor(startFrom) : 0,
      that = this instanceof Object ? this : new Object(this),
      length = isFinite(that.length) ? Math.floor(that.length) : 0;

    if (index >= length) {
      return -1;
    }

    if (index < 0) {
      index = Math.max(length + index, 0);
    }

    if (member === undefined) {
      /*
        Since `member` is undefined, keys that don't exist will have the same
        value as `member`, and thus do need to be checked.
      */
      do {
        if (index in that && that[index] === undefined) {
          return index;
        }
      } while (++index < length);
    } else {
      do {
        if (that[index] === member) {
          return index;
        }
      } while (++index < length);
    }

    return -1;
  };
}
