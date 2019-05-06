## Table of Contents
- [Masker](#masker)
  - [Class: Masker](#class-masker)
    - [masker.mask(element)](#maskermaskelement)
    - [masker.unmask(element)](#maskerunmaskelement)
    - [masker.maskVal(value)](#maskermaskvalvalue)
    - [masker.unmaskVal(value)](#maskerunmaskvalvalue)
    - [EventListener: masker.inputListener(event)](#eventlistener-maskerinputlistenerevent)
    - [EventListener: masker.keydownListener(event)](#eventlistener-maskerkeydownlistenerevent)
  - [Masker.jQueryPlugin(jQuery)](#maskerjquerypluginjquery)
    - [jQuery.mask(masker)](#jquerymaskmasker)
    - [jQuery.mask(patterns, filter)](#jquerymaskpatterns-filter)
    - [jQuery.unmask()](#jqueryunmask)
    - [jQuery.maskVal(masker)](#jquerymaskvalmasker)
    - [jQuery.maskVal(patterns, filter)](#jquerymaskvalpatterns-filter)
    - [jQuery.unmaskVal()](#jqueryunmaskval)

# Masker
A simple and beautiful way to mask values or input elements.

Install:
```
$ npm install --save maskerjs
```

Include:
```html
<script src="src/masker.js"></script>
```
or
```JavaScript
var Masker = require('maskerjs');
```

# Class: Masker
A masker object has useful methods for applying/unapplying masks to both values and input elements.

- patterns *`String | Array<String>`* mask patterns.
- filter *`RegExp | Function`* filter characters in input value.

Example:
```JavaScript
var code4Masker = new Masker('_ _ _ _', /^[0-9]$/);

var telMasker = new Masker(
  [
    '___-____',
    '(___) ___-____',
    '+_-___-___-____'
  ],
  /^[0-9]$/
);
```

# masker.mask(element)
This method applies the mask to the given input element, and re-applies the mask whenever the input value is change by a user.

- element *`InputElement`* an input element to apply mask to.

Example:
```JavaScript
var code4Input = document.getElementById('code4');
code4Masker.mask(code4Input);
// code4Input.value '1234' => '1 2 3 4'

var telInput = document.getElementById('tel');
telMasker.mask(telInput);
// telInput.value '1234567'     => '123-4567'
// telInput.value '1234567890'  => '(123) 456-7890'
// telInput.value '12345678900' => '+1-234-567-8900'
```

# masker.unmask(element)
This method unapplies the mask to the given input element, and removes listeners for user input changes.

- element *InputElement* an input element to unapply mask from.

Example:
```JavaScript
var code4Input = document.getElementById('code4');
code4Masker.unmask(code4Input);
// code4Input.value '1 2 3 4' => '1234'

var telInput = document.getElementById('tel');
telMasker.unmask(telInput);
// telInput.value '123-4567'        => '1234567'
// telInput.value '(123) 456-7890'  => '1234567890'
// telInput.value '+1-234-567-8900' => '12345678900'
```

# masker.maskVal(value)
This method applies the mask to a give value and returns the masked value.

- value *`String`* a value to be masked.

Example:
```JavaScript
code4Masker.maskVal('1234');      // '1 2 3 4'

telMasker.maskVal('1234567');     // '123-4567'
telMasker.maskVal('1234567890');  // '(123) 456-7890'
telMasker.maskVal('12345678900'); // '+1-234-567-8900'
```

# masker.unmaskVal(value)
This method unapplies the mask to a give value and returns the unmasked value.

- value *`String`* a value to be unmasked.

Example:
```JavaScript
code4Masker.unmaskVal('1 2 3 4');       // '1234'

telMasker.unmaskVal('123-4567');        // '1234567'
telMasker.unmaskVal('(123) 456-7890');  // '1234567890'
telMasker.unmaskVal('+1-234-567-8900'); // '12345678900'
```

# EventListener: masker.inputListener(event)
This event listener is one of two used to bind input changes to the masker.  This is used in both the vanilla masker and the jQuery plugin.  It is exposed so that others can bind those events in new ways like make a plugin for some other UI interaction library.

# EventListener: masker.keydownListener(event)
This event listener is one of two used to bind input changes to the masker.  This is used in both the vanilla masker and the jQuery plugin.  It is exposed so that others can bind those events in new ways like make a plugin for some other UI interaction library.

# Masker.jQueryPlugin(jQuery)
A simple method to register the masker jQuery plugin.

- jQuery *`jQuery`* a reference to the jQuery library.

Example:
```JavaScript
Masker.jQueryPlugin(jQuery);
```

# jQuery.mask(masker)
This method applies the mask to the selected input element, and re-applies the mask whenever the input value is change by a user.

- masker *`Masker`* a masker to apply to the selected element(s).

Example:
```JavaScript
var telMask = new Masker(
  [
    '___-____',            // local
    '(___) ___-____',      // area
    '+_-___-___-____',     // international
  ],
  /^[0-9]$/ // allowed chars
);

// pass in a Masker object
jQuery('input[type="tel"]').mask(telMask);
```

# jQuery.mask(patterns, filter)
This method applies the mask to the selected input element, and re-applies the mask whenever the input value is change by a user.

- patterns *`String | Array<String>`* mask patterns.
- filter *`RegExp | Function`* filter characters in input value.

Example:
```JavaScript
// pass in the Masker constructor arguments
jQuery('input[type="tel"]').mask(
  [
    '___-____',            // local
    '(___) ___-____',      // area
    '+_-___-___-____',     // international
  ],
  /^[0-9]$/ // allowed chars
);
```

# jQuery.unmask()
This method unapplies the mask to the selected input element, and removes listeners for user input changes.

Example:
```JavaScript
// remove the masker
jQuery('input[type="tel"]').unmask();
```

# jQuery.maskVal(masker)
This method applies the mask to the value of the selected input and returns the masked value.

- masker *`Masker`* a masker to apply to the selected element's value.

Example:
```JavaScript
var telMask = new Masker(
  [
    '___-____',            // local
    '(___) ___-____',      // area
    '+_-___-___-____',     // international
  ],
  /^[0-9]$/ // allowed chars
);

// pass in a Masker object
var maskedVal = jQuery('input[type="tel"]').maskVal(telMask);
```

# jQuery.maskVal(patterns, filter)
This method applies the mask to the value of the selected input and returns the masked value.

- patterns *`String | Array<String>`* mask patterns.
- filter *`RegExp | Function`* filter characters in input value.

Example:
```JavaScript
// pass in the Masker constructor arguments
var maskedVal = jQuery('input[type="tel"]').maskVal(
  [
    '___-____',            // local
    '(___) ___-____',      // area
    '+_-___-___-____',     // international
  ],
  /^[0-9]$/ // allowed chars
);
```

# jQuery.unmaskVal()
This method unapplies the mask to the value of the selected input and returns the unmasked value.

Example:
```JavaScript
var unmaskedVal = jQuery('input[type="tel"]').unmaskVal();
```
