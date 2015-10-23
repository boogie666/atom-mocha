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

var Actions = mirror("BEGIN", "START_TEST", "END_TEST", "END", "RESTART", "TOGGLE_SUITE", "END_SUITE");

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
var toggleSuite = action(Actions.TOGGLE_SUITE);
exports.toggleSuite = toggleSuite;
var endSuite = action(Actions.END_SUITE);
exports.endSuite = endSuite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxTQUFTLE1BQU0sR0FBUztzQ0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ25CLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUs7QUFDaEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsQixlQUFPLE1BQU0sQ0FBQztLQUNqQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1Y7QUFDRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUM7QUFDakIsV0FBTyxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDeEIsYUFBSyxDQUFDLFFBQVE7QUFDVixnQkFBSSxFQUFHLElBQUk7V0FDUixJQUFJLEVBQ1QsQ0FBQztLQUNOLENBQUE7Q0FDSjs7QUFFTSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFDL0MsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7QUFFeEQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFDcEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFDakMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFDN0MsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFDNUMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFDeEMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFDakQsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyIsImZpbGUiOiJhY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIG1pcnJvciguLi5rZXlzKXtcclxuICAgIHJldHVybiBrZXlzLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IGtleTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pO1xyXG59XHJcbmZ1bmN0aW9uIGFjdGlvbih0eXBlKXtcclxuICAgIHJldHVybiBmdW5jdGlvbihzdG9yZSwgZGF0YSl7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogdHlwZSxcclxuICAgICAgICAgICAgLi4uZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQWN0aW9ucyA9IG1pcnJvcihcIkJFR0lOXCIsIFwiU1RBUlRfVEVTVFwiLFxyXG4gICAgXCJFTkRfVEVTVFwiLCBcIkVORFwiLCBcIlJFU1RBUlRcIiwgXCJUT0dHTEVfU1VJVEVcIiwgXCJFTkRfU1VJVEVcIik7XHJcblxyXG5leHBvcnQgY29uc3QgYmVnaW4gPSBhY3Rpb24oQWN0aW9ucy5CRUdJTik7XHJcbmV4cG9ydCBjb25zdCBkb25lID0gYWN0aW9uKEFjdGlvbnMuRU5EKTtcclxuZXhwb3J0IGNvbnN0IHN0YXJ0VGVzdCA9IGFjdGlvbihBY3Rpb25zLlNUQVJUX1RFU1QpO1xyXG5leHBvcnQgY29uc3QgZmluaXNoVGVzdCA9IGFjdGlvbihBY3Rpb25zLkVORF9URVNUKTtcclxuZXhwb3J0IGNvbnN0IHJlc3RhcnQgPSBhY3Rpb24oQWN0aW9ucy5SRVNUQVJUKTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVN1aXRlID0gYWN0aW9uKEFjdGlvbnMuVE9HR0xFX1NVSVRFKTtcclxuZXhwb3J0IGNvbnN0IGVuZFN1aXRlID0gYWN0aW9uKEFjdGlvbnMuRU5EX1NVSVRFKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
