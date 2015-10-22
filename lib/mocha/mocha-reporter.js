"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = connect;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _processActions = require("./process-actions");

var _utilsMakeSuites = require("../utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

function connect(runner) {
    runner.once("suite", function (s) {
        s.title = "All";
        (0, _processActions.begin)((0, _utilsMakeSuites2["default"])(s));
    });
    runner.on("test", function (test) {
        (0, _processActions.startTest)(test);
    });
    runner.on("test end", function (test) {
        (0, _processActions.finishTest)(test);
    });
    runner.on("end", function () {
        (0, _processActions.done)();
    });
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXJlcG9ydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUd3QixPQUFPOzs7OzhCQUhrQixtQkFBbUI7OytCQUM5QyxzQkFBc0I7Ozs7QUFFN0IsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFDO0FBQ25DLFVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RCLFNBQUMsQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO0FBQ2QsbUNBQU0sa0NBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7QUFDSCxVQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRyxVQUFBLElBQUksRUFBRztBQUN0Qix1Q0FBVSxJQUFJLENBQUMsQ0FBQztLQUNuQixDQUFDLENBQUM7QUFDSCxVQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRyxVQUFBLElBQUksRUFBRztBQUMxQix3Q0FBVyxJQUFJLENBQUMsQ0FBQztLQUNwQixDQUFDLENBQUM7QUFDSCxVQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxZQUFLO0FBQ2pCLG1DQUFNLENBQUM7S0FDVixDQUFDLENBQUM7Q0FDTiIsImZpbGUiOiJtb2NoYS9tb2NoYS1yZXBvcnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YmVnaW4sIHN0YXJ0VGVzdCwgZmluaXNoVGVzdCwgZG9uZX0gZnJvbSBcIi4vcHJvY2Vzcy1hY3Rpb25zXCI7XHJcbmltcG9ydCBtYWtlU3VpdGUgZnJvbSBcIi4uL3V0aWxzL21ha2Utc3VpdGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0KHJ1bm5lcil7XHJcbiAgICBydW5uZXIub25jZShcInN1aXRlXCIsIHMgPT4ge1xyXG4gICAgICAgIHMudGl0bGU9XCJBbGxcIjtcclxuICAgICAgICBiZWdpbihtYWtlU3VpdGUocykpO1xyXG4gICAgfSk7XHJcbiAgICBydW5uZXIub24oXCJ0ZXN0XCIsICB0ZXN0ID0+e1xyXG4gICAgICAgIHN0YXJ0VGVzdCh0ZXN0KTtcclxuICAgIH0pO1xyXG4gICAgcnVubmVyLm9uKFwidGVzdCBlbmRcIiwgIHRlc3QgPT57XHJcbiAgICAgICAgZmluaXNoVGVzdCh0ZXN0KTtcclxuICAgIH0pO1xyXG4gICAgcnVubmVyLm9uKFwiZW5kXCIsKCkgPT57XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
