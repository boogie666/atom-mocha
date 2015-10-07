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
        s.title = "Tests";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXJlcG9ydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUd3QixPQUFPOzs7OzhCQUhrQixtQkFBbUI7OytCQUM5QyxzQkFBc0I7Ozs7QUFFN0IsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFDO0FBQ25DLFVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxFQUFJO0FBQ3RCLFNBQUMsQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFDO0FBQ2hCLG1DQUFNLGtDQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUcsVUFBQSxJQUFJLEVBQUc7QUFDdEIsdUNBQVUsSUFBSSxDQUFDLENBQUM7S0FDbkIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUcsVUFBQSxJQUFJLEVBQUc7QUFDMUIsd0NBQVcsSUFBSSxDQUFDLENBQUM7S0FDcEIsQ0FBQyxDQUFDO0FBQ0gsVUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsWUFBSztBQUNqQixtQ0FBTSxDQUFDO0tBQ1YsQ0FBQyxDQUFDO0NBQ04iLCJmaWxlIjoibW9jaGEvbW9jaGEtcmVwb3J0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2JlZ2luLCBzdGFydFRlc3QsIGZpbmlzaFRlc3QsIGRvbmV9IGZyb20gXCIuL3Byb2Nlc3MtYWN0aW9uc1wiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29ubmVjdChydW5uZXIpe1xyXG4gICAgcnVubmVyLm9uY2UoXCJzdWl0ZVwiLCBzID0+IHtcclxuICAgICAgICBzLnRpdGxlPVwiVGVzdHNcIjtcclxuICAgICAgICBiZWdpbihtYWtlU3VpdGUocykpO1xyXG4gICAgfSk7XHJcbiAgICBydW5uZXIub24oXCJ0ZXN0XCIsICB0ZXN0ID0+e1xyXG4gICAgICAgIHN0YXJ0VGVzdCh0ZXN0KTtcclxuICAgIH0pO1xyXG4gICAgcnVubmVyLm9uKFwidGVzdCBlbmRcIiwgIHRlc3QgPT57XHJcbiAgICAgICAgZmluaXNoVGVzdCh0ZXN0KTtcclxuICAgIH0pO1xyXG4gICAgcnVubmVyLm9uKFwiZW5kXCIsKCkgPT57XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
