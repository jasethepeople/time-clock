try {
var STORAGE_KEY = "time-clock-punches-v1";
var punches = [];
function loadPunches() {
try {
var raw = null;
try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return []; }
if (raw === null || raw === undefined || raw === "") return [];
var data = null;
try { data = JSON.parse(raw); } catch (e) { return []; }
if (!Array.isArray(data)) return [];
return data;
} catch (e) { return []; }
}
function savePunches() {
try {
try { localStorage.setItem(STORAGE_KEY, JSON.stringify(punches)); } catch (e) {}
} catch (e) {}
}
function getEl(id) {
try { return document.getElementById(id); } catch (e) { return null; }
}
function setResult(msg) {
try {
var el = getEl("clock-result");
if (!el) return;
try { el.textContent = msg; } catch (e) {}
} catch (e) {}
}
function getTrimmedName() {
try {
var input = getEl("worker-name");
if (!input) return "";
var v = "";
try { v = input.value; } catch (e) { return ""; }
if (v === null || v === undefined) return "";
try { return String(v).trim(); } catch (e) { return ""; }
} catch (e) { return ""; }
}
function findLatestFor(name) {
try {
var latest = null;
for (var i = 0; i < punches.length; i++) {
try {
var p = punches[i];
if (p && p.name === name) latest = p;
} catch (e) {}
}
return latest;
} catch (e) { return null; }
}
function formatLocal(iso) {
try { return new Date(iso).toLocaleString(); } catch (e) { return String(iso); }
}
function calcHoursFor(name) {
try {
var list = [];
for (var i = 0; i < punches.length; i++) {
try { if (punches[i] && punches[i].name === name) list.push(punches[i]); } catch (e) {}
}
try {
list.sort(function (a, b) {
try { return new Date(a.timestamp) - new Date(b.timestamp); } catch (e) { return 0; }
});
} catch (e) {}
var ms = 0;
var pending = null;
for (var k = 0; k < list.length; k++) {
try {
var q = list[k];
if (!q) continue;
if (q.type === "in") {
if (pending === null) pending = q;
} else if (q.type === "out") {
if (pending !== null) {
try {
var d = new Date(q.timestamp) - new Date(pending.timestamp);
if (!isNaN(d) && d > 0) ms += d;
} catch (e) {}
pending = null;
}
}
} catch (e) {}
}
var h = 0;
try { h = Math.round(ms / 3600000 * 10) / 10; } catch (e) { h = 0; }
return h;
} catch (e) { return 0; }
}
function renderClockedIn() {
try {
var el = getEl("clocked-in-list");
if (!el) return;
try { el.textContent = ""; } catch (e) {}
try { while (el.firstChild) el.removeChild(el.firstChild); } catch (e) {}
var latestMap = {};
try {
for (var i = 0; i < punches.length; i++) {
try {
var p = punches[i];
if (!p || typeof p.name !== "string") continue;
latestMap[p.name] = p;
} catch (e) {}
}
} catch (e) {}
var names = [];
try {
for (var k in latestMap) {
if (Object.prototype.hasOwnProperty.call(latestMap, k)) {
try { if (latestMap[k] && latestMap[k].type === "in") names.push(k); } catch (e) {}
}
}
} catch (e) {}
try { names.sort(); } catch (e) {}
if (names.length === 0) {
try { el.textContent = "Nobody is clocked in right now."; } catch (e) {}
return;
}
for (var n = 0; n < names.length; n++) {
try {
var nm = names[n];
var punch = latestMap[nm];
var t = "";
try { t = new Date(punch.timestamp).toLocaleString(); } catch (e) { try { t = String(punch.timestamp); } catch (e2) { t = ""; } }
var div = null;
try { div = document.createElement("div"); } catch (e) { continue; }
if (!div) continue;
try { div.textContent = nm + " clocked in at " + t; } catch (e) { continue; }
try { el.appendChild(div); } catch (e) {}
} catch (e) {}
}
} catch (e) {}
}
function renderHours() {
try {
var el = getEl("hours-list");
if (!el) return;
try { el.textContent = ""; } catch (e) {}
try { while (el.firstChild) el.removeChild(el.firstChild); } catch (e) {}
if (!punches || punches.length === 0) {
try { el.textContent = "No hours yet."; } catch (e) {}
return;
}
var uniq = {};
try {
for (var i = 0; i < punches.length; i++) {
try { if (punches[i] && typeof punches[i].name === "string") uniq[punches[i].name] = true; } catch (e) {}
}
} catch (e) {}
var names = [];
try {
for (var k in uniq) { if (Object.prototype.hasOwnProperty.call(uniq, k)) names.push(k); }
} catch (e) {}
try { names.sort(); } catch (e) {}
if (names.length === 0) {
try { el.textContent = "No hours yet."; } catch (e) {}
return;
}
var total = 0;
for (var n = 0; n < names.length; n++) {
try {
var nm = names[n];
var h = calcHoursFor(nm);
try { total += h; } catch (e) {}
var div = null;
try { div = document.createElement("div"); } catch (e) { continue; }
if (!div) continue;
try { div.textContent = nm + ": " + h + " hours"; } catch (e) { continue; }
try { el.appendChild(div); } catch (e) {}
} catch (e) {}
}
try { total = Math.round(total * 10) / 10; } catch (e) {}
var tdiv = null;
try { tdiv = document.createElement("div"); } catch (e) { tdiv = null; }
if (tdiv) {
try { tdiv.textContent = "Total: " + total + " hours"; } catch (e) {}
try { el.appendChild(tdiv); } catch (e) {}
}
} catch (e) {}
}
function renderPunches() {
try {
var el = getEl("punches-list");
if (!el) return;
try { el.textContent = ""; } catch (e) {}
try { while (el.firstChild) el.removeChild(el.firstChild); } catch (e) {}
if (!punches || punches.length === 0) {
try { el.textContent = "No punches yet."; } catch (e) {}
return;
}
var items = [];
try {
for (var i = 0; i < punches.length; i++) { items.push({ p: punches[i], idx: i }); }
try {
items.sort(function (a, b) {
try {
var ta = new Date(a.p.timestamp).getTime();
var tb = new Date(b.p.timestamp).getTime();
if (isNaN(ta) && isNaN(tb)) return b.idx - a.idx;
if (isNaN(ta)) return 1;
if (isNaN(tb)) return -1;
if (tb !== ta) return tb - ta;
return b.idx - a.idx;
} catch (e) { return 0; }
});
} catch (e) {}
} catch (e) {}
for (var k = 0; k < items.length; k++) {
try {
(function (item) {
try {
var p = item.p;
var origIdx = item.idx;
var div = null;
try { div = document.createElement("div"); } catch (e) { return; }
if (!div) return;
var label = "";
try {
var typeStr = "";
try {
if (p && p.type === "in") typeStr = "IN";
else if (p && p.type === "out") typeStr = "OUT";
else try { typeStr = String(p ? p.type : ""); } catch (e) { typeStr = ""; }
} catch (e) { typeStr = ""; }
var nm = "";
try { nm = (p && typeof p.name === "string") ? p.name : ""; } catch (e) { nm = ""; }
var t = "";
try { t = new Date(p.timestamp).toLocaleString(); } catch (e) { try { t = String(p.timestamp); } catch (e2) { t = ""; } }
label = nm + " " + typeStr + " " + t;
} catch (e) { label = ""; }
var span = null;
try { span = document.createElement("span"); } catch (e) { span = null; }
if (span) {
try { span.textContent = label; } catch (e) {}
try { div.appendChild(span); } catch (e) {}
} else {
try { div.textContent = label; } catch (e) {}
}
var btn = null;
try { btn = document.createElement("button"); } catch (e) { btn = null; }
if (btn) {
try { btn.textContent = "Delete"; } catch (e) {}
try {
btn.addEventListener("click", function () {
try {
var ok = false;
try { ok = window.confirm("Delete this punch?"); } catch (e) { return; }
if (ok !== true) return;
try {
if (punches[origIdx] === p) { punches.splice(origIdx, 1); }
else {
var pos = -1;
try { pos = punches.indexOf(p); } catch (e) { pos = -1; }
if (pos !== -1) punches.splice(pos, 1);
else return;
}
} catch (e) { return; }
try { savePunches(); } catch (e) {}
try { renderAll(); } catch (e) {}
} catch (e) {}
});
} catch (e) {}
try { div.appendChild(btn); } catch (e) {}
}
try { el.appendChild(div); } catch (e) {}
} catch (e) {}
})(items[k]);
} catch (e) {}
}
} catch (e) {}
}
function renderAll() {
try { renderClockedIn(); } catch (e) {}
try { renderHours(); } catch (e) {}
try { renderPunches(); } catch (e) {}
}
function handleClockIn() {
try {
var name = getTrimmedName();
if (!name) { setResult("Enter a name first."); return; }
var latest = findLatestFor(name);
if (latest && latest.type === "in") { setResult(name + " is already clocked in."); return; }
var nowIso = "";
try { nowIso = new Date().toISOString(); } catch (e) { try { nowIso = new Date().toString(); } catch (e2) { nowIso = ""; } }
try { punches.push({ name: name, type: "in", timestamp: nowIso }); } catch (e) { return; }
try { savePunches(); } catch (e) {}
try { renderAll(); } catch (e) {}
var local = formatLocal(nowIso);
setResult(name + " clocked in at " + local + ".");
} catch (e) {}
}
function handleClockOut() {
try {
var name = getTrimmedName();
if (!name) { setResult("Enter a name first."); return; }
var latest = findLatestFor(name);
if (!latest || latest.type !== "in") { setResult(name + " is not clocked in."); return; }
var nowIso = "";
try { nowIso = new Date().toISOString(); } catch (e) { try { nowIso = new Date().toString(); } catch (e2) { nowIso = ""; } }
try { punches.push({ name: name, type: "out", timestamp: nowIso }); } catch (e) { return; }
try { savePunches(); } catch (e) {}
try { renderAll(); } catch (e) {}
var local = formatLocal(nowIso);
setResult(name + " clocked out at " + local + ".");
} catch (e) {}
}
function handleExport() {
try {
if (!punches || punches.length === 0) { setResult("Nothing to export yet."); return; }
var json = "";
try { json = JSON.stringify(punches); } catch (e) { return; }
var blob = null;
try { blob = new Blob([json], { type: "application/json" }); } catch (e) { return; }
if (!blob) return;
var url = null;
try { url = URL.createObjectURL(blob); } catch (e) { return; }
if (!url) return;
var a = null;
try { a = document.createElement("a"); } catch (e) { return; }
if (!a) return;
try {
try { a.href = url; } catch (e) {}
try { a.download = "punches.json"; } catch (e) {}
try { if (document.body) document.body.appendChild(a); } catch (e) {}
try { a.click(); } catch (e) {}
try { if (a.remove) a.remove(); else if (a.parentNode) a.parentNode.removeChild(a); } catch (e) {}
} catch (e) {}
try {
setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 100);
} catch (e) {}
} catch (e) {}
}
function handleClear() {
try {
var ok = false;
try { ok = window.confirm("Delete all punches?"); } catch (e) { return; }
if (ok !== true) return;
try { punches = []; } catch (e) {}
try { savePunches(); } catch (e) {}
try { renderAll(); } catch (e) {}
} catch (e) {}
}
function attach() {
try {
var b1 = getEl("clock-in");
if (b1) { try { b1.addEventListener("click", handleClockIn); } catch (e) {} }
var b2 = getEl("clock-out");
if (b2) { try { b2.addEventListener("click", handleClockOut); } catch (e) {} }
var b3 = getEl("export-json");
if (b3) { try { b3.addEventListener("click", handleExport); } catch (e) {} }
var b4 = getEl("clear-all");
if (b4) { try { b4.addEventListener("click", handleClear); } catch (e) {} }
} catch (e) {}
}
function init() {
try { punches = loadPunches(); } catch (e) { try { punches = []; } catch (e2) {} }
try { attach(); } catch (e) {}
try { renderAll(); } catch (e) {}
}
try {
if (typeof document !== "undefined") {
try {
if (document.readyState === "loading") {
try { document.addEventListener("DOMContentLoaded", init); } catch (e) { try { init(); } catch (e2) {} }
} else { try { init(); } catch (e) {} }
} catch (e) {}
}
} catch (e) {}
} catch (_outerErr) {}

