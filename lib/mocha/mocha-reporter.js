"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _processActions = require("./process-actions");

var _mochaLibReportersBase = require("mocha/lib/reporters/base");

var _mochaLibReportersBase2 = _interopRequireDefault(_mochaLibReportersBase);

var _utilsMakeSuites = require("../utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

exports["default"] = function (runner) {
    var _this = this;

    _mochaLibReportersBase2["default"].call(this, runner);

    runner.once("suite", function (s) {
        s.title = "All";
        (0, _processActions.begin)((0, _utilsMakeSuites2["default"])(s));
    });
    runner.on("suite end", _processActions.suiteEnd);
    runner.on("test", _processActions.startTest);
    runner.on("pass", _processActions.passTest);
    runner.on("fail", _processActions.failTest);

    runner.on("end", function () {
        (0, _processActions.done)(_this);
    });
};

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXJlcG9ydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OzhCQUFtRSxtQkFBbUI7O3FDQUNyRSwwQkFBMEI7Ozs7K0JBQ3JCLHNCQUFzQjs7OztxQkFFN0IsVUFBUyxNQUFNLEVBQUM7OztBQUMzQix1Q0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixVQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFBLENBQUMsRUFBSTtBQUN0QixTQUFDLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQztBQUNkLG1DQUFNLGtDQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLDJCQUFXLENBQUM7QUFDakMsVUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLDRCQUFZLENBQUM7QUFDN0IsVUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLDJCQUFZLENBQUM7QUFDN0IsVUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLDJCQUFXLENBQUM7O0FBRTVCLFVBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDLFlBQU07QUFDbEIsd0NBQVUsQ0FBQztLQUNkLENBQUMsQ0FBQztDQUNOIiwiZmlsZSI6Im1vY2hhL21vY2hhLXJlcG9ydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtiZWdpbiwgc3VpdGVFbmQsIHN0YXJ0VGVzdCwgcGFzc1Rlc3QsIGZhaWxUZXN0LCBkb25lfSBmcm9tIFwiLi9wcm9jZXNzLWFjdGlvbnNcIjtcclxuaW1wb3J0IEJhc2UgZnJvbSBcIm1vY2hhL2xpYi9yZXBvcnRlcnMvYmFzZVwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocnVubmVyKXtcclxuICAgIEJhc2UuY2FsbCh0aGlzLCBydW5uZXIpO1xyXG5cclxuICAgIHJ1bm5lci5vbmNlKFwic3VpdGVcIiwgcyA9PiB7XHJcbiAgICAgICAgcy50aXRsZT1cIkFsbFwiO1xyXG4gICAgICAgIGJlZ2luKG1ha2VTdWl0ZShzKSk7XHJcbiAgICB9KTtcclxuICAgIHJ1bm5lci5vbihcInN1aXRlIGVuZFwiLCBzdWl0ZUVuZCk7XHJcbiAgICBydW5uZXIub24oXCJ0ZXN0XCIsIHN0YXJ0VGVzdCk7XHJcbiAgICBydW5uZXIub24oXCJwYXNzXCIsICBwYXNzVGVzdCk7XHJcbiAgICBydW5uZXIub24oXCJmYWlsXCIsIGZhaWxUZXN0KTtcclxuXHJcbiAgICBydW5uZXIub24oXCJlbmRcIiwoKSA9PiB7XHJcbiAgICAgICAgZG9uZSh0aGlzKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
