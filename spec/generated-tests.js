import {readdirSync} from "fs";
import path from "path";
import reducer from "../src/reducers";
import {expect} from "chai";

const filePath = pathToFile => file => path.join(pathToFile, file);
const testDir = path.join(__dirname, "test-data");
const cwd = filePath(testDir);



function makeTest({action, input, expected, file}){
    it("file name: " + file, ()=>{
        const newState = reducer(input, action);
        expect(newState).to.eql(expected);
    });
}

function makeSuite({action, tests}){
    describe(action.type, ()=>{
        tests.forEach(makeTest);
    });
}

function findSuiteDescriptor(suites, type){
    var i = 0, l = suites.length;
    for(;i<l;i++){
        const suite = suites[i];
        if(suite.action.type === type){
            return suite;
        }
    }
    return null;
}

function group(tests, test){
    const {action} = test;
    var suite = findSuiteDescriptor(tests, action.type);
    if(!suite){
        suite = {
            action : action,
            tests : []
        };
        tests.push(suite);
    }
    suite.tests.push(test);
    return tests;
}

readdirSync(testDir)
    .map(file => {
        const data = require("./test-data/" + file);
        data.file = file;
        return data;
    })
    .reduce(group, [])
    .map(makeSuite);
