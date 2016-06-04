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

var _generateTest = require("../generateTest");

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
//# sourceMappingURL=data:application/json;base64,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QUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBQztBQUN2Qyx1QkFBTyxJQUFJLENBQUM7YUFDZjtBQUNELG1CQUNJOztrQkFBSSxTQUFTLEVBQUMsb0JBQW9CO2dCQUM5Qjs7OztpQkFBaUI7YUFDaEIsQ0FDUDtTQUNMOzs7V0F2RUMsS0FBSzs7O3FCQTBFSSx5QkFBUyxVQUFBLEtBQUs7V0FBSSxLQUFLO0NBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tIFwiLi4vdXRpbHMvUHVyZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgU3VpdGUgZnJvbSBcIi4vU3VpdGVcIjtcclxuaW1wb3J0IEVycm9yRGlzcGxheSBmcm9tIFwiLi9FcnJvckRpc3BsYXlcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHt0b2dnbGVTdWl0ZX0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IHtkYXRhRm9yVGVzdCwgY3JlYXRlVGVzdEZpbGVzfSBmcm9tIFwiLi4vZ2VuZXJhdGVUZXN0XCI7XHJcblxyXG5cclxuY2xhc3MgSXRlbUNvdW50IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHBhc3NlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGFzc2VkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IGZhaWxlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwiZmFpbGVkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcInBlbmRpbmdcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLXN1Y2Nlc3NcIiwgcGFzc2VkVGVzdHMsIFwiY2hlY2tcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLWVycm9yXCIsIGZhaWxlZFRlc3RzLCBcInhcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiXCIsIHBlbmRpbmdUZXN0cywgXCJjbG9ja1wiKX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb3VudGVyKHR5cGUsIGNvdW50LCBpY29uKXtcclxuICAgICAgICByZXR1cm4gY291bnQgPT09IDAgPyBudWxsIDogPHNwYW4gY2xhc3NOYW1lPXtcImlubGluZS1ibG9jayBoaWdobGlnaHRcIiArIHR5cGUgKyBcIiBpY29uLVwiK2ljb259Pntjb3VudH08L3NwYW4+XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlSWQpe1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmJ5SWQ7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGlmKCFzdWl0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUZXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50VGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0c1tpXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdGF0dXMgPT09IGN1cnJlbnRUZXN0LnN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgc3VpdGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlc1tqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdGF0c1ZpZXcgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3N0YXRzLHN1aXRlcywgdGVzdHMsIGJ5SWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEl0ZW1Db3VudCBzdWl0ZT17MH0gYnlJZD17YnlJZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnsgdGhpcy5nZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cykgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cyl7XHJcbiAgICAgICAgaWYoIU9iamVjdC5rZXlzKHN1aXRlcykubGVuZ3RoIHx8ICFPYmplY3Qua2V5cyh0ZXN0cykubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLXRpbnkgaW5saW5lLWJsb2NrJz48L3NwYW4+O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIGhpZ2hsaWdodC1pbmZvIGljb24tZGFzaGJvYXJkXCI+e3N0YXRzLmR1cmF0aW9ufSBtczwvc3Bhbj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vY2hhIGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtlbnRpdGllcywgc3RhdHMsIGVycm9yLCByZXN0YXJ0VGVzdHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBlbnRpdGllcztcclxuICAgICAgICBjb25zdCBieUlkID0gKHR5cGUsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc1t0eXBlXVtpZF07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YXRvbS1wYW5lbCBjbGFzcz1cInRvcCBzY3JvbGwtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zZXQtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpdGxlKHN0YXRzLCBlcnJvciwgcmVzdGFydFRlc3RzKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gc3VpdGVzPXtzdWl0ZXN9IHRlc3RzPXt0ZXN0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmhhc0Vycm9yKCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJFcnJvcigpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUmVzdWx0cyhieUlkKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2F0b20tcGFuZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGhhc0Vycm9yKCl7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5lcnJvcjtcclxuICAgIH1cclxuICAgIHJlbmRlckVycm9yKCl7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gPEVycm9yRGlzcGxheSBlcnJvcj17ZXJyb3J9IGFjdGlvbj17YWN0aW9ufS8+XHJcbiAgICB9XHJcbiAgICByZW5kZXJSZXN1bHRzKGJ5SWQpe1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHQsIGVudGl0aWVzLCBzdGF0cywgYWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlcywgdGVzdHN9ID0gZW50aXRpZXM7XHJcbiAgICAgICAgY29uc3Qgbm9UZXN0c01lc3NhZ2UgPSB0aGlzLmdldE5vVGVzdHNNZXNzYWdlKHN0YXRzKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge25vVGVzdHNNZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHJlc3VsdC5tYXAoIHN1aXRlID0+IDxTdWl0ZSBrZXk9e3N1aXRlfSBzdWl0ZUlkPXtzdWl0ZX0gYnlJZD17IGJ5SWQgfSB0b2dnbGVJdGVtPXsgKHN1aXRlSWQpPT4gdGhpcy50b2dnbGVJdGVtKHN1aXRlSWQpIH0gYWN0aW9uPXthY3Rpb259Lz4gKSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlKHN0YXRzLCBlcnJvciwgcmVzdGFydFRlc3RzKXtcclxuICAgICAgICBpZighc3RhdHMgJiYgIWVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuPlRlc3RzPC9zcGFuPjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiA8YSBvbkNsaWNrPXtyZXN0YXJ0VGVzdHN9PjxzcGFuIGNsYXNzTmFtZT1cImljb24tc3luY1wiPlJlLXJ1biBUZXN0czwvc3Bhbj48L2E+XHJcbiAgICB9XHJcbiAgICB0b2dnbGVJdGVtKHN1aXRlKXtcclxuICAgICAgICB0b2dnbGVTdWl0ZSh0aGlzLnByb3BzLCB7IHN1aXRlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5vVGVzdHNNZXNzYWdlKHN0YXRzKXtcclxuICAgICAgICBpZighc3RhdHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RhdHMudGVzdHMgIT09IDAgfHwgc3RhdHMuc3VpdGVzICE9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J2JhY2tncm91bmQtbWVzc2FnZSc+XHJcbiAgICAgICAgICAgICAgICA8bGk+Tm8gVGVzdHM8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlID0+IHN0YXRlICkoTW9jaGEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
