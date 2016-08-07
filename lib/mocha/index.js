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
    }

    _createClass(MochaRuntime, [{
        key: "start",
        value: function start() {
            var _this = this;

            var store = this.store;
            var files = this.files;

            var mochaPath = _path2["default"].join(__dirname, 'mocha-process.js');
            var mocha = _child_process2["default"].fork(mochaPath, [this.compiler].concat(this.files), {
                slient: true,
                env: this.env || {}
            }, {
                error: function error(err) {
                    console.trace(err);
                }
            });
            (0, _actions.restart)(store);
            mocha.on("uncaughtException", function () {
                console.log('error');
            });
            mocha.on("message", function (action) {
                switch (action.message) {
                    case "BEGIN":
                        return (0, _actions.begin)(store, { data: (0, _utilsProcessor2["default"])([(0, _utilsMakeSuites2["default"])(action.data)]) });
                    case "END":
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
//# sourceMappingURL=data:application/json;base64,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aUJBQzNEO2FBQ0osQ0FBQyxDQUFDO1NBQ047OztlQUNTLHNCQUFFO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7ZUFDTSxpQkFBQyxRQUFRLEVBQUM7QUFDYixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7OztXQTdDZ0IsWUFBWTs7O3FCQUFaLFlBQVkiLCJmaWxlIjoibW9jaGEvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9jaGEgZnJvbSBcIm1vY2hhXCI7XHJcbmltcG9ydCBwcm9jZXNzb3IgZnJvbSBcIi4uL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBlbmRTdWl0ZSwgc3RhcnRUZXN0LCBmaW5pc2hUZXN0LCByZXN0YXJ0LCBoYW5kbGVFcnJvcn0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IEFic3RyYWN0UnVudGltZSBmcm9tIFwiLi4vQWJzdHJhY3RSdW50aW1lXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2NoYVJ1bnRpbWUgZXh0ZW5kcyBBYnN0cmFjdFJ1bnRpbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yZSwge2NvbXBpbGVyLCBlbnYsIGV4cGFuZEFueXdheX0pe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xyXG4gICAgICAgIHRoaXMuY29tcGlsZXIgPSBjb21waWxlcjtcclxuICAgICAgICB0aGlzLmVudiA9IGVudjtcclxuICAgICAgICB0aGlzLmV4cGFuZEFueXdheSA9IGV4cGFuZEFueXdheTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgY29uc3Qge3N0b3JlLCBmaWxlc30gPSAgdGhpcztcclxuICAgICAgICBjb25zdCBtb2NoYVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbW9jaGEtcHJvY2Vzcy5qcycpO1xyXG4gICAgICAgIGNvbnN0IG1vY2hhID0gIHByb2Nlc3MuZm9yayhtb2NoYVBhdGgsIFt0aGlzLmNvbXBpbGVyXS5jb25jYXQodGhpcy5maWxlcyksIHtcclxuICAgICAgICAgICAgc2xpZW50IDogdHJ1ZSxcclxuICAgICAgICAgICAgZW52IDogdGhpcy5lbnYgfHwge31cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3RhcnQoc3RvcmUpO1xyXG4gICAgICAgIG1vY2hhLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbW9jaGEub24oXCJtZXNzYWdlXCIsIChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGFjdGlvbi5tZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUdJTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4oc3RvcmUsIHsgZGF0YSA6IHByb2Nlc3NvcihbbWFrZVN1aXRlKGFjdGlvbi5kYXRhKV0pfSApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShzdG9yZSwgeyBkYXRhIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RBUlRfVEVTVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhLCBleHBhbmRBbnl3YXkgOiB0aGlzLmV4cGFuZEFueXdheSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVUlURV9FTkRcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZFN1aXRlKHN0b3JlLCB7IHN1aXRlIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRVJST1JcIiA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKHN0b3JlLCB7IGVycm9yIDogYWN0aW9uLmVycm9yIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjbGVhckZpbGVzKCl7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVQYXRoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
