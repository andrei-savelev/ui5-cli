const fs = require('fs');
const { storeConfigProp } = require('./store-config-prop');
const { expect } = require('chai');

const TEST_SETTINGS = [
  './ui5.config.json',
  'utf8'
];

describe('storeConfigProp()', () => {
  afterEach(() => {
    fs.unlinkSync(TEST_SETTINGS[0]);
  });

  it('Should store config props pair for the fist time', (done) => {
    const PROP_SETTINGS = [
      'propKey',
      'propValue'
    ];
    let storedProps;

    Promise.resolve()
      .then(() => storeConfigProp(...PROP_SETTINGS))
      .then(() => {
        storedProps = fs.readFileSync(...TEST_SETTINGS);
        storedProps = JSON.parse(storedProps);

        expect(storedProps[PROP_SETTINGS[0]]).eq(PROP_SETTINGS[1]);
      })
      .then(() => {
        done();
      })
      /* eslint no-console: 0 */
      .catch(e => console.error(e));
  });

  it('Should add new config props pair to existing properties', (done) => {
    const PROP_SETTINGS = [
      'propKey',
      'propValue'
    ];
    let storedProps;

    Promise.resolve()
      .then(() => storeConfigProp(...PROP_SETTINGS))
      .then(() => storeConfigProp(
        `NEW${PROP_SETTINGS[0]}`,
        `NEW${PROP_SETTINGS[1]}`
      ))
      .then(() => {
        storedProps = fs.readFileSync(...TEST_SETTINGS);
        storedProps = JSON.parse(storedProps);

        expect(storedProps[PROP_SETTINGS[0]])
          .eq(
            PROP_SETTINGS[1],
            'Properties added before are not available'
          );

        expect(storedProps[`NEW${PROP_SETTINGS[0]}`])
          .eq(
            `NEW${PROP_SETTINGS[1]}`,
            'Properties added after are not available'
          );
      })
      .then(() => {
        done();
      })
      /* eslint no-console: 0 */
      .catch(e => console.error(e));
  });
});
