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

function parseEnvirmentVariables(variables) {
    return variables.split(";").reduce(function (enviromentVariables, currentVariable) {
        var parts = currentVariable.split("=").map(function (part) {
            return part.trim();
        });
        enviromentVariables[parts[0]] = parts[1];
        return enviromentVariables;
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
        enviromentVariables: {
            type: 'string',
            "default": "",
            description: "Define a set of envirment variables for the mocha process. Enviroment variables should be specified in the following format: VARIABLE1_NAME=VARIABLE1_VALUE; VARIABLE2_NAME=VARIABLE2_VALUE;"
        }
    },
    activate: function activate(state) {
        var _this = this;

        var that = this;
        var language = atom.config.get("atom-mocha.compiler");
        var enviromentVariables = atom.config.get("atom-mocha.enviromentVariables");
        this.runtime = new _mocha2["default"](store, { compiler: compilerFromConfig(language), env: parseEnvirmentVariables(enviromentVariables) });
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
//# sourceMappingURL=data:application/json;base64,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LEVBQUM7OztBQUM1QixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLFlBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQzdDLG1CQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QixDQUFDLENBQUM7S0FDTjtBQUNELGNBQVUsRUFBQSxzQkFBRztBQUNYLFlBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixlQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDckM7QUFDRCxhQUFTLEVBQUEscUJBQUc7QUFDVixlQUFPO0FBQ0wsOEJBQWtCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7U0FDbkQsQ0FBQztLQUNIO0FBQ0QsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsWUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQy9CLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0IsTUFBTTtBQUNMLG1CQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0I7S0FDRjs7Q0FFRiIsImZpbGUiOiJhdG9tLW1vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tIFwiYXRvbVwiO1xyXG5pbXBvcnQge3Byb21pc2lmeX0gZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IEF0b21Nb2NoYVZpZXcgZnJvbSBcIi4vYXRvbS1tb2NoYS12aWV3XCI7XHJcbmltcG9ydCBNb2NoYVJ1bnRpbWUgZnJvbSBcIi4vbW9jaGFcIjtcclxuaW1wb3J0IHtjcmVhdGVTdG9yZX0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCByZWR1Y2VyIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcbmltcG9ydCB7Z2VuZXJhdGVUZXN0fSBmcm9tIFwiLi9nZW5lcmF0ZVRlc3RcIjtcclxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuXHJcbmNvbnN0IHJlYWRkaXIgPSBwcm9taXNpZnkoZnMucmVhZGRpcik7XHJcbmNvbnN0IHN0YXQgPSBwcm9taXNpZnkoZnMuc3RhdCk7XHJcblxyXG5jb25zdCBmaWxlUmVnZXggPSBcIiouanNcIjtcclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGVyRnJvbUNvbmZpZyhjb25maWcpe1xyXG4gICAgc3dpdGNoKGNvbmZpZyl7XHJcbiAgICAgICAgY2FzZSBcIkVTNSAobm90aGluZylcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgY2FzZSBcIkVTNiAoQmFiZWwgNS44LjM0KVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJiYWJlbC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGNhc2UgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29mZmVlLXNjcmlwdC9yZWdpc3RlclwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUVudmlybWVudFZhcmlhYmxlcyh2YXJpYWJsZXMpe1xyXG4gICAgcmV0dXJuIHZhcmlhYmxlcy5zcGxpdChcIjtcIikucmVkdWNlKChlbnZpcm9tZW50VmFyaWFibGVzLCBjdXJyZW50VmFyaWFibGUpID0+IHtcclxuICAgICAgICB2YXIgcGFydHMgPSBjdXJyZW50VmFyaWFibGUuc3BsaXQoXCI9XCIpLm1hcCggcGFydCA9PiBwYXJ0LnRyaW0oKSk7XHJcbiAgICAgICAgZW52aXJvbWVudFZhcmlhYmxlc1twYXJ0c1swXV0gPSBwYXJ0c1sxXTtcclxuICAgICAgICByZXR1cm4gZW52aXJvbWVudFZhcmlhYmxlcztcclxuICAgIH0sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZyA6IHtcclxuICAgICAgY29tcGlsZXI6IHtcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgZGVmYXVsdDogXCJFUzYgKEJhYmVsIDUuOC4zNClcIixcclxuICAgICAgICAgIGVudW06IFtcIkVTNSAobm90aGluZylcIiwgXCJFUzYgKEJhYmVsIDUuOC4zNClcIiwgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIl0sXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgY29tcGlsZXIgdG8gYmUgdXNlZCBmb3IgdGhlIHRlc3QgZmlsZXMgYW5kIHRoZSBmaWxlcyByZXF1aXJlZCBpbiB0aGUgdGVzdHNcIlxyXG4gICAgICB9LFxyXG4gICAgICBlbnZpcm9tZW50VmFyaWFibGVzIDoge1xyXG4gICAgICAgICAgdHlwZSA6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgZGVmYXVsdCA6IFwiXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lIGEgc2V0IG9mIGVudmlybWVudCB2YXJpYWJsZXMgZm9yIHRoZSBtb2NoYSBwcm9jZXNzLiBFbnZpcm9tZW50IHZhcmlhYmxlcyBzaG91bGQgYmUgc3BlY2lmaWVkIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiBWQVJJQUJMRTFfTkFNRT1WQVJJQUJMRTFfVkFMVUU7IFZBUklBQkxFMl9OQU1FPVZBUklBQkxFMl9WQUxVRTtcIlxyXG4gICAgICB9XHJcbiAgfSxcclxuICBhY3RpdmF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB2YXIgbGFuZ3VhZ2UgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmNvbXBpbGVyXCIpO1xyXG4gICAgdmFyIGVudmlyb21lbnRWYXJpYWJsZXMgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmVudmlyb21lbnRWYXJpYWJsZXNcIik7XHJcbiAgICB0aGlzLnJ1bnRpbWUgPSBuZXcgTW9jaGFSdW50aW1lKHN0b3JlLCB7IGNvbXBpbGVyIDogY29tcGlsZXJGcm9tQ29uZmlnKGxhbmd1YWdlKSwgZW52IDogcGFyc2VFbnZpcm1lbnRWYXJpYWJsZXMoZW52aXJvbWVudFZhcmlhYmxlcyl9KTtcclxuICAgIHRoaXMuYXRvbU1vY2hhVmlldyA9IG5ldyBBdG9tTW9jaGFWaWV3KHN0YXRlLmF0b21Nb2NoYVZpZXdTdGF0ZSwgc3RvcmUsIHRoaXMucnVudGltZSk7XHJcbiAgICB0aGlzLm1vZGFsUGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRSaWdodFBhbmVsKHtcclxuICAgICAgaXRlbTogdGhpcy5hdG9tTW9jaGFWaWV3LFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKSxcclxuICAgICAgJ2F0b20tbW9jaGE6cmVydW5UZXN0cycgOiAoKT0+IHRoaXMucnVudGltZS5zdGFydCgpXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5maWxlIC5uYW1lJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlJzogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCcudHJlZS12aWV3IC5kaXJlY3Rvcnkgc3Bhbi5pY29uLWZpbGUtZGlyZWN0b3J5Jywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGb2xkZXInIDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGF0aFwiKTtcclxuICAgICAgICAgICAgdGhhdC5yZXN0YXJ0UnVudGltZVdpdGhGb2xkZXIoZm9sZGVyUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZUZyb21FZGl0b3InIDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpLmJ1ZmZlci5maWxlLnBhdGg7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICB9LFxyXG4gIHJlc3RhcnRSdW50aW1lV2l0aEZvbGRlcihmb2xkZXJQYXRoKXtcclxuICAgICAgdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgICAgdGhpcy5ydW50aW1lLmNsZWFyRmlsZXMoKTtcclxuICAgICAgcmVhZGRpcihmb2xkZXJQYXRoKS50aGVuKChmaWxlcykgPT4ge1xyXG4gICAgICAgICAgUHJvbWlzZS5hbGwoZmlsZXMubWFwKGZpbGUgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZEZpbGVPckZvbGRlclRvUnVudGltZShwYXRoLmpvaW4oZm9sZGVyUGF0aCwgZmlsZSkpO1xyXG4gICAgICAgICAgfSkpLnRoZW4oICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnJ1bnRpbWUuc3RhcnQoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGFkZEZpbGVPckZvbGRlclRvUnVudGltZShmaWxlKXtcclxuICAgICAgcmV0dXJuIHN0YXQoZmlsZSkudGhlbiggKHJlc3VsdCk9PiB7XHJcbiAgICAgICAgICBpZihyZXN1bHQuaXNEaXJlY3RvcnkoKSl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5ydW50aW1lLmFkZEZpbGUoZmlsZSk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICAgIHRoaXMucnVudGltZS5jbGVhckZpbGVzKCk7XHJcbiAgICAgIHRoaXMuYWRkRmlsZU9yRm9sZGVyVG9SdW50aW1lKGZpbGVQYXRoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICB0aGlzLnJ1bnRpbWUuc3RhcnQoKTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbFBhbmVsLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5hdG9tTW9jaGFWaWV3LmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIHNlcmlhbGl6ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF0b21Nb2NoYVZpZXdTdGF0ZTogdGhpcy5hdG9tTW9jaGFWaWV3LnNlcmlhbGl6ZSgpXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kYWxQYW5lbC5pc1Zpc2libGUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLmhpZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
