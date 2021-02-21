
function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

async function run() {
    let count = 0;
    while (count <= 10) {
         var dev = [...document.querySelectorAll('a[aria-pressed="false"]')] ;  
         for (const z1 of dev) {
            z1.setAttribute('style', "background-color: limegreen;");
            z1.click();
            await delay(randomIntFromInterval(1000,2000));
          }          
         var scrollEnd = document.querySelector("body");
         window.scrollBy(0, scrollEnd.scrollHeight);
        await delay(1500);
        console.log(dev.length);
        count++;
    }
}


run().then(() => {
    console.log("all done");
    window.location.reload();
}).catch(err => {
    console.log(err);
});