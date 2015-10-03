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

var _reactRedux = require('react-redux');

var _Suite = require("./Suite");

var _Suite2 = _interopRequireDefault(_Suite);

var Mocha = (function (_Component) {
    _inherits(Mocha, _Component);

    function Mocha() {
        _classCallCheck(this, Mocha);

        _get(Object.getPrototypeOf(Mocha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Mocha, [{
        key: "render",
        value: function render() {
            var suitesIds = Object.keys(this.props.suites);

            return _react2["default"].createElement(
                "div",
                null,
                this.props.suites.map(function (suite) {
                    return _react2["default"].createElement(_Suite2["default"], { suite: suite });
                })
            );
        }
    }]);

    return Mocha;
})(_react.Component);

function mapStateToProps(state) {
    return {
        suites: state.suites
    };
}

exports["default"] = (0, _reactRedux.connect)(mapStateToProps)(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL01vY2hhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQStCLE9BQU87Ozs7MEJBQ2QsYUFBYTs7cUJBQ25CLFNBQVM7Ozs7SUFFckIsS0FBSztjQUFMLEtBQUs7O2FBQUwsS0FBSzs4QkFBTCxLQUFLOzttQ0FBTCxLQUFLOzs7aUJBQUwsS0FBSzs7ZUFDRCxrQkFBRTtBQUNKLGdCQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWpELG1CQUNJOzs7Z0JBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFFLFVBQUEsS0FBSzsyQkFBSSx1REFBTyxLQUFLLEVBQUUsS0FBSyxBQUFDLEdBQUc7aUJBQUEsQ0FBQzthQUFPLENBQ3ZFO1NBQ0w7OztXQVBDLEtBQUs7OztBQVVYLFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRTtBQUM5QixXQUFPO0FBQ0wsY0FBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO0tBQ3JCLENBQUM7Q0FDSDs7cUJBRWMseUJBQVEsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDIiwiZmlsZSI6Im1vY2hhL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IFN1aXRlIGZyb20gXCIuL1N1aXRlXCI7XHJcblxyXG5jbGFzcyBNb2NoYSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHN1aXRlc0lkcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMuc3VpdGVzKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLnN1aXRlcy5tYXAoIHN1aXRlID0+IDxTdWl0ZSBzdWl0ZT17c3VpdGV9IC8+KX08L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgc3VpdGVzOiBzdGF0ZS5zdWl0ZXNcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTW9jaGEpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
