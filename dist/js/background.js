/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 459);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var getDB = exports.getDB = function getDB(key, callback) {
	if (callback) {
		var indexedDB = window.indexedDB;
		var open = indexedDB.open('NooBoss', 1);
		open.onupgradeneeded = function () {
			var db = open.result;
			var store = db.createObjectStore('Store', { keyPath: 'key' });
		};
		open.onsuccess = function () {
			var db = open.result;
			var tx = db.transaction('Store', 'readwrite');
			var store = tx.objectStore('Store');
			var action = store.get(key);
			action.onsuccess = function (e) {
				if (e.target.result) {
					callback(e.target.result.value);
				} else {
					callback(null);
				}
			};
			action.onerror = function () {
				console.log('getDB fail');
			};
		};
	}
};

var setDB = exports.setDB = function setDB(key, value, callback) {
	var indexedDB = window.indexedDB;
	var open = indexedDB.open('NooBoss', 1);
	open.onupgradeneeded = function () {
		var db = open.result;
		var store = db.createObjectStore('Store', { keyPath: 'key' });
	};
	open.onsuccess = function () {
		var db = open.result;
		var tx = db.transaction('Store', 'readwrite');
		var store = tx.objectStore('Store');
		var action = store.put({ key: key, value: value });
		action.onsuccess = function () {
			if (callback) {
				callback();
			}
		};
		action.onerror = function () {
			console.log('setDB fail');
		};
	};
};

var getParameterByName = exports.getParameterByName = function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var getString = exports.getString = function getString(elem) {
	if (elem === undefined || elem === null) {
		return '';
	} else {
		return elem.toString();
	}
};

var capFirst = exports.capFirst = function capFirst(elem) {
	var str = getString(elem);
	return str.charAt(0).toUpperCase() + str.slice(1);
};

var GL = exports.GL = function GL(string) {
	return chrome.i18n.getMessage(string);
};

var get = exports.get = function get(key, callback) {
	chrome.storage.sync.get(key, function (result) {
		if (callback) callback(result[key]);
	});
};

var isOn = exports.isOn = function isOn(key, callbackTrue, callbackFalse, param) {
	get(key, function (value) {
		if (value == '1' || value == true) {
			if (callbackTrue) {
				callbackTrue(param);
			}
		} else {
			if (callbackFalse) {
				callbackFalse(param);
			}
		}
	});
};

var set = exports.set = function set(key, value, callback) {
	var temp = {};
	temp[key] = value;
	chrome.storage.sync.set(temp, callback);
};

var setIfNull = exports.setIfNull = function setIfNull(key, setValue, callback) {
	get(key, function (value) {
		if (value == undefined || value == null) {
			set(key, setValue, callback);
		} else {
			if (callback) {
				callback();
			}
		}
	});
};

var generateRGBAString = exports.generateRGBAString = function generateRGBAString(rgbaObject) {
	return 'rgba(' + rgbaObject.r + ',' + rgbaObject.g + ',' + rgbaObject.b + ',' + rgbaObject.a + ')';
};

var sendMessage = exports.sendMessage = function sendMessage(message) {
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	chrome.runtime.sendMessage(message, callback);
};

