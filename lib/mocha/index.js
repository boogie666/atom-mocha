"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var _child_process2 = _interopRequireDefault(_child_process);

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
            this.mocha = _child_process2["default"].fork(mochaPath, [this.compiler].concat(this.files), {
                slient: false,
                env: this.env || {}
            });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUN2Rix5QkFBSyxXQUFXO0FBQ1osK0JBQU8sdUJBQVMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDcEQseUJBQUssT0FBTztBQUNSLCtCQUFPLDBCQUFZLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ3hELHlCQUFLLFlBQVk7QUFDYiwrQkFBTywrQkFBaUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLEFBQ2hELHlCQUFLLFdBQVc7QUFDWiwrQkFBTywrQkFBaUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLEFBQ2hELHlCQUFLLGFBQWE7QUFDZCwrQkFBTyxtQ0FBcUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLEFBQ3BELHlCQUFLLFlBQVk7QUFDYiwrQkFBTyxtQ0FBcUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUFBLGlCQUN2RDthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFDTSxtQkFBRztBQUNSLGdCQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDakM7OztlQUNTLHNCQUFFO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7ZUFDTSxpQkFBQyxRQUFRLEVBQUM7QUFDYixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7OztXQTdEZ0IsWUFBWTs7O3FCQUFaLFlBQVkiLCJmaWxlIjoibW9jaGEvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9jaGEgZnJvbSBcIm1vY2hhXCI7XHJcbmltcG9ydCBwcm9jZXNzb3IgZnJvbSBcIi4uL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBlbmRTdWl0ZSwgc3RhcnRUZXN0LCBmaW5pc2hUZXN0LCByZXN0YXJ0LCBoYW5kbGVFcnJvciwgaGFuZGxlSG9va0ZhaWxlZCwgaGFuZGxlRWFjaEhvb2tGYWlsZWR9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCBBYnN0cmFjdFJ1bnRpbWUgZnJvbSBcIi4uL0Fic3RyYWN0UnVudGltZVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9jaGFSdW50aW1lIGV4dGVuZHMgQWJzdHJhY3RSdW50aW1le1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmUsIHtjb21waWxlciwgZW52LCBleHBhbmRBbnl3YXl9KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICAgICAgICB0aGlzLmNvbXBpbGVyID0gY29tcGlsZXI7XHJcbiAgICAgICAgdGhpcy5lbnYgPSBlbnY7XHJcbiAgICAgICAgdGhpcy5leHBhbmRBbnl3YXkgPSBleHBhbmRBbnl3YXk7XHJcbiAgICAgICAgdGhpcy5tb2NoYSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGNvbnN0IHtzdG9yZSwgZmlsZXN9ID0gIHRoaXM7XHJcbiAgICAgICAgY29uc3QgbW9jaGFQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ21vY2hhLXByb2Nlc3MuanMnKTtcclxuICAgICAgICBpZih0aGlzLm1vY2hhICE9PSBudWxsKXtcclxuICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xyXG4gICAgICAgICAgdGhpcy5tb2NoYS5raWxsKCk7XHJcbiAgICAgICAgICB0aGlzLm1vY2hhID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2NoYSA9ICBwcm9jZXNzLmZvcmsobW9jaGFQYXRoLCBbdGhpcy5jb21waWxlcl0uY29uY2F0KHRoaXMuZmlsZXMpLCB7XHJcbiAgICAgICAgICAgIHNsaWVudCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbnYgOiB0aGlzLmVudiB8fCB7fSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzdGFydChzdG9yZSk7XHJcbiAgICAgICAgdGhpcy5tb2NoYS5vbihcInVuY2F1Z2h0RXhjZXB0aW9uXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW9jaGEub24oXCJtZXNzYWdlXCIsIChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGFjdGlvbi5tZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUdJTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4oc3RvcmUsIHsgZGF0YSA6IHByb2Nlc3NvcihbbWFrZVN1aXRlKGFjdGlvbi5kYXRhKV0pfSApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vY2hhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShzdG9yZSwgeyBkYXRhIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RBUlRfVEVTVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhLCBleHBhbmRBbnl3YXkgOiB0aGlzLmV4cGFuZEFueXdheSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVUlURV9FTkRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZFN1aXRlKHN0b3JlLCB7IHN1aXRlIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVJST1JcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKHN0b3JlLCB7IGVycm9yIDogYWN0aW9uLmVycm9yIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFRk9SRV9BTExcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUhvb2tGYWlsZWQoc3RvcmUsIGFjdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJBRlRFUl9BTExcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUhvb2tGYWlsZWQoc3RvcmUsIGFjdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUZPUkVfRUFDSFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlRWFjaEhvb2tGYWlsZWQoc3RvcmUsIGFjdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJBRlRFUl9FQUNIXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVhY2hIb29rRmFpbGVkKHN0b3JlLCBhY3Rpb24uZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsZWFudXAoKSB7XHJcbiAgICAgIHRoaXMubW9jaGEucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBjbGVhckZpbGVzKCl7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVQYXRoKTtcclxuICAgIH1cclxufVxyXG4iXX0=
