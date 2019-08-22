# mongoose-cheerio-scraper

View live page here: [Tech News Scraper](https://cheerio-web-scraper.herokuapp.com)

Web app that lets users view and leave comments on the latest tech news. Using Mongoose and Cheerio to scrape news from another site.
Saves the articles and Comments to a MongoDB Database, Using mongoose to link the comments to the article they are attached to.

a user can:

* scrape new articles from [freecodecamp!](www.freecodecamp.com)

* Comment on the articles.

* Delete comments from the article

* View all articles with a comment

---

The commented articles page checks if the comments array on the article model has anything stored and only displays if there is an article that has at least one comment on it,

Otherwise it displays a message stating no articles to display.

Comments are linked to the articles through an array of comments which stores all of the commentIDS of the comments for that specific article in the article model. 

*This app was difficult because at the time of creating it I was completely new to NoSQL/MongoDB.*

---

## By **Vincent Shury**
#### _Full Stack Web Developer_

---
Thanks for viewing my repository.

Contact me here: 
* [Vincent Shury LinkedIn Profile](https://www.linkedin.com/in/vincent-shury/)

View more of my work:
* [Github Profile](https://github.com/Vincent440)
* [Portfolio page](https://vincent440.github.io/) 