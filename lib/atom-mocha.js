"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _atomMochaView = require("./atom-mocha-view");

var _atomMochaView2 = _interopRequireDefault(_atomMochaView);

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _storeConfigureStore = require("./store/configureStore");

var _storeConfigureStore2 = _interopRequireDefault(_storeConfigureStore);

var createId = (function () {
  var id = 0;
  return function () {
    return id++;
  };
})();

var store = (0, _storeConfigureStore2["default"])();
var mocha = new _mocha2["default"]();
mocha.reporter(function (runner) {
  runner.on("test", function (test) {
    console.warn('test', test.title, test);
  });
  runner.on("test end", function (test) {});
  runner.on("suite", function (suite) {
    suite.id = createId();
    store.dispatch({ type: "ADD_SUITE", suite: suite });
    console.warn("suite", suite.title);
  });
});
function runMocha(file) {
  store.dispatch({ type: "RESET" });
  mocha.addFile(file);
  mocha.run();
}

exports["default"] = {
  atomMochaView: null,
  modalPanel: null,
  subscriptions: null,
  activate: function activate(state) {
    var _this = this;

    this.atomMochaView = new _atomMochaView2["default"](state.atomMochaViewState, store);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView.getElement(),
      visible: false
    });
    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': function atomMochaToggle() {
        return _this.toggle();
      }
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:run-tests': function atomMochaRunTests() {
        return _this.runTests();
      }
    }));
  },
  deactivate: function deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    return this.atomMochaView.destroy();
  },
  serialize: function serialize() {
    return {
      atomMochaViewState: this.atomMochaView.serialize()
    };
  },
  toggle: function toggle() {
    if (this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    } else {
      return this.modalPanel.show();
    }
  },
  runTests: function runTests() {
    console.warn("running tests");
    runMocha(atom.project.getPaths()[0] + "\\test\\simpleTest.js");
  }

};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QUFDRCxXQUFTLEVBQUEscUJBQUc7QUFDVixXQUFPO0FBQ0wsd0JBQWtCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7S0FDbkQsQ0FBQztHQUNIO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQy9CLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUMvQixNQUFNO0FBQ0wsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQy9CO0dBQ0Y7QUFDRCxVQUFRLEVBQUEsb0JBQUc7QUFDUCxXQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQzdCLFlBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7R0FDbEU7O0NBRUYiLCJmaWxlIjoiYXRvbS1tb2NoYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSBcImF0b21cIjtcclxuaW1wb3J0IEF0b21Nb2NoYVZpZXcgZnJvbSBcIi4vYXRvbS1tb2NoYS12aWV3XCI7XHJcbmltcG9ydCBNb2NoYSwge1J1bm5lciwgU3VpdGUsIENvbnRleHR9IGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSBcIi4vc3RvcmUvY29uZmlndXJlU3RvcmVcIjtcclxuXHJcbmNvbnN0IGNyZWF0ZUlkID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaWQgPSAwO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGlkKys7XHJcbiAgICB9O1xyXG59KCkpO1xyXG5cclxudmFyIHN0b3JlID0gY29uZmlndXJlU3RvcmUoKTtcclxudmFyIG1vY2hhID0gbmV3IE1vY2hhKCk7XHJcbm1vY2hhLnJlcG9ydGVyKGZ1bmN0aW9uIChydW5uZXIpe1xyXG4gICAgcnVubmVyLm9uKFwidGVzdFwiLCBmdW5jdGlvbih0ZXN0KXtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3Rlc3QnLHRlc3QudGl0bGUsIHRlc3QpO1xyXG4gICAgfSk7XHJcbiAgICBydW5uZXIub24oXCJ0ZXN0IGVuZFwiLCBmdW5jdGlvbih0ZXN0KXtcclxuICAgIH0pO1xyXG4gICAgcnVubmVyLm9uKFwic3VpdGVcIiwgZnVuY3Rpb24oc3VpdGUpe1xyXG4gICAgICAgIHN1aXRlLmlkID0gY3JlYXRlSWQoKTtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGUgOiBcIkFERF9TVUlURVwiLCBzdWl0ZSA6IHN1aXRlfSk7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwic3VpdGVcIiwgc3VpdGUudGl0bGUpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBydW5Nb2NoYShmaWxlKXtcclxuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZSA6IFwiUkVTRVRcIiB9KTtcclxuICAgIG1vY2hhLmFkZEZpbGUoZmlsZSk7XHJcbiAgICBtb2NoYS5ydW4oKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGF0b21Nb2NoYVZpZXc6IG51bGwsXHJcbiAgbW9kYWxQYW5lbDogbnVsbCxcclxuICBzdWJzY3JpcHRpb25zOiBudWxsLFxyXG4gIGFjdGl2YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLmF0b21Nb2NoYVZpZXcgPSBuZXcgQXRvbU1vY2hhVmlldyhzdGF0ZS5hdG9tTW9jaGFWaWV3U3RhdGUsIHN0b3JlKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcuZ2V0RWxlbWVudCgpLFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnJ1bi10ZXN0cyc6ICgpPT4gdGhpcy5ydW5UZXN0cygpXHJcbiAgICB9KSk7XHJcblxyXG4gIH0sXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxQYW5lbC5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXRvbU1vY2hhVmlldy5kZXN0cm95KCk7XHJcbiAgfSxcclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdG9tTW9jaGFWaWV3U3RhdGU6IHRoaXMuYXRvbU1vY2hhVmlldy5zZXJpYWxpemUoKVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGFsUGFuZWwuaXNWaXNpYmxlKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJ1blRlc3RzKCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJydW5uaW5nIHRlc3RzXCIpXHJcbiAgICAgIHJ1bk1vY2hhKGF0b20ucHJvamVjdC5nZXRQYXRocygpWzBdICsgXCJcXFxcdGVzdFxcXFxzaW1wbGVUZXN0LmpzXCIpO1xyXG4gIH1cclxuXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
