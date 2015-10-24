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

var _utilsPureComponent = require("../utils/PureComponent");

var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);

var _Suite = require("./Suite");

var _Suite2 = _interopRequireDefault(_Suite);

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

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
            var _this = this;

            var _props2 = this.props;
            var result = _props2.result;
            var entities = _props2.entities;
            var dispatch = _props2.dispatch;
            var stats = _props2.stats;
            var suites = entities.suites;
            var tests = entities.tests;

            var byId = function byId(type, id) {
                return entities[type][id];
            };
            var noTestsMessage = this.getNoTestsMessage(stats);
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
                            "Tests"
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
})(_utilsPureComponent2["default"]);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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O0FBQ04sdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxnQkFBRyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBQztBQUN2Qyx1QkFBTyxJQUFJLENBQUM7YUFDZjtBQUNELG1CQUNJOztrQkFBSSxTQUFTLEVBQUMsb0JBQW9CO2dCQUM5Qjs7OztpQkFBaUI7YUFDaEIsQ0FDUDtTQUNMOzs7V0E5Q0MsS0FBSzs7O3FCQWlESSx5QkFBUyxVQUFDLEtBQUs7V0FBRyxLQUFLO0NBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tIFwiLi4vdXRpbHMvUHVyZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgU3VpdGUgZnJvbSBcIi4vU3VpdGVcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHt0b2dnbGVTdWl0ZX0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5cclxuY2xhc3MgSXRlbUNvdW50IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHBhc3NlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGFzc2VkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IGZhaWxlZFRlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwiZmFpbGVkXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIGNvbnN0IHBlbmRpbmdUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcInBlbmRpbmdcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLXN1Y2Nlc3NcIiwgcGFzc2VkVGVzdHMsIFwiY2hlY2tcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiLWVycm9yXCIsIGZhaWxlZFRlc3RzLCBcInhcIil9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwiXCIsIHBlbmRpbmdUZXN0cywgXCJjbG9ja1wiKX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb3VudGVyKHR5cGUsIGNvdW50LCBpY29uKXtcclxuICAgICAgICByZXR1cm4gY291bnQgPT09IDAgPyBudWxsIDogPHNwYW4gY2xhc3NOYW1lPXtcImlubGluZS1ibG9jayBoaWdobGlnaHRcIiArIHR5cGUgKyBcIiBpY29uLVwiK2ljb259Pntjb3VudH08L3NwYW4+XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlSWQpe1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmJ5SWQ7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGlmKCFzdWl0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRUZXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBjdXJyZW50VGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0c1tpXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBzdGF0dXMgPT09IGN1cnJlbnRUZXN0LnN0YXR1cyA/IDEgOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgc3VpdGVzLmxlbmd0aDsgaisrKXtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlc1tqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTdGF0c1ZpZXcgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3N0YXRzLHN1aXRlcywgdGVzdHMsIGJ5SWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEl0ZW1Db3VudCBzdWl0ZT17MH0gYnlJZD17YnlJZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPnsgdGhpcy5nZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cykgfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREdXJhdGlvbihzdWl0ZXMsIHRlc3RzLCBzdGF0cyl7XHJcbiAgICAgICAgaWYoIU9iamVjdC5rZXlzKHN1aXRlcykubGVuZ3RoIHx8ICFPYmplY3Qua2V5cyh0ZXN0cykubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLXRpbnkgaW5saW5lLWJsb2NrJz48L3NwYW4+O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIGhpZ2hsaWdodC1pbmZvIGljb24tZGFzaGJvYXJkXCI+e3N0YXRzLmR1cmF0aW9ufSBtczwvc3Bhbj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vY2hhIGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHQsIGVudGl0aWVzLCBkaXNwYXRjaCwgc3RhdHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBlbnRpdGllcztcclxuICAgICAgICBjb25zdCBieUlkID0gKHR5cGUsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc1t0eXBlXVtpZF07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBub1Rlc3RzTWVzc2FnZSA9IHRoaXMuZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzPVwidG9wIHNjcm9sbC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNldC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gc3VpdGVzPXtzdWl0ZXN9IHRlc3RzPXt0ZXN0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtub1Rlc3RzTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfS8+ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUl0ZW0oc3VpdGUpe1xyXG4gICAgICAgIHRvZ2dsZVN1aXRlKHRoaXMucHJvcHMsIHsgc3VpdGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0cy50ZXN0cyAhPT0gMCB8fCBzdGF0cy5zdWl0ZXMgIT09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nYmFja2dyb3VuZC1tZXNzYWdlJz5cclxuICAgICAgICAgICAgICAgIDxsaT5ObyBUZXN0czwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggKHN0YXRlKT0+c3RhdGUgKShNb2NoYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
