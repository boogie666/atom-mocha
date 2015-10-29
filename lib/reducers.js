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

function updateSuiteToggleState(suites, id, state) {
    var suite = _extends({}, suites[id]);
    var result = _extends({}, suites);
    suite.toggleState = state;
    result[id] = suite;
    return result;
}

function expand(_x2) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
        var suites = _x2;
        id = suite = undefined;
        _again = false;
        var id = _arguments.length <= 1 || _arguments[1] === undefined ? null : _arguments[1];

        if (!id) {
            return suites;
        }
        var suite = suites[id];
        _arguments = [_x2 = updateSuiteToggleState(suites, id, "expanded"), suite.parent];
        _again = true;
        continue _function;
    }
}

function toggleSuite(suites, id) {
    var state = suites[id].toggleState;
    return updateSuiteToggleState(suites, id, state === "collapsed" ? "expanded" : "collapsed");
}

function suites(suites, action) {
    if (suites === undefined) suites = {};

    if (action.type === _actions.Actions.TOGGLE_SUITE) {
        return toggleSuite(suites, action.suite);
    }
    return suites;
}

function updateTestStatus(tests, id, status, error) {
    var test = _extends({}, tests[id]);
    test.status = status;
    if (error) {
        test.error = error;
    }
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
        var error = _action$test.error;

        return updateTestStatus(tests, id, state, error);
    }
    return tests;
}

function count(what) {
    return function (total, object) {
        if (object.status === what) {
            return total + 1;
        }
        return total;
    };
}

function hasFailed(stuff) {
    return stuff.failed > 0;
}
function hasPassed(stuff) {
    return stuff.passed > 0;
}
function determinePassOrFail(stuff) {
    if (hasFailed(stuff) && !hasPassed(stuff)) {
        return "failed";
    }

    if (!hasFailed(stuff) && hasPassed(stuff)) {
        return "passed";
    }
    return null;
}
function determineStatus(suite, tests, suites) {

    var suiteStatus = {
        partial: suites.reduce(count("partial"), 0),
        failed: suites.reduce(count("failed"), 0),
        passed: suites.reduce(count("passed"), 0)
    };
    var testStatus = {
        failed: tests.reduce(count("failed"), 0),
        passed: tests.reduce(count("passed"), 0)
    };

    if (suites.partial) {
        return "partial";
    }

    return determinePassOrFail(testStatus) || determinePassOrFail(suiteStatus) || "partial";
}
function updateSuiteStatus(suites, tests, id) {
    var suite = _extends({}, suites[id]);
    var suiteTests = suite.tests.map(function (s) {
        return tests[s];
    });
    var childSuites = suite.suites.map(function (s) {
        return suites[s];
    });
    suite.status = determineStatus(suite, suiteTests, childSuites);
    var result = _extends({}, suites);
    result[id] = suite;
    return result;
}

var entitiesAndResult = (0, _redux.combineReducers)({
    entities: (0, _redux.combineReducers)({ suites: suites, tests: tests }),
    result: identity([]),
    stats: identity(null)
});

var initialState = {
    stats: null,
    entities: {
        suites: {},
        tests: {}
    },
    result: []
};

function expandParents(state, action) {
    if (action.type !== _actions.Actions.END_TEST) {
        return state;
    }
    var id = action.test.id;
    var _state$entities = state.entities;
    var tests = _state$entities.tests;
    var suites = _state$entities.suites;

    var test = tests[id];
    if (test.status === "failed") {
        return _extends({}, state, {
            entities: {
                suites: expand(suites, test.parent),
                tests: tests
            }
        });
    }
    return state;
}

function setSuiteStatus(state, action) {
    if (action.type !== _actions.Actions.END_SUITE) {
        return state;
    }

    var suite = action.suite;
    var id = suite.id;
    var _state$entities2 = state.entities;
    var suites = _state$entities2.suites;
    var tests = _state$entities2.tests;

    return _extends({}, state, {
        entities: {
            suites: updateSuiteStatus(suites, tests, id),
            tests: tests
        }
    });
}

