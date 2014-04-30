var os = require('os');

MyApp = Ember.Application.extend({
  online: navigator.onLine,
  offline: Em.computed.not('online'),

  platform: {
    isWindows: os.type() === 'Windows_NT',
    isMac: os.type() === 'Darwin',
    isLinux: os.type() === 'Linux'
  }
});

App = MyApp.create();

$(window).on('online offline', function() {
  App.set('online', navigator.onLine);
});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend();

App.IndexController = Ember.Controller.extend({
  enabled: false,
  fileToOpen: '',
  directoryToOpen: '',
  saveAsFile: ''
});

App.IndexView = Ember.View.extend({
  actions: {
    openFile: function() {
      this.$('#open-file').click();
    },
    openDirectory: function() {
      this.$('#open-directory').click();
    },
    saveAs: function() {
      this.$('#save-as').click();
    }
  }
});

App.UiSwitchComponent = Ember.Component.extend({
  classNames: ['ui-switch'],
  classNameBindings: ['enabled:on'],
  enabled: false,

  click: function() {
    this.toggleProperty('enabled');
  }
});

App.UiFileDialogComponent = Ember.Component.extend({
  classNames: ['ui-file-dialog'],
  tagName: 'input',
  attributeBindings: [
    'type', 'accept', 'style',
    'directory:nwdirectory', 'save:nwsaveas'
  ],
  type: 'file',
  style: 'display: none',

  value: '',
  accept: null,
  directory: false,
  save: false,

  open: function() {
    this.$().click();
  },

  change: function() {
    this.set('value', this.$().val());
  }
});
