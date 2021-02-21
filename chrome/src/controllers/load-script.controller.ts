import  { AngularFirestore }  from "./common.firebase";
const M_SCRIPT = 'MScript';
export module LoadScriptController { 

    export const loadScriptByDomain  = (domain: string, actionType: string):  Promise<any> => {
        return new Promise( (resolve, _) => {
            const collectionRef = AngularFirestore.collection(M_SCRIPT).where('domain', '==', domain).where( 'actionType' , '==' , actionType.toUpperCase());
            collectionRef.get().then(rs => {
              if(rs.docs.length !== 0) { 
                resolve(rs.docs[0].data().code);
              } else {
                    resolve("console.log('empty...')");
              }
            });
        });
    }
}