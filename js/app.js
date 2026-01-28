import {PROMPT, BOOT_TITLE, PAUSED_TITLE, ASCII_ART} from './config.js';
import {COMMANDS} from './commands.js';

const shell = document.getElementById("shell");
const typer = document.getElementById("typer");
const commandArea = document.getElementById("command");
const terminal = document.getElementById("terminal");
let boundary = document.getElementById("boundary");

let buffer = "";
let mode = "boot";
let lastCommand = "";
let titleIndex = 0;
let commandHistory = [];
let historyIndex = -1;

const displayAsciiArt = () => {
    ASCII_ART.forEach(line => {
        const pre = document.createElement("pre");
        pre.textContent = line.text;
        if(line.class) pre.className = line.class;
        terminal.insertBefore(pre, boundary);
    });
    mode = "input";
};
displayAsciiArt();

const typeBootTitle = () => {
    if(titleIndex <= BOOT_TITLE.length && mode === "boot"){
        document.title = BOOT_TITLE.slice(0, titleIndex++);
        setTimeout(typeBootTitle, 150);
    }
};
typeBootTitle();

const updateTitle = (command = "") => {
    mode = "shell";
    lastCommand = command;
    document.title = `${PROMPT} ${command}`.trim();
}

document.addEventListener("visibilitychange", () => {
    if(document.hidden){
        document.title = PAUSED_TITLE;
    }else{
        document.title = (mode === "shell")
             ? `${PROMPT} ${lastCommand}`.trim() : BOOT_TITLE;
    }
});

document.addEventListener("click", () => { 
    shell.focus();
});

const printLine = (html) => {
    const p = document.createElement("p");
    p.innerHTML = html;
    terminal.insertBefore(p, boundary);
}

const printLines = (lines) => {
    lines.forEach(line => printLine(line));
}

const clearTerminal = () => {
    terminal.innerHTML = '<a id="boundary"></a>';
    boundary = document.getElementById("boundary");
}

shell.addEventListener("keydown", (e) => {
    if(e.ctrlKey || e.metaKey) return;
    if(e.key === "ArrowUp"){
        e.preventDefault();
        if(commandHistory.length === 0) return;
        if(historyIndex === -1){
            historyIndex = commandHistory.length - 1;
        } else if(historyIndex > 0){
            historyIndex--;
        }
        buffer = commandHistory[historyIndex];
        typer.textContent = buffer;
        return;
    }
    
    if(e.key === "ArrowDown"){
        e.preventDefault();
        if(commandHistory.length === 0 || historyIndex === -1) return;
        if(historyIndex < commandHistory.length - 1){
            historyIndex++;
            buffer = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            buffer = "";
        }
        typer.textContent = buffer;
        return;
    }
    
    if(e.key === "Backspace"){
        e.preventDefault();
        buffer = buffer.slice(0, -1);
        typer.textContent = buffer;
        return;
    }
    if(e.key === "Enter"){
        e.preventDefault();
        const command = buffer.trim();
        const inputLine = document.createElement("p");
        inputLine.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="command">${buffer}</span>`;
        terminal.insertBefore(inputLine, boundary);

        const entry = COMMANDS[command];

        if(!entry && command !== ""){
            printLines([
                "<br>",
                `<span class="error">command not found</span>`,
                "Type <span class='command'>help</span> to see available commands.",
                "<br>"
            ]);
        }else if(entry?.action === "CLEAR"){
            clearTerminal();
        }else if(entry?.output){
            printLines(entry.output);
        }

        if(command !== "" && command !== commandHistory[commandHistory.length - 1]){
            commandHistory.push(command);
        }
        historyIndex = -1;

        updateTitle(command);

        buffer = "";
        typer.textContent = "";
        boundary.scrollIntoView({behavior: "smooth"});
        return;
    }
    if(e.key.length === 1){
        e.preventDefault();
        buffer += e.key;
        typer.textContent = buffer;
    }
});