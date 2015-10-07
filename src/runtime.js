import Mocha from "mocha";
import {fromJS} from "immutable";
import processor from "./utils/processor";
import makeSuite from "./utils/make-suites";
import {begin, done, startTest, finishTest, restart} from "./actions";
import process from "child_process";

function wrap(fn){
    return function(...args){
        try{
            fn(...args);
        }catch(error){
            console.error(error.stack);
        }
    };
}

export default class Runtime{
    constructor(store){
        this.store = store;
        this.files = [];
    }
    start(){
        const {store, files} =  this;

        const mocha = process.fork(__dirname + '/../lib/mocha/mocha-process.js', this.files);

        restart(store);
        mocha.on("message", function(action){
            if(action.message === "ERROR"){
                throw action.error;
            }
            switch(action.message){
                case "BEGIN" :
                    return begin(store, { data : processor([makeSuite(action.data)])} );
                case "END" :
                    return done(store);
                case "START_TEST":
                    return startTest(store, { test : action.data });
                case "END_TEST":
                    return finishTest(store, { test : action.data });
            }
        });

    }
    clearFiles(){
        this.files = [];
    }
    addFile(filePath){
        this.files.push(filePath);
    }
}
