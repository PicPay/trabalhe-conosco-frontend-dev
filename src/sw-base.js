/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

/* eslint-disable */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');
/* eslint-enable */

/* eslint-disable */
workbox.routing.registerRoute(
  routeData => routeData.event.request.headers.get('accept').includes('text/html'),
  args => caches.match('/index.html')
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(args.event.request);
    }),
);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute([]);
/* eslint-enable */
