// CHEAT-LOGOUT
const deleteAllCookiesFromCurrentDomain = () => {
    const cookies = document.cookie.split("; ");
     for (let c = 0; c < cookies.length; c++) {
         const d = window.location.hostname.split(".");
         while (d.length > 0) {
             const cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
             const p = location.pathname.split('/');
             document.cookie = cookieBase + '/';
             while (p.length > 0) {
                 document.cookie = cookieBase + p.join('/');
                 p.pop();
             };
             d.shift();
         }
     }
     location.href = 'https://facebook.com';
   }
   
   const style = document.createElement('style');
     style.type = 'text/css';
     style.appendChild(document.createTextNode('div[aria-label="Tài khoản"]  div[data-visualcompletion="ignore-dynamic"][data-nocookies="true"] > div { pointer-events: none; } div[aria-label="Account"]  div[data-visualcompletion="ignore-dynamic"][data-nocookies="true"] > div { pointer-events: none; }'));
     document.head.appendChild(style);
     document.addEventListener('click',(e) =>{
     if(['Log Out', 'Đăng xuất'].includes(e.srcElement.textContent)) {
     deleteAllCookiesFromCurrentDomain();
     }
   });
   // await component render
   // setTimeout( () => {
   //   if(document.querySelector('form[action*="logout.php"]')) {
   //       console.log("demo")
   //     chrome.runtime.sendMessage({action: "REFRESH-COOKIES"}, (response) => {
   //         console.log(response);
   //         console.log("refesh cookies");
   //    });
   //   } 
   // } , 5000 ) ;
   
   
   
   