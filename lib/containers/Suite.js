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

var TestError = (function (_PureComponent) {
    _inherits(TestError, _PureComponent);

    function TestError() {
        _classCallCheck(this, TestError);

        _get(Object.getPrototypeOf(TestError.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TestError, [{
        key: "render",
        value: function render() {
            var error = this.props.error;

            return _react2["default"].createElement(
                "atom-panel",
                { "class": "top" },
                _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2["default"].createElement(
                            "span",
                            { className: "text-error" },
                            error.message
                        )
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-body scroll-x" },
                        this.renderStackFrames(error.stack)
                    )
                )
            );
        }
    }, {
        key: "renderStackFrames",
        value: function renderStackFrames(stack) {
            var stackFrames = stack.map(function (frame, i) {
                return _react2["default"].createElement(
                    "li",
                    { key: i, className: "list-item" },
                    frame.source
                );
            });
            return _react2["default"].createElement(
                "ul",
                { className: "list-group" },
                stackFrames
            );
        }
    }]);

    return TestError;
})(_utilsPureComponent2["default"]);

var Test = (function (_PureComponent2) {
    _inherits(Test, _PureComponent2);

    function Test() {
        _classCallCheck(this, Test);

        _get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Test, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var testId = _props.testId;
            var byId = _props.byId;

            var test = byId("tests", testId);
            return _react2["default"].createElement(
                "li",
                { className: "list-item " + this.getColor(test) },
                _react2["default"].createElement(
                    "div",
                    null,
                    test.title
                ),
                _react2["default"].createElement(
                    "div",
                    null,
                    this.getErrorInfo(test.error)
                )
            );
        }
    }, {
        key: "getErrorInfo",
        value: function getErrorInfo(error) {
            if (!error) {
                return null;
            }
            return _react2["default"].createElement(TestError, { error: error });
        }
    }, {
        key: "getColor",
        value: function getColor(_ref) {
            var status = _ref.status;

            if (status === "passed") {
                return "text-success";
            }
            if (status === "failed") {
                return "text-error";
            }
            return "text-subtle";
        }
    }]);

    return Test;
})(_utilsPureComponent2["default"]);

var Suite = (function (_PureComponent3) {
    _inherits(Suite, _PureComponent3);

    function Suite() {
        _classCallCheck(this, Suite);

        _get(Object.getPrototypeOf(Suite.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Suite, [{
        key: "render",
        value: function render() {
            console.log(this);
            var _props2 = this.props;
            var suiteId = _props2.suiteId;
            var byId = _props2.byId;
            var toggleItem = _props2.toggleItem;

            var suite = byId("suites", suiteId);
            var suites = suite.suites || [];
            var tests = suite.tests || [];
            return _react2["default"].createElement(
                "li",
                { className: "list-nested-item " + suite.toggleState },
                _react2["default"].createElement(
                    "div",
                    { onClick: function () {
                            return toggleItem(suiteId);
                        }, className: "list-item" },
                    _react2["default"].createElement(
                        "span",
                        { className: this.determineTitleColor(suite, tests, byId) },
                        suite.title
                    )
                ),
                _react2["default"].createElement(
                    "ul",
                    { className: "list-tree" },
                    tests.map(function (test) {
                        return _react2["default"].createElement(Test, { key: test, testId: test, byId: byId });
                    }),
                    suites.map(function (suite) {
                        return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId, toggleItem: toggleItem });
                    })
                )
            );
        }
    }, {
        key: "determineTitleColor",
        value: function determineTitleColor(suite) {
            if (suite.status === "partial") {
                return "text-warning";
            }
            if (suite.status === "failed") {
                return "text-error";
            }
            if (suite.status === "passed") {
                return "text-success";
            }
            return "";
        }
    }]);

    return Suite;
})(_utilsPureComponent2["default"]);

