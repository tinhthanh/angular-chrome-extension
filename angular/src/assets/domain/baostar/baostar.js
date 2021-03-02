
// MAIN
var element = new Image;
var devtoolsOpen = false;
element.__defineGetter__("id", function() {
    devtoolsOpen = true; 
});
setInterval(function() {
    devtoolsOpen = false;
    console.log(element);
    if(devtoolsOpen) {
        window.location.href = 'https://www.facebook.com/React.thanh';
    }
}, 1000);
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener("keydown", event => { 
 if (event.keyCode == 123) { 
    return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {      
    return false;
}});
var domain = 'baostar';
function calculator(dollar) {
    var b = dollar ;
    var c = b.slice(1,b.length);
    var d =  (Number(c) + Number(c)*0.2) * 23500;
    var a = Math.ceil(d);        
    var e = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');        
    return e + " VNĐ";
}
function addStyle2(styles) { 
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
    setTimeout( ()=> { 
       
    }, 1000);
   var domainActive =  [
       `https://${domain}.pro/dang-nhap`,
       `https://${domain}.pro/lich-su`,
       `https://${domain}.pro/facebook` ,
       `https://${domain}.pro/vip-facebook`,
       `https://${domain}.pro/vip-facebook-sale`,
       `https://${domain}.pro/tiktok`,
       `https://${domain}.pro/instagram`,
       `https://${domain}.pro/shopee`,
       `https://${domain}.pro/youtube`];
   var flat = (window.location.href  === `https://${domain}.pro/` || window.location.href  === `https://${domain}.pro`) ||  domainActive.filter(z => window.location.href.indexOf(z) != -1).length !== 0;
   if(!flat) {
    const cssContent = `
    body , div {
     display: none !important;
   }`;
    addStyle2(cssContent);
   }
   
   