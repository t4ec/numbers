exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['numbers-spec.js'],
    capabilities: {
      browserName: 'phantomjs',
      'phantomjs.binary.path': require('phantomjs').path
    },
};
