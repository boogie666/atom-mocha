import { combineReducers } from 'redux';
import {Actions} from "./actions";

function identity(defaultValue){
    return function(x){
        return x || defaultValue;
    };
}

function updateSuiteToggleState(suites, id, state){
    const suite = {...suites[id]};
    const result = { ...suites };
    suite.toggleState = state;
    result[id] = suite;
    return result;
}

function expand(suites, id = null){
    if(!id){
        return suites;
    }
    const suite = suites[id];
    return expand(updateSuiteToggleState(suites, id, "expanded"), suite.parent);
}


function toggleSuite(suites, id){
    const state = suites[id].toggleState;
    return updateSuiteToggleState(suites, id, state === "collapsed" ? "expanded" : "collapsed");
}

function suites(suites = {}, action){
    if(action.type === Actions.TOGGLE_SUITE){
        return toggleSuite(suites, action.suite);
    }
    return suites;
}

function updateTestStatus(tests, id, status, error){
    const test = {...tests[id]};
    test.status = status;
    if(error){
        test.error = error;
    }
    const result = { ...tests }
    result[id] = test;
    return result;
}

function tests(tests = {}, action){
    if(action.type === Actions.BEGIN_TEST){
        const {id} = action.test;
        return updateTestStatus(tests, id, "pending");
    }
    if(action.type === Actions.END_TEST){
        const {id, state, error} = action.test;
        return updateTestStatus(tests, id, state, error);
    }
    return tests;
}

function count(what){
    return function(total, object){
        if(object.status === what){
            return total + 1;
        }
        return total;
    };
}

function hasFailed(stuff){
    return stuff.failed > 0;
}
function hasPassed(stuff){
    return stuff.passed > 0;
}
function determinePassOrFail(stuff){
    if(hasFailed(stuff) && !hasPassed(stuff)){
        return "failed";
    }

    if(!hasFailed(stuff) && hasPassed(stuff)){
        return "passed";
    }
    return "partial";
}
function determineStatus(suite, tests, suites){

    const suiteStatus = {
        partial : suites.reduce(count("partial"), 0),
        failed : suites.reduce(count("failed"), 0),
        passed : suites.reduce(count("passed"), 0)
    };
    const testStatus = {
        failed : tests.reduce(count("failed"), 0),
        passed : tests.reduce(count("passed"), 0)
    };

    if(suites.partial){
        return "partial";
    }

    return determinePassOrFail(testStatus) || determinePassOrFail(suiteStatus) ||  "partial";
}
function updateSuiteStatus(suites, tests, id){
    const suite = {...suites[id]};
    const suiteTests = suite.tests.map(s => {
        return tests[s];
    });
    const childSuites = suite.suites.map( s => {
        return suites[s];
    });
    suite.status = determineStatus(suite, suiteTests, childSuites);
    const result = { ...suites }
    result[id] = suite;
    return result;
}



const entitiesAndResult = combineReducers({
    entities : combineReducers( { suites, tests} ),
    result : identity([]),
    stats : identity(null),
    error : identity(null)
});

const initialState = {
    stats : null,
    entities : {
        suites : {},
        tests : {}
    },
    result : [],
    error : null
};

function expandParents(state, action){
    if(action.type !== Actions.END_TEST){
        return state;
    }
    const {id} = action.test;
    const {tests, suites} = state.entities;
    const test = tests[id];
    if(test.status === "failed" || action.expandAnyway){
        return {
            ...state,
            entities : {
                suites : expand(suites, test.parent),
                tests : tests
            }
        };
    }
    return state;
}

function setSuiteStatus(state, action){
    if(action.type !== Actions.END_SUITE){
        return state;
    }

    const {suite} = action;
    const {id} = suite;
    const {suites, tests} = state.entities;
    return {
        ...state,
        entities : {
            suites : updateSuiteStatus(suites, tests, id),
            tests : tests
        }
    }
}

function restart(state, action){
    if(action.type === Actions.RESTART){
        return initialState;
    }
    return state;
}

function begin(state, action){
    if(action.type === Actions.BEGIN){
        const {result, entities} = action.data;
        return {
            entities : {
                suites : { ...entities.suites},
                tests : {...entities.tests}
            },
            result : [...result]
        };
    }
    return state;
}


function attachStats(state, action){
    if(action.type === Actions.END){
        const {stats} = action.data;
        return { ...state, stats };
    }
    return state;
}

function handleError(state, action){
    if(action.type === Actions.ERROR){
        return {
            ...state,
            error : action.error
        }
    }
    return state;
}

function pipeReducers(...fns){
    return function(state = initialState, action){
        return fns.reduce(function(state, fn){
            return fn(state, action);
        }, state);
    }
}

export default pipeReducers(handleError, restart, begin, attachStats, entitiesAndResult, setSuiteStatus, expandParents);
