import Mocha from "mocha";
import processor from "./utils/processor";
import makeSuite from "./utils/make-suites";
import {begin, done, endSuite, startTest, finishTest, restart} from "./actions";
import process from "child_process";

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
                    return done(store, { data : action.data });
                case "START_TEST":
                    return startTest(store, { test : action.data });
                case "END_TEST":
                    return finishTest(store, { test : action.data });
                case "SUITE_END" :
                    return endSuite(store, { suite : action.data });
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
