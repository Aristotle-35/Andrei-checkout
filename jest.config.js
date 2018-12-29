const {defaults} = require('jest-config');
module.exports = {
  
    transformIgnorePatterns: [
        "node_modules/(?!(react|enzyme)/)"
      ]
};