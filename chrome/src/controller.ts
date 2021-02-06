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
    const url = new URL(window.location.href);
    const actionType = url.searchParams.get("actionType");
    chrome.runtime.sendMessage({action: "CONTROLLER", domain: window.location.hostname.replace(/(https?:\/\/)?(www.)?/i, ''), actionType: actionType }, (response) => {
        console.log(response);
        let style = window.document.createElement('script');
        style.setAttribute("type",'text/javascript');
        style.appendChild(window.document.createTextNode(response.script));
        window.document.head.appendChild(style);
    });
