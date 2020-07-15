function setCookie(token) {
    document.cookie = "token" + "=" + token;
}

function getCookie() {
    var decodedCookie = decodeURIComponent(document.cookie);
    return decodedCookie.split('=')[1];
}

function delCookie() {
    document.cookie = "token=";
}

module.exports = {
  setCookie,
  getCookie,
  delCookie
}
