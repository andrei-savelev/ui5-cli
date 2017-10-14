const glob = require('glob');
const Mocha = require('mocha');

let testFiles = glob.sync('utils/**/*-test.js');
let reporter = process.env.MOCHA_REPORTER || (process.env.CI ? 'tap' : 'spec');
let mocha = new Mocha({
    timeout: 5000,
    reporter,
    retries: 2,
});

testFiles.forEach(
    mocha.addFile
        .bind(mocha)
);

function runMocha() {
    console.time('Mocha Tests Running Time');
    mocha.run(failures => {
        console.timeEnd('Mocha Tests Running Time');
        process.exit(failures);
    });
}

Promise.resolve()
    .then(() => runMocha())
    .catch(error => {
        console.error(error);
        console.error(error.stack);
        process.exit(1);
    });