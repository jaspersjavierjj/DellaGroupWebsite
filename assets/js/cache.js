if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("/sw.js", {
                scope: "/"
            })

            .then(registration => {
                console.log(
                    "Della cache service worker active:",
                    registration.scope
                );
            })

            .catch(error => {
                console.error(
                    "Service worker registration failed:",
                    error
                );
            });

    });

}