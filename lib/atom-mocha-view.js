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

var _atom = require("atom");

var AtomMochaView = (function () {
    function AtomMochaView(state, store, runtime) {
        var _this = this;

        _classCallCheck(this, AtomMochaView);

        this.runtime = runtime;
        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        _reactDom2["default"].render(_react2["default"].createElement(
            _reactRedux.Provider,
            { store: store },
            _react2["default"].createElement(_containersMocha2["default"], { action: function (frame) {
                    return _this.openFileAt(frame);
                }, restartTests: function () {
                    return _this.restartTests();
                } })
        ), this.element);
    }

    _createClass(AtomMochaView, [{
        key: "restartTests",
        value: function restartTests() {
            this.runtime.start();
        }
    }, {
        key: "openFileAt",
        value: function openFileAt(frame) {
            var fileName = frame.fileName;
            var lineNumber = frame.lineNumber;
            var columnNumber = frame.columnNumber;

            atom.workspace.open(fileName).then(function (editor) {
                var position = new _atom.Point(lineNumber - 1, columnNumber - 1);
                editor.scrollToBufferPosition(position, {
                    center: true
                });
                editor.setCursorBufferPosition(position);
                if (columnNumber < 0) {
                    editor.moveToFirstCharacterOfLine();
                }
            });
        }
    }, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7d0JBQ0osV0FBVzs7OzsrQkFDZCxvQkFBb0I7Ozs7MEJBQ2IsYUFBYTs7b0JBQ2xCLE1BQU07O0lBRUwsYUFBYTtBQUNuQixhQURNLGFBQWEsQ0FDbEIsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7Ozs4QkFEakIsYUFBYTs7QUFFMUIsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsWUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLFlBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6Qyw4QkFBUyxNQUFNLENBQ1g7O2NBQVUsS0FBSyxFQUFFLEtBQUssQUFBQztZQUNuQixpRUFBTyxNQUFNLEVBQUUsVUFBQyxLQUFLOzJCQUFHLE1BQUssVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFBQSxBQUFDLEVBQUMsWUFBWSxFQUFFOzJCQUFJLE1BQUssWUFBWSxFQUFFO2lCQUFBLEFBQUMsR0FBRTtTQUNqRixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQzs7aUJBVGdCLGFBQWE7O2VBVWxCLHdCQUFFO0FBQ1YsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEI7OztlQUNTLG9CQUFDLEtBQUssRUFBQztnQkFDTixRQUFRLEdBQThCLEtBQUssQ0FBM0MsUUFBUTtnQkFBRSxVQUFVLEdBQWtCLEtBQUssQ0FBakMsVUFBVTtnQkFBRSxZQUFZLEdBQUksS0FBSyxDQUFyQixZQUFZOztBQUN6QyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFFLFVBQUEsTUFBTSxFQUFJO0FBQzFDLG9CQUFNLFFBQVEsR0FBRyxnQkFBVSxVQUFVLEdBQUcsQ0FBQyxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RCxzQkFBTSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRTtBQUNwQywwQkFBTSxFQUFHLElBQUk7aUJBQ2hCLENBQUMsQ0FBQztBQUNILHNCQUFNLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsb0JBQUksWUFBWSxHQUFHLENBQUMsRUFBQztBQUNqQiwwQkFBTSxDQUFDLDBCQUEwQixFQUFFLENBQUM7aUJBQ3ZDO2FBQ0osQ0FBQyxDQUFDO1NBQ047OztlQUNRLHFCQUFFLEVBQUU7OztlQUNOLG1CQUFHO0FBQ04sbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoQzs7O1dBN0JnQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJhdG9tLW1vY2hhLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IE1vY2hhIGZyb20gXCIuL2NvbnRhaW5lcnMvTW9jaGFcIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtQb2ludH0gZnJvbSBcImF0b21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRvbU1vY2hhVmlld3tcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSwgc3RvcmUsIHJ1bnRpbWUpe1xuICAgICAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2F0b20tbW9jaGEnKTtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgPE1vY2hhIGFjdGlvbj17KGZyYW1lKT0+dGhpcy5vcGVuRmlsZUF0KGZyYW1lKX0gcmVzdGFydFRlc3RzPXsoKT0+dGhpcy5yZXN0YXJ0VGVzdHMoKX0vPlxuICAgICAgICAgICAgPC9Qcm92aWRlcj4sIHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICAgIHJlc3RhcnRUZXN0cygpe1xuICAgICAgICB0aGlzLnJ1bnRpbWUuc3RhcnQoKTtcbiAgICB9XG4gICAgb3BlbkZpbGVBdChmcmFtZSl7XG4gICAgICAgIGNvbnN0IHtmaWxlTmFtZSwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyfSA9IGZyYW1lO1xuICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVOYW1lKS50aGVuKCBlZGl0b3IgPT4ge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBuZXcgUG9pbnQobGluZU51bWJlciAtIDEsIGNvbHVtbk51bWJlciAtIDEpO1xuICAgICAgICAgICAgZWRpdG9yLnNjcm9sbFRvQnVmZmVyUG9zaXRpb24ocG9zaXRpb24sIHtcbiAgICAgICAgICAgICAgICBjZW50ZXIgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgICAgICBpZiAoY29sdW1uTnVtYmVyIDwgMCl7XG4gICAgICAgICAgICAgICAgZWRpdG9yLm1vdmVUb0ZpcnN0Q2hhcmFjdGVyT2ZMaW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKXt9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
