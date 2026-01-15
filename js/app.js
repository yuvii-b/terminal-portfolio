import {PROMPT, BOOT_TITLE, PAUSED_TITLE} from './config.js';

const shell = document.getElementById("shell");
const typer = document.getElementById("typer");
const commandArea = document.getElementById("command");
const terminal = document.getElementById("terminal");
const boundary = document.getElementById("boundary");

let buffer = "";
let mode = "boot";
let lastCommand = "";
let titleIndex = 0;

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
             ? `${PROMPT}${lastCommand}`.trim() : BOOT_TITLE;
    }
});

document.addEventListener("click", () => { 
    shell.focus();
});

shell.addEventListener("keydown", (e) => {
    if(e.ctrlKey || e.metaKey) return;
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
        inputLine.innerHTML = `<span class="prompt">${PROMPT}</span>`
            + ` <span class="command">${buffer}</span>`;
        terminal.insertBefore(inputLine, boundary);
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