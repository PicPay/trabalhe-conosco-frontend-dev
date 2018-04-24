"use strict";var app=angular.module("testeFrontApp",["ngRoute","ngAnimate","LocalStorageModule"]);app.config(function(t){t.when("/",{templateUrl:"views/main.html",controller:"listCtrl"}).when("/list",{templateUrl:"views/main.html",controller:"listCtrl"}).when("/payment",{templateUrl:"views/payment.html",controller:"paymentCtrl"}).when("/card",{templateUrl:"views/card.html",controller:"creditCardCtrl"})}),app.factory("personToPayFactory",function(){function t(t){r=t}function e(){return r}var r=[];return{set:t,get:e}}),app.controller("listCtrl",function(t,e,r,n){t.people=[],r({method:"GET",url:"http://careers.picpay.com/tests/mobdev/users"}).then(function(e){t.people=e.data},function(e){t.people=e.statusText}),t.payThisPerson=function(t){n.set(t),e.path("payment")}}),app.controller("paymentCtrl",function(t,e,r){t.personToPay=e.get(),t.creditCards=[],t.creditCards=r.get("creditCards"),console.log(t.creditCards)}),app.controller("creditCardCtrl",function(t,e){t.creditCard={card_name:"",card_number:"",cvv:0,expiry_date:"",zip:""},t.saveCard=function(){e.set("creditCards",t.creditCard)},t.getCard=function(){var t=e.get("creditCards");console.log(t)}}),app.directive("testHeader",function(){return{restrict:"E",templateUrl:"views/test-header.html"}});