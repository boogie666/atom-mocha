import Mocha from "mocha";
import processor from "../utils/processor";
import makeSuite from "../utils/make-suites";
import {begin, done, endSuite, startTest, finishTest, restart, handleError} from "../actions";
import process from "child_process";
import AbstractRuntime from "../AbstractRuntime";
import path from "path";

export default class MochaRuntime extends AbstractRuntime{
    constructor(store, {compiler, env, expandAnyway}){
        super();
        this.store = store;
        this.compiler = compiler;
        this.env = env;
        this.expandAnyway = expandAnyway;
        this.mocha = null;
    }
    start(){
        const {store, files} =  this;
        const mochaPath = path.join(__dirname, 'mocha-process.js');
        if(this.mocha !== null){
          this.cleanup();
          this.mocha.kill();
          this.mocha = null;
        }
        this.mocha =  process.fork(mochaPath, [this.compiler].concat(this.files), {
            slient : true,
            env : this.env || {}
        }, {
            error : function(err){
                console.trace(err);
            }
        });
        restart(store);
        this.mocha.on("uncaughtException", function(){
            console.log('error');
        });
        this.mocha.on("message", (action) => {
            switch(action.message){
                case "BEGIN" :
                    return begin(store, { data : processor([makeSuite(action.data)])} );
                case "END" :
                    this.cleanup();
                    this.mocha = null;
                    return done(store, { data : action.data });
                case "START_TEST":
                    return startTest(store, { test : action.data });
                case "END_TEST":
                    return finishTest(store, { test : action.data, expandAnyway : this.expandAnyway });
                case "SUITE_END" :
                    return endSuite(store, { suite : action.data });
                case "ERROR" :
                    return handleError(store, { error : action.error });
            }
        });
    }
    cleanup() {
      this.mocha.removeAllListeners();
    }
    clearFiles(){
        this.files = [];
    }
    addFile(filePath){
        this.files.push(filePath);
    }
}