exports["default"] = Suite;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvU3VpdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxQkFBa0IsT0FBTzs7OztrQ0FDQyx3QkFBd0I7Ozs7SUFFNUMsU0FBUztjQUFULFNBQVM7O2FBQVQsU0FBUzs4QkFBVCxTQUFTOzttQ0FBVCxTQUFTOzs7aUJBQVQsU0FBUzs7ZUFDTCxrQkFBRTtnQkFDRyxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBbkIsS0FBSzs7QUFDWixtQkFDSTs7a0JBQVksU0FBTSxLQUFLO2dCQUNuQjs7O29CQUNJOzswQkFBSyxTQUFTLEVBQUMsZUFBZTt3QkFDMUI7OzhCQUFNLFNBQVMsRUFBQyxZQUFZOzRCQUFFLEtBQUssQ0FBQyxPQUFPO3lCQUFRO3FCQUNqRDtvQkFDTjs7MEJBQUssU0FBUyxFQUFDLHFCQUFxQjt3QkFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQ2xDO2lCQUNKO2FBQ0csQ0FDaEI7U0FDSjs7O2VBQ2dCLDJCQUFDLEtBQUssRUFBQztBQUNwQixnQkFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDLEVBQUs7QUFDeEMsdUJBQU87O3NCQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUMsRUFBQyxTQUFTLEVBQUMsV0FBVztvQkFBRSxLQUFLLENBQUMsTUFBTTtpQkFBTSxDQUFBO2FBQy9ELENBQUMsQ0FBQztBQUNILG1CQUNJOztrQkFBSSxTQUFTLEVBQUMsWUFBWTtnQkFDckIsV0FBVzthQUNYLENBQ1A7U0FDTDs7O1dBekJDLFNBQVM7OztJQTRCVCxJQUFJO2NBQUosSUFBSTs7YUFBSixJQUFJOzhCQUFKLElBQUk7O21DQUFKLElBQUk7OztpQkFBSixJQUFJOztlQUNBLGtCQUFFO3lCQUNtQixJQUFJLENBQUMsS0FBSztnQkFBMUIsTUFBTSxVQUFOLE1BQU07Z0JBQUUsSUFBSSxVQUFKLElBQUk7O0FBQ25CLGdCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLG1CQUNJOztrQkFBSSxTQUFTLEVBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEFBQUU7Z0JBQ2hEOzs7b0JBQU0sSUFBSSxDQUFDLEtBQUs7aUJBQU87Z0JBQ3ZCOzs7b0JBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUFPO2FBQ3pDLENBQ1A7U0FDTDs7O2VBQ1csc0JBQUMsS0FBSyxFQUFFO0FBQ2hCLGdCQUFHLENBQUMsS0FBSyxFQUFDO0FBQ04sdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxtQkFBTyxpQ0FBQyxTQUFTLElBQUMsS0FBSyxFQUFFLEtBQUssQUFBQyxHQUFHLENBQUM7U0FDdEM7OztlQUNPLGtCQUFDLElBQVEsRUFBQztnQkFBUixNQUFNLEdBQVAsSUFBUSxDQUFQLE1BQU07O0FBQ1osZ0JBQUcsTUFBTSxLQUFLLFFBQVEsRUFBQztBQUNuQix1QkFBTyxjQUFjLENBQUM7YUFDekI7QUFDRCxnQkFBRyxNQUFNLEtBQUssUUFBUSxFQUFDO0FBQ25CLHVCQUFPLFlBQVksQ0FBQzthQUN2QjtBQUNELG1CQUFPLGFBQWEsQ0FBQztTQUN4Qjs7O1dBekJDLElBQUk7OztJQTRCVyxLQUFLO2NBQUwsS0FBSzs7YUFBTCxLQUFLOzhCQUFMLEtBQUs7O21DQUFMLEtBQUs7OztpQkFBTCxLQUFLOztlQUNoQixrQkFBRztBQUNMLG1CQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzBCQUNrQixJQUFJLENBQUMsS0FBSztnQkFBdkMsT0FBTyxXQUFQLE9BQU87Z0JBQUUsSUFBSSxXQUFKLElBQUk7Z0JBQUUsVUFBVSxXQUFWLFVBQVU7O0FBQ2hDLGdCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLGdCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNsQyxnQkFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDaEMsbUJBQ0k7O2tCQUFJLFNBQVMsRUFBRSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsV0FBVyxBQUFDO2dCQUNuRDs7c0JBQUssT0FBTyxFQUFFO21DQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUM7eUJBQUEsQUFBQyxFQUFDLFNBQVMsRUFBQyxXQUFXO29CQUN4RDs7MEJBQU0sU0FBUyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxBQUFDO3dCQUFFLEtBQUssQ0FBQyxLQUFLO3FCQUFRO2lCQUNqRjtnQkFDTjs7c0JBQUksU0FBUyxFQUFDLFdBQVc7b0JBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQSxJQUFJOytCQUFJLGlDQUFDLElBQUksSUFBQyxHQUFHLEVBQUUsSUFBSSxBQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQUFBQyxFQUFDLElBQUksRUFBRSxJQUFJLEFBQUMsR0FBRTtxQkFBQSxDQUFDO29CQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFFLFVBQUEsS0FBSzsrQkFBSSxpQ0FBQyxLQUFLLElBQUMsR0FBRyxFQUFFLEtBQUssQUFBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEFBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxBQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsQUFBQyxHQUFFO3FCQUFBLENBQUM7aUJBQy9GO2FBQ0osQ0FDUjtTQUNKOzs7ZUFFa0IsNkJBQUMsS0FBSyxFQUFDO0FBQ3RCLGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDO0FBQzFCLHVCQUFPLGNBQWMsQ0FBQzthQUN6QjtBQUNELGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFDO0FBQ3pCLHVCQUFPLFlBQVksQ0FBQzthQUN2QjtBQUNELGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFDO0FBQ3pCLHVCQUFPLGNBQWMsQ0FBQzthQUN6QjtBQUNELG1CQUFPLEVBQUUsQ0FBQztTQUNiOzs7V0EvQmdCLEtBQUs7OztxQkFBTCxLQUFLIiwiZmlsZSI6ImNvbnRhaW5lcnMvU3VpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQdXJlQ29tcG9uZW50IGZyb20gXCIuLi91dGlscy9QdXJlQ29tcG9uZW50XCI7XHJcblxyXG5jbGFzcyBUZXN0RXJyb3IgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGF0b20tcGFuZWwgY2xhc3M9J3RvcCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lcnJvclwiPntlcnJvci5tZXNzYWdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgc2Nyb2xsLXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhY2tGcmFtZXMoZXJyb3Iuc3RhY2spfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXJTdGFja0ZyYW1lcyhzdGFjayl7XHJcbiAgICAgICAgY29uc3Qgc3RhY2tGcmFtZXMgPSBzdGFjay5tYXAoKGZyYW1lLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJsaXN0LWl0ZW1cIj57ZnJhbWUuc291cmNlfTwvbGk+XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbGlzdC1ncm91cCc+XHJcbiAgICAgICAgICAgICAgICB7c3RhY2tGcmFtZXN9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0SWQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9eyBcImxpc3QtaXRlbSBcIiArIHRoaXMuZ2V0Q29sb3IodGVzdCkgfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3Rlc3QudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLmdldEVycm9ySW5mbyh0ZXN0LmVycm9yKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0RXJyb3JJbmZvKGVycm9yKSB7XHJcbiAgICAgICAgaWYoIWVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8VGVzdEVycm9yIGVycm9yPXtlcnJvcn0gLz47XHJcbiAgICB9XHJcbiAgICBnZXRDb2xvcih7c3RhdHVzfSl7XHJcbiAgICAgICAgaWYoc3RhdHVzID09PSBcInBhc3NlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1zdWNjZXNzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwidGV4dC1zdWJ0bGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VpdGUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHtzdWl0ZUlkLCBieUlkLCB0b2dnbGVJdGVtfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wibGlzdC1uZXN0ZWQtaXRlbSBcIiArIHN1aXRlLnRvZ2dsZVN0YXRlfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17KCk9PnRvZ2dsZUl0ZW0oc3VpdGVJZCl9IGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17dGhpcy5kZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlLCB0ZXN0cywgYnlJZCl9PntzdWl0ZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LXRyZWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRlc3RzLm1hcCggdGVzdCA9PiA8VGVzdCBrZXk9e3Rlc3R9IHRlc3RJZD17dGVzdH0gYnlJZD17YnlJZH0vPikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3VpdGVzLm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXtieUlkfSB0b2dnbGVJdGVtPXt0b2dnbGVJdGVtfS8+KSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBkZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlKXtcclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFydGlhbFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC13YXJuaW5nXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3VpdGUuc3RhdHVzID09PSBcInBhc3NlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1zdWNjZXNzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
