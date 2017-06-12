"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _utilsProcessor = require("../utils/processor");

var _utilsProcessor2 = _interopRequireDefault(_utilsProcessor);

var _utilsMakeSuites = require("../utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

var _actions = require("../actions");

var _child_process = require("child_process");

var proc = _interopRequireWildcard(_child_process);

var _AbstractRuntime2 = require("../AbstractRuntime");

var _AbstractRuntime3 = _interopRequireDefault(_AbstractRuntime2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var MochaRuntime = (function (_AbstractRuntime) {
    _inherits(MochaRuntime, _AbstractRuntime);

    function MochaRuntime(store, _ref) {
        var compiler = _ref.compiler;
        var env = _ref.env;
        var expandAnyway = _ref.expandAnyway;

        _classCallCheck(this, MochaRuntime);

        _get(Object.getPrototypeOf(MochaRuntime.prototype), "constructor", this).call(this);
        this.store = store;
        this.compiler = compiler;
        this.env = env;
        this.expandAnyway = expandAnyway;
        this.mocha = null;
    }

    _createClass(MochaRuntime, [{
        key: "start",
        value: function start() {
            var _this = this;

            var store = this.store;
            var files = this.files;

            var mochaPath = _path2["default"].join(__dirname, 'mocha-process.js');
            if (this.mocha !== null) {
                this.cleanup();
                this.mocha.kill();
                this.mocha = null;
            }

            var processOptions = {
                slient: false,
                env: this.env || {}
            };

            if (process.platform !== "win32") {
                processOptions.cwd = "/";
            }

            this.mocha = proc.fork(mochaPath, [this.compiler].concat(this.files), processOptions);

            (0, _actions.restart)(store);
            this.mocha.on("uncaughtException", function () {
                console.log('error');
            });
            this.mocha.on("message", function (action) {
                switch (action.message) {
                    case "BEGIN":
                        return (0, _actions.begin)(store, { data: (0, _utilsProcessor2["default"])([(0, _utilsMakeSuites2["default"])(action.data)]) });
                    case "END":
                        _this.cleanup();
                        _this.mocha = null;
                        return (0, _actions.done)(store, { data: action.data });
                    case "START_TEST":
                        return (0, _actions.startTest)(store, { test: action.data });
                    case "END_TEST":
                        return (0, _actions.finishTest)(store, { test: action.data, expandAnyway: _this.expandAnyway });
                    case "SUITE_END":
                        return (0, _actions.endSuite)(store, { suite: action.data });
                    case "ERROR":
                        return (0, _actions.handleError)(store, { error: action.error });
                    case "BEFORE_ALL":
                        return (0, _actions.handleHookFailed)(store, action.data);
                    case "AFTER_ALL":
                        return (0, _actions.handleHookFailed)(store, action.data);
                    case "BEFORE_EACH":
                        return (0, _actions.handleEachHookFailed)(store, action.data);
                    case "AFTER_EACH":
                        return (0, _actions.handleEachHookFailed)(store, action.data);
                }
            });
        }
    }, {
        key: "cleanup",
        value: function cleanup() {
            this.mocha.removeAllListeners();
        }
    }, {
        key: "clearFiles",
        value: function clearFiles() {
            this.files = [];
        }
    }, {
        key: "addFile",
        value: function addFile(filePath) {
            this.files.push(filePath);
        }
    }]);

    return MochaRuntime;
})(_AbstractRuntime3["default"]);

exports["default"] = MochaRuntime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf8;base64,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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9jaGEgZnJvbSBcIm1vY2hhXCI7XHJcbmltcG9ydCBwcm9jZXNzb3IgZnJvbSBcIi4uL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBlbmRTdWl0ZSwgc3RhcnRUZXN0LCBmaW5pc2hUZXN0LCByZXN0YXJ0LCBoYW5kbGVFcnJvciwgaGFuZGxlSG9va0ZhaWxlZCwgaGFuZGxlRWFjaEhvb2tGYWlsZWR9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCAqIGFzIHByb2MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IEFic3RyYWN0UnVudGltZSBmcm9tIFwiLi4vQWJzdHJhY3RSdW50aW1lXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2NoYVJ1bnRpbWUgZXh0ZW5kcyBBYnN0cmFjdFJ1bnRpbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yZSwge2NvbXBpbGVyLCBlbnYsIGV4cGFuZEFueXdheX0pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xyXG4gICAgICAgIHRoaXMuY29tcGlsZXIgPSBjb21waWxlcjtcclxuICAgICAgICB0aGlzLmVudiA9IGVudjtcclxuICAgICAgICB0aGlzLmV4cGFuZEFueXdheSA9IGV4cGFuZEFueXdheTtcclxuICAgICAgICB0aGlzLm1vY2hhID0gbnVsbDtcclxuICAgIH1cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgY29uc3Qge3N0b3JlLCBmaWxlc30gPSAgdGhpcztcclxuICAgICAgICBjb25zdCBtb2NoYVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbW9jaGEtcHJvY2Vzcy5qcycpO1xyXG4gICAgICAgIGlmKHRoaXMubW9jaGEgIT09IG51bGwpe1xyXG4gICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XHJcbiAgICAgICAgICB0aGlzLm1vY2hhLmtpbGwoKTtcclxuICAgICAgICAgIHRoaXMubW9jaGEgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvY2Vzc09wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNsaWVudCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbnYgOiB0aGlzLmVudiB8fCB7fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKHByb2Nlc3MucGxhdGZvcm0gIT09IFwid2luMzJcIil7XHJcbiAgICAgICAgICBwcm9jZXNzT3B0aW9ucy5jd2QgPSBcIi9cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubW9jaGEgPSAgcHJvYy5mb3JrKG1vY2hhUGF0aCwgW3RoaXMuY29tcGlsZXJdLmNvbmNhdCh0aGlzLmZpbGVzKSwgcHJvY2Vzc09wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXN0YXJ0KHN0b3JlKTtcclxuICAgICAgICB0aGlzLm1vY2hhLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tb2NoYS5vbihcIm1lc3NhZ2VcIiwgKGFjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2goYWN0aW9uLm1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFR0lOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWdpbihzdG9yZSwgeyBkYXRhIDogcHJvY2Vzc29yKFttYWtlU3VpdGUoYWN0aW9uLmRhdGEpXSl9ICk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9jaGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKHN0b3JlLCB7IGRhdGEgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVEFSVF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0VGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EX1RFU1RcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoVGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEsIGV4cGFuZEFueXdheSA6IHRoaXMuZXhwYW5kQW55d2F5IH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlNVSVRFX0VORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kU3VpdGUoc3RvcmUsIHsgc3VpdGUgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJFUlJPUlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlRXJyb3Ioc3RvcmUsIHsgZXJyb3IgOiBhY3Rpb24uZXJyb3IgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQkVGT1JFX0FMTFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlSG9va0ZhaWxlZChzdG9yZSwgYWN0aW9uLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkFGVEVSX0FMTFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlSG9va0ZhaWxlZChzdG9yZSwgYWN0aW9uLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFRk9SRV9FQUNIXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVFYWNoSG9va0ZhaWxlZChzdG9yZSwgYWN0aW9uLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkFGVEVSX0VBQ0hcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlRWFjaEhvb2tGYWlsZWQoc3RvcmUsIGFjdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2xlYW51cCgpIHtcclxuICAgICAgdGhpcy5tb2NoYS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuICAgIGNsZWFyRmlsZXMoKXtcclxuICAgICAgICB0aGlzLmZpbGVzID0gW107XHJcbiAgICB9XHJcbiAgICBhZGRGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZVBhdGgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
