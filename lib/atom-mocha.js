"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _atom = require("atom");

var _utils = require("./utils");

var _atomMochaView = require("./atom-mocha-view");

var _atomMochaView2 = _interopRequireDefault(_atomMochaView);

var _mocha = require("./mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _generateTest = require("./generateTest");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var store = (0, _redux.createStore)(_reducers2["default"]);

var readdir = (0, _utils.promisify)(_fs2["default"].readdir);
var stat = (0, _utils.promisify)(_fs2["default"].stat);

var fileRegex = "*.js";

function compilerFromConfig(config) {
    switch (config) {
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

exports["default"] = {
    config: {
        compiler: {
            type: 'string',
            "default": "ES6 (Babel 5.8.34)",
            "enum": ["ES5 (nothing)", "ES6 (Babel 5.8.34)", "CoffeScript (coffeescript compiler 1.10.0)"],
            description: "Defines the compiler to be used for the test files and the files required in the tests"
        }
    },
    activate: function activate(state) {
        var _this = this;

        var that = this;
        var language = atom.config.get("atom-mocha.compiler");
        this.runtime = new _mocha2["default"](store, compilerFromConfig(language));
        this.atomMochaView = new _atomMochaView2["default"](state.atomMochaViewState, store, this.runtime);
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
                return _this.runtime.start();
            }
        }));
        this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
            'atom-mocha:runTestFile': function atomMochaRunTestFile() {
                var filePath = this.getAttribute("data-path");
                that.restartRuntimeWithFile(filePath);
            }
        }));
        this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
            'atom-mocha:runTestFile': function atomMochaRunTestFile() {
                var filePath = this.getAttribute("data-path");
                that.restartRuntimeWithFile(filePath);
            }
        }));
        this.subscriptions.add(atom.commands.add('.tree-view .directory span.icon-file-directory', {
            'atom-mocha:runTestFolder': function atomMochaRunTestFolder(e) {
                var folderPath = this.getAttribute("data-path");
                that.restartRuntimeWithFolder(folderPath);
            }
        }));
        this.subscriptions.add(atom.commands.add('atom-text-editor', {
            'atom-mocha:runTestFileFromEditor': function atomMochaRunTestFileFromEditor() {
                var filePath = atom.workspace.getActivePaneItem().buffer.file.path;
                that.restartRuntimeWithFile(filePath);
            }
        }));
    },
    restartRuntimeWithFolder: function restartRuntimeWithFolder(folderPath) {
        var _this2 = this;

        this.modalPanel.show();
        this.runtime.clearFiles();
        readdir(folderPath).then(function (files) {
            Promise.all(files.map(function (file) {
                return _this2.addFileOrFolderToRuntime(_path2["default"].join(folderPath, file));
            })).then(function () {
                _this2.runtime.start();
            });
        });
    },
    addFileOrFolderToRuntime: function addFileOrFolderToRuntime(file) {
        var _this3 = this;

        return stat(file).then(function (result) {
            if (result.isDirectory()) {
                return;
            }
            _this3.runtime.addFile(file);
        });
    },
    restartRuntimeWithFile: function restartRuntimeWithFile(filePath) {
        var _this4 = this;

        this.modalPanel.show();
        this.runtime.clearFiles();
        this.addFileOrFolderToRuntime(filePath).then(function () {
            _this4.runtime.start();
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWtDLE1BQU07O3FCQUNoQixTQUFTOzs2QkFDUCxtQkFBbUI7Ozs7cUJBQ3BCLFNBQVM7Ozs7cUJBQ1IsT0FBTzs7d0JBQ2IsWUFBWTs7Ozs0QkFDTCxnQkFBZ0I7O2tCQUM1QixJQUFJOzs7O29CQUNGLE1BQU07Ozs7QUFFdkIsSUFBTSxLQUFLLEdBQUcsOENBQW9CLENBQUM7O0FBRW5DLElBQU0sT0FBTyxHQUFHLHNCQUFVLGdCQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLElBQU0sSUFBSSxHQUFHLHNCQUFVLGdCQUFHLElBQUksQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7O0FBRXpCLFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFDO0FBQy9CLFlBQU8sTUFBTTtBQUNULGFBQUssZUFBZTtBQUNoQixtQkFBTyxFQUFFLENBQUM7QUFBQSxBQUNkLGFBQUssb0JBQW9CO0FBQ3JCLG1CQUFPLGdCQUFnQixDQUFDO0FBQUEsQUFDNUIsYUFBSyw0Q0FBNEM7QUFDN0MsbUJBQU8sd0JBQXdCLENBQUM7QUFBQSxBQUNwQztBQUNJLG1CQUFPLEVBQUUsQ0FBQztBQUFBLEtBQ2pCO0NBQ0o7O3FCQUVjO0FBQ2IsVUFBTSxFQUFHO0FBQ0wsZ0JBQVEsRUFBRTtBQUNSLGdCQUFJLEVBQUUsUUFBUTtBQUNkLHVCQUFTLG9CQUFvQjtBQUM3QixvQkFBTSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSw0Q0FBNEMsQ0FBQztBQUMzRix1QkFBVyxFQUFHLHdGQUF3RjtTQUN6RztLQUNGO0FBQ0QsWUFBUSxFQUFBLGtCQUFDLEtBQUssRUFBRTs7O0FBQ2QsWUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDdEQsWUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBaUIsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDckUsWUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBa0IsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEYsWUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUM3QyxnQkFBSSxFQUFFLElBQUksQ0FBQyxhQUFhO0FBQ3hCLG1CQUFPLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUM7QUFDL0MsWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7QUFDekQsK0JBQW1CLEVBQUU7dUJBQUssTUFBSyxNQUFNLEVBQUU7YUFBQTtBQUN2QyxtQ0FBdUIsRUFBRzt1QkFBSyxNQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7YUFBQTtTQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNKLFlBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFO0FBQy9ELG9DQUF3QixFQUFFLGdDQUFVO0FBQ2hDLG9CQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELG9CQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7U0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFO0FBQy9ELG9DQUF3QixFQUFFLGdDQUFVO0FBQ2hDLG9CQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELG9CQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7U0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFO0FBQ3ZGLHNDQUEwQixFQUFHLGdDQUFTLENBQUMsRUFBQztBQUNwQyxvQkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxvQkFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdDO1NBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtBQUN6RCw4Q0FBa0MsRUFBRywwQ0FBVTtBQUMzQyxvQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JFLG9CQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7U0FDSixDQUFDLENBQUMsQ0FBQztLQUVMO0FBQ0QsNEJBQXdCLEVBQUEsa0NBQUMsVUFBVSxFQUFDOzs7QUFDaEMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QixZQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzFCLGVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDaEMsbUJBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksRUFBSTtBQUMxQix1QkFBTyxPQUFLLHdCQUF3QixDQUFDLGtCQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUUsWUFBTTtBQUNaLHVCQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjtBQUNELDRCQUF3QixFQUFBLGtDQUFDLElBQUksRUFBQzs7O0FBQzFCLGVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFDLE1BQU0sRUFBSTtBQUMvQixnQkFBRyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUM7QUFDcEIsdUJBQU87YUFDVjtBQUNELG1CQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047QUFDRCwwQkFBc0IsRUFBQSxnQ0FBQyxRQUFRLEVBQUM7OztBQUM1QixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLFlBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQzdDLG1CQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjtBQUNELGNBQVUsRUFBQSxzQkFBRztBQUNYLFlBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixlQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDckM7QUFDRCxhQUFTLEVBQUEscUJBQUc7QUFDVixlQUFPO0FBQ0wsOEJBQWtCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7U0FDbkQsQ0FBQztLQUNIO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsWUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQy9CLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0IsTUFBTTtBQUNMLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7S0FDRjs7Q0FFRiIsImZpbGUiOiJhdG9tLW1vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tIFwiYXRvbVwiO1xyXG5pbXBvcnQge3Byb21pc2lmeX0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IEF0b21Nb2NoYVZpZXcgZnJvbSBcIi4vYXRvbS1tb2NoYS12aWV3XCI7XHJcbmltcG9ydCBNb2NoYVJ1bnRpbWUgZnJvbSBcIi4vbW9jaGFcIjtcclxuaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCByZWR1Y2VyIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVUZXN0fSBmcm9tIFwiLi9nZW5lcmF0ZVRlc3RcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuXHJcbmNvbnN0IHJlYWRkaXIgPSBwcm9taXNpZnkoZnMucmVhZGRpcik7XHJcbmNvbnN0IHN0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XHJcblxyXG5jb25zdCBmaWxlUmVnZXggPSBcIiouanNcIjtcclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGVyRnJvbUNvbmZpZyhjb25maWcpe1xyXG4gICAgc3dpdGNoKGNvbmZpZyl7XHJcbiAgICAgICAgY2FzZSBcIkVTNSAobm90aGluZylcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgY2FzZSBcIkVTNiAoQmFiZWwgNS44LjM0KVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJiYWJlbC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGNhc2UgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29mZmVlLXNjcmlwdC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnIDoge1xyXG4gICAgICBjb21waWxlcjoge1xyXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgIGRlZmF1bHQ6IFwiRVM2IChCYWJlbCA1LjguMzQpXCIsXHJcbiAgICAgICAgZW51bTogW1wiRVM1IChub3RoaW5nKVwiLCBcIkVTNiAoQmFiZWwgNS44LjM0KVwiLCBcIkNvZmZlU2NyaXB0IChjb2ZmZWVzY3JpcHQgY29tcGlsZXIgMS4xMC4wKVwiXSxcclxuICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgY29tcGlsZXIgdG8gYmUgdXNlZCBmb3IgdGhlIHRlc3QgZmlsZXMgYW5kIHRoZSBmaWxlcyByZXF1aXJlZCBpbiB0aGUgdGVzdHNcIlxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgdmFyIGxhbmd1YWdlID0gYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1tb2NoYS5jb21waWxlclwiKTtcclxuICAgIHRoaXMucnVudGltZSA9IG5ldyBNb2NoYVJ1bnRpbWUoc3RvcmUsIGNvbXBpbGVyRnJvbUNvbmZpZyhsYW5ndWFnZSkpO1xyXG4gICAgdGhpcy5hdG9tTW9jaGFWaWV3ID0gbmV3IEF0b21Nb2NoYVZpZXcoc3RhdGUuYXRvbU1vY2hhVmlld1N0YXRlLCBzdG9yZSwgdGhpcy5ydW50aW1lKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcclxuICAgICAgJ2F0b20tbW9jaGE6dG9nZ2xlJzogKCk9PiB0aGlzLnRvZ2dsZSgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpyZXJ1blRlc3RzJyA6ICgpPT4gdGhpcy5ydW50aW1lLnN0YXJ0KClcclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmZpbGUgLm5hbWUnLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGUnOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmZpbGUgLm5hbWUnLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGUnOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmRpcmVjdG9yeSBzcGFuLmljb24tZmlsZS1kaXJlY3RvcnknLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZvbGRlcicgOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgY29uc3QgZm9sZGVyUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZvbGRlcihmb2xkZXJQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlRnJvbUVkaXRvcicgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCkuYnVmZmVyLmZpbGUucGF0aDtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcblxyXG4gIH0sXHJcbiAgcmVzdGFydFJ1bnRpbWVXaXRoRm9sZGVyKGZvbGRlclBhdGgpe1xyXG4gICAgICB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICB0aGlzLnJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICByZWFkZGlyKGZvbGRlclBhdGgpLnRoZW4oKGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICBQcm9taXNlLmFsbChmaWxlcy5tYXAoZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKHBhdGguam9pbihmb2xkZXJQYXRoLCBmaWxlKSk7XHJcbiAgICAgICAgICB9KSkudGhlbiggKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKGZpbGUpe1xyXG4gICAgICByZXR1cm4gc3RhdChmaWxlKS50aGVuKCAocmVzdWx0KT0+IHtcclxuICAgICAgICAgIGlmKHJlc3VsdC5pc0RpcmVjdG9yeSgpKXtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJ1bnRpbWUuYWRkRmlsZShmaWxlKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgdGhpcy5ydW50aW1lLmNsZWFyRmlsZXMoKTtcclxuICAgICAgdGhpcy5hZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUoZmlsZVBhdGgpLnRoZW4oKCk9PntcclxuICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmF0b21Nb2NoYVZpZXcuZGVzdHJveSgpO1xyXG4gIH0sXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXRvbU1vY2hhVmlld1N0YXRlOiB0aGlzLmF0b21Nb2NoYVZpZXcuc2VyaWFsaXplKClcclxuICAgIH07XHJcbiAgfSxcclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
