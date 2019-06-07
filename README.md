# mongoose-cheerio-scraper

Live application -> [Tech News Scraper](https://secret-atoll-83145.herokuapp.com/)

Web app that lets users view and leave comments on the latest tech news. Using Mongoose and Cheerio to scrape news from another site.
Saves the articles and Comments to a MongoDB Database, Using mongoose to link the comments to the article they are attached to.

a user can:

* scrape new articles from [freecodecamp!](www.freecodecamp.com)

* Comment on the articles.

* Delete comments from the article

* View all articles with a comment

---

This app was expecially tricky since I had not been familiar with NoSQL/ MongoDB.

The commented articles page checks if the comments array on the article model has anything stored and only displays if there is an article that has at least one comment on it,

Otherwise it displays a message stating no articles to display.

Comments are linked to the articles through an array of comments which stores all of the commentIDS of the comments for that specific article in the article model. 

#### By Vince Shury

Thanks again for viewing my repository.

If you like this application please check out my [Github Profile](https://github.com/Vincent440) to see my other repositories.

Don't forget to view my [Github Portfolio page](https://vincent440.github.io/) well you are there Thanks!