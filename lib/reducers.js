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
        _again = false;
        var id = _arguments.length <= 1 || _arguments[1] === undefined ? null : _arguments[1];

        if (!id) {
            return suites;
        }
        var suite = suites[id];
        _arguments = [_x2 = updateSuiteToggleState(suites, id, "expanded"), suite.parent];
        _again = true;
        id = suite = undefined;
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

function determineTestPassOrFail(testStuff) {
    if (hasPassed(testStuff) && !hasFailed(testStuff)) {
        return "passed";
    }
    if (!hasPassed(testStuff) && hasFailed(testStuff)) {
        return "failed";
    }

    return null;
}

function determineSuitePassOrFail(stuff) {
    if (hasFailed(stuff) && !hasPassed(stuff)) {
        return "failed";
    }

    if (!hasFailed(stuff) && hasPassed(stuff)) {
        return "passed";
    }
    return "partial";
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

    if (suite.partial) {
        return "partial";
    }

    return determineTestPassOrFail(testStatus) || determineSuitePassOrFail(suiteStatus) || "partial";
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
    stats: identity(null),
    error: identity(null)
});

var initialState = {
    stats: null,
    entities: {
        suites: {},
        tests: {}
    },
    result: [],
    error: null
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
    if (test.status === "failed" || action.expandAnyway) {
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

function handleError(state, action) {
    if (action.type === _actions.Actions.ERROR) {
        return _extends({}, state, {
            error: action.error
        });
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

exports["default"] = pipeReducers(handleError, restart, begin, attachStats, entitiesAndResult, setSuiteStatus, expandParents);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf8;base64,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IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQge0FjdGlvbnN9IGZyb20gXCIuL2FjdGlvbnNcIjtcclxuXHJcbmZ1bmN0aW9uIGlkZW50aXR5KGRlZmF1bHRWYWx1ZSl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oeCl7XHJcbiAgICAgICAgcmV0dXJuIHggfHwgZGVmYXVsdFZhbHVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3VpdGVUb2dnbGVTdGF0ZShzdWl0ZXMsIGlkLCBzdGF0ZSl7XHJcbiAgICBjb25zdCBzdWl0ZSA9IHsuLi5zdWl0ZXNbaWRdfTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4uc3VpdGVzIH07XHJcbiAgICBzdWl0ZS50b2dnbGVTdGF0ZSA9IHN0YXRlO1xyXG4gICAgcmVzdWx0W2lkXSA9IHN1aXRlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZXhwYW5kKHN1aXRlcywgaWQgPSBudWxsKXtcclxuICAgIGlmKCFpZCl7XHJcbiAgICAgICAgcmV0dXJuIHN1aXRlcztcclxuICAgIH1cclxuICAgIGNvbnN0IHN1aXRlID0gc3VpdGVzW2lkXTtcclxuICAgIHJldHVybiBleHBhbmQodXBkYXRlU3VpdGVUb2dnbGVTdGF0ZShzdWl0ZXMsIGlkLCBcImV4cGFuZGVkXCIpLCBzdWl0ZS5wYXJlbnQpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlU3VpdGUoc3VpdGVzLCBpZCl7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHN1aXRlc1tpZF0udG9nZ2xlU3RhdGU7XHJcbiAgICByZXR1cm4gdXBkYXRlU3VpdGVUb2dnbGVTdGF0ZShzdWl0ZXMsIGlkLCBzdGF0ZSA9PT0gXCJjb2xsYXBzZWRcIiA/IFwiZXhwYW5kZWRcIiA6IFwiY29sbGFwc2VkXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWl0ZXMoc3VpdGVzID0ge30sIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5UT0dHTEVfU1VJVEUpe1xyXG4gICAgICAgIHJldHVybiB0b2dnbGVTdWl0ZShzdWl0ZXMsIGFjdGlvbi5zdWl0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VpdGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUZXN0U3RhdHVzKHRlc3RzLCBpZCwgc3RhdHVzLCBlcnJvcil7XHJcbiAgICBjb25zdCB0ZXN0ID0gey4uLnRlc3RzW2lkXX07XHJcbiAgICB0ZXN0LnN0YXR1cyA9IHN0YXR1cztcclxuICAgIGlmKGVycm9yKXtcclxuICAgICAgICB0ZXN0LmVycm9yID0gZXJyb3I7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSB7IC4uLnRlc3RzIH1cclxuICAgIHJlc3VsdFtpZF0gPSB0ZXN0O1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdHModGVzdHMgPSB7fSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOX1RFU1Qpe1xyXG4gICAgICAgIGNvbnN0IHtpZH0gPSBhY3Rpb24udGVzdDtcclxuICAgICAgICByZXR1cm4gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIFwicGVuZGluZ1wiKTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVORF9URVNUKXtcclxuICAgICAgICBjb25zdCB7aWQsIHN0YXRlLCBlcnJvcn0gPSBhY3Rpb24udGVzdDtcclxuICAgICAgICByZXR1cm4gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIHN0YXRlLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVzdHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50KHdoYXQpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRvdGFsLCBvYmplY3Qpe1xyXG4gICAgICAgIGlmKG9iamVjdC5zdGF0dXMgPT09IHdoYXQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdG90YWwgKyAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG90YWw7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYXNGYWlsZWQoc3R1ZmYpe1xyXG4gICAgcmV0dXJuIHN0dWZmLmZhaWxlZCA+IDA7XHJcbn1cclxuZnVuY3Rpb24gaGFzUGFzc2VkKHN0dWZmKXtcclxuICAgIHJldHVybiBzdHVmZi5wYXNzZWQgPiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZXRlcm1pbmVUZXN0UGFzc09yRmFpbCh0ZXN0U3R1ZmYpe1xyXG4gIGlmKGhhc1Bhc3NlZCh0ZXN0U3R1ZmYpICYmICFoYXNGYWlsZWQodGVzdFN0dWZmKSl7XHJcbiAgICByZXR1cm4gXCJwYXNzZWRcIjtcclxuICB9XHJcbiAgaWYoIWhhc1Bhc3NlZCh0ZXN0U3R1ZmYpICYmIGhhc0ZhaWxlZCh0ZXN0U3R1ZmYpKXtcclxuICAgIHJldHVybiBcImZhaWxlZFwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZVN1aXRlUGFzc09yRmFpbChzdHVmZil7XHJcbiAgICBpZihoYXNGYWlsZWQoc3R1ZmYpICYmICFoYXNQYXNzZWQoc3R1ZmYpKXtcclxuICAgICAgICByZXR1cm4gXCJmYWlsZWRcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZighaGFzRmFpbGVkKHN0dWZmKSAmJiBoYXNQYXNzZWQoc3R1ZmYpKXtcclxuICAgICAgICByZXR1cm4gXCJwYXNzZWRcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBcInBhcnRpYWxcIjtcclxufVxyXG5mdW5jdGlvbiBkZXRlcm1pbmVTdGF0dXMoc3VpdGUsIHRlc3RzLCBzdWl0ZXMpe1xyXG5cclxuICAgIGNvbnN0IHN1aXRlU3RhdHVzID0ge1xyXG4gICAgICAgIHBhcnRpYWwgOiBzdWl0ZXMucmVkdWNlKGNvdW50KFwicGFydGlhbFwiKSwgMCksXHJcbiAgICAgICAgZmFpbGVkIDogc3VpdGVzLnJlZHVjZShjb3VudChcImZhaWxlZFwiKSwgMCksXHJcbiAgICAgICAgcGFzc2VkIDogc3VpdGVzLnJlZHVjZShjb3VudChcInBhc3NlZFwiKSwgMClcclxuICAgIH07XHJcbiAgICBjb25zdCB0ZXN0U3RhdHVzID0ge1xyXG4gICAgICAgIGZhaWxlZCA6IHRlc3RzLnJlZHVjZShjb3VudChcImZhaWxlZFwiKSwgMCksXHJcbiAgICAgICAgcGFzc2VkIDogdGVzdHMucmVkdWNlKGNvdW50KFwicGFzc2VkXCIpLCAwKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZihzdWl0ZS5wYXJ0aWFsKXtcclxuICAgICAgICByZXR1cm4gXCJwYXJ0aWFsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRldGVybWluZVRlc3RQYXNzT3JGYWlsKHRlc3RTdGF0dXMpIHx8IGRldGVybWluZVN1aXRlUGFzc09yRmFpbChzdWl0ZVN0YXR1cykgfHwgIFwicGFydGlhbFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdWl0ZVN0YXR1cyhzdWl0ZXMsIHRlc3RzLCBpZCl7XHJcbiAgICBjb25zdCBzdWl0ZSA9IHsuLi5zdWl0ZXNbaWRdfTtcclxuICAgIGNvbnN0IHN1aXRlVGVzdHMgPSBzdWl0ZS50ZXN0cy5tYXAocyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRlc3RzW3NdO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjaGlsZFN1aXRlcyA9IHN1aXRlLnN1aXRlcy5tYXAoIHMgPT4ge1xyXG4gICAgICAgIHJldHVybiBzdWl0ZXNbc107XHJcbiAgICB9KTtcclxuICAgIHN1aXRlLnN0YXR1cyA9IGRldGVybWluZVN0YXR1cyhzdWl0ZSwgc3VpdGVUZXN0cywgY2hpbGRTdWl0ZXMpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0geyAuLi5zdWl0ZXMgfVxyXG4gICAgcmVzdWx0W2lkXSA9IHN1aXRlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcblxyXG5jb25zdCBlbnRpdGllc0FuZFJlc3VsdCA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBlbnRpdGllcyA6IGNvbWJpbmVSZWR1Y2VycyggeyBzdWl0ZXMsIHRlc3RzfSApLFxyXG4gICAgcmVzdWx0IDogaWRlbnRpdHkoW10pLFxyXG4gICAgc3RhdHMgOiBpZGVudGl0eShudWxsKSxcclxuICAgIGVycm9yIDogaWRlbnRpdHkobnVsbClcclxufSk7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBzdGF0cyA6IG51bGwsXHJcbiAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICBzdWl0ZXMgOiB7fSxcclxuICAgICAgICB0ZXN0cyA6IHt9XHJcbiAgICB9LFxyXG4gICAgcmVzdWx0IDogW10sXHJcbiAgICBlcnJvciA6IG51bGxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGV4cGFuZFBhcmVudHMoc3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSAhPT0gQWN0aW9ucy5FTkRfVEVTVCl7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge2lkfSA9IGFjdGlvbi50ZXN0O1xyXG4gICAgY29uc3Qge3Rlc3RzLCBzdWl0ZXN9ID0gc3RhdGUuZW50aXRpZXM7XHJcbiAgICBjb25zdCB0ZXN0ID0gdGVzdHNbaWRdO1xyXG4gICAgaWYodGVzdC5zdGF0dXMgPT09IFwiZmFpbGVkXCIgfHwgYWN0aW9uLmV4cGFuZEFueXdheSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgICAgICAgICAgc3VpdGVzIDogZXhwYW5kKHN1aXRlcywgdGVzdC5wYXJlbnQpLFxyXG4gICAgICAgICAgICAgICAgdGVzdHMgOiB0ZXN0c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3VpdGVTdGF0dXMoc3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSAhPT0gQWN0aW9ucy5FTkRfU1VJVEUpe1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7c3VpdGV9ID0gYWN0aW9uO1xyXG4gICAgY29uc3Qge2lkfSA9IHN1aXRlO1xyXG4gICAgY29uc3Qge3N1aXRlcywgdGVzdHN9ID0gc3RhdGUuZW50aXRpZXM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgICAgICBzdWl0ZXMgOiB1cGRhdGVTdWl0ZVN0YXR1cyhzdWl0ZXMsIHRlc3RzLCBpZCksXHJcbiAgICAgICAgICAgIHRlc3RzIDogdGVzdHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc3RhcnQoc3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5SRVNUQVJUKXtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiZWdpbihzdGF0ZSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkJFR0lOKXtcclxuICAgICAgICBjb25zdCB7cmVzdWx0LCBlbnRpdGllc30gPSBhY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICAgICAgICAgIHN1aXRlcyA6IHsgLi4uZW50aXRpZXMuc3VpdGVzfSxcclxuICAgICAgICAgICAgICAgIHRlc3RzIDogey4uLmVudGl0aWVzLnRlc3RzfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXN1bHQgOiBbLi4ucmVzdWx0XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhdHRhY2hTdGF0cyhzdGF0ZSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVORCl7XHJcbiAgICAgICAgY29uc3Qge3N0YXRzfSA9IGFjdGlvbi5kYXRhO1xyXG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBzdGF0cyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihzdGF0ZSwgYWN0aW9uKXtcclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVSUk9SKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgZXJyb3IgOiBhY3Rpb24uZXJyb3JcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBpcGVSZWR1Y2VycyguLi5mbnMpe1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pe1xyXG4gICAgICAgIHJldHVybiBmbnMucmVkdWNlKGZ1bmN0aW9uKHN0YXRlLCBmbil7XHJcbiAgICAgICAgICAgIHJldHVybiBmbihzdGF0ZSwgYWN0aW9uKTtcclxuICAgICAgICB9LCBzdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBpcGVSZWR1Y2VycyhoYW5kbGVFcnJvciwgcmVzdGFydCwgYmVnaW4sIGF0dGFjaFN0YXRzLCBlbnRpdGllc0FuZFJlc3VsdCwgc2V0U3VpdGVTdGF0dXMsIGV4cGFuZFBhcmVudHMpO1xyXG4iXX0=
