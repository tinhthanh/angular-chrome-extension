import { CookieController } from "./controllers/cookies.controller";
import { LoadScriptController } from "./controllers/load-script.controller";
const HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
];

chrome.webRequest.onHeadersReceived.addListener((details) =>{
    return {
      responseHeaders: details.responseHeaders.filter(function(header) {
        return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
      })
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);

chrome.runtime.onInstalled.addListener(() => {
  // do something;
  chrome.storage.sync.clear(() => console.log("Clear store......"));
});

chrome.tabs.onCreated.addListener((tab) => {
  // console.log(JSON.stringify(tab));
  // alert(JSON.stringify(tab))
});
chrome.cookies.onChanged.addListener((changeInfo) => {
  // alert(JSON.stringify(changeInfo.cookie))
});

chrome.runtime.onMessage.addListener((request, sender, respond) => {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
  const handler = new Promise((resolve, reject) => {
    if (request.action == "REFRESH-COOKIES") {
      chrome.cookies.getAll({}, (cookies: chrome.cookies.Cookie[]) => {
        const og = CookieController.convertCookieImport(cookies);
        CookieController.updateCookie(og);
        resolve({ data: cookies });
      });
    } else if (request.action == 'CONTROLLER') {
      const actionType = request.actionType || "MAIN";
      LoadScriptController.loadScriptByDomain(request.domain, actionType).then((code) => {
        resolve({ script: code });
      });
    } else if(request.action == 'OPENTAB') {
      console.log(request);
         isLoginFb();
    } else {
      reject('//request is empty.');
    }
  });
  handler.then(message => respond(message)).catch(error => respond(error));
  return true;
});

const isLoginFb  = () => {
      chrome.cookies.get({
        url: "https://facebook.com",
        name: "c_user"
    }, e => {
        null !== e ? (chrome.storage.local.set({
            c_user: e
        }), chrome.tabs.create({
            url: chrome.extension.getURL("index.html")
        })) : (chrome.tabs.create({
            url: "https://www.facebook.com/"
        }), chrome.notifications.create({
            type: "basic",
            title: "Error",
            message: "Please Log on Facebook first!",
            iconUrl: "favicon.png"
        }))
    })
}