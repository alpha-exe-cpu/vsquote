import * as vscode from 'vscode';
import axios from 'axios'; // grabbed this from npm
import { setInterval } from 'timers';

let myStatusBarItem: vscode.StatusBarItem;

export async function activate({ subscriptions }: vscode.ExtensionContext) {
    // make the bottom bar thingy
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    subscriptions.push(myStatusBarItem);

    // get quote fast
    updateQuote();

    // updat evry hr
    setInterval(updateQuote, 3600000); 
}

async function updateQuote() {
    try {
        // api call
        const response = await axios.get('https://zenquotes.io/api/random/vs-quote');
        const { q, a } = response.data[0];
        
        // cut it short so it doesnt look ugly af tbh
        myStatusBarItem.text = `$(quote) ${q.substring(0, 30)}...`;
        
        // hover text
        myStatusBarItem.tooltip = `"${q}" — ${a}`;
        myStatusBarItem.show();
    } catch (error) {
        // if internet dies
        myStatusBarItem.text = "$(error) Offline or Server Issue";
        myStatusBarItem.show();
    }
}

export function deactivate() {
    // leave empty im too lazy to clean up rn
}