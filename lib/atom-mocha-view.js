"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _containersMocha = require("./containers/Mocha");

var _containersMocha2 = _interopRequireDefault(_containersMocha);

var _reactRedux = require('react-redux');

var AtomMochaView = (function () {
    function AtomMochaView(state, store) {
        _classCallCheck(this, AtomMochaView);

        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        _reactDom2["default"].render(_react2["default"].createElement(
            _reactRedux.Provider,
            { store: store },
            _react2["default"].createElement(_containersMocha2["default"], null)
        ), this.element);
    }

    _createClass(AtomMochaView, [{
        key: "serialize",
        value: function serialize() {}
    }, {
        key: "destroy",
        value: function destroy() {
            return this.element.remove();
        }
    }]);

    return AtomMochaView;
})();

exports["default"] = AtomMochaView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsrQkFDZCxvQkFBb0I7Ozs7MEJBQ2IsYUFBYTs7SUFFakIsYUFBYTtBQUNuQixhQURNLGFBQWEsQ0FDbEIsS0FBSyxFQUFFLEtBQUssRUFBQzs4QkFEUixhQUFhOztBQUUxQixZQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MsWUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLDhCQUFTLE1BQU0sQ0FDWDs7Y0FBVSxLQUFLLEVBQUUsS0FBSyxBQUFDO1lBQ25CLG9FQUFTO1NBQ0YsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7O2lCQVJnQixhQUFhOztlQVNyQixxQkFBRSxFQUFFOzs7ZUFDTixtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7OztXQVpnQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJhdG9tLW1vY2hhLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IE1vY2hhIGZyb20gXCIuL2NvbnRhaW5lcnMvTW9jaGFcIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdG9tTW9jaGFWaWV3e1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlLCBzdG9yZSl7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXRvbS1tb2NoYScpO1xuICAgICAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgICAgICAgICA8TW9jaGEgLz5cbiAgICAgICAgICAgIDwvUHJvdmlkZXI+LCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKXt9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
