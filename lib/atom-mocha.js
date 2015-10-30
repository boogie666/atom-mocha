"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _atomMochaView = require("./atom-mocha-view");

var _atomMochaView2 = _interopRequireDefault(_atomMochaView);

var _mocha = require("./mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _generateTest = require("./generateTest");

var store = (0, _redux.createStore)(_reducers2["default"]);
var runtime = new _mocha2["default"](store);

exports["default"] = {
  atomMochaView: null,
  modalPanel: null,
  subscriptions: null,
  activate: function activate(state) {
    var _this = this;

    var that = this;
    this.atomMochaView = new _atomMochaView2["default"](state.atomMochaViewState, store, runtime);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.atomMochaView,
      visible: false
    });
    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-mocha:toggle': function atomMochaToggle() {
        return _this.toggle();
      },
      'atom-mocha:rerunTests': function atomMochaRerunTests() {
        return runtime.start();
      }
    }));
    this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
      'atom-mocha:runTestFile': function atomMochaRunTestFile(e) {
        var filePath = this.getAttribute("data-path");
        that.restartRuntimeWithFile(filePath);
      }
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'atom-mocha:runTestFileFromEditor': function atomMochaRunTestFileFromEditor() {
        var filePath = atom.workspace.getActivePaneItem().buffer.file.path;
        that.restartRuntimeWithFile(filePath);
      }
    }));
  },
  restartRuntimeWithFile: function restartRuntimeWithFile(filePath) {
    this.modalPanel.show();
    runtime.clearFiles();
    runtime.addFile(filePath);
    runtime.start();
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
  }

};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDL0IsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUMvQjtHQUNGOztDQUVGIiwiZmlsZSI6ImF0b20tbW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gXCJhdG9tXCI7XHJcbmltcG9ydCBBdG9tTW9jaGFWaWV3IGZyb20gXCIuL2F0b20tbW9jaGEtdmlld1wiO1xyXG5pbXBvcnQgTW9jaGFSdW50aW1lIGZyb20gXCIuL21vY2hhXCI7XHJcbmltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJyZWR1eFwiO1xyXG5pbXBvcnQgcmVkdWNlciBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQge2dlbmVyYXRlVGVzdH0gZnJvbSBcIi4vZ2VuZXJhdGVUZXN0XCI7XHJcblxyXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xyXG5jb25zdCBydW50aW1lID0gbmV3IE1vY2hhUnVudGltZShzdG9yZSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXRvbU1vY2hhVmlldzogbnVsbCxcclxuICBtb2RhbFBhbmVsOiBudWxsLFxyXG4gIHN1YnNjcmlwdGlvbnM6IG51bGwsXHJcbiAgYWN0aXZhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhpcy5hdG9tTW9jaGFWaWV3ID0gbmV3IEF0b21Nb2NoYVZpZXcoc3RhdGUuYXRvbU1vY2hhVmlld1N0YXRlLCBzdG9yZSwgcnVudGltZSk7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRSaWdodFBhbmVsKHtcclxuICAgICAgaXRlbTogdGhpcy5hdG9tTW9jaGFWaWV3LFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKSxcclxuICAgICAgJ2F0b20tbW9jaGE6cmVydW5UZXN0cycgOiAoKT0+IHJ1bnRpbWUuc3RhcnQoKVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLnRyZWUtdmlldyAuZmlsZSAubmFtZScsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZSc6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlRnJvbUVkaXRvcicgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCkuYnVmZmVyLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcblxyXG4gIH0sXHJcbiAgcmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICAgIHJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICBydW50aW1lLmFkZEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICBydW50aW1lLnN0YXJ0KCk7XHJcbiAgfSxcclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbFBhbmVsLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5hdG9tTW9jaGFWaWV3LmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIHNlcmlhbGl6ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF0b21Nb2NoYVZpZXdTdGF0ZTogdGhpcy5hdG9tTW9jaGFWaWV3LnNlcmlhbGl6ZSgpXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kYWxQYW5lbC5pc1Zpc2libGUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLmhpZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
