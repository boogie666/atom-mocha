
function mirror(...keys){
    return keys.reduce((result, key) => {
        result[key] = key;
        return result;
    }, {});
}
function action(type){
    return function(store, data){
        store.dispatch({
            type : type,
            ...data
        });
    }
}

export const Actions = mirror("BEGIN", "START_TEST",
    "END_TEST", "END", "RESTART", "TOGGLE_SUITE", "END_SUITE", "ERROR");

export const begin = action(Actions.BEGIN);
export const done = action(Actions.END);
export const startTest = action(Actions.START_TEST);
export const finishTest = action(Actions.END_TEST);
export const restart = action(Actions.RESTART);
export const toggleSuite = action(Actions.TOGGLE_SUITE);
export const endSuite = action(Actions.END_SUITE);
export const handleError = action(Actions.ERROR);
