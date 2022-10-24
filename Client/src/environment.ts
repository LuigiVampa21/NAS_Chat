// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  BASE_SERVER_URL: 'http://localhost:3001',
  USER_REGISTER: 'http://localhost:3001/api/v1/chatApp/auth/register',
  USER_LOGIN: 'http://localhost:3001/api/v1/chatApp/auth/login',
  USER_FORGOT_PASSWORD:'http://localhost:3001/api/v1/chatApp/auth/forgot-password/',
  USER_RESET_PASSWORD:'http://localhost:3001/api/v1/chatApp/auth/reset-password/',
  USER_UPLOAD_PHOTO: 'http://localhost:3001/api/v1/chatApp/users/upload-photo/',
  USER_UPDATE_PWD: 'http://localhost:3001/api/v1/chatApp/users/update-password/',
  MESSAGE_URL: 'http://localhost:3001/api/v1/chatApp/messages/',
  GET_SINGLE_USER_BY_ID: 'http://localhost:3001/api/v1/chatApp/users/',
  GET_SINGLE_ROOM_BY_ID: 'http://localhost:3001/api/v1/chatApp/rooms/',
  GET_SINGLE_CALL_BY_ID: 'http://localhost:3001/api/v1/chatApp/calls/',
  NOTIFICATION_URL: 'http://localhost:3001/api/v1/chatApp/notifications/',


  DELETE_NOTIFICATION_FROM_USER : 'http://localhost:3001/api/v1/chatApp/users/delete/notification/',



  // BASE_SERVER_URL: 'http://192.168.0.46:3001',
  // USER_REGISTER: 'http://192.168.0.23:3001/api/v1/chatApp/auth/register',
  // USER_LOGIN: 'http://192.168.0.23:3001/api/v1/chatApp/auth/login',
  // GET_SINGLE_USER_BY_ID: 'http://192.168.0.23:3001/api/v1/chatApp/users/',
  // GET_SINGLE_ROOM_BY_ID: 'http://192.168.0.23:3001/api/v1/chatApp/rooms/',
  // GET_SINGLE_CALL_BY_ID: 'http://192.168.0.23:3001/api/v1/chatApp/calls/',
  // MESSAGE_URL: 'http://192.168.0.23:3001/api/v1/chatApp/messages/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
