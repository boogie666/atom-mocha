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

var Actions = mirror("BEGIN", "START_TEST", "END_TEST", "END", "RESTART", "TOGGLE_SUITE", "END_SUITE", "ERROR", "HOOK_FAILED", "EACH_HOOK_FAILED");

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
var handleError = action(Actions.ERROR);
exports.handleError = handleError;
var handleHookFailed = action(Actions.HOOK_FAILED);
exports.handleHookFailed = handleHookFailed;
var handleEachHookFailed = action(Actions.EACH_HOOK_FAILED);
exports.handleEachHookFailed = handleEachHookFailed;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxTQUFTLE1BQU0sR0FBUztzQ0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ25CLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUs7QUFDaEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsQixlQUFPLE1BQU0sQ0FBQztLQUNqQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1Y7QUFDRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUM7QUFDakIsV0FBTyxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDeEIsYUFBSyxDQUFDLFFBQVE7QUFDVixnQkFBSSxFQUFHLElBQUk7V0FDUixJQUFJLEVBQ1QsQ0FBQztLQUNOLENBQUE7Q0FDSjs7QUFFTSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFDL0MsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQzVCLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUNwQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7O0FBRWhDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBQ3BDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBQ2pDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBQzdDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBQzVDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBQ3hDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBQ2pELElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBQzNDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBQzFDLElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFDckQsSUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBtaXJyb3IoLi4ua2V5cyl7XHJcbiAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSBrZXk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIHt9KTtcclxufVxyXG5mdW5jdGlvbiBhY3Rpb24odHlwZSl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RvcmUsIGRhdGEpe1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6IHR5cGUsXHJcbiAgICAgICAgICAgIC4uLmRhdGFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFjdGlvbnMgPSBtaXJyb3IoXCJCRUdJTlwiLCBcIlNUQVJUX1RFU1RcIixcclxuICAgIFwiRU5EX1RFU1RcIiwgXCJFTkRcIiwgXCJSRVNUQVJUXCIsXHJcbiAgICBcIlRPR0dMRV9TVUlURVwiLCBcIkVORF9TVUlURVwiLCBcIkVSUk9SXCIsXHJcbiAgICBcIkhPT0tfRkFJTEVEXCIsIFwiRUFDSF9IT09LX0ZBSUxFRFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBiZWdpbiA9IGFjdGlvbihBY3Rpb25zLkJFR0lOKTtcclxuZXhwb3J0IGNvbnN0IGRvbmUgPSBhY3Rpb24oQWN0aW9ucy5FTkQpO1xyXG5leHBvcnQgY29uc3Qgc3RhcnRUZXN0ID0gYWN0aW9uKEFjdGlvbnMuU1RBUlRfVEVTVCk7XHJcbmV4cG9ydCBjb25zdCBmaW5pc2hUZXN0ID0gYWN0aW9uKEFjdGlvbnMuRU5EX1RFU1QpO1xyXG5leHBvcnQgY29uc3QgcmVzdGFydCA9IGFjdGlvbihBY3Rpb25zLlJFU1RBUlQpO1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlU3VpdGUgPSBhY3Rpb24oQWN0aW9ucy5UT0dHTEVfU1VJVEUpO1xyXG5leHBvcnQgY29uc3QgZW5kU3VpdGUgPSBhY3Rpb24oQWN0aW9ucy5FTkRfU1VJVEUpO1xyXG5leHBvcnQgY29uc3QgaGFuZGxlRXJyb3IgPSBhY3Rpb24oQWN0aW9ucy5FUlJPUik7XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVIb29rRmFpbGVkID0gYWN0aW9uKEFjdGlvbnMuSE9PS19GQUlMRUQpO1xyXG5leHBvcnQgY29uc3QgaGFuZGxlRWFjaEhvb2tGYWlsZWQgPSBhY3Rpb24oQWN0aW9ucy5FQUNIX0hPT0tfRkFJTEVEKTtcclxuIl19
