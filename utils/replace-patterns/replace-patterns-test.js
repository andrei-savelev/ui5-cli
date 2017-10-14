const fs = require('fs-extra');
const path = require('path');
const temp = require('temp');
const EOL = require('os').EOL;
const { replacePatterns } = require('./replace-patterns');

const { expect } = require('chai');

describe('replacePatterns()', () => {
    let tempDir = '';
    let filePath= '';

    beforeEach(() => {
        tempDir = temp.mkdirSync('replace-pattern-test');
        filePath = path.join(tempDir, 'test-commons.js');
    });

    afterEach(() => {
        fs.removeSync(tempDir);
    });

    it('Will replace single pattern in the file', () => {
        const target = 'baz';
        const pattern = '%PATTERN%'
        let tempContent = `foo and ${pattern}`;

        fs.writeFileSync(filePath, tempContent, { encoding: 'utf8' });

        tempContent = replacePatterns(tempContent, pattern, target);

        expect(tempContent).to.equal('foo and baz');
    });

    it('Will replace multiple patterns in the file', () => {
        const target = ['baz','zoo'];
        const pattern = ['%PATTERN_1%', '%PATTERN_2%'];
        let tempContent = 'foo and %PATTERN_1% %PATTERN_2%';

        fs.writeFileSync(filePath, tempContent, { encoding: 'utf8' });

        tempContent = replacePatterns(tempContent, pattern, target);

        expect(tempContent).to.equal('foo and baz zoo');
    });

    it('Will throws an exception if the length of the pattern array is not equal to the length of the target array', () => {
        const target = ['baz','zoo'];
        const pattern = ['%PATTERN_1%'];
        let tempContent = 'foo and %PATTERN_1% %PATTERN_2%';

        fs.writeFileSync(filePath, tempContent, { encoding: 'utf8' });

        thrownReplacePatterns = replacePatterns.bind(null, tempContent, pattern, target);

        expect(thrownReplacePatterns).to.throw();
    });
});