"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Suite = require("./Suite");

var _Suite2 = _interopRequireDefault(_Suite);

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var ItemCount = (function (_Component) {
    _inherits(ItemCount, _Component);

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
})(_react.Component);

var StatsView = (function (_Component2) {
    _inherits(StatsView, _Component2);

    function StatsView() {
        _classCallCheck(this, StatsView);

        _get(Object.getPrototypeOf(StatsView.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(StatsView, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var stats = _props.stats;
            var byId = _props.byId;

            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(ItemCount, { suite: 0, byId: byId }),
                _react2["default"].createElement(
                    "span",
                    null,
                    this.getDuration(stats)
                )
            );
        }
    }, {
        key: "getDuration",
        value: function getDuration(stats) {
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
})(_react.Component);

var Mocha = (function (_Component3) {
    _inherits(Mocha, _Component3);

    function Mocha() {
        _classCallCheck(this, Mocha);

        _get(Object.getPrototypeOf(Mocha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Mocha, [{
        key: "render",
        value: function render() {
            var _this = this;

            var _props2 = this.props;
            var result = _props2.result;
            var entities = _props2.entities;
            var dispatch = _props2.dispatch;
            var stats = _props2.stats;
            var tests = entities.tests;

            var byId = function byId(type, id) {
                return entities[type][id];
            };
            var noTestsMessage = this.getNoTestsMessage(stats);
            return _react2["default"].createElement(
                "atom-panel",
                { className: "top scroll-panel" },
                _react2["default"].createElement(
                    "div",
                    { className: "inset-panel" },
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2["default"].createElement(
                            "div",
                            { className: "inline-block" },
                            "Tests"
                        ),
                        _react2["default"].createElement(
                            "div",
                            { className: "inline-block", style: { float: "right" } },
                            _react2["default"].createElement(StatsView, { stats: stats, byId: byId })
                        )
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-body padded" },
                        noTestsMessage,
                        _react2["default"].createElement(
                            "ul",
                            { className: "list-tree has-collapsable-children" },
                            result.map(function (suite) {
                                return _react2["default"].createElement(_Suite2["default"], { key: suite, suiteId: suite, byId: byId, toggleItem: function (suiteId) {
                                        return _this.toggleItem(suiteId);
                                    } });
                            })
                        )
                    )
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
})(_react.Component);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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aW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFN1aXRlIGZyb20gXCIuL1N1aXRlXCI7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7dG9nZ2xlU3VpdGV9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5cclxuXHJcbmNsYXNzIEl0ZW1Db3VudCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHBhc3NlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGFzc2VkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IGZhaWxlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwiZmFpbGVkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcInBlbmRpbmdcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLXN1Y2Nlc3NcIiwgcGFzc2VkVGVzdHMsIFwiY2hlY2tcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLWVycm9yXCIsIGZhaWxlZFRlc3RzLCBcInhcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiXCIsIHBlbmRpbmdUZXN0cywgXCJjbG9ja1wiKX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb3VudGVyKHR5cGUsIGNvdW50LCBpY29uKXtcclxuICAgICAgICByZXR1cm4gY291bnQgPT09IDAgPyBudWxsIDogPHNwYW4gY2xhc3NOYW1lPXtcImlubGluZS1ibG9jayBoaWdobGlnaHRcIiArIHR5cGUgKyBcIiBpY29uLVwiK2ljb259Pntjb3VudH08L3NwYW4+XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlSWQpe1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmJ5SWQ7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGlmKCFzdWl0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUZXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50VGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0c1tpXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdGF0dXMgPT09IGN1cnJlbnRUZXN0LnN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgc3VpdGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlc1tqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdGF0c1ZpZXcgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7c3RhdHMsIGJ5SWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEl0ZW1Db3VudCBzdWl0ZT17MH0gYnlJZD17YnlJZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnsgdGhpcy5nZXREdXJhdGlvbihzdGF0cykgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihzdGF0cyl7XHJcbiAgICAgICAgaWYoIXN0YXRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT0nbG9hZGluZyBsb2FkaW5nLXNwaW5uZXItdGlueSBpbmxpbmUtYmxvY2snPjwvc3Bhbj47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgaGlnaGxpZ2h0LWluZm8gaWNvbi1kYXNoYm9hcmRcIj57c3RhdHMuZHVyYXRpb259IG1zPC9zcGFuPjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9jaGEgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllcywgZGlzcGF0Y2gsIHN0YXRzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3Rlc3RzfSA9IGVudGl0aWVzO1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSAodHlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzW3R5cGVdW2lkXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IG5vVGVzdHNNZXNzYWdlID0gdGhpcy5nZXROb1Rlc3RzTWVzc2FnZShzdGF0cyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGF0b20tcGFuZWwgY2xhc3NOYW1lPVwidG9wIHNjcm9sbC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNldC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtub1Rlc3RzTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfS8+ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUl0ZW0oc3VpdGUpe1xyXG4gICAgICAgIHRvZ2dsZVN1aXRlKHRoaXMucHJvcHMsIHsgc3VpdGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0cy50ZXN0cyAhPT0gMCB8fCBzdGF0cy5zdWl0ZXMgIT09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nYmFja2dyb3VuZC1tZXNzYWdlJz5cclxuICAgICAgICAgICAgICAgIDxsaT5ObyBUZXN0czwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggKHN0YXRlKT0+c3RhdGUgKShNb2NoYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
