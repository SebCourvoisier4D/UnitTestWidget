(function(Waktest) {
	//    /* Default width and height of your widget */
	Waktest.setWidth('250');
	Waktest.setHeight('48');
	//    /* Define custom event for your widget */
	//    Waktest.addEvent('myEvent');
	/* Customize existing properties */
	Waktest.customizeProperty('runner', {
		title: 'Runner library',
		description: 'Runner library to use (currently supported: Mocha).'
	});

	Waktest.customizeProperty('assertion', {
		title: 'Assertion library',
		description: 'Assertion library to use (currently supported: Chai).'
	});

	Waktest.customizeProperty('assertionStyle', {
		title: 'Assertion style',
		description: 'Assertion style to use (currently supported: BDD, TDD).'
	});

	Waktest.customizeProperty('file', {
		title: 'Test path',
		description: 'Path to the test file or folder to run (JS script).'
	});

	Waktest.customizeProperty('automatic', {
		title: 'Run automatically',
		description: 'Run the attached test automatically on page load.'
	});

	Waktest.customizeProperty('runInStudio', {
		title: 'Run in Studio',
		description: 'Run the attached test in the Studio.'
	});
	//    /* Add a Label property */
	//    Waktest.addLabel({
	//        'defaultValue': '',
	//        'position': 'top'
	//    });
	//    /* Set the Design and Styles panels */
	//    Waktest.setPanelStyle({
	//        'fClass': true,
	//        'text': true,
	//        'background': true,
	//        'border': true,
	//        'sizePosition': true,
	//        'label': true,
	//        'disabled': ['border-radius']
	//    });
	//    /* Override widget's initialization */
	//    Waktest.prototype.init = function() {
	//        this.node.innerHTML = "Widget Text"; /* Include text inside the widget */
	//    }
});
// For more information, refer to http://doc.wakanda.org/Wakanda/help/Title/en/page3870.html
