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
})(_react.Component);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvTW9jaGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxQkFBK0IsT0FBTzs7OztxQkFDcEIsU0FBUzs7OzswQkFDTCxhQUFhOzt1QkFDVCxZQUFZOztzQkFDbkIsUUFBUTs7OztJQUdyQixTQUFTO2NBQVQsU0FBUzs7YUFBVCxTQUFTOzhCQUFULFNBQVM7O21DQUFULFNBQVM7OztpQkFBVCxTQUFTOztlQUNMLGtCQUFFO0FBQ0osZ0JBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsZ0JBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEUsZ0JBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEUsbUJBQ0k7OztnQkFDSyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDO2FBQzNDLENBQ1Q7U0FDTDs7O2VBQ1ksdUJBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDNUIsbUJBQU8sS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUc7O2tCQUFNLFNBQVMsRUFBRSx3QkFBd0IsR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFDLElBQUksQUFBQztnQkFBRSxLQUFLO2FBQVEsQ0FBQTtTQUMvRzs7O2VBRVMsb0JBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQztBQUN2QixnQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDN0IsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdEMsZ0JBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDTix1QkFBTyxDQUFDLENBQUM7YUFDWjtBQUNELGdCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNsQyxnQkFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7O0FBRWhDLGdCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLGlCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNqQywyQkFBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsc0JBQU0sSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25EO0FBQ0QsaUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQ2xDLHNCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7QUFDRCxtQkFBTyxNQUFNLENBQUM7U0FDakI7OztXQXBDQyxTQUFTOzs7SUF3Q1QsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOzttQ0FBVCxTQUFTOzs7aUJBQVQsU0FBUzs7ZUFDTCxrQkFBRTt5QkFDZ0MsSUFBSSxDQUFDLEtBQUs7Z0JBQXZDLEtBQUssVUFBTCxLQUFLO2dCQUFDLE1BQU0sVUFBTixNQUFNO2dCQUFFLEtBQUssVUFBTCxLQUFLO2dCQUFFLElBQUksVUFBSixJQUFJOztBQUNoQyxtQkFDSTs7O2dCQUNJLGlDQUFDLFNBQVMsSUFBQyxLQUFLLEVBQUUsQ0FBQyxBQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQUFBQyxHQUFHO2dCQUNuQzs7O29CQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7aUJBQVM7YUFDckQsQ0FDUjtTQUNMOzs7ZUFFVSxxQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztBQUM3QixnQkFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUM7QUFDekQsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxnQkFBRyxDQUFDLEtBQUssRUFBQztBQUNOLHVCQUFPLDJDQUFNLFNBQVMsRUFBQywyQ0FBMkMsR0FBUSxDQUFDO2FBQzlFO0FBQ0QsbUJBQU87O2tCQUFNLFNBQVMsRUFBQyw0Q0FBNEM7Z0JBQUUsS0FBSyxDQUFDLFFBQVE7O2FBQVcsQ0FBQztTQUNsRzs7O1dBbkJDLFNBQVM7OztJQXNCVCxLQUFLO2NBQUwsS0FBSzs7YUFBTCxLQUFLOzhCQUFMLEtBQUs7O21DQUFMLEtBQUs7OztpQkFBTCxLQUFLOztlQUNELGtCQUFFOzs7MEJBQ3dDLElBQUksQ0FBQyxLQUFLO2dCQUEvQyxNQUFNLFdBQU4sTUFBTTtnQkFBRSxRQUFRLFdBQVIsUUFBUTtnQkFBRSxRQUFRLFdBQVIsUUFBUTtnQkFBRSxLQUFLLFdBQUwsS0FBSztnQkFDakMsTUFBTSxHQUFXLFFBQVEsQ0FBekIsTUFBTTtnQkFBRSxLQUFLLEdBQUksUUFBUSxDQUFqQixLQUFLOztBQUNwQixnQkFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUksSUFBSSxFQUFFLEVBQUUsRUFBSztBQUN2Qix1QkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDN0IsQ0FBQztBQUNGLGdCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckQsbUJBQ0k7O2tCQUFZLFNBQU0sa0JBQWtCO2dCQUNoQzs7c0JBQUssU0FBUyxFQUFDLGFBQWE7b0JBQ3hCOzswQkFBSyxTQUFTLEVBQUMsZUFBZTt3QkFDMUI7OzhCQUFLLFNBQVMsRUFBQyxjQUFjOzt5QkFFdkI7d0JBQ047OzhCQUFLLFNBQVMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFHLEVBQUMsS0FBSyxFQUFHLE9BQU8sRUFBQyxBQUFFOzRCQUNyRCxpQ0FBQyxTQUFTLElBQUMsS0FBSyxFQUFFLEtBQUssQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxBQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQUFBQyxHQUFFO3lCQUNsRTtxQkFDSjtvQkFDTjs7MEJBQUssU0FBUyxFQUFDLG1CQUFtQjt3QkFDN0IsY0FBYzt3QkFDZjs7OEJBQUksU0FBUyxFQUFDLG9DQUFvQzs0QkFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBRSxVQUFBLEtBQUs7dUNBQUksdURBQU8sR0FBRyxFQUFFLEtBQUssQUFBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEFBQUMsRUFBQyxJQUFJLEVBQUcsSUFBSSxBQUFFLEVBQUMsVUFBVSxFQUFHLFVBQUMsT0FBTzsrQ0FBSSxNQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUM7cUNBQUEsQUFBRSxHQUFFOzZCQUFBLENBQUU7eUJBQzlIO3FCQUNIO2lCQUNKO2FBQ0csQ0FDZjtTQUNMOzs7ZUFFUyxvQkFBQyxLQUFLLEVBQUM7QUFDYixzQ0FBWSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEM7OztlQUVnQiwyQkFBQyxLQUFLLEVBQUM7QUFDcEIsZ0JBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDTix1QkFBTyxJQUFJLENBQUM7YUFDZjtBQUNELGdCQUFHLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO0FBQ3ZDLHVCQUFPLElBQUksQ0FBQzthQUNmO0FBQ0QsbUJBQ0k7O2tCQUFJLFNBQVMsRUFBQyxvQkFBb0I7Z0JBQzlCOzs7O2lCQUFpQjthQUNoQixDQUNQO1NBQ0w7OztXQTlDQyxLQUFLOzs7cUJBaURJLHlCQUFTLFVBQUMsS0FBSztXQUFHLEtBQUs7Q0FBQSxDQUFFLENBQUMsS0FBSyxDQUFDIiwiZmlsZSI6ImNvbnRhaW5lcnMvTW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU3VpdGUgZnJvbSBcIi4vU3VpdGVcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHt0b2dnbGVTdWl0ZX0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XHJcblxyXG5cclxuY2xhc3MgSXRlbUNvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgcGFzc2VkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJwYXNzZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgZmFpbGVkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJmYWlsZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgcGVuZGluZ1Rlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGVuZGluZ1wiLCB0aGlzLnByb3BzLnN1aXRlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCItc3VjY2Vzc1wiLCBwYXNzZWRUZXN0cywgXCJjaGVja1wiKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCItZXJyb3JcIiwgZmFpbGVkVGVzdHMsIFwieFwiKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCJcIiwgcGVuZGluZ1Rlc3RzLCBcImNsb2NrXCIpfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlckNvdW50ZXIodHlwZSwgY291bnQsIGljb24pe1xyXG4gICAgICAgIHJldHVybiBjb3VudCA9PT0gMCA/IG51bGwgOiA8c3BhbiBjbGFzc05hbWU9e1wiaW5saW5lLWJsb2NrIGhpZ2hsaWdodFwiICsgdHlwZSArIFwiIGljb24tXCIraWNvbn0+e2NvdW50fTwvc3Bhbj5cclxuICAgIH1cclxuXHJcbiAgICBjb3VudFRlc3RzKHN0YXR1cywgc3VpdGVJZCl7XHJcbiAgICAgICAgY29uc3QgYnlJZCA9IHRoaXMucHJvcHMuYnlJZDtcclxuICAgICAgICBjb25zdCBzdWl0ZSA9IGJ5SWQoXCJzdWl0ZXNcIiwgc3VpdGVJZCk7XHJcbiAgICAgICAgaWYoIXN1aXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudFRlc3QgPSBudWxsO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUZXN0ID0gYnlJZChcInRlc3RzXCIsIHRlc3RzW2ldKTtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0YXR1cyA9PT0gY3VycmVudFRlc3Quc3RhdHVzID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBzdWl0ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5jb3VudFRlc3RzKHN0YXR1cywgc3VpdGVzW2pdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIFN0YXRzVmlldyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtzdGF0cyxzdWl0ZXMsIHRlc3RzLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxJdGVtQ291bnQgc3VpdGU9ezB9IGJ5SWQ9e2J5SWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57IHRoaXMuZ2V0RHVyYXRpb24oc3VpdGVzLCB0ZXN0cywgc3RhdHMpIH08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHVyYXRpb24oc3VpdGVzLCB0ZXN0cywgc3RhdHMpe1xyXG4gICAgICAgIGlmKCFPYmplY3Qua2V5cyhzdWl0ZXMpLmxlbmd0aCB8fCAhT2JqZWN0LmtleXModGVzdHMpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighc3RhdHMpe1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPSdsb2FkaW5nIGxvYWRpbmctc3Bpbm5lci10aW55IGlubGluZS1ibG9jayc+PC9zcGFuPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayBoaWdobGlnaHQtaW5mbyBpY29uLWRhc2hib2FyZFwiPntzdGF0cy5kdXJhdGlvbn0gbXM8L3NwYW4+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2NoYSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHQsIGVudGl0aWVzLCBkaXNwYXRjaCwgc3RhdHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBlbnRpdGllcztcclxuICAgICAgICBjb25zdCBieUlkID0gKHR5cGUsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllc1t0eXBlXVtpZF07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBub1Rlc3RzTWVzc2FnZSA9IHRoaXMuZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzPVwidG9wIHNjcm9sbC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnNldC1wYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCIgc3R5bGU9eyB7ZmxvYXQgOiBcInJpZ2h0XCJ9IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdHNWaWV3IHN0YXRzPXtzdGF0c30gc3VpdGVzPXtzdWl0ZXN9IHRlc3RzPXt0ZXN0c30gYnlJZD17YnlJZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgcGFkZGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtub1Rlc3RzTWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfS8+ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUl0ZW0oc3VpdGUpe1xyXG4gICAgICAgIHRvZ2dsZVN1aXRlKHRoaXMucHJvcHMsIHsgc3VpdGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Tm9UZXN0c01lc3NhZ2Uoc3RhdHMpe1xyXG4gICAgICAgIGlmKCFzdGF0cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0cy50ZXN0cyAhPT0gMCB8fCBzdGF0cy5zdWl0ZXMgIT09IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nYmFja2dyb3VuZC1tZXNzYWdlJz5cclxuICAgICAgICAgICAgICAgIDxsaT5ObyBUZXN0czwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggKHN0YXRlKT0+c3RhdGUgKShNb2NoYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
