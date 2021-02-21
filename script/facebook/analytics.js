//  ANALYTICS 
function addStyle(styles) { 
    if(document.getElementById("tableTool")) return;
       var css = document.createElement('style'); 
       css.setAttribute("id", "tableTool");
       css.type = 'text/css'; 
       if (css.styleSheet)  
           css.styleSheet.cssText = styles; 
       else  
           css.appendChild(document.createTextNode(styles)); 
       document.getElementsByTagName("head")[0].appendChild(css); 
   } 
       var mycss = `
       .comnunity-tool .wrapper {
                 padding-top: 14px;
                 text-align: center;
                 left: 315px;
                 position: fixed;
               }
               .comnunity-tool .toggle {
                 position: relative;
                 display: inline-block;
                 width: 100px;
                 margin-left: 100px;
                 padding: 4px;
                 border-radius: 40px;
               }
               .comnunity-tool .toggle:before,
               .comnunity-tool .toggle:after {
                 content: "";
                 display: table;
               }
               .comnunity-tool .toggle:after {
                 clear: both;
               }
               .comnunity-tool .toggle-bg {
                 position: absolute;
                 top: -4px;
                 left: -4px;
                 width: 100%;
                 height: 100%;
                 background-color: #C0E6F6;
                 border-radius: 40px;
                 border: 4px solid #81C0D5;
                 transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
               .comnunity-tool .toggle-input {
                 position: absolute;
                 top: 0;
                 left: 0;
                 width: 100%;
                 height: 100%;
                 border: 1px solid red;
                 border-radius: 40px;
                 z-index: 2;
                 opacity: 0;
               }
               .comnunity-tool .toggle-switch {
                 position: relative;
                 width: 40px;
                 height: 40px;
                 margin-left: 50px;
                 background-color: #F5EB42;
                 border: 4px solid #E4C74D;
                 border-radius: 50%;
                 transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
               .comnunity-tool .toggle-switch-figure {
                 position: absolute;
                 bottom: -14px;
                 left: -50px;
                 display: block;
                 width: 80px;
                 height: 30px;
                 border: 8px solid #D4D4D2;
                 border-radius: 20px;
                 background-color: #fff;
                 transform: scale(0.4);
                 transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
               .comnunity-tool .toggle-switch-figure:after {
                 content: "";
                 display: block;
                 position: relative;
                 top: -65px;
                 right: -42px;
                 width: 15px;
                 height: 15px;
                 border: 8px solid #D4D4D2;
                 border-radius: 100%;
                 border-right-color: transparent;
                 border-bottom-color: transparent;
                 transform: rotateZ(70deg);
                 background-color: #fff;
               }
               .comnunity-tool .toggle-switch-figure:before {
                 content: "";
                 display: block;
                 position: relative;
                 top: -25px;
                 right: -10px;
                 width: 30px;
                 height: 30px;
                 border: 8px solid #D4D4D2;
                 border-radius: 100%;
                 border-right-color: transparent;
                 border-bottom-color: transparent;
                 transform: rotateZ(30deg);
                 background-color: #fff;
               }
               .comnunity-tool .toggle-switch-figureAlt {
                 content: "";
                 position: absolute;
                 top: 5px;
                 left: 2px;
                 width: 2px;
                 height: 2px;
                 background-color: #EFEEDA;
                 border-radius: 100%;
                 border: 4px solid #DEE1C5;
                 box-shadow: 42px -7px 0 -3px #FCFCFC, 75px -10px 0 -3px #FCFCFC, 54px 4px 0 -4px #FCFCFC, 83px 7px 0 -2px #FCFCFC, 63px 18px 0 -4px #FCFCFC, 44px 28px 0 -2px #FCFCFC, 78px 23px 0 -3px #FCFCFC;
                 transition: all 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                 transform: scale(0);
               }
               .comnunity-tool .toggle-switch-figureAlt:before {
                 content: "";
                 position: absolute;
                 top: -6px;
                 left: 18px;
                 width: 7px;
                 height: 7px;
                 background-color: #EFEEDA;
                 border-radius: 100%;
                 border: 4px solid #DEE1C5;
               }
               .comnunity-tool .toggle-switch-figureAlt:after {
                 content: "";
                 position: absolute;
                 top: 19px;
                 left: 15px;
                 width: 2px;
                 height: 2px;
                 background-color: #EFEEDA;
                 border-radius: 100%;
                 border: 4px solid #DEE1C5;
               }
               .comnunity-tool .toggle-input:checked ~ .toggle-switch {
                 margin-left: 0;
                 border-color: #DEE1C5;
                 background-color: #FFFDF2;
               }
               .comnunity-tool .toggle-input:checked ~ .toggle-bg {
                 background-color: #484848;
                 border-color: #202020;
               }
               .comnunity-tool .toggle-input:checked ~ .toggle-switch .toggle-switch-figure {
                 margin-left: 40px;
                 opacity: 0;
                 transform: scale(0.1);
               }
               .comnunity-tool .toggle-input:checked ~ .toggle-switch .toggle-switch-figureAlt {
                 transform: scale(1);
               }
               .comnunity-tool {
                  position: fixed;
                  top: 0px;
                  left: 0px;
                  width: 400px;
                  background: white;
                  height: 100%;
                  overflow: auto;
                  display: flex ;
                  font-size: 13px;
                   opacity: 1;
               }
               table {
                 font-family: arial, sans-serif;
                 border-collapse: collapse;
                 width: 100%;
               }

               td, th {
                 border: 1px solid #dddddd;
                 text-align: left;
                 padding: 8px;
               }

               tr:nth-child(even) {
                 background-color: #dddddd;
               }
               .avt {
                   display: flex;
                   justify-content: flex-start;
                   align-items: center;
               }
               .img {
                   border-radius: 50%;
                   margin-right: 4px;
               }
               .post-container {
                   position: fixed;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   bottom: 9px;
                   left: 158px;
               }
               .post-couter {
                   width: 63px;
                   height: 63px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   background-color: #242526;
                   border-radius: 50%;
                   color: white;
               }
               .badge-c {
                   position: relative;
               }
               .badge {						
                   position: absolute;
                   right: 1px;
                   top: -8px;
                   background: #000206ad;
                   color: white;
                   padding: 2px;
                   border-radius: 50%;
                   min-width: 15px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
               }
               .nowrap {
                   white-space: nowrap
               }
       `;

