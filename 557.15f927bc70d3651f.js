"use strict";(self.webpackChunkgemini_angular=self.webpackChunkgemini_angular||[]).push([[557],{3557:(h,_,n)=>{n.r(_),n.d(_,{GeminiProTextComponent:()=>p});var g=n(467),e=n(4438),r=n(4350),l=n(5312),m=n(697);const d=new r.ij(l.c.API_KEY).getGenerativeModel({model:"gemini-pro",safetySettings:[{category:r.DE.HARM_CATEGORY_HARASSMENT,threshold:r.vk.BLOCK_ONLY_HIGH}],maxOutputTokens:100});let p=(()=>{class o{constructor(){this.messages=(0,e.vPA)([])}enter(t){this.updateMessage(t),this.sendMessage(t)}updateMessage(t,s=!0){t&&this.messages.set([...this.messages(),{content:t,isUser:s}])}sendMessage(t){var s=this;return(0,g.A)(function*(){const a=yield(yield d.generateContent(t)).response;console.log(a.candidates?.[0].content.parts[0].text),console.log(a.text()),s.updateMessage(a.text(),!1)})()}static#e=this.\u0275fac=function(s){return new(s||o)};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["ga-gemini-pro-text"]],standalone:!0,features:[e.aNF],decls:3,vars:1,consts:[[3,"send","messages"]],template:function(s,i){1&s&&(e.j41(0,"h5"),e.EFF(1,"Text from text-only input (text)"),e.k0s(),e.j41(2,"ga-chat",0),e.bIt("send",function(E){return i.enter(E)}),e.k0s()),2&s&&(e.R7$(2),e.Y8G("messages",i.messages()))},dependencies:[m.K]})}return o})()}}]);