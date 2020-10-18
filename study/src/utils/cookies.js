function saveLoginIdToCookie(value) {
    document.cookie = `userLoginId=${value}`;
  }
  
  function saveUserNameToCookie(value) {
    document.cookie = `userName=${value}`;
  }

  function saveUserTypeToCookie(value) {
    document.cookie = `userType=${value}`;
  }

  function saveUserKeyIdToCookie(value) {
    document.cookie = `userId=${value}`;
  }
  
  function getLoginIdFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)userLoginId\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }
  
  function getUserNameFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)userName\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }

  function getUserTypeFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)userType\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }

  function getUserKeyIdFromCookie() {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }
  
  function deleteCookie(value) {
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
  
  export {
    saveLoginIdToCookie,
    saveUserNameToCookie,
    saveUserTypeToCookie,
    saveUserKeyIdToCookie,
    getLoginIdFromCookie,
    getUserNameFromCookie,
    getUserTypeFromCookie,
    getUserKeyIdFromCookie,
    deleteCookie,
  };
  