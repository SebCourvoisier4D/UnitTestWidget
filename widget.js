WAF.define('waktest-widget', ['waf-core/widget'], function(widget) {
	var Waktest = widget.create('waktest-widget', {
		init: function() {
			this.node.innerHTML += '<div id="waktest-waf" class="waf-studio-donotsave"><span id="waktest-waf-file"></span><div id="waktest-waf-log"></div><span id="waktest-waf-label"></span><button id="waktest-waf-run" type="button" onclick="_waktestRun()">Run</button></div>';
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
			type: 'string', //'file',
			// folder: './tests',
			// accept: '*',
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
		var _this = this;
		var automatic = this.automatic();
		if ($(this.node).css('display') === 'none') {
			// hidden ???
		}
		var testFilePath = null;
		if (this.file()) {
			testFilePath = this.file().replace(/^\/?\.\//, '');
		}
		if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
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
		window._waktest_waf_ready = function() {
			if (automatic === true && (typeof designer === 'undefined' || (typeof designer === 'object' && _this.runInStudio() === true)) && typeof _waktestRun === 'function') {
				_waktestRun();
			}
		};
		if (testFilePath !== null) {
			var testLink = testFilePath; //'<a href="/' + testFilePath + '" target="_blank">' + testFilePath + '</a>';
			var libraryURL = '/waktest-waf-lib?runner=' + this.runner() + '&assertion=' + this.assertion() + '&assertionStyle=' + this.assertionStyle() + '&path=' + testFilePath + '&widgetId=' + this.id;
			if (typeof urlParams !== 'undefined' && typeof urlParams['waktest-format'] !== 'undefined') {
				libraryURL += '&format=' + urlParams['waktest-format'];
			}
			var cssURL = '/waktest-waf-css?runner=' + this.runner() + '&widgetId=' + this.id;
			if (typeof designer === 'object' && typeof studio === 'object') {
				// @TODO: check server availability
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
			if (typeof designer === 'undefined' || (typeof designer === 'object' && this.runInStudio() === true)) {
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
				$('#waktest-waf-file', this.node).html(testLink + ' (auto)');
				$('#waktest-waf-run', this.node).prop('disabled', true);
			} else {
				$('#waktest-waf-file', this.node).html(testLink);
				$('#waktest-waf-run', this.node).prop('disabled', false);
			}
		} else {
			$('#waktest-waf-file', this.node).html('No test specified');
			$('#waktest-waf-run', this.node).prop('disabled', true);
		}
	});
	return Waktest;
});
