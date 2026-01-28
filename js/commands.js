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
      "<br>"
    ]
  },

  about: {
  output: [
    "<br>",
    "Yuvaraj (<span class='command'>Yuvi</span>)",
    "I'm a Computer Science undergraduate at the Madras Institute of Technology.", 
    "I like working on logic-based problems and building things from scratch just to see how they actually work.",
    "Most days I'm either learning core CS concepts, experimenting with small projects, or breaking something and fixing it again.",
    "Also a member of Google Developer Groups (GDG).",
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
      "<br>"
    ]
  },

  social: {
    output: [
      "<br>",
      `GitHub     : <a href=${constants.socials.GITHUB_URL} target='_blank'>github/${constants.socials.GITHUB_URL.split('/').pop()}</a>`,
      `LinkedIn   : <a href='${constants.socials.LINKEDIN_URL}' target='_blank'>linkedin/${constants.socials.INSTAGRAM_URL.split('/').pop()}</a>`,
      `Instagram  : <a href='${constants.socials.INSTAGRAM_URL}' target='_blank'>instagram/${constants.socials.INSTAGRAM_URL.split('/').pop()}</a>`,
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
  }
};
