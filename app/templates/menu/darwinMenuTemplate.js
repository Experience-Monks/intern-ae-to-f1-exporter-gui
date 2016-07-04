module.exports = function(mainWindow, app, params) {
	return [{
      label: 'AE To F1 Exporter',
      submenu: [{
        label: 'Hide AE To F1 Exporter',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }]
    }, { 
      label: 'Need help?',
      accelerator: 'Command+H',
      submenu: [
      {
        label: 'Tutorial',
        click: params.tutorial
      },
      {
        label: 'Instructions',
        click: params.instructions
      },
      {
        label: 'Features and Rules',
        click: params.features
      }]
    }];
};
