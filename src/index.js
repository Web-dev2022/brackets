module.exports = function check(str, bracketsConfig) {

  str = str.split('');
  if (str.length < 1 || bracketsConfig.length < 1) {
    return false;
  } else if (str.length % 2 !== 0) {
    return false;
  }

  let arrOpen = [];

  const checkClose= function(close) {
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (bracketsConfig[i][1] === close) {
        return bracketsConfig[i][0];
      }
    }
    return false;
  }

  const checkOpen = function(open) {
    for (let i = 0; i < bracketsConfig.length; i++) {
      if (bracketsConfig[i][0] === open) {
        return true;
      }
    }
    return false;
  }

  core();

  function core () {
    for (let i = 0; i < str.length; i++) {
      const openIsInConfig = checkOpen(str[i]);
      const openIsInArrOpen = arrOpen.includes(str[i]);
      const closeIsInConfig = checkClose(str[i]);

      if ( openIsInConfig && !openIsInArrOpen ) {
        arrOpen.push(str[i]);
      }

      if (!closeIsInConfig && !openIsInConfig) {
        return false;
      } else if (closeIsInConfig && !arrOpen.includes(closeIsInConfig)) {
        return false;
      }

      console.log(str.join(''));
      if ( closeIsInConfig && arrOpen.includes(str[i - 1]) && closeIsInConfig === str[i - 1]) {
        str.splice((i - 1), 2);
        
        core();
      }
    }
  }

  return (str.length === 0) ? true : false;
}
