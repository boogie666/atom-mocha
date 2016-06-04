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
        }
    },
    activate: function activate(state) {
        var _this = this;

        var that = this;
        var language = atom.config.get("atom-mocha.compiler");
        var environmentVariables = atom.config.get("atom-mocha.environmentVariables");
        this.runtime = new _mocha2["default"](store, {
            compiler: compilerFromConfig(language),
            env: parseEnvironmentVariables(environmentVariables)
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
//# sourceMappingURL=data:application/json;base64,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Q0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjtBQUNELDBCQUFzQixFQUFBLGdDQUFDLFFBQVEsRUFBQzs7O0FBQzVCLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxQixZQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDN0MsbUJBQUssT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNOO0FBQ0QsY0FBVSxFQUFBLHNCQUFHO0FBQ1gsWUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQixZQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLGVBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNyQztBQUNELGFBQVMsRUFBQSxxQkFBRztBQUNWLGVBQU87QUFDTCw4QkFBa0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtTQUNuRCxDQUFDO0tBQ0g7QUFDRCxVQUFNLEVBQUEsa0JBQUc7QUFDUCxZQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUU7QUFDL0IsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQixNQUFNO0FBQ0wsbUJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjtLQUNGOztDQUVGIiwiZmlsZSI6ImF0b20tbW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gXCJhdG9tXCI7XHJcbmltcG9ydCB7cHJvbWlzaWZ5fSBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgQXRvbU1vY2hhVmlldyBmcm9tIFwiLi9hdG9tLW1vY2hhLXZpZXdcIjtcclxuaW1wb3J0IE1vY2hhUnVudGltZSBmcm9tIFwiLi9tb2NoYVwiO1xyXG5pbXBvcnQge2NyZWF0ZVN0b3JlfSBmcm9tIFwicmVkdXhcIjtcclxuaW1wb3J0IHJlZHVjZXIgZnJvbSBcIi4vcmVkdWNlcnNcIjtcclxuaW1wb3J0IHtnZW5lcmF0ZVRlc3R9IGZyb20gXCIuL2dlbmVyYXRlVGVzdFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIpO1xyXG5cclxuY29uc3QgcmVhZGRpciA9IHByb21pc2lmeShmcy5yZWFkZGlyKTtcclxuY29uc3Qgc3RhdCA9IHByb21pc2lmeShmcy5zdGF0KTtcclxuXHJcbmNvbnN0IGZpbGVSZWdleCA9IFwiKi5qc1wiO1xyXG5cclxuZnVuY3Rpb24gY29tcGlsZXJGcm9tQ29uZmlnKGNvbmZpZyl7XHJcbiAgICBzd2l0Y2goY29uZmlnKXtcclxuICAgICAgICBjYXNlIFwiRVM1IChub3RoaW5nKVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICBjYXNlIFwiRVM2IChCYWJlbCA1LjguMzQpXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImJhYmVsL3JlZ2lzdGVyXCI7XHJcbiAgICAgICAgY2FzZSBcIkNvZmZlU2NyaXB0IChjb2ZmZWVzY3JpcHQgY29tcGlsZXIgMS4xMC4wKVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjb2ZmZWUtc2NyaXB0L3JlZ2lzdGVyXCI7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRW52aXJvbm1lbnRWYXJpYWJsZXModmFyaWFibGVzKXtcclxuICAgIGlmKCF2YXJpYWJsZXMpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhcmlhYmxlcy5zcGxpdChcIjtcIikucmVkdWNlKChlbnZpcm9ubWVudFZhcmlhYmxlcywgY3VycmVudFZhcmlhYmxlKSA9PiB7XHJcbiAgICAgICAgdmFyIHBhcnRzID0gY3VycmVudFZhcmlhYmxlLnNwbGl0KFwiPVwiKS5tYXAoIHBhcnQgPT4gcGFydC50cmltKCkpO1xyXG4gICAgICAgIGVudmlyb25tZW50VmFyaWFibGVzW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xyXG4gICAgICAgIHJldHVybiBlbnZpcm9ubWVudFZhcmlhYmxlcztcclxuICAgIH0sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZyA6IHtcclxuICAgICAgY29tcGlsZXI6IHtcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgZGVmYXVsdDogXCJFUzYgKEJhYmVsIDUuOC4zNClcIixcclxuICAgICAgICAgIGVudW06IFtcIkVTNSAobm90aGluZylcIiwgXCJFUzYgKEJhYmVsIDUuOC4zNClcIiwgXCJDb2ZmZVNjcmlwdCAoY29mZmVlc2NyaXB0IGNvbXBpbGVyIDEuMTAuMClcIl0sXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lcyB0aGUgY29tcGlsZXIgdG8gYmUgdXNlZCBmb3IgdGhlIHRlc3QgZmlsZXMgYW5kIHRoZSBmaWxlcyByZXF1aXJlZCBpbiB0aGUgdGVzdHNcIlxyXG4gICAgICB9LFxyXG4gICAgICBlbnZpcm9ubWVudFZhcmlhYmxlcyA6IHtcclxuICAgICAgICAgIHR5cGUgOiAnc3RyaW5nJyxcclxuICAgICAgICAgIGRlZmF1bHQgOiBcIlwiLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb24gOiBcIkRlZmluZSBhIHNldCBvZiBlbnZpcm1lbnQgdmFyaWFibGVzIGZvciB0aGUgbW9jaGEgcHJvY2Vzcy4gRW52aXJvbWVudCB2YXJpYWJsZXMgc2hvdWxkIGJlIHNwZWNpZmllZCBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogVkFSSUFCTEUxX05BTUU9VkFSSUFCTEUxX1ZBTFVFOyBWQVJJQUJMRTJfTkFNRT1WQVJJQUJMRTJfVkFMVUU7XCJcclxuICAgICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGUoc3RhdGUpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmNvbXBpbGVyXCIpO1xyXG4gICAgY29uc3QgZW52aXJvbm1lbnRWYXJpYWJsZXMgPSBhdG9tLmNvbmZpZy5nZXQoXCJhdG9tLW1vY2hhLmVudmlyb25tZW50VmFyaWFibGVzXCIpO1xyXG4gICAgdGhpcy5ydW50aW1lID0gbmV3IE1vY2hhUnVudGltZShzdG9yZSwge1xyXG4gICAgICAgIGNvbXBpbGVyIDogY29tcGlsZXJGcm9tQ29uZmlnKGxhbmd1YWdlKSxcclxuICAgICAgICBlbnYgOiBwYXJzZUVudmlyb25tZW50VmFyaWFibGVzKGVudmlyb25tZW50VmFyaWFibGVzKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmF0b21Nb2NoYVZpZXcgPSBuZXcgQXRvbU1vY2hhVmlldyhzdGF0ZS5hdG9tTW9jaGFWaWV3U3RhdGUsIHN0b3JlLCB0aGlzLnJ1bnRpbWUpO1xyXG4gICAgdGhpcy5tb2RhbFBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkUmlnaHRQYW5lbCh7XHJcbiAgICAgIGl0ZW06IHRoaXMuYXRvbU1vY2hhVmlldyxcclxuICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xyXG4gICAgICAnYXRvbS1tb2NoYTp0b2dnbGUnOiAoKT0+IHRoaXMudG9nZ2xlKCksXHJcbiAgICAgICdhdG9tLW1vY2hhOnJlcnVuVGVzdHMnIDogKCk9PiB0aGlzLnJ1bnRpbWUuc3RhcnQoKVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLnRyZWUtdmlldyAuZmlsZSAubmFtZScsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZSc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIik7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLnRyZWUtdmlldyAuZmlsZSAubmFtZScsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZSc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIik7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShmaWxlUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLnRyZWUtdmlldyAuZGlyZWN0b3J5IHNwYW4uaWNvbi1maWxlLWRpcmVjdG9yeScsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0Rm9sZGVyJyA6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBjb25zdCBmb2xkZXJQYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIik7XHJcbiAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRm9sZGVyKGZvbGRlclBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGVGcm9tRWRpdG9yJyA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKS5idWZmZXIuZmlsZS5wYXRoO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGb2xkZXIoZm9sZGVyUGF0aCl7XHJcbiAgICAgIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICAgIHRoaXMucnVudGltZS5jbGVhckZpbGVzKCk7XHJcbiAgICAgIHJlYWRkaXIoZm9sZGVyUGF0aCkudGhlbigoZmlsZXMpID0+IHtcclxuICAgICAgICAgIFByb21pc2UuYWxsKGZpbGVzLm1hcChmaWxlID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUocGF0aC5qb2luKGZvbGRlclBhdGgsIGZpbGUpKTtcclxuICAgICAgICAgIH0pKS50aGVuKCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ydW50aW1lLnN0YXJ0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBhZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUoZmlsZSl7XHJcbiAgICAgIHJldHVybiBzdGF0KGZpbGUpLnRoZW4oIChyZXN1bHQpPT4ge1xyXG4gICAgICAgICAgaWYocmVzdWx0LmlzRGlyZWN0b3J5KCkpe1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucnVudGltZS5hZGRGaWxlKGZpbGUpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIHJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpe1xyXG4gICAgICB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICB0aGlzLnJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICB0aGlzLmFkZEZpbGVPckZvbGRlclRvUnVudGltZShmaWxlUGF0aCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgdGhpcy5ydW50aW1lLnN0YXJ0KCk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxQYW5lbC5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXRvbU1vY2hhVmlldy5kZXN0cm95KCk7XHJcbiAgfSxcclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdG9tTW9jaGFWaWV3U3RhdGU6IHRoaXMuYXRvbU1vY2hhVmlldy5zZXJpYWxpemUoKVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGFsUGFuZWwuaXNWaXNpYmxlKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
