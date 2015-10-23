"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _immutable = require("immutable");

var _utilsProcessor = require("./utils/processor");

var _utilsProcessor2 = _interopRequireDefault(_utilsProcessor);

var _utilsMakeSuites = require("./utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

var _actions = require("./actions");

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var Runtime = (function () {
    function Runtime(store) {
        _classCallCheck(this, Runtime);

        this.store = store;
        this.files = [];
    }

    _createClass(Runtime, [{
        key: "start",
        value: function start() {
            var store = this.store;
            var files = this.files;

            var mocha = _child_process2["default"].fork(__dirname + '/../lib/mocha/mocha-process.js', this.files);

            (0, _actions.restart)(store);
            mocha.on("message", function (action) {
                if (action.message === "ERROR") {
                    throw action.error;
                }
                switch (action.message) {
                    case "BEGIN":
                        return (0, _actions.begin)(store, { data: (0, _utilsProcessor2["default"])([(0, _utilsMakeSuites2["default"])(action.data)]) });
                    case "END":
                        return (0, _actions.done)(store, { data: action.data });
                    case "START_TEST":
                        return (0, _actions.startTest)(store, { test: action.data });
                    case "END_TEST":
                        return (0, _actions.finishTest)(store, { test: action.data });
                    case "SUITE_END":
                        return (0, _actions.endSuite)(store, { suite: action.data });
                }
            });
        }
    }, {
        key: "clearFiles",
        value: function clearFiles() {
            this.files = [];
        }
    }, {
        key: "addFile",
        value: function addFile(filePath) {
            this.files.push(filePath);
        }
    }]);

    return Runtime;
})();

exports["default"] = Runtime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3FCQUFrQixPQUFPOzs7O3lCQUNKLFdBQVc7OzhCQUNWLG1CQUFtQjs7OzsrQkFDbkIscUJBQXFCOzs7O3VCQUN5QixXQUFXOzs2QkFDM0QsZUFBZTs7OztJQUVkLE9BQU87QUFDYixhQURNLE9BQU8sQ0FDWixLQUFLLEVBQUM7OEJBREQsT0FBTzs7QUFFcEIsWUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDbkI7O2lCQUpnQixPQUFPOztlQUtuQixpQkFBRTtnQkFDSSxLQUFLLEdBQVksSUFBSSxDQUFyQixLQUFLO2dCQUFFLEtBQUssR0FBSyxJQUFJLENBQWQsS0FBSzs7QUFDbkIsZ0JBQU0sS0FBSyxHQUFHLDJCQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVyRixrQ0FBUSxLQUFLLENBQUMsQ0FBQztBQUNmLGlCQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFTLE1BQU0sRUFBQztBQUNoQyxvQkFBRyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBQztBQUMxQiwwQkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUN0QjtBQUNELHdCQUFPLE1BQU0sQ0FBQyxPQUFPO0FBQ2pCLHlCQUFLLE9BQU87QUFDUiwrQkFBTyxvQkFBTSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsaUNBQVUsQ0FBQyxrQ0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUUsQ0FBQztBQUFBLEFBQ3hFLHlCQUFLLEtBQUs7QUFDTiwrQkFBTyxtQkFBSyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUMvQyx5QkFBSyxZQUFZO0FBQ2IsK0JBQU8sd0JBQVUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDcEQseUJBQUssVUFBVTtBQUNYLCtCQUFPLHlCQUFXLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ3JELHlCQUFLLFdBQVc7QUFDWiwrQkFBTyx1QkFBUyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxpQkFDdkQ7YUFDSixDQUFDLENBQUM7U0FDTjs7O2VBQ1Msc0JBQUU7QUFDUixnQkFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7OztlQUNNLGlCQUFDLFFBQVEsRUFBQztBQUNiLGdCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3Qjs7O1dBakNnQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJydW50aW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vY2hhIGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQge2Zyb21KU30gZnJvbSBcImltbXV0YWJsZVwiO1xyXG5pbXBvcnQgcHJvY2Vzc29yIGZyb20gXCIuL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuL3V0aWxzL21ha2Utc3VpdGVzXCI7XHJcbmltcG9ydCB7YmVnaW4sIGRvbmUsIGVuZFN1aXRlLCBzdGFydFRlc3QsIGZpbmlzaFRlc3QsIHJlc3RhcnR9IGZyb20gXCIuL2FjdGlvbnNcIjtcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bnRpbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yZSl7XHJcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgY29uc3Qge3N0b3JlLCBmaWxlc30gPSAgdGhpcztcclxuICAgICAgICBjb25zdCBtb2NoYSA9IHByb2Nlc3MuZm9yayhfX2Rpcm5hbWUgKyAnLy4uL2xpYi9tb2NoYS9tb2NoYS1wcm9jZXNzLmpzJywgdGhpcy5maWxlcyk7XHJcblxyXG4gICAgICAgIHJlc3RhcnQoc3RvcmUpO1xyXG4gICAgICAgIG1vY2hhLm9uKFwibWVzc2FnZVwiLCBmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgICAgICBpZihhY3Rpb24ubWVzc2FnZSA9PT0gXCJFUlJPUlwiKXtcclxuICAgICAgICAgICAgICAgIHRocm93IGFjdGlvbi5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYWN0aW9uLm1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFR0lOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWdpbihzdG9yZSwgeyBkYXRhIDogcHJvY2Vzc29yKFttYWtlU3VpdGUoYWN0aW9uLmRhdGEpXSl9ICk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKHN0b3JlLCB7IGRhdGEgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVEFSVF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0VGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EX1RFU1RcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoVGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1VJVEVfRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmRTdWl0ZShzdG9yZSwgeyBzdWl0ZSA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjbGVhckZpbGVzKCl7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVQYXRoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
