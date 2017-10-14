const fs = require('fs');
const { isArray } = require('lodash');
/**
 * Replace the patterns in the file`s content to the passed string
 * @param {String} content - The content of the file in which the pattern will be replaced
 * @param {String|Array[String]} pattern - This pattern string should look like %PATTERN% 
 * (or array of patterns [%PATTERN%, %PATTERN_2% ...])
 * @param {String|Array[String]} target - Replacement string (or an array of strings 
 * in the same order as passed to the patterns)
 * @returns {String} - The new content of file with replaced patterns
 */
exports.replacePatterns = (content, pattern, target) => {
    let newContent = content;

    if (!isArray(pattern)) {
        pattern = [pattern];
    }

    if (!isArray(target)) {
        target = [target];
    }

    if (target.length !== pattern.length) {
        throw new Error('Target length not equal to pattern length');
    }

    for (let i = 0; i < pattern.length; i++) {
        newContent = newContent.replace(
            new RegExp(pattern[i], 'g'), 
            target[i].trim()
        );
    }

    return newContent;
}