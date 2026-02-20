import * as constants from './config.js'

export const COMMANDS = {
  help: {
    output: [
      "<br>",
      "<span class='command'>help</span>     - You know about this",
      "<span class='command'>about</span>    - About me",
      "<span class='command'>projects</span> - View coding projects",
      "<span class='command'>social</span>   - View social links",
      "<span class='command'>resume</span>   - View my resume",
      "<span class='command'>clear</span>    - Clear terminal",
      "<span class='command'>exit</span>     - Close terminal",
      "<br>"
    ]
  },

  about: {
  output: [
    "<br>",
    "<span class='command'>YUVARAJ B</span> | BE CSE @ MIT, ANNA UNIVERSITY",
    "<br>",
    "backend builder",
    "core cs learner",
    "open-source contributor",
    "<br>",
    "backend co-lead @ gdg-mit",
    "<br>",
    "packets > pixels",
    "<br>",
    "most days you'll find me:",
    "• building small projects just to understand how things actually work",
    "• breaking perfectly fine setups and fixing them again",
    "<br>",
    "that one friend who says \"bro, just switch to linux\"",
    "<br>",
    "i use arch btw :)",
    "<br>"
  ]
},


  projects: {
    output: [
      "<br>",
      "<span class='command'>URL Shortener</span>",
      "A C++ URL shortener with CLI and web UI using Crow-CPP. Shortens long URLs with hashing, stores them in SQLite, and handles redirection via a built-in HTTP server.",
      `<a href='${constants.projects.URL_SHORTENER}' target='_blank'>${constants.projects.URL_SHORTENER}</a>`,
      "<br>",
      "<span class='command'>PassPal Bot</span>",
      "PassPal is a simple, private Telegram bot built in Java with Spring Boot to manage my passwords.",
      `<a href='${constants.projects.PASSPAL_BOT}' target='_blank'>${constants.projects.PASSPAL_BOT}</a>`,
      "<br>",
      "<span class='command'>Instagram Unsaver</span>",
      "A Python automation tool using Selenium to unsave all your saved Instagram posts effortlessly.",
      `<a href='${constants.projects.INSTAGRAM_UNSAVER}' target='_blank'>${constants.projects.INSTAGRAM_UNSAVER}</a>`,
      "<br>",
      "<span class='command'>Terminal Portfolio</span>",
      "A minimalist terminal-style developer portfolio built using HTML, CSS, and vanilla JavaScript",
      `<a href='${constants.projects.TERMINAL_PORTFOLIO}' target='_blank'>${constants.projects.TERMINAL_PORTFOLIO}</a>`,
      "<br>",
      "<span class='command'>GPA Calculator</span>",
      "A simple, user-friendly GPA calculator built using HTML, CSS, and JavaScript to help students calculate their SGPA, and CGPA easily.",
      `<a href='${constants.projects.GPA_CALCULATOR}' target='_blank'>${constants.projects.GPA_CALCULATOR}</a>`,
      "<br>",
      `Find more on my <a href='${constants.socials.GITHUB_URL}' target='_blank'>github</a>`,
      "<br>"
    ]
  },

  social: {
    output: [
      "<br>",
      `GitHub     : <a href='${constants.socials.GITHUB_URL}' target='_blank'>github/${constants.socials.GITHUB_URL.replace(/\/$/, '').split('/').pop()}</a>`,
      `LinkedIn   : <a href='${constants.socials.LINKEDIN_URL}' target='_blank'>linkedin/${constants.socials.LINKEDIN_URL.replace(/\/$/, '').split('/').pop()}</a>`,
      `Instagram  : <a href='${constants.socials.INSTAGRAM_URL}' target='_blank'>instagram/${constants.socials.INSTAGRAM_URL.replace(/\/$/, '').split('/').pop()}</a>`,
      "<br>"
    ]
  },

  resume: {
    output: [
      "<br>",
      "Opening resume in new tab...",
      "<br>"
    ],
    action: "OPEN_URL",
    url: constants.RESUME_URL
  },

  ls: {
    output: [
      "<br>",
      "about",
      "projects",
      "resume",
      "social",
      "help",
      "<br>"
    ]
  },

  clear: {
    action: "CLEAR"
  },

  exit: {
    output: [
      "<br>",
      "Goodbye! 👋",
      "You can close this tab with <span class='command'>Ctrl+W</span> or just close it manually.",
      "<br>"
    ],
    action: "EXIT"
  }
};
