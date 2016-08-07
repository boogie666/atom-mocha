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

function parseEnvironmentVariables(variables) {
    if (!variables) {
        return null;
    }
    return variables.split(";").reduce(function (environmentVariables, currentVariable) {
        var parts = currentVariable.split("=").map(function (part) {
            return part.trim();
        });
        environmentVariables[parts[0]] = parts[1];
        return environmentVariables;
    }, {});
}

exports["default"] = {
    config: {
        compiler: {
            type: 'string',
            "default": "ES6 (Babel 5.8.34)",
            "enum": ["ES5 (nothing)", "ES6 (Babel 5.8.34)", "CoffeScript (coffeescript compiler 1.10.0)"],
            description: "Defines the compiler to be used for the test files and the files required in the tests"
        },
        environmentVariables: {
            type: 'string',
            "default": "",
            description: "Define a set of envirment variables for the mocha process. Enviroment variables should be specified in the following format: VARIABLE1_NAME=VARIABLE1_VALUE; VARIABLE2_NAME=VARIABLE2_VALUE;"
        },
        alwaysExpandTree: {
            type: 'boolean',
            "default": false,
            description: "Tick if all nodes in the tree should expand after a test is executed. Untick if tree should only expand failed tests"
        }
    },
    activate: function activate(state) {
        var _this = this;

        var that = this;
        var language = atom.config.get("atom-mocha.compiler");
        var environmentVariables = atom.config.get("atom-mocha.environmentVariables");
        var expandAnyway = atom.config.get("atom-mocha.alwaysExpandTree");

        this.runtime = new _mocha2["default"](store, {
            compiler: compilerFromConfig(language),
            env: parseEnvironmentVariables(environmentVariables),
            expandAnyway: expandAnyway
        });
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
            },
            'atom-mocha:runTestFileFromEditor': function atomMochaRunTestFileFromEditor() {
                var activePaneItem = atom.workspace.getActivePaneItem();
                var buffer = activePaneItem ? activePaneItem.buffer : null;
                var file = buffer ? buffer.file : null;
                var path = file ? file.path : null;
                if (path) {
                    that.restartRuntimeWithFile(path);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWtDLE1BQU07O3FCQUNoQixTQUFTOzs2QkFDUCxtQkFBbUI7Ozs7cUJBQ3BCLFNBQVM7Ozs7cUJBQ1IsT0FBTzs7d0JBQ2IsWUFBWTs7Ozs0QkFDTCxnQkFBZ0I7O2tCQUM1QixJQUFJOzs7O29CQUNGLE1BQU07Ozs7QUFFdkIsSUFBTSxLQUFLLEdBQUcsOENBQW9CLENBQUM7O0FBRW5DLElBQU0sT0FBTyxHQUFHLHNCQUFVLGdCQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLElBQU0sSUFBSSxHQUFHLHNCQUFVLGdCQUFHLElBQUksQ0FBQyxDQUFDOztBQUVoQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUM7O0FBRXpCLFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFDO0FBQy9CLFlBQU8sTUFBTTtBQUNULGFBQUssZUFBZTtBQUNoQixtQkFBTyxFQUFFLENBQUM7QUFBQSxBQUNkLGFBQUssb0JBQW9CO0FBQ3JCLG1CQUFPLGdCQUFnQixDQUFDO0FBQUEsQUFDNUIsYUFBSyw0Q0FBNEM7QUFDN0MsbUJBQU8sd0JBQXdCLENBQUM7QUFBQSxBQUNwQztBQUNJLG1CQUFPLEVBQUUsQ0FBQztBQUFBLEtBQ2pCO0NBQ0o7O0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUM7QUFDekMsUUFBRyxDQUFDLFNBQVMsRUFBQztBQUNWLGVBQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDRCxXQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFLO0FBQzFFLFlBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUEsSUFBSTttQkFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1NBQUEsQ0FBQyxDQUFDO0FBQ2pFLDRCQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxlQUFPLG9CQUFvQixDQUFDO0tBQy9CLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDVjs7cUJBRWM7QUFDYixVQUFNLEVBQUc7QUFDTCxnQkFBUSxFQUFFO0FBQ04sZ0JBQUksRUFBRSxRQUFRO0FBQ2QsdUJBQVMsb0JBQW9CO0FBQzdCLG9CQUFNLENBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLDRDQUE0QyxDQUFDO0FBQzNGLHVCQUFXLEVBQUcsd0ZBQXdGO1NBQ3pHO0FBQ0QsNEJBQW9CLEVBQUc7QUFDbkIsZ0JBQUksRUFBRyxRQUFRO0FBQ2YsdUJBQVUsRUFBRTtBQUNaLHVCQUFXLEVBQUcsOExBQThMO1NBQy9NO0FBQ0Qsd0JBQWdCLEVBQUc7QUFDZixnQkFBSSxFQUFHLFNBQVM7QUFDaEIsdUJBQVUsS0FBSztBQUNmLHVCQUFXLEVBQUcsc0hBQXNIO1NBQ3ZJO0tBQ0o7QUFDRCxZQUFRLEVBQUEsa0JBQUMsS0FBSyxFQUFFOzs7QUFDZCxZQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsWUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN4RCxZQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDaEYsWUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzs7QUFFcEUsWUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBaUIsS0FBSyxFQUFFO0FBQ25DLG9CQUFRLEVBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0FBQ3ZDLGVBQUcsRUFBRyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQztBQUNyRCx3QkFBWSxFQUFaLFlBQVk7U0FDZixDQUFDLENBQUM7QUFDSCxZQUFJLENBQUMsYUFBYSxHQUFHLCtCQUFrQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RixZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0FBQzdDLGdCQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7QUFDeEIsbUJBQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQztBQUMvQyxZQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6RCwrQkFBbUIsRUFBRTt1QkFBSyxNQUFLLE1BQU0sRUFBRTthQUFBO0FBQ3ZDLG1DQUF1QixFQUFHO3VCQUFLLE1BQUssT0FBTyxDQUFDLEtBQUssRUFBRTthQUFBO0FBQ25ELDhDQUFrQyxFQUFHLDBDQUFVO0FBQ3pDLG9CQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDMUQsb0JBQU0sTUFBTSxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUM3RCxvQkFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLG9CQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDckMsb0JBQUcsSUFBSSxFQUFDO0FBQ0osd0JBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckM7YUFDSjtTQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUU7QUFDL0Qsb0NBQXdCLEVBQUUsZ0NBQVU7QUFDaEMsb0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEQsb0JBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztTQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUU7QUFDL0Qsb0NBQXdCLEVBQUUsZ0NBQVU7QUFDaEMsb0JBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEQsb0JBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztTQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUU7QUFDdkYsc0NBQTBCLEVBQUcsZ0NBQVMsQ0FBQyxFQUFDO0FBQ3BDLG9CQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELG9CQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FDSixDQUFDLENBQUMsQ0FBQztLQUNMO0FBQ0QsNEJBQXdCLEVBQUEsa0NBQUMsVUFBVSxFQUFDOzs7QUFDaEMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QixZQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzFCLGVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDaEMsbUJBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksRUFBSTtBQUMxQix1QkFBTyxPQUFLLHdCQUF3QixDQUFDLGtCQUFLLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUUsWUFBTTtBQUNaLHVCQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QixDQUFDLENBQUM7U0FDTixDQUFDLENBQUM7S0FDTjtBQUNELDRCQUF3QixFQUFBLGtDQUFDLElBQUksRUFBQzs7O0FBQzFCLGVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxVQUFDLE1BQU0sRUFBSTtBQUMvQixnQkFBRyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUM7QUFDcEIsdUJBQU87YUFDVjtBQUNELG1CQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047QUFDRCwwQkFBc0IsRUFBQSxnQ0FBQyxRQUFRLEVBQUM7OztBQUM1QixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLFlBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQzdDLG1CQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjtBQUNELGNBQVUsRUFBQSxzQkFBRztBQUNYLFlBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixlQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDckM7QUFDRCxhQUFTLEVBQUEscUJBQUc7QUFDVixlQUFPO0FBQ0wsOEJBQWtCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7U0FDbkQsQ0FBQztLQUNIO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsWUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQy9CLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0IsTUFBTTtBQUNMLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7S0FDRjs7Q0FFRiIsImZpbGUiOiJhdG9tLW1vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tIFwiYXRvbVwiO1xyXG5pbXBvcnQge3Byb21pc2lmeX0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IEF0b21Nb2NoYVZpZXcgZnJvbSBcIi4vYXRvbS1tb2NoYS12aWV3XCI7XHJcbmltcG9ydCBNb2NoYVJ1bnRpbWUgZnJvbSBcIi4vbW9jaGFcIjtcclxuaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCByZWR1Y2VyIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVUZXN0fSBmcm9tIFwiLi9nZW5lcmF0ZVRlc3RcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuXHJcbmNvbnN0IHJlYWRkaXIgPSBwcm9taXNpZnkoZnMucmVhZGRpcik7XHJcbmNvbnN0IHN0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XHJcblxyXG5jb25zdCBmaWxlUmVnZXggPSBcIiouanNcIjtcclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGVyRnJvbUNvbmZpZyhjb25maWcpe1xyXG4gICAgc3dpdGNoKGNvbmZpZyl7XHJcbiAgICAgICAgY2FzZSBcIkVTNSAobm90aGluZylcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgY2FzZSBcIkVTNiAoQmFiZWwgNS44LjM0KVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJiYWJlbC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGNhc2UgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29mZmVlLXNjcmlwdC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUVudmlyb25tZW50VmFyaWFibGVzKHZhcmlhYmxlcyl7XHJcbiAgICBpZighdmFyaWFibGVzKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXMuc3BsaXQoXCI7XCIpLnJlZHVjZSgoZW52aXJvbm1lbnRWYXJpYWJsZXMsIGN1cnJlbnRWYXJpYWJsZSkgPT4ge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGN1cnJlbnRWYXJpYWJsZS5zcGxpdChcIj1cIikubWFwKCBwYXJ0ID0+IHBhcnQudHJpbSgpKTtcclxuICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlc1twYXJ0c1swXV0gPSBwYXJ0c1sxXTtcclxuICAgICAgICByZXR1cm4gZW52aXJvbm1lbnRWYXJpYWJsZXM7XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWcgOiB7XHJcbiAgICAgIGNvbXBpbGVyOiB7XHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIGRlZmF1bHQ6IFwiRVM2IChCYWJlbCA1LjguMzQpXCIsXHJcbiAgICAgICAgICBlbnVtOiBbXCJFUzUgKG5vdGhpbmcpXCIsIFwiRVM2IChCYWJlbCA1LjguMzQpXCIsIFwiQ29mZmVTY3JpcHQgKGNvZmZlZXNjcmlwdCBjb21waWxlciAxLjEwLjApXCJdLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGNvbXBpbGVyIHRvIGJlIHVzZWQgZm9yIHRoZSB0ZXN0IGZpbGVzIGFuZCB0aGUgZmlsZXMgcmVxdWlyZWQgaW4gdGhlIHRlc3RzXCJcclxuICAgICAgfSxcclxuICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXMgOiB7XHJcbiAgICAgICAgICB0eXBlIDogJ3N0cmluZycsXHJcbiAgICAgICAgICBkZWZhdWx0IDogXCJcIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmUgYSBzZXQgb2YgZW52aXJtZW50IHZhcmlhYmxlcyBmb3IgdGhlIG1vY2hhIHByb2Nlc3MuIEVudmlyb21lbnQgdmFyaWFibGVzIHNob3VsZCBiZSBzcGVjaWZpZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6IFZBUklBQkxFMV9OQU1FPVZBUklBQkxFMV9WQUxVRTsgVkFSSUFCTEUyX05BTUU9VkFSSUFCTEUyX1ZBTFVFO1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsd2F5c0V4cGFuZFRyZWUgOiB7XHJcbiAgICAgICAgICB0eXBlIDogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgZGVmYXVsdCA6IGZhbHNlLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBcIlRpY2sgaWYgYWxsIG5vZGVzIGluIHRoZSB0cmVlIHNob3VsZCBleHBhbmQgYWZ0ZXIgYSB0ZXN0IGlzIGV4ZWN1dGVkLiBVbnRpY2sgaWYgdHJlZSBzaG91bGQgb25seSBleHBhbmQgZmFpbGVkIHRlc3RzXCJcclxuICAgICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmNvbXBpbGVyXCIpO1xyXG4gICAgY29uc3QgZW52aXJvbm1lbnRWYXJpYWJsZXMgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmVudmlyb25tZW50VmFyaWFibGVzXCIpO1xyXG4gICAgY29uc3QgZXhwYW5kQW55d2F5ID0gYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1tb2NoYS5hbHdheXNFeHBhbmRUcmVlXCIpO1xyXG5cclxuICAgIHRoaXMucnVudGltZSA9IG5ldyBNb2NoYVJ1bnRpbWUoc3RvcmUsIHtcclxuICAgICAgICBjb21waWxlciA6IGNvbXBpbGVyRnJvbUNvbmZpZyhsYW5ndWFnZSksXHJcbiAgICAgICAgZW52IDogcGFyc2VFbnZpcm9ubWVudFZhcmlhYmxlcyhlbnZpcm9ubWVudFZhcmlhYmxlcyksXHJcbiAgICAgICAgZXhwYW5kQW55d2F5XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYXRvbU1vY2hhVmlldyA9IG5ldyBBdG9tTW9jaGFWaWV3KHN0YXRlLmF0b21Nb2NoYVZpZXdTdGF0ZSwgc3RvcmUsIHRoaXMucnVudGltZSk7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRSaWdodFBhbmVsKHtcclxuICAgICAgaXRlbTogdGhpcy5hdG9tTW9jaGFWaWV3LFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKSxcclxuICAgICAgJ2F0b20tbW9jaGE6cmVydW5UZXN0cycgOiAoKT0+IHRoaXMucnVudGltZS5zdGFydCgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZUZyb21FZGl0b3InIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlUGFuZUl0ZW0gPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpO1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBhY3RpdmVQYW5lSXRlbSA/IGFjdGl2ZVBhbmVJdGVtLmJ1ZmZlciA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBidWZmZXIgPyBidWZmZXIuZmlsZSA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmaWxlID8gZmlsZS5wYXRoIDogbnVsbDtcclxuICAgICAgICAgICAgaWYocGF0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5kaXJlY3Rvcnkgc3Bhbi5pY29uLWZpbGUtZGlyZWN0b3J5Jywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGb2xkZXInIDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGb2xkZXIoZm9sZGVyUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgcmVzdGFydFJ1bnRpbWVXaXRoRm9sZGVyKGZvbGRlclBhdGgpe1xyXG4gICAgICB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICB0aGlzLnJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICByZWFkZGlyKGZvbGRlclBhdGgpLnRoZW4oKGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICBQcm9taXNlLmFsbChmaWxlcy5tYXAoZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKHBhdGguam9pbihmb2xkZXJQYXRoLCBmaWxlKSk7XHJcbiAgICAgICAgICB9KSkudGhlbiggKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKGZpbGUpe1xyXG4gICAgICByZXR1cm4gc3RhdChmaWxlKS50aGVuKCAocmVzdWx0KT0+IHtcclxuICAgICAgICAgIGlmKHJlc3VsdC5pc0RpcmVjdG9yeSgpKXtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJ1bnRpbWUuYWRkRmlsZShmaWxlKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgdGhpcy5ydW50aW1lLmNsZWFyRmlsZXMoKTtcclxuICAgICAgdGhpcy5hZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUoZmlsZVBhdGgpLnRoZW4oKCk9PntcclxuICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmF0b21Nb2NoYVZpZXcuZGVzdHJveSgpO1xyXG4gIH0sXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXRvbU1vY2hhVmlld1N0YXRlOiB0aGlzLmF0b21Nb2NoYVZpZXcuc2VyaWFsaXplKClcclxuICAgIH07XHJcbiAgfSxcclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
