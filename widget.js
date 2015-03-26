var _waktest_widget;

function _waktest_widget_moduleIsAvailable(callback) {
	if (typeof designer === 'object' && typeof studio === 'object') {
		try {
			var serverAddress = studio.getRemoteServerInfo().split(':');
			var serverPort = /\sport="(\d+)"/i.exec(studio.File(studio.editor.getProjectPath() + 'Settings.waSettings').toString())[1];
			var moduleURL = serverAddress[0] + ':' + serverAddress[1] + ':' + serverPort + '/waktest-available';
		} catch (e) {
			var moduleURL = 'http://127.0.0.1:8081/waktest-available';
		}
	} else {
		var moduleURL = '/waktest-available';
	}
    var http = new XMLHttpRequest();
    http.open('HEAD', moduleURL);
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(this.status != 404);
        }
    };
    http.send();
}

function _waktest_widget_run() {
	$('#waktest-waf-run', _waktest_widget.node).prop('disabled', true);
	$('#waktest-waf-log', _waktest_widget.node).animate({
		width: 600,
		height: 400,
		opacity: 1
	}, 250, function() {
		_waktestRun();
	});
}

WAF.define('waktest-widget', ['waf-core/widget'], function(widget) {
	var Waktest = widget.create('waktest-widget', {
		init: function() {
			this.node.innerHTML += '<div id="waktest-waf" class="waf-studio-donotsave waf-ui-box waf-ui-header"><div id="waktest-waf-toolbar"><img src="/widgets-custom/waktest-widget/icons/unitTestSmall.png"><span id="waktest-waf-file" class="ui-menu-item"></span><input id="waktest-waf-run" class="waf-ui-button" type="image" src="/widgets-custom/waktest-widget/icons/run.png" alt="Run" title="Run" onclick="_waktest_widget_run()"></div><div id="waktest-waf-log" class="waf-ui-box"></div></div>';
		},
		runner: widget.property({
			type: "enum",
			"values": {
				mocha: "Mocha"
			},
			bindable: false,
			description: 'Runner library'
		}),
		assertion: widget.property({
			type: "enum",
			"values": {
				chai: "Chai"
			},
			bindable: false,
			description: 'Assertion library'
		}),
		assertionStyle: widget.property({
			type: "enum",
			"values": {
				bdd: "BDD",
				tdd: "TDD"
			},
			bindable: false,
			description: 'Assertion style'
		}),
		file: widget.property({
			type: 'string',
			description: 'Path to the test file or folder to run'
		}),
		automatic: widget.property({
			type: 'boolean',
			defaultValue: false,
			bindable: false,
			description: 'Run automatically'
		}),
		runInStudio: widget.property({
			type: 'boolean',
			defaultValue: false,
			bindable: false,
			description: 'Run in Studio'
		})
	});
	Waktest.doAfter("init", function() {
		var _this = _waktest_widget = this;
		var automatic = _this.automatic();
		/*if ($(this.node).css('display') === 'none') {
			// hidden ???
		}*/
		var testFilePath = null;
		if (_this.file()) {
			testFilePath = _this.file().replace(/^\/?\.\//, '');
		}
		if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && typeof designer !== 'object' && typeof studio !== 'object') {
			$('#waktest-waf', _this.node).draggable();
			var match,
				pl = /\+/g,
				search = /([^&=]+)=?([^&]*)/g,
				decode = function(s) {
					return decodeURIComponent(s.replace(pl, " "));
				},
				query = window.location.search.substring(1),
				urlParams = {};
			while (match = search.exec(query)) urlParams[decode(match[1])] = decode(match[2]);
			if (typeof urlParams['waktest-path'] !== 'undefined') {
				testFilePath = urlParams['waktest-path'].replace(/^\/?\.\//, '');
				automatic = true;
			}
		}
		_waktest_widget_moduleIsAvailable(function (moduleAvailable) {
			window._waktest_waf_ready = function() {
				if (automatic === true && (typeof designer === 'undefined' || (typeof designer === 'object' && _this.runInStudio() === true)) && typeof _waktestRun === 'function') {
					_waktest_widget_run();
				}
			};
			if (moduleAvailable === true && testFilePath !== null) {
				var testLink = testFilePath;
				var libraryURL = '/waktest-waf-lib?runner=' + _this.runner() + '&assertion=' + _this.assertion() + '&assertionStyle=' + _this.assertionStyle() + '&path=' + testFilePath + '&widgetId=' + _this.id;
				if (typeof urlParams !== 'undefined' && typeof urlParams['waktest-format'] !== 'undefined') {
					libraryURL += '&format=' + urlParams['waktest-format'];
				}
				var cssURL = '/waktest-waf-css?runner=' + _this.runner() + '&widgetId=' + _this.id;
				if (typeof designer === 'object' && typeof studio === 'object') {
					try {
						var serverAddress = studio.getRemoteServerInfo().split(':');
						var serverPort = /\sport="(\d+)"/i.exec(studio.File(studio.editor.getProjectPath() + 'Settings.waSettings').toString())[1];
						libraryURL = serverAddress[0] + ':' + serverAddress[1] + ':' + serverPort + libraryURL;
						cssURL = serverAddress[0] + ':' + serverAddress[1] + ':' + serverPort + cssURL;
					} catch (e) {
						libraryURL = 'http://127.0.0.1:8081' + libraryURL;
						cssURL = 'http://127.0.0.1:8081' + cssURL;
					}
				}
				if (typeof designer === 'undefined' || (typeof designer === 'object' && _this.runInStudio() === true)) {
					var waktestScript = document.createElement('script');
					waktestScript.type = 'application/javascript';
					waktestScript.src = libraryURL;
					var waktestLink = document.createElement('link');
					waktestLink.rel = 'stylesheet';
					waktestLink.type = 'text/css';
					waktestLink.href = cssURL;
					document.getElementsByTagName('head')[0].appendChild(waktestScript);
					document.getElementsByTagName('head')[0].appendChild(waktestLink);
				}
				if (automatic === true) {
					$('#waktest-waf-file', _this.node).html(testLink + ' (auto)');
					$('#waktest-waf-run', _this.node).prop('disabled', true);
				} else {
					$('#waktest-waf-file', _this.node).html(testLink);
					$('#waktest-waf-run', _this.node).prop('disabled', false);
				}
			} else {
				if (testFilePath === null) {
					$('#waktest-waf-file', _this.node).html('No test specified');
					$('#waktest-waf-run', _this.node).prop('disabled', true);
				} else {
					$('#waktest-waf-run', _this.node).prop('disabled', true);
					$('#waktest-waf-run', _this.node).attr('src', '/widgets-custom/waktest-widget/icons/alert.png');
					$('#waktest-waf-file', _this.node).html('Unit Test Module not available');
				}
			}
		});		
	});
	return Waktest;
});
