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
                slient: true,
                env: this.env || {}
            }, {
                error: function error(err) {
                    console.trace(err);
                }
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
//# sourceMappingURL=data:application/json;base64,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QVcsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFHLE1BQUssWUFBWSxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ3ZGLHlCQUFLLFdBQVc7QUFDWiwrQkFBTyx1QkFBUyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUNwRCx5QkFBSyxPQUFPO0FBQ1IsK0JBQU8sMEJBQVksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsaUJBQzNEO2FBQ0osQ0FBQyxDQUFDO1NBQ047OztlQUNNLG1CQUFHO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNqQzs7O2VBQ1Msc0JBQUU7QUFDUixnQkFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7OztlQUNNLGlCQUFDLFFBQVEsRUFBQztBQUNiLGdCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3Qjs7O1dBeERnQixZQUFZOzs7cUJBQVosWUFBWSIsImZpbGUiOiJtb2NoYS9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2NoYSBmcm9tIFwibW9jaGFcIjtcclxuaW1wb3J0IHByb2Nlc3NvciBmcm9tIFwiLi4vdXRpbHMvcHJvY2Vzc29yXCI7XHJcbmltcG9ydCBtYWtlU3VpdGUgZnJvbSBcIi4uL3V0aWxzL21ha2Utc3VpdGVzXCI7XHJcbmltcG9ydCB7YmVnaW4sIGRvbmUsIGVuZFN1aXRlLCBzdGFydFRlc3QsIGZpbmlzaFRlc3QsIHJlc3RhcnQsIGhhbmRsZUVycm9yfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5pbXBvcnQgQWJzdHJhY3RSdW50aW1lIGZyb20gXCIuLi9BYnN0cmFjdFJ1bnRpbWVcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vY2hhUnVudGltZSBleHRlbmRzIEFic3RyYWN0UnVudGltZXtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JlLCB7Y29tcGlsZXIsIGVudiwgZXhwYW5kQW55d2F5fSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XHJcbiAgICAgICAgdGhpcy5jb21waWxlciA9IGNvbXBpbGVyO1xyXG4gICAgICAgIHRoaXMuZW52ID0gZW52O1xyXG4gICAgICAgIHRoaXMuZXhwYW5kQW55d2F5ID0gZXhwYW5kQW55d2F5O1xyXG4gICAgICAgIHRoaXMubW9jaGEgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICBjb25zdCB7c3RvcmUsIGZpbGVzfSA9ICB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG1vY2hhUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdtb2NoYS1wcm9jZXNzLmpzJyk7XHJcbiAgICAgICAgaWYodGhpcy5tb2NoYSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcclxuICAgICAgICAgIHRoaXMubW9jaGEua2lsbCgpO1xyXG4gICAgICAgICAgdGhpcy5tb2NoYSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9jaGEgPSAgcHJvY2Vzcy5mb3JrKG1vY2hhUGF0aCwgW3RoaXMuY29tcGlsZXJdLmNvbmNhdCh0aGlzLmZpbGVzKSwge1xyXG4gICAgICAgICAgICBzbGllbnQgOiB0cnVlLFxyXG4gICAgICAgICAgICBlbnYgOiB0aGlzLmVudiB8fCB7fVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS50cmFjZShlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzdGFydChzdG9yZSk7XHJcbiAgICAgICAgdGhpcy5tb2NoYS5vbihcInVuY2F1Z2h0RXhjZXB0aW9uXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW9jaGEub24oXCJtZXNzYWdlXCIsIChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGFjdGlvbi5tZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUdJTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4oc3RvcmUsIHsgZGF0YSA6IHByb2Nlc3NvcihbbWFrZVN1aXRlKGFjdGlvbi5kYXRhKV0pfSApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vY2hhID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShzdG9yZSwgeyBkYXRhIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RBUlRfVEVTVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhLCBleHBhbmRBbnl3YXkgOiB0aGlzLmV4cGFuZEFueXdheSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVUlURV9FTkRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZFN1aXRlKHN0b3JlLCB7IHN1aXRlIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVJST1JcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKHN0b3JlLCB7IGVycm9yIDogYWN0aW9uLmVycm9yIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjbGVhbnVwKCkge1xyXG4gICAgICB0aGlzLm1vY2hhLnJlbW92ZUFsbExpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJGaWxlcygpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZEZpbGUoZmlsZVBhdGgpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlUGF0aCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
