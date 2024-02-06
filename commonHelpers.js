import"./assets/modulepreload-polyfill-ec808ebb.js";import{f,i as p}from"./assets/vendor-651d7991.js";let r;const o=document.querySelector("button"),i=document.querySelector("#datetime-picker"),y=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),k=document.querySelector("[data-seconds]");function T(t){const d=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:d,hours:l,minutes:m,seconds:h}}class g{constructor(e){this.intervalId=null,this.tick=e}start(){const e=r.getTime();this.intervalId=setInterval(()=>{const c=Date.now(),s=e-c;if(s<=0){clearInterval(this.intervalId),this.tick({days:0,hours:0,minutes:0,seconds:0});return}const u=T(s);this.tick(u)},1e3)}}function v(t){y.textContent=n(t.days),b.textContent=n(t.hours),S.textContent=n(t.minutes),k.textContent=n(t.seconds)}const C=new g(v);let a=!1;o.addEventListener("click",()=>{C.start(),a=!0,o.disabled=!0,i.disabled=!0});function n(t){return String(t).padStart(2,"0")}const I={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],r<new Date?(p.show({message:"Please choose a date in the future",backgroundColor:"red",messageColor:"white",position:"topCenter",transitionIn:"bounceInDown",timeout:3e3,zindex:999,close:!1,iconUrl:"../partials/highlight_off_black_24dp.svg"}),a||(o.disabled=!0)):a||(o.disabled=!1,i.disabled=!1)}};f(i,I);
//# sourceMappingURL=commonHelpers.js.map
