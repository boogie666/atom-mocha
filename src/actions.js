
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

export const Actions = mirror("BEGIN", "START_TEST", "END_TEST", "END", "RESTART");

export const begin = action(Actions.BEGIN);
export const done = action(Actions.END);
export const startTest = action(Actions.START_TEST);
export const finishTest = action(Actions.END_TEST);
export const restart = action(Actions.RESTART);
