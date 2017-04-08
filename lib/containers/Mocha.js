"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utilsPureComponent = require("../utils/PureComponent");

var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);

var _Suite = require("./Suite");

var _Suite2 = _interopRequireDefault(_Suite);

var _ErrorDisplay = require("./ErrorDisplay");

var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var ItemCount = (function (_PureComponent) {
    _inherits(ItemCount, _PureComponent);

    function ItemCount() {
        _classCallCheck(this, ItemCount);

        _get(Object.getPrototypeOf(ItemCount.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ItemCount, [{
        key: "render",
        value: function render() {
            var passedTests = this.countTests("passed", this.props.suite);
            var failedTests = this.countTests("failed", this.props.suite);
            var pendingTests = this.countTests("pending", this.props.suite);
            return _react2["default"].createElement(
                "span",
                null,
                this.renderCounter("-success", passedTests, "check"),
                this.renderCounter("-error", failedTests, "x"),
                this.renderCounter("", pendingTests, "clock")
            );
        }
    }, {
        key: "renderCounter",
        value: function renderCounter(type, count, icon) {
            return count === 0 ? null : _react2["default"].createElement(
                "span",
                { className: "inline-block highlight" + type + " icon-" + icon },
                count
            );
        }
    }, {
        key: "countTests",
        value: function countTests(status, suiteId) {
            var byId = this.props.byId;
            var suite = byId("suites", suiteId);
            if (!suite) {
                return 0;
            }
            var suites = suite.suites || [];
            var tests = suite.tests || [];

            var result = 0;
            var currentTest = null;
            for (var i = 0; i < tests.length; i++) {
                currentTest = byId("tests", tests[i]);
                result += status === currentTest.status ? 1 : 0;
            }
            for (var j = 0; j < suites.length; j++) {
                result += this.countTests(status, suites[j]);
            }
            return result;
        }
    }]);

    return ItemCount;
})(_utilsPureComponent2["default"]);

var StatsView = (function (_PureComponent2) {
    _inherits(StatsView, _PureComponent2);

    function StatsView() {
        _classCallCheck(this, StatsView);

        _get(Object.getPrototypeOf(StatsView.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(StatsView, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var stats = _props.stats;
            var suites = _props.suites;
            var tests = _props.tests;
            var byId = _props.byId;

            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(ItemCount, { suite: 0, byId: byId }),
                _react2["default"].createElement(
                    "span",
                    null,
                    this.getDuration(suites, tests, stats)
                )
            );
        }
    }, {
        key: "getDuration",
        value: function getDuration(suites, tests, stats) {
            if (!Object.keys(suites).length || !Object.keys(tests).length) {
                return null;
            }
            if (!stats) {
                return _react2["default"].createElement("span", { className: "loading loading-spinner-tiny inline-block" });
            }
            return _react2["default"].createElement(
                "span",
                { className: "inline-block highlight-info icon-dashboard" },
                stats.duration,
                " ms"
            );
        }
    }]);

    return StatsView;
})(_utilsPureComponent2["default"]);

var Mocha = (function (_PureComponent3) {
    _inherits(Mocha, _PureComponent3);

    function Mocha() {
        _classCallCheck(this, Mocha);

        _get(Object.getPrototypeOf(Mocha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Mocha, [{
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var entities = _props2.entities;
            var stats = _props2.stats;
            var error = _props2.error;
            var restartTests = _props2.restartTests;
            var suites = entities.suites;
            var tests = entities.tests;

            var byId = function byId(type, id) {
                return entities[type][id];
            };
            return _react2["default"].createElement(
                "atom-panel",
                { "class": "top scroll-panel" },
                _react2["default"].createElement(
                    "div",
                    { className: "inset-panel" },
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2["default"].createElement(
                            "div",
                            { className: "inline-block" },
                            this.renderTitle(stats, error, restartTests)
                        ),
                        _react2["default"].createElement(
                            "div",
                            { className: "inline-block", style: { float: "right" } },
                            _react2["default"].createElement(StatsView, { stats: stats, suites: suites, tests: tests, byId: byId })
                        )
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-body padded" },
                        this.hasError() ? this.renderError() : this.renderResults(byId)
                    )
                )
            );
        }
    }, {
        key: "hasError",
        value: function hasError() {
            return !!this.props.error;
        }
    }, {
        key: "renderError",
        value: function renderError() {
            var _props3 = this.props;
            var error = _props3.error;
            var action = _props3.action;

            return _react2["default"].createElement(_ErrorDisplay2["default"], { error: error, action: action });
        }
    }, {
        key: "renderResults",
        value: function renderResults(byId) {
            var _this = this;

            var _props4 = this.props;
            var result = _props4.result;
            var entities = _props4.entities;
            var stats = _props4.stats;
            var action = _props4.action;
            var suites = entities.suites;
            var tests = entities.tests;

            var noTestsMessage = this.getNoTestsMessage(entities);
            return _react2["default"].createElement(
                "div",
                null,
                noTestsMessage,
                _react2["default"].createElement(
                    "ul",
                    { className: "list-tree has-collapsable-children" },
                    result.map(function (suite) {
                        return _react2["default"].createElement(_Suite2["default"], { key: suite, suiteId: suite, byId: byId, toggleItem: function (suiteId) {
                                return _this.toggleItem(suiteId);
                            }, action: action });
                    })
                )
            );
        }
    }, {
        key: "renderTitle",
        value: function renderTitle(stats, error, restartTests) {
            if (!stats && !error) {
                return _react2["default"].createElement(
                    "span",
                    null,
                    "Tests"
                );
            }

            return _react2["default"].createElement(
                "a",
                { onClick: restartTests },
                _react2["default"].createElement(
                    "span",
                    { className: "icon-sync" },
                    "Re-run Tests"
                )
            );
        }
    }, {
        key: "toggleItem",
        value: function toggleItem(suite) {
            (0, _actions.toggleSuite)(this.props, { suite: suite });
        }
    }, {
        key: "getNoTestsMessage",
        value: function getNoTestsMessage(stats) {
            if (!stats) {
                return null;
            }
            var suitesCount = Object.keys(stats.suites).length;
            var testsCount = Object.keys(stats.tests).length;
            if (testsCount !== 0 || suitesCount !== 0) {
                return null;
            }
            return _react2["default"].createElement(
                "ul",
                { className: "background-message" },
                _react2["default"].createElement(
                    "li",
                    null,
                    "No Tests"
                )
            );
        }
    }]);

    return Mocha;
})(_utilsPureComponent2["default"]);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNuRCxnQkFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2pELGdCQUFHLFVBQVUsS0FBSyxDQUFDLElBQUksV0FBVyxLQUFLLENBQUMsRUFBQztBQUNyQyx1QkFBTyxJQUFJLENBQUM7YUFDZjtBQUNELG1CQUNJOztrQkFBSSxTQUFTLEVBQUMsb0JBQW9CO2dCQUM5Qjs7OztpQkFBaUI7YUFDaEIsQ0FDUDtTQUNMOzs7V0F6RUMsS0FBSzs7O3FCQTRFSSx5QkFBUyxVQUFBLEtBQUs7V0FBSSxLQUFLO0NBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tIFwiLi4vdXRpbHMvUHVyZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgU3VpdGUgZnJvbSBcIi4vU3VpdGVcIjtcclxuaW1wb3J0IEVycm9yRGlzcGxheSBmcm9tIFwiLi9FcnJvckRpc3BsYXlcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHt0b2dnbGVTdWl0ZX0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuXHJcblxyXG5jbGFzcyBJdGVtQ291bnQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgcGFzc2VkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJwYXNzZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgZmFpbGVkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJmYWlsZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgcGVuZGluZ1Rlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGVuZGluZ1wiLCB0aGlzLnByb3BzLnN1aXRlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCItc3VjY2Vzc1wiLCBwYXNzZWRUZXN0cywgXCJjaGVja1wiKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCItZXJyb3JcIiwgZmFpbGVkVGVzdHMsIFwieFwiKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCJcIiwgcGVuZGluZ1Rlc3RzLCBcImNsb2NrXCIpfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlckNvdW50ZXIodHlwZSwgY291bnQsIGljb24pe1xyXG4gICAgICAgIHJldHVybiBjb3VudCA9PT0gMCA/IG51bGwgOiA8c3BhbiBjbGFzc05hbWU9e1wiaW5saW5lLWJsb2NrIGhpZ2hsaWdodFwiICsgdHlwZSArIFwiIGljb24tXCIraWNvbn0+e2NvdW50fTwvc3Bhbj5cclxuICAgIH1cclxuXHJcbiAgICBjb3VudFRlc3RzKHN0YXR1cywgc3VpdGVJZCl7XHJcbiAgICAgICAgY29uc3QgYnlJZCA9IHRoaXMucHJvcHMuYnlJZDtcclxuICAgICAgICBjb25zdCBzdWl0ZSA9IGJ5SWQoXCJzdWl0ZXNcIiwgc3VpdGVJZCk7XHJcbiAgICAgICAgaWYoIXN1aXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudFRlc3QgPSBudWxsO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUZXN0ID0gYnlJZChcInRlc3RzXCIsIHRlc3RzW2ldKTtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0YXR1cyA9PT0gY3VycmVudFRlc3Quc3RhdHVzID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBzdWl0ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5jb3VudFRlc3RzKHN0YXR1cywgc3VpdGVzW2pdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIFN0YXRzVmlldyBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7c3RhdHMsc3VpdGVzLCB0ZXN0cywgYnlJZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8SXRlbUNvdW50IHN1aXRlPXswfSBieUlkPXtieUlkfSAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+eyB0aGlzLmdldER1cmF0aW9uKHN1aXRlcywgdGVzdHMsIHN0YXRzKSB9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldER1cmF0aW9uKHN1aXRlcywgdGVzdHMsIHN0YXRzKXtcclxuICAgICAgICBpZighT2JqZWN0LmtleXMoc3VpdGVzKS5sZW5ndGggfHwgIU9iamVjdC5rZXlzKHRlc3RzKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXN0YXRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0nbG9hZGluZyBsb2FkaW5nLXNwaW5uZXItdGlueSBpbmxpbmUtYmxvY2snPjwvc3Bhbj47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgaGlnaGxpZ2h0LWluZm8gaWNvbi1kYXNoYm9hcmRcIj57c3RhdHMuZHVyYXRpb259IG1zPC9zcGFuPjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9jaGEgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2VudGl0aWVzLCBzdGF0cywgZXJyb3IsIHJlc3RhcnRUZXN0c30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtzdWl0ZXMsIHRlc3RzfSA9IGVudGl0aWVzO1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSAodHlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzW3R5cGVdW2lkXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzPVwidG9wIHNjcm9sbC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNldC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGl0bGUoc3RhdHMsIGVycm9yLCByZXN0YXJ0VGVzdHMpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2tcIiBzdHlsZT17IHtmbG9hdCA6IFwicmlnaHRcIn0gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0c1ZpZXcgc3RhdHM9e3N0YXRzfSBzdWl0ZXM9e3N1aXRlc30gdGVzdHM9e3Rlc3RzfSBieUlkPXtieUlkfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keSBwYWRkZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuaGFzRXJyb3IoKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckVycm9yKCkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJSZXN1bHRzKGJ5SWQpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgaGFzRXJyb3IoKXtcclxuICAgICAgICByZXR1cm4gISF0aGlzLnByb3BzLmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRXJyb3IoKXtcclxuICAgICAgICBjb25zdCB7ZXJyb3IsIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiA8RXJyb3JEaXNwbGF5IGVycm9yPXtlcnJvcn0gYWN0aW9uPXthY3Rpb259Lz5cclxuICAgIH1cclxuICAgIHJlbmRlclJlc3VsdHMoYnlJZCl7XHJcbiAgICAgICAgY29uc3Qge3Jlc3VsdCwgZW50aXRpZXMsIHN0YXRzLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBlbnRpdGllcztcclxuICAgICAgICBjb25zdCBub1Rlc3RzTWVzc2FnZSA9IHRoaXMuZ2V0Tm9UZXN0c01lc3NhZ2UoZW50aXRpZXMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7bm9UZXN0c01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfSBhY3Rpb249e2FjdGlvbn0vPiApIH1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG4gICAgcmVuZGVyVGl0bGUoc3RhdHMsIGVycm9yLCByZXN0YXJ0VGVzdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyAmJiAhZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4+VGVzdHM8L3NwYW4+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDxhIG9uQ2xpY2s9e3Jlc3RhcnRUZXN0c30+PHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1zeW5jXCI+UmUtcnVuIFRlc3RzPC9zcGFuPjwvYT5cclxuICAgIH1cclxuICAgIHRvZ2dsZUl0ZW0oc3VpdGUpe1xyXG4gICAgICAgIHRvZ2dsZVN1aXRlKHRoaXMucHJvcHMsIHsgc3VpdGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3VpdGVzQ291bnQgPSBPYmplY3Qua2V5cyhzdGF0cy5zdWl0ZXMpLmxlbmd0aDtcclxuICAgICAgICB2YXIgdGVzdHNDb3VudCA9IE9iamVjdC5rZXlzKHN0YXRzLnRlc3RzKS5sZW5ndGg7XHJcbiAgICAgICAgaWYodGVzdHNDb3VudCAhPT0gMCB8fCBzdWl0ZXNDb3VudCAhPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdiYWNrZ3JvdW5kLW1lc3NhZ2UnPlxyXG4gICAgICAgICAgICAgICAgPGxpPk5vIFRlc3RzPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZSA9PiBzdGF0ZSApKE1vY2hhKTtcclxuIl19