/* ===== TIME CLOCK PRO (appended; free clock above stays free) ===== */
try {
  var PRO_BUY_URL = "LEMON_SQUEEZY_BUY_LINK_HERE";
  var PRO_STORE_ID = "YOUR_STORE_ID";
  var PRO_VARIANT_ID = "YOUR_VARIANT_ID";
  var PRO_GRACE_DAYS = 7;
  var PRO_KEY = "time-clock-pro-v1";

  function proEl(id) { try { return document.getElementById(id); } catch (e) { return null; } }
  function proSetMsg(m) {
    try { var e = proEl("pro-result"); if (e) { e.textContent = m; } } catch (e) {}
  }
  function proGetRecord() {
    try {
      if (typeof window === "undefined" || !window.localStorage) { return null; }
      var raw = null;
      try { raw = window.localStorage.getItem(PRO_KEY); } catch (e) { return null; }
      if (!raw) { return null; }
      var o = null;
      try { o = JSON.parse(raw); } catch (e) { return null; }
      if (!o || typeof o !== "object") { return null; }
      return o;
    } catch (e) { return null; }
  }
  function proIsPro() {
    try {
      var rec = null;
      try { rec = proGetRecord(); } catch (e) { return false; }
      if (!rec || !rec.key || !rec.validatedAt) { return false; }
      var t = Date.parse(rec.validatedAt);
      if (isNaN(t)) { return false; }
      var grace = 7 * 24 * 60 * 60 * 1000;
      try { grace = Number(PRO_GRACE_DAYS) * 24 * 60 * 60 * 1000; } catch (e) {}
      if (isNaN(grace) || grace < 0) { return false; }
      return (Date.now() - t) < grace;
    } catch (e) { return false; }
  }
  function proRefreshStatus() {
    try {
      var e = proEl("pro-status");
      if (!e) { return; }
      try {
        if (proIsPro()) { e.textContent = "Pro unlocked. Thank you."; }
        else { e.textContent = "Free clock: punches and hours. Pro unlocks payroll CSV export with overtime flagged."; }
      } catch (x) {}
    } catch (e) {}
  }
  function proSyncControls() {
    try {
      var buy = proEl("buy-pro");
      if (buy) { try { buy.href = PRO_BUY_URL; } catch (e) { try { buy.setAttribute("href", PRO_BUY_URL); } catch (x) {} } }
    } catch (e) {}
    try {
      var ub = proEl("unlock-pro");
      if (ub) { try { ub.textContent = "Unlock Pro"; } catch (e) {} }
    } catch (e) {}
    try {
      var ep = proEl("export-payroll");
      if (ep) { try { ep.disabled = !proIsPro(); } catch (e) {} }
    } catch (e) {}
    try { proRefreshStatus(); } catch (e) {}
  }
  function proRemoteValidate(k) {
    try {
      return fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "license_key=" + encodeURIComponent(k)
      });
    } catch (e) { return null; }
  }
  function proHandleValidateResponse(data, key) {
    try {
      if (data && data.valid === true && data.license_key && data.license_key.status === "active" &&
          data.meta && String(data.meta.variant_id) === String(PRO_VARIANT_ID)) {
        try { window.localStorage.setItem(PRO_KEY, JSON.stringify({ key: key, validatedAt: new Date().toISOString() })); } catch (e) {}
        proSetMsg("Pro unlocked. Thank you.");
        try { proSyncControls(); } catch (e) {}
      } else {
        proSetMsg("That key did not validate. Check it and try again.");
      }
    } catch (e) {
      try { proSetMsg("That key did not validate. Check it and try again."); } catch (x) {}
    }
  }
  function proDoUnlock() {
    try {
      var ke = proEl("license-key");
      var k = "";
      if (ke) { try { if ("value" in ke) { k = ke.value; } else { k = ke.textContent; } } catch (e) { k = ""; } }
      k = String(k == null ? "" : k).trim();
      if (!k) { proSetMsg("Paste a license key first."); return; }
      var re = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      if (!re.test(k)) { proSetMsg("That does not look like a license key."); return; }
      if (PRO_STORE_ID === "YOUR_STORE_ID" || PRO_VARIANT_ID === "YOUR_VARIANT_ID") {
        proSetMsg("Pro is not configured yet: the seller must set the store and variant IDs.");
        return;
      }
      var p = null;
      try { p = proRemoteValidate(k); } catch (e) { p = null; }
      if (!p || !p.then) { proSetMsg("Could not reach the license server. Check your connection and try again."); return; }
      try {
        p.then(function (resp) {
          try {
            var j = null;
            try { j = resp.json(); } catch (e) { proSetMsg("That key did not validate. Check it and try again."); return null; }
            if (j && j.then) {
              j.then(function (data) {
                try { proHandleValidateResponse(data, k); } catch (e) { proSetMsg("That key did not validate. Check it and try again."); }
              }, function (err) { proSetMsg("Could not reach the license server. Check your connection and try again."); });
            } else {
              try { proHandleValidateResponse(j, k); } catch (e) { proSetMsg("That key did not validate. Check it and try again."); }
            }
          } catch (e) { proSetMsg("That key did not validate. Check it and try again."); }
        }, function (err) { proSetMsg("Could not reach the license server. Check your connection and try again."); });
      } catch (e) { proSetMsg("Could not reach the license server. Check your connection and try again."); }
    } catch (e) {}
  }
  function proBackgroundRevalidate() {
    try {
      var rec = null;
      try { rec = proGetRecord(); } catch (e) { rec = null; }
      if (!rec || !rec.key) { return; }
      var t = Date.parse(rec.validatedAt);
      if (!isNaN(t)) {
        var grace = 7 * 24 * 60 * 60 * 1000;
        try { grace = Number(PRO_GRACE_DAYS) * 24 * 60 * 60 * 1000; } catch (e) {}
        if ((Date.now() - t) < grace) { return; }
      }
      var p = null;
      try { p = proRemoteValidate(rec.key); } catch (e) { p = null; }
      if (!p || !p.then) { return; }
      try {
        p.then(function (resp) {
          try {
            var j = null;
            try { j = resp.json(); } catch (e) { return null; }
            if (j && j.then) {
              j.then(function (data) {
                try {
                  if (data && data.valid === true && data.license_key && data.license_key.status === "active" &&
                      data.meta && String(data.meta.variant_id) === String(PRO_VARIANT_ID)) {
                    try { window.localStorage.setItem(PRO_KEY, JSON.stringify({ key: rec.key, validatedAt: new Date().toISOString() })); } catch (e) {}
                  } else {
                    try { window.localStorage.removeItem(PRO_KEY); } catch (e) {}
                  }
                  try { proSyncControls(); } catch (e) {}
                } catch (e) {}
              }, function (err) {});
            } else {
              try {
                if (j && j.valid === true && j.license_key && j.license_key.status === "active" &&
                    j.meta && String(j.meta.variant_id) === String(PRO_VARIANT_ID)) {
                  try { window.localStorage.setItem(PRO_KEY, JSON.stringify({ key: rec.key, validatedAt: new Date().toISOString() })); } catch (e) {}
                } else {
                  try { window.localStorage.removeItem(PRO_KEY); } catch (e) {}
                }
                try { proSyncControls(); } catch (e) {}
              } catch (e) {}
            }
          } catch (e) {}
        }, function (err) {});
      } catch (e) {}
    } catch (e) {}
  }

  function proLoadPunches() {
    try {
      var raw = null;
      try { raw = window.localStorage.getItem("time-clock-punches-v1"); } catch (e) { return []; }
      if (!raw) { return []; }
      var data = null;
      try { data = JSON.parse(raw); } catch (e) { return []; }
      if (!Array.isArray(data)) { return []; }
      return data;
    } catch (e) { return []; }
  }
  function proLocalDate(iso) {
    try {
      var d = new Date(iso);
      if (isNaN(d)) { return ""; }
      var y = d.getFullYear();
      var m = d.getMonth() + 1;
      var day = d.getDate();
      return y + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (day < 10 ? "0" + day : "" + day);
    } catch (e) { return ""; }
  }
  function proPayrollRows() {
    var perDay = {};
    try {
      var punches = proLoadPunches();
      var byName = {};
      for (var i = 0; i < punches.length; i++) {
        try {
          var p = punches[i];
          if (!p || typeof p.name !== "string") { continue; }
          if (!byName[p.name]) { byName[p.name] = []; }
          byName[p.name].push(p);
        } catch (e) {}
      }
      var names = [];
      for (var n in byName) {
        if (Object.prototype.hasOwnProperty.call(byName, n)) { names.push(n); }
      }
      names.sort();
      for (var ni = 0; ni < names.length; ni++) {
        try {
          var list = byName[names[ni]];
          list.sort(function (a, b) {
            try { return new Date(a.timestamp) - new Date(b.timestamp); } catch (e) { return 0; }
          });
          var pending = null;
          for (var k = 0; k < list.length; k++) {
            try {
              var q = list[k];
              if (!q) { continue; }
              if (q.type === "in") {
                if (pending === null) { pending = q; }
              } else if (q.type === "out") {
                if (pending !== null) {
                  var d = null;
                  try { d = new Date(q.timestamp) - new Date(pending.timestamp); } catch (e) { d = null; }
                  if (d !== null && !isNaN(d) && d > 0) {
                    var day = proLocalDate(pending.timestamp);
                    var key2 = names[ni] + "|" + day;
                    if (!perDay[key2]) { perDay[key2] = { name: names[ni], date: day, ms: 0 }; }
                    perDay[key2].ms += d;
                  }
                  pending = null;
                }
              }
            } catch (e) {}
          }
        } catch (e) {}
      }
    } catch (e) {}
    var rows = [];
    var keys = [];
    for (var kk in perDay) {
      if (Object.prototype.hasOwnProperty.call(perDay, kk)) { keys.push(kk); }
    }
    keys.sort();
    var totals = {};
    for (var ri = 0; ri < keys.length; ri++) {
      try {
        var r = perDay[keys[ri]];
        var hours = Math.round(r.ms / 3600000 * 10) / 10;
        var ot = hours > 8 ? Math.round((hours - 8) * 10) / 10 : 0;
        rows.push({ name: r.name, date: r.date, hours: hours, ot: ot });
        if (!totals[r.name]) { totals[r.name] = { hours: 0, ot: 0 }; }
        totals[r.name].hours = Math.round((totals[r.name].hours + hours) * 10) / 10;
        totals[r.name].ot = Math.round((totals[r.name].ot + ot) * 10) / 10;
      } catch (e) {}
    }
    var tnames = [];
    for (var tn in totals) {
      if (Object.prototype.hasOwnProperty.call(totals, tn)) { tnames.push(tn); }
    }
    tnames.sort();
    for (var ti = 0; ti < tnames.length; ti++) {
      rows.push({ name: tnames[ti], date: "TOTAL", hours: totals[tnames[ti]].hours, ot: totals[tnames[ti]].ot });
    }
    return rows;
  }
  function proExportPayroll() {
    try {
      if (!proIsPro()) { proSetMsg("Payroll export is a Pro feature."); return; }
      var rows = [];
      try { rows = proPayrollRows(); } catch (e) { rows = []; }
      if (rows.length === 0) { proSetMsg("No completed shifts yet."); return; }
      var lines = ["Person,Date,Hours,Overtime hours"];
      for (var i = 0; i < rows.length; i++) {
        try {
          var r = rows[i];
          var nm = String(r.name).replace(/"/g, '""');
          lines.push('"' + nm + '",' + r.date + ',' + r.hours.toFixed(1) + ',' + r.ot.toFixed(1));
        } catch (e) {}
      }
      var csv = lines.join("\n");
      var blob = null;
      try { blob = new Blob([csv], { type: "text/csv" }); } catch (e) { return; }
      if (!blob) { return; }
      var url = null;
      try {
        if (typeof window !== "undefined" && window.URL && typeof window.URL.createObjectURL === "function") {
          url = window.URL.createObjectURL(blob);
        }
      } catch (e) { url = null; }
      if (!url) { return; }
      var a = null;
      try { a = document.createElement("a"); } catch (e) { return; }
      if (!a) { return; }
      try { a.href = url; } catch (e) {}
      try { a.download = "payroll.csv"; } catch (e) {}
      try { if (document.body) { document.body.appendChild(a); } } catch (e) {}
      try { if (typeof a.click === "function") { a.click(); } } catch (e) {}
      try { if (a.parentNode) { a.parentNode.removeChild(a); } } catch (e) {}
      try {
        if (typeof window !== "undefined" && window.URL && typeof window.URL.revokeObjectURL === "function") {
          var u = url;
          setTimeout(function () { try { window.URL.revokeObjectURL(u); } catch (e) {} }, 100);
        }
      } catch (e) {}
      proSetMsg("Payroll exported: " + rows.length + " rows.");
    } catch (e) {}
  }

  try {
    var ub = proEl("unlock-pro");
    if (ub && ub.addEventListener) { ub.addEventListener("click", function () { try { proDoUnlock(); } catch (e) {} }); }
  } catch (e) {}
  try {
    var ep = proEl("export-payroll");
    if (ep && ep.addEventListener) { ep.addEventListener("click", function () { try { proExportPayroll(); } catch (e) {} }); }
  } catch (e) {}
  try { proSyncControls(); } catch (e) {}
  try { proBackgroundRevalidate(); } catch (e) {}
} catch (e) {}
