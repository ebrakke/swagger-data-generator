const _ = require('lodash');
const faker = require('faker');
/**
 * This function will take in all definitions in the swagger.json file
 * and attempt to assign a valid faker property to it
 * @param {Object}   definition  - the definition object to be extended
 * @param {Function} [customMap] - a custom mapping defined by the user
 * @returns {Object}             - an identical definition with the addition of a faker property
 * 
 * @example
 *  
 */
module.exports = (definition, customMap) => {
  // First try to map with the custom map
  if (customMap) {
    try {
      let newDef = customMap(definition);
      // If the customMap returned nothing, throw an error
      if (!newDef) {
        throw new Error('The custom map function cannot return undefined');
      }
      // If the custom map returns an object with a `faker` propery
      // then we can just return this new definition
      if (newDef.faker) {
        return newDef;
      }
    }
    catch (error) {
      throw new Error(`The custom mapping function provided threw an error: ${error}
      Please check that this function is valid`);
    }
  }

  // Now we will attempt to guess the closest faker match
}

/**
 * This will go through the faker lib and attempt to get all of the valid faker values
 * We can then use these values to match the definiton as closely as possible
 * @returns {Array<string>} - all of the possible faker values
 */
const getFakerValues = () => {
  // These keys will let us pull out all sub definitions
  let fakerValues = {};
  let keys = Object.keys(faker.definitions);
  return keys.forEach( k => {
    let subKeys = Object.keys(faker[k]);
    subKeys.forEach( sk => {
      fakerValues[sk] = k;
    })
  });
}

const findClosestMatch = () => {

}
