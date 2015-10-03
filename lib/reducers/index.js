"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _redux = require('redux');

function suites(state, action) {
    if (state === undefined) state = [];

    if (action.type === "RESET") {
        return [];
    }
    if (action.type === "ADD_SUITE") {
        return [].concat(_toConsumableArray(state), [action.suite]);
    }
    return state;
}

exports["default"] = (0, _redux.combineReducers)({ suites: suites });
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHVjZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3FCQUFnQyxPQUFPOztBQUV2QyxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQU8sTUFBTSxFQUFDO1FBQW5CLEtBQUssZ0JBQUwsS0FBSyxHQUFHLEVBQUU7O0FBQ3RCLFFBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUM7QUFDdkIsZUFBTyxFQUFFLENBQUM7S0FDYjtBQUNELFFBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUM7QUFDM0IsNENBQVcsS0FBSyxJQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUU7S0FDbkM7QUFDRCxXQUFPLEtBQUssQ0FBQztDQUNoQjs7cUJBRWMsNEJBQWdCLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBQyxDQUFDIiwiZmlsZSI6InJlZHVjZXJzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5cclxuZnVuY3Rpb24gc3VpdGVzKHN0YXRlID0gW10sIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gXCJSRVNFVFwiKXtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gXCJBRERfU1VJVEVcIil7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5zdGF0ZSwgYWN0aW9uLnN1aXRlXTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtzdWl0ZXN9KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
