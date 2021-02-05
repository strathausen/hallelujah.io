(function (e) { function t(t) { for (var o, n, s = t[0], l = t[1], u = t[2], i = 0, d = []; i < s.length; i++)
    n = s[i], Object.prototype.hasOwnProperty.call(c, n) && c[n] && d.push(c[n][0]), c[n] = 0; for (o in l)
    Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]); b && b(t); while (d.length)
    d.shift()(); return a.push.apply(a, u || []), r(); } function r() { for (var e, t = 0; t < a.length; t++) {
    for (var r = a[t], o = !0, n = 1; n < r.length; n++) {
        var s = r[n];
        0 !== c[s] && (o = !1);
    }
    o && (a.splice(t--, 1), e = l(l.s = r[0]));
} return e; } var o = {}, n = { app: 0 }, c = { app: 0 }, a = []; function s(e) { return l.p + "js/" + ({ about: "about" }[e] || e) + "." + { about: "2f5a4d6d" }[e] + ".js"; } function l(t) { if (o[t])
    return o[t].exports; var r = o[t] = { i: t, l: !1, exports: {} }; return e[t].call(r.exports, r, r.exports, l), r.l = !0, r.exports; } l.e = function (e) { var t = [], r = { about: 1 }; n[e] ? t.push(n[e]) : 0 !== n[e] && r[e] && t.push(n[e] = new Promise((function (t, r) { for (var o = "css/" + ({ about: "about" }[e] || e) + "." + { about: "ec8734ec" }[e] + ".css", c = l.p + o, a = document.getElementsByTagName("link"), s = 0; s < a.length; s++) {
    var u = a[s], i = u.getAttribute("data-href") || u.getAttribute("href");
    if ("stylesheet" === u.rel && (i === o || i === c))
        return t();
} var d = document.getElementsByTagName("style"); for (s = 0; s < d.length; s++) {
    u = d[s], i = u.getAttribute("data-href");
    if (i === o || i === c)
        return t();
} var b = document.createElement("link"); b.rel = "stylesheet", b.type = "text/css", b.onload = t, b.onerror = function (t) { var o = t && t.target && t.target.src || c, a = new Error("Loading CSS chunk " + e + " failed.\n(" + o + ")"); a.code = "CSS_CHUNK_LOAD_FAILED", a.request = o, delete n[e], b.parentNode.removeChild(b), r(a); }, b.href = c; var p = document.getElementsByTagName("head")[0]; p.appendChild(b); })).then((function () { n[e] = 0; }))); var o = c[e]; if (0 !== o)
    if (o)
        t.push(o[2]);
    else {
        var a = new Promise((function (t, r) { o = c[e] = [t, r]; }));
        t.push(o[2] = a);
        var u, i = document.createElement("script");
        i.charset = "utf-8", i.timeout = 120, l.nc && i.setAttribute("nonce", l.nc), i.src = s(e);
        var d = new Error;
        u = function (t) { i.onerror = i.onload = null, clearTimeout(b); var r = c[e]; if (0 !== r) {
            if (r) {
                var o = t && ("load" === t.type ? "missing" : t.type), n = t && t.target && t.target.src;
                d.message = "Loading chunk " + e + " failed.\n(" + o + ": " + n + ")", d.name = "ChunkLoadError", d.type = o, d.request = n, r[1](d);
            }
            c[e] = void 0;
        } };
        var b = setTimeout((function () { u({ type: "timeout", target: i }); }), 12e4);
        i.onerror = i.onload = u, document.head.appendChild(i);
    } return Promise.all(t); }, l.m = e, l.c = o, l.d = function (e, t, r) { l.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }); }, l.r = function (e) { "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, l.t = function (e, t) { if (1 & t && (e = l(e)), 8 & t)
    return e; if (4 & t && "object" === typeof e && e && e.__esModule)
    return e; var r = Object.create(null); if (l.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
    for (var o in e)
        l.d(r, o, function (t) { return e[t]; }.bind(null, o)); return r; }, l.n = function (e) { var t = e && e.__esModule ? function () { return e["default"]; } : function () { return e; }; return l.d(t, "a", t), t; }, l.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, l.p = "/", l.oe = function (e) { throw console.error(e), e; }; var u = window["webpackJsonp"] = window["webpackJsonp"] || [], i = u.push.bind(u); u.push = t, u = u.slice(); for (var d = 0; d < u.length; d++)
    t(u[d]); var b = i; a.push([0, "chunk-vendors"]), r(); })({ 0: function (e, t, r) { e.exports = r("cd49"); }, "1d65": function (e, t, r) {
        "use strict";
        r("8a12");
    }, 6425: function (e, t, r) {
        "use strict";
        r("ddb0");
    }, 7613: function (e, t, r) {
        "use strict";
        r("c5ab");
    }, "8a12": function (e, t, r) { }, c5ab: function (e, t, r) { }, cd49: function (e, t, r) {
        "use strict";
        r.r(t);
        var o = r("7a23");
        const n = { id: "nav" };
        function c(e, t, r, c, a, s) { const l = Object(o["w"])("theme-color"), u = Object(o["w"])("router-view"); return Object(o["p"])(), Object(o["d"])("div", { class: "app-container", style: { "--main-color": e.themeColor.color.fg, "--background-color": e.themeColor.color.bg, "--secondary-color": e.themeColor.color.sc } }, [Object(o["g"])("div", n, [Object(o["g"])(l)]), Object(o["g"])(u, { class: "main-container" })], 4); }
        const a = Object(o["D"])("data-v-54ac2b32");
        Object(o["s"])("data-v-54ac2b32");
        const s = { class: "dropdown-content" };
        Object(o["q"])();
        const l = a((function (e, t, r, n, c, a) { return Object(o["p"])(), Object(o["d"])("div", { class: "color-square dropdown", style: { backgroundColor: n.themeColor.color.fg, borderColor: n.themeColor.color.bg } }, [Object(o["g"])("div", s, [(Object(o["p"])(!0), Object(o["d"])(o["a"], null, Object(o["v"])(n.themeColors, (e, t) => (Object(o["p"])(), Object(o["d"])("div", { class: ["color-square", { active: e.fg === n.themeColor.color.fg }], style: { backgroundColor: e.fg, borderColor: e.bg }, onClick: e => n.setThemeColor(t) }, [Object(o["g"])("div", { class: "inner-square", style: { backgroundColor: e.sc } }, null, 4)], 14, ["onClick"]))), 256))])], 4); })), u = [{ fg: "#193e80", sc: "crimson", bg: "#f3f5f2" }, { fg: "#f3f5f2", sc: "hotpink", bg: "#092760" }, { fg: "#c02c1a", sc: "limegreen", bg: "#f2f3f5" }, { fg: "#3e7523", sc: "orange", bg: "#f5f3f2" }, { fg: "#000", sc: "gray", bg: "#fff" }, { fg: "#fff", sc: "gray", bg: "#000" }], i = Object(o["t"])({ color: u[parseInt(localStorage.themeColor, 10) || 0] });
        function d() { const e = e => { i.color = u[e], localStorage.themeColor = e; }; return { setThemeColor: e, themeColor: i, themeColors: u }; }
        var b = { setup() { const { themeColors: e, setThemeColor: t, themeColor: r } = d(); return { themeColor: r, themeColors: e, setThemeColor: t }; } };
        r("1d65");
        b.render = l, b.__scopeId = "data-v-54ac2b32";
        var p = b, f = Object(o["h"])({ components: { "theme-color": p }, setup() { const { themeColor: e } = d(); return { themeColor: e }; } });
        r("6425");
        f.render = c;
        var j = f, O = r("6c02");
        const g = { class: "home" };
        function v(e, t, r, n, c, a) { const s = Object(o["w"])("ReportManagement"); return Object(o["p"])(), Object(o["d"])("div", g, [Object(o["g"])(s)]); }
        const h = Object(o["D"])("data-v-5e76effa");
        Object(o["s"])("data-v-5e76effa");
        const m = { class: "report-page" }, C = Object(o["g"])("h1", null, "hallelujah.io", -1), y = { class: "main" }, w = { class: "left" }, k = { class: "filter" }, S = { class: "search" }, _ = Object(o["g"])("label", { for: "search" }, "search: ", -1), T = Object(o["g"])("hr", null, null, -1), B = { class: "report-rows" }, E = { class: "teaser" }, x = { key: 0, class: "report-edit" }, P = { class: "dropdown" }, q = Object(o["f"])("ESV "), A = Object(o["g"])("span", { class: "action" }, "▾ ", -1), I = { class: "dropdown-content" }, R = { class: "dropdown-items" }, L = Object(o["g"])("hr", null, null, -1);
        Object(o["q"])();
        const M = h((function (e, t, r, n, c, a) { const s = Object(o["w"])("BibleChapter"); return Object(o["p"])(), Object(o["d"])("div", m, [C, Object(o["g"])("div", y, [Object(o["g"])("div", w, [Object(o["g"])("div", k, [Object(o["g"])("div", S, [_, Object(o["C"])(Object(o["g"])("input", { id: "search", "onUpdate:modelValue": t[1] || (t[1] = t => e.search = t) }, null, 512), [[o["A"], e.search]])])]), T, Object(o["g"])("div", B, [(Object(o["p"])(!0), Object(o["d"])(o["a"], null, Object(o["v"])(e.reports, t => (Object(o["p"])(), Object(o["d"])("div", { class: "report-row", key: t.id }, [Object(o["g"])("div", { class: ["report-preview", { selected: e.selectedReport && t.id === e.selectedReport.id }], onClick: r => e.selectedReport = t }, [Object(o["g"])("div", E, Object(o["y"])(t.text), 1)], 10, ["onClick"])]))), 128))])]), e.selectedReport ? (Object(o["p"])(), Object(o["d"])("div", x, [Object(o["g"])("div", null, [Object(o["g"])("span", P, [q, A, Object(o["g"])("div", I, [Object(o["g"])("div", R, [Object(o["g"])("div", { class: "dropdown-item", onClick: t[2] || (t[2] = () => e.onStatusChange("in_review")) }, "GNC"), Object(o["g"])("div", { class: "dropdown-item", onClick: t[3] || (t[3] = () => e.onStatusChange("ok")) }, "LUT"), Object(o["g"])("div", { class: "dropdown-item", onClick: t[4] || (t[4] = () => e.onStatusChange("troll")) }, "ELB")])])])]), L, Object(o["g"])(s, { verseId: e.selectedReport.id }, null, 8, ["verseId"])])) : Object(o["e"])("", !0)])]); }));
        var N = r("bc3a"), D = r.n(N), U = r("a1e9"), H = r("5c40");
        const J = (e, ...t) => { e || console.warn(...t); }, V = (Object.prototype.toString, e => "number" === typeof e), F = Object(U["j"])(0);
        Object(U["f"])(F);
        const G = !1;
        function K(e = 1e3) { G && J(V(e), "You must pass a boolean value for the `useToggle` function, received: ", e); const t = Object(H["l"])(), r = Object(U["j"])(!1); let o = null; function n() { r.value = !1, clearTimeout(o); } function c() { n(), o = setTimeout(() => { r.value = !0; }, e); } c(), t && Object(H["u"])(n); const a = c; return [r, n, a]; }
        function Y(e, t) { const [r, o, n] = K(t); return Object(H["M"])(r, t => { t && e(); }, { immediate: !0 }), [o, n, r]; }
        function z(e, t = {}) { const r = Object(U["j"])(), o = Object(U["j"])(), n = Object(U["j"])("idle"), [c, a] = Y(() => { n.value = "timeout"; }, t.timeout || 5e3); function s() { n.value = "pending", a(), e().then(e => { "timeout" !== n.value && (c(), r.value = e, n.value = "success"); }).catch(e => { "timeout" !== n.value && (c(), o.value = e, n.value = "error"); }); } return !t.initial && c(), t.initial && s(), { data: r, error: o, state: n, run: s }; }
        const Q = { key: 0 };
        function W(e, t, r, n, c, a) { return Object(o["p"])(), Object(o["d"])("div", null, [e.data ? (Object(o["p"])(), Object(o["d"])("div", Q, [(Object(o["p"])(!0), Object(o["d"])(o["a"], null, Object(o["v"])(e.data.verses, e => (Object(o["p"])(), Object(o["d"])("div", { key: e.index }, [Object(o["g"])("b", null, Object(o["y"])(e.index) + " ", 1), Object(o["g"])("span", null, Object(o["y"])(e.content), 1)]))), 128))])) : Object(o["e"])("", !0)]); }
        var X = Object(o["h"])({ props: { verseId: Number }, setup(e) { const t = z(() => D.a.get("/api/search/chapter/" + e.verseId).then(e => e.data)); return t.run(), Object(o["B"])(e, t.run), { data: t.data }; } });
        X.render = W;
        var Z = X, $ = Object(o["h"])({ components: { BibleChapter: Z }, setup() { const e = Object(o["u"])(""), t = Object(o["u"])("in_review"), r = Object(o["u"])(), n = { in_review: "neu", ok: "freigeschaltet" }, c = z(() => D.a.get("/api/search/query", { params: { q: e.value } }).then(e => e.data.verses)); return c.run(), Object(o["B"])(e, c.run), Object(o["B"])(t, c.run), Object(o["B"])(t, () => r.value = void 0), { msg: String, reports: c.data, error: c.error, state: c.state, search: e, selectedReport: r, status: t, labels: n }; } });
        r("7613");
        $.render = M, $.__scopeId = "data-v-5e76effa";
        var ee = $, te = Object(o["h"])({ name: "Beitraege", components: { ReportManagement: ee } });
        te.render = v;
        var re = te;
        const oe = [{ path: "/", name: "Home", component: re }, { path: "/about", name: "About", component: () => r.e("about").then(r.bind(null, "f820")) }], ne = Object(O["a"])({ history: Object(O["b"])("/"), routes: oe });
        var ce = ne;
        Object(o["c"])(j).use(ce).mount("#app");
    }, ddb0: function (e, t, r) { } });
//# sourceMappingURL=app.8cfe9492.js.map
//# sourceMappingURL=app.8cfe9492.js.map