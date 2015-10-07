"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _redux = require('redux');

var _immutable = require("immutable");

var _actions = require("./actions");

function identity(defaultValue) {
    return function (x) {
        return x || defaultValue;
    };
}

var suites = identity({});

function updateTestStatus(tests, id, status) {
    var test = _extends({}, tests[id]);
    test.status = status;
    var result = _extends({}, tests);
    result[id] = test;
    return result;
}

function tests(tests, action) {
    if (tests === undefined) tests = (0, _immutable.Map)();

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
//# sourceMappingURL=data:application/json;base64,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Q29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7ZnJvbUpTLCBNYXAsIExpc3R9IGZyb20gXCJpbW11dGFibGVcIjtcclxuaW1wb3J0IHtBY3Rpb25zfSBmcm9tIFwiLi9hY3Rpb25zXCI7XHJcblxyXG5mdW5jdGlvbiBpZGVudGl0eShkZWZhdWx0VmFsdWUpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpe1xyXG4gICAgICAgIHJldHVybiB4IHx8IGRlZmF1bHRWYWx1ZTtcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IHN1aXRlcyA9IGlkZW50aXR5KHt9KTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBzdGF0dXMpe1xyXG4gICAgY29uc3QgdGVzdCA9IHsuLi50ZXN0c1tpZF19O1xyXG4gICAgdGVzdC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IC4uLnRlc3RzIH1cclxuICAgIHJlc3VsdFtpZF0gPSB0ZXN0O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdHModGVzdHMgPSBNYXAoKSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOX1RFU1Qpe1xyXG4gICAgICAgIGNvbnN0IHtpZH0gPSBhY3Rpb24udGVzdDtcclxuICAgICAgICByZXR1cm4gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIFwicGVuZGluZ1wiKTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVORF9URVNUKXtcclxuICAgICAgICBjb25zdCB7aWQsIHN0YXRlfSA9IGFjdGlvbi50ZXN0O1xyXG4gICAgICAgIHJldHVybiB1cGRhdGVUZXN0U3RhdHVzKHRlc3RzLCBpZCwgc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlc3RzO1xyXG59XHJcblxyXG5jb25zdCBzdWl0ZXNBbmRUZXN0cyA9IGNvbWJpbmVSZWR1Y2VycyggeyBzdWl0ZXMsIHRlc3RzfSApO1xyXG5jb25zdCBlbnRpdGllc0FuZFJlc3VsdCA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBlbnRpdGllcyA6IHN1aXRlc0FuZFRlc3RzLFxyXG4gICAgcmVzdWx0IDogaWRlbnRpdHkoW10pXHJcbn0pO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgZW50aXRpZXMgOiB7XHJcbiAgICAgICAgc3VpdGVzIDoge30sXHJcbiAgICAgICAgdGVzdHMgOiB7fVxyXG4gICAgfSxcclxuICAgIHJlc3VsdCA6IFtdXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuUkVTVEFSVCl7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllc30gPSBhY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICAgICAgICAgIHN1aXRlcyA6IHsgLi4uZW50aXRpZXMuc3VpdGVzfSxcclxuICAgICAgICAgICAgICAgIHRlc3RzIDogey4uLmVudGl0aWVzLnRlc3RzfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN1bHQgOiBbLi4ucmVzdWx0XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5FTkQpe1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRpdGllc0FuZFJlc3VsdChzdGF0ZSwgYWN0aW9uKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
