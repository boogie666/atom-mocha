"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _redux = require('redux');

var _actions = require("./actions");

function identity(defaultValue) {
    return function (x) {
        return x || defaultValue;
    };
}

function toggleSuite(suites, id) {
    var suite = _extends({}, suites[id]);
    suite.toggleState = suite.toggleState === "collapsed" ? "expaned" : "collapsed";
    var result = _extends({}, suites);
    result[id] = suite;
    return result;
}

function suites(suites, action) {
    if (suites === undefined) suites = {};

    if (action.type === _actions.Actions.TOGGLE_SUITE) {
        return toggleSuite(suites, action.suite);
    }

    return suites;
}

function updateTestStatus(tests, id, status) {
    var test = _extends({}, tests[id]);
    test.status = status;
    var result = _extends({}, tests);
    result[id] = test;
    return result;
}

function tests(tests, action) {
    if (tests === undefined) tests = {};

    if (action.type === _actions.Actions.BEGIN_TEST) {
        var id = action.test.id;

        return updateTestStatus(tests, id, "pending");
    }
    if (action.type === _actions.Actions.END_TEST) {
        var _action$test = action.test;
        var id = _action$test.id;
        var state = _action$test.state;

        return updateTestStatus(tests, id, state);
    }
    return tests;
}

var suitesAndTests = (0, _redux.combineReducers)({ suites: suites, tests: tests });
var entitiesAndResult = (0, _redux.combineReducers)({
    entities: suitesAndTests,
    result: identity([])
});

var initialState = {
    entities: {
        suites: {},
        tests: {}
    },
    result: []
};

exports["default"] = function (state, action) {
    if (state === undefined) state = initialState;

    if (action.type === _actions.Actions.RESTART) {
        return initialState;
    }
    if (action.type === _actions.Actions.BEGIN) {
        var _action$data = action.data;
        var result = _action$data.result;
        var entities = _action$data.entities;

        return {
            entities: {
                suites: _extends({}, entities.suites),
                tests: _extends({}, entities.tests)
            },
            result: [].concat(_toConsumableArray(result))
        };
    }
    if (action.type === _actions.Actions.END) {
        return state;
    }
    return entitiesAndResult(state, action);
};

;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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RCxRQUFHLE1BQU0sQ0FBQyxJQUFJLEtBQUssaUJBQVEsS0FBSyxFQUFDOzJCQUNGLE1BQU0sQ0FBQyxJQUFJO1lBQS9CLE1BQU0sZ0JBQU4sTUFBTTtZQUFFLFFBQVEsZ0JBQVIsUUFBUTs7QUFDdkIsZUFBTztBQUNILG9CQUFRLEVBQUc7QUFDUCxzQkFBTSxlQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDOUIscUJBQUssZUFBTyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQzlCO0FBQ0Qsa0JBQU0sK0JBQU8sTUFBTSxFQUFDO1NBQ3ZCLENBQUM7S0FDTDtBQUNELFFBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxpQkFBUSxHQUFHLEVBQUM7QUFDM0IsZUFBTyxLQUFLLENBQUM7S0FDaEI7QUFDRCxXQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMzQzs7QUFBQSxDQUFDIiwiZmlsZSI6InJlZHVjZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQge0FjdGlvbnN9IGZyb20gXCIuL2FjdGlvbnNcIjtcclxuXHJcbmZ1bmN0aW9uIGlkZW50aXR5KGRlZmF1bHRWYWx1ZSl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oeCl7XHJcbiAgICAgICAgcmV0dXJuIHggfHwgZGVmYXVsdFZhbHVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU3VpdGUoc3VpdGVzLCBpZCl7XHJcbiAgICBjb25zdCBzdWl0ZSA9IHsuLi5zdWl0ZXNbaWRdfTtcclxuICAgIHN1aXRlLnRvZ2dsZVN0YXRlID0gc3VpdGUudG9nZ2xlU3RhdGUgPT09IFwiY29sbGFwc2VkXCIgPyBcImV4cGFuZWRcIiA6IFwiY29sbGFwc2VkXCI7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IC4uLnN1aXRlcyB9O1xyXG4gICAgcmVzdWx0W2lkXSA9IHN1aXRlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gc3VpdGVzKHN1aXRlcyA9IHt9LCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuVE9HR0xFX1NVSVRFKXtcclxuICAgICAgICByZXR1cm4gdG9nZ2xlU3VpdGUoc3VpdGVzLCBhY3Rpb24uc3VpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdWl0ZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBzdGF0dXMpe1xyXG4gICAgY29uc3QgdGVzdCA9IHsuLi50ZXN0c1tpZF19O1xyXG4gICAgdGVzdC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IC4uLnRlc3RzIH1cclxuICAgIHJlc3VsdFtpZF0gPSB0ZXN0O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdHModGVzdHMgPSB7fSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOX1RFU1Qpe1xyXG4gICAgICAgIGNvbnN0IHtpZH0gPSBhY3Rpb24udGVzdDtcclxuICAgICAgICByZXR1cm4gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIFwicGVuZGluZ1wiKTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVORF9URVNUKXtcclxuICAgICAgICBjb25zdCB7aWQsIHN0YXRlfSA9IGFjdGlvbi50ZXN0O1xyXG4gICAgICAgIHJldHVybiB1cGRhdGVUZXN0U3RhdHVzKHRlc3RzLCBpZCwgc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlc3RzO1xyXG59XHJcblxyXG5jb25zdCBzdWl0ZXNBbmRUZXN0cyA9IGNvbWJpbmVSZWR1Y2VycyggeyBzdWl0ZXMsIHRlc3RzfSApO1xyXG5jb25zdCBlbnRpdGllc0FuZFJlc3VsdCA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBlbnRpdGllcyA6IHN1aXRlc0FuZFRlc3RzLFxyXG4gICAgcmVzdWx0IDogaWRlbnRpdHkoW10pXHJcbn0pO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgZW50aXRpZXMgOiB7XHJcbiAgICAgICAgc3VpdGVzIDoge30sXHJcbiAgICAgICAgdGVzdHMgOiB7fVxyXG4gICAgfSxcclxuICAgIHJlc3VsdCA6IFtdXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuUkVTVEFSVCl7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllc30gPSBhY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICAgICAgICAgIHN1aXRlcyA6IHsgLi4uZW50aXRpZXMuc3VpdGVzfSxcclxuICAgICAgICAgICAgICAgIHRlc3RzIDogey4uLmVudGl0aWVzLnRlc3RzfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN1bHQgOiBbLi4ucmVzdWx0XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5FTkQpe1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRpdGllc0FuZFJlc3VsdChzdGF0ZSwgYWN0aW9uKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
