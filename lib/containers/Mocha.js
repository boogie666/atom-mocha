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

            var noTestsMessage = this.getNoTestsMessage(stats);
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
            if (stats.tests !== 0 || stats.suites !== 0) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,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S0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7QUFDdkMsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxtQkFDSTs7a0JBQUksU0FBUyxFQUFDLG9CQUFvQjtnQkFDOUI7Ozs7aUJBQWlCO2FBQ2hCLENBQ1A7U0FDTDs7O1dBdkVDLEtBQUs7OztxQkEwRUkseUJBQVMsVUFBQSxLQUFLO1dBQUksS0FBSztDQUFBLENBQUUsQ0FBQyxLQUFLLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9Nb2NoYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFB1cmVDb21wb25lbnQgZnJvbSBcIi4uL3V0aWxzL1B1cmVDb21wb25lbnRcIjtcclxuaW1wb3J0IFN1aXRlIGZyb20gXCIuL1N1aXRlXCI7XHJcbmltcG9ydCBFcnJvckRpc3BsYXkgZnJvbSBcIi4vRXJyb3JEaXNwbGF5XCI7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7dG9nZ2xlU3VpdGV9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcblxyXG5cclxuY2xhc3MgSXRlbUNvdW50IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHBhc3NlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGFzc2VkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IGZhaWxlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwiZmFpbGVkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcInBlbmRpbmdcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLXN1Y2Nlc3NcIiwgcGFzc2VkVGVzdHMsIFwiY2hlY2tcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLWVycm9yXCIsIGZhaWxlZFRlc3RzLCBcInhcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiXCIsIHBlbmRpbmdUZXN0cywgXCJjbG9ja1wiKX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb3VudGVyKHR5cGUsIGNvdW50LCBpY29uKXtcclxuICAgICAgICByZXR1cm4gY291bnQgPT09IDAgPyBudWxsIDogPHNwYW4gY2xhc3NOYW1lPXtcImlubGluZS1ibG9jayBoaWdobGlnaHRcIiArIHR5cGUgKyBcIiBpY29uLVwiK2ljb259Pntjb3VudH08L3NwYW4+XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlSWQpe1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmJ5SWQ7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGlmKCFzdWl0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUZXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50VGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0c1tpXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdGF0dXMgPT09IGN1cnJlbnRUZXN0LnN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgc3VpdGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlc1tqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdGF0c1ZpZXcgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3N0YXRzLHN1aXRlcywgdGVzdHMsIGJ5SWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEl0ZW1Db3VudCBzdWl0ZT17MH0gYnlJZD17YnlJZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnsgdGhpcy5nZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cykgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cyl7XHJcbiAgICAgICAgaWYoIU9iamVjdC5rZXlzKHN1aXRlcykubGVuZ3RoIHx8ICFPYmplY3Qua2V5cyh0ZXN0cykubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLXRpbnkgaW5saW5lLWJsb2NrJz48L3NwYW4+O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIGhpZ2hsaWdodC1pbmZvIGljb24tZGFzaGJvYXJkXCI+e3N0YXRzLmR1cmF0aW9ufSBtczwvc3Bhbj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vY2hhIGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtlbnRpdGllcywgc3RhdHMsIGVycm9yLCByZXN0YXJ0VGVzdHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBlbnRpdGllcztcclxuICAgICAgICBjb25zdCBieUlkID0gKHR5cGUsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc1t0eXBlXVtpZF07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YXRvbS1wYW5lbCBjbGFzcz1cInRvcCBzY3JvbGwtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zZXQtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpdGxlKHN0YXRzLCBlcnJvciwgcmVzdGFydFRlc3RzKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gc3VpdGVzPXtzdWl0ZXN9IHRlc3RzPXt0ZXN0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmhhc0Vycm9yKCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFcnJvcigpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUmVzdWx0cyhieUlkKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2F0b20tcGFuZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGhhc0Vycm9yKCl7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lcnJvcjtcclxuICAgIH1cclxuICAgIHJlbmRlckVycm9yKCl7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gPEVycm9yRGlzcGxheSBlcnJvcj17ZXJyb3J9IGFjdGlvbj17YWN0aW9ufS8+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSZXN1bHRzKGJ5SWQpe1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHQsIGVudGl0aWVzLCBzdGF0cywgYWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlcywgdGVzdHN9ID0gZW50aXRpZXM7XHJcbiAgICAgICAgY29uc3Qgbm9UZXN0c01lc3NhZ2UgPSB0aGlzLmdldE5vVGVzdHNNZXNzYWdlKHN0YXRzKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge25vVGVzdHNNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJlc3VsdC5tYXAoIHN1aXRlID0+IDxTdWl0ZSBrZXk9e3N1aXRlfSBzdWl0ZUlkPXtzdWl0ZX0gYnlJZD17IGJ5SWQgfSB0b2dnbGVJdGVtPXsgKHN1aXRlSWQpPT4gdGhpcy50b2dnbGVJdGVtKHN1aXRlSWQpIH0gYWN0aW9uPXthY3Rpb259Lz4gKSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlKHN0YXRzLCBlcnJvciwgcmVzdGFydFRlc3RzKXtcclxuICAgICAgICBpZighc3RhdHMgJiYgIWVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuPlRlc3RzPC9zcGFuPjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiA8YSBvbkNsaWNrPXtyZXN0YXJ0VGVzdHN9PjxzcGFuIGNsYXNzTmFtZT1cImljb24tc3luY1wiPlJlLXJ1biBUZXN0czwvc3Bhbj48L2E+XHJcbiAgICB9XHJcbiAgICB0b2dnbGVJdGVtKHN1aXRlKXtcclxuICAgICAgICB0b2dnbGVTdWl0ZSh0aGlzLnByb3BzLCB7IHN1aXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vVGVzdHNNZXNzYWdlKHN0YXRzKXtcclxuICAgICAgICBpZighc3RhdHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhdHMudGVzdHMgIT09IDAgfHwgc3RhdHMuc3VpdGVzICE9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J2JhY2tncm91bmQtbWVzc2FnZSc+XHJcbiAgICAgICAgICAgICAgICA8bGk+Tm8gVGVzdHM8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlID0+IHN0YXRlICkoTW9jaGEpO1xyXG4iXX0=
