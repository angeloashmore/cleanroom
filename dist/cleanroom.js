(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("punycode"));
	else if(typeof define === 'function' && define.amd)
		define(["punycode"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("punycode")) : factory(root["punycode"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _cleanroomCommand = __webpack_require__(8);

	var _cleanroomCommand2 = _interopRequireDefault(_cleanroomCommand);

	var _cleanroomErrors = __webpack_require__(3);

	var Cleanroom = (function () {
	  _createClass(Cleanroom, null, [{
	    key: 'initCommand',
	    value: function initCommand(Class) {
	      Class.run = Class._run(Class);
	      Class.runExplicit = Class._runExplicit(Class);
	    }
	  }, {
	    key: 'Command',
	    value: _cleanroomCommand2['default'],
	    enumerable: true
	  }]);

	  function Cleanroom() {
	    _classCallCheck(this, Cleanroom);

	    throw new _cleanroomErrors.NotUsedError();
	  }

	  return Cleanroom;
	})();

	exports['default'] = Cleanroom;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var ExtendableError = (function (_Error) {
	  function ExtendableError(message) {
	    _classCallCheck(this, ExtendableError);

	    Error.captureStackTrace(this, this.constructor);
	    this.message = message;
	    _get(Object.getPrototypeOf(ExtendableError.prototype), "constructor", this).call(this, message);
	  }

	  _inherits(ExtendableError, _Error);

	  _createClass(ExtendableError, {
	    name: {
	      get: function () {
	        return this.constructor.name;
	      }
	    }
	  });

	  return ExtendableError;
	})(Error);

	module.exports = ExtendableError;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var validators = __webpack_require__(6),
		formats = {
			'date-time': /^\d{4}-(0[0-9]{1}|1[0-2]{1})-[0-9]{2}[t ]\d{2}:\d{2}:\d{2}(\.\d+)?([zZ]|[+-]\d{2}:\d{2})$/i,
			'date': /^\d{4}-(0[0-9]{1}|1[0-2]{1})-[0-9]{2}$/,
			'time': /^\d{2}:\d{2}:\d{2}$/,
			'color': /^(#[0-9a-f]{3}|#[0-9a-f]{6}|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)$/i,
			'style': /^(?:\s*-?[_A-Z]+[_A-Z0-9-]*:[^\n\r\f;]+;)*\s*-?[_A-Z]+[_A-Z0-9-]*:[^\n\r\f;]+;?\s*$/i,
			'phone': /^(?:(?:\(?(?:00|\+)(?:[1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?(?:(?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(?:\d+))?$/i,
			'uri': /^(?:([a-z0-9+.-]+:\/\/)((?:(?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(:(?:\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?|([a-z0-9+.-]+:)(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?)(\?(?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*)?(#(?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*)?$/i,
			'email': /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i,
			'ipv4': /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
			'ipv6': /^\s*((([0-9A-F]{1,4}:){7}([0-9A-F]{1,4}|:))|(([0-9A-F]{1,4}:){6}(:[0-9A-F]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-F]{1,4}:){5}(((:[0-9A-F]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-F]{1,4}:){4}(((:[0-9A-F]{1,4}){1,3})|((:[0-9A-F]{1,4})((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){3}(((:[0-9A-F]{1,4}){1,4})|((:[0-9A-F]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){2}(((:[0-9A-F]{1,4}){1,5})|((:[0-9A-F]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){1}(((:[0-9A-F]{1,4}){1,6})|((:[0-9A-F]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-F]{1,4}){1,7})|((:[0-9A-F]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/i,

			// hostname regex from: http://stackoverflow.com/a/1420225/5628
			'hostname': /^(?=.{1,255}$)[0-9A-Z](?:(?:[0-9A-Z]|-){0,61}[0-9A-Z])?(?:\.[0-9A-Z](?:(?:[0-9A-Z]|-){0,61}[0-9A-Z])?)*\.?$/i,

			'utc-millisec': function(subject) {
				var parsed = parseInt(subject, 10);
				return !isNaN(parsed) && parsed.toString() === subject.toString();
			},
			'regex': function (subject) {
				try { new RegExp(subject); }
				catch(e) { return false; }
				return true;
			}
		};

	// aliases
	formats['host-name'] = formats.hostname;
	formats['ip-address'] = formats.ipv4;


	function getType(subject) {
		var type = typeof subject;

		if(type === 'object') {
			if(subject === null) return 'null';
			if(Array.isArray(subject)) return 'array';
		}

		if(type === 'number' && subject === Math.round(subject)) return 'integer';

		return type;
	}

	function format(context, subject, schema) {
		var fmt = schema.format,
			validator = formats[fmt];

		if(!validator)
			throw new Error('Invalid schema: unknown format (' + fmt + ')');

		var valid = validator.test ? validator.test(subject) : validator(subject);
		if(!valid) {
			context.addError('Failed "format" criteria (' + fmt + ')', subject, schema);
		}

		return valid;
	}

	function validateTypes(context, subject, type, validTypes) {
		var i = validTypes.length,
			validType, valid;
		while(i--) {
			validType = validTypes[i];

			if(validType === 'any') return true;

			if(typeof validType === 'object') {
				valid = context.silently(function() {
					return validateBase(context, subject, validType);
				}); // jshint ignore:line
				if(valid) return true;
				else continue;
			}

			if(!(validType in validators.types))
				throw new Error('Invalid schema: invalid type (' + validType + ')');

			if(validType === 'number' && type === 'integer') return true;

			if(type === validType) return true;
		}

		return false;
	}

	function allOf(context, subject, schema) {
		var schemas = schema.allOf;

		if(!Array.isArray(schemas))
			throw new Error('Invalid schema: "allOf" value must be an array');

		var i = schemas.length,
			invalidCount = 0;
		while(i--) {
			if(!validateBase(context, subject, schemas[i])) {
				invalidCount += 1;
			}
		}

		if(invalidCount === 0) return true;

		context.addError('Failed "allOf" criteria', subject, schemas);
		return false;
	}

	function anyOf(context, subject, schema) {
		var schemas = schema.anyOf;

		if(!Array.isArray(schemas))
			throw new Error('Invalid schema: "anyOf" value must be an array');

		var matched = context.silently(function() {
			var i = schemas.length;
			while(i--) {
				if(validateBase(context, subject, schemas[i])) return true;
			}
			return false;
		});

		if(matched) return true;

		context.addError('Failed "anyOf" criteria', subject, schemas);
		return false;
	}

	function oneOf(context, subject, schema) {
		var schemas = schema.oneOf;

		if(!Array.isArray(schemas))
			throw new Error('Invalid schema: "oneOf" value must be an array');

		var i = schemas.length,
			validCount = 0;
		context.silently(function() {
			while(i--) {
				if(validateBase(context, subject, schemas[i])) validCount += 1;
			}
		});

		if(validCount === 1) return true;

		context.addError('Failed "oneOf" criteria', subject, schemas);
		return false;
	}

	function not(context, subject, schema) {
		var badSchema = schema.not,
			valid = context.silently(function() {
				return !validateBase(context, subject, badSchema);
			});

		if(valid) return true;

		context.addError('Failed "not" criteria', subject, schema);
		return false;
	}

	function disallow(context, subject, schema, type) {
		var invalidTypes = Array.isArray(schema.disallow) ? schema.disallow : [ schema.disallow ],
			valid = !validateTypes(context, subject, type, invalidTypes);

		if(!valid) {
			context.addError('Failed "disallow" criteria: expecting ' + invalidTypes.join(' or ') + ', found ' + type, subject, schema);
		}

		return valid;
	}

	function validateExtends(context, subject, schema) {
		var schemas = Array.isArray(schema["extends"]) ? schema["extends"] : [ schema["extends"] ];

		var i = schemas.length,
			invalidCount = 0;
		while(i--) {
			if(!validateBase(context, subject, schemas[i])) {
				invalidCount += 1;
			}
		}

		return invalidCount === 0;
	}

	function validateEnum(context, subject, schema) {
		var values = schema['enum'];

		if(!Array.isArray(values))
			throw new Error('Invalid schema: "enum" value must be an array');

		var i = values.length;
		while(i--) {
			if(validators.deepEqual(subject, values[i])) return true;
		}

		context.addError('Failed "enum" criteria', subject, values);
		return false;
	}

	function validateType(context, subject, schema, type) {
		var validTypes = Array.isArray(schema.type) ? schema.type : [ schema.type ],
			valid = validateTypes(context, subject, type, validTypes);

		if(!valid) {
			context.addError('Failed "type" criteria: expecting ' + validTypes.join(' or ') + ', found ' + type, subject, schema);
		}

		return valid;
	}

	function typeValidations(context, subject, schema, type) {
		return validators.types[type](context, subject, schema);
	}

	function $ref(context, subject, schema) {
		var absolute = /^#|\//.test(schema.$ref),
			ref = absolute ? schema.$ref : context.id.join('') + schema.$ref,
			refSchema = context.refs.get(ref, context.schema),
			ctx = context;

		if(schema.$ref[0] !== '#') {
			ctx = context.subcontext(context.refs.get(ref, context.schema, true));
		}

		var valid = validateBase(ctx, subject, refSchema);

		context.cleanSubject = ctx.cleanSubject;

		return valid;
	}



	function validateBase(context, subject, schema) {
		if(schema.$ref) {
			return $ref(context, subject, schema);
		}

		if(schema.id) context.id.push(schema.id);

		var valid = context.runValidations([
			[ 'type' in schema, validateType ],
			[ 'disallow' in schema, disallow ],
			[ 'enum' in schema, validateEnum ],
			[ true, typeValidations ],
			[ 'format' in schema, format ],
			[ 'extends' in schema, validateExtends ],
			[ 'allOf' in schema, allOf ],
			[ 'anyOf' in schema, anyOf ],
			[ 'oneOf' in schema, oneOf ],
			[ 'not' in schema, not ]
		], subject, schema, getType(subject));

		if(schema.id) context.id.pop();

		return valid;
	}

	module.exports = validateBase;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _CommandNotInitializedError2 = __webpack_require__(10);

	var _CommandNotInitializedError3 = _interopRequireDefault(_CommandNotInitializedError2);

	exports.CommandNotInitializedError = _CommandNotInitializedError3['default'];

	var _NotImplementedError2 = __webpack_require__(11);

	var _NotImplementedError3 = _interopRequireDefault(_NotImplementedError2);

	exports.NotImplementedError = _NotImplementedError3['default'];

	var _NotUsedError2 = __webpack_require__(12);

	var _NotUsedError3 = _interopRequireDefault(_NotUsedError2);

	exports.NotUsedError = _NotUsedError3['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var jsonPointer = __webpack_require__(14);

	var protoJsonRefs = {
		add: function(uri, subject) {
			if(typeof uri !== 'string')
				throw new Error('Unable to add JSON Ref: uri must be of type "string"');

			if(~uri.indexOf('#'))
				throw new Error('Unable to add JSON Ref (' + uri + '): uri cannot include a fragment identifier (#)');

			this.__refs[uri] = subject;
			return this;
		},

		remove: function(uri) {
			delete this.__refs[uri];
			return this;
		},

		get: function(uri, subject, ignoreFragment) {
			if(typeof uri !== 'string')
				throw new Error('Unable to get JSON Ref: uri must be of type "string"');

			var parts = uri.split('#');

			if(parts.length > 2)
				throw new Error('Unable to get JSON Ref (' + uri + '): uri cannot contain multiple fragment identifiers (#)');

			if(parts[0])
				subject = this.__refs[parts[0]];

			if(!subject)
				throw new Error('Unable to locate JSON Ref (' + parts[0] + ')');

			if(parts.length === 1 || ignoreFragment)
				return subject;

			return jsonPointer(parts[1]).get(subject);
		}
	};

	module.exports = function() {
		return Object.create(protoJsonRefs, {
			__refs: { writable:false, configurable:false, enumerable:false, value: {} }
		});
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	function getType(subject) {
		var type = typeof subject;

		if(type === 'object') {
			if(subject === null) return 'null';
			if(Array.isArray(subject)) return 'array';
		}
		return type;
	}

	function arrayEqual(a, b) {
		var i = a.length;

		if(i !== b.length) return false;

		while(i--) {
			if(!deepEqual(a[i], b[i])) return false;
		}

		return true;
	}

	function objectEqual(a, b) {
		var keys = Object.keys(a),
			i = keys.length;

		if(i !== Object.keys(b).length) return false;

		while(i--) {
			if(!deepEqual(a[keys[i]], b[keys[i]])) return false;
		}

		return true;
	}

	var deepEqual = module.exports = function(a, b) {
		if(a === b) return true;

		var t = getType(a);

		if(t !== getType(b)) return false;

		if(t === 'array') return arrayEqual(a, b);
		if(t === 'object') return objectEqual(a, b);

		return false;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports.types = {
		'any': function() { return true; },
		'array': __webpack_require__(17),
		'boolean': __webpack_require__(18),
		'integer': __webpack_require__(7),
		'null': __webpack_require__(19),
		'number': __webpack_require__(7),
		'object': __webpack_require__(20),
		'string': __webpack_require__(21)
	};

	exports.deepEqual = __webpack_require__(5);

	// base cannot be required until other validators are added
	exports.base = __webpack_require__(2);


/***/ },
/* 7 */
/***/ function(module, exports) {

	function validateNumber(context, subject, schema) {
		if(typeof subject !== 'number') {
			context.addError('Failed type:number criteria', subject, schema);
			return false;
		}

		return true;
	}

	function validateInteger(context, subject, schema) {
		if(typeof subject !== 'number' || subject !== Math.round(subject)) {
			context.addError('Failed type:integer criteria', subject, schema);
			return false;
		}

		return true;
	}

	function minimum(context, subject, schema) {
		var valid = (schema.exclusiveMinimum) ? subject > schema.minimum : subject >= schema.minimum;

		if(!valid) context.addError('Failed "minimum" criteria', subject, schema);

		return valid;
	}

	function maximum(context, subject, schema) {
		var valid = (schema.exclusiveMaximum) ? subject < schema.maximum : subject <= schema.maximum;

		if(!valid) context.addError('Failed "maximum" criteria', subject, schema);

		return valid;
	}

	function multipleOf(context, subject, schema, key) {
		key = key || 'multipleOf';

		var valid = (subject / schema[key] % 1) === 0;

		if(!valid) context.addError('Failed "' + key + '" criteria', subject, schema);

		return valid;
	}

	function divisibleBy(context, subject, schema) {
		return multipleOf(context, subject, schema, 'divisibleBy');
	}



	module.exports = function(context, subject, schema) {
		var valid = true,
			isType = true;

		if(schema.type === 'number') isType = validateNumber(context, subject, schema);
		if(schema.type === 'integer') isType = validateInteger(context, subject, schema);

		context.cleanSubject = subject;

		return isType && context.runValidations([
			[ 'minimum' in schema, minimum ],
			[ 'maximum' in schema, maximum ],
			[ 'multipleOf' in schema, multipleOf ],
			[ 'divisibleBy' in schema, divisibleBy ]
		], subject, schema);
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _skeemas = __webpack_require__(13);

	var _skeemas2 = _interopRequireDefault(_skeemas);

	var _Outcome = __webpack_require__(9);

	var _Outcome2 = _interopRequireDefault(_Outcome);

	var _errors = __webpack_require__(3);

	var Command = (function () {
	  _createClass(Command, null, [{
	    key: 'execute',
	    value: function execute() {
	      throw new _errors.NotImplementedError();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      throw new _errors.CommandNotInitializedError();
	    }
	  }, {
	    key: 'runExplicit',
	    value: function runExplicit() {
	      throw new _errors.CommandNotInitializedError();
	    }
	  }, {
	    key: '_run',
	    value: function _run(Class) {
	      return function run(inputs) {
	        var validation = _skeemas2['default'].validate(inputs, Class.schema);
	        var result = validation.valid ? Class.execute(inputs) : null;
	        return new _Outcome2['default'](validation.valid, result, validation.errors, inputs);
	      };
	    }
	  }, {
	    key: '_runExplicit',
	    value: function _runExplicit(Class) {
	      return function runExplicit(inputs) {
	        var outcome = Class.run(inputs);

	        if (!outcome.success) throw new _errors.ValidationError(outcome.errors);

	        return outcome.result;
	      };
	    }
	  }, {
	    key: 'schema',
	    value: {},
	    enumerable: true
	  }]);

	  function Command() {
	    _classCallCheck(this, Command);

	    throw new _errors.NotUsedError();
	  }

	  return Command;
	})();

	exports['default'] = Command;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Outcome = function Outcome(success, result, errors, inputs) {
	  _classCallCheck(this, Outcome);

	  this.success = success;
	  this.result = result;
	  this.errors = errors;
	  this.inputs = inputs;

	  Object.freeze(this);
	};

	exports["default"] = Outcome;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(1);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	var CommandNotInitializedError = (function (_ExtendableError) {
	  _inherits(CommandNotInitializedError, _ExtendableError);

	  function CommandNotInitializedError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Command not initialized. Call `Cleanroom.initCommand(<Your Command>)` before running the command.' : arguments[0];

	    _classCallCheck(this, CommandNotInitializedError);

	    _get(Object.getPrototypeOf(CommandNotInitializedError.prototype), 'constructor', this).call(this, message);
	  }

	  return CommandNotInitializedError;
	})(_es6Error2['default']);

	exports['default'] = CommandNotInitializedError;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(1);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	var NotImplementedError = (function (_ExtendableError) {
	  _inherits(NotImplementedError, _ExtendableError);

	  function NotImplementedError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Not implemented' : arguments[0];

	    _classCallCheck(this, NotImplementedError);

	    _get(Object.getPrototypeOf(NotImplementedError.prototype), 'constructor', this).call(this, message);
	  }

	  return NotImplementedError;
	})(_es6Error2['default']);

	exports['default'] = NotImplementedError;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(1);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	var NotUsedError = (function (_ExtendableError) {
	  _inherits(NotUsedError, _ExtendableError);

	  function NotUsedError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Not used' : arguments[0];

	    _classCallCheck(this, NotUsedError);

	    _get(Object.getPrototypeOf(NotUsedError.prototype), 'constructor', this).call(this, message);
	  }

	  return NotUsedError;
	})(_es6Error2['default']);

	exports['default'] = NotUsedError;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var validators = __webpack_require__(6),
		validationContext = __webpack_require__(15),
		jsonRefs = __webpack_require__(4);

	var protoValidator = {
		addRef: function(uri, ref) {
			if(typeof uri === 'object') {
				ref = uri;
				uri = null;
			}
			uri = uri || ref.id;

			if(!uri) throw new Error('Cannot add a json schema reference without a uri/id.');

			this._refs.add(uri, ref);

			return this;
		},
		validate: function(instance, schema, options) {
			if(instance === undefined) throw new Error('Instance undefined in call to validate.');
			if(!schema) throw new Error('No schema specified in call to validate.');

			if(typeof schema === 'string') {
				var uri = schema;
				schema = this._refs.get(uri);

				if(!schema) throw new Error('Unable to locate schema (' + uri + '). Did you call addRef with this schema?');
			}

			var context = validationContext(schema, {
				instance: instance,
				refs: this._refs,
				breakOnError: options && options.breakOnError,
				cleanWithDefaults: options && options.cleanWithDefaults
			});
			validators.base(context, instance, schema);
			if(context.result.valid) context.result.cleanInstance = context.cleanSubject;
			return context.result;
		}
	};

	function makeValidator() {
		return Object.create(protoValidator, {
			_refs: { enumerable:false, writable:false, value:jsonRefs() }
		});
	}

	module.exports = makeValidator;

	module.exports.validate = function(instance, schema, options) {
		if(instance === undefined) throw new Error('Instance undefined in call to validate.');
		if(!schema) throw new Error('No schema specified in call to validate.');

		var context = validationContext(schema, {
			instance: instance,
			breakOnError: options && options.breakOnError,
			cleanWithDefaults: options && options.cleanWithDefaults
		});
		validators.base(context, instance, schema);
		if(context.result.valid) context.result.cleanInstance = context.cleanSubject;
		return context.result;
	};

	module.exports.use = function(plugin) {
		if(typeof plugin !== 'function') throw new Error('skeemas.use called with non-function. Plugins are in the form function(skeemas){}.');
		plugin(protoValidator);
		return this;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	function fastMap(array, fn) {
		var len = array.length,
			result = new Array(len);

		for(var i = 0; i < len; i++) result[i] = fn(array[i]);

		return result;
	}

	function decodeToken(ref) {
		return decodeURI(ref.replace(/~1/g, '/').replace(/~0/g, '~'));
	}

	function parse(strPointer) {
		if(typeof strPointer !== 'string')
			throw new Error('Invalid JSON Pointer: invalid type (' + (typeof strPointer) + ')');

		// Remove the leading hash if it exists
		var arrPointer = fastMap((strPointer[0] === '#' ? strPointer.substr(1) : strPointer).split('/'), decodeToken);

		if(arrPointer[0] !== '')
			throw new Error('Invalid JSON Pointer ("' + strPointer + '"): non-empty pointers must begin with "/" or "#/"');

		return arrPointer;
	}

	function get(arrPointer, subject) {
		for(var i = 1, len = arrPointer.length; i < len; i++) {
			subject = subject && subject[arrPointer[i]];
			if(subject === undefined) return;
		}
		return subject;
	}

	function set(arrPointer, subject, value) {
		for(var i = 1, len = arrPointer.length - 1; i < len; i++) {
			subject = (subject || undefined) && subject[arrPointer[i]];
			if(subject === undefined) return false;
		}

		if(typeof subject !== 'object') return false;

		var key = arrPointer[i];
		if(key === '-') {
			if(!Array.isArray(subject)) return false;
			subject[subject.length] = value;
			return true;
		}

		subject[key] = value;
		return true;
	}

	var protoPointer = {
		get: function(subject) {
			return get(this.__arrPointer, subject);
		},
		set: function(subject, value) {
			return set(this.__arrPointer, subject, value);
		}
	};

	module.exports = function(sPointer) {
		return Object.create(protoPointer, {
			__sPointer: { writable:false, configurable:false, enumerable:false, value: sPointer },
			__arrPointer: { writable:false, configurable:false, enumerable:false, value: parse(sPointer) }
		});
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var validationResult = __webpack_require__(16),
		jsonRefs = __webpack_require__(4);

	var protoContext = {
		addError: function(message, subject, criteria) {
			if(!this.silent) this.result.addError(message, subject, criteria, this);
			return this;
		},
		silently: function(fn) {
			this.silent = true;
			var result = fn();
			this.silent = false;
			return result;
		},
		subcontext: function(schema) {
			return makeContext(schema, this, this.silent);
		},
		runValidations: function(validations, subject, schema) {
			var breakOnError = this.breakOnError,
				args = Array.prototype.slice.call(arguments),
				valid = true,
				validation;

			args[0] = this;

			for(var i = 0, len = validations.length; i < len; i++) {
				validation = validations[i];
				if(!validation[0]) continue;
				valid = validation[1].apply(null, args) && valid;
				if(breakOnError && !valid) return false;
			}

			return valid;
		}
	};

	var makeContext = module.exports = function(schema, context, forceNewResult) {
		context = context || {};
		return Object.create(protoContext, {
			id: { enumerable:true, writable:false, value: [] },
			schema: { enumerable:true, writable:false, value: schema || context.schema },
			path: { enumerable:true, writable:false, value: context.path && context.path.slice() || ['#'] },
			result: { enumerable:true, writable:false, value: (!forceNewResult && context.result) || validationResult(context.instance) },
			refs: { enumerable:true, writable:false, value: context.refs || jsonRefs() },
			silent: { enumerable:true, writable:true, value: false },
			breakOnError: { enumerable:true, writable:true, value: context.breakOnError || false },
			cleanWithDefaults: { enumerable:true, writable:true, value: context.cleanWithDefaults || false },
			cleanSubject: { enumerable:true, writable:true, value: undefined }
		});
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	function errorToString() {
		return this.message + ' (pointer: ' + this.context + ')';
	}

	var protoValidationResult = {
		addError: function(message, subject, criteria, context) {
			this.errors.push({
				message: message,
				context: context.path.join('/'),
				value: subject,
				criteria: criteria,
				toString: errorToString
			});
			this.valid = false;
			return this;
		}
	};

	module.exports = function(instance) {
		return Object.create(protoValidationResult, {
			instance: { enumerable:true, writable:false, value:instance },
			cleanInstance: { enumerable:true, writable:true, value: undefined },
			valid: { enumerable:true, writable:true, value:true },
			errors: { enumerable:true, writable:false, value:[] }
		});
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var validateBase = __webpack_require__(2),
		deepEqual = __webpack_require__(5);

	function items(context, subject, schema, cleanItems) {
		var valid = true;

		if(Array.isArray(schema.items)) {
			valid = tupleItems(context, subject, schema, cleanItems);
			if('additionalItems' in schema) valid = additionalItems(context, subject, schema, cleanItems) && valid;
		} else if(schema.items) {
			valid = itemSchema(context, subject, schema, cleanItems);
		}

		return valid;
	}

	function itemSchema(context, subject, schema, cleanItems) {
		var items = schema.items;

		if(typeof items !== 'object')
			throw new Error('Invalid schema: invalid "items"');

		var lastPath = context.path.length;
		for(var i = 0, len = subject.length; i < len; i++) {
			context.path[lastPath] = i;
			if(!validateBase(context, subject[i], items)) {
				context.addError('Failed "items" criteria', subject, items);
				return false;
			}
			cleanItems.push(context.cleanSubject);
		}
		context.length = lastPath;

		return true;
	}

	function tupleItems(context, subject, schema, cleanItems) {
		var items = schema.items,
			lastPath = context.path.length;
		for(var i = 0, len = items.length; i < len; i++) {
			context.path[lastPath] = i;
			if(!validateBase(context, subject[i], items[i])) {
				context.addError('Failed "items" criteria', subject, items);
				return false;
			}
			cleanItems.push(context.cleanSubject);
		}
		context.length = lastPath;

		return true;
	}

	function additionalItems(context, subject, schema, cleanItems) {
		var i = schema.items.length,
			len = subject.length,
			additionalItemSchema = schema.additionalItems;

		if(additionalItemSchema === false) {
			if(len <= i) return true;

			context.addError('Failed "additionalItems" criteria: no additional items are allowed', subject, schema);
			return false;
		}

		if(typeof additionalItemSchema !== 'object')
			throw new Error('Invalid schema: invalid "additionalItems"');

		var lastPath = context.path.length;
		for(; i < len; i++) {
			context.path[lastPath] = i;
			if(!validateBase(context, subject[i], additionalItemSchema)) {
				context.addError('Failed "additionalItems" criteria', subject, schema);
				return false;
			}
			cleanItems.push(context.cleanSubject);
		}
		context.length = lastPath;

		return true;
	}

	function minItems(context, subject, schema) {
		if(subject.length < schema.minItems) {
			context.addError('Failed "minItems" criteria', subject, schema);
			return false;
		}

		return true;
	}

	function maxItems(context, subject, schema) {
		if(subject.length > schema.maxItems) {
			context.addError('Failed "maxItems" criteria', subject, schema);
			return false;
		}

		return true;
	}

	function uniqueItems(context, subject, schema) {
		var i = subject.length, j;

		while(i--) {
			j = i;
			while(j--) {
				if(deepEqual(subject[i], subject[j])) {
					context.addError('Failed "uniqueItems" criteria', subject, schema);
					return false;
				}
			}
		}

		return true;
	}


	module.exports = function(context, subject, schema) {
		if(!Array.isArray(subject)) {
			context.addError('Failed type:array criteria', schema);
			return false;
		}

		var cleanItems = [],
			valid = context.runValidations([
				[ 'minItems' in schema, minItems ],
				[ 'maxItems' in schema, maxItems ],
				[ 'uniqueItems' in schema, uniqueItems ],
				[ 'items' in schema, items ]
			], subject, schema, cleanItems);

		if('items' in schema)
			context.cleanSubject = cleanItems;
		else
			context.cleanSubject = subject.slice();

		return valid;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	function validateBoolean(context, subject, schema) {
		if(typeof subject !== 'boolean') {
			context.addError('Failed type:boolean criteria', subject, schema);
			return false;
		}

		context.cleanSubject = subject;

		return true;
	}

	module.exports = validateBoolean;


/***/ },
/* 19 */
/***/ function(module, exports) {

	function validateNull(context, subject, schema) {
		if(subject !== null) {
			context.addError('Failed type:null criteria', subject, schema);
			return false;
		}

		context.cleanSubject = subject;

		return true;
	}

	module.exports = validateNull;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var validateBase = __webpack_require__(2);

	function properties(context, subject, schema, handledProps) {
		var props = schema.properties,
			valid = true;
		for(var key in props) {
			if(key in subject) {
				context.path.push(key);
				valid = validateBase(context, subject[key], props[key]) && valid;
				context.path.pop();
				handledProps[key] = context.cleanSubject;
			} else if(props[key].required === true) {
				context.addError('Failed "required" criteria: missing property (' + key + ')', subject, props);
				valid = false;
			}
		}

		return valid;
	}

	function patternProperties(context, subject, schema, handledProps) {
		var patternProps = schema.patternProperties;

		if(typeof patternProps !== 'object')
			throw new Error('Invalid schema: "patternProperties" must be an object');

		var valid = true,
			patterns = Object.keys(patternProps),
			len = patterns.length,
			keys = Object.keys(subject),
			i = keys.length,
			j, key;

		while(i--) {
			key = keys[i];

			j = len;
			while(j--) {
				if(key.match(patterns[j])) {
					context.path.push(key);
					valid = validateBase(context, subject[key], patternProps[patterns[j]]) && valid;
					context.path.pop();
					if(!(key in handledProps)) handledProps[key] = context.cleanSubject;
				}
			}
		}

		return valid;
	}

	function additionalProperties(context, subject, schema, handledProps) {
		var additionalProps = schema.additionalProperties;

		if(additionalProps === true) return true;

		var keys = Object.keys(subject),
			i = keys.length;
		if(additionalProps === false) {
			while(i--) {
				if(!(keys[i] in handledProps)) {
					context.addError('Failed "additionalProperties" criteria: unexpected property (' + keys[i] + ')', subject, schema);
					return false;
				}
			}
			return true;
		}

		if(typeof additionalProps !== 'object')
			throw new Error('Invalid schema: "additionalProperties" must be a valid schema');

		var valid;
		while(i--) {
			if(keys[i] in handledProps) continue;

			context.path.push(keys[i]);
			valid = validateBase(context, subject[keys[i]], additionalProps) && valid;
			context.path.pop();
			handledProps[keys[i]] = context.cleanSubject;
		}

		return valid;
	}

	function minProperties(context, subject, schema) {
		var keys = Object.keys(subject);
		if(keys.length < schema.minProperties) {
			context.addError('Failed "minProperties" criteria', subject, schema);
			return false;
		}
		return true;
	}

	function maxProperties(context, subject, schema) {
		var keys = Object.keys(subject);
		if(keys.length > schema.maxProperties) {
			context.addError('Failed "maxProperties" criteria', subject, schema);
			return false;
		}
		return true;
	}

	function required(context, subject, schema) {
		var requiredProps = schema.required;

		if(!Array.isArray(requiredProps))
			throw new Error('Invalid schema: "required" must be an array');

		var valid = true,
			i = requiredProps.length;
		while(i--) {
			if(!(requiredProps[i] in subject)) {
				context.addError('Missing required property "' + requiredProps[i] + '"', subject, requiredProps[i]);
				valid = false;
			}
		}

		return valid;
	}

	function dependencies(context, subject, schema) {
		var deps = schema.dependencies;

		if(typeof deps !== 'object')
			throw new Error('Invalid schema: "dependencies" must be an object');

		var valid = true,
			keys = Object.keys(deps),
			i = keys.length,
			requiredProps, j;

		while(i--) {
			if(!(keys[i] in subject)) continue;

			requiredProps = deps[keys[i]];

			if(typeof requiredProps === 'string') requiredProps = [ requiredProps ];

			if(Array.isArray(requiredProps)) {
				j = requiredProps.length;
				while(j--) {
					if(!(requiredProps[j] in subject)) {
						context.addError('Missing required property "' + requiredProps[j] + '"', subject, requiredProps[j]);
						valid = false;
					}
				}
			} else if(typeof requiredProps === 'object') {
				valid = validateBase(context, subject, requiredProps) && valid;
			} else {
				throw new Error('Invalid schema: dependencies must be string, array, or object');
			}
		}

		return valid;
	}

	function addDefaults(subject, schema) {
		var props = schema.properties;

		if(!props) return;

		for(var key in props) {
			if('default' in props[key] && !(key in subject)) {
				subject[key] = props[key].default;
			}
		}
	}


	function validateObject(context, subject, schema) {
		if(typeof subject !== 'object') {
			context.addError('Failed type:object criteria', subject, schema);
			return false;
		}

		var handledProps = {},
			valid = context.runValidations([
				[ 'properties' in schema, properties ],
				[ 'patternProperties' in schema, patternProperties ],
				[ 'additionalProperties' in schema, additionalProperties ],
				[ 'minProperties' in schema, minProperties ],
				[ 'maxProperties' in schema, maxProperties ],
				[ Array.isArray(schema.required), required ],
				[ 'dependencies' in schema, dependencies ]
			], subject, schema, handledProps);

		if(context.cleanWithDefaults) addDefaults(handledProps, schema);

		context.cleanSubject = handledProps;

		return valid;
	}

	module.exports = validateObject;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var decode = __webpack_require__(22).ucs2.decode;


	function minLength(context, subject, schema) {
		if(decode(subject).length < schema.minLength) {
			context.addError('Failed "minLength" criteria', subject, schema);
			return false;
		}

		return true;
	}

	function maxLength(context, subject, schema) {
		if(decode(subject).length > schema.maxLength) {
			context.addError('Failed "maxLength" criteria', subject, schema);
			return false;
		}

		return true;
	}

	function pattern(context, subject, schema) {
		var strPattern = schema.pattern;

		if(!subject.match(strPattern)) {
			context.addError('Failed "pattern" criteria (' + strPattern + ')', subject, strPattern);
			return false;
		}

		return true;
	}



	function validateString(context, subject, schema) {
		if(typeof subject !== 'string') {
			context.addError('Failed type:string criteria', schema);
			return false;
		}

		context.cleanSubject = subject;

		return context.runValidations([
			[ 'minLength' in schema, minLength ],
			[ 'maxLength' in schema, maxLength ],
			[ 'pattern' in schema, pattern ]
		], subject, schema);
	}

	module.exports = validateString;


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("punycode");

/***/ }
/******/ ])
});
;