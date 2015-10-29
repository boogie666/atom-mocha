import {CompositeDisposable} from "atom";
import AtomMochaView from "./atom-mocha-view";
import MochaRuntime from "./mocha";
import {createStore} from "redux";
import reducer from "./reducers";

const store = createStore(reducer);
const runtime = new MochaRuntime(store);

export default {
  atomMochaView: null,
  modalPanel: null,
  subscriptions: null,
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
        'atom-mocha:runTestFile': function(e){
            const filePath = this.getAttribute("data-path");
            that.restartRuntimeWithFile(filePath);
        }
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'atom-mocha:runTestFileFromEditor' : function(){
            const filePath = atom.workspace.getActivePaneItem().buffer.file.path;
            that.restartRuntimeWithFile(filePath);
        }
    }));

  },
  restartRuntimeWithFile(filePath){
      this.modalPanel.show();
      runtime.clearFiles();
      runtime.addFile(filePath);
      runtime.start();
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
