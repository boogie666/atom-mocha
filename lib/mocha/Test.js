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

var Test = (function (_Component) {
    _inherits(Test, _Component);

    function Test() {
        _classCallCheck(this, Test);

        _get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Test, [{
        key: "render",
        value: function render() {
            var _props$test = this.props.test;
            var title = _props$test.title;
            var state = _props$test.state;
            var time = _props$test.time;

            var className = "mocha-test " + state;

            return _react2["default"].createElement(
                "div",
                { className: className },
                _react2["default"].createElement(
                    "span",
                    { className: "mocha-test-title" },
                    title
                ),
                _react2["default"].createElement(
                    "span",
                    { className: "mocha-test-time" },
                    time
                )
            );
        }
    }]);

    return Test;
})(_react.Component);

exports["default"] = Test;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL1Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztxQkFDK0IsT0FBTzs7OztJQUVqQixJQUFJO2NBQUosSUFBSTs7YUFBSixJQUFJOzhCQUFKLElBQUk7O21DQUFKLElBQUk7OztpQkFBSixJQUFJOztlQUNmLGtCQUFFOzhCQUN5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQXJDLEtBQUssZUFBTCxLQUFLO2dCQUFFLEtBQUssZUFBTCxLQUFLO2dCQUFFLElBQUksZUFBSixJQUFJOztBQUN6QixnQkFBTSxTQUFTLEdBQUcsYUFBYSxHQUFHLEtBQUssQ0FBQzs7QUFFeEMsbUJBQ0k7O2tCQUFLLFNBQVMsRUFBRSxTQUFTLEFBQUM7Z0JBQ3RCOztzQkFBTSxTQUFTLEVBQUMsa0JBQWtCO29CQUFFLEtBQUs7aUJBQVE7Z0JBQ2pEOztzQkFBTSxTQUFTLEVBQUMsaUJBQWlCO29CQUFFLElBQUk7aUJBQVE7YUFDN0MsQ0FDUjtTQUNMOzs7V0FYZ0IsSUFBSTs7O3FCQUFKLElBQUkiLCJmaWxlIjoibW9jaGEvVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHt0aXRsZSwgc3RhdGUsIHRpbWV9ID0gdGhpcy5wcm9wcy50ZXN0O1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IFwibW9jaGEtdGVzdCBcIiArIHN0YXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vY2hhLXRlc3QtdGl0bGVcIj57dGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9jaGEtdGVzdC10aW1lXCI+e3RpbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
