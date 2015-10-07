"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function mirror() {
    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
    }

    return keys.reduce(function (result, key) {
        result[key] = key;
        return result;
    }, {});
}
function action(type) {
    return function (store, data) {
        store.dispatch(_extends({
            type: type
        }, data));
    };
}

var Actions = mirror("BEGIN", "START_TEST", "END_TEST", "END", "RESTART");

exports.Actions = Actions;
var begin = action(Actions.BEGIN);
exports.begin = begin;
var done = action(Actions.END);
exports.done = done;
var startTest = action(Actions.START_TEST);
exports.startTest = startTest;
var finishTest = action(Actions.END_TEST);
exports.finishTest = finishTest;
var restart = action(Actions.RESTART);
exports.restart = restart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxTQUFTLE1BQU0sR0FBUztzQ0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ25CLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUs7QUFDaEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsQixlQUFPLE1BQU0sQ0FBQztLQUNqQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1Y7QUFDRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUM7QUFDakIsV0FBTyxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDeEIsYUFBSyxDQUFDLFFBQVE7QUFDVixnQkFBSSxFQUFHLElBQUk7V0FDUixJQUFJLEVBQ1QsQ0FBQztLQUNOLENBQUE7Q0FDSjs7QUFFTSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7QUFFNUUsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFDcEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFDakMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFDN0MsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFDNUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyIsImZpbGUiOiJhY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIG1pcnJvciguLi5rZXlzKXtcclxuICAgIHJldHVybiBrZXlzLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IGtleTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pO1xyXG59XHJcbmZ1bmN0aW9uIGFjdGlvbih0eXBlKXtcclxuICAgIHJldHVybiBmdW5jdGlvbihzdG9yZSwgZGF0YSl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogdHlwZSxcclxuICAgICAgICAgICAgLi4uZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQWN0aW9ucyA9IG1pcnJvcihcIkJFR0lOXCIsIFwiU1RBUlRfVEVTVFwiLCBcIkVORF9URVNUXCIsIFwiRU5EXCIsIFwiUkVTVEFSVFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBiZWdpbiA9IGFjdGlvbihBY3Rpb25zLkJFR0lOKTtcclxuZXhwb3J0IGNvbnN0IGRvbmUgPSBhY3Rpb24oQWN0aW9ucy5FTkQpO1xyXG5leHBvcnQgY29uc3Qgc3RhcnRUZXN0ID0gYWN0aW9uKEFjdGlvbnMuU1RBUlRfVEVTVCk7XHJcbmV4cG9ydCBjb25zdCBmaW5pc2hUZXN0ID0gYWN0aW9uKEFjdGlvbnMuRU5EX1RFU1QpO1xyXG5leHBvcnQgY29uc3QgcmVzdGFydCA9IGFjdGlvbihBY3Rpb25zLlJFU1RBUlQpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
