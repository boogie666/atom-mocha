import {CompositeDisposable} from "atom";
import {promisify} from "./utils";
import AtomMochaView from "./atom-mocha-view";
import MochaRuntime from "./mocha";
import {createStore} from "redux";
import reducer from "./reducers";
import {generateTest} from "./generateTest";
import fs from "fs";
import path from "path";

const store = createStore(reducer);

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const fileRegex = "*.js";

function compilerFromConfig(config){
    switch(config){
        case "ES5 (nothing)":
            return "";
        case "ES6 (Babel 5.8.34)":
            return "babel/register";
        case "CoffeScript (coffeescript compiler 1.10.0)":
            return "coffee-script/register";
        default:
            return "";
    }
}

function parseEnvironmentVariables(variables){
    if(!variables){
        return null;
    }
    return variables.split(";").reduce((environmentVariables, currentVariable) => {
        var parts = currentVariable.split("=").map( part => part.trim());
        environmentVariables[parts[0]] = parts[1];
        return environmentVariables;
    }, {});
}

export default {
  config : {
      compiler: {
          type: 'string',
          default: "ES6 (Babel 5.8.34)",
          enum: ["ES5 (nothing)", "ES6 (Babel 5.8.34)", "CoffeScript (coffeescript compiler 1.10.0)"],
          description : "Defines the compiler to be used for the test files and the files required in the tests"
      },
      environmentVariables : {
          type : 'string',
          default : "",
          description : "Define a set of envirment variables for the mocha process. Enviroment variables should be specified in the following format: VARIABLE1_NAME=VARIABLE1_VALUE; VARIABLE2_NAME=VARIABLE2_VALUE;"
      },
      alwaysExpandTree : {
          type : 'boolean',
          default : false,
          description : "Tick if all nodes in the tree should expand after a test is executed. Untick if tree should only expand failed tests"
      }
  },
  activate(state) {
    const that = this;
    const language = atom.config.get("atom-mocha.compiler");
    const environmentVariables = atom.config.get("atom-mocha.environmentVariables");
    const expandAnyway = atom.config.get("atom-mocha.alwaysExpandTree");

    this.runtime = new MochaRuntime(store, {
        compiler : compilerFromConfig(language),
        env : parseEnvironmentVariables(environmentVariables),
        expandAnyway
    });
    this.atomMochaView = new AtomMochaView(state.atomMochaViewState, store, this.runtime);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView,
      visible: false
    });
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': ()=> this.toggle(),
      'atom-mocha:rerunTests' : ()=> this.runtime.start(),
      'atom-mocha:runTestFileFromEditor' : function(){
            const activePaneItem = atom.workspace.getActivePaneItem();
            const buffer = activePaneItem ? activePaneItem.buffer : null;
            const file = buffer ? buffer.file : null;
            const path = file ? file.path : null;
            if(path){
                that.restartRuntimeWithFile(path);
            }
        }
    }));
    this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
        'atom-mocha:runTestFile': function(){
            const filePath = this.getAttribute("data-path");
            that.restartRuntimeWithFile(filePath);
        }
    }));
    this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
        'atom-mocha:runTestFile': function(){
            const filePath = this.getAttribute("data-path");
            that.restartRuntimeWithFile(filePath);
        }
    }));
    this.subscriptions.add(atom.commands.add('.tree-view .directory span.icon-file-directory', {
        'atom-mocha:runTestFolder' : function(e){
            const folderPath = this.getAttribute("data-path");
            that.restartRuntimeWithFolder(folderPath);
        }
    }));
  },
  restartRuntimeWithFolder(folderPath){
      this.modalPanel.show();
      this.runtime.clearFiles();
      readdir(folderPath).then((files) => {
          Promise.all(files.map(file => {
              return this.addFileOrFolderToRuntime(path.join(folderPath, file));
          })).then( () => {
              this.runtime.start();
          });
      });
  },
  addFileOrFolderToRuntime(file){
      return stat(file).then( (result)=> {
          if(result.isDirectory()){
              return;
          }
          this.runtime.addFile(file);
      });
  },
  restartRuntimeWithFile(filePath){
      this.modalPanel.show();
      this.runtime.clearFiles();
      this.addFileOrFolderToRuntime(filePath).then(()=>{
          this.runtime.start();
      });
  },
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.atomMochaView.destroy();
  },
  serialize() {
    return {
      atomMochaViewState: this.atomMochaView.serialize()
    };
  },
  toggle() {
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      return this.modalPanel.show();
    }
  }

};
