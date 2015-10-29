"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _phantomjs = require("phantomjs");

var _child_process = require("child_process");

var _AbstractRuntime2 = require("../AbstractRuntime");

var _AbstractRuntime3 = _interopRequireDefault(_AbstractRuntime2);

var QUnitRuntime = (function (_AbstractRuntime) {
    _inherits(QUnitRuntime, _AbstractRuntime);

    function QUnitRuntime() {
        _classCallCheck(this, QUnitRuntime);

        _get(Object.getPrototypeOf(QUnitRuntime.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(QUnitRuntime, [{
        key: "start",
        value: function start() {
            //phantomjs [phantom arguments] runner.js [url-of-your-qunit-testsuite] [timeout-in-seconds]
            var qunitProc = (0, _child_process.execFile)(_phantomjs.path, [__dirname + "\\qunit-runner.js", __dirname + "\\qunit-tests.html"], function () {
                console.log.apply(console, arguments);
            });

            qunitProc.on("message", function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                console.log.apply(console, ["Message: "].concat(args));
            });
        }
    }]);

    return QUnitRuntime;
})(_AbstractRuntime3["default"]);

exports["default"] = QUnitRuntime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1bml0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBQW1CLFdBQVc7OzZCQUNQLGVBQWU7O2dDQUNWLG9CQUFvQjs7OztJQUUzQixZQUFZO2NBQVosWUFBWTs7YUFBWixZQUFZOzhCQUFaLFlBQVk7O21DQUFaLFlBQVk7OztpQkFBWixZQUFZOztlQUN4QixpQkFBRTs7QUFFSCxnQkFBTSxTQUFTLEdBQUcsOENBQWUsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLEVBQUUsU0FBUyxHQUFHLG9CQUFvQixDQUFDLEVBQUUsWUFBYTtBQUMvRyx1QkFBTyxDQUFDLEdBQUcsTUFBQSxDQUFYLE9BQU8sWUFBYSxDQUFDO2FBQ3hCLENBQUMsQ0FBQzs7QUFFSCxxQkFBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBaUI7a0RBQUwsSUFBSTtBQUFKLHdCQUFJOzs7QUFDcEMsdUJBQU8sQ0FBQyxHQUFHLE1BQUEsQ0FBWCxPQUFPLEdBQUssV0FBVyxTQUFLLElBQUksRUFBQyxDQUFDO2FBQ3JDLENBQUMsQ0FBQztTQUNOOzs7V0FWZ0IsWUFBWTs7O3FCQUFaLFlBQVkiLCJmaWxlIjoicXVuaXQvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhdGh9IGZyb20gXCJwaGFudG9tanNcIjtcclxuaW1wb3J0IHtleGVjRmlsZX0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuaW1wb3J0IEFic3RyYWN0UnVudGltZSBmcm9tIFwiLi4vQWJzdHJhY3RSdW50aW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRVW5pdFJ1bnRpbWUgZXh0ZW5kcyBBYnN0cmFjdFJ1bnRpbWV7XHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIC8vcGhhbnRvbWpzIFtwaGFudG9tIGFyZ3VtZW50c10gcnVubmVyLmpzIFt1cmwtb2YteW91ci1xdW5pdC10ZXN0c3VpdGVdIFt0aW1lb3V0LWluLXNlY29uZHNdXHJcbiAgICAgICAgY29uc3QgcXVuaXRQcm9jID0gZXhlY0ZpbGUocGF0aCwgW19fZGlybmFtZSArIFwiXFxcXHF1bml0LXJ1bm5lci5qc1wiLCBfX2Rpcm5hbWUgKyBcIlxcXFxxdW5pdC10ZXN0cy5odG1sXCJdLCAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcXVuaXRQcm9jLm9uKFwibWVzc2FnZVwiLCBmdW5jdGlvbiguLi5hcmdzKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlOiBcIiwgLi4uYXJncyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
