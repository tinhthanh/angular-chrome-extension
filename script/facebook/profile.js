function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

async function run() {
    let count = 0;
    let like = 0;
    const current = document.documentElement.scrollTop;
    while (count <= 5) {
        var percentage =  document.documentElement.clientHeight * 0.2 ;
        current += percentage;
        window.scrollBy(0, current);
        var dev = document.querySelectorAll('div[aria-posinset]');
        if (dev.length === like) {
            count++;
        } else {
            count = 0;
        }
        console.log(dev.length);
        like = dev.length;
        await delay(5000);
    }
}

run().then(() => {
    console.log("all done");
}).catch(err => {
    console.log(err);
});

// await render

setTimeout(() => {
    var profile = document.querySelector('a[aria-label="Link to open profile cover photo"]');
    if (profile) {
        console.log("page profile");

        [...document.querySelectorAll('div[aria-posinset]')].forEach(el => {
            [...el.querySelectorAll('div[aria-label="Thích"]')].filter(k => k.offsetHeight >= 32).forEach(like => {
                like.setAttribute('style', "background-color: red;");
            });
        });


    } else {
        console.log("send report");
    }
}, 3000);
