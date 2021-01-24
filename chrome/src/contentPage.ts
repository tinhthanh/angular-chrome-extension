chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request) {
      // console.log(request);
      // console.log("Lister ......");
      resolve(`Hi from contentPage! You are currently on: ${window.location.href}`);
    } else {
      reject('request is empty.');
    }
  });
  handler.then(message => respond(message)).catch(error => respond(error));
  return true;
});

chrome.runtime.sendMessage({action: "REFRESH-COOKIES"}, function(response) {
      // console.log(response);
      // console.log(response.data.filter( k => k.domain.indexOf(window.location.hostname.replace(/(https?:\/\/)?(www.)?/i, '')) !== -1))
    
});

