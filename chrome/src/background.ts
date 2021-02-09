import { CookieController } from "./controllers/cookies.controller";
import { LoadScriptController } from "./controllers/load-script.controller";
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
  // console.log(sender.tab ?
  //   "from a content script:" + sender.tab.url :
  //   "from the extension");
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
    } else {
      reject('//request is empty.');
    }
  });
  handler.then(message => respond(message)).catch(error => respond(error));
  return true;
});

