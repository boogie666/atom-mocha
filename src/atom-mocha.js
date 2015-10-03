import {CompositeDisposable} from "atom";
import AtomMochaView from "./atom-mocha-view";
import Mocha, {Runner, Suite, Context} from "mocha";
import configureStore from "./store/configureStore";

const createId = (function(){
    var id = 0;
    return function(){
        return id++;
    };
}());

var store = configureStore();
var mocha = new Mocha();
mocha.reporter(function (runner){
    runner.on("test", function(test){
        console.warn('test',test.title, test);
    });
    runner.on("test end", function(test){
    });
    runner.on("suite", function(suite){
        suite.id = createId();
        store.dispatch({ type : "ADD_SUITE", suite : suite});
        console.warn("suite", suite.title);
    });
});
function runMocha(file){
    store.dispatch({ type : "RESET" });
    mocha.addFile(file);
    mocha.run();
}

export default {
  atomMochaView: null,
  modalPanel: null,
  subscriptions: null,
  activate(state) {
    this.atomMochaView = new AtomMochaView(state.atomMochaViewState, store);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView.getElement(),
      visible: false
    });
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': ()=> this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:run-tests': ()=> this.runTests()
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
  },
  runTests() {
      console.warn("running tests")
      runMocha(atom.project.getPaths()[0] + "\\test\\simpleTest.js");
  }

};
