var at=e=>{throw TypeError(e)};var H=(e,t,s)=>t.has(e)||at("Cannot "+s);var i=(e,t,s)=>(H(e,t,"read from private field"),s?s.call(e):t.get(e)),p=(e,t,s)=>t.has(e)?at("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),c=(e,t,s,r)=>(H(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),l=(e,t,s)=>(H(e,t,"access private method"),s);import{S as yt,c as C,s as K,d as k,n as gt,i as nt,e as ht,t as vt,f as Rt,g as mt,h as ot,k as dt,r as E,u as Ct,a as Ot}from"./index-BejWJpGB.js";var y,a,_,b,F,T,m,B,U,D,w,x,Q,M,n,L,N,q,G,J,X,Y,Z,ft,lt,St=(lt=class extends yt{constructor(t,s){super();p(this,n);p(this,y);p(this,a);p(this,_);p(this,b);p(this,F);p(this,T);p(this,m);p(this,B);p(this,U);p(this,D);p(this,w);p(this,x);p(this,Q);p(this,M,new Set);this.options=s,c(this,y,t),c(this,m,null),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(i(this,a).addObserver(this),ut(i(this,a),this.options)?l(this,n,L).call(this):this.updateResult(),l(this,n,J).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return $(i(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return $(i(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,n,X).call(this),l(this,n,Y).call(this),i(this,a).removeObserver(this)}setOptions(t,s){const r=this.options,d=i(this,a);if(this.options=i(this,y).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof C(this.options.enabled,i(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");l(this,n,Z).call(this),i(this,a).setOptions(this.options),r._defaulted&&!K(this.options,r)&&i(this,y).getQueryCache().notify({type:"observerOptionsUpdated",query:i(this,a),observer:this});const u=this.hasListeners();u&&ct(i(this,a),d,this.options,r)&&l(this,n,L).call(this),this.updateResult(s),u&&(i(this,a)!==d||C(this.options.enabled,i(this,a))!==C(r.enabled,i(this,a))||k(this.options.staleTime,i(this,a))!==k(r.staleTime,i(this,a)))&&l(this,n,N).call(this);const h=l(this,n,q).call(this);u&&(i(this,a)!==d||C(this.options.enabled,i(this,a))!==C(r.enabled,i(this,a))||h!==i(this,Q))&&l(this,n,G).call(this,h)}getOptimisticResult(t){const s=i(this,y).getQueryCache().build(i(this,y),t),r=this.createResult(s,t);return Qt(this,r)&&(c(this,b,r),c(this,T,this.options),c(this,F,i(this,a).state)),r}getCurrentResult(){return i(this,b)}trackResult(t,s){const r={};return Object.keys(t).forEach(d=>{Object.defineProperty(r,d,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(d),s==null||s(d),t[d])})}),r}trackProp(t){i(this,M).add(t)}getCurrentQuery(){return i(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=i(this,y).defaultQueryOptions(t),r=i(this,y).getQueryCache().build(i(this,y),s);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,s))}fetch(t){return l(this,n,L).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),i(this,b)))}createResult(t,s){var rt;const r=i(this,a),d=this.options,u=i(this,b),h=i(this,F),f=i(this,T),O=t!==r?t.state:i(this,_),{state:S}=t;let o={...S},P=!1,g;if(s._optimisticResults){const v=this.hasListeners(),z=!v&&ut(t,s),bt=v&&ct(t,r,s,d);(z||bt)&&(o={...o,...mt(S.data,t.options)}),s._optimisticResults==="isRestoring"&&(o.fetchStatus="idle")}let{error:A,errorUpdatedAt:et,status:I}=o;if(s.select&&o.data!==void 0)if(u&&o.data===(h==null?void 0:h.data)&&s.select===i(this,B))g=i(this,U);else try{c(this,B,s.select),g=s.select(o.data),g=ot(u==null?void 0:u.data,g,s),c(this,U,g),c(this,m,null)}catch(v){c(this,m,v)}else g=o.data;if(s.placeholderData!==void 0&&g===void 0&&I==="pending"){let v;if(u!=null&&u.isPlaceholderData&&s.placeholderData===(f==null?void 0:f.placeholderData))v=u.data;else if(v=typeof s.placeholderData=="function"?s.placeholderData((rt=i(this,D))==null?void 0:rt.state.data,i(this,D)):s.placeholderData,s.select&&v!==void 0)try{v=s.select(v),c(this,m,null)}catch(z){c(this,m,z)}v!==void 0&&(I="success",g=ot(u==null?void 0:u.data,v,s),P=!0)}i(this,m)&&(A=i(this,m),g=i(this,U),et=Date.now(),I="error");const j=o.fetchStatus==="fetching",V=I==="pending",W=I==="error",st=V&&j,it=g!==void 0;return{status:I,fetchStatus:o.fetchStatus,isPending:V,isSuccess:I==="success",isError:W,isInitialLoading:st,isLoading:st,data:g,dataUpdatedAt:o.dataUpdatedAt,error:A,errorUpdatedAt:et,failureCount:o.fetchFailureCount,failureReason:o.fetchFailureReason,errorUpdateCount:o.errorUpdateCount,isFetched:o.dataUpdateCount>0||o.errorUpdateCount>0,isFetchedAfterMount:o.dataUpdateCount>O.dataUpdateCount||o.errorUpdateCount>O.errorUpdateCount,isFetching:j,isRefetching:j&&!V,isLoadingError:W&&!it,isPaused:o.fetchStatus==="paused",isPlaceholderData:P,isRefetchError:W&&it,isStale:tt(t,s),refetch:this.refetch}}updateResult(t){const s=i(this,b),r=this.createResult(i(this,a),this.options);if(c(this,F,i(this,a).state),c(this,T,this.options),i(this,F).data!==void 0&&c(this,D,i(this,a)),K(r,s))return;c(this,b,r);const d={},u=()=>{if(!s)return!0;const{notifyOnChangeProps:h}=this.options,f=typeof h=="function"?h():h;if(f==="all"||!f&&!i(this,M).size)return!0;const R=new Set(f??i(this,M));return this.options.throwOnError&&R.add("error"),Object.keys(i(this,b)).some(O=>{const S=O;return i(this,b)[S]!==s[S]&&R.has(S)})};(t==null?void 0:t.listeners)!==!1&&u()&&(d.listeners=!0),l(this,n,ft).call(this,{...d,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,n,J).call(this)}},y=new WeakMap,a=new WeakMap,_=new WeakMap,b=new WeakMap,F=new WeakMap,T=new WeakMap,m=new WeakMap,B=new WeakMap,U=new WeakMap,D=new WeakMap,w=new WeakMap,x=new WeakMap,Q=new WeakMap,M=new WeakMap,n=new WeakSet,L=function(t){l(this,n,Z).call(this);let s=i(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(gt)),s},N=function(){l(this,n,X).call(this);const t=k(this.options.staleTime,i(this,a));if(nt||i(this,b).isStale||!ht(t))return;const r=vt(i(this,b).dataUpdatedAt,t)+1;c(this,w,setTimeout(()=>{i(this,b).isStale||this.updateResult()},r))},q=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(i(this,a)):this.options.refetchInterval)??!1},G=function(t){l(this,n,Y).call(this),c(this,Q,t),!(nt||C(this.options.enabled,i(this,a))===!1||!ht(i(this,Q))||i(this,Q)===0)&&c(this,x,setInterval(()=>{(this.options.refetchIntervalInBackground||Rt.isFocused())&&l(this,n,L).call(this)},i(this,Q)))},J=function(){l(this,n,N).call(this),l(this,n,G).call(this,l(this,n,q).call(this))},X=function(){i(this,w)&&(clearTimeout(i(this,w)),c(this,w,void 0))},Y=function(){i(this,x)&&(clearInterval(i(this,x)),c(this,x,void 0))},Z=function(){const t=i(this,y).getQueryCache().build(i(this,y),this.options);if(t===i(this,a))return;const s=i(this,a);c(this,a,t),c(this,_,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},ft=function(t){dt.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(i(this,b))}),i(this,y).getQueryCache().notify({query:i(this,a),type:"observerResultsUpdated"})})},lt);function Et(e,t){return C(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function ut(e,t){return Et(e,t)||e.state.data!==void 0&&$(e,t,t.refetchOnMount)}function $(e,t,s){if(C(t.enabled,e)!==!1){const r=typeof s=="function"?s(e):s;return r==="always"||r!==!1&&tt(e,t)}return!1}function ct(e,t,s,r){return(e!==t||C(r.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&tt(e,s)}function tt(e,t){return C(t.enabled,e)!==!1&&e.isStaleByTime(k(t.staleTime,e))}function Qt(e,t){return!K(e.getCurrentResult(),t)}var pt=E.createContext(!1),It=()=>E.useContext(pt);pt.Provider;function Ft(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var wt=E.createContext(Ft()),xt=()=>E.useContext(wt);function Tt(e,t){return typeof e=="function"?e(...t):!!e}var Ut=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},Dt=e=>{E.useEffect(()=>{e.clearReset()},[e])},Mt=({result:e,errorResetBoundary:t,throwOnError:s,query:r})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&Tt(s,[e.error,r]),Pt=e=>{e.suspense&&(typeof e.staleTime!="number"&&(e.staleTime=1e3),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3)))},Lt=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,_t=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function Bt(e,t,s){var O,S,o,P;const r=Ct(),d=It(),u=xt(),h=r.defaultQueryOptions(e);(S=(O=r.getDefaultOptions().queries)==null?void 0:O._experimental_beforeQuery)==null||S.call(O,h),h._optimisticResults=d?"isRestoring":"optimistic",Pt(h),Ut(h,u),Dt(u);const[f]=E.useState(()=>new t(r,h)),R=f.getOptimisticResult(h);if(E.useSyncExternalStore(E.useCallback(g=>{const A=d?()=>{}:f.subscribe(dt.batchCalls(g));return f.updateResult(),A},[f,d]),()=>f.getCurrentResult(),()=>f.getCurrentResult()),E.useEffect(()=>{f.setOptions(h,{listeners:!1})},[h,f]),Lt(h,R))throw _t(h,f,u);if(Mt({result:R,errorResetBoundary:u,throwOnError:h.throwOnError,query:r.getQueryCache().get(h.queryHash)}))throw R.error;return(P=(o=r.getDefaultOptions().queries)==null?void 0:o._experimental_afterQuery)==null||P.call(o,h,R),h.notifyOnChangeProps?R:f.trackResult(R)}function At(e,t){return Bt(e,St)}function Wt(e,t){const{data:s,isLoading:r,isError:d}=At({queryKey:[t],queryFn:()=>u(),select:h=>h.data.data});async function u(){return Ot.get(e)}return{data:s,isLoading:r,isError:d}}export{Wt as u};
