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

var Actions = mirror("BEGIN", "START_TEST", "END_TEST", "END", "RESTART", "TOGGLE_SUITE");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSxTQUFTLE1BQU0sR0FBUztzQ0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ25CLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUs7QUFDaEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNsQixlQUFPLE1BQU0sQ0FBQztLQUNqQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1Y7QUFDRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUM7QUFDakIsV0FBTyxVQUFTLEtBQUssRUFBRSxJQUFJLEVBQUM7QUFDeEIsYUFBSyxDQUFDLFFBQVE7QUFDVixnQkFBSSxFQUFHLElBQUk7V0FDUixJQUFJLEVBQ1QsQ0FBQztLQUNOLENBQUE7Q0FDSjs7QUFFTSxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQzs7O0FBRTVGLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBQ3BDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBQ2pDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBQzdDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBQzVDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBQ3hDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMiLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5mdW5jdGlvbiBtaXJyb3IoLi4ua2V5cyl7XHJcbiAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSBrZXk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sIHt9KTtcclxufVxyXG5mdW5jdGlvbiBhY3Rpb24odHlwZSl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RvcmUsIGRhdGEpe1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6IHR5cGUsXHJcbiAgICAgICAgICAgIC4uLmRhdGFcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFjdGlvbnMgPSBtaXJyb3IoXCJCRUdJTlwiLCBcIlNUQVJUX1RFU1RcIiwgXCJFTkRfVEVTVFwiLCBcIkVORFwiLCBcIlJFU1RBUlRcIiwgXCJUT0dHTEVfU1VJVEVcIik7XHJcblxyXG5leHBvcnQgY29uc3QgYmVnaW4gPSBhY3Rpb24oQWN0aW9ucy5CRUdJTik7XHJcbmV4cG9ydCBjb25zdCBkb25lID0gYWN0aW9uKEFjdGlvbnMuRU5EKTtcclxuZXhwb3J0IGNvbnN0IHN0YXJ0VGVzdCA9IGFjdGlvbihBY3Rpb25zLlNUQVJUX1RFU1QpO1xyXG5leHBvcnQgY29uc3QgZmluaXNoVGVzdCA9IGFjdGlvbihBY3Rpb25zLkVORF9URVNUKTtcclxuZXhwb3J0IGNvbnN0IHJlc3RhcnQgPSBhY3Rpb24oQWN0aW9ucy5SRVNUQVJUKTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVN1aXRlID0gYWN0aW9uKEFjdGlvbnMuVE9HR0xFX1NVSVRFKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
