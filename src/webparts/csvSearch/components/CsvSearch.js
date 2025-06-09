"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvSearch = void 0;
var React = __importStar(require("react"));
var CsvSearch = function () {
    var _a = React.useState([]), csvData = _a[0], setCsvData = _a[1];
    var _b = React.useState(''), keyword = _b[0], setKeyword = _b[1];
    var _c = React.useState([]), filtered = _c[0], setFiltered = _c[1];
    React.useEffect(function () {
        fetch('/sites/workbench/SiteAssets/sample.csv')
            .then(function (res) { return res.text(); })
            .then(function (text) {
            var rows = text.trim().split('\n').slice(1); // skip header
            var items = rows.map(function (row) {
                var _a = row.split(','), 番号 = _a[0], タイトル = _a[1], 詳細 = _a[2], URL = _a[3];
                return { 番号: 番号, タイトル: タイトル, 詳細: 詳細, URL: URL };
            });
            setCsvData(items);
        });
    }, []);
    var handleSearch = function () {
        var kw = keyword.toLowerCase();
        var result = csvData.filter(function (item) {
            return item.タイトル.toLowerCase().includes(kw) ||
                item.詳細.toLowerCase().includes(kw) ||
                item.URL.toLowerCase().includes(kw);
        });
        setFiltered(result);
    };
    return (React.createElement("div", null,
        React.createElement("input", { type: "text", placeholder: "\u691C\u7D22\u8A9E\u3092\u5165\u529B", value: keyword, onChange: function (e) { return setKeyword(e.target.value); } }),
        React.createElement("button", { onClick: handleSearch }, "\u691C\u7D22"),
        React.createElement("ul", null, filtered.map(function (item, idx) { return (React.createElement("li", { key: idx },
            React.createElement("strong", null, item.タイトル),
            React.createElement("br", null),
            item.詳細,
            React.createElement("br", null),
            React.createElement("a", { href: item.URL, target: "_blank", rel: "noreferrer" }, item.URL))); }))));
};
exports.CsvSearch = CsvSearch;
