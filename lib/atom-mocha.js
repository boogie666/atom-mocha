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
//# sourceMappingURL=data:application/json;base64,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VUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQy9CLE1BQU07QUFDTCxhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDL0I7R0FDRjs7Q0FFRiIsImZpbGUiOiJhdG9tLW1vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tIFwiYXRvbVwiO1xyXG5pbXBvcnQgQXRvbU1vY2hhVmlldyBmcm9tIFwiLi9hdG9tLW1vY2hhLXZpZXdcIjtcclxuaW1wb3J0IE1vY2hhUnVudGltZSBmcm9tIFwiLi9tb2NoYVwiO1xyXG5pbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tIFwicmVkdXhcIjtcclxuaW1wb3J0IHJlZHVjZXIgZnJvbSBcIi4vcmVkdWNlcnNcIjtcclxuXHJcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcik7XHJcbmNvbnN0IHJ1bnRpbWUgPSBuZXcgTW9jaGFSdW50aW1lKHN0b3JlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhdG9tTW9jaGFWaWV3OiBudWxsLFxyXG4gIG1vZGFsUGFuZWw6IG51bGwsXHJcbiAgc3Vic2NyaXB0aW9uczogbnVsbCxcclxuICBhY3RpdmF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLmF0b21Nb2NoYVZpZXcgPSBuZXcgQXRvbU1vY2hhVmlldyhzdGF0ZS5hdG9tTW9jaGFWaWV3U3RhdGUsIHN0b3JlLCBydW50aW1lKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcclxuICAgICAgJ2F0b20tbW9jaGE6dG9nZ2xlJzogKCk9PiB0aGlzLnRvZ2dsZSgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpyZXJ1blRlc3RzJyA6ICgpPT4gcnVudGltZS5zdGFydCgpXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIik7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGVGcm9tRWRpdG9yJyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKS5idWZmZXIuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgcnVudGltZS5jbGVhckZpbGVzKCk7XHJcbiAgICAgIHJ1bnRpbWUuYWRkRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgIHJ1bnRpbWUuc3RhcnQoKTtcclxuICB9LFxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmF0b21Nb2NoYVZpZXcuZGVzdHJveSgpO1xyXG4gIH0sXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXRvbU1vY2hhVmlld1N0YXRlOiB0aGlzLmF0b21Nb2NoYVZpZXcuc2VyaWFsaXplKClcclxuICAgIH07XHJcbiAgfSxcclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
