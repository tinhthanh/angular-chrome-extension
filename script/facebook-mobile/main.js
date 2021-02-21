
// listener local change
const locationChangeEventType = "MY_APP-location-change";
// called on creation and every url change
 function observeUrlChanges(cb) {
    assertLocationChangeObserver();
    window.addEventListener(locationChangeEventType, () => cb(window.location));
    cb(window.location);
}
function assertLocationChangeObserver() {
    const state = window;
    if (state.MY_APP_locationWatchSetup) {
        return;
    }
    state.MY_APP_locationWatchSetup = true;
    let lastHref = location.href;
        document.querySelector("body").addEventListener("click", () => {
            requestAnimationFrame(() => {
                const currentHref = location.href;
                if (currentHref !== lastHref) {
                    lastHref = currentHref;
                    window.dispatchEvent(new Event(locationChangeEventType));
                }
            });
        });
}

observeUrlChanges((loc) => {
  console.log(loc.href)
});
