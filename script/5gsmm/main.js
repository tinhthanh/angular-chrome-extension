// MAIN
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
   var domainActive = ["https://5gsmm.com/services","https://5gsmm.com/logout","https://5gsmm.com/orders"];
   var flat = (window.location.href  === "https://5gsmm.com/" || window.location.href  === "https://5gsmm.com") ||  domainActive.filter(z => window.location.href.indexOf(z) != -1).length !== 0;
  
   if(flat) {
         const cssContent = `
            a[href]:not([href="/orders"]):not([href="/"]):not([href="/logout"]) , center , .navbar-brand , .alert,  .alert-info, big > a:not([href="/logout"]){
                display: none !important;
            }
            .nav.nav-pills  {
                display: none !important;
            }
            `;
        addStyle(cssContent);
   } else {
    const cssContent = `
     body , div {
      display: none !important;
    }`;
     addStyle(cssContent);
   }
   
   