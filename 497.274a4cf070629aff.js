"use strict";(self.webpackChunkgemini_angular=self.webpackChunkgemini_angular||[]).push([[497],{4497:(B,g,r)=>{r.r(g),r.d(g,{GeminiProVisionImagesComponent:()=>b});var d=r(467),e=r(4438),p=r(1626),f=r(9350),v=r(7707);let C=(()=>{class o{constructor(){this.http=(0,e.WQX)(p.Qq)}convertToBase64(s){var t=this;return(0,d.A)(function*(){const n=yield function y(o,h){const s="object"==typeof h;return new Promise((t,n)=>{const i=new v.Ms({next:c=>{t(c),i.unsubscribe()},error:n,complete:()=>{s?t(h.defaultValue):n(new f.G)}});o.subscribe(i)})}(t.http.get(s,{responseType:"blob"}));return new Promise((i,c)=>{const a=new FileReader;a.onloadend=()=>{const l=a.result;i(l.substring(l.indexOf(",")+1))},a.onerror=l=>{c(l)},a.readAsDataURL(n)})})()}static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var m=r(4350),G=r(5312),T=r(697);const u="assets/pankaj.jpeg",M=new m.ij(G.c.API_KEY).getGenerativeModel({model:"gemini-1.5-pro",safetySettings:[{category:m.DE.HARM_CATEGORY_HARASSMENT,threshold:m.vk.BLOCK_ONLY_HIGH}],maxOutputTokens:100});let b=(()=>{class o{constructor(){this.messages=(0,e.vPA)([]),this.img=u,this.fileConversionService=(0,e.WQX)(C)}enter(s){this.updateMessage(s),this.sendMessage(s)}updateMessage(s,t=!0){s&&this.messages.set([...this.messages(),{content:s,isUser:t}])}sendMessage(s){var t=this;return(0,d.A)(function*(){try{let n=yield t.fileConversionService.convertToBase64(u);if("string"!=typeof n)return void console.error("Image conversion to Base64 failed.");let i=[{inlineData:{mimeType:"image/jpeg",data:n}},{text:s}];const a=yield(yield M.generateContent(i)).response;console.log(a.candidates?.[0].content.parts[0].text),console.log(a),t.updateMessage(a.candidates?.[0].content.parts[0].text??"",!1)}catch(n){console.error("Error converting file to Base64",n)}})()}static#e=this.\u0275fac=function(t){return new(t||o)};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["ga-gemini-pro-vision-images"]],standalone:!0,features:[e.aNF],decls:4,vars:2,consts:[["width","350",3,"src"],[3,"send","messages"]],template:function(t,n){1&t&&(e.j41(0,"h5"),e.EFF(1,"Text from text-and-images input (multimodal)"),e.k0s(),e.nrm(2,"img",0),e.j41(3,"ga-chat",1),e.bIt("send",function(c){return n.enter(c)}),e.k0s()),2&t&&(e.R7$(2),e.Y8G("src",n.img,e.B4B),e.R7$(),e.Y8G("messages",n.messages()))},dependencies:[T.K],styles:["[_nghost-%COMP%]     ga-chat .chat-list{height:calc(100% - 450px)}"]})}return o})()}}]);