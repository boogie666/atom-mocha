import fs from "fs";

const dataForTest = [];

function storeState(action, stateBefore, stateAfter){
    dataForTest.push({action, stateBefore, stateAfter});
}

export function generateTest({getState}){
    return (next) => (action) => {
        const currentState = getState();
        let returnValue = next(action);
        const nextState = getState();
        if(currentState !== nextState){
            storeState(action, currentState, nextState);
        }
        return returnValue;
  };
}

function writeFile(file, data){
    fs.writeFile(__dirname + "\\test-data\\" + file, JSON.stringify(data, null, "\t"), (err) => {
        if(err)
            console.error(file, err.stack);
    });
}

const id = (function(){
    var i = 0;
    return () => {
        return i++;
    }
}());
export function createTestFiles(){
    dataForTest.forEach(function(item){
        const {action, stateBefore, stateAfter} = item;
        const fileName = action.type + "_" + id()+ ".json";
        writeFile(fileName, {
            action,
            input : stateBefore,
            expected : stateAfter
        });

    });
}
