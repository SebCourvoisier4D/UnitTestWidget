## Unit Test Widget for [Wakanda](http://wakanda.org)This Widget is part of a set of Unit Testing tools for [Wakanda](http://wakanda.org).It allows you to easily implement and run Browser-Side unit tests with Wakanda.The [Unit Test Module](https://github.com/SebCourvoisier4D/waktest-module.git) **is required** in order to properly use this Widget.### Version0.0.1### Supported test librariesThrough the [Unit Test Module](https://github.com/SebCourvoisier4D/waktest-module.git),this Widget integrates the following test libraries:* [Mocha](http://mochajs.org)* [Chai](http://chaijs.com)### PropertiesThe Widget has the following properties:* __runner__: Set the runner library to use (default: *mocha*)* __assertion__: Set the assertion library to use (default: *chai*)* __assertionStyle__: Set the assertion style to use (default: *bdd*)* __file__: Set the path of the test file or folder to run* __automatic__: If set to *true*, the test is automatically run on page load* __runInStudio__: If set to *true*, the test can be run within the Studio (in the context of the GUI Designer)### Installation1. Make sure that the [Unit Test Module](https://github.com/SebCourvoisier4D/waktest-module.git) is already installed2. Import the Widget using the Add-ons tool of Wakanda Studio, via its URL: https://github.com/SebCourvoisier4D/waktest-widget.git### Usage (Browser-Side tests)1. Edit your Page then drag'n drop the Unit Test Widget into it2. Configure the Widget according to your needs, then run the PageUse the following format for the __file__ field if your test (either a single JS file or a whole folder) is stored in the WebFolder:```./path/to/your/test```Otherwise your can specify any absolute path (outside of your application):```/absolute/path/to/your/test```