var alerty = exports.alerty = function alerty(text, mainColor, callbackConfirm, callbackCancel) {
	var alertHolder = document.createElement('div');
	var alertDiv = document.createElement('div');
	var texty = document.createElement('div');
	texty.innerHTML = text;
	var confirmy = document.createElement('button');
	confirmy.innerHTML = GL('confirm');
	confirmy.onclick = function () {
		if (callbackConfirm) {
			callbackConfirm();
		}
		document.body.removeChild(alertHolder);
	};
	var cancely = document.createElement('button');
	cancely.innerHTML = GL('cancel');
	cancely.onclick = function () {
		if (callbackCancel) {
			callbackCancel();
		}
		document.body.removeChild(alertHolder);
	};

	alertHolder.style.position = 'fixed';
	alertHolder.style.width = '100%';
	alertHolder.style.height = '100%';
	alertHolder.style.top = '0';
	alertHolder.style.background = 'rgba(0,0,0,0.4)';

	alertDiv.style.width = '300px';
	alertDiv.style.padding = '13px';
	alertDiv.style.marginLeft = '250px';
	alertDiv.style.marginTop = '100px';
	alertDiv.style.textAlign = 'center';
	alertDiv.style.backgroundColor = 'white';

	texty.style.fontSize = 'large';
	texty.style.marginBottom = '13px';

	confirmy.style.border = 'none';
	confirmy.style.color = 'white';
	confirmy.style.padding = '2px 8px';
	confirmy.style.cursor = 'pointer';
	confirmy.style.outline = 'none';
	confirmy.style.backgroundColor = mainColor;

	cancely.style.border = 'none';
	cancely.style.color = 'white';
	cancely.style.padding = '2px 8px';
	cancely.style.cursor = 'pointer';
	cancely.style.outline = 'none';
	cancely.style.backgroundColor = mainColor;
	cancely.style.marginLeft = '30px';

	alertDiv.appendChild(texty);
	alertDiv.appendChild(confirmy);
	alertDiv.appendChild(cancely);
	alertHolder.appendChild(alertDiv);
	document.body.appendChild(alertHolder);
};

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _values = __webpack_require__(460);

var _Options = __webpack_require__(461);

var _Options2 = _interopRequireDefault(_Options);

var _Bello = __webpack_require__(462);

var _Bello2 = _interopRequireDefault(_Bello);

var _utils = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NooBoss = {
	defaultValues: _values.defaultValues,
	constantValues: _values.constantValues
};
window.NooBoss = NooBoss;

NooBoss.initiate = function () {
	NooBoss.Options = (0, _Options2.default)(NooBoss);
	NooBoss.Options.initiate();
	NooBoss.Bello = (0, _Bello2.default)(NooBoss);
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		switch (message.job) {
			case 'bello':
				NooBoss.Bello.bello(message.bananana);
				break;
			case 'set':
				(0, _utils.set)(message.key, message.value);
				(0, _utils.isOn)('bello', NooBoss.Bello.bello.bind(null, { category: 'Options', action: 'set', label: message.key }));
				break;
			case 'reset':
				NooBoss.Options.resetOptions();
				NooBoss.Options.resetIndexedDB(function () {
					NooBoss.Management.init();
					NooBoss.History.init();
				});
				break;
			case 'clearHistory':
				console.log(sender);
				(0, _utils.set)('history_records', [], function () {
					chrome.runtime.sendMessage({ job: 'popupOptionsInitiate' });
					chrome.notifications.create({
						type: 'basic',
						iconUrl: '/images/icon_128.png',
						title: (0, _utils.GL)(''),
						message: (0, _utils.GL)('')
					});
				});
				break;
			case 'toggleAutoState':
				break;
			case 'updateAutoStateRules':
				break;
			case 'updateGroupList':
				break;
		}
	});
};

document.addEventListener('DOMContentLoaded', NooBoss.initiate);

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaultValues = exports.defaultValues = {
	userId: (Math.random().toString(36) + '00000000000000000').slice(2, 19),
	notifyStateChange: true,
	notifyInstallation: true,
	notifyRemoval: true,
	historyInstall: true,
	historyRemoval: true,
	historyUpdate: true,
	historyEnable: true,
	historyDisable: true,
	autoState: true,
	autoStateNotification: true,
	autoStateRules: [],
	sortOrder: 'nameState',
	bello: true,
	joinCommunity: true,
	notificationDuration_autoState: 5,
	notificationDuration_stateChange: 5,
	notificationDuration_installation: -1,
	notificationDuration_removal: -1,
	listView: true,
	sendUsage: true,
	groupList: [],
	mainColor: { r: 185, g: 7, b: 168, a: 1 },
	subColor: { r: 0, g: 0, b: 0, a: 1 },
	extensions: true,
	userscripts: true,
	extensionsJoinCommunity: true,
	userscriptsJoinCommunity: true
};