function renderReport(arrLike, arrComment, couter, cb) {
var toolEl = document.getElementById("tableToolContainer") ;
if(!toolEl) {
addStyle(mycss);
var temp = document.createElement("div") ;
temp.setAttribute("id", "tableToolContainer");
temp.className  = "comnunity-tool" ;
document.body.appendChild(temp);

} 
toolEl = document.getElementById("tableToolContainer") ;
toolEl.addEventListener('click' ,function(event) {
       if (event.target.id === 'toggle-input') {
       //Do your stuff
          cb();
           
       }
   }); 
var textBodyLike = (arrLike || [] ).slice(0,30).map( z =>  
              `<tr>
                   <td class="avt"><div class="badge-c"> <div class="badge"> ${z.likes}</div><img class="img" src="${z.img}" > </div>
                   <a  class="nowrap" target="_blank" rel="noopener noreferrer" href="${z.url}">${z.name}</a></td>                      
                   <td>${z.comments}</td>
                 </tr>`
).join('');
var textBodyComment = (arrComment || [] ).slice(0,30).map( z =>  
              `<tr>
                   <td class="avt">
                   <div class="badge-c"> <div class="badge"> ${z.comments}</div><img class="img" src="${z.img}" > </div>
               <a class="nowrap" target="_blank" rel="noopener noreferrer" href="${z.url}">${z.name}</a></td>
                   
                   <td>${z.likes}</td>
                 </tr>`
).join('');
         toolEl.innerHTML   =  `
         <div class="wrapper">
             <div class="toggle">
               <input id="toggle-input" class="toggle-input" type="checkbox" />
               <div class="toggle-bg"></div>
               <div class="toggle-switch">
                 <div class="toggle-switch-figure"></div>
                 <div class="toggle-switch-figureAlt"></div>
               </div>  
             </div>
           </div>
         <div  class="post-container"> <h1 class="post-couter"> Post ${couter} </h1></div>
               <table>
               <tr>
                 <th>Good Friend |  ${arrLike.length}</th>
                 <th>Com</th>
               </tr>
                ${textBodyLike}
             </table>
                <table>
               <tr>
                 <th>Best friend |  ${arrComment.length}</th>
                 <th>Likes</th>
               </tr>
                ${textBodyComment}
             </table>
         `;
}

