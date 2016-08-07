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
                var buffer = atom.workspace.getActivePaneItem().buffer;
                var file = buffer ? buffer.file : null;
                var path = file ? file.path : null;
                if (path) {
                    that.restartRuntimeWithFile(path);
                }
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
//# sourceMappingURL=data:application/json;base64,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VUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CLE1BQU07QUFDTCxtQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO0tBQ0Y7O0NBRUYiLCJmaWxlIjoiYXRvbS1tb2NoYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSBcImF0b21cIjtcclxuaW1wb3J0IHtwcm9taXNpZnl9IGZyb20gXCIuL3V0aWxzXCI7XHJcbmltcG9ydCBBdG9tTW9jaGFWaWV3IGZyb20gXCIuL2F0b20tbW9jaGEtdmlld1wiO1xyXG5pbXBvcnQgTW9jaGFSdW50aW1lIGZyb20gXCIuL21vY2hhXCI7XHJcbmltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJyZWR1eFwiO1xyXG5pbXBvcnQgcmVkdWNlciBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xyXG5pbXBvcnQge2dlbmVyYXRlVGVzdH0gZnJvbSBcIi4vZ2VuZXJhdGVUZXN0XCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcik7XHJcblxyXG5jb25zdCByZWFkZGlyID0gcHJvbWlzaWZ5KGZzLnJlYWRkaXIpO1xyXG5jb25zdCBzdGF0ID0gcHJvbWlzaWZ5KGZzLnN0YXQpO1xyXG5cclxuY29uc3QgZmlsZVJlZ2V4ID0gXCIqLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBjb21waWxlckZyb21Db25maWcoY29uZmlnKXtcclxuICAgIHN3aXRjaChjb25maWcpe1xyXG4gICAgICAgIGNhc2UgXCJFUzUgKG5vdGhpbmcpXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIGNhc2UgXCJFUzYgKEJhYmVsIDUuOC4zNClcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwiYmFiZWwvcmVnaXN0ZXJcIjtcclxuICAgICAgICBjYXNlIFwiQ29mZmVTY3JpcHQgKGNvZmZlZXNjcmlwdCBjb21waWxlciAxLjEwLjApXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvZmZlZS1zY3JpcHQvcmVnaXN0ZXJcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VFbnZpcm9ubWVudFZhcmlhYmxlcyh2YXJpYWJsZXMpe1xyXG4gICAgaWYoIXZhcmlhYmxlcyl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFyaWFibGVzLnNwbGl0KFwiO1wiKS5yZWR1Y2UoKGVudmlyb25tZW50VmFyaWFibGVzLCBjdXJyZW50VmFyaWFibGUpID0+IHtcclxuICAgICAgICB2YXIgcGFydHMgPSBjdXJyZW50VmFyaWFibGUuc3BsaXQoXCI9XCIpLm1hcCggcGFydCA9PiBwYXJ0LnRyaW0oKSk7XHJcbiAgICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXNbcGFydHNbMF1dID0gcGFydHNbMV07XHJcbiAgICAgICAgcmV0dXJuIGVudmlyb25tZW50VmFyaWFibGVzO1xyXG4gICAgfSwge30pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnIDoge1xyXG4gICAgICBjb21waWxlcjoge1xyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICBkZWZhdWx0OiBcIkVTNiAoQmFiZWwgNS44LjM0KVwiLFxyXG4gICAgICAgICAgZW51bTogW1wiRVM1IChub3RoaW5nKVwiLCBcIkVTNiAoQmFiZWwgNS44LjM0KVwiLCBcIkNvZmZlU2NyaXB0IChjb2ZmZWVzY3JpcHQgY29tcGlsZXIgMS4xMC4wKVwiXSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJEZWZpbmVzIHRoZSBjb21waWxlciB0byBiZSB1c2VkIGZvciB0aGUgdGVzdCBmaWxlcyBhbmQgdGhlIGZpbGVzIHJlcXVpcmVkIGluIHRoZSB0ZXN0c1wiXHJcbiAgICAgIH0sXHJcbiAgICAgIGVudmlyb25tZW50VmFyaWFibGVzIDoge1xyXG4gICAgICAgICAgdHlwZSA6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgZGVmYXVsdCA6IFwiXCIsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbiA6IFwiRGVmaW5lIGEgc2V0IG9mIGVudmlybWVudCB2YXJpYWJsZXMgZm9yIHRoZSBtb2NoYSBwcm9jZXNzLiBFbnZpcm9tZW50IHZhcmlhYmxlcyBzaG91bGQgYmUgc3BlY2lmaWVkIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiBWQVJJQUJMRTFfTkFNRT1WQVJJQUJMRTFfVkFMVUU7IFZBUklBQkxFMl9OQU1FPVZBUklBQkxFMl9WQUxVRTtcIlxyXG4gICAgICB9LFxyXG4gICAgICBhbHdheXNFeHBhbmRUcmVlIDoge1xyXG4gICAgICAgICAgdHlwZSA6ICdib29sZWFuJyxcclxuICAgICAgICAgIGRlZmF1bHQgOiBmYWxzZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uIDogXCJUaWNrIGlmIGFsbCBub2RlcyBpbiB0aGUgdHJlZSBzaG91bGQgZXhwYW5kIGFmdGVyIGEgdGVzdCBpcyBleGVjdXRlZC4gVW50aWNrIGlmIHRyZWUgc2hvdWxkIG9ubHkgZXhwYW5kIGZhaWxlZCB0ZXN0c1wiXHJcbiAgICAgIH1cclxuICB9LFxyXG4gIGFjdGl2YXRlKHN0YXRlKSB7XHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIGNvbnN0IGxhbmd1YWdlID0gYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1tb2NoYS5jb21waWxlclwiKTtcclxuICAgIGNvbnN0IGVudmlyb25tZW50VmFyaWFibGVzID0gYXRvbS5jb25maWcuZ2V0KFwiYXRvbS1tb2NoYS5lbnZpcm9ubWVudFZhcmlhYmxlc1wiKTtcclxuICAgIGNvbnN0IGV4cGFuZEFueXdheSA9IGF0b20uY29uZmlnLmdldChcImF0b20tbW9jaGEuYWx3YXlzRXhwYW5kVHJlZVwiKTtcclxuICAgIFxyXG4gICAgdGhpcy5ydW50aW1lID0gbmV3IE1vY2hhUnVudGltZShzdG9yZSwge1xyXG4gICAgICAgIGNvbXBpbGVyIDogY29tcGlsZXJGcm9tQ29uZmlnKGxhbmd1YWdlKSxcclxuICAgICAgICBlbnYgOiBwYXJzZUVudmlyb25tZW50VmFyaWFibGVzKGVudmlyb25tZW50VmFyaWFibGVzKSxcclxuICAgICAgICBleHBhbmRBbnl3YXlcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hdG9tTW9jaGFWaWV3ID0gbmV3IEF0b21Nb2NoYVZpZXcoc3RhdGUuYXRvbU1vY2hhVmlld1N0YXRlLCBzdG9yZSwgdGhpcy5ydW50aW1lKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcclxuICAgICAgJ2F0b20tbW9jaGE6dG9nZ2xlJzogKCk9PiB0aGlzLnRvZ2dsZSgpLFxyXG4gICAgICAnYXRvbS1tb2NoYTpyZXJ1blRlc3RzJyA6ICgpPT4gdGhpcy5ydW50aW1lLnN0YXJ0KClcclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmZpbGUgLm5hbWUnLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGUnOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmZpbGUgLm5hbWUnLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZpbGUnOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb21tYW5kcy5hZGQoJy50cmVlLXZpZXcgLmRpcmVjdG9yeSBzcGFuLmljb24tZmlsZS1kaXJlY3RvcnknLCB7XHJcbiAgICAgICAgJ2F0b20tbW9jaGE6cnVuVGVzdEZvbGRlcicgOiBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgY29uc3QgZm9sZGVyUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnJlc3RhcnRSdW50aW1lV2l0aEZvbGRlcihmb2xkZXJQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xyXG4gICAgICAgICdhdG9tLW1vY2hhOnJ1blRlc3RGaWxlRnJvbUVkaXRvcicgOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpLmJ1ZmZlcjtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGJ1ZmZlciA/IGJ1ZmZlci5maWxlIDogbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGZpbGUgPyBmaWxlLnBhdGggOiBudWxsO1xyXG4gICAgICAgICAgICBpZihwYXRoKXtcclxuICAgICAgICAgICAgICAgIHRoYXQucmVzdGFydFJ1bnRpbWVXaXRoRmlsZShwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgfSxcclxuICByZXN0YXJ0UnVudGltZVdpdGhGb2xkZXIoZm9sZGVyUGF0aCl7XHJcbiAgICAgIHRoaXMubW9kYWxQYW5lbC5zaG93KCk7XHJcbiAgICAgIHRoaXMucnVudGltZS5jbGVhckZpbGVzKCk7XHJcbiAgICAgIHJlYWRkaXIoZm9sZGVyUGF0aCkudGhlbigoZmlsZXMpID0+IHtcclxuICAgICAgICAgIFByb21pc2UuYWxsKGZpbGVzLm1hcChmaWxlID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUocGF0aC5qb2luKGZvbGRlclBhdGgsIGZpbGUpKTtcclxuICAgICAgICAgIH0pKS50aGVuKCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ydW50aW1lLnN0YXJ0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBhZGRGaWxlT3JGb2xkZXJUb1J1bnRpbWUoZmlsZSl7XHJcbiAgICAgIHJldHVybiBzdGF0KGZpbGUpLnRoZW4oIChyZXN1bHQpPT4ge1xyXG4gICAgICAgICAgaWYocmVzdWx0LmlzRGlyZWN0b3J5KCkpe1xyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucnVudGltZS5hZGRGaWxlKGZpbGUpO1xyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIHJlc3RhcnRSdW50aW1lV2l0aEZpbGUoZmlsZVBhdGgpe1xyXG4gICAgICB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICB0aGlzLnJ1bnRpbWUuY2xlYXJGaWxlcygpO1xyXG4gICAgICB0aGlzLmFkZEZpbGVPckZvbGRlclRvUnVudGltZShmaWxlUGF0aCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgdGhpcy5ydW50aW1lLnN0YXJ0KCk7XHJcbiAgICAgIH0pO1xyXG4gIH0sXHJcbiAgZGVhY3RpdmF0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxQYW5lbC5kZXN0cm95KCk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXRvbU1vY2hhVmlldy5kZXN0cm95KCk7XHJcbiAgfSxcclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdG9tTW9jaGFWaWV3U3RhdGU6IHRoaXMuYXRvbU1vY2hhVmlldy5zZXJpYWxpemUoKVxyXG4gICAgfTtcclxuICB9LFxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGFsUGFuZWwuaXNWaXNpYmxlKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWxQYW5lbC5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
