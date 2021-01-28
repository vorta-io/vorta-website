document.addEventListener("DOMContentLoaded", function() {
  function cookie() {
    if (!Cookies.get('vortaGdprAccepted')) {
      gdprCookieNotice({
        locale: 'en', //This is the default value
        timeout: 500, //Time until the cookie bar appears
        expiration: 30, //This is the default value, in days
        domain: 'https://quirky-hypatia-4de574.netlify.app/', //If you run the same cookie notice on all subdomains, define the main domain starting with a .
        implicit: true, //Accept cookies on page scroll automatically
        statement: '', //Link to your cookie statement page
        performance: ['JSESSIONID'], //Cookies in the performance category.
        analytics: ['ga'], //Cookies in the analytics category.
        marketing: ['SSID'] //Cookies in the marketing category.
      });
    }
  }

  cookie();
});


document.addEventListener("click", function(element) {
  if (element.target.classList.contains('js-cookie-accepted')) {
    Cookies.set('vortaGdprAccepted', true, { expires: 30 })
  }
});
