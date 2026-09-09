import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{$ as t,At as n,F as r,G as i,It as a,K as o,L as s,M as c,P as l,Tt as u,W as d,X as f,Y as p,_t as m,a as h,ct as g,ft as _,gt as v,i as y,jt as b,lt as x,o as S,t as C,wt as w}from"./client-BbnbT_na.js";import{a as T,i as E,n as D,r as O,t as k}from"./create-runtime-stories-CetlbWg-.js";import{n as A,t as j}from"./Icon--FmQZk2f.js";function M(e,t){let n=y(t,N),r=[[`path`,{d:`M18 6 6 18`}],[`path`,{d:`m6 6 12 12`}]];j(e,h({name:`x`},()=>n,{get iconNode(){return r}}))}var N;function P(){return(P=e((()=>{a(),C(),A(),N=new Set([`$$slots`,`$$events`,`$$legacy`])})))()}function F(e,a){u(a,!0);let o=m(!1);r(()=>{try{localStorage.getItem(a.bannerName)===`dismissed`&&v(o,!0)}catch{}});function l(){v(o,!0);try{localStorage.setItem(a.bannerName,`dismissed`)}catch{}}var p=i(),h=x(p),y=e=>{var t=I(),r=g(t);M(g(r),{size:20}),n(2),b(r);var i=_(r,2),o=g(i);s(o,()=>a.children),b(i),b(t),f(`click`,r,l),d(e,t)};c(h,e=>{t(o)||e(y)}),d(e,p),w()}var I;function L(){return(L=e((()=>{a(),C(),l(),P(),I=o(`<div class="banner svelte-17kfg2y"><button class="dismiss-button svelte-17kfg2y" aria-label="Dismiss banner"><!> <span class="sr-only">Dismiss banner</span></button> <div class="banner-body svelte-17kfg2y"><!></div></div>`),p([`click`]),F.__docgen={data:[{name:`bannerName`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`any`,text:`any`},static:!1,readonly:!1},{name:`children`,visibility:`public`,keywords:[{name:`required`,description:``}],kind:`let`,type:{kind:`type`,type:`any`,text:`any`},static:!1,readonly:!1}],name:`Banner.svelte`}})))()}function R(){return(R=e((()=>{L()})))()}function z(e,t){u(t,!1),S();var n=W(),r=x(n);V(r,{name:`System Advisory`,children:(e,t)=>{F(e,{bannerName:`advisory-notice`,children:e=>{var t=H();d(e,t)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Banner {...args}>
  <Banner bannerName="advisory-notice">
{#snippet children()}
  <p>
    <strong>Curriculum Notice:</strong> Fall Term 1 begins next Monday.
    Ensure all advisor assessments and baseline cognitive inventories are submitted.
  </p>
{/snippet}
</Banner>
</Banner>`}}});var i=_(r,2);V(i,{name:`With Action Link`,children:(e,t)=>{F(e,{bannerName:`restorative-notice`,children:e=>{var t=U();d(e,t)},$$slots:{default:!0}})},$$slots:{default:!0},parameters:{__svelteCsf:{rawCode:`<Banner {...args}>
  <Banner bannerName="restorative-notice">
{#snippet children()}
  <p>
    Restorative Action protocol updated for 2026 CTE standards.
    <a href="#view-protocol">Review the compliance documentation</a>.
  </p>
{/snippet}
</Banner>
</Banner>`}}}),d(e,n),w()}var B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{a(),T(),E(),R(),C(),D(),B={title:`Blocks/Banner`,component:F,tags:[`autodocs`]},{Story:V}=O(B),H=o(`<p><strong>Curriculum Notice:</strong> Fall Term 1 begins next Monday.
        Ensure all advisor assessments and baseline cognitive inventories are submitted.</p>`),U=o(`<p>Restorative Action protocol updated for 2026 CTE standards. <a href="#view-protocol">Review the compliance documentation</a>.</p>`),W=o(`<!> <!>`,1),z.__docgen={data:[],name:`Banner.stories.svelte`},G=k(z,B),K=[`SystemAdvisory`,`WithActionLink`],q={...G.SystemAdvisory,tags:[`svelte-csf-v5`]},J={...G.WithActionLink,tags:[`svelte-csf-v5`]}})))()}Y();export{q as SystemAdvisory,J as WithActionLink,K as __namedExportsOrder,B as default};