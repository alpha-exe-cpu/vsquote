"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const axios_1 = __importDefault(require("axios")); // grabbed this from npm
const timers_1 = require("timers");
let myStatusBarItem;
async function activate({ subscriptions }) {
    // make the bottom bar thingy
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    subscriptions.push(myStatusBarItem);
    // get quote fast
    updateQuote();
    // updat evry hr
    (0, timers_1.setInterval)(updateQuote, 3600000);
}
async function updateQuote() {
    try {
        // api call
        const response = await axios_1.default.get('https://zenquotes.io/api/random/vs-quote');
        const { q, a } = response.data[0];
        // cut it short so it doesnt look ugly af tbh
        myStatusBarItem.text = `$(quote) ${q.substring(0, 30)}...`;
        // hover text
        myStatusBarItem.tooltip = `"${q}" — ${a}`;
        myStatusBarItem.show();
    }
    catch (error) {
        // if internet dies
        myStatusBarItem.text = "$(error) Offline or Server Issue";
        myStatusBarItem.show();
    }
}
function deactivate() {
    // leave empty im too lazy to clean up rn
}
//# sourceMappingURL=extension.js.map