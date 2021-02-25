// chrome.runtime.onMessage.addListener((request, sender, respond) => {
//     const handler = new Promise((resolve, reject) => {
//       if (request) {
//          console.log(request);
//          console.log("Lister ......");
//         resolve(`Hi from contentPage! You are currently on: ${window.location.href}`);
//       } else {
//         reject('request is empty.');
//       }
//     });
//     handler.then(message => respond(message)).catch(error => respond(error));
//     return true;
//   }); 
const addScript = (script,actionType) => {
   let style = window.document.createElement('script');
   style.setAttribute("type",'text/javascript');
   style.setAttribute("id", actionType);
   style.appendChild(window.document.createTextNode(script));
   if(document.readyState === 'complete') {
      (window.document.head || document.getElementsByTagName('head')[0]).appendChild(style);
     } else {
     if((window.document.head || document.getElementsByTagName('head')[0])) {
        (window.document.head || document.getElementsByTagName('head')[0]).appendChild(style); 
        } else {
        document.addEventListener("DOMContentLoaded", function () {
           (window.document.head || document.getElementsByTagName('head')[0]).appendChild(style);
        });
      }
   }
}
try {
   const actionType =  new URL(window.location.href).searchParams.get("actionType") || "MAIN";
   const cache  = sessionStorage.getItem(actionType);
   if(cache) {
      addScript(cache,actionType);
   } else {
      chrome.runtime.sendMessage({action: "CONTROLLER", domain: window.location.hostname.replace(/(https?:\/\/)?(www.)?/i, ''), actionType: actionType }, (response) => {
          addScript(response.script,actionType);
          sessionStorage.setItem( actionType,response.script);
      });
   }  
} catch {
    document.querySelector('body').remove();
}
