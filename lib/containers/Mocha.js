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

var _reactRedux = require("react-redux");

var _actions = require("../actions");

var Test = (function (_Component) {
    _inherits(Test, _Component);

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
                test.title
            );
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
})(_react.Component);

var ItemCount = (function (_Component2) {
    _inherits(ItemCount, _Component2);

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
                this.renderCounter("success", passedTests),
                this.renderCounter("error", failedTests),
                this.renderCounter("subtle", pendingTests)
            );
        }
    }, {
        key: "renderCounter",
        value: function renderCounter(type, count) {
            return count === 0 ? null : _react2["default"].createElement(
                "span",
                { className: "badge badge-small badge-" + type },
                count
            );
        }
    }, {
        key: "countTests",
        value: function countTests(status, suiteId) {
            var byId = this.props.byId;
            var suite = byId("suites", suiteId);
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

var Suite = (function (_Component3) {
    _inherits(Suite, _Component3);

    function Suite() {
        _classCallCheck(this, Suite);

        _get(Object.getPrototypeOf(Suite.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Suite, [{
        key: "render",
        value: function render() {
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
                    suite.title,
                    " ",
                    _react2["default"].createElement(ItemCount, { suite: suiteId, byId: byId })
                ),
                _react2["default"].createElement(
                    "ul",
                    { className: "list-tree" },
                    tests.map(function (test) {
                        return _react2["default"].createElement(Test, { key: test, testId: test, byId: byId });
                    }),
                    _react2["default"].createElement(
                        "li",
                        { className: "list-item" },
                        suites.map(function (suite) {
                            return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId, toggleItem: toggleItem });
                        })
                    )
                )
            );
        }
    }]);

    return Suite;
})(_react.Component);

