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
const runtime = new MochaRuntime(store);

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const fileRegex = "*.js";

export default {
  activate(state) {
    const that = this;
    this.atomMochaView = new AtomMochaView(state.atomMochaViewState, store, runtime);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView,
      visible: false
    });
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': ()=> this.toggle(),
      'atom-mocha:rerunTests' : ()=> runtime.start()
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
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'atom-mocha:runTestFileFromEditor' : function(){
            const filePath = atom.workspace.getActivePaneItem().buffer.file.path;
            that.restartRuntimeWithFile(filePath);
        }
    }));

  },
  restartRuntimeWithFolder(folderPath){
      this.modalPanel.show();
      runtime.clearFiles();
      readdir(folderPath).then((files) => {
          Promise.all(files.map(file => {
              return this.addFileOrFolderToRuntime(path.join(folderPath, file));
          })).then( () => {
              runtime.start();
          });
      });
  },
  addFileOrFolderToRuntime(file){
      return stat(file).then( (result)=> {
          if(result.isDirectory()){
              return;
          }
          runtime.addFile(file);
      });
  },
  restartRuntimeWithFile(filePath){
      this.modalPanel.show();
      runtime.clearFiles();
      this.addFileOrFolderToRuntime(filePath).then(()=>{
          runtime.start();
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
