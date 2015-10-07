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

function wrap(fn) {
    return function () {
        try {
            fn.apply(undefined, arguments);
        } catch (error) {
            console.error(error.stack);
        }
    };
}

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
                        return (0, _actions.done)(store);
                    case "START_TEST":
                        return (0, _actions.startTest)(store, { test: action.data });
                    case "END_TEST":
                        return (0, _actions.finishTest)(store, { test: action.data });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3FCQUFrQixPQUFPOzs7O3lCQUNKLFdBQVc7OzhCQUNWLG1CQUFtQjs7OzsrQkFDbkIscUJBQXFCOzs7O3VCQUNlLFdBQVc7OzZCQUNqRCxlQUFlOzs7O0FBRW5DLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBQztBQUNiLFdBQU8sWUFBaUI7QUFDcEIsWUFBRztBQUNDLGNBQUUsNEJBQVMsQ0FBQztTQUNmLENBQUEsT0FBTSxLQUFLLEVBQUM7QUFDVCxtQkFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7S0FDSixDQUFDO0NBQ0w7O0lBRW9CLE9BQU87QUFDYixhQURNLE9BQU8sQ0FDWixLQUFLLEVBQUM7OEJBREQsT0FBTzs7QUFFcEIsWUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDbkI7O2lCQUpnQixPQUFPOztlQUtuQixpQkFBRTtnQkFDSSxLQUFLLEdBQVksSUFBSSxDQUFyQixLQUFLO2dCQUFFLEtBQUssR0FBSyxJQUFJLENBQWQsS0FBSzs7QUFFbkIsZ0JBQU0sS0FBSyxHQUFHLDJCQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVyRixrQ0FBUSxLQUFLLENBQUMsQ0FBQztBQUNmLGlCQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFTLE1BQU0sRUFBQztBQUNoQyxvQkFBRyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBQztBQUMxQiwwQkFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUN0QjtBQUNELHdCQUFPLE1BQU0sQ0FBQyxPQUFPO0FBQ2pCLHlCQUFLLE9BQU87QUFDUiwrQkFBTyxvQkFBTSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsaUNBQVUsQ0FBQyxrQ0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUUsQ0FBQztBQUFBLEFBQ3hFLHlCQUFLLEtBQUs7QUFDTiwrQkFBTyxtQkFBSyxLQUFLLENBQUMsQ0FBQztBQUFBLEFBQ3ZCLHlCQUFLLFlBQVk7QUFDYiwrQkFBTyx3QkFBVSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUNwRCx5QkFBSyxVQUFVO0FBQ1gsK0JBQU8seUJBQVcsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsaUJBQ3hEO2FBQ0osQ0FBQyxDQUFDO1NBRU47OztlQUNTLHNCQUFFO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7ZUFDTSxpQkFBQyxRQUFRLEVBQUM7QUFDYixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7OztXQWpDZ0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoicnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2NoYSBmcm9tIFwibW9jaGFcIjtcclxuaW1wb3J0IHtmcm9tSlN9IGZyb20gXCJpbW11dGFibGVcIjtcclxuaW1wb3J0IHByb2Nlc3NvciBmcm9tIFwiLi91dGlscy9wcm9jZXNzb3JcIjtcclxuaW1wb3J0IG1ha2VTdWl0ZSBmcm9tIFwiLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBzdGFydFRlc3QsIGZpbmlzaFRlc3QsIHJlc3RhcnR9IGZyb20gXCIuL2FjdGlvbnNcIjtcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmZ1bmN0aW9uIHdyYXAoZm4pe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3Mpe1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgZm4oLi4uYXJncyk7XHJcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5zdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZXtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JlKXtcclxuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICBjb25zdCB7c3RvcmUsIGZpbGVzfSA9ICB0aGlzO1xyXG5cclxuICAgICAgICBjb25zdCBtb2NoYSA9IHByb2Nlc3MuZm9yayhfX2Rpcm5hbWUgKyAnLy4uL2xpYi9tb2NoYS9tb2NoYS1wcm9jZXNzLmpzJywgdGhpcy5maWxlcyk7XHJcblxyXG4gICAgICAgIHJlc3RhcnQoc3RvcmUpO1xyXG4gICAgICAgIG1vY2hhLm9uKFwibWVzc2FnZVwiLCBmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgICAgICBpZihhY3Rpb24ubWVzc2FnZSA9PT0gXCJFUlJPUlwiKXtcclxuICAgICAgICAgICAgICAgIHRocm93IGFjdGlvbi5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYWN0aW9uLm1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFR0lOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWdpbihzdG9yZSwgeyBkYXRhIDogcHJvY2Vzc29yKFttYWtlU3VpdGUoYWN0aW9uLmRhdGEpXSl9ICk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKHN0b3JlKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVEFSVF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0VGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EX1RFU1RcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoVGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBjbGVhckZpbGVzKCl7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVQYXRoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
