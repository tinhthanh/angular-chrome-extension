function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

async function run() {
    let total = 0;
    let count = 0;
    let like = 0;
    while (count <= 5) {
        var b = [...document.querySelectorAll('article[id^="u_"]')];
        b.forEach(f1 => {
            f1.setAttribute('style', "background-color: blue;");;
        });
         var dev = [...document.querySelectorAll('a[aria-pressed="false"]')] ;  
         
         for (const z1 of dev) {
            z1.setAttribute('style', "background-color: red;");
            console.log("click");
            z1.click();
            await delay(randomIntFromInterval(5000,10000));
          }

             if (b.length > 50) {
                total += like;
                 count = 0;
                like = 0;
                b.forEach(f1 => { f1.remove();});
            }
            console.log(total);
         var scrollEnd = document.querySelector("body");
         window.scrollBy(0, scrollEnd.scrollHeight);
        await delay(1500);
        if( b.length !== like) {
             like = b.length;  
             count = 0;
        } else {
             count++;
        } 
    }
    total += like;
    console.log(total);
}


var profile = document.getElementById("cover-name-root");
if (profile) {
    run().then(() => {
        console.log("all done");
    }).catch(err => {
        console.log(err);
    });

} else {
    // send report 
}



