const fs = require('fs-extra');
const path = require('path');
const temp = require('temp');
const { getConfigProp } = require('./get-config-prop');
const { expect } = require('chai');

describe('getConfigProp()', () => {
    let tempDir = '';
    let filePath = '';
    let propSettings = [];
  
    beforeEach(() => {
        propSettings = [
            'propKey',
            'propValue'
        ];

        filePath = './ui5.config.json';
    });

    afterEach(() => {
      fs.unlink(filePath);

      tempDir = undefined;
      filePath = undefined;
      propSettings = undefined;
    });

    it('Should return stored property value', () => {
        let propertyPair = {};
        
        propertyPair[propSettings[0]] = propSettings[1];
        
        fs.writeFileSync(
            filePath, 
            JSON.stringify(propertyPair, null, 2), 
            { encoding: 'utf8' }
        );

        expect(getConfigProp(propSettings[0]))
            .eq(propSettings[1], 'Cannot get stored property');
    });
});