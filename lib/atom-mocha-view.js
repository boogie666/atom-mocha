"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mochaMocha = require("./mocha/Mocha");

var _mochaMocha2 = _interopRequireDefault(_mochaMocha);

var _reactRedux = require('react-redux');

var AtomMochaView = (function () {
    function AtomMochaView(state, store) {
        _classCallCheck(this, AtomMochaView);

        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        _react2["default"].render(_react2["default"].createElement(
            _reactRedux.Provider,
            { store: store },
            function () {
                return _react2["default"].createElement(_mochaMocha2["default"], null);
            }
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
    }, {
        key: "getElement",
        value: function getElement() {
            return this.element;
        }
    }]);

    return AtomMochaView;
})();

exports["default"] = AtomMochaView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7MEJBQ1AsZUFBZTs7OzswQkFDUixhQUFhOztJQUlqQixhQUFhO0FBQ25CLGFBRE0sYUFBYSxDQUNsQixLQUFLLEVBQUUsS0FBSyxFQUFDOzhCQURSLGFBQWE7O0FBRTFCLFlBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxZQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsMkJBQU0sTUFBTSxDQUNSOztjQUFVLEtBQUssRUFBRSxLQUFLLEFBQUM7WUFDbEI7dUJBQU0sK0RBQVM7YUFBQTtTQUNULEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2xDOztpQkFSZ0IsYUFBYTs7ZUFTckIscUJBQUUsRUFBRTs7O2VBQ04sbUJBQUc7QUFDTixtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hDOzs7ZUFDUyxzQkFBRTtBQUNSLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7OztXQWZnQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJhdG9tLW1vY2hhLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTW9jaGEgZnJvbSBcIi4vbW9jaGEvTW9jaGFcIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRvbU1vY2hhVmlld3tcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSwgc3RvcmUpe1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2F0b20tbW9jaGEnKTtcbiAgICAgICAgUmVhY3QucmVuZGVyKFxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgeygpID0+IDxNb2NoYSAvPn1cbiAgICAgICAgICAgIDwvUHJvdmlkZXI+LCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKXt9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
