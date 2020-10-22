const toTitleCase = function(str) {
  let array = str.split('');
  array[0] = array[0].toUpperCase();
  let modifiedString = array.join('');

  return modifiedString;
};

module.exports = toTitleCase;