var constantValues = exports.constantValues = {
	version: '0.1.5.0'
};

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(20);

exports.default = function (NooBoss) {
	return {
		initiate: function initiate() {
			NooBoss.Options.initiateDefaultValues();
			NooBoss.Options.initiateConstantValues();
		},
		initiateDefaultValues: function initiateDefaultValues() {
			var keyList = Object.keys(NooBoss.defaultValues);

			var _loop = function _loop(i) {
				var key = keyList[i];
				(0, _utils.setIfNull)(key, NooBoss.defaultValues[key], function () {
					// if is autoState, change it from string to array
					if (key == 'autoStateRules') {
						(0, _utils.get)(key, function (value) {
							if (typeof value == 'string') {
								(0, _utils.set)(key, JSON.parse(value));
							}
						});
					}
				});
			};

			for (var i = 0; i < keyList.length; i++) {
				_loop(i);
			}
		},
		initiateConstantValues: function initiateConstantValues() {
			var keyList = Object.keys(NooBoss.constantValues);
			for (var i = 0; i < keyList.length; i++) {
				var _key = keyList[i];
				(0, _utils.set)(_key, NooBoss.constantValues[_key]);
			}
		},
		resetOptions: function resetOptions() {
			var temp = void 0;
			for (var i = 1; i < NooBoss.defaultValues.length; i++) {
				temp = NooBoss.defaultValues[i];
				(0, _utils.set)(temp[0], temp[1]);
			}
		},
		resetIndexedDB: function resetIndexedDB(callback) {
			var req = window.indexedDB.deleteDatabase('NooBoss');
			req.onerror = function (e) {
				console.log(e);
			};
			if (callback) {
				req.onsuccess = callback;
			}
		},
		set: function set(name, value, callback) {
			(0, _utils.set)(name, value, callback);
		}
	};
};

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (NooBoss) {
	return {
		belloOnce: false,
		history: {},
		bananana: {
			path: NooBoss.constantValues.version,
			title: 'NooBoss ' + NooBoss.constantValues.version,
			referrer: '',
			ua: navigator.userAgent,
			sr: screen.width + 'x' + screen.height,
			ul: navigator.language || navigator.userLanguage
		},
		bello: function bello(obj) {
			var id = '' + obj.category + '_' + obj.action + '_' + obj.label;
			if (NooBoss.Bello.history[id] && NooBoss.Bello.history[id] + 10000 > new Date().getTime()) {
				NooBoss.Bello.history[id] = new Date().getTime();
				return;
			}
			NooBoss.Bello.history[id] = new Date().getTime();
			var data = JSON.parse(JSON.stringify(NooBoss.Bello.bananana));
			if (!NooBoss.Bello.belloOnce) {
				NooBoss.Bello.belloOnce = true;
				data = _extends({}, data, {
					type: 'pageview',
					ainoob: Math.random()
				});
				NooBoss.Bello.ajax('https://ainoob.com/bello/nooboss' + NooBoss.Bello.serialize(data));
			}
			data = JSON.parse(JSON.stringify(NooBoss.Bello.bananana));
			data = _extends({}, data, {
				type: 'event',
				category: obj.category,
				action: obj.action,
				label: obj.label,
				value: obj.value || 0,
				ainoob: Math.random()
			});
			NooBoss.Bello.ajax('https://ainoob.com/bello/nooboss' + NooBoss.Bello.serialize(data));
		},
		ajax: function ajax(url) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					console.log(request.responseText);
				}
			};
			request.send();
		},
		serialize: function serialize(obj) {
			return '?' + Object.keys(obj).reduce(function (a, k) {
				a.push(k + '=' + encodeURIComponent(obj[k]));return a;
			}, []).join('&');
		}
	};
};

/***/ })

/******/ });