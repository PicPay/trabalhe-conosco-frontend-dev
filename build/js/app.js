"use strict";var app=angular.module("testeFrontApp",["ngRoute","ngAnimate","LocalStorageModule","ngMask"]);app.config(function(e){e.when("/",{templateUrl:"views/main.html",controller:"listCtrl"}).when("/list",{templateUrl:"views/main.html",controller:"listCtrl"}).when("/payment",{templateUrl:"views/payment.html",controller:"paymentCtrl"}).when("/card",{templateUrl:"views/card.html",controller:"creditCardCtrl"}).when("/mycards",{templateUrl:"views/mycards.html",controller:"myCardsCtrl"})}),app.factory("personToPayFactory",function(){function e(e){r=e}function t(){return r}var r=[];return{set:e,get:t}}),app.factory("creditCardsFactory",function(e){function t(e){a.push(e),localStorage.setItem("creditCards",JSON.stringify(a))}function r(){return JSON.parse(localStorage.getItem("creditCards")||"[]")}var a=JSON.parse(localStorage.getItem("creditCards")||"[]");return{set:t,get:r}}),app.controller("listCtrl",function(e,t,r,a){e.people=[],r({method:"GET",url:"http://careers.picpay.com/tests/mobdev/users"}).then(function(t){e.people=t.data},function(t){e.people=t.statusText}),e.payThisPerson=function(e){a.set(e),t.path("payment")}}),app.controller("paymentCtrl",function(e,t,r,a){e.personToPay=t.get(),e.creditCards=a.get(),e.selectedCard=null,e.lastDigits=0,e.value="",e.mountedObjectToPay={},angular.forEach(e.creditCards,function(t,r){t.is_selected&&(e.selectedCard=t,e.lastDigits=e.selectedCard.card_number.substr(e.selectedCard.card_number.length-4))}),e.pay=function(){e.mountedObjectToPay={card_number:e.selectedCard.card_number.replace(/\s+/g,""),cvv:e.selectedCard.ccv,value:e.value,expiry_date:e.selectedCard.expiry_date,destination_user_id:e.personToPay.id},r({method:"POST",url:"http://careers.picpay.com/tests/mobdev/transaction",data:e.mountedObjectToPay}).then(function(e){console.log(e)},function(t){e.people=t.statusText})}}),app.controller("creditCardCtrl",function(e,t,r){e.creditCard={card_name:"",card_number:"",cvv:null,expiry_date:"",zip:"",is_selected:!1},e.saveCard=function(){t.set(e.creditCard),r.reload()},e.getCard=function(){var e=t.get();console.log(e)}}),app.controller("myCardsCtrl",function(e,t,r,a){e.creditCards=t.get(),console.log(e.creditCards),e.targetThisCard=function(t,r){t.is_selected=!0,console.log(t),angular.forEach(e.creditCards,function(e,t){t!=r&&(e.is_selected=!1)})},e.deleteThisCard=function(t){e.creditCards.splice(t,1),localStorage.setItem("creditCards",JSON.stringify(e.creditCards))},e.chooseCard=function(){localStorage.setItem("creditCards",JSON.stringify(e.creditCards)),a.reload()}}),app.directive("testHeader",function(){return{restrict:"E",templateUrl:"views/test-header.html"}});