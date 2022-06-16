// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productsUrl: 'http://localhost:3001/api/products/',
  cartUrl: 'http://localhost:3001/api/cart/',
  cartItemsUrl: 'http://localhost:3001/api/cart/items/',
  productImageUrl: 'http://localhost:3001/api/product/image/',
  categoriesUrl: 'http://localhost:3001/api/products/categories',
  register1Url: 'http://localhost:3001/api/auth/register1/',
  register2Url: 'http://localhost:3001/api/auth/register2/',
  loginUrl: 'http://localhost:3001/api/auth/login/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
