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
            var _this = this;

            var _props2 = this.props;
            var result = _props2.result;
            var entities = _props2.entities;
            var dispatch = _props2.dispatch;
            var stats = _props2.stats;
            var action = _props2.action;
            var restartTests = _props2.restartTests;
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
                            this.renderTitle(stats, restartTests)
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
                                    }, action: action });
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: "renderTitle",
        value: function renderTitle(stats, restartTests) {
            if (!stats) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvTW9jaGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxQkFBa0IsT0FBTzs7OztrQ0FDQyx3QkFBd0I7Ozs7cUJBQ2hDLFNBQVM7Ozs7MEJBQ0wsYUFBYTs7dUJBQ1QsWUFBWTs7NEJBQ0ssaUJBQWlCOztJQUd0RCxTQUFTO2NBQVQsU0FBUzs7YUFBVCxTQUFTOzhCQUFULFNBQVM7O21DQUFULFNBQVM7OztpQkFBVCxTQUFTOztlQUNMLGtCQUFFO0FBQ0osZ0JBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsZ0JBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsZ0JBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEUsbUJBQ0k7OztnQkFDSyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDO2FBQzNDLENBQ1Q7U0FDTDs7O2VBQ1ksdUJBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDNUIsbUJBQU8sS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUc7O2tCQUFNLFNBQVMsRUFBRSx3QkFBd0IsR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFDLElBQUksQUFBQztnQkFBRSxLQUFLO2FBQVEsQ0FBQTtTQUMvRzs7O2VBRVMsb0JBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQztBQUN2QixnQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDN0IsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEMsZ0JBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDTix1QkFBTyxDQUFDLENBQUM7YUFDWjtBQUNELGdCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNsQyxnQkFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7O0FBRWhDLGdCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLGlCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNqQywyQkFBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsc0JBQU0sSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25EO0FBQ0QsaUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ2xDLHNCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7QUFDRCxtQkFBTyxNQUFNLENBQUM7U0FDakI7OztXQXBDQyxTQUFTOzs7SUF3Q1QsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOzttQ0FBVCxTQUFTOzs7aUJBQVQsU0FBUzs7ZUFDTCxrQkFBRTt5QkFDZ0MsSUFBSSxDQUFDLEtBQUs7Z0JBQXZDLEtBQUssVUFBTCxLQUFLO2dCQUFDLE1BQU0sVUFBTixNQUFNO2dCQUFFLEtBQUssVUFBTCxLQUFLO2dCQUFFLElBQUksVUFBSixJQUFJOztBQUNoQyxtQkFDSTs7O2dCQUNJLGlDQUFDLFNBQVMsSUFBQyxLQUFLLEVBQUUsQ0FBQyxBQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQUFBQyxHQUFHO2dCQUNuQzs7O29CQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7aUJBQVM7YUFDckQsQ0FDUjtTQUNMOzs7ZUFFVSxxQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztBQUM3QixnQkFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUM7QUFDekQsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxnQkFBRyxDQUFDLEtBQUssRUFBQztBQUNOLHVCQUFPLDJDQUFNLFNBQVMsRUFBQywyQ0FBMkMsR0FBUSxDQUFDO2FBQzlFO0FBQ0QsbUJBQU87O2tCQUFNLFNBQVMsRUFBQyw0Q0FBNEM7Z0JBQUUsS0FBSyxDQUFDLFFBQVE7O2FBQVcsQ0FBQztTQUNsRzs7O1dBbkJDLFNBQVM7OztJQXNCVCxLQUFLO2NBQUwsS0FBSzs7YUFBTCxLQUFLOzhCQUFMLEtBQUs7O21DQUFMLEtBQUs7OztpQkFBTCxLQUFLOztlQUNELGtCQUFFOzs7MEJBQzhELElBQUksQ0FBQyxLQUFLO2dCQUFyRSxNQUFNLFdBQU4sTUFBTTtnQkFBRSxRQUFRLFdBQVIsUUFBUTtnQkFBRSxRQUFRLFdBQVIsUUFBUTtnQkFBRSxLQUFLLFdBQUwsS0FBSztnQkFBRSxNQUFNLFdBQU4sTUFBTTtnQkFBRSxZQUFZLFdBQVosWUFBWTtnQkFDdkQsTUFBTSxHQUFXLFFBQVEsQ0FBekIsTUFBTTtnQkFBRSxLQUFLLEdBQUksUUFBUSxDQUFqQixLQUFLOztBQUNwQixnQkFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUksSUFBSSxFQUFFLEVBQUUsRUFBSztBQUN2Qix1QkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDN0IsQ0FBQztBQUNGLGdCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckQsbUJBQ0k7O2tCQUFZLFNBQU0sa0JBQWtCO2dCQUNoQzs7c0JBQUssU0FBUyxFQUFDLGFBQWE7b0JBQ3hCOzswQkFBSyxTQUFTLEVBQUMsZUFBZTt3QkFDMUI7OzhCQUFLLFNBQVMsRUFBQyxjQUFjOzRCQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUM7eUJBQ3BDO3dCQUNOOzs4QkFBSyxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRyxFQUFDLEtBQUssRUFBRyxPQUFPLEVBQUMsQUFBRTs0QkFDckQsaUNBQUMsU0FBUyxJQUFDLEtBQUssRUFBRSxLQUFLLEFBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxBQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssQUFBQyxFQUFDLElBQUksRUFBRSxJQUFJLEFBQUMsR0FBRTt5QkFDbEU7cUJBQ0o7b0JBQ047OzBCQUFLLFNBQVMsRUFBQyxtQkFBbUI7d0JBQzdCLGNBQWM7d0JBQ2Y7OzhCQUFJLFNBQVMsRUFBQyxvQ0FBb0M7NEJBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUUsVUFBQSxLQUFLO3VDQUFJLHVEQUFPLEdBQUcsRUFBRSxLQUFLLEFBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxBQUFDLEVBQUMsSUFBSSxFQUFHLElBQUksQUFBRSxFQUFDLFVBQVUsRUFBRyxVQUFDLE9BQU87K0NBQUksTUFBSyxVQUFVLENBQUMsT0FBTyxDQUFDO3FDQUFBLEFBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxBQUFDLEdBQUU7NkJBQUEsQ0FBRTt5QkFDOUk7cUJBQ0g7aUJBQ0o7YUFDRyxDQUNmO1NBQ0w7OztlQUNVLHFCQUFDLEtBQUssRUFBRSxZQUFZLEVBQUM7QUFDNUIsZ0JBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDTix1QkFBTzs7OztpQkFBa0IsQ0FBQzthQUM3Qjs7QUFFRCxtQkFBTzs7a0JBQUcsT0FBTyxFQUFFLFlBQVksQUFBQztnQkFBQzs7c0JBQU0sU0FBUyxFQUFDLFdBQVc7O2lCQUFvQjthQUFJLENBQUE7U0FDdkY7OztlQUNTLG9CQUFDLEtBQUssRUFBQztBQUNiLHNDQUFZLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0Qzs7O2VBRWdCLDJCQUFDLEtBQUssRUFBQztBQUNwQixnQkFBRyxDQUFDLEtBQUssRUFBQztBQUNOLHVCQUFPLElBQUksQ0FBQzthQUNmO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7QUFDdkMsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxtQkFDSTs7a0JBQUksU0FBUyxFQUFDLG9CQUFvQjtnQkFDOUI7Ozs7aUJBQWlCO2FBQ2hCLENBQ1A7U0FDTDs7O1dBcERDLEtBQUs7OztxQkF1REkseUJBQVMsVUFBQyxLQUFLO1dBQUcsS0FBSztDQUFBLENBQUUsQ0FBQyxLQUFLLENBQUMiLCJmaWxlIjoiY29udGFpbmVycy9Nb2NoYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFB1cmVDb21wb25lbnQgZnJvbSBcIi4uL3V0aWxzL1B1cmVDb21wb25lbnRcIjtcclxuaW1wb3J0IFN1aXRlIGZyb20gXCIuL1N1aXRlXCI7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7dG9nZ2xlU3VpdGV9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCB7ZGF0YUZvclRlc3QsIGNyZWF0ZVRlc3RGaWxlc30gZnJvbSBcIi4uL2dlbmVyYXRlVGVzdFwiO1xyXG5cclxuXHJcbmNsYXNzIEl0ZW1Db3VudCBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCBwYXNzZWRUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcInBhc3NlZFwiLCB0aGlzLnByb3BzLnN1aXRlKTtcclxuICAgICAgICBjb25zdCBmYWlsZWRUZXN0cyA9IHRoaXMuY291bnRUZXN0cyhcImZhaWxlZFwiLCB0aGlzLnByb3BzLnN1aXRlKTtcclxuICAgICAgICBjb25zdCBwZW5kaW5nVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJwZW5kaW5nXCIsIHRoaXMucHJvcHMuc3VpdGUpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ291bnRlcihcIi1zdWNjZXNzXCIsIHBhc3NlZFRlc3RzLCBcImNoZWNrXCIpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ291bnRlcihcIi1lcnJvclwiLCBmYWlsZWRUZXN0cywgXCJ4XCIpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ291bnRlcihcIlwiLCBwZW5kaW5nVGVzdHMsIFwiY2xvY2tcIil9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ291bnRlcih0eXBlLCBjb3VudCwgaWNvbil7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAwID8gbnVsbCA6IDxzcGFuIGNsYXNzTmFtZT17XCJpbmxpbmUtYmxvY2sgaGlnaGxpZ2h0XCIgKyB0eXBlICsgXCIgaWNvbi1cIitpY29ufT57Y291bnR9PC9zcGFuPlxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50VGVzdHMoc3RhdHVzLCBzdWl0ZUlkKXtcclxuICAgICAgICBjb25zdCBieUlkID0gdGhpcy5wcm9wcy5ieUlkO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlID0gYnlJZChcInN1aXRlc1wiLCBzdWl0ZUlkKTtcclxuICAgICAgICBpZighc3VpdGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3VpdGVzID0gc3VpdGUuc3VpdGVzIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IHRlc3RzID0gc3VpdGUudGVzdHMgfHwgW107XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xyXG4gICAgICAgIHZhciBjdXJyZW50VGVzdCA9IG51bGw7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRlc3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY3VycmVudFRlc3QgPSBieUlkKFwidGVzdHNcIiwgdGVzdHNbaV0pO1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gc3RhdHVzID09PSBjdXJyZW50VGVzdC5zdGF0dXMgPyAxIDogMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHN1aXRlcy5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLmNvdW50VGVzdHMoc3RhdHVzLCBzdWl0ZXNbal0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgU3RhdHNWaWV3IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtzdGF0cyxzdWl0ZXMsIHRlc3RzLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxJdGVtQ291bnQgc3VpdGU9ezB9IGJ5SWQ9e2J5SWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57IHRoaXMuZ2V0RHVyYXRpb24oc3VpdGVzLCB0ZXN0cywgc3RhdHMpIH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oc3VpdGVzLCB0ZXN0cywgc3RhdHMpe1xyXG4gICAgICAgIGlmKCFPYmplY3Qua2V5cyhzdWl0ZXMpLmxlbmd0aCB8fCAhT2JqZWN0LmtleXModGVzdHMpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighc3RhdHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdsb2FkaW5nIGxvYWRpbmctc3Bpbm5lci10aW55IGlubGluZS1ibG9jayc+PC9zcGFuPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayBoaWdobGlnaHQtaW5mbyBpY29uLWRhc2hib2FyZFwiPntzdGF0cy5kdXJhdGlvbn0gbXM8L3NwYW4+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2NoYSBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllcywgZGlzcGF0Y2gsIHN0YXRzLCBhY3Rpb24sIHJlc3RhcnRUZXN0c30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtzdWl0ZXMsIHRlc3RzfSA9IGVudGl0aWVzO1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSAodHlwZSwgaWQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudGl0aWVzW3R5cGVdW2lkXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IG5vVGVzdHNNZXNzYWdlID0gdGhpcy5nZXROb1Rlc3RzTWVzc2FnZShzdGF0cyk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGF0b20tcGFuZWwgY2xhc3M9XCJ0b3Agc2Nyb2xsLXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluc2V0LXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaXRsZShzdGF0cywgcmVzdGFydFRlc3RzKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gc3VpdGVzPXtzdWl0ZXN9IHRlc3RzPXt0ZXN0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtub1Rlc3RzTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfSBhY3Rpb249e2FjdGlvbn0vPiApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2F0b20tcGFuZWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlKHN0YXRzLCByZXN0YXJ0VGVzdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3Bhbj5UZXN0czwvc3Bhbj47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gPGEgb25DbGljaz17cmVzdGFydFRlc3RzfT48c3BhbiBjbGFzc05hbWU9XCJpY29uLXN5bmNcIj5SZS1ydW4gVGVzdHM8L3NwYW4+PC9hPlxyXG4gICAgfVxyXG4gICAgdG9nZ2xlSXRlbShzdWl0ZSl7XHJcbiAgICAgICAgdG9nZ2xlU3VpdGUodGhpcy5wcm9wcywgeyBzdWl0ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb1Rlc3RzTWVzc2FnZShzdGF0cyl7XHJcbiAgICAgICAgaWYoIXN0YXRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXRzLnRlc3RzICE9PSAwIHx8IHN0YXRzLnN1aXRlcyAhPT0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdiYWNrZ3JvdW5kLW1lc3NhZ2UnPlxyXG4gICAgICAgICAgICAgICAgPGxpPk5vIFRlc3RzPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCAoc3RhdGUpPT5zdGF0ZSApKE1vY2hhKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
