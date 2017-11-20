# Article-bot
A bot for recommending articles.

# Histroy
Based on: https://codelabs.developers.google.com/codelabs/cloud-slack-bot/index.html#0

# To get up and running
create a file called `slack-token` in the root directory and place your Slack Bot user OAuth access token in there
npm install
slack_token_path=./slack-token node article-bot.js

# To-do
- [ ] Extract articles to seprate file and then import it - updates will be easier
- [ ] Allow for user to specify time to read
- [ ] Remove chat cruft - no need to say hello / yes i want an article.
