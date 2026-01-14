const shell = document.getElementById("shell");
const typer = document.getElementById("typer");
const commandArea = document.getElementById("command");
const terminal = document.getElementById("terminal");
const boundary = document.getElementById("boundary");
const PROMPT = "yuvi@dev:~$";

let buffer = "";

document.addEventListener("click", () => {
  shell.focus();
});

shell.addEventListener("keydown", (e) => {
    if(e.ctrlKey || e.metaKey) return;
    if(e.key === 'Backspace'){
        e.preventDefault();
        buffer = buffer.slice(0, -1);
        typer.textContent = buffer;
        return;
    }
    if (e.key === "Enter") {
        e.preventDefault();
        const line = document.createElement('p');
        line.innerHTML = `<span class="prompt">${PROMPT}</span> <span class="command">${buffer}</span>`;

        terminal.insertBefore(line, boundary);

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