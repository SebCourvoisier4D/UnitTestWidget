(function(UnitTest) {
	//    /* Default width and height of your widget */
	UnitTest.setWidth('250');
	UnitTest.setHeight('48');
	//    /* Define custom event for your widget */
	//    UnitTest.addEvent('myEvent');
	/* Customize existing properties */
	/*UnitTest.customizeProperty('runner', {
		title: 'Runner library',
		description: 'Runner library to use (currently supported: Mocha).'
	});

	UnitTest.customizeProperty('assertion', {
		title: 'Assertion library',
		description: 'Assertion library to use (currently supported: Chai).'
	});

	UnitTest.customizeProperty('assertionStyle', {
		title: 'Assertion style',
		description: 'Assertion style to use (currently supported: BDD, TDD).'
	});*/

	UnitTest.customizeProperty('file', {
		title: 'Test path',
		description: 'Path to the test file or folder to run (JS script).'
	});

	UnitTest.customizeProperty('automatic', {
		title: 'Run automatically',
		description: 'Run the attached test automatically on page load.'
	});

	UnitTest.customizeProperty('runInStudio', {
		title: 'Run in Studio',
		description: 'Run the attached test in the Studio.'
	});
	//    /* Add a Label property */
	//    UnitTest.addLabel({
	//        'defaultValue': '',
	//        'position': 'top'
	//    });
	//    /* Set the Design and Styles panels */
	//    UnitTest.setPanelStyle({
	//        'fClass': true,
	//        'text': true,
	//        'background': true,
	//        'border': true,
	//        'sizePosition': true,
	//        'label': true,
	//        'disabled': ['border-radius']
	//    });
	//    /* Override widget's initialization */
	//    UnitTest.prototype.init = function() {
	//        this.node.innerHTML = "Widget Text"; /* Include text inside the widget */
	//    }
});
// For more information, refer to http://doc.wakanda.org/Wakanda/help/Title/en/page3870.html
