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
let commandHistory = [];
let historyIndex = -1;

const displayAsciiArt = async () => {
    const bannerElements = [];
    for(const line of ASCII_ART) {
        const pre = document.createElement("pre");
        pre.textContent = line.text;
        if(line.class) pre.className = line.class;

        if(line.class === 'title') {
            pre.classList.add('banner-fade');
            bannerElements.push(pre);
        }
        
        terminal.insertBefore(pre, boundary);
        if(line.class === 'title') {
            await new Promise(resolve => setTimeout(resolve, 80));
        }
    }
    if(bannerElements.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
        bannerElements.forEach(element => {
            element.classList.add('banner-flash');
        });
    }
    mode = "input";
};
displayAsciiArt();

document.title = BOOT_TITLE;

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

const printLine = async (html, animate = true) => {
    const p = document.createElement("p");
    terminal.insertBefore(p, boundary);
    
    if (!animate) {
        p.innerHTML = html;
        return Promise.resolve();
    }

    const temp = document.createElement('div');
    temp.innerHTML = html;

    return new Promise(resolve => {
        let currentIndex = 0;
        const elements = [];
    
        const extractNodes = (node) => {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    for (let char of text) {
                        elements.push({ type: 'text', content: char });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    elements.push({ type: 'elementStart', element: child.cloneNode(false) });
                    extractNodes(child);
                    elements.push({ type: 'elementEnd' });
                }
            });
        };
        
        extractNodes(temp);
        
        const typeChar = () => {
            if (currentIndex >= elements.length) {
                resolve();
                return;
            }
            
            const item = elements[currentIndex++];
            
            if (item.type === 'text') {
                const textNode = document.createTextNode(item.content);
                const container = p.querySelector('.typing-container:last-child') || p;
                container.appendChild(textNode);
            } else if (item.type === 'elementStart') {
                const clone = item.element.cloneNode(false);
                clone.classList.add('typing-container');
                const container = p.querySelector('.typing-container:last-child') || p;
                container.appendChild(clone);
            } else if (item.type === 'elementEnd') {
                const lastContainer = p.querySelector('.typing-container:last-child');
                if (lastContainer) {
                    lastContainer.classList.remove('typing-container');
                }
            }
            
            setTimeout(typeChar, 7); // Adjust speed here (lower = faster)
        };
        
        typeChar();
    });
}

const printLines = async (lines) => {
    for (const line of lines) {
        await printLine(line);
    }
}

const clearTerminal = () => {
    terminal.innerHTML = '<a id="boundary"></a>';
    boundary = document.getElementById("boundary");
    buffer = "";
    shell.value = "";
    typer.textContent = "";
}

shell.addEventListener("input", (e) => {
    const value = shell.value;
    
    if(value.includes('\n')){
        shell.value = '';
        
        const command = buffer.trim();
        const inputLine = document.createElement("p");
        inputLine.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="command">${buffer}</span>`;
        terminal.insertBefore(inputLine, boundary);

        if(command !== "" && command !== commandHistory[commandHistory.length - 1]){
            commandHistory.push(command);
        }
        historyIndex = -1;

        updateTitle(command);

        buffer = "";
        shell.value = "";
        typer.textContent = "";
        commandArea.style.visibility = "hidden";

        const entry = COMMANDS[command];

        const handleCommand = async () => {
            if(!entry && command !== ""){
                await printLines([
                    "<br>",
                    `<span class="error">command not found</span>`,
                    "Type <span class='command'>help</span> to see available commands.",
                    "<br>"
                ]);
            }else if(entry?.action === "CLEAR"){
                clearTerminal();
            }else if(entry?.action === "EXIT"){
                if(entry.output) await printLines(entry.output);
                setTimeout(() => {
                    window.open('', '_self', '');
                    window.close();
                }, 500);
                return; // Don't restore visibility when exiting
            }else if(entry?.action === "OPEN_URL"){
                if(entry.output) await printLines(entry.output);
                if(entry.url) window.open(entry.url, '_blank');
            }else if(entry?.output){
                await printLines(entry.output);
            }
            commandArea.style.visibility = "visible";
            shell.focus();
            boundary.scrollIntoView({behavior: "smooth"});
        };
        
        handleCommand();
        return;
    }
    
    buffer = value;
    typer.textContent = buffer;
});

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
        shell.value = buffer;
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
        shell.value = buffer;
        typer.textContent = buffer;
        return;
    }
    
    if(e.key === "Backspace"){
        return;
    }
    if(e.key === "Enter"){
        e.preventDefault();
        shell.value = buffer + '\n';
        shell.dispatchEvent(new Event('input'));
        return;
    }
    if(e.key.length === 1){
        return;
    }
});