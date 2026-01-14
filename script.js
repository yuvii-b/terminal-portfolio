/* Document Title Rendering */
(() => {
    const bootTitle = "YUVI | PORTFOLIO";
    const pasuedTitle = "⏸ terminal paused";
    const prompt = "yuvi@dev:~$";

    let i = 0;
    let mode = "boot";
    let lastCommand = "";

    const typeBootTitle = () => {
        if(i <= bootTitle.length && mode === "boot"){
            document.title = bootTitle.slice(0, i++);
            setTimeout(typeBootTitle, 150);
        }
    };

    typeBootTitle();

    const setShellTitle = (command = "") => {
        lastCommand = command;
        document.title = `${prompt} ${command}`.trim();
        mode = "shell";
    };

    document.addEventListener("visibilitychange", () => {
        if(document.hidden){
            document.title = pasuedTitle;
        } else{
            if(mode === "shell"){
                document.title = `${prompt} ${lastCommand}`.trim();
            } else{
                document.title = bootTitle;
            }
        }
    });

    window.updateTitleWithCommand = setShellTitle;
})();
