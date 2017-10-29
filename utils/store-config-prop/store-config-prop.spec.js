const fs = require('fs');
const { storeConfigProp } = require('./store-config-prop');

const { expect } = require('chai');

describe('storeConfigProp()', () => {
  it('Should store config props pair', (done) => {
    const PROP_KEY = 'propKey';
    const PROP_VALUE = 'propValue';
    let storedProps;

    Promise.resolve()
      .then(() => storeConfigProp(PROP_KEY, PROP_VALUE))
      .then(() => {
        storedProps = fs.readFileSync('./ui5.config.json', 'utf8');
        storedProps = JSON.parse(storedProps);

        expect(storedProps[PROP_KEY]).eq(PROP_VALUE);
      })
      .then(() => {
        done();
      })
      /* eslint no-console: 0 */
      .catch(e => console.error(e));
  });
});
