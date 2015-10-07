import {CompositeDisposable} from "atom";
import AtomMochaView from "./atom-mocha-view";
import Runtime from "./runtime";
import {createStore} from "redux";
import reducer from "./reducers";

const store = createStore(reducer);
const runtime = new Runtime(store);

export default {
  atomMochaView: null,
  modalPanel: null,
  subscriptions: null,
  activate(state) {
    const that = this;
    this.atomMochaView = new AtomMochaView(state.atomMochaViewState, store);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': ()=> this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
        'atom-mocha:runTestFile': function(e){
            that.modalPanel.show();
            const filePath = this.getAttribute("data-path");
            runtime.clearFiles();
            runtime.addFile(filePath);
            runtime.start();
        }
    }));

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
