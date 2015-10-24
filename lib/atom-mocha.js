"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _atomMochaView = require("./atom-mocha-view");

var _atomMochaView2 = _interopRequireDefault(_atomMochaView);

var _runtime = require("./runtime");

var _runtime2 = _interopRequireDefault(_runtime);

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var store = (0, _redux.createStore)(_reducers2["default"]);
var runtime = new _runtime2["default"](store);

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
//# sourceMappingURL=data:application/json;base64,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QUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDL0IsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUMvQjtHQUNGOztDQUVGIiwiZmlsZSI6ImF0b20tbW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gXCJhdG9tXCI7XHJcbmltcG9ydCBBdG9tTW9jaGFWaWV3IGZyb20gXCIuL2F0b20tbW9jaGEtdmlld1wiO1xyXG5pbXBvcnQgUnVudGltZSBmcm9tIFwiLi9ydW50aW1lXCI7XHJcbmltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJyZWR1eFwiO1xyXG5pbXBvcnQgcmVkdWNlciBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuY29uc3QgcnVudGltZSA9IG5ldyBSdW50aW1lKHN0b3JlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhdG9tTW9jaGFWaWV3OiBudWxsLFxyXG4gIG1vZGFsUGFuZWw6IG51bGwsXHJcbiAgc3Vic2NyaXB0aW9uczogbnVsbCxcclxuICBhY3RpdmF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLmF0b21Nb2NoYVZpZXcgPSBuZXcgQXRvbU1vY2hhVmlldyhzdGF0ZS5hdG9tTW9jaGFWaWV3U3RhdGUsIHN0b3JlLCBydW50aW1lKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcclxuICAgICAgJ2F0b20tbW9jaGE6dG9nZ2xlJzogKCk9PiB0aGlzLnRvZ2dsZSgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpyZXJ1blRlc3RzJyA6ICgpPT4gcnVudGltZS5zdGFydCgpXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIik7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGVGcm9tRWRpdG9yJyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKS5idWZmZXIuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgcnVudGltZS5jbGVhckZpbGVzKCk7XHJcbiAgICAgIHJ1bnRpbWUuYWRkRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgIHJ1bnRpbWUuc3RhcnQoKTtcclxuICB9LFxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmF0b21Nb2NoYVZpZXcuZGVzdHJveSgpO1xyXG4gIH0sXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXRvbU1vY2hhVmlld1N0YXRlOiB0aGlzLmF0b21Nb2NoYVZpZXcuc2VyaWFsaXplKClcclxuICAgIH07XHJcbiAgfSxcclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
