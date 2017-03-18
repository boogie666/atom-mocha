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
        this.subscriptions.add(atom.config.observe("atom-mocha", function (value) {
            try {
                _this.runtime.compiler = compilerFromConfig(value.compiler);
                _this.runtime.env = parseEnvironmentVariables(value.environmentVariables);
                _this.runtime.expandAnyway = value.alwaysExpandTree;
            } catch (e) {}
        }));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEVBQUUsQ0FBQztBQUMxQixZQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLGVBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNyQztBQUNELGFBQVMsRUFBQSxxQkFBRztBQUNWLGVBQU87QUFDTCw4QkFBa0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtTQUNuRCxDQUFDO0tBQ0g7QUFDRCxVQUFNLEVBQUEsa0JBQUc7QUFDUCxZQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUU7QUFDL0IsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQixNQUFNO0FBQ0wsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjtLQUNGOztDQUVGIiwiZmlsZSI6ImF0b20tbW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gXCJhdG9tXCI7XHJcbmltcG9ydCB7cHJvbWlzaWZ5fSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgQXRvbU1vY2hhVmlldyBmcm9tIFwiLi9hdG9tLW1vY2hhLXZpZXdcIjtcclxuaW1wb3J0IE1vY2hhUnVudGltZSBmcm9tIFwiLi9tb2NoYVwiO1xyXG5pbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tIFwicmVkdXhcIjtcclxuaW1wb3J0IHJlZHVjZXIgZnJvbSBcIi4vcmVkdWNlcnNcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuXHJcbmNvbnN0IHJlYWRkaXIgPSBwcm9taXNpZnkoZnMucmVhZGRpcik7XHJcbmNvbnN0IHN0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XHJcblxyXG5jb25zdCBmaWxlUmVnZXggPSBcIiouanNcIjtcclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGVyRnJvbUNvbmZpZyhjb25maWcpe1xyXG4gICAgc3dpdGNoKGNvbmZpZyl7XHJcbiAgICAgICAgY2FzZSBcIkVTNSAobm90aGluZylcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgY2FzZSBcIkVTNiAoQmFiZWwgNS44LjM0KVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJiYWJlbC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGNhc2UgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29mZmVlLXNjcmlwdC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUVudmlyb25tZW50VmFyaWFibGVzKHZhcmlhYmxlcyl7XHJcbiAgICBpZighdmFyaWFibGVzKXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXMuc3BsaXQoXCI7XCIpLnJlZHVjZSgoZW52aXJvbm1lbnRWYXJpYWJsZXMsIGN1cnJlbnRWYXJpYWJsZSkgPT4ge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGN1cnJlbnRWYXJpYWJsZS5zcGxpdChcIj1cIikubWFwKCBwYXJ0ID0+IHBhcnQudHJpbSgpKTtcclxuICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlc1twYXJ0c1swXV0gPSBwYXJ0c1sxXTtcclxuICAgICAgICByZXR1cm4gZW52aXJvbm1lbnRWYXJpYWJsZXM7XHJcbiAgICB9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWcgOiB7XHJcbiAgICAgIGNvbXBpbGVyOiB7XHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIGRlZmF1bHQ6IFwiRVM2IChCYWJlbCA1LjguMzQpXCIsXHJcbiAgICAgICAgICBlbnVtOiBbXCJFUzUgKG5vdGhpbmcpXCIsIFwiRVM2IChCYWJlbCA1LjguMzQpXCIsIFwiQ29mZmVTY3JpcHQgKGNvZmZlZXNjcmlwdCBjb21waWxlciAxLjEwLjApXCJdLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZXMgdGhlIGNvbXBpbGVyIHRvIGJlIHVzZWQgZm9yIHRoZSB0ZXN0IGZpbGVzIGFuZCB0aGUgZmlsZXMgcmVxdWlyZWQgaW4gdGhlIHRlc3RzXCJcclxuICAgICAgfSxcclxuICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXMgOiB7XHJcbiAgICAgICAgICB0eXBlIDogJ3N0cmluZycsXHJcbiAgICAgICAgICBkZWZhdWx0IDogXCJcIixcclxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmUgYSBzZXQgb2YgZW52aXJtZW50IHZhcmlhYmxlcyBmb3IgdGhlIG1vY2hhIHByb2Nlc3MuIEVudmlyb21lbnQgdmFyaWFibGVzIHNob3VsZCBiZSBzcGVjaWZpZWQgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6IFZBUklBQkxFMV9OQU1FPVZBUklBQkxFMV9WQUxVRTsgVkFSSUFCTEUyX05BTUU9VkFSSUFCTEUyX1ZBTFVFO1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsd2F5c0V4cGFuZFRyZWUgOiB7XHJcbiAgICAgICAgICB0eXBlIDogJ2Jvb2xlYW4nLFxyXG4gICAgICAgICAgZGVmYXVsdCA6IGZhbHNlLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBcIlRpY2sgaWYgYWxsIG5vZGVzIGluIHRoZSB0cmVlIHNob3VsZCBleHBhbmQgYWZ0ZXIgYSB0ZXN0IGlzIGV4ZWN1dGVkLiBVbnRpY2sgaWYgdHJlZSBzaG91bGQgb25seSBleHBhbmQgZmFpbGVkIHRlc3RzXCJcclxuICAgICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmNvbXBpbGVyXCIpO1xyXG4gICAgY29uc3QgZW52aXJvbm1lbnRWYXJpYWJsZXMgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmVudmlyb25tZW50VmFyaWFibGVzXCIpO1xyXG4gICAgY29uc3QgZXhwYW5kQW55d2F5ID0gYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1tb2NoYS5hbHdheXNFeHBhbmRUcmVlXCIpO1xyXG5cclxuICAgIHRoaXMucnVudGltZSA9IG5ldyBNb2NoYVJ1bnRpbWUoc3RvcmUsIHtcclxuICAgICAgICBjb21waWxlciA6IGNvbXBpbGVyRnJvbUNvbmZpZyhsYW5ndWFnZSksXHJcbiAgICAgICAgZW52IDogcGFyc2VFbnZpcm9ubWVudFZhcmlhYmxlcyhlbnZpcm9ubWVudFZhcmlhYmxlcyksXHJcbiAgICAgICAgZXhwYW5kQW55d2F5XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYXRvbU1vY2hhVmlldyA9IG5ldyBBdG9tTW9jaGFWaWV3KHN0YXRlLmF0b21Nb2NoYVZpZXdTdGF0ZSwgc3RvcmUsIHRoaXMucnVudGltZSk7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRSaWdodFBhbmVsKHtcclxuICAgICAgaXRlbTogdGhpcy5hdG9tTW9jaGFWaWV3LFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKFwiYXRvbS1tb2NoYVwiLCAodmFsdWUpID0+IHtcclxuICAgICAgdHJ5e1xyXG4gICAgICAgIHRoaXMucnVudGltZS5jb21waWxlciA9IGNvbXBpbGVyRnJvbUNvbmZpZyh2YWx1ZS5jb21waWxlcik7XHJcbiAgICAgICAgdGhpcy5ydW50aW1lLmVudiA9IHBhcnNlRW52aXJvbm1lbnRWYXJpYWJsZXModmFsdWUuZW52aXJvbm1lbnRWYXJpYWJsZXMpO1xyXG4gICAgICAgIHRoaXMucnVudGltZS5leHBhbmRBbnl3YXkgPSB2YWx1ZS5hbHdheXNFeHBhbmRUcmVlO1xyXG4gICAgICB9Y2F0Y2goZSl7fVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKSxcclxuICAgICAgJ2F0b20tbW9jaGE6cmVydW5UZXN0cycgOiAoKT0+IHRoaXMucnVudGltZS5zdGFydCgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZUZyb21FZGl0b3InIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgYWN0aXZlUGFuZUl0ZW0gPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpO1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBhY3RpdmVQYW5lSXRlbSA/IGFjdGl2ZVBhbmVJdGVtLmJ1ZmZlciA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBidWZmZXIgPyBidWZmZXIuZmlsZSA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmaWxlID8gZmlsZS5wYXRoIDogbnVsbDtcclxuICAgICAgICAgICAgaWYocGF0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5kaXJlY3Rvcnkgc3Bhbi5pY29uLWZpbGUtZGlyZWN0b3J5Jywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGb2xkZXInIDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGb2xkZXIoZm9sZGVyUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgcmVzdGFydFJ1bnRpbWVXaXRoRm9sZGVyKGZvbGRlclBhdGgpe1xyXG4gICAgICB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICB0aGlzLnJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICByZWFkZGlyKGZvbGRlclBhdGgpLnRoZW4oKGZpbGVzKSA9PiB7XHJcbiAgICAgICAgICBQcm9taXNlLmFsbChmaWxlcy5tYXAoZmlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKHBhdGguam9pbihmb2xkZXJQYXRoLCBmaWxlKSk7XHJcbiAgICAgICAgICB9KSkudGhlbiggKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKGZpbGUpe1xyXG4gICAgICByZXR1cm4gc3RhdChmaWxlKS50aGVuKCAocmVzdWx0KT0+IHtcclxuICAgICAgICAgIGlmKHJlc3VsdC5pc0RpcmVjdG9yeSgpKXtcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJ1bnRpbWUuYWRkRmlsZShmaWxlKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgdGhpcy5ydW50aW1lLmNsZWFyRmlsZXMoKTtcclxuICAgICAgdGhpcy5hZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUoZmlsZVBhdGgpLnRoZW4oKCk9PntcclxuICAgICAgICAgIHRoaXMucnVudGltZS5zdGFydCgpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGRlYWN0aXZhdGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmF0b21Nb2NoYVZpZXcuZGVzdHJveSgpO1xyXG4gIH0sXHJcbiAgc2VyaWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXRvbU1vY2hhVmlld1N0YXRlOiB0aGlzLmF0b21Nb2NoYVZpZXcuc2VyaWFsaXplKClcclxuICAgIH07XHJcbiAgfSxcclxuICB0b2dnbGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbFBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuIl19
