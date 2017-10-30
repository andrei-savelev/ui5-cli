const FS = require('fs');

/**
 * Get the value of the property 
 * that was saved in the configuration file
 * @public
 * @since 1.0.0
 * @prop {string} key - Property name
 * @returns {string} Property value 
 */
exports.getConfigProp = (key) => {
    let configContent = FS.readFileSync('./ui5.config.json', 'utf8');
    let propertyValue = '';

    configContent = JSON.parse(configContent);

    if (key in configContent) {
        propertyValue = configContent[key];
    }

    return propertyValue;
};