// TEST okta domain endpoint for testing
export const OKTA_DOMAIN = 'dev-6150636.okta.com';

// test login credentials:
// username: test@drybar.com
// password: blueberry@2020

// server config
export default {
    url: 'http:///142.93.214.3',
    issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
    redirectUri: `${window.location.origin}/login/callback`,
    pkce: false,
    clientId: '0oa23ckgrq9BGU3jA5d6',
    token: '00aS2lulFI8xJGnVSGVhJk9DjQ1BthoEIo32z16fyx',
    googleIdp: '0oa37etyyGEmyg8kw5d6',
    facebookIdp: '0oa25mv7fIA0iVTTD5d6',
};

// dev config

// export default {
//     url: 'http://localhost:3000',
//     issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
//     redirectUri: `${window.location.origin}/login/callback`,
//     pkce: false,
//     clientId: '0oa25kwxurm0FddCC5d6',
//     devMode: true,
//     token: '00aS2lulFI8xJGnVSGVhJk9DjQ1BthoEIo32z16fyx',
//     googleIdp: '0oa37etyyGEmyg8kw5d6',
//     facebookIdp: '0oa25mv7fIA0iVTTD5d6',
// };
