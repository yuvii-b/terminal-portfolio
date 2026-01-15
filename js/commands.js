export const COMMANDS = {
  help: {
    output: [
      "<br>",
      "<span class='command'>help</span>     - show this message",
      "<span class='command'>about</span>    - about me",
      "<span class='command'>projects</span> - view projects",
      "<span class='command'>social</span>   - social links",
      "<span class='command'>clear</span>    - clear terminal",
      "<br>"
    ]
  },

  about: {
    output: [
      "<br>",
      "Yuvaraj (<span class='command'>Yuvi</span>)",
      "CSE student | Backend & Systems enthusiast",
      "Likes building things from scratch.",
      "<br>"
    ]
  },

  projects: {
    output: [
      "<br>",
      "• <a href='https://github.com/yourusername/terminal-portfolio' target='_blank'>Terminal Portfolio</a>",
      "• <a href='https://github.com/yourusername/telegram-bot' target='_blank'>Telegram Bot (Java)</a>",
      "• <a href='https://github.com/yourusername/cli-chat' target='_blank'>CLI Chat App</a>",
      "<br>"
    ]
  },

  social: {
    output: [
      "<br>",
      "GitHub   : <a href='https://github.com/yourusername' target='_blank'>github.com/yourusername</a>",
      "LinkedIn : <a href='https://linkedin.com/in/yourusername' target='_blank'>linkedin.com/in/yourusername</a>",
      "Twitter  : <a href='https://twitter.com/yourusername' target='_blank'>twitter.com/yourusername</a>",
      "<br>"
    ]
  },

  clear: {
    action: "CLEAR"
  }
};