var Mocha = (function (_Component4) {
    _inherits(Mocha, _Component4);

    function Mocha() {
        _classCallCheck(this, Mocha);

        _get(Object.getPrototypeOf(Mocha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Mocha, [{
        key: "render",
        value: function render() {
            var _this = this;

            var _props3 = this.props;
            var result = _props3.result;
            var entities = _props3.entities;
            var dispatch = _props3.dispatch;
            var tests = entities.tests;

            var byId = function byId(type, id) {
                return entities[type][id];
            };

            return _react2["default"].createElement(
                "atom-panel",
                { className: "top scroll-panel" },
                _react2["default"].createElement(
                    "div",
                    { className: "inset-panel" },
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-heading" },
                        "Tests"
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-body padded" },
                        _react2["default"].createElement(
                            "ul",
                            { className: "list-tree has-collapsable-children" },
                            result.map(function (suite) {
                                return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId, toggleItem: function (suiteId) {
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
    }]);

    return Mocha;
})(_react.Component);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QUFPLEVBQUUsS0FBSyxBQUFDLEVBQUMsSUFBSSxFQUFHLElBQUksQUFBRSxFQUFDLFVBQVUsRUFBRyxVQUFDLE9BQU87K0NBQUksTUFBSyxVQUFVLENBQUMsT0FBTyxDQUFDO3FDQUFBLEFBQUUsR0FBRTs2QkFBQSxDQUFFO3lCQUM5SDtxQkFDSDtpQkFDSjthQUNHLENBQ2Y7U0FDTDs7O2VBRVMsb0JBQUMsS0FBSyxFQUFDO0FBQ2Isc0NBQVksSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDOzs7V0F4QkMsS0FBSzs7O3FCQTJCSSx5QkFBUyxVQUFDLEtBQUs7V0FBRyxLQUFLO0NBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHt0b2dnbGVTdWl0ZX0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuXHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0SWQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9eyBcImxpc3QtaXRlbSBcIiArIHRoaXMuZ2V0Q29sb3IodGVzdCkgfT57dGVzdC50aXRsZX08L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xvcih7c3RhdHVzfSl7XHJcbiAgICAgICAgaWYoc3RhdHVzID09PSBcInBhc3NlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1zdWNjZXNzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwidGV4dC1zdWJ0bGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbUNvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgcGFzc2VkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJwYXNzZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgZmFpbGVkVGVzdHMgPSB0aGlzLmNvdW50VGVzdHMoXCJmYWlsZWRcIiwgdGhpcy5wcm9wcy5zdWl0ZSk7XHJcbiAgICAgICAgY29uc3QgcGVuZGluZ1Rlc3RzID0gdGhpcy5jb3VudFRlc3RzKFwicGVuZGluZ1wiLCB0aGlzLnByb3BzLnN1aXRlKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCJzdWNjZXNzXCIsIHBhc3NlZFRlc3RzKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvdW50ZXIoXCJlcnJvclwiLCBmYWlsZWRUZXN0cyl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb3VudGVyKFwic3VidGxlXCIsIHBlbmRpbmdUZXN0cyl9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ291bnRlcih0eXBlLCBjb3VudCl7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID09PSAwID8gbnVsbCA6IDxzcGFuIGNsYXNzTmFtZT17XCJiYWRnZSBiYWRnZS1zbWFsbCBiYWRnZS1cIiArIHR5cGV9Pntjb3VudH08L3NwYW4+XHJcbiAgICB9XHJcblxyXG4gICAgY291bnRUZXN0cyhzdGF0dXMsIHN1aXRlSWQpe1xyXG4gICAgICAgIGNvbnN0IGJ5SWQgPSB0aGlzLnByb3BzLmJ5SWQ7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcclxuICAgICAgICB2YXIgY3VycmVudFRlc3QgPSBudWxsO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUZXN0ID0gYnlJZChcInRlc3RzXCIsIHRlc3RzW2ldKTtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0YXR1cyA9PT0gY3VycmVudFRlc3Quc3RhdHVzID8gMSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBzdWl0ZXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gdGhpcy5jb3VudFRlc3RzKHN0YXR1cywgc3VpdGVzW2pdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3VpdGUgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlSWQsIGJ5SWQsIHRvZ2dsZUl0ZW19ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzdWl0ZSA9IGJ5SWQoXCJzdWl0ZXNcIiwgc3VpdGVJZCk7XHJcbiAgICAgICAgY29uc3Qgc3VpdGVzID0gc3VpdGUuc3VpdGVzIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IHRlc3RzID0gc3VpdGUudGVzdHMgfHwgW107XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJsaXN0LW5lc3RlZC1pdGVtIFwiICsgc3VpdGUudG9nZ2xlU3RhdGV9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKT0+dG9nZ2xlSXRlbShzdWl0ZUlkKX0gY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3N1aXRlLnRpdGxlfSA8SXRlbUNvdW50IHN1aXRlPXtzdWl0ZUlkfSBieUlkPXtieUlkfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXN0cy5tYXAoIHRlc3QgPT4gPFRlc3Qga2V5PXt0ZXN0fSB0ZXN0SWQ9e3Rlc3R9IGJ5SWQ9e2J5SWR9Lz4pIH1cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc3VpdGVzLm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXtieUlkfSB0b2dnbGVJdGVtPXt0b2dnbGVJdGVtfS8+KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgTW9jaGEgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllcywgZGlzcGF0Y2h9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dGVzdHN9ID0gZW50aXRpZXM7XHJcbiAgICAgICAgY29uc3QgYnlJZCA9ICh0eXBlLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNbdHlwZV1baWRdO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzTmFtZT1cInRvcCBzY3JvbGwtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5zZXQtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5UZXN0czwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keSBwYWRkZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcmVzdWx0Lm1hcCggc3VpdGUgPT4gPFN1aXRlIGtleT17c3VpdGV9IHN1aXRlSWQ9e3N1aXRlfSBieUlkPXsgYnlJZCB9IHRvZ2dsZUl0ZW09eyAoc3VpdGVJZCk9PiB0aGlzLnRvZ2dsZUl0ZW0oc3VpdGVJZCkgfS8+ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUl0ZW0oc3VpdGUpe1xyXG4gICAgICAgIHRvZ2dsZVN1aXRlKHRoaXMucHJvcHMsIHsgc3VpdGUgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIChzdGF0ZSk9PnN0YXRlICkoTW9jaGEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
