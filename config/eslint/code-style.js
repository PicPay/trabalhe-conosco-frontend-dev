/* global module */

/*
 * User experience rules (bug prevention) should be added as "error".
 * Developer experience (code quality) rules should be added as "warn".
 * PS.: this file works better after applying create-react-app eslint config
 */

module.exports = {
  rules: {

    // Enforce line breaks after opening and before closing array brackets
    'array-bracket-newline': ['warn'],

    // Disallow or enforce spaces inside of brackets
    'array-bracket-spacing': ['warn', 'never'],

    // Require space before/after arrow function’s arrow
    'arrow-spacing': [
      'warn', {
        before: true,
        after: true,
      },
    ],

    // Disallow or enforce spaces inside of blocks after opening block and before closing block
    'block-spacing': ['warn', 'always'],

    // Require Brace Style
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],

    // Require Camelcase
    camelcase: ['warn', { properties: 'never' }],

    // Require or disallow trailing commas
    'comma-dangle': [
      'warn', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    // Enforces spacing around commas
    'comma-spacing': ['warn', { before: false, after: true }],

    // Require or disallow newline at the end of files
    'eol-last': ['warn', 'always'],

    // Require or disallow spacing between function identifiers and their invocations
    'func-call-spacing': ['warn'],

    // Enforce consistent line breaks inside function parentheses
    // 'function-paren-newline': ["warn", "multiline"],

    // Enforce consistent spacing around the asterisk in generator functions
    'generator-star-spacing': ['warn'],

    // Ensure consistent use of file extension within the import path
    'import/extensions': ['warn', { js: 'never' }],

    // Enforce consistent indentation
    indent: ['warn', 2],

    // Enforce the consistent use of either double or single quotes in JSX attributes
    'jsx-quotes': ['warn', 'prefer-double'],

    // Enforce consistent spacing between keys and values in object literal properties
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],

    // Enforce consistent spacing before and after keywords
    'keyword-spacing': [
      'warn', {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],

    // Enforce consistent linebreak style
    // Ps.: disabling because we are not confident about how git manages line ending
    'linebreak-style': ['warn', 'unix'],

    // Require or disallow an empty line between class members
    'lines-between-class-members': ['warn', 'always'],

    // require a capital letter for constructors
    'new-cap': [
      'warn', {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: [],
      },
    ],

    // Disallow bitwise operators
    // Ps.: this is generally a programming error.
    'no-bitwise': ['error'],

    // Disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': ['warn'],

    // Disallow Use of Chained Assignment Expressions
    'no-multi-assign': ['warn'],

    // Disallow multiple empty lines
    'no-multiple-empty-lines': ['warn', { max: 1 }],

    // Enforce the location of single-line statements
    'nonblock-statement-body-position': ['warn', 'beside', { overrides: {} }],

    // Disallow all tabs
    'no-tabs': ['warn'],

    // Disallow trailing whitespace at the end of lines
    'no-trailing-spaces': ['warn'],

    // Disallow ternary operators when simpler alternatives exist
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // Enforce consistent spacing inside braces
    'object-curly-spacing': ['warn', 'always'],

    // Enforce consistent line breaks inside braces
    'object-curly-newline': [
      'warn', {
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      },
    ],

    // Enforce placing object properties on separate lines
    'object-property-newline': [
      'warn', {
        allowMultiplePropertiesPerLine: true,
      },
    ],

    // Enforce variables to be declared either together or separately in functions
    'one-var': ['warn', { initialized: 'never' }],

    // Require or disallow assignment operator shorthand where possible
    'operator-assignment': ['warn', 'always'],

    // Enforce consistent linebreak style for operators
    'operator-linebreak': ['warn'],

    // Require or disallow padding within blocks
    'padded-blocks': ['warn', 'never'],

    // Suggest using template literals instead of string concatenation
    'prefer-template': ['warn'],

    // Require quotes around object literal property names
    'quote-props': ['warn', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

    // Enforce the consistent use of either backticks, double, or single quotes
    quotes: ['warn', 'single', { avoidEscape: true }],

    // Validate closing bracket location in JSX
    // 'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],

    // Configure the position of the first property
    // 'react/jsx-first-prop-new-line': ['warn', 'multiline'],

    // Validate props indentation in JSX
    // 'react/jsx-indent-props': ['warn', 2],

    // Validate JSX indentation
    // 'react/jsx-indent': ['warn', 2],

    // Prevent definitions of unused prop types
    // 'react/no-unused-prop-types': ['warn'],

    // Enforce spacing before and after semicolons
    'semi-spacing': ['warn'],

    // Enforce location of semicolons
    'semi-style': ['warn', 'last'],

    // Require or disallow semicolons instead of ASI
    semi: ['warn', 'never'],

    // Require Or Disallow Space Before Blocks
    'space-before-blocks': ['warn'],

    // Require or disallow a space before function parenthesis
    'space-before-function-paren': [
      'warn', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    // Require or disallow spaces before/after unary operators
    'space-unary-ops': [
      'warn', {
        words: true,
        nonwords: false,
        overrides: {
        },
      },
    ],

    // Requires or disallows a whitespace (space or tab) beginning a comment
    'spaced-comment': ['warn', 'always'],

    // Disallow or enforce spaces inside of parentheses
    'space-in-parens': ['warn', 'never'],

    // Require spacing around infix operators
    'space-infix-ops': ['warn'],

    // Enforce spacing around colons of switch statements
    'switch-colon-spacing': ['warn', { after: true, before: false }],

    // Enforce Usage of Spacing in Template Strings
    'template-curly-spacing': ['warn', 'never'],

    // Require or disallow spacing between template tags and their literals
    'template-tag-spacing': ['warn', 'always'],
  },
}
