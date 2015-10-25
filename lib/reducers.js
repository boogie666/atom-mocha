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

function expandParents(state, testId) {
    var _state$entities = state.entities;
    var tests = _state$entities.tests;
    var suites = _state$entities.suites;

    var test = tests[testId];
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

function setSuiteStatus(state, suite) {
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

var suitesAndTests = (0, _redux.combineReducers)({ suites: suites, tests: tests });
var entitiesAndResult = (0, _redux.combineReducers)({
    entities: suitesAndTests,
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
        var stats = action.data.stats;

        return _extends({}, state, { stats: stats });
    }
    if (action.type === _actions.Actions.END_TEST) {
        var _action$test2 = action.test;
        var _status = _action$test2.status;
        var id = _action$test2.id;

        return expandParents(entitiesAndResult(state, action), id);
    }
    if (action.type === _actions.Actions.END_SUITE) {
        return setSuiteStatus(entitiesAndResult(state, action), action.suite);
    }
    return entitiesAndResult(state, action);
};

;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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Q0FBQztLQUN6RTtBQUNELFdBQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzNDOztBQUFBLENBQUMiLCJmaWxlIjoicmVkdWNlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7QWN0aW9uc30gZnJvbSBcIi4vYWN0aW9uc1wiO1xyXG5cclxuZnVuY3Rpb24gaWRlbnRpdHkoZGVmYXVsdFZhbHVlKXtcclxuICAgIHJldHVybiBmdW5jdGlvbih4KXtcclxuICAgICAgICByZXR1cm4geCB8fCBkZWZhdWx0VmFsdWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTdWl0ZVRvZ2dsZVN0YXRlKHN1aXRlcywgaWQsIHN0YXRlKXtcclxuICAgIGNvbnN0IHN1aXRlID0gey4uLnN1aXRlc1tpZF19O1xyXG4gICAgY29uc3QgcmVzdWx0ID0geyAuLi5zdWl0ZXMgfTtcclxuICAgIHN1aXRlLnRvZ2dsZVN0YXRlID0gc3RhdGU7XHJcbiAgICByZXN1bHRbaWRdID0gc3VpdGU7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHBhbmQoc3VpdGVzLCBpZCA9IG51bGwpe1xyXG4gICAgaWYoIWlkKXtcclxuICAgICAgICByZXR1cm4gc3VpdGVzO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3VpdGUgPSBzdWl0ZXNbaWRdO1xyXG4gICAgcmV0dXJuIGV4cGFuZCh1cGRhdGVTdWl0ZVRvZ2dsZVN0YXRlKHN1aXRlcywgaWQsIFwiZXhwYW5kZWRcIiksIHN1aXRlLnBhcmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4cGFuZFBhcmVudHMoc3RhdGUsIHRlc3RJZCl7XHJcbiAgICBjb25zdCB7dGVzdHMsIHN1aXRlc30gPSBzdGF0ZS5lbnRpdGllcztcclxuICAgIGNvbnN0IHRlc3QgPSB0ZXN0c1t0ZXN0SWRdO1xyXG4gICAgaWYodGVzdC5zdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICAgICAgICAgIHN1aXRlcyA6IGV4cGFuZChzdWl0ZXMsIHRlc3QucGFyZW50KSxcclxuICAgICAgICAgICAgICAgIHRlc3RzIDogdGVzdHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVN1aXRlKHN1aXRlcywgaWQpe1xyXG4gICAgY29uc3Qgc3RhdGUgPSBzdWl0ZXNbaWRdLnRvZ2dsZVN0YXRlO1xyXG4gICAgcmV0dXJuIHVwZGF0ZVN1aXRlVG9nZ2xlU3RhdGUoc3VpdGVzLCBpZCwgc3RhdGUgPT09IFwiY29sbGFwc2VkXCIgPyBcImV4cGFuZGVkXCIgOiBcImNvbGxhcHNlZFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3VpdGVzKHN1aXRlcyA9IHt9LCBhY3Rpb24pe1xyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuVE9HR0xFX1NVSVRFKXtcclxuICAgICAgICByZXR1cm4gdG9nZ2xlU3VpdGUoc3VpdGVzLCBhY3Rpb24uc3VpdGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1aXRlcztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGVzdFN0YXR1cyh0ZXN0cywgaWQsIHN0YXR1cywgZXJyb3Ipe1xyXG4gICAgY29uc3QgdGVzdCA9IHsuLi50ZXN0c1tpZF19O1xyXG4gICAgdGVzdC5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBpZihlcnJvcil7XHJcbiAgICAgICAgdGVzdC5lcnJvciA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0ID0geyAuLi50ZXN0cyB9XHJcbiAgICByZXN1bHRbaWRdID0gdGVzdDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlc3RzKHRlc3RzID0ge30sIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5CRUdJTl9URVNUKXtcclxuICAgICAgICBjb25zdCB7aWR9ID0gYWN0aW9uLnRlc3Q7XHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBcInBlbmRpbmdcIik7XHJcbiAgICB9XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5FTkRfVEVTVCl7XHJcbiAgICAgICAgY29uc3Qge2lkLCBzdGF0ZSwgZXJyb3J9ID0gYWN0aW9uLnRlc3Q7XHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVRlc3RTdGF0dXModGVzdHMsIGlkLCBzdGF0ZSwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlc3RzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudCh3aGF0KXtcclxuICAgIHJldHVybiBmdW5jdGlvbih0b3RhbCwgb2JqZWN0KXtcclxuICAgICAgICBpZihvYmplY3Quc3RhdHVzID09PSB3aGF0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFzRmFpbGVkKHN0dWZmKXtcclxuICAgIHJldHVybiBzdHVmZi5mYWlsZWQgPiAwO1xyXG59XHJcbmZ1bmN0aW9uIGhhc1Bhc3NlZChzdHVmZil7XHJcbiAgICByZXR1cm4gc3R1ZmYucGFzc2VkID4gMDtcclxufVxyXG5mdW5jdGlvbiBkZXRlcm1pbmVQYXNzT3JGYWlsKHN0dWZmKXtcclxuICAgIGlmKGhhc0ZhaWxlZChzdHVmZikgJiYgIWhhc1Bhc3NlZChzdHVmZikpe1xyXG4gICAgICAgIHJldHVybiBcImZhaWxlZFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCFoYXNGYWlsZWQoc3R1ZmYpICYmIGhhc1Bhc3NlZChzdHVmZikpe1xyXG4gICAgICAgIHJldHVybiBcInBhc3NlZFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gZGV0ZXJtaW5lU3RhdHVzKHN1aXRlLCB0ZXN0cywgc3VpdGVzKXtcclxuXHJcbiAgICBjb25zdCBzdWl0ZVN0YXR1cyA9IHtcclxuICAgICAgICBwYXJ0aWFsIDogc3VpdGVzLnJlZHVjZShjb3VudChcInBhcnRpYWxcIiksIDApLFxyXG4gICAgICAgIGZhaWxlZCA6IHN1aXRlcy5yZWR1Y2UoY291bnQoXCJmYWlsZWRcIiksIDApLFxyXG4gICAgICAgIHBhc3NlZCA6IHN1aXRlcy5yZWR1Y2UoY291bnQoXCJwYXNzZWRcIiksIDApXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdGVzdFN0YXR1cyA9IHtcclxuICAgICAgICBmYWlsZWQgOiB0ZXN0cy5yZWR1Y2UoY291bnQoXCJmYWlsZWRcIiksIDApLFxyXG4gICAgICAgIHBhc3NlZCA6IHRlc3RzLnJlZHVjZShjb3VudChcInBhc3NlZFwiKSwgMClcclxuICAgIH07XHJcblxyXG4gICAgaWYoc3VpdGVzLnBhcnRpYWwpe1xyXG4gICAgICAgIHJldHVybiBcInBhcnRpYWxcIjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGV0ZXJtaW5lUGFzc09yRmFpbCh0ZXN0U3RhdHVzKSB8fCBkZXRlcm1pbmVQYXNzT3JGYWlsKHN1aXRlU3RhdHVzKSB8fCAgXCJwYXJ0aWFsXCI7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlU3VpdGVTdGF0dXMoc3VpdGVzLCB0ZXN0cywgaWQpe1xyXG4gICAgY29uc3Qgc3VpdGUgPSB7Li4uc3VpdGVzW2lkXX07XHJcbiAgICBjb25zdCBzdWl0ZVRlc3RzID0gc3VpdGUudGVzdHMubWFwKHMgPT4ge1xyXG4gICAgICAgIHJldHVybiB0ZXN0c1tzXTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY2hpbGRTdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMubWFwKCBzID0+IHtcclxuICAgICAgICByZXR1cm4gc3VpdGVzW3NdO1xyXG4gICAgfSk7XHJcbiAgICBzdWl0ZS5zdGF0dXMgPSBkZXRlcm1pbmVTdGF0dXMoc3VpdGUsIHN1aXRlVGVzdHMsIGNoaWxkU3VpdGVzKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4uc3VpdGVzIH1cclxuICAgIHJlc3VsdFtpZF0gPSBzdWl0ZTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN1aXRlU3RhdHVzKHN0YXRlLCBzdWl0ZSl7XHJcbiAgICBjb25zdCB7aWR9ID0gc3VpdGU7XHJcbiAgICBjb25zdCB7c3VpdGVzLCB0ZXN0c30gPSBzdGF0ZS5lbnRpdGllcztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgZW50aXRpZXMgOiB7XHJcbiAgICAgICAgICAgIHN1aXRlcyA6IHVwZGF0ZVN1aXRlU3RhdHVzKHN1aXRlcywgdGVzdHMsIGlkKSxcclxuICAgICAgICAgICAgdGVzdHMgOiB0ZXN0c1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgc3VpdGVzQW5kVGVzdHMgPSBjb21iaW5lUmVkdWNlcnMoIHsgc3VpdGVzLCB0ZXN0c30gKTtcclxuY29uc3QgZW50aXRpZXNBbmRSZXN1bHQgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgZW50aXRpZXMgOiBzdWl0ZXNBbmRUZXN0cyxcclxuICAgIHJlc3VsdCA6IGlkZW50aXR5KFtdKSxcclxuICAgIHN0YXRzIDogaWRlbnRpdHkobnVsbClcclxufSk7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBzdGF0cyA6IG51bGwsXHJcbiAgICBlbnRpdGllcyA6IHtcclxuICAgICAgICBzdWl0ZXMgOiB7fSxcclxuICAgICAgICB0ZXN0cyA6IHt9XHJcbiAgICB9LFxyXG4gICAgcmVzdWx0IDogW11cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbil7XHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5SRVNUQVJUKXtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbFN0YXRlO1xyXG4gICAgfVxyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuQkVHSU4pe1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHQsIGVudGl0aWVzfSA9IGFjdGlvbi5kYXRhO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVudGl0aWVzIDoge1xyXG4gICAgICAgICAgICAgICAgc3VpdGVzIDogeyAuLi5lbnRpdGllcy5zdWl0ZXN9LFxyXG4gICAgICAgICAgICAgICAgdGVzdHMgOiB7Li4uZW50aXRpZXMudGVzdHN9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc3VsdCA6IFsuLi5yZXN1bHRdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZihhY3Rpb24udHlwZSA9PT0gQWN0aW9ucy5FTkQpe1xyXG4gICAgICAgIGNvbnN0IHtzdGF0c30gPSBhY3Rpb24uZGF0YTtcclxuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc3RhdHMgfTtcclxuICAgIH1cclxuICAgIGlmKGFjdGlvbi50eXBlID09PSBBY3Rpb25zLkVORF9URVNUKXtcclxuICAgICAgICBjb25zdCB7c3RhdHVzLCBpZH0gPSBhY3Rpb24udGVzdDtcclxuICAgICAgICByZXR1cm4gZXhwYW5kUGFyZW50cyhlbnRpdGllc0FuZFJlc3VsdChzdGF0ZSwgYWN0aW9uKSwgaWQpO1xyXG4gICAgfVxyXG4gICAgaWYoYWN0aW9uLnR5cGUgPT09IEFjdGlvbnMuRU5EX1NVSVRFKXtcclxuICAgICAgICByZXR1cm4gc2V0U3VpdGVTdGF0dXMoZW50aXRpZXNBbmRSZXN1bHQoc3RhdGUsIGFjdGlvbiksIGFjdGlvbi5zdWl0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50aXRpZXNBbmRSZXN1bHQoc3RhdGUsIGFjdGlvbik7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