function restart(state, action) {
    if (action.type === _actions.Actions.RESTART) {
        return initialState;
    }
    return state;
}

function begin(state, action) {
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
    return state;
}

function attachStats(state, action) {
    if (action.type === _actions.Actions.END) {
        var stats = action.data.stats;

        return _extends({}, state, { stats: stats });
    }
    return state;
}

function pipeReducers() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
    }

    return function (state, action) {
        if (state === undefined) state = initialState;

        return fns.reduce(function (state, fn) {
            return fn(state, action);
        }, state);
    };
}

exports["default"] = pipeReducers(restart, begin, attachStats, entitiesAndResult, setSuiteStatus, expandParents);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QUFDO0NBQ2hCOztBQUVELFNBQVMsWUFBWSxHQUFRO3NDQUFKLEdBQUc7QUFBSCxXQUFHOzs7QUFDeEIsV0FBTyxVQUFTLEtBQUssRUFBaUIsTUFBTSxFQUFDO1lBQTdCLEtBQUssZ0JBQUwsS0FBSyxHQUFHLFlBQVk7O0FBQ2hDLGVBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFTLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDakMsbUJBQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM1QixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2IsQ0FBQTtDQUNKOztxQkFFYyxZQUFZLENBQUMsT0FBTyxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQyIsImZpbGUiOiJyZWR1Y2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHtBY3Rpb25zfSBmcm9tIFwiLi9hY3Rpb25zXCI7XHJcblxyXG5mdW5jdGlvbiBpZGVudGl0eShkZWZhdWx0VmFsdWUpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpe1xyXG4gICAgICAgIHJldHVybiB4IHx8IGRlZmF1bHRWYWx1ZTtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN1aXRlVG9nZ2xlU3RhdGUoc3VpdGVzLCBpZCwgc3RhdGUpe1xyXG4gICAgY29uc3Qgc3VpdGUgPSB7Li4uc3VpdGVzW2lkXX07XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IC4uLnN1aXRlcyB9O1xyXG4gICAgc3VpdGUudG9nZ2xlU3RhdGUgPSBzdGF0ZTtcclxuICAgIHJlc3VsdFtpZF0gPSBzdWl0ZTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4cGFuZChzdWl0ZXMsIGlkID0gbnVsbCl7XHJcbiAgICBpZighaWQpe1xyXG4gICAgICAgIHJldHVybiBzdWl0ZXM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdWl0ZSA9IHN1aXRlc1tpZF07XHJcbiAgICByZXR1cm4gZXhwYW5kKHVwZGF0ZVN1aXRlVG9nZ2xlU3RhdGUoc3VpdGVzLCBpZCwgXCJleHBhbmRlZFwiKSwgc3VpdGUucGFyZW50KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVN1aXRlKHN1aXRlcywgaWQpe1xyXG4gICAgY29uc3Qgc3RhdGUgPSBzdWl0ZXNbaWRdLnRvZ2dsZVN0YXRlO1xyXG4gICAgcmV0dXJuIHVwZGF0ZVN1aXRlVG9nZ2xlU3RhdGUoc3VpdGVzLCBpZCwgc3RhdGUgPT09IFwiY29sbGFwc2VkXCIgPyBcImV4cGFuZGVkXCIgOiBcImNvbGxhcHNlZFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3VpdGVzKHN1aXRlcyA9IHt9LCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuVE9HR0xFX1NVSVRFKXtcclxuICAgICAgICByZXR1cm4gdG9nZ2xlU3VpdGUoc3VpdGVzLCBhY3Rpb24uc3VpdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1aXRlcztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIHN0YXR1cywgZXJyb3Ipe1xyXG4gICAgY29uc3QgdGVzdCA9IHsuLi50ZXN0c1tpZF19O1xyXG4gICAgdGVzdC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBpZihlcnJvcil7XHJcbiAgICAgICAgdGVzdC5lcnJvciA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0ID0geyAuLi50ZXN0cyB9XHJcbiAgICByZXN1bHRbaWRdID0gdGVzdDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3RzKHRlc3RzID0ge30sIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5CRUdJTl9URVNUKXtcclxuICAgICAgICBjb25zdCB7aWR9ID0gYWN0aW9uLnRlc3Q7XHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBcInBlbmRpbmdcIik7XHJcbiAgICB9XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5FTkRfVEVTVCl7XHJcbiAgICAgICAgY29uc3Qge2lkLCBzdGF0ZSwgZXJyb3J9ID0gYWN0aW9uLnRlc3Q7XHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBzdGF0ZSwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlc3RzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudCh3aGF0KXtcclxuICAgIHJldHVybiBmdW5jdGlvbih0b3RhbCwgb2JqZWN0KXtcclxuICAgICAgICBpZihvYmplY3Quc3RhdHVzID09PSB3aGF0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzRmFpbGVkKHN0dWZmKXtcclxuICAgIHJldHVybiBzdHVmZi5mYWlsZWQgPiAwO1xyXG59XHJcbmZ1bmN0aW9uIGhhc1Bhc3NlZChzdHVmZil7XHJcbiAgICByZXR1cm4gc3R1ZmYucGFzc2VkID4gMDtcclxufVxyXG5mdW5jdGlvbiBkZXRlcm1pbmVQYXNzT3JGYWlsKHN0dWZmKXtcclxuICAgIGlmKGhhc0ZhaWxlZChzdHVmZikgJiYgIWhhc1Bhc3NlZChzdHVmZikpe1xyXG4gICAgICAgIHJldHVybiBcImZhaWxlZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFoYXNGYWlsZWQoc3R1ZmYpICYmIGhhc1Bhc3NlZChzdHVmZikpe1xyXG4gICAgICAgIHJldHVybiBcInBhc3NlZFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gZGV0ZXJtaW5lU3RhdHVzKHN1aXRlLCB0ZXN0cywgc3VpdGVzKXtcclxuXHJcbiAgICBjb25zdCBzdWl0ZVN0YXR1cyA9IHtcclxuICAgICAgICBwYXJ0aWFsIDogc3VpdGVzLnJlZHVjZShjb3VudChcInBhcnRpYWxcIiksIDApLFxyXG4gICAgICAgIGZhaWxlZCA6IHN1aXRlcy5yZWR1Y2UoY291bnQoXCJmYWlsZWRcIiksIDApLFxyXG4gICAgICAgIHBhc3NlZCA6IHN1aXRlcy5yZWR1Y2UoY291bnQoXCJwYXNzZWRcIiksIDApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdGVzdFN0YXR1cyA9IHtcclxuICAgICAgICBmYWlsZWQgOiB0ZXN0cy5yZWR1Y2UoY291bnQoXCJmYWlsZWRcIiksIDApLFxyXG4gICAgICAgIHBhc3NlZCA6IHRlc3RzLnJlZHVjZShjb3VudChcInBhc3NlZFwiKSwgMClcclxuICAgIH07XHJcblxyXG4gICAgaWYoc3VpdGVzLnBhcnRpYWwpe1xyXG4gICAgICAgIHJldHVybiBcInBhcnRpYWxcIjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGV0ZXJtaW5lUGFzc09yRmFpbCh0ZXN0U3RhdHVzKSB8fCBkZXRlcm1pbmVQYXNzT3JGYWlsKHN1aXRlU3RhdHVzKSB8fCAgXCJwYXJ0aWFsXCI7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlU3VpdGVTdGF0dXMoc3VpdGVzLCB0ZXN0cywgaWQpe1xyXG4gICAgY29uc3Qgc3VpdGUgPSB7Li4uc3VpdGVzW2lkXX07XHJcbiAgICBjb25zdCBzdWl0ZVRlc3RzID0gc3VpdGUudGVzdHMubWFwKHMgPT4ge1xyXG4gICAgICAgIHJldHVybiB0ZXN0c1tzXTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY2hpbGRTdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMubWFwKCBzID0+IHtcclxuICAgICAgICByZXR1cm4gc3VpdGVzW3NdO1xyXG4gICAgfSk7XHJcbiAgICBzdWl0ZS5zdGF0dXMgPSBkZXRlcm1pbmVTdGF0dXMoc3VpdGUsIHN1aXRlVGVzdHMsIGNoaWxkU3VpdGVzKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4uc3VpdGVzIH1cclxuICAgIHJlc3VsdFtpZF0gPSBzdWl0ZTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG5jb25zdCBlbnRpdGllc0FuZFJlc3VsdCA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBlbnRpdGllcyA6IGNvbWJpbmVSZWR1Y2VycyggeyBzdWl0ZXMsIHRlc3RzfSApLFxyXG4gICAgcmVzdWx0IDogaWRlbnRpdHkoW10pLFxyXG4gICAgc3RhdHMgOiBpZGVudGl0eShudWxsKVxyXG59KTtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIHN0YXRzIDogbnVsbCxcclxuICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgIHN1aXRlcyA6IHt9LFxyXG4gICAgICAgIHRlc3RzIDoge31cclxuICAgIH0sXHJcbiAgICByZXN1bHQgOiBbXVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZXhwYW5kUGFyZW50cyhzdGF0ZSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlICE9PSBBY3Rpb25zLkVORF9URVNUKXtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7aWR9ID0gYWN0aW9uLnRlc3Q7XHJcbiAgICBjb25zdCB7dGVzdHMsIHN1aXRlc30gPSBzdGF0ZS5lbnRpdGllcztcclxuICAgIGNvbnN0IHRlc3QgPSB0ZXN0c1tpZF07XHJcbiAgICBpZih0ZXN0LnN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgICAgICAgICAgc3VpdGVzIDogZXhwYW5kKHN1aXRlcywgdGVzdC5wYXJlbnQpLFxyXG4gICAgICAgICAgICAgICAgdGVzdHMgOiB0ZXN0c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3VpdGVTdGF0dXMoc3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSAhPT0gQWN0aW9ucy5FTkRfU1VJVEUpe1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7c3VpdGV9ID0gYWN0aW9uO1xyXG4gICAgY29uc3Qge2lkfSA9IHN1aXRlO1xyXG4gICAgY29uc3Qge3N1aXRlcywgdGVzdHN9ID0gc3RhdGUuZW50aXRpZXM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgICAgICBzdWl0ZXMgOiB1cGRhdGVTdWl0ZVN0YXR1cyhzdWl0ZXMsIHRlc3RzLCBpZCksXHJcbiAgICAgICAgICAgIHRlc3RzIDogdGVzdHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc3RhcnQoc3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5SRVNUQVJUKXtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiZWdpbihzdGF0ZSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllc30gPSBhY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICAgICAgICAgIHN1aXRlcyA6IHsgLi4uZW50aXRpZXMuc3VpdGVzfSxcclxuICAgICAgICAgICAgICAgIHRlc3RzIDogey4uLmVudGl0aWVzLnRlc3RzfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN1bHQgOiBbLi4ucmVzdWx0XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF0dGFjaFN0YXRzKHN0YXRlLCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuRU5EKXtcclxuICAgICAgICBjb25zdCB7c3RhdHN9ID0gYWN0aW9uLmRhdGE7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHN0YXRzIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpcGVSZWR1Y2VycyguLi5mbnMpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pe1xyXG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uKHN0YXRlLCBmbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmbihzdGF0ZSwgYWN0aW9uKTtcclxuICAgICAgICB9LCBzdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBpcGVSZWR1Y2VycyhyZXN0YXJ0LGJlZ2luLCBhdHRhY2hTdGF0cywgZW50aXRpZXNBbmRSZXN1bHQsIHNldFN1aXRlU3RhdHVzLCBleHBhbmRQYXJlbnRzKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
