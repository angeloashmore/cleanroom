(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("url"));
	else if(typeof define === 'function' && define.amd)
		define(["url"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("url")) : factory(root["url"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_47__) {
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

	var _cleanroomCommand = __webpack_require__(39);

	var _cleanroomCommand2 = _interopRequireDefault(_cleanroomCommand);

	var _cleanroomErrors = __webpack_require__(7);

	var Cleanroom = (function () {
	  _createClass(Cleanroom, null, [{
	    key: 'initCommand',
	    value: function initCommand(Class) {
	      Class.run = Class._run(Class);
	      Class.runExplicitly = Class._runExplicitly(Class);
	      Class.runPromise = Class._runPromise(Class);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = {
	  copy: copy,
	  checkDataType: checkDataType,
	  checkDataTypes: checkDataTypes,
	  toHash: toHash,
	  getProperty: getProperty,
	  escapeQuotes: escapeQuotes,
	  escapeRegExp: escapeRegExp,
	  ucs2length: ucs2length,
	  varOccurences: varOccurences,
	  varReplace: varReplace,
	  cleanUpCode: cleanUpCode,
	  cleanUpVarErrors: cleanUpVarErrors,
	  schemaHasRules: schemaHasRules,
	  stableStringify: __webpack_require__(6)
	};


	function copy(o, to) {
	  to = to || {};
	  for (var key in o) to[key] = o[key];
	  return to;
	}


	function checkDataType(dataType, data, negate) {
	  var EQUAL = negate ? ' !== ' : ' === '
	    , AND = negate ? ' || ' : ' && '
	    , OK = negate ? '!' : ''
	    , NOT = negate ? '' : '!';
	  switch (dataType) {
	    case 'null': return data + EQUAL + 'null';
	    case 'array': return OK + 'Array.isArray(' + data + ')';
	    case 'object': return '(' + OK + data + AND + 
	                          'typeof ' + data + EQUAL + '"object"' + AND + 
	                          NOT + 'Array.isArray(' + data + '))';
	    case 'integer': return '(typeof ' + data + EQUAL + '"number"' + AND + 
	                           NOT + '(' + data + ' % 1))'
	    default: return 'typeof ' + data + EQUAL + '"' + dataType + '"';
	  }
	}


	function checkDataTypes(dataTypes, data, negate) {
	  var EQUAL = negate ? ' !== ' : ' === '
	    , AND = negate ? ' || ' : ' && '
	    , OR = negate ? ' && ' : ' || '
	    , OK = negate ? '!' : '';
	  switch (dataTypes.length) {
	    case 0: return negate ? 'true' : 'false';
	    case 1: return checkDataType(dataTypes[0], data, negate);
	    default:
	      var code = ''
	      var types = toHash(dataTypes);
	      if (types.array && types.object) {
	        code = types.null ? '(': '(' + OK + data + AND
	        code += 'typeof ' + data + EQUAL + '"object")';
	        delete types.null;
	        delete types.array;
	        delete types.object;
	      }
	      if (types.number) delete types.integer;
	      for (var t in types)
	        code += (code ? OR : '' ) + checkDataType(t, data, negate);

	      return code;
	  }
	}


	function toHash(arr, func) {
	  var hash = {};
	  arr.forEach(function (item) {
	    if (func) item = func(item);
	    hash[item] = true;
	  });
	  return hash;
	}


	var IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var SINGLE_QUOTE = /('|\\)/g;
	function getProperty(key) {
	  return IDENTIFIER.test(key)
	          ? '.' + key
	          : "['" + key.replace(SINGLE_QUOTE, "\\$1") + "']";
	}


	function escapeQuotes(str) {
	  return str.replace(SINGLE_QUOTE, "\\$1");
	}


	var ESCAPE_REGEXP = /[\/]/g
	function escapeRegExp(str) {
	  return str.replace(ESCAPE_REGEXP, '\\$&');
	}


	// https://mathiasbynens.be/notes/javascript-encoding
	// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
	function ucs2length(str) {
	  var length = 0
	    , len = str.length
	    , pos = 0
	    , value;
	  while (pos < len) {
	    length++;
	    value = str.charCodeAt(pos++);
	    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
	      // high surrogate, and there is a next character
	      value = str.charCodeAt(pos);
	      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
	    }
	  }
	  return length;
	}


	function varOccurences(str, dataVar) {
	  dataVar += '[^0-9]';
	  var matches = str.match(new RegExp(dataVar, 'g'));
	  return matches ? matches.length : 0;
	}


	function varReplace(str, dataVar, expr) {
	  dataVar += '([^0-9])';
	  return str.replace(new RegExp(dataVar, 'g'), expr + '$1')
	}


	var EMPTY_ELSE = /else\s*{\s*}/g
	  , EMPTY_IF_NO_ELSE = /if\s*\([^)]+\)\s*\{\s*\}(?!\s*else)/g
	  , EMPTY_IF_WITH_ELSE = /if\s*\(([^)]+)\)\s*\{\s*\}\s*else(?!\s*if)/g;
	function cleanUpCode(out) {
	  return out.replace(EMPTY_ELSE, '')
	            .replace(EMPTY_IF_NO_ELSE, '')
	            .replace(EMPTY_IF_WITH_ELSE, 'if (!($1))');
	}


	var ERRORS_REGEXP = /[^\.]errors/g
	  , VAR_ERRORS = 'var errors = 0;'
	  , INITIALIZE_ERRORS = 'validate.errors = null;'
	  , RETURN_ERRORS = 'return errors === 0;'
	function cleanUpVarErrors(out) {
	  var matches = out.match(ERRORS_REGEXP);
	  if (matches && matches.length === 2)
	    return out.replace(VAR_ERRORS, '')
	              .replace(INITIALIZE_ERRORS, '')
	              .replace(RETURN_ERRORS, INITIALIZE_ERRORS + ' return true;');
	  else
	    return out;
	}


	function schemaHasRules(schema, rules) {
	  for (var key in schema) if (rules[key]) return true;
	}


/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function equal(a, b) {
	  if (a === b) return true;

	  var arrA = Array.isArray(a)
	    , arrB = Array.isArray(b);

	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (var i = 0; i < a.length; i++)
	      if (!equal(a[i], b[i])) return false;
	    return true;
	  }

	  if (arrA != arrB) return false;

	  if (a && b && typeof a === 'object' && typeof b === 'object') {
	    var keys = Object.keys(a);
	    if (!equal(keys, Object.keys(b))) return false;
	    for (var i = 0; i < keys.length; i++)
	      if (!equal(a[keys[i]], b[keys[i]])) return false;
	    return true;
	  }

	  return false;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var url = __webpack_require__(47)
	  , equal = __webpack_require__(3)
	  , util = __webpack_require__(1);

	module.exports = resolve;

	resolve.normalizeId = normalizeId;
	resolve.fullPath = getFullPath;
	resolve.url = resolveUrl;
	resolve.ids = resolveIds;


	function resolve(compile, root, ref) {
	  var refVal = this._refs[ref];
	  if (typeof refVal == 'string') {
	    if (this._refs[refVal]) refVal = this._refs[refVal];
	    else return resolve.call(this, compile, root, refVal);
	  }
	  var refVal = refVal || this._schemas[ref];
	  if (typeof refVal == 'function') return refVal;
	  var res = _resolve.call(this, root, ref);
	  if (res) {
	    var schema = res.schema;
	    root = res.root;
	  }
	  var v;
	  if (typeof schema == 'function') v = schema;
	  else if (schema) v = compile.call(this, schema, root);
	  if (v && ref[0] != '#') this._refs[ref] = v;
	  return v;
	};


	function _resolve(root, ref) {
	  var p = url.parse(ref, false, true)
	    , refPath = _getFullPath(p)
	    , baseId = getFullPath(root.schema.id);
	  if (refPath !== baseId) {
	    var id = normalizeId(refPath);
	    var refVal = this._refs[id];
	    if (typeof refVal == 'string') refVal = this._refs[refVal];
	    if (typeof refVal == 'function') root = refVal;
	    else {
	      var refVal = this._schemas[id];
	      if (typeof refVal == 'function') {
	        if (id == normalizeId(ref)) return { schema: refVal, root: root };
	        root = refVal;
	      }
	    }
	    if (!root.schema) return;
	    baseId = getFullPath(root.schema.id);
	  }
	  return getJsonPointer.call(this, p, baseId, root);
	}


	function getJsonPointer(parsedRef, baseId, root) {
	  parsedRef.hash = parsedRef.hash || '';
	  if (parsedRef.hash.slice(0,2) != '#/') return;
	  var parts = parsedRef.hash.split('/');
	  var schema = root.schema;

	  for (var i = 1; i < parts.length; i++) {
	    var part = parts[i];
	    if (part) {
	      part = unescapeFragment(part);
	      schema = schema[part];
	      if (!schema) break;
	      if (schema.id) baseId = resolveUrl(baseId, schema.id);
	      if (schema.$ref) {
	        var $ref = resolveUrl(baseId, schema.$ref);
	        var res = _resolve.call(this, root, $ref);
	        if (res) {
	          schema = res.schema;
	          root = res.root;
	        }
	      }
	    }
	  }
	  if (schema && schema != root.schema) return { schema: schema, root: root };
	}


	function unescapeFragment(str) {
	  return decodeURIComponent(str)
	          .replace(/~1/g, '/')
	          .replace(/~0/g, '~');
	}


	function escapeFragment(str) {
	  var str = str.replace(/~/g, '~0').replace(/\//g, '~1');
	  return encodeURIComponent(str);
	}


	function getFullPath(id, normalize) {
	  if (normalize !== false) id = normalizeId(id);
	  var p = url.parse(id, false, true);
	  return _getFullPath(p);
	}


	function _getFullPath(p) {
	  return (p.protocol||'') + (p.protocol?'//':'') + (p.host||'') + (p.path||'')  + '#';
	}


	var TRAILING_SLASH_HASH = /#\/?$/;
	function normalizeId(id) {
	    return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
	}


	function resolveUrl(baseId, id) {
	  id = normalizeId(id);
	  return url.resolve(baseId, id);
	}


	function resolveIds(schema) {
	  var id = normalizeId(schema.id);
	  var localRefs = {};
	  _resolveIds.call(this, schema, getFullPath(id, false), id);
	  return localRefs;

	  function _resolveIds(schema, fullPath, baseId) {
	    if (Array.isArray(schema))
	      for (var i=0; i<schema.length; i++)
	        _resolveIds.call(this, schema[i], fullPath+'/'+i, baseId);
	    else if (schema && typeof schema == 'object') {
	      if (typeof schema.id == 'string') {
	        var id = baseId = baseId
	                          ? url.resolve(baseId, schema.id)
	                          : normalizeId(schema.id);

	        var refVal = this._refs[id];
	        if (typeof refVal == 'string') refVal = this._refs[refVal];
	        if (refVal && refVal.schema) {
	          if (!equal(schema, refVal.schema))
	            throw new Error('id "' + id + '" resolves to more than one schema');
	        } else if (id != normalizeId(fullPath)) {
	          if (id[0] == '#') {
	            if (localRefs[id] && !equal(schema, localRefs[id]))
	              throw new Error('id "' + id + '" resolves to more than one schema');
	            localRefs[id] = schema;
	          } else
	            this._refs[id] = fullPath;
	        }
	      }
	      for (var key in schema)
	        _resolveIds.call(this, schema[key], fullPath+'/'+escapeFragment(key), baseId);
	    }
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = '';
	  if (it.isTop) {
	    var $top = it.isTop,
	      $lvl = it.level = 0,
	      $dataLvl = it.dataLevel = 0,
	      $data = 'data';
	    it.rootId = it.baseId = it.resolve.fullPath(it.root.schema.id);
	    delete it.isTop;
	    it.wasTop = true;
	    out += ' validate = function (data, dataPath) { \'use strict\'; validate.errors = null;';
	    out += ' var errors = 0;        ';
	  } else {
	    if (it.opts._debug) {
	      out += ' console.log(\'validate dataPath:\', dataPath); ';
	    }
	    var $lvl = it.level,
	      $dataLvl = it.dataLevel,
	      $data = 'data' + ($dataLvl || '');
	    if (it.schema.id) it.baseId = it.resolve.url(it.baseId, it.schema.id);
	    delete it.wasTop;
	    out += ' var errs_' + ($lvl) + ' = errors;';
	  }
	  var $valid = 'valid' + $lvl,
	    $breakOnError = !it.opts.allErrors,
	    $closingBraces1 = '',
	    $closingBraces2 = '';
	  var $typeSchema = it.schema.type;
	  var arr1 = it.RULES;
	  if (arr1) {
	    var $rulesGroup, i1 = -1,
	      l1 = arr1.length - 1;
	    while (i1 < l1) {
	      $rulesGroup = arr1[i1 += 1];
	      if ($shouldUseGroup($rulesGroup)) {
	        if ($rulesGroup.type) {
	          out += ' if (' + (it.util.checkDataType($rulesGroup.type, $data)) + ') { ';
	        }
	        var arr2 = $rulesGroup.rules;
	        if (arr2) {
	          var $rule, i2 = -1,
	            l2 = arr2.length - 1;
	          while (i2 < l2) {
	            $rule = arr2[i2 += 1];
	            if ($shouldUseRule($rule)) {
	              out += ' ' + ($rule.code(it)) + ' ';
	              if ($breakOnError) {
	                $closingBraces1 += '}';
	              }
	            }
	          }
	        }
	        if ($breakOnError) {
	          out += ' ' + ($closingBraces1) + ' ';
	          $closingBraces1 = '';
	        }
	        if ($rulesGroup.type) {
	          out += ' } ';
	          if ($typeSchema && $typeSchema === $rulesGroup.type) {
	            var $typeChecked = true;
	            out += ' else {  ';
	            if (it.wasTop && $breakOnError) {
	              out += ' validate.errors = [ { keyword: \'' + ('type') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ';
	              if ($isArray) {
	                out += '' + ($typeSchema.join(","));
	              } else {
	                out += '' + ($typeSchema);
	              }
	              out += '\' ';
	              if (it.opts.verbose) {
	                out += ', schema: ';
	                if ($isArray) {
	                  out += 'validate.schema' + ($schemaPath);
	                } else {
	                  out += '\'' + ($typeSchema) + '\'';
	                }
	                out += ', data: ' + ($data);
	              }
	              out += ' }]; return false; ';
	            } else {
	              out += '  var err =   { keyword: \'' + ('type') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ';
	              if ($isArray) {
	                out += '' + ($typeSchema.join(","));
	              } else {
	                out += '' + ($typeSchema);
	              }
	              out += '\' ';
	              if (it.opts.verbose) {
	                out += ', schema: ';
	                if ($isArray) {
	                  out += 'validate.schema' + ($schemaPath);
	                } else {
	                  out += '\'' + ($typeSchema) + '\'';
	                }
	                out += ', data: ' + ($data);
	              }
	              out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	            }
	            out += ' } ';
	          }
	        }
	        if ($breakOnError) {
	          out += ' if (errors === ';
	          if ($top) {
	            out += '0';
	          } else {
	            out += 'errs_' + ($lvl);
	          }
	          out += ') { ';
	          $closingBraces2 += '}';
	        }
	      }
	    }
	  }
	  if ($typeSchema && !$typeChecked) {
	    var $schemaPath = it.schemaPath + '.type',
	      $isArray = Array.isArray($typeSchema),
	      $method = $isArray ? 'checkDataTypes' : 'checkDataType';
	    out += ' if (' + (it.util[$method]($typeSchema, $data, true)) + ') {  ';
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('type') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ';
	      if ($isArray) {
	        out += '' + ($typeSchema.join(","));
	      } else {
	        out += '' + ($typeSchema);
	      }
	      out += '\' ';
	      if (it.opts.verbose) {
	        out += ', schema: ';
	        if ($isArray) {
	          out += 'validate.schema' + ($schemaPath);
	        } else {
	          out += '\'' + ($typeSchema) + '\'';
	        }
	        out += ', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('type') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ';
	      if ($isArray) {
	        out += '' + ($typeSchema.join(","));
	      } else {
	        out += '' + ($typeSchema);
	      }
	      out += '\' ';
	      if (it.opts.verbose) {
	        out += ', schema: ';
	        if ($isArray) {
	          out += 'validate.schema' + ($schemaPath);
	        } else {
	          out += '\'' + ($typeSchema) + '\'';
	        }
	        out += ', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    out += ' }';
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces2) + ' ';
	  }
	  if ($top) {
	    out += ' return errors === 0;';
	    out += ' }';
	  } else {
	    out += ' var ' + ($valid) + ' = errors === errs_' + ($lvl) + ';';
	  }
	  out = it.util.cleanUpCode(out);
	  if ($top && $breakOnError) {
	    out = it.util.cleanUpVarErrors(out);
	  }

	  function $shouldUseGroup($rulesGroup) {
	    return $rulesGroup.rules.some(function($rule) {
	      return $shouldUseRule($rule);
	    });
	  }

	  function $shouldUseRule($rule) {
	    return it.schema[$rule.keyword] !== undefined || ($rule.keyword == 'properties' && (it.schema.additionalProperties !== undefined || (it.schema.patternProperties && Object.keys(it.schema.patternProperties).length)));
	  }
	  return out;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var json = typeof JSON !== 'undefined' ? JSON : __webpack_require__(36);

	module.exports = function (obj, opts) {
	    if (!opts) opts = {};
	    if (typeof opts === 'function') opts = { cmp: opts };
	    var space = opts.space || '';
	    if (typeof space === 'number') space = Array(space+1).join(' ');
	    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
	    var replacer = opts.replacer || function(key, value) { return value; };

	    var cmp = opts.cmp && (function (f) {
	        return function (node) {
	            return function (a, b) {
	                var aobj = { key: a, value: node[a] };
	                var bobj = { key: b, value: node[b] };
	                return f(aobj, bobj);
	            };
	        };
	    })(opts.cmp);

	    var seen = [];
	    return (function stringify (parent, key, node, level) {
	        var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
	        var colonSeparator = space ? ': ' : ':';

	        if (node && node.toJSON && typeof node.toJSON === 'function') {
	            node = node.toJSON();
	        }

	        node = replacer.call(parent, key, node);

	        if (node === undefined) {
	            return;
	        }
	        if (typeof node !== 'object' || node === null) {
	            return json.stringify(node);
	        }
	        if (isArray(node)) {
	            var out = [];
	            for (var i = 0; i < node.length; i++) {
	                var item = stringify(node, i, node[i], level+1) || json.stringify(null);
	                out.push(indent + space + item);
	            }
	            return '[' + out.join(',') + indent + ']';
	        }
	        else {
	            if (seen.indexOf(node) !== -1) {
	                if (cycles) return json.stringify('__cycle__');
	                throw new TypeError('Converting circular structure to JSON');
	            }
	            else seen.push(node);

	            var keys = objectKeys(node).sort(cmp && cmp(node));
	            var out = [];
	            for (var i = 0; i < keys.length; i++) {
	                var key = keys[i];
	                var value = stringify(node, key, node[key], level+1);

	                if(!value) continue;

	                var keyValue = json.stringify(key)
	                    + colonSeparator
	                    + value;
	                ;
	                out.push(indent + space + keyValue);
	            }
	            return '{' + out.join(',') + indent + '}';
	        }
	    })({ '': obj }, '', obj, 0);
	};

	var isArray = Array.isArray || function (x) {
	    return {}.toString.call(x) === '[object Array]';
	};

	var objectKeys = Object.keys || function (obj) {
	    var has = Object.prototype.hasOwnProperty || function () { return true };
	    var keys = [];
	    for (var key in obj) {
	        if (has.call(obj, key)) keys.push(key);
	    }
	    return keys;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _CommandNotInitializedError2 = __webpack_require__(42);

	var _CommandNotInitializedError3 = _interopRequireDefault(_CommandNotInitializedError2);

	exports.CommandNotInitializedError = _CommandNotInitializedError3['default'];

	var _NotImplementedError2 = __webpack_require__(43);

	var _NotImplementedError3 = _interopRequireDefault(_NotImplementedError2);

	exports.NotImplementedError = _NotImplementedError3['default'];

	var _NotUsedError2 = __webpack_require__(44);

	var _NotUsedError3 = _interopRequireDefault(_NotUsedError2);

	exports.NotUsedError = _NotUsedError3['default'];

	var _ValidationError2 = __webpack_require__(45);

	var _ValidationError3 = _interopRequireDefault(_ValidationError2);

	exports.ValidationError = _ValidationError3['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var compileSchema = __webpack_require__(12)
	    , resolve = __webpack_require__(4)
	    , Cache = __webpack_require__(9)
	    , stableStringify = __webpack_require__(6)
	    , formats = __webpack_require__(11)
	    , util = __webpack_require__(1);

	module.exports = Ajv;

	var META_SCHEMA_ID = 'http://json-schema.org/draft-04/schema';
	var SCHEMA_URI_FORMAT = /^(?:(?:[a-z][a-z0-9+-.]*:)?\/\/)?[^\s]*$/i;
	function SCHEMA_URI_FORMAT_FUNC(str) {
	    return SCHEMA_URI_FORMAT.test(str);
	}

	/**
	 * Creates validator instance.
	 * Usage: `Ajv(opts)`
	 * @param {Object} opts optional options
	 * @return {Object} ajv instance
	 */
	function Ajv(opts) {
	    if (!(this instanceof Ajv)) return new Ajv(opts);
	    var self = this;

	    this.opts = opts || {};
	    this._schemas = {};
	    this._refs = {};
	    this._formats = formats(this.opts.format);
	    this._cache = this.opts.cache || new Cache;

	    // this is done on purpose, so that methods are bound to the instance
	    // (without using bind) so that they can be used without the instance
	    this.validate = validate;
	    this.compile = compile;
	    this.addSchema = addSchema;
	    this.addMetaSchema = addMetaSchema;
	    this.validateSchema = validateSchema;
	    this.getSchema = getSchema;
	    this.removeSchema = removeSchema;
	    this.addFormat = addFormat;
	    this.errorsText = errorsText;

	    addInitialSchemas();
	    addInitialFormats();


	    /**
	     * Validate data using schema
	     * Schema will be compiled and cached (using serialized JSON as key. [json-stable-stringify](https://github.com/substack/json-stable-stringify) is used to serialize.
	     * @param  {String|Object} schemaKeyRef key, ref or schema object
	     * @param  {Any} data to be validated
	     * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
	     */
	    function validate(schemaKeyRef, data) {
	        var v;
	        if (typeof schemaKeyRef == 'string') {
	            v = getSchema(schemaKeyRef);
	            if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
	        } else v = _addSchema(schemaKeyRef);

	        var valid = v(data);
	        self.errors = v.errors;
	        return valid;
	    }


	    /**
	     * Create validator for passed schema.
	     * @param  {String|Object} schema
	     * @return {Object} validation result { valid: true/false, errors: [...] }
	     */
	    function compile(schema) {
	        return _addSchema(schema);
	    }


	    /**
	     * Adds schema to the instance.
	     * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` will be ignored.
	     * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
	     */
	    function addSchema(schema, key, _skipValidation) {
	        if (Array.isArray(schema)) {
	            schema.forEach(function(sch) { addSchema(sch); });
	            return;
	        }
	        // can key/id have # inside?
	        var key = resolve.normalizeId(key || schema.id);
	        checkUnique(key);
	        self._schemas[key] = _addSchema(schema, _skipValidation);
	    }


	    /**
	     * Add schema that will be used to validate other schemas
	     * removeAdditional option is alway set to false
	     * @param {Object} schema
	     * @param {String} key optional schema key
	     */
	    function addMetaSchema(schema, key, _skipValidation) {
	        var currentRemoveAdditional = self.opts.removeAdditional;
	        self.opts.removeAdditional = false;
	        var validate = addSchema(schema, META_SCHEMA_ID, _skipValidation);
	        self.opts.removeAdditional = currentRemoveAdditional;
	    }


	    /**
	     * Validate schema
	     * @param  {Object} schema schema to validate
	     * @return {Boolean}
	     */
	    function validateSchema(schema) {
	        var $schema = schema.$schema || META_SCHEMA_ID;
	        var currentUriFormat = self._formats.uri;
	        self._formats.uri = typeof currentUriFormat == 'function'
	                            ? SCHEMA_URI_FORMAT_FUNC
	                            : SCHEMA_URI_FORMAT;
	        var valid = validate($schema, schema);
	        self._formats.uri = currentUriFormat;
	        return valid;
	    }


	    /**
	     * Get compiled schema from the instance by `key` or `ref`.
	     * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
	     * @return {Function} schema validating function (with property `schema`).
	     */
	    function getSchema(keyRef) {
	        keyRef = resolve.normalizeId(keyRef);
	        return self._schemas[keyRef] || self._refs[keyRef];
	    }


	    /**
	     * Remove cached schema
	     * Even if schema is referenced by other schemas it still can be removed as other schemas have local references
	     * @param  {String|Object} schemaKeyRef key, ref or schema object
	     */
	    function removeSchema(schemaKeyRef) {
	        if (typeof schemaKeyRef == 'string') {
	            schemaKeyRef = resolve.normalizeId(schemaKeyRef);
	            var v = self._schemas[schemaKeyRef] || self._refs[schemaKeyRef];
	            delete self._schemas[schemaKeyRef];
	            delete self._refs[schemaKeyRef];
	            var str = stableStringify(v.schema);
	            self._cache.put(str);
	        } else {
	            var str = stableStringify(schemaKeyRef);
	            self._cache.put(str);
	        }
	    }


	    function _addSchema(schema, skipValidation) {
	        if (typeof schema != 'object') throw new Error('schema should be object');
	        var str = stableStringify(schema);
	        var cached = self._cache.get(str);
	        if (cached) return cached;

	        var id = resolve.normalizeId(schema.id);
	        if (id) checkUnique(id);

	        var ok = skipValidation || self.opts.validateSchema === false
	                 || validateSchema(schema);
	        if (!ok) {
	            var message = 'schema is invalid:' + errorsText();
	            if (self.opts.validateSchema == 'log') console.error(message);
	            else throw new Error(message);
	        }

	        var localRefs = resolve.ids.call(self, schema);

	        var validate = compileSchema.call(self, schema, undefined, localRefs);
	        if (id[0] != '#') self._refs[id] = validate;
	        self._cache.put(str, validate);

	        return validate;
	    }


	    function errorsText(errors, opts) {
	        errors = errors || self.errors;
	        if (!errors) return 'No errors';
	        opts = opts || {};
	        var separator = opts.separator || ', ';
	        var dataVar = opts.dataVar || 'data';

	        var text = errors.reduce(function(txt, e) {
	            return e ? txt + e.keyword + ' ' + dataVar + e.dataPath + ': ' + e.message + separator : txt;
	        }, '');
	        return text.slice(0, -separator.length);
	    }


	    function addFormat(name, format) {
	        if (typeof format == 'string') format = new RegExp(format);
	        self._formats[name] = format;
	    }


	    function addInitialSchemas() {
	        if (self.opts.meta !== false)
	            addMetaSchema(__webpack_require__(46), META_SCHEMA_ID, true);

	        var optsSchemas = self.opts.schemas;
	        if (!optsSchemas) return;
	        if (Array.isArray(optsSchemas)) addSchema(optsSchemas);
	        else for (var key in optsSchemas) addSchema(optsSchemas[key], key);
	    }


	    function addInitialFormats() {
	        var optsFormats = self.opts.formats;
	        if (!optsFormats) return;
	        for (var name in optsFormats) {
	            var format = optsFormats[name];
	            addFormat(name, format);
	        }
	    }


	    function checkUnique(id) {
	        if (self._schemas[id] || self._refs[id])
	            throw new Error('schema with key or id "' + id + '" already exists');
	    }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';


	var Cache = module.exports = function Cache() {
	    this._cache = {};
	}


	Cache.prototype.put = function Cache_put(key, value) {
	    this._cache[key] = value;
	};


	Cache.prototype.get = function Cache_get(key) {
	    return this._cache[key];
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//all requires must be explicit because browserify won't work with dynamic requires
	module.exports = {
	  '$ref': __webpack_require__(14),
	  anyOf: __webpack_require__(16),
	  format: __webpack_require__(19),
	  maxLength: __webpack_require__(22),
	  minItems: __webpack_require__(25),
	  minimum: __webpack_require__(28),
	  oneOf: __webpack_require__(31),
	  required: __webpack_require__(34),
	  dependencies: __webpack_require__(17),
	  items: __webpack_require__(20),
	  maxProperties: __webpack_require__(23),
	  minLength: __webpack_require__(26),
	  multipleOf: __webpack_require__(29),
	  pattern: __webpack_require__(32),
	  uniqueItems: __webpack_require__(35),
	  allOf: __webpack_require__(15),
	  enum: __webpack_require__(18),
	  maxItems: __webpack_require__(21),
	  maximum: __webpack_require__(24),
	  minProperties: __webpack_require__(27),
	  not: __webpack_require__(30),
	  properties: __webpack_require__(33),
	  validate: __webpack_require__(5)
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(1);

	var DATE = /^\d\d\d\d-(\d\d)-(\d\d)$/;
	var DAYS = [,31,29,31,30,31,30,31,31,30,31,30,31];
	var TIME = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/;
	var HOSTNAME = /^[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?(\.[a-z](?:(?:[-0-9a-z]{0,61})?[0-9a-z])?)*$/i;
	var URI = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?(?:\#(?:[a-z0-9\-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*)?$/i;


	module.exports = formats;

	function formats(mode) {
	  mode = mode == 'full' ? 'full' : 'fast';
	  return util.copy(formats[mode]);
	}


	formats.fast = {
	  // date: http://tools.ietf.org/html/rfc3339#section-5.6
	  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
	  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
	  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t ][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)$/i,
	  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
	  uri: /^(?:[a-z][a-z0-9+-.]*:)?\/\/[^\s]*$/i, 
	  // email (sources from jsen validator):
	  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
	  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
	  email: /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
	  hostname: HOSTNAME,
	  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex
	};


	formats.full = {
	  date: date,
	  'date-time': date_time,
	  uri: uri,
	  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
	  hostname: hostname,
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex
	};


	function date(str) {
	  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
	  var matches = str.match(DATE);
	  if (!matches) return false;

	  var month = +matches[1];
	  var day = +matches[2];
	  return month >= 1 && month <= 12 && day >= 1 && day <= DAYS[month];
	}


	function date_time(str) {
	  // http://tools.ietf.org/html/rfc3339#section-5.6
	  var dateTime = str.toLowerCase().split('t');
	  if (!date(dateTime[0])) return false;

	  var matches = dateTime[1].match(TIME);
	  if (!matches) return false;

	  var hour = matches[1];
	  var minute = matches[2];
	  var second = matches[3];
	  return hour <= 23 && minute <= 59 && second <= 59;
	}


	function hostname(str) {
	  // http://tools.ietf.org/html/rfc1034#section-3.5
	  return str.length <= 255 && HOSTNAME.test(str);
	}


	function uri(str) {
	  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
	  return str.indexOf('.') >= 0 && URI.test(str);
	}


	function regex(str) {
	  try {
	    new RegExp(str);
	    return true;
	  } catch(e) {
	    return false;
	  }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolve = __webpack_require__(4)
	  , util = __webpack_require__(1)
	  , equal = __webpack_require__(3);

	try { var beautify = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"js-beautify\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).js_beautify; } catch(e) {}

	var RULES = __webpack_require__(13)
	  , validateGenerator = __webpack_require__(5);

	module.exports = compile;


	function compile(schema, root, localRefs) {
	  var self = this
	    , refVal = [ undefined ] 
	    , refs = {};

	  root = root || { schema: schema, refVal: refVal, refs: refs };

	  var formats = this._formats;

	  return localCompile(schema, root, localRefs);


	  function localCompile(_schema, _root, localRefs) {
	    var isRoot = !_root || (_root && _root.schema == _schema);
	    if (_root.schema != root.schema)
	      return compile.call(self, _schema, _root, localRefs);

	    var validateCode = validateGenerator({
	      isTop: true,
	      schema: _schema,
	      isRoot: isRoot, 
	      root: _root,
	      schemaPath: '',
	      errorPath: '""',
	      dataPath: '',
	      RULES: RULES,
	      validate: validateGenerator,
	      util: util,
	      resolve: resolve,
	      resolveRef: resolveRef,
	      opts: self.opts,
	      formats: formats
	    });

	    if (self.opts.beautify) {
	      var opts = self.opts.beautify === true ? { indent_size: 2 } : self.opts.beautify;
	      if (beautify) validateCode = beautify(validateCode, opts);
	      else console.error('"npm install js-beautify" to use beautify option');
	    }
	    // console.log('\n\n\n *** \n', validateCode);
	    var validate;
	    try {
	      eval(validateCode);
	      refVal[0] = validate;
	    } catch(e) {
	      console.log('Error compiling schema, function code:', validateCode);
	      throw e;
	    }

	    validate.schema = _schema;
	    validate.errors = null;
	    validate.refs = refs;
	    validate.refVal = refVal;
	    validate.root = isRoot ? validate : _root;

	    return validate;
	  }

	  function resolveRef(baseId, ref, isRoot) {
	    ref = resolve.url(baseId, ref);
	    if (refs[ref]) return 'refVal[' + refs[ref] + ']';
	    if (!isRoot) {
	      var rootRefId = root.refs[ref];
	      if (rootRefId !== undefined)
	        return addLocalRef(ref, root.refVal[rootRefId]);
	    }

	    var refCode = addLocalRef(ref, compiledRef);
	    var v = resolve.call(self, localCompile, root, ref);
	    if (!v) {
	      var localSchema = localRefs[ref];
	      if (localSchema) v = compile.call(self, localSchema, root, localRefs);
	    }

	    if (v) {
	      replaceLocalRef(ref, v);
	      return refCode;
	    }

	    function compiledRef() {
	      var valid = v.apply(this, arguments);
	      compiledRef.errors = v.errors;
	      return valid;
	    }
	  }

	  function addLocalRef(ref, v) {
	    var refId = refVal.length;
	    refVal[refId] = v;
	    refs[ref] = refId;
	    return 'refVal[' + refId + ']';
	  }

	  function replaceLocalRef(ref, v) {
	    var refId = refs[ref];
	    refVal[refId] = v;
	  }
	}


	/**
	 * Functions below are used inside compiled validations function
	 */

	var ucs2length = util.ucs2length;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ruleModules = __webpack_require__(10)
	  , util = __webpack_require__(1);

	var RULES = module.exports = [
	  { type: 'number',
	    rules: [ 'maximum', 'minimum', 'multipleOf'] },
	  { type: 'string',
	    rules: [ 'maxLength', 'minLength', 'pattern', 'format' ] },
	  { type: 'array',
	    rules: [ 'maxItems', 'minItems', 'uniqueItems', 'items' ] },
	  { type: 'object',
	    rules: [ 'maxProperties', 'minProperties', 'required', 'dependencies', 'properties' ] },
	  { rules: [ '$ref', 'enum', 'not', 'anyOf', 'oneOf', 'allOf' ] }
	];

	RULES.all = [ 'type', 'additionalProperties', 'patternProperties' ];


	RULES.forEach(function (group) {
	  group.rules = group.rules.map(function (keyword) {
	    RULES.all.push(keyword);
	    return {
	      keyword: keyword,
	      code: ruleModules[keyword]
	    };
	  });
	});

	RULES.all = util.toHash(RULES.all);


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['$ref'],
	    $schemaPath = it.schemaPath + '.' + '$ref',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('$ref') + '\'); ';
	  }
	  if ($schema == '#' || $schema == '#/') {
	    if (it.isRoot) {
	      if ($breakOnError && it.wasTop) {
	        out += ' if (! ' + ('validate') + '(' + ($data) + ', (dataPath || \'\') + ' + (it.errorPath) + ') ) return false; else { ';
	      } else {
	        out += ' var errors' + ($lvl) + ' = validate.errors; if (! ' + ('validate') + '(' + ($data) + ', (dataPath || \'\') + ' + (it.errorPath) + ') ) { if (errors' + ($lvl) + ' !== null) validate.errors = errors' + ($lvl) + '.concat(validate.errors); errors = validate.errors.length; } ';
	        if ($breakOnError) {
	          out += ' else { ';
	        }
	      }
	    } else {
	      out += '  if (! ' + ('root.refVal[0]') + '(' + ($data) + ', (dataPath || \'\') + ' + (it.errorPath) + ') ) { if (validate.errors === null) validate.errors = ' + ('root.refVal[0]') + '.errors; else validate.errors = validate.errors.concat(' + ('root.refVal[0]') + '.errors); errors = validate.errors.length; } ';
	      if ($breakOnError) {
	        out += ' else { ';
	      }
	    }
	  } else {
	    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
	    if ($refVal === undefined) {
	      var $message = 'can\'t resolve reference ' + $schema + ' from id ' + it.baseId;
	      if (it.opts.missingRefs == 'fail') {
	        console.log($message);
	        if (it.wasTop && $breakOnError) {
	          out += ' validate.errors = [ { keyword: \'' + ('$ref') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
	          if (it.opts.verbose) {
	            out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	          }
	          out += ' }]; return false; ';
	        } else {
	          out += '  var err =   { keyword: \'' + ('$ref') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
	          if (it.opts.verbose) {
	            out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	          }
	          out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	        }
	        if ($breakOnError) {
	          out += ' if (false) { ';
	        }
	      } else if (it.opts.missingRefs == 'ignore') {
	        console.log($message);
	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }
	      } else {
	        throw new Error($message);
	      }
	    } else {
	      out += '  if (! ' + ($refVal) + '(' + ($data) + ', (dataPath || \'\') + ' + (it.errorPath) + ') ) { if (validate.errors === null) validate.errors = ' + ($refVal) + '.errors; else validate.errors = validate.errors.concat(' + ($refVal) + '.errors); errors = validate.errors.length; } ';
	      if ($breakOnError) {
	        out += ' else { ';
	      }
	    }
	  }
	  return out;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['allOf'],
	    $schemaPath = it.schemaPath + '.' + 'allOf',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('allOf') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  var arr1 = $schema;
	  if (arr1) {
	    var $sch, $i = -1,
	      l1 = arr1.length - 1;
	    while ($i < l1) {
	      $sch = arr1[$i += 1];
	      if (it.util.schemaHasRules($sch, it.RULES.all)) {
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        out += ' ' + (it.validate($it)) + ' ';
	        if ($breakOnError) {
	          out += ' if (valid' + ($it.level) + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces.slice(0, -1));
	  }
	  out = it.util.cleanUpCode(out);
	  return out;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['anyOf'],
	    $schemaPath = it.schemaPath + '.' + 'anyOf',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('anyOf') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  var $noEmptySchema = $schema.every(function($sch) {
	    return it.util.schemaHasRules($sch, it.RULES.all);
	  });
	  if ($noEmptySchema) {
	    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = false; ';
	    var arr1 = $schema;
	    if (arr1) {
	      var $sch, $i = -1,
	        l1 = arr1.length - 1;
	      while ($i < l1) {
	        $sch = arr1[$i += 1];
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        out += ' ' + (it.validate($it)) + ' ' + ($valid) + ' = ' + ($valid) + ' || valid' + ($it.level) + '; if (!' + ($valid) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	    out += ' ' + ($closingBraces) + ' if (!' + ($valid) + ') {  var err =   { keyword: \'' + ('anyOf') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match some schema in anyOf\' ';
	    if (it.opts.verbose) {
	      out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; } else { errors = ' + ($errs) + '; if (validate.errors !== null) { if (' + ($errs) + ') validate.errors.length = ' + ($errs) + '; else validate.errors = null; } ';
	    if (it.opts.allErrors) {
	      out += ' } ';
	    }
	    out = it.util.cleanUpCode(out);
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['dependencies'],
	    $schemaPath = it.schemaPath + '.' + 'dependencies',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('dependencies') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  var $schemaDeps = {},
	    $propertyDeps = {};
	  for ($property in $schema) {
	    var $sch = $schema[$property];
	    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
	    $deps[$property] = $sch;
	  }
	  out += 'var ' + ($errs) + ' = errors;';
	  for (var $property in $propertyDeps) {
	    out += ' if (' + ($data) + (it.util.getProperty($property)) + ' !== undefined) { ';
	    $deps = $propertyDeps[$property];
	    out += ' if ( ';
	    var arr1 = $deps;
	    if (arr1) {
	      var $dep, $i = -1,
	        l1 = arr1.length - 1;
	      while ($i < l1) {
	        $dep = arr1[$i += 1];
	        if ($i) {
	          out += ' || ';
	        }
	        out += ' ' + ($data) + (it.util.getProperty($dep)) + ' === undefined ';
	      }
	    }
	    out += ') {  ';
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('dependencies') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'';
	      if ($deps.length == 1) {
	        out += 'property ' + (it.util.escapeQuotes($deps[0])) + ' is';
	      } else {
	        out += 'properties ' + (it.util.escapeQuotes($deps.join(", "))) + ' are';
	      }
	      out += ' required when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('dependencies') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'';
	      if ($deps.length == 1) {
	        out += 'property ' + (it.util.escapeQuotes($deps[0])) + ' is';
	      } else {
	        out += 'properties ' + (it.util.escapeQuotes($deps.join(", "))) + ' are';
	      }
	      out += ' required when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    out += ' }   ';
	    if ($breakOnError) {
	      $closingBraces += '}';
	      out += ' else { ';
	    }
	    out += ' }';
	  }
	  for (var $property in $schemaDeps) {
	    var $sch = $schemaDeps[$property];
	    if (it.util.schemaHasRules($sch, it.RULES.all)) {
	      out += ' valid' + ($it.level) + ' = true; if (' + ($data) + '[\'' + ($property) + '\'] !== undefined) { ';
	      $it.schema = $sch;
	      $it.schemaPath = $schemaPath + it.util.getProperty($property);
	      out += ' ' + (it.validate($it)) + ' }  ';
	      if ($breakOnError) {
	        out += ' if (valid' + ($it.level) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += '   ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  out = it.util.cleanUpCode(out);
	  return out;
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['enum'],
	    $schemaPath = it.schemaPath + '.' + 'enum',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('enum') + '\'); ';
	  }
	  var $i = 'i' + $lvl;
	  out += 'var enumSchema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ' , ' + ($valid) + ' = false;for (var ' + ($i) + '=0; ' + ($i) + '<enumSchema' + ($lvl) + '.length; ' + ($i) + '++) if (equal(' + ($data) + ', enumSchema' + ($lvl) + '[' + ($i) + '])) { ' + ($valid) + ' = true; break; } if (!' + ($valid) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('enum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be equal to one of values\' ';
	    if (it.opts.verbose) {
	      out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('enum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be equal to one of values\' ';
	    if (it.opts.verbose) {
	      out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += ' }';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['format'],
	    $schemaPath = it.schemaPath + '.' + 'format',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('format') + '\'); ';
	  }
	  var $format = it.formats[$schema];
	  if (it.opts.format !== false && $format) {
	    out += ' if (!   ';
	    if (typeof $format == 'function') {
	      out += ' formats' + (it.util.getProperty($schema)) + ' (' + ($data) + ') ';
	    } else {
	      out += ' formats' + (it.util.getProperty($schema)) + ' .test(' + ($data) + ') ';
	    }
	    out += ') {  ';
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('format') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match format ' + (it.util.escapeQuotes($schema)) + '\' ';
	      if (it.opts.verbose) {
	        out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('format') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match format ' + (it.util.escapeQuotes($schema)) + '\' ';
	      if (it.opts.verbose) {
	        out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    out += ' } ';
	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['items'],
	    $schemaPath = it.schemaPath + '.' + 'items',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('items') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  var $dataNxt = $it.dataLevel = it.dataLevel + 1,
	    $nextData = 'data' + $dataNxt;
	  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
	  if (Array.isArray($schema)) {
	    var $additionalItems = it.schema.additionalItems;
	    if ($additionalItems === false) {
	      out += ' ' + ($valid) + ' = ' + ($data) + '.length <= ' + ($schema.length) + ';  if (!' + ($valid) + ') {  ';
	      if (it.wasTop && $breakOnError) {
	        out += ' validate.errors = [ { keyword: \'' + ('additionalItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
	        if (it.opts.verbose) {
	          out += ', schema: false, data: ' + ($data);
	        }
	        out += ' }]; return false; ';
	      } else {
	        out += '  var err =   { keyword: \'' + ('additionalItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
	        if (it.opts.verbose) {
	          out += ', schema: false, data: ' + ($data);
	        }
	        out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	      }
	      out += ' }  ';
	      if ($breakOnError) {
	        $closingBraces += '}';
	        out += ' else { ';
	      }
	    }
	    var arr1 = $schema;
	    if (arr1) {
	      var $sch, $i = -1,
	        l1 = arr1.length - 1;
	      while ($i < l1) {
	        $sch = arr1[$i += 1];
	        if (it.util.schemaHasRules($sch, it.RULES.all)) {
	          out += ' valid' + ($it.level) + ' = true;  if (' + ($data) + '.length > ' + ($i) + ') { ';
	          $it.schema = $sch;
	          $it.schemaPath = $schemaPath + '[' + $i + ']';
	          $it.errorPath = (it.errorPath + ' + "[' + $i + ']"').replace('" + "', '');
	          $it.dataPath = it.dataPath + '[' + $i + ']';
	          var $passData = $data + '[' + $i + ']';
	          var $code = it.validate($it);
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	          } else {
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	          }
	          out += ' }  ';
	          if ($breakOnError) {
	            out += ' if (valid' + ($it.level) + ') { ';
	            $closingBraces += '}';
	          }
	        }
	      }
	    }
	    if (typeof $additionalItems == 'object' && it.util.schemaHasRules($additionalItems, it.RULES.all)) {
	      $it.schema = $additionalItems;
	      $it.schemaPath = it.schemaPath + '.additionalItems';
	      out += ' valid' + ($it.level) + ' = true; if (' + ($data) + '.length > ' + ($schema.length) + ') {  for (var i' + ($lvl) + ' = ' + ($schema.length) + '; i' + ($lvl) + ' < ' + ($data) + '.length; i' + ($lvl) + '++) { ';
	      $it.errorPath = (it.errorPath + ' + "[" + i' + $lvl + ' + "]"').replace('" + "', '');
	      $it.dataPath = it.dataPath + '[i' + $lvl + ']';
	      var $passData = $data + '[i' + $lvl + ']';
	      var $code = it.validate($it);
	      if (it.util.varOccurences($code, $nextData) < 2) {
	        out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	      } else {
	        out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	      }
	      if ($breakOnError) {
	        out += ' if (!valid' + ($it.level) + ') break; ';
	      }
	      out += ' } }  ';
	      if ($breakOnError) {
	        out += ' if (valid' + ($it.level) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  } else if (it.util.schemaHasRules($schema, it.RULES.all)) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    out += '  for (var i' + ($lvl) + ' = ' + (0) + '; i' + ($lvl) + ' < ' + ($data) + '.length; i' + ($lvl) + '++) { ';
	    $it.errorPath = (it.errorPath + ' + "[" + i' + $lvl + ' + "]"').replace('" + "', '');
	    $it.dataPath = it.dataPath + '[i' + $lvl + ']';
	    var $passData = $data + '[i' + $lvl + ']';
	    var $code = it.validate($it);
	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	    } else {
	      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	    }
	    if ($breakOnError) {
	      out += ' if (!valid' + ($it.level) + ') break; ';
	    }
	    out += ' }  ';
	    if ($breakOnError) {
	      out += ' if (valid' + ($it.level) + ') { ';
	      $closingBraces += '}';
	    }
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  out = it.util.cleanUpCode(out);
	  return out;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['maxItems'],
	    $schemaPath = it.schemaPath + '.' + 'maxItems',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('maxItems') + '\'); ';
	  }
	  out += 'if (' + ($data) + '.length > ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('maxItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema) + ' items\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('maxItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema) + ' items\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['maxLength'],
	    $schemaPath = it.schemaPath + '.' + 'maxLength',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('maxLength') + '\'); ';
	  }
	  out += 'if ( ';
	  if (it.opts.unicode === false) {
	    out += ' ' + ($data) + '.length ';
	  } else {
	    out += ' ucs2length(' + ($data) + ') ';
	  }
	  out += ' > ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('maxLength') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be longer than ' + ($schema) + ' characters\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('maxLength') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be longer than ' + ($schema) + ' characters\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['maxProperties'],
	    $schemaPath = it.schemaPath + '.' + 'maxProperties',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('maxProperties') + '\'); ';
	  }
	  out += 'if (Object.keys(' + ($data) + ').length > ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('maxProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema) + ' properties\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('maxProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have more than ' + ($schema) + ' properties\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['maximum'],
	    $schemaPath = it.schemaPath + '.' + 'maximum',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('maximum') + '\'); ';
	  }
	  var $exclusive = it.schema.exclusiveMaximum === true,
	    $op = $exclusive ? '<' : '<=',
	    $notOp = $exclusive ? '>=' : '>';
	  out += 'if (' + ($data) + ' ' + ($notOp) + ' ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('maximum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ' + ($op) + ' ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('maximum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ' + ($op) + ' ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['minItems'],
	    $schemaPath = it.schemaPath + '.' + 'minItems',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('minItems') + '\'); ';
	  }
	  out += 'if (' + ($data) + '.length < ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('minItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have less than ' + ($schema) + ' items\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('minItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have less than ' + ($schema) + ' items\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['minLength'],
	    $schemaPath = it.schemaPath + '.' + 'minLength',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('minLength') + '\'); ';
	  }
	  out += 'if ( ';
	  if (it.opts.unicode === false) {
	    out += ' ' + ($data) + '.length ';
	  } else {
	    out += ' ucs2length(' + ($data) + ') ';
	  }
	  out += ' < ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('minLength') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be shorter than ' + ($schema) + ' characters\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('minLength') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be shorter than ' + ($schema) + ' characters\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['minProperties'],
	    $schemaPath = it.schemaPath + '.' + 'minProperties',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('minProperties') + '\'); ';
	  }
	  out += 'if (Object.keys(' + ($data) + ').length < ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('minProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have less than ' + ($schema) + ' properties\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('minProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT have less than ' + ($schema) + ' properties\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['minimum'],
	    $schemaPath = it.schemaPath + '.' + 'minimum',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('minimum') + '\'); ';
	  }
	  var $exclusive = it.schema.exclusiveMinimum === true,
	    $op = $exclusive ? '>' : '>=',
	    $notOp = $exclusive ? '<=' : '<';
	  out += 'if (' + ($data) + ' ' + ($notOp) + ' ' + ($schema) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('minimum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ' + ($op) + ' ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('minimum') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be ' + ($op) + ' ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['multipleOf'],
	    $schemaPath = it.schemaPath + '.' + 'multipleOf',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('multipleOf') + '\'); ';
	  }
	  out += 'var division' + ($lvl) + ' = ' + ($data) + ' / ' + ($schema) + ';if (' + ($data) + ' / ' + ($schema) + ' !== parseInt(division' + ($lvl) + ')) {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('multipleOf') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be multiple of ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('multipleOf') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should be multiple of ' + ($schema) + '\' ';
	    if (it.opts.verbose) {
	      out += ', schema: ' + ($schema) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['not'],
	    $schemaPath = it.schemaPath + '.' + 'not',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('not') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  if (it.util.schemaHasRules($schema, it.RULES.all)) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    out += ' var ' + ($errs) + ' = errors; ' + (it.validate($it)) + ' if (valid' + ($it.level) + ') {  ';
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('not') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be valid\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('not') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be valid\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    out += ' } else { errors = ' + ($errs) + '; if (validate.errors !== null) { if (' + ($errs) + ') validate.errors.length = ' + ($errs) + '; else validate.errors = null; } ';
	    if (it.opts.allErrors) {
	      out += ' } ';
	    }
	  } else {
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('not') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be valid\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('not') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should NOT be valid\' ';
	      if (it.opts.verbose) {
	        out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    if ($breakOnError) {
	      out += ' if (false) { ';
	    }
	  }
	  return out;
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['oneOf'],
	    $schemaPath = it.schemaPath + '.' + 'oneOf',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('oneOf') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  out += 'var ' + ($errs) + ' = errors;var prevValid' + ($lvl) + ' = false;var ' + ($valid) + ' = false;';
	  var arr1 = $schema;
	  if (arr1) {
	    var $sch, $i = -1,
	      l1 = arr1.length - 1;
	    while ($i < l1) {
	      $sch = arr1[$i += 1];
	      if (it.util.schemaHasRules($sch, it.RULES.all)) {
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        out += ' ' + (it.validate($it)) + ' ';
	      } else {
	        out += ' var valid' + ($it.level) + ' = true; ';
	      }
	      if ($i) {
	        out += ' if (valid' + ($it.level) + ' && prevValid' + ($lvl) + ') ' + ($valid) + ' = false; else { ';
	        $closingBraces += '}';
	      }
	      out += ' if (valid' + ($it.level) + ') ' + ($valid) + ' = prevValid' + ($lvl) + ' = true;';
	    }
	  }
	  out += '' + ($closingBraces) + 'if (!' + ($valid) + ') {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('oneOf') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match exactly one schema in oneOf\' ';
	    if (it.opts.verbose) {
	      out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('oneOf') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match exactly one schema in oneOf\' ';
	    if (it.opts.verbose) {
	      out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} else { errors = ' + ($errs) + '; if (validate.errors !== null) { if (' + ($errs) + ') validate.errors.length = ' + ($errs) + '; else validate.errors = null; }';
	  if (it.opts.allErrors) {
	    out += ' } ';
	  }
	  return out;
	}


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['pattern'],
	    $schemaPath = it.schemaPath + '.' + 'pattern',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('pattern') + '\'); ';
	  }
	  new RegExp($schema);
	  out += 'if (! /' + (it.util.escapeRegExp($schema)) + '/.test(' + ($data) + ') ) {  ';
	  if (it.wasTop && $breakOnError) {
	    out += ' validate.errors = [ { keyword: \'' + ('pattern') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match pattern "' + (it.util.escapeQuotes($schema)) + '"\' ';
	    if (it.opts.verbose) {
	      out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	    }
	    out += ' }]; return false; ';
	  } else {
	    out += '  var err =   { keyword: \'' + ('pattern') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'should match pattern "' + (it.util.escapeQuotes($schema)) + '"\' ';
	    if (it.opts.verbose) {
	      out += ', schema: \'' + (it.util.escapeQuotes($schema)) + '\', data: ' + ($data);
	    }
	    out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['properties'],
	    $schemaPath = it.schemaPath + '.' + 'properties',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('properties') + '\'); ';
	  }
	  var $it = it.util.copy(it),
	    $closingBraces = '';
	  $it.level++;
	  var $dataNxt = $it.dataLevel = it.dataLevel + 1,
	    $nextData = 'data' + $dataNxt;
	  var $pProperties = it.schema.patternProperties || {},
	    $pPropertyKeys = Object.keys($pProperties),
	    $aProperties = it.schema.additionalProperties,
	    $noAdditional = $aProperties === false,
	    $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
	    $removeAdditional = it.opts.removeAdditional,
	    $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional;
	  out += 'var ' + ($errs) + ' = errors;var valid' + ($it.level) + ' = true;';
	  if ($checkAdditional) {
	    out += ' var propertiesSchema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ' || {}; for (var key' + ($lvl) + ' in ' + ($data) + ') { var isAdditional' + ($lvl) + ' = propertiesSchema' + ($lvl) + '[key' + ($lvl) + '] === undefined; ';
	    if ($pPropertyKeys.length) {
	      out += ' if (isAdditional' + ($lvl) + ') { ';
	      var arr1 = $pPropertyKeys;
	      if (arr1) {
	        var $pProperty, $i = -1,
	          l1 = arr1.length - 1;
	        while ($i < l1) {
	          $pProperty = arr1[$i += 1];
	          out += ' if (/' + (it.util.escapeRegExp($pProperty)) + '/.test(key' + ($lvl) + ')) isAdditional' + ($lvl) + ' = false; ';
	          if ($i < $pPropertyKeys.length - 1) {
	            out += ' else ';
	          }
	        }
	      }
	      out += ' } ';
	    }
	    out += ' if (isAdditional' + ($lvl) + ') { ';
	    if ($removeAdditional == 'all') {
	      out += ' delete ' + ($data) + '[key' + ($lvl) + ']; ';
	    } else {
	      var $currentErrorPath = it.errorPath;
	      it.errorPath = (it.errorPath + ' + "[\'" + key' + $lvl + ' + "\']"').replace('" + "', '');
	      if ($noAdditional) {
	        if ($removeAdditional) {
	          out += ' delete ' + ($data) + '[key' + ($lvl) + ']; ';
	        } else {
	          out += ' valid' + ($it.level) + ' = false;  ';
	          if (it.wasTop && $breakOnError) {
	            out += ' validate.errors = [ { keyword: \'' + ('additionalProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'additional properties NOT allowed\' ';
	            if (it.opts.verbose) {
	              out += ', schema: false, data: ' + ($data);
	            }
	            out += ' }]; return false; ';
	          } else {
	            out += '  var err =   { keyword: \'' + ('additionalProperties') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'additional properties NOT allowed\' ';
	            if (it.opts.verbose) {
	              out += ', schema: false, data: ' + ($data);
	            }
	            out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	          }
	          if ($breakOnError) {
	            out += ' break; ';
	          }
	        }
	      } else if ($additionalIsSchema) {
	        if ($removeAdditional == 'failing') {
	          out += ' var ' + ($errs) + ' = errors; ';
	        }
	        $it.schema = $aProperties;
	        $it.schemaPath = it.schemaPath + '.additionalProperties';
	        $it.errorPath = it.errorPath;
	        $it.dataPath = it.dataPath + '[key' + $lvl + ']';
	        var $passData = $data + '[key' + $lvl + ']';
	        var $code = it.validate($it);
	        if (it.util.varOccurences($code, $nextData) < 2) {
	          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	        } else {
	          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	        }
	        if ($removeAdditional == 'failing') {
	          out += ' if (!valid' + ($it.level) + ') { errors = ' + ($errs) + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + ($data) + '[key' + ($lvl) + ']; } ';
	        } else {
	          if ($breakOnError) {
	            out += ' if (!valid' + ($it.level) + ') break; ';
	          }
	        }
	      }
	      it.errorPath = $currentErrorPath;
	    }
	    out += ' } }  ';
	    if ($breakOnError) {
	      out += ' if (valid' + ($it.level) + ') { ';
	      $closingBraces += '}';
	    }
	  }
	  if ($schema) {
	    for (var $propertyKey in $schema) {
	      var $sch = $schema[$propertyKey];
	      if (it.util.schemaHasRules($sch, it.RULES.all)) {
	        $it.schema = $sch;
	        var $prop = it.util.getProperty($propertyKey),
	          $passData = $data + $prop;
	        $it.schemaPath = $schemaPath + $prop;
	        $it.errorPath = (it.errorPath + ' + "' + $prop + '"').replace('" + "', '');
	        $it.dataPath = it.dataPath + $prop;
	        var $code = it.validate($it);
	        if (it.util.varOccurences($code, $nextData) < 2) {
	          $code = it.util.varReplace($code, $nextData, $passData);
	          var $useData = $passData;
	        } else {
	          var $useData = $nextData;
	          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ';
	        }
	        if ($breakOnError) {
	          out += ' if (' + ($useData) + ' === undefined) { valid' + ($it.level) + ' = true; } else { ';
	        } else {
	          out += ' if (' + ($useData) + ' !== undefined) { ';
	        }
	        out += ' ' + ($code) + ' } ';
	      }
	      if ($breakOnError) {
	        out += ' if (valid' + ($it.level) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  }
	  var arr2 = $pPropertyKeys;
	  if (arr2) {
	    var $pProperty, i2 = -1,
	      l2 = arr2.length - 1;
	    while (i2 < l2) {
	      $pProperty = arr2[i2 += 1];
	      var $sch = $pProperties[$pProperty];
	      if (it.util.schemaHasRules($sch, it.RULES.all)) {
	        $it.schema = $sch;
	        $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
	        out += ' for (var key' + ($lvl) + ' in ' + ($data) + ') { if (/' + (it.util.escapeRegExp($pProperty)) + '/.test(key' + ($lvl) + ')) { ';
	        $it.errorPath = (it.errorPath + ' + "[\'" + key' + $lvl + ' + "\']"').replace('" + "', '');
	        $it.dataPath = it.dataPath + '[key' + $lvl + ']';
	        var $passData = $data + '[key' + $lvl + ']';
	        var $code = it.validate($it);
	        if (it.util.varOccurences($code, $nextData) < 2) {
	          out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	        } else {
	          out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	        }
	        if ($breakOnError) {
	          out += ' if (!valid' + ($it.level) + ') break; ';
	        }
	        out += ' } ';
	        if ($breakOnError) {
	          out += ' else valid' + ($it.level) + ' = true; ';
	        }
	        out += ' }  ';
	        if ($breakOnError) {
	          out += ' if (valid' + ($it.level) + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  out = it.util.cleanUpCode(out);
	  return out;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['required'],
	    $schemaPath = it.schemaPath + '.' + 'required',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('required') + '\'); ';
	  }
	  var $currentErrorPath = it.errorPath;
	  if ($breakOnError) {
	    out += ' var missing' + ($lvl) + '; ';
	    if ($schema.length <= 20) {
	      out += ' if ( ';
	      var arr1 = $schema;
	      if (arr1) {
	        var $property, $i = -1,
	          l1 = arr1.length - 1;
	        while ($i < l1) {
	          $property = arr1[$i += 1];
	          if ($i) {
	            out += ' || ';
	          }
	          var $prop = it.util.getProperty($property);
	          out += ' ( ' + ($data) + ($prop) + ' === undefined && (missing' + ($lvl) + ' = \'' + (it.util.escapeQuotes($prop)) + '\') ) ';
	        }
	      }
	      out += ') { ';
	      var $propertyPath = ' + missing' + $lvl,
	        $missingProperty = '\'' + $propertyPath + ' + \'';
	      it.errorPath = $currentErrorPath + $propertyPath;
	      if (it.wasTop && $breakOnError) {
	        out += ' validate.errors = [ { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }]; return false; ';
	      } else {
	        out += '  var err =   { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	      }
	      out += ' } else { ';
	    } else {
	      out += '  var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + '; ';
	      var $i = 'i' + $lvl,
	        $propertyPath = ' + schema' + $lvl + '[' + $i + '] + ',
	        $missingProperty = '\' + "\'"' + $propertyPath + '"\'" + \'';
	      it.errorPath = ($currentErrorPath + ' + "[\'"' + $propertyPath + '"\']"').replace('" + "', '');
	      out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < schema' + ($lvl) + '.length; ' + ($i) + '++) { var ' + ($valid) + ' = ' + ($data) + '[schema' + ($lvl) + '[' + ($i) + ']] !== undefined; if (!' + ($valid) + ') break; }  if (!' + ($valid) + ') {  ';
	      if (it.wasTop && $breakOnError) {
	        out += ' validate.errors = [ { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }]; return false; ';
	      } else {
	        out += '  var err =   { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	      }
	      out += ' } else { ';
	    }
	  } else {
	    if ($schema.length <= 10) {
	      var arr2 = $schema;
	      if (arr2) {
	        var $property, $i = -1,
	          l2 = arr2.length - 1;
	        while ($i < l2) {
	          $property = arr2[$i += 1];
	          var $prop = it.util.getProperty($property),
	            $missingProperty = it.util.escapeQuotes($prop);
	          it.errorPath = ($currentErrorPath + ' + \'' + $missingProperty + '\'').replace('" + "', '');
	          out += ' if (' + ($data) + ($prop) + ' === undefined) {  ';
	          if (it.wasTop && $breakOnError) {
	            out += ' validate.errors = [ { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	            if (it.opts.verbose) {
	              out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	            }
	            out += ' }]; return false; ';
	          } else {
	            out += '  var err =   { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	            if (it.opts.verbose) {
	              out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	            }
	            out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	          }
	          out += ' } ';
	        }
	      }
	    } else {
	      out += '  var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + '; ';
	      var $i = 'i' + $lvl,
	        $propertyPath = ' + schema' + $lvl + '[' + $i + '] + ',
	        $missingProperty = '\' + "\'"' + $propertyPath + '"\'" + \'';
	      it.errorPath = ($currentErrorPath + ' + "[\'"' + $propertyPath + '"\']"').replace('" + "', '');
	      out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < schema' + ($lvl) + '.length; ' + ($i) + '++) { if (' + ($data) + '[schema' + ($lvl) + '[' + ($i) + ']] === undefined) {  ';
	      if (it.wasTop && $breakOnError) {
	        out += ' validate.errors = [ { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }]; return false; ';
	      } else {
	        out += '  var err =   { keyword: \'' + ('required') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'property ' + ($missingProperty) + ' is required\' ';
	        if (it.opts.verbose) {
	          out += ', schema: validate.schema' + ($schemaPath) + ', data: ' + ($data);
	        }
	        out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	      }
	      out += ' } } ';
	    }
	  }
	  it.errorPath = $currentErrorPath;
	  return out;
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function anonymous(it) {
	  var out = ' ';
	  var $lvl = it.level,
	    $dataLvl = it.dataLevel,
	    $schema = it.schema['uniqueItems'],
	    $schemaPath = it.schemaPath + '.' + 'uniqueItems',
	    $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || ''),
	    $valid = 'valid' + $lvl,
	    $errs = 'errs' + $lvl;
	  if (it.opts._debug) {
	    out += ' console.log(\'Keyword ' + ('uniqueItems') + '\'); ';
	  }
	  if ($schema && it.opts.uniqueItems !== false) {
	    out += ' var ' + ($valid) + ' = true; if (' + ($data) + '.length > 1) { var i = ' + ($data) + '.length, j; outer: for (;i--;) { for (j = i; j--;) { if (equal(' + ($data) + '[i], ' + ($data) + '[j])) { ' + ($valid) + ' = false; break outer; } } } } if (!' + ($valid) + ') {  ';
	    if (it.wasTop && $breakOnError) {
	      out += ' validate.errors = [ { keyword: \'' + ('uniqueItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'items ## \' + j + \' and \' + i + \' are duplicate\' ';
	      if (it.opts.verbose) {
	        out += ', schema: ' + ($schema) + ', data: ' + ($data);
	      }
	      out += ' }]; return false; ';
	    } else {
	      out += '  var err =   { keyword: \'' + ('uniqueItems') + '\', dataPath: (dataPath || \'\') + ' + (it.errorPath) + ', message: \'items ## \' + j + \' and \' + i + \' are duplicate\' ';
	      if (it.opts.verbose) {
	        out += ', schema: ' + ($schema) + ', data: ' + ($data);
	      }
	      out += ' }; if (validate.errors === null) validate.errors = [err]; else validate.errors.push(err); errors++; ';
	    }
	    out += ' } ';
	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports.parse = __webpack_require__(37);
	exports.stringify = __webpack_require__(38);


/***/ },
/* 37 */
/***/ function(module, exports) {

	var at, // The index of the current character
	    ch, // The current character
	    escapee = {
	        '"':  '"',
	        '\\': '\\',
	        '/':  '/',
	        b:    '\b',
	        f:    '\f',
	        n:    '\n',
	        r:    '\r',
	        t:    '\t'
	    },
	    text,

	    error = function (m) {
	        // Call error when something is wrong.
	        throw {
	            name:    'SyntaxError',
	            message: m,
	            at:      at,
	            text:    text
	        };
	    },
	    
	    next = function (c) {
	        // If a c parameter is provided, verify that it matches the current character.
	        if (c && c !== ch) {
	            error("Expected '" + c + "' instead of '" + ch + "'");
	        }
	        
	        // Get the next character. When there are no more characters,
	        // return the empty string.
	        
	        ch = text.charAt(at);
	        at += 1;
	        return ch;
	    },
	    
	    number = function () {
	        // Parse a number value.
	        var number,
	            string = '';
	        
	        if (ch === '-') {
	            string = '-';
	            next('-');
	        }
	        while (ch >= '0' && ch <= '9') {
	            string += ch;
	            next();
	        }
	        if (ch === '.') {
	            string += '.';
	            while (next() && ch >= '0' && ch <= '9') {
	                string += ch;
	            }
	        }
	        if (ch === 'e' || ch === 'E') {
	            string += ch;
	            next();
	            if (ch === '-' || ch === '+') {
	                string += ch;
	                next();
	            }
	            while (ch >= '0' && ch <= '9') {
	                string += ch;
	                next();
	            }
	        }
	        number = +string;
	        if (!isFinite(number)) {
	            error("Bad number");
	        } else {
	            return number;
	        }
	    },
	    
	    string = function () {
	        // Parse a string value.
	        var hex,
	            i,
	            string = '',
	            uffff;
	        
	        // When parsing for string values, we must look for " and \ characters.
	        if (ch === '"') {
	            while (next()) {
	                if (ch === '"') {
	                    next();
	                    return string;
	                } else if (ch === '\\') {
	                    next();
	                    if (ch === 'u') {
	                        uffff = 0;
	                        for (i = 0; i < 4; i += 1) {
	                            hex = parseInt(next(), 16);
	                            if (!isFinite(hex)) {
	                                break;
	                            }
	                            uffff = uffff * 16 + hex;
	                        }
	                        string += String.fromCharCode(uffff);
	                    } else if (typeof escapee[ch] === 'string') {
	                        string += escapee[ch];
	                    } else {
	                        break;
	                    }
	                } else {
	                    string += ch;
	                }
	            }
	        }
	        error("Bad string");
	    },

	    white = function () {

	// Skip whitespace.

	        while (ch && ch <= ' ') {
	            next();
	        }
	    },

	    word = function () {

	// true, false, or null.

	        switch (ch) {
	        case 't':
	            next('t');
	            next('r');
	            next('u');
	            next('e');
	            return true;
	        case 'f':
	            next('f');
	            next('a');
	            next('l');
	            next('s');
	            next('e');
	            return false;
	        case 'n':
	            next('n');
	            next('u');
	            next('l');
	            next('l');
	            return null;
	        }
	        error("Unexpected '" + ch + "'");
	    },

	    value,  // Place holder for the value function.

	    array = function () {

	// Parse an array value.

	        var array = [];

	        if (ch === '[') {
	            next('[');
	            white();
	            if (ch === ']') {
	                next(']');
	                return array;   // empty array
	            }
	            while (ch) {
	                array.push(value());
	                white();
	                if (ch === ']') {
	                    next(']');
	                    return array;
	                }
	                next(',');
	                white();
	            }
	        }
	        error("Bad array");
	    },

	    object = function () {

	// Parse an object value.

	        var key,
	            object = {};

	        if (ch === '{') {
	            next('{');
	            white();
	            if (ch === '}') {
	                next('}');
	                return object;   // empty object
	            }
	            while (ch) {
	                key = string();
	                white();
	                next(':');
	                if (Object.hasOwnProperty.call(object, key)) {
	                    error('Duplicate key "' + key + '"');
	                }
	                object[key] = value();
	                white();
	                if (ch === '}') {
	                    next('}');
	                    return object;
	                }
	                next(',');
	                white();
	            }
	        }
	        error("Bad object");
	    };

	value = function () {

	// Parse a JSON value. It could be an object, an array, a string, a number,
	// or a word.

	    white();
	    switch (ch) {
	    case '{':
	        return object();
	    case '[':
	        return array();
	    case '"':
	        return string();
	    case '-':
	        return number();
	    default:
	        return ch >= '0' && ch <= '9' ? number() : word();
	    }
	};

	// Return the json_parse function. It will have access to all of the above
	// functions and variables.

	module.exports = function (source, reviver) {
	    var result;
	    
	    text = source;
	    at = 0;
	    ch = ' ';
	    result = value();
	    white();
	    if (ch) {
	        error("Syntax error");
	    }

	    // If there is a reviver function, we recursively walk the new structure,
	    // passing each name/value pair to the reviver function for possible
	    // transformation, starting with a temporary root object that holds the result
	    // in an empty key. If there is not a reviver function, we simply return the
	    // result.

	    return typeof reviver === 'function' ? (function walk(holder, key) {
	        var k, v, value = holder[key];
	        if (value && typeof value === 'object') {
	            for (k in value) {
	                if (Object.prototype.hasOwnProperty.call(value, k)) {
	                    v = walk(value, k);
	                    if (v !== undefined) {
	                        value[k] = v;
	                    } else {
	                        delete value[k];
	                    }
	                }
	            }
	        }
	        return reviver.call(holder, key, value);
	    }({'': result}, '')) : result;
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	    gap,
	    indent,
	    meta = {    // table of character substitutions
	        '\b': '\\b',
	        '\t': '\\t',
	        '\n': '\\n',
	        '\f': '\\f',
	        '\r': '\\r',
	        '"' : '\\"',
	        '\\': '\\\\'
	    },
	    rep;

	function quote(string) {
	    // If the string contains no control characters, no quote characters, and no
	    // backslash characters, then we can safely slap some quotes around it.
	    // Otherwise we must also replace the offending characters with safe escape
	    // sequences.
	    
	    escapable.lastIndex = 0;
	    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	        var c = meta[a];
	        return typeof c === 'string' ? c :
	            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	    }) + '"' : '"' + string + '"';
	}

	function str(key, holder) {
	    // Produce a string from holder[key].
	    var i,          // The loop counter.
	        k,          // The member key.
	        v,          // The member value.
	        length,
	        mind = gap,
	        partial,
	        value = holder[key];
	    
	    // If the value has a toJSON method, call it to obtain a replacement value.
	    if (value && typeof value === 'object' &&
	            typeof value.toJSON === 'function') {
	        value = value.toJSON(key);
	    }
	    
	    // If we were called with a replacer function, then call the replacer to
	    // obtain a replacement value.
	    if (typeof rep === 'function') {
	        value = rep.call(holder, key, value);
	    }
	    
	    // What happens next depends on the value's type.
	    switch (typeof value) {
	        case 'string':
	            return quote(value);
	        
	        case 'number':
	            // JSON numbers must be finite. Encode non-finite numbers as null.
	            return isFinite(value) ? String(value) : 'null';
	        
	        case 'boolean':
	        case 'null':
	            // If the value is a boolean or null, convert it to a string. Note:
	            // typeof null does not produce 'null'. The case is included here in
	            // the remote chance that this gets fixed someday.
	            return String(value);
	            
	        case 'object':
	            if (!value) return 'null';
	            gap += indent;
	            partial = [];
	            
	            // Array.isArray
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	                
	                // Join all of the elements together, separated with commas, and
	                // wrap them in brackets.
	                v = partial.length === 0 ? '[]' : gap ?
	                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
	                    '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	            
	            // If the replacer is an array, use it to select the members to be
	            // stringified.
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    k = rep[i];
	                    if (typeof k === 'string') {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            else {
	                // Otherwise, iterate through all of the keys in the object.
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	            
	        // Join all of the member texts together, separated with commas,
	        // and wrap them in braces.

	        v = partial.length === 0 ? '{}' : gap ?
	            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
	            '{' + partial.join(',') + '}';
	        gap = mind;
	        return v;
	    }
	}

	module.exports = function (value, replacer, space) {
	    var i;
	    gap = '';
	    indent = '';
	    
	    // If the space parameter is a number, make an indent string containing that
	    // many spaces.
	    if (typeof space === 'number') {
	        for (i = 0; i < space; i += 1) {
	            indent += ' ';
	        }
	    }
	    // If the space parameter is a string, it will be used as the indent string.
	    else if (typeof space === 'string') {
	        indent = space;
	    }

	    // If there is a replacer, it must be a function or an array.
	    // Otherwise, throw an error.
	    rep = replacer;
	    if (replacer && typeof replacer !== 'function'
	    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
	        throw new Error('JSON.stringify');
	    }
	    
	    // Make a fake root object containing our value under the key of ''.
	    // Return the result of stringifying the value.
	    return str('', {'': value});
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ajv = __webpack_require__(41);

	var _ajv2 = _interopRequireDefault(_ajv);

	var _Outcome = __webpack_require__(40);

	var _Outcome2 = _interopRequireDefault(_Outcome);

	var _errors = __webpack_require__(7);

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
	    key: 'runExplicitly',
	    value: function runExplicitly() {
	      throw new _errors.CommandNotInitializedError();
	    }
	  }, {
	    key: 'runPromise',
	    value: function runPromise() {
	      throw new _errors.CommandNotInitializedError();
	    }
	  }, {
	    key: '_run',
	    value: function _run(Class) {
	      return function run(inputs) {
	        var validate = _ajv2['default'].compile(Class.schema);
	        var valid = validate(inputs);
	        var result = valid ? Class.execute(inputs) : null;
	        return new _Outcome2['default'](valid, result, validate.errors, inputs);
	      };
	    }
	  }, {
	    key: '_runExplicitly',
	    value: function _runExplicitly(Class) {
	      return function runExplicitly(inputs) {
	        var outcome = Class.run(inputs);

	        if (!outcome.success) throw new _errors.ValidationError(outcome.errors);

	        return outcome.result;
	      };
	    }
	  }, {
	    key: '_runPromise',
	    value: function _runPromise(Class) {
	      return function runPromise(inputs) {
	        return new Promise(function promise(resolve, reject) {
	          var outcome = Class.run(inputs);

	          if (!outcome.success) reject(outcome.errors);

	          resolve(outcome.result);
	        });
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _ajv = __webpack_require__(8);

	var _ajv2 = _interopRequireDefault(_ajv);

	exports['default'] = new _ajv2['default']({
	  allErrors: true,
	  removeAdditional: true
	});
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(2);

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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(2);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(2);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _es6Error = __webpack_require__(2);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	var ValidationError = (function (_ExtendableError) {
	  _inherits(ValidationError, _ExtendableError);

	  function ValidationError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Invalid inputs' : arguments[0];

	    _classCallCheck(this, ValidationError);

	    _get(Object.getPrototypeOf(ValidationError.prototype), 'constructor', this).call(this, message);
	  }

	  return ValidationError;
	})(_es6Error2['default']);

	exports['default'] = ValidationError;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = {
		"id": "http://json-schema.org/draft-04/schema#",
		"$schema": "http://json-schema.org/draft-04/schema#",
		"description": "Core schema meta-schema",
		"definitions": {
			"schemaArray": {
				"type": "array",
				"minItems": 1,
				"items": {
					"$ref": "#"
				}
			},
			"positiveInteger": {
				"type": "integer",
				"minimum": 0
			},
			"positiveIntegerDefault0": {
				"allOf": [
					{
						"$ref": "#/definitions/positiveInteger"
					},
					{
						"default": 0
					}
				]
			},
			"simpleTypes": {
				"enum": [
					"array",
					"boolean",
					"integer",
					"null",
					"number",
					"object",
					"string"
				]
			},
			"stringArray": {
				"type": "array",
				"items": {
					"type": "string"
				},
				"minItems": 1,
				"uniqueItems": true
			}
		},
		"type": "object",
		"properties": {
			"id": {
				"type": "string",
				"format": "uri"
			},
			"$schema": {
				"type": "string",
				"format": "uri"
			},
			"title": {
				"type": "string"
			},
			"description": {
				"type": "string"
			},
			"default": {},
			"multipleOf": {
				"type": "number",
				"minimum": 0,
				"exclusiveMinimum": true
			},
			"maximum": {
				"type": "number"
			},
			"exclusiveMaximum": {
				"type": "boolean",
				"default": false
			},
			"minimum": {
				"type": "number"
			},
			"exclusiveMinimum": {
				"type": "boolean",
				"default": false
			},
			"maxLength": {
				"$ref": "#/definitions/positiveInteger"
			},
			"minLength": {
				"$ref": "#/definitions/positiveIntegerDefault0"
			},
			"pattern": {
				"type": "string",
				"format": "regex"
			},
			"additionalItems": {
				"anyOf": [
					{
						"type": "boolean"
					},
					{
						"$ref": "#"
					}
				],
				"default": {}
			},
			"items": {
				"anyOf": [
					{
						"$ref": "#"
					},
					{
						"$ref": "#/definitions/schemaArray"
					}
				],
				"default": {}
			},
			"maxItems": {
				"$ref": "#/definitions/positiveInteger"
			},
			"minItems": {
				"$ref": "#/definitions/positiveIntegerDefault0"
			},
			"uniqueItems": {
				"type": "boolean",
				"default": false
			},
			"maxProperties": {
				"$ref": "#/definitions/positiveInteger"
			},
			"minProperties": {
				"$ref": "#/definitions/positiveIntegerDefault0"
			},
			"required": {
				"$ref": "#/definitions/stringArray"
			},
			"additionalProperties": {
				"anyOf": [
					{
						"type": "boolean"
					},
					{
						"$ref": "#"
					}
				],
				"default": {}
			},
			"definitions": {
				"type": "object",
				"additionalProperties": {
					"$ref": "#"
				},
				"default": {}
			},
			"properties": {
				"type": "object",
				"additionalProperties": {
					"$ref": "#"
				},
				"default": {}
			},
			"patternProperties": {
				"type": "object",
				"additionalProperties": {
					"$ref": "#"
				},
				"default": {}
			},
			"dependencies": {
				"type": "object",
				"additionalProperties": {
					"anyOf": [
						{
							"$ref": "#"
						},
						{
							"$ref": "#/definitions/stringArray"
						}
					]
				}
			},
			"enum": {
				"type": "array",
				"minItems": 1,
				"uniqueItems": true
			},
			"type": {
				"anyOf": [
					{
						"$ref": "#/definitions/simpleTypes"
					},
					{
						"type": "array",
						"items": {
							"$ref": "#/definitions/simpleTypes"
						},
						"minItems": 1,
						"uniqueItems": true
					}
				]
			},
			"allOf": {
				"$ref": "#/definitions/schemaArray"
			},
			"anyOf": {
				"$ref": "#/definitions/schemaArray"
			},
			"oneOf": {
				"$ref": "#/definitions/schemaArray"
			},
			"not": {
				"$ref": "#"
			}
		},
		"dependencies": {
			"exclusiveMaximum": [
				"maximum"
			],
			"exclusiveMinimum": [
				"minimum"
			]
		},
		"default": {}
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ }
/******/ ])
});
;