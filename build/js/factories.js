"use strict";app.factory("receiptFactory",function(){function t(t){e=t}function r(){return e}var e=[];return{set:t,get:r}}),app.factory("personToPayFactory",function(){function t(t){e=t}function r(){return e}var e=[];return{set:t,get:r}}),app.factory("creditCardsFactory",function(t){function r(t){n.push(t),localStorage.setItem("creditCards",JSON.stringify(n))}function e(){return JSON.parse(localStorage.getItem("creditCards")||"[]")}var n=JSON.parse(localStorage.getItem("creditCards")||"[]");return{set:r,get:e}});