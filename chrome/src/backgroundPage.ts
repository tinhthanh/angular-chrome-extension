console.log('background script loaded');

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: "#3aa757"}, function() {
      console.log("The color is green.");
    });
  });

chrome.tabs.onCreated.addListener(function (tab) {
        // console.log(JSON.stringify(tab));
        // alert(JSON.stringify(tab))
});
chrome.cookies.onChanged.addListener(function(changeInfo) {
    // alert(JSON.stringify(changeInfo.cookie))
  });

chrome.runtime.onMessage.addListener((request, sender, respond) => {
     console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    const handler = new Promise((resolve, reject) => {
      if (request.action == "REFRESH-COOKIES") {
        console.log(request);
        chrome.cookies.getAll({}, function(cookies) { 
            resolve({data: cookies});
          });
      } else {
        reject('request is empty.');
      }
    });
    handler.then(message => respond(message)).catch(error => respond(error));
    return true;
  });

  
// chrome.runtime.onMessage.addListener((request, sender, respond) => {
//     console.log(sender.tab ?
//        "from a content script:" + sender.tab.url :
//        "from the extension");
//        chrome.cookies.getAll({}, function(cookies) { 
//         respond({data: cookies});
//         });
//    return true;
//  });