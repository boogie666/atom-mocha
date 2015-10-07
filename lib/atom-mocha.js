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
    this.subscriptions.add(atom.commands.add('.tree-view .file .name', {
      'atom-mocha:runTestFile': function atomMochaRunTestFile(e) {
        that.modalPanel.show();
        var filePath = this.getAttribute("data-path");
        runtime.clearFiles();
        runtime.addFile(filePath);
        runtime.start();
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
  }

};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWtDLE1BQU07OzZCQUNkLG1CQUFtQjs7Ozt1QkFDekIsV0FBVzs7OztxQkFDTCxPQUFPOzt3QkFDYixZQUFZOzs7O0FBRWhDLElBQU0sS0FBSyxHQUFHLDhDQUFvQixDQUFDO0FBQ25DLElBQU0sT0FBTyxHQUFHLHlCQUFZLEtBQUssQ0FBQyxDQUFDOztxQkFFcEI7QUFDYixlQUFhLEVBQUUsSUFBSTtBQUNuQixZQUFVLEVBQUUsSUFBSTtBQUNoQixlQUFhLEVBQUUsSUFBSTtBQUNuQixVQUFRLEVBQUEsa0JBQUMsS0FBSyxFQUFFOzs7QUFDZCxRQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsUUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBa0IsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hFLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7QUFDN0MsVUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO0FBQ3JDLGFBQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQztBQUMvQyxRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN6RCx5QkFBbUIsRUFBRTtlQUFLLE1BQUssTUFBTSxFQUFFO09BQUE7S0FDeEMsQ0FBQyxDQUFDLENBQUM7QUFDSixRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTtBQUMvRCw4QkFBd0IsRUFBRSw4QkFBUyxDQUFDLEVBQUM7QUFDakMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QixZQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELGVBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNyQixlQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLGVBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztPQUNuQjtLQUNKLENBQUMsQ0FBQyxDQUFDO0dBRUw7QUFDRCxZQUFVLEVBQUEsc0JBQUc7QUFDWCxRQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFCLFFBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsV0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ3JDO0FBQ0QsV0FBUyxFQUFBLHFCQUFHO0FBQ1YsV0FBTztBQUNMLHdCQUFrQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO0tBQ25ELENBQUM7R0FDSDtBQUNELFFBQU0sRUFBQSxrQkFBRztBQUNQLFFBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUMvQixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDL0IsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUMvQjtHQUNGOztDQUVGIiwiZmlsZSI6ImF0b20tbW9jaGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gXCJhdG9tXCI7XHJcbmltcG9ydCBBdG9tTW9jaGFWaWV3IGZyb20gXCIuL2F0b20tbW9jaGEtdmlld1wiO1xyXG5pbXBvcnQgUnVudGltZSBmcm9tIFwiLi9ydW50aW1lXCI7XHJcbmltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJyZWR1eFwiO1xyXG5pbXBvcnQgcmVkdWNlciBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyKTtcclxuY29uc3QgcnVudGltZSA9IG5ldyBSdW50aW1lKHN0b3JlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBhdG9tTW9jaGFWaWV3OiBudWxsLFxyXG4gIG1vZGFsUGFuZWw6IG51bGwsXHJcbiAgc3Vic2NyaXB0aW9uczogbnVsbCxcclxuICBhY3RpdmF0ZShzdGF0ZSkge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGlzLmF0b21Nb2NoYVZpZXcgPSBuZXcgQXRvbU1vY2hhVmlldyhzdGF0ZS5hdG9tTW9jaGFWaWV3U3RhdGUsIHN0b3JlKTtcclxuICAgIHRoaXMubW9kYWxQYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZFJpZ2h0UGFuZWwoe1xyXG4gICAgICBpdGVtOiB0aGlzLmF0b21Nb2NoYVZpZXcuZ2V0RWxlbWVudCgpLFxyXG4gICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XHJcbiAgICAgICdhdG9tLW1vY2hhOnRvZ2dsZSc6ICgpPT4gdGhpcy50b2dnbGUoKVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLnRyZWUtdmlldyAuZmlsZSAubmFtZScsIHtcclxuICAgICAgICAnYXRvbS1tb2NoYTpydW5UZXN0RmlsZSc6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICB0aGF0Lm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpO1xyXG4gICAgICAgICAgICBydW50aW1lLmNsZWFyRmlsZXMoKTtcclxuICAgICAgICAgICAgcnVudGltZS5hZGRGaWxlKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgcnVudGltZS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKTtcclxuXHJcbiAgfSxcclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbFBhbmVsLmRlc3Ryb3koKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5hdG9tTW9jaGFWaWV3LmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIHNlcmlhbGl6ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF0b21Nb2NoYVZpZXdTdGF0ZTogdGhpcy5hdG9tTW9jaGFWaWV3LnNlcmlhbGl6ZSgpXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kYWxQYW5lbC5pc1Zpc2libGUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbFBhbmVsLmhpZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsUGFuZWwuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
