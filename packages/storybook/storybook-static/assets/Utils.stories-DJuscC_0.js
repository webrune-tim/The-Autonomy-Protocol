import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{$ as t,A as n,B as r,It as i,K as a,Tt as o,W as s,at as c,ct as l,dt as u,ft as d,jt as f,k as p,m,o as h,t as g,vt as _,wt as v}from"./client-BbnbT_na.js";import{a as y,i as b,n as x,r as S,t as C}from"./create-runtime-stories-CetlbWg-.js";import{t as w}from"./contrast-B-KEf352.js";function T(e,i){o(i,!1),h(),D(e,{name:`AAA Contrast Calculator`,children:(e,i)=>{let a=_(()=>[`#88c0d0`,`#bf616a`,`#2e3440`,`#ebcb8b`,`#a3be8c`,`#eceff4`]);var o=k(),h=d(l(o),4);p(h,5,()=>t(a),n,(e,n)=>{let i=_(()=>w(t(n)));var a=O(),o=l(a),p=d(o),h=u(p);f(a),c(()=>{m(a,`background-color: ${t(n)??``}; color: ${t(i)??``}; padding: 1.5rem; border-radius: 8px; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);`),r(o,`Background: ${t(n)??``} `),r(h,`Optimal Text: ${t(i)??``}`)}),s(e,a)}),f(h),f(o),s(e,o)},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<undefined {...args}>
  {@const testColors = ["#88c0d0", "#bf616a", "#2e3440", "#ebcb8b", "#a3be8c", "#eceff4"]}
<div style="font-family: var(--font-body, sans-serif); color: var(--fg, #eceff4); max-width: 800px;">
<h2>Automated AAA Contrast Calculation</h2>
<p>Using <code>getAAAContrastColor(bgColor)</code> to dynamically select the optimal accessible text color for any background color:</p>

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
  {#each testColors as bg}
    {@const text = getAAAContrastColor(bg)}
    <div style="background-color: {bg}; color: {text}; padding: 1.5rem; border-radius: 8px; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);">
      Background: {bg}
      <div style="font-size: 0.85rem; font-weight: normal; margin-top: 0.5rem;">
        Optimal Text: {text}
      </div>
    </div>
  {/each}
</div>
</div>
</undefined>`}}}),v()}var E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),y(),b(),g(),x(),E={title:`Core/Utils`,tags:[`autodocs`]},{Story:D}=S(E),O=a(`<div> <div style="font-size: 0.85rem; font-weight: normal; margin-top: 0.5rem;"> </div></div>`),k=a(`<div style="font-family: var(--font-body, sans-serif); color: var(--fg, #eceff4); max-width: 800px;"><h2>Automated AAA Contrast Calculation</h2> <p>Using <code>getAAAContrastColor(bgColor)</code> to dynamically select the optimal accessible text color for any background color:</p> <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem;"></div></div>`),T.__docgen={data:[],name:`Utils.stories.svelte`},A=C(T,E),j=[`AAAContrastCalculator`],M={...A.AAAContrastCalculator,tags:[`svelte-csf-v5`]}})))()}N();export{M as AAAContrastCalculator,j as __namedExportsOrder,E as default};