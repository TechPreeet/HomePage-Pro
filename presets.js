// presets.js
const PRESET_BOOKMARKS = [
  // SEARCH & PORTALS
  { name: "Google", url: "https://www.google.com", category: "Search & Portals", icon: "" },
  { name: "Bing", url: "https://www.bing.com", category: "Search & Portals", icon: "https://play-lh.googleusercontent.com/Llv5qosW9ejRHVUYmyNKucKbu271n15AqWV4kwLSUHrfYpzOrNeAunBZ9hnpphvRP0BR8yCfQUR-V1ZCeCrerA=w480-h960-rw" },
  { name: "DuckDuckGo", url: "https://duckduckgo.com", category: "Search & Portals", icon: "" },
  { name: "Yahoo", url: "https://www.yahoo.com", category: "Search & Portals", icon: "" },
  { name: "Wikipedia", url: "https://www.wikipedia.org", category: "Search & Portals", icon: "" },

  // SOCIAL MEDIA
  { name: "Instagram", url: "https://www.instagram.com", category: "Social Media", icon: "" },
  { name: "X / Twitter", url: "https://x.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/IsLsCD4eLC2CYvlkgTI6Z5TROj0BJIBgUF7BZ5eliTzyyTjqG_mbofeG4kw2s7oG_JZMSi5ErLz_qsDi169C8w=w480-h960-rw" },
  { name: "Facebook", url: "https://www.facebook.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/12KEJDhgk6oyE1VgmfCuFzFrQripZ_endElbvEhU1rZawQgV3RI-v3II8fDslI1sdC_WKBkmtxS3jxuIihk33Q=w480-h960-rw" },
  { name: "Reddit", url: "https://www.reddit.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/8FVS0kvM60JwqZWRNzBIlwrZZxJa8vpli8IWaaTo8QXRe1PHmCNJ8UpWoXkGPV3jKEaTY2OVAeYoisOnGJXY=w480-h960-rw" },
  { name: "LinkedIn", url: "https://www.linkedin.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/oij55bxj3e-4JrhGntpki0lnQyE8yQn8X5FPEzZ0t7cLppeiSINynEk7n9COoh7QSaCOZ_yiPO31NVaW4SDbWg=s512-rw" },
  { name: "TikTok", url: "https://www.tiktok.com", category: "Social Media", icon: "" },
  { name: "Pinterest", url: "https://www.pinterest.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/VExMwhu9Fe5kz72YnPWP6mHrNA5WfgZ-PJMnBnQmXFpLncTAOaaHtK4b8w7b2xxGxtqycDatYslVyNSLucl9QA=w480-h960-rw" },
  { name: "Snapchat", url: "https://www.snapchat.com", category: "Social Media", icon: "" },
  { name: "Discord", url: "https://discord.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/w2DdjDHGSj3DQElQQM0_J3PsNsALS-WD3CBeH0aXOYceR-F3aT02gFonhoFzz-Tc9ec8Dx9cLqh48-tzIFcP=s512-rw" },
  { name: "WhatsApp Web", url: "https://web.whatsapp.com", category: "Social Media", icon: "https://play-lh.googleusercontent.com/Gqxk4T0uZsDwFp07DE-508hkyvcNmgFuRwPiwTEfF7D7OzGv1FdHDzEyMxNsSBZLOJlGpe3ULvVM2RgrRAlBqA=w480-h960-rw" },

  // OTT & STREAMING
  { name: "YouTube", url: "https://www.youtube.com", category: "OTT & Streaming", icon: "https://play-lh.googleusercontent.com/QNmuZQc9I6Zbe3mWnSr0hycnENqGFCI5p3yE29Hkxtf22T0IWS6zTrpxULLyyjWpB7ONAXDsDQXnXcVWokl3eg=s512-rw" },
  { name: "Netflix", url: "https://www.netflix.com", category: "OTT & Streaming", icon: "https://play-lh.googleusercontent.com/fXVS45nukV1x9PYVSKHkCQK0QGCOishIvAOxIZS3sgRem8HS7l9l94_Ggj-WZPrTLePRdNYN4pp4SPAQL7oS0PU=w480-h960-rw" },
  { name: "Prime Video", url: "https://www.primevideo.com", category: "OTT & Streaming", icon: "" },
  { name: "Disney+", url: "https://www.disneyplus.com", category: "OTT & Streaming", icon: "" },
  { name: "Hulu", url: "https://www.hulu.com", category: "OTT & Streaming", icon: "" },
  { name: "Max", url: "https://www.max.com", category: "OTT & Streaming", icon: "" },
  { name: "Apple TV+", url: "https://tv.apple.com", category: "OTT & Streaming", icon: "" },
  { name: "Paramount+", url: "https://www.paramountplus.com", category: "OTT & Streaming", icon: "https://play-lh.googleusercontent.com/yU3omfdofyeO2Zfz1nYNc80-UajN2aR7HHcCZty45mI5dZW1QAz1PUdeI2t67UAldSk0PIyJoUkNIMS8HmdyRQ=w480-h960-rw" },
  { name: "Twitch", url: "https://www.twitch.tv", category: "OTT & Streaming", icon: "https://play-lh.googleusercontent.com/JHCM4AIyomRp6Lo2-5ugoznlGdsZmNnejVN8DLvtWFHShcz8YRgUE170f1CyOfrleYbtFL2g8tQ3VqlQNAgqoA=w480-h960-rw" },
  { name: "Spotify", url: "https://open.spotify.com", category: "OTT & Streaming", icon: "https://play-lh.googleusercontent.com/IzQgYCcnCFCD08GR-3bdtcT8xzOvrNkC84avGT5CwTX2VIqmTmKKJcP_Cd4JoBOdmCMlTndlOzV6hrthg2fOWA=w480-h960-rw" },

  // SHOPPING
  { name: "Amazon", url: "https://www.amazon.com", category: "Shopping", icon: "" },
  { name: "eBay", url: "https://www.ebay.com", category: "Shopping", icon: "https://play-lh.googleusercontent.com/q0_ZVJFuUH3WFZuZrP8JUMC54dwz1q_SZZufBDMqYaE8O2sLPulV1_dF3xGMQ6b102MTBZlluAF8z4AgZ-Isow=s512-rw" },
  { name: "AliExpress", url: "https://www.aliexpress.com", category: "Shopping", icon: "" },
  { name: "Etsy", url: "https://www.etsy.com", category: "Shopping", icon: "" },
  { name: "Walmart", url: "https://www.walmart.com", category: "Shopping", icon: "https://play-lh.googleusercontent.com/1ShbU7QfzARnG6UyuzvKY-bLtkGmJc8TMA2USJXmDtX84wvv4FWmV5smWR2FZci21eJfk5T8Ew7AuLq2AYdCLw=w480-h960-rw" },
  { name: "Target", url: "https://www.target.com", category: "Shopping", icon: "" },
  { name: "Best Buy", url: "https://www.bestbuy.com", category: "Shopping", icon: "https://play-lh.googleusercontent.com/Fm33xJQXHyu7chnz2UeFI2TpmGsOn8FjFIkANeInjpJuQYC2Lv65ouWXO74NqwL2c6AUl_FshD1bonZ5wEPZBDk=w480-h960-rw" },
  { name: "Temu", url: "https://www.temu.com", category: "Shopping", icon: "" },
  { name: "IKEA", url: "https://www.ikea.com/", category: "Shopping", icon: "https://play-lh.googleusercontent.com/_N3NNenXYjsa8DyXNixRtrCeNmW2p5F5Kk_vSkMUc-TJek2dg9xWGqUwm9OavAqTlAKaY5S2HluK87mKIQL1=w480-h960-rw" },
  { name: "Myntra", url: "https://www.myntra.com", category: "Shopping", icon: "" },
  { name: "Flipkart", url: "https://www.flipkart.com/", category: "Shopping", icon: "https://play-lh.googleusercontent.com/mlWjVjxflQoYJHBBgDQ08FqT8i3KnDG__2RH8P-GWOKlEPAIo8TllTZo3HDQ3J5zlO6oAhc1FAv0Bf2on0wL8w=s512-rw" },
  

  // NEWS
  { name: "Google News", url: "https://news.google.com", category: "News", icon: "https://play-lh.googleusercontent.com/m2k0X_fhgmj2MjDn_9rStPF9ngsXMO-DsC1ZhG3bcYl7hvJ9rwAOo7cKs9j5wnl-RNuDh-sfCUtF2sYzjcgzIg=w480-h960-rw" },
  { name: "BBC News", url: "https://www.bbc.com/news", category: "News", icon: "" },
  { name: "CNN", url: "https://www.cnn.com", category: "News", icon: "" },
  { name: "Reuters", url: "https://www.reuters.com", category: "News", icon: "https://play-lh.googleusercontent.com/2cRUg1B7tZBu4vcRzQ4zX5f96tn9A_VkDKea0vVZgClUMHCWibvDVKtHTUld2Qw4ddEQ1lnVRCyLZcDYMBYFYA=w480-h960-rw" },
  { name: "AP News", url: "https://apnews.com", category: "News", icon: "" },
  { name: "The New York Times", url: "https://www.nytimes.com", category: "News", icon: "" },
  { name: "The Guardian", url: "https://www.theguardian.com", category: "News", icon: "" },
  { name: "Al Jazeera", url: "https://www.aljazeera.com", category: "News", icon: "" },

  // ENTERTAINMENT
  { name: "IMDb", url: "https://www.imdb.com", category: "Entertainment", icon: "" },
  { name: "Rotten Tomatoes", url: "https://www.rottentomatoes.com", category: "Entertainment", icon: "" },
  { name: "Letterboxd", url: "https://letterboxd.com", category: "Entertainment", icon: "" },
  { name: "Fandom", url: "https://www.fandom.com", category: "Entertainment", icon: "" },
  { name: "9GAG", url: "https://9gag.com", category: "Entertainment", icon: "" },

  // AI TOOLS
  { name: "ChatGPT", url: "https://chatgpt.com", category: "AI Tools", icon: "" },
  { name: "Gemini", url: "https://gemini.google.com", category: "AI Tools", icon: "https://play-lh.googleusercontent.com/C64IqPWyFoCZzXVxXVl0Y6mliiNlG_sZJsqul-SBvk9ZL0wJHlU0Eho2wvsBHhho0FT5XQtH55RVGerIwXF_MA=s512-rw" },
  { name: "Claude", url: "https://claude.ai", category: "AI Tools", icon: "" },
  { name: "Microsoft Copilot", url: "https://copilot.microsoft.com", category: "AI Tools", icon: "" },
  { name: "Perplexity", url: "https://www.perplexity.ai", category: "AI Tools", icon: "" },
  { name: "Midjourney", url: "https://www.midjourney.com", category: "AI Tools", icon: "" },
  { name: "Leonardo AI", url: "https://leonardo.ai", category: "AI Tools", icon: "" },
  { name: "Runway", url: "https://runwayml.com", category: "AI Tools", icon: "" },
  { name: "Canva", url: "https://www.canva.com", category: "AI Tools", icon: "" },

  // PRODUCTIVITY
  { name: "Notion", url: "https://www.notion.so", category: "Productivity", icon: "" },
  { name: "Trello", url: "https://trello.com", category: "Productivity", icon: "" },
  { name: "Todoist", url: "https://todoist.com", category: "Productivity", icon: "" },
  { name: "Google Drive", url: "https://drive.google.com", category: "Productivity", icon: "https://play-lh.googleusercontent.com/chc-Fx3Qi3BisTZw1aOteYK_XkMHUiXKRbX2Hc8shyFI8pYt7DcyUPzVwLGJKIeKCKDD6nFVhEtUrIaEyzcnmA=w480-h960-rw" },
  { name: "Dropbox", url: "https://www.dropbox.com", category: "Productivity", icon: "" },
  { name: "OneDrive", url: "https://onedrive.live.com", category: "Productivity", icon: "https://play-lh.googleusercontent.com/pkzkr91OWFffdDGZ9706Ev2lxjM1pMizefY__r8JkCAtNVO-hmaMG2Qfx9ngpu7V7K4Yx_E7csAMl6fP7dGNS28=s512-rw" },
  { name: "Evernote", url: "https://evernote.com", category: "Productivity", icon: "https://play-lh.googleusercontent.com/dVQlfnQ_Fp-wNfKv2eI9XxbLymV6oGW_0ywIw3pxhYyKhjC0Lk8y6Ru_-sUc1fq2akADzAN7QWn8nPvcw6Ck=s512-rw" },
  { name: "Zoom", url: "https://zoom.us", category: "Productivity", icon: "https://play-lh.googleusercontent.com/-Ajlo-aDBHtpCez_yILc8Kepv_kNhbTJPw1WyvXgkh4O-hvUN-YD_v_0FlJmgRbZ2vn1OmZCmCBOY23h4kJYEA=w480-h960-rw" },
  { name: "Slack", url: "https://slack.com", category: "Productivity", icon: "https://www.securityweek.com/sites/default/files/images/Slack.png" },

  // DEVELOPER TOOLS
  { name: "GitHub", url: "https://github.com", category: "Developer Tools", icon: "https://play-lh.googleusercontent.com/nxpwi4UD84GNJuJ42S9U0f3lGDsHu8VkIDPCccFmJL6kyNVb1O3pTY1rl1YZICLBk6EcWIaX6n9prCbdUoQEOw=s512-rw" },
  { name: "GitLab", url: "https://gitlab.com", category: "Developer Tools", icon: "https://play-lh.googleusercontent.com/rFhnE6-POibr6fVnJam7tFkIAeR4uITdM-ziigWhuqQDJiGITG5taVprr9IGukLzU4nl6DRokqhaLqSjHfuM0aU=w480-h960-rw" },
  { name: "Stack Overflow", url: "https://stackoverflow.com", category: "Developer Tools", icon: "" },
  { name: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Developer Tools", icon: "" },
  { name: "CodePen", url: "https://codepen.io", category: "Developer Tools", icon: "" },
  { name: "npm", url: "https://www.npmjs.com", category: "Developer Tools", icon: "" },
  { name: "Postman", url: "https://www.postman.com", category: "Developer Tools", icon: "" },

  // EDUCATION
  { name: "Khan Academy", url: "https://www.khanacademy.org", category: "Education", icon: "" },
  { name: "Coursera", url: "https://www.coursera.org", category: "Education", icon: "https://play-lh.googleusercontent.com/LbjoYTPK5ZlNO3GDMZsFoGoRXHLoA2iTAUvJF7ePRZzbRPu7En-Go3wWXPXEdCL6grpkPHHavvzalozZrbJi=w480-h960-rw" },
  { name: "edX", url: "https://www.edx.org", category: "Education", icon: "https://play-lh.googleusercontent.com/Dsl3GBy_jH61cGrPV0as7KhNaLzwr9YQNN7xXbo26GuA2qs6hV1wJgdE3DFyIVJznuyqUrbGhKTOtAGfTYNRBg=w480-h960-rw" },
  { name: "Udemy", url: "https://www.udemy.com", category: "Education", icon: "" },
  { name: "Duolingo", url: "https://www.duolingo.com", category: "Education", icon: "" },
  { name: "Wolfram Alpha", url: "https://www.wolframalpha.com", category: "Education", icon: "https://play-lh.googleusercontent.com/27jY2voB8CFgMexjvusccPuqJYdMLTSEwbb7aCP0TI-cegOvhExyRXmBqHUFwdiFU1A5ndDh9KKTxFUqf0vbBg=s512-rw" },
  { name: "Quizlet", url: "https://quizlet.com", category: "Education", icon: "" },
  { name: "ResearchGate", url: "https://www.researchgate.net", category: "Education", icon: "" },

  // TRAVEL
  { name: "Google Maps", url: "https://www.google.com/maps", category: "Travel", icon: "https://play-lh.googleusercontent.com/B8pdO_2K5nBsF0g1h6dKwV_jQFLP-XombGDEQGtJT-mw1EUKCKJpa9lBGCF4rP_MwCsozSXyvI3z19g9R3J4=w480-h960-rw" },
  { name: "Booking.com", url: "https://www.booking.com", category: "Travel", icon: "" },
  { name: "Airbnb", url: "https://www.airbnb.com", category: "Travel", icon: "" },
  { name: "Tripadvisor", url: "https://www.tripadvisor.com", category: "Travel", icon: "" },
  { name: "Skyscanner", url: "https://www.skyscanner.com", category: "Travel", icon: "" },

  // WALLPAPERS & AESTHETICS
  { name: "Unsplash", url: "https://unsplash.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Pexels", url: "https://www.pexels.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Pixabay", url: "https://pixabay.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Wallhaven", url: "https://wallhaven.cc", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Wallpapercave", url: "https://wallpapercave.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "HDQWalls", url: "https://hdqwalls.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Simple Desktops", url: "https://simpledesktops.com", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Abstruct", url: "https://abstruct.co", category: "Wallpapers & Aesthetics", icon: "" },
  { name: "Zedge", url: "https://www.zedge.net", category: "Wallpapers & Aesthetics", icon: "" },

  // FOOD & DELIVERY
  { name: "Uber Eats", url: "https://www.ubereats.com", category: "Food & Delivery", icon: "" },
  { name: "DoorDash", url: "https://www.doordash.com", category: "Food & Delivery", icon: "https://play-lh.googleusercontent.com/daqnb5FdirTUewbv81mzwbnhD6_d1ITPYjM-XBFykk3QXRebKeaZLwWjyIbFKzLaEm6c12_wqVEHQhVrX3kO=w480-h960-rw" },
  { name: "Grubhub", url: "https://www.grubhub.com", category: "Food & Delivery", icon: "" },
  { name: "Deliveroo", url: "https://deliveroo.com", category: "Food & Delivery", icon: "" },
  { name: "Blinkit", url: "https://blinkit.com/", category: "Food & Delivery", icon: "https://play-lh.googleusercontent.com/dY1ryTjOaVsnslxvNamNvSBulmDUkvW5f5FJ_HDApMfecSOIxjCafpNAv4LTG8TJVyp0XR9tAAaRI4K77Eiqfg=w480-h960-rw" },

  // FINANCE
  { name: "PayPal", url: "https://www.paypal.com", category: "Finance", icon: "" },
  { name: "Wise", url: "https://wise.com", category: "Finance", icon: "" },
  { name: "Robinhood", url: "https://robinhood.com", category: "Finance", icon: "" },
  { name: "Coinbase", url: "https://www.coinbase.com", category: "Finance", icon: "" },
  { name: "Investing.com", url: "https://www.investing.com", category: "Finance", icon: "" },

  // WEATHER
  { name: "Weather.com", url: "https://weather.com", category: "Weather", icon: "" },
  { name: "AccuWeather", url: "https://www.accuweather.com", category: "Weather", icon: "https://play-lh.googleusercontent.com/wdQXBFb3I1NgNpRzJo9tMHJuV9P069NR5GJ2J7w8eX_SVarWLRarca-6MiemrDbnSqDQflFzvzjSG2smlwe39TQ=w480-h960-rw" },
  { name: "Windy", url: "https://www.windy.com", category: "Weather", icon: "" },

  // FUN & COOL
  { name: "Neal.fun", url: "https://neal.fun", category: "Fun & Cool", icon: "" },
  { name: "The Useless Web", url: "https://theuselessweb.com", category: "Fun & Cool", icon: "" },
  { name: "Cat Bounce", url: "https://cat-bounce.com", category: "Fun & Cool", icon: "" },
  { name: "Patatap", url: "https://www.patatap.com", category: "Fun & Cool", icon: "" },
  { name: "This Is Sand", url: "https://thisissand.com", category: "Fun & Cool", icon: "" },
  { name: "Scream Into The Void", url: "https://screamintothevoid.com", category: "Fun & Cool", icon: "" },
  { name: "100,000 Stars", url: "https://stars.chromeexperiments.com", category: "Fun & Cool", icon: "https://st.depositphotos.com/62229350/55683/v/450/depositphotos_556836856-stock-illustration-gold-star-dark-background-light.jpg" },
  { name: "Little Alchemy 2", url: "https://littlealchemy2.com", category: "Fun & Cool", icon: "" },
  { name: "Radiooooo", url: "https://app.radiooooo.com", category: "Fun & Cool", icon: "" },
  { name: "Geek Prank", url: "https://geekprank.com", category: "Fun & Cool", icon: "" },
  { name: "Click the Red Button", url: "https://clicktheredbutton.com", category: "Fun & Cool", icon: "" },
  { name: "I Waste So Much Time", url: "https://www.iwastesomuchtime.com", category: "Fun & Cool", icon: "" },
  { name: "Lamebook", url: "http://www.lamebook.com", category: "Fun & Cool", icon: "" },
  { name: "Not Always Right", url: "https://notalwaysright.com", category: "Fun & Cool", icon: "" },

  // INTERACTIVE & CREATIVE
  { name: "Instructables", url: "https://www.instructables.com", category: "Interactive & Creative", icon: "" },
  { name: "CreativeLive", url: "https://www.creativelive.com", category: "Interactive & Creative", icon: "" },
  { name: "Deep Dream Generator", url: "https://deepdreamgenerator.com", category: "Interactive & Creative", icon: "" },
  { name: "This Is Colossal", url: "https://www.thisiscolossal.com", category: "Interactive & Creative", icon: "" },
  { name: "A Soft Murmur", url: "https://asoftmurmur.com", category: "Interactive & Creative", icon: "" },
  { name: "WindowSwap", url: "https://window-swap.com", category: "Interactive & Creative", icon: "" },

  // RANDOM DISCOVERY
  { name: "Bored", url: "https://www.bored.com", category: "Random Discovery", icon: "" },
  { name: "Random Street View", url: "https://randomstreetview.com", category: "Random Discovery", icon: "" },
  { name: "Random.org", url: "https://www.random.org", category: "Random Discovery", icon: "" },
  { name: "Library of Babel", url: "https://libraryofbabel.info", category: "Random Discovery", icon: "" },
  { name: "MapChart", url: "https://mapchart.net", category: "Random Discovery", icon: "" },
  { name: "OneZoom", url: "https://www.onezoom.org", category: "Random Discovery", icon: "" },
  { name: "Timeanddate", url: "https://www.timeanddate.com", category: "Random Discovery", icon: "" }
];