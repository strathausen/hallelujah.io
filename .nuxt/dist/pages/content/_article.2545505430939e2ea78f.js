webpackJsonp([2],{"73AI":function(t,a,e){"use strict";var s=function(){var t=this.$createElement,a=this._self._c||t;return a("section",{staticClass:"content"},[a("nuxt-link",{attrs:{to:"/"}},[this._v(" < back to search")]),a("h1",[this._v(this._s(this.post.title))]),a("div",{domProps:{innerHTML:this._s(this.post.body)}})],1)};s._withStripped=!0;var n={render:s,staticRenderFns:[]};a.a=n},AdbY:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("go9F"),n=e("73AI"),i=!1;var o=function(t){i||e("pRUM")},r=e("VU/8")(s.a,n.a,!1,o,"data-v-69fef2f4",null);r.options.__file="pages/content/_article.vue",a.default=r.exports},f1md:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,".content[data-v-69fef2f4]{max-width:700px}",""])},go9F:function(t,a,e){"use strict";a.a={asyncData:async function({app:t,params:a,payload:e}){return{post:await t.$axios.$get(`/api/content/${a.article}`)}}}},pRUM:function(t,a,e){var s=e("f1md");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("5a8fb448",s,!1,{sourceMap:!1})}});