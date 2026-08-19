if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            const registration =
                await navigator.serviceWorker.register(
                    "/sw.js",
                    {
                        scope: "/",

                        /*
                        Do not use HTTP cache when
                        checking sw.js itself.
                        */
                        updateViaCache: "none"
                    }
                );


            console.log(
                "Della cache service worker active:",
                registration.scope
            );


            /*
            Explicitly check whether sw.js changed.
            This does NOT block the website.
            */

            registration.update()
                .catch(error => {

                    console.warn(
                        "Service worker update check failed:",
                        error
                    );

                });


        } catch (error) {

            console.error(
                "Service worker registration failed:",
                error
            );

        }

    });

}