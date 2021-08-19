// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: 'reg-covid',
  env: 'local',
  company: 'SGS',
  ENDPOINTS: {
    API_URL: 'http://192.168.1.246:47/',
    // API_URL: 'http://181.224.231.3:41/',
    // API_URL: 'https://localhost:44364/'
  },
  KEYS: {
    CRYPTO: 'byyQOSmbwq6IuCDFkBnipv1j46EJGObf',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
