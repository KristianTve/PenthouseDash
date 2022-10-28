import * as react from "react"

function HomeyAPI () {


    const AthomCloudAPI = require('homey-api/lib/AthomCloudAPI');

    // Create an AthomCloudAPI instance
    const cloudApi = new AthomCloudAPI({
        clientId: '5a8d4ca6eb9f7a2c9d6ccf6d',
        clientSecret: 'e3ace394af9f615857ceaa61b053f966ddcfb12a',
        redirectUrl: 'http://localhost',
    });

    // Check if we're logged in
    // If not, redirect the user to the OAuth2 dialog
    const loggedIn = cloudApi.isLoggedIn();
    if (!loggedIn) {
        if (cloudApi.hasAuthorizationCode()) {
            const token = cloudApi.authenticateWithAuthorizationCode();
        } else {
            window.location.href =  cloudApi.getLoginUrl();
            return;
        }
    }

    function testApi() {
        // Get the logged-in user
        const user =  cloudApi.getAuthenticatedUser();

        // Get the first Homey of the logged-in user
        const homey =  user.getFirstHomey();

        // Create a session on this Homey
        const homeyApi =  homey.authenticate();

        // Get all Zones from ManagerZones
        const zones =  homeyApi.zones.getZones();

    }

}

export default HomeyAPI