function render(allLikes,allComment, couter, cb) {
//  var mapComment =  allComment.reduce( (pre, curr) => {  pre[curr.name] = [...(pre[curr.name] || []), curr]  ;return pre;}, {}) ;
// var comments =  Object.keys(mapComment).map( key => { return {name: key , data: mapComment[key] , priority: mapComment[key].length }}).sort(function(a, b){return  b.priority - a.priority })
 
// var mapLike =  allLikes.reduce( (pre, curr) => {  pre[curr.name] = [...(pre[curr.name] || []), curr]  ;return pre;}, {}) ;
// var likes =  Object.keys(mapLike).map( key => { return {name: key , data: mapLike[key] , priority: mapLike[key].length, comment: (mapComment[key]? mapComment[key].length : 0) }}).sort(function(a, b){return  b.priority - a.priority });
//    comments =  Object.keys(mapComment).map( key => { return {name: key , data: mapComment[key] , priority: mapComment[key].length, likes: (mapLike[key]?mapLike[key].length : 0) }}).sort(function(a, b){return  b.priority - a.priority })
   var likes =  Object.values(allLikes).sort(function(a, b){return  b.likes - a.likes });
    likes.forEach( l => {
       l.comments = allComment[l.id] ? allComment[l.id].comments : 0 ;
    });
   var comments =  Object.values(allComment).sort(function(a, b){return  b.comments - a.comments });
    comments.forEach( c => {
       c.likes = allLikes[c.id] ? allLikes[c.id].likes : 0 ;
    });
renderReport(likes, comments, couter, cb);
}
// end render report	

function waitforme(milisec) { 
       return new Promise(resolve => { 
           setTimeout(() => { resolve('') }, milisec); 
       }) 
   } 
