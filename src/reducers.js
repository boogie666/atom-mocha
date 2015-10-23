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

function expandParents(state, testId){
    const {tests, suites} = state.entities;
    const test = tests[testId];
    if(test.status === "failed"){
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

function determineStatus(suite, tests, suites){

    const testStatus = {
        failed : tests.reduce(count("failed"), 0),
        passed : tests.reduce(count("passed"), 0)
    };
    if(testStatus.failed > 0 && testStatus.passed === 0){
        return "failed";
    }
    if(testStatus.failed === 0 && testStatus.passed > 0){
        return "passed";
    }
    if(testStatus.failed > 0 && testStatus.passed > 0){
        return "partial";
    }
    
    const suiteStatus = {
        partial : suites.reduce(count("partial"), 0),
        failed : suites.reduce(count("failed"), 0),
        passed : suites.reduce(count("passed"), 0)
    };
    if(suiteStatus.partial > 0){
        return "partial";
    }
    if(suiteStatus.failed > 0 && suiteStatus.passed === 0){
        return "failed";
    }
    if(suiteStatus.failed === 0 && suiteStatus.passed > 0){
        return "passed";
    }
    return "partial";
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

function setSuiteStatus(state, suite){
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

const suitesAndTests = combineReducers( { suites, tests} );
const entitiesAndResult = combineReducers({
    entities : suitesAndTests,
    result : identity([]),
    stats : identity(null)
});

const initialState = {
    stats : null,
    entities : {
        suites : {},
        tests : {}
    },
    result : []
};
export default function(state = initialState, action){
    if(action.type === Actions.RESTART){
        return initialState;
    }
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

    if(action.type === Actions.END){
        const {stats} = action.data;
        return { ...state, stats };
    }
    if(action.type === Actions.END_TEST){
        const {status, id} = action.test;
        return expandParents(entitiesAndResult(state, action), id);
    }
    if(action.type === Actions.END_SUITE){
        return setSuiteStatus(entitiesAndResult(state, action), action.suite);
    }
    return entitiesAndResult(state, action);
};
