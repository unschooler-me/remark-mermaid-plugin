"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unist_util_visit_1 = require("unist-util-visit");
var mermaid_1 = __importDefault(require("mermaid"));
var remarkMermaid = function remarkMermaid(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.theme, theme = _c === void 0 ? "default" : _c;
    return function (ast) {
        var instances = [];
        (0, unist_util_visit_1.visit)(ast, { type: "code", lang: "mermaid" }, function (node, index, parent) {
            instances.push([node.value, index, parent]);
        });
        // Nothing to do. No need to start puppeteer in this case.
        if (!instances.length) {
            return ast;
        }
        var results = instances.map(function (ins) {
            try {
                var code = ins[0];
                var id = "mermaid" + Math.random().toString(36).slice(2);
                mermaid_1.default.initialize({ theme: theme });
                var div = document.createElement("div");
                div.innerHTML = "<pre><code class=\"hljs language-mermaid\">".concat(mermaid_1.default.render(id, code), "</code></pre>");
                return div.innerHTML;
            }
            catch (err) {
                // skip diagram with error
                return '<div></div>';
            }
        });
        instances.forEach(function (_a, i) {
            var index = _a[1], parent = _a[2];
            var value = results[i];
            parent.children.splice(index, 1, {
                type: "html",
                value: value,
            });
        });
    };
};
exports.default = remarkMermaid;