function isNumeric(str) {
 if (typeof str != "string") return false 
 return !isNaN(str) && 
        !isNaN(parseFloat(str))
}
function getIdByUrl(c) {
   var url = new URL(c);
   var id = url.searchParams.get("id");
       if(!id) {
       var matched = c.match(/.+\/www.facebook.com\/([A-Za-z0-9-.]{0,255})?.+$/); 
          if(matched) {
              return (matched[1]);
          } else {
              console.log(url);
              return undefined;
          }
       } else {
           return id;
       }
}

   async function run() { 
   var limit = 50;
   //var allLikes = [];
   var allLikesMap =  {};
   //var allComment = [];
   var allCommentMap = {};
   let couter = 0 ;
    while(couter < limit ) {
           var post =  [...document.querySelectorAll('div[aria-posinset]')];
           for(var b of post ) {
               var viewMore = [...b.querySelectorAll('div > span > span > span')].filter(z =>  z.textContent && isNumeric(z.textContent));
               if(viewMore.length > 0) {
                   viewMore[0].click();
                   await waitforme(2000);
                   var el = document.querySelectorAll('div[ data-pagelet="root"] div[aria-label="Cảm xúc"] div[data-visualcompletion="ignore-dynamic"]');
                 // get action
                    while(el.length != 0 ) {	
                      var url = el[0].querySelector('a:not([aria-label])').getAttribute('href');
                       var name = el[0].querySelector('a:not([aria-label])').textContent;
                        var img = el[0].querySelector('a[aria-label]').querySelector('image').getAttribute('xlink:href');
                        var id = getIdByUrl(url);
                   //	 allLikes.push({name: name , url : url , img: img });
                        if(allLikesMap[id]) {
                            allLikesMap[id].likes++;
                        } else {
                            allLikesMap[id] = {name: name , url : url , img: img, likes: 1, comments: 0 , id: id };
                        }
                        el[0].remove();
                        await waitforme(100);
                        el = document.querySelectorAll('div[ data-pagelet="root"] div[aria-label="Cảm xúc"] div[data-visualcompletion="ignore-dynamic"]');
                    }
                 // get comment
                var commentEl =  [...b.querySelectorAll('span > span')].filter( z => z.textContent && (z.textContent.match(/Xem thêm ([0-9]{0,255}) bình luận$/) || z.textContent == "Xem thêm bình luận"));
                 while(commentEl.length != 0 ) {
                     commentEl.forEach(c => c.click());
                     await waitforme(1000);
                     commentEl =  [...b.querySelectorAll('span > span')].filter( z => z.textContent && (z.textContent.match(/Xem thêm ([0-9]{0,255}) bình luận$/) || z.textContent == "Xem thêm bình luận"));
                 }
                //  allComment = allComment.concat([...b.querySelectorAll('div[aria-label^="Bình luận"][tabindex="-1"]')].map( z =>{var temp = z.querySelector('a:not([aria-hidden="true"])') ; return {name: temp.textContent , url: temp.getAttribute('href'), img: temp.closest('div[aria-label]').querySelector("image").getAttribute('xlink:href')} }));	
                 ([...b.querySelectorAll('div[aria-label^="Bình luận"][tabindex="-1"]')].map( z =>{var temp = z.querySelector('a:not([aria-hidden="true"])') ; return {name: temp.textContent , url: temp.getAttribute('href'), img: temp.closest('div[aria-label]').querySelector("image").getAttribute('xlink:href'), id: getIdByUrl(temp.getAttribute('href'))} })).forEach( z => {
                     if(allCommentMap[z.id]) {
                          allCommentMap[z.id].comments++;
                     } else {
                          allCommentMap[z.id] = {name: z.name , url : z.url , img: z.img, likes: 0, comments: 1, id: z.id };
                     }
                 });				
                   try {
                  const close =  document.querySelector('div[aria-label="Cảm xúc"] div[ aria-label="Đóng"]') ;
                   close.click();
                   }catch (e) {
                       // retry
                       await waitforme(1000);
                       const close =  document.querySelector('div[aria-label="Cảm xúc"] div[ aria-label="Đóng"]') ;
                       close.click();
                   }
                   
                   await waitforme(1000);
                 } else {
                  console.log("Fail --------------");
              }

               b.setAttribute('style', 'background-color: red;');
               var lineEl = document.querySelector('div[data-pagelet="ProfileTimeline"]')  || document.querySelector('div[data-pagelet="GroupFeed"] div[role="feed"]')
                  || document.querySelector('div[role="main"]:last-child > div');
               var profileTimeline = lineEl.children ;
               if(profileTimeline.length >  0) {
                   profileTimeline[0].remove();
                   await waitforme(2000);
               }
               couter++;
               render(allLikesMap,allCommentMap,couter, () => {
                   couter = limit;
               });
               if(couter >= limit) {break;}
           }	 
    }
    return { likes:  allLikesMap , commnet: allCommentMap}

} 
setTimeout( () => {
run().then( z => {
   console.log(z) ;
 });
}, 4000)

   
   



