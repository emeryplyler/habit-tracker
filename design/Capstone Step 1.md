### Idea 1: habit tracker

### Users track their personal habits and progress in building good habits and managing bad habits. Users can add habits and the app will track progress and generate charts showing behavior over time. The app could also use APIs for weather and motivational quotes to make a personalized daily dashboard.

To set this app apart from similar ones, it will focus on keeping motivation for depressed people and people who struggle with basic tasks.

The app should prevent shame and guilt in the user over not following their habits; this could be accomplished by suggesting infrequent goals to start or suggesting a frequency adjustment.  
If the user breaks their streak, the app shouldn’t penalize them in any way; instead the app could focus on frequency over streaks and congratulate the user when the frequency of their good habits increases and that of their bad habits decreases. When the frequency moves in the wrong direction over a period of time or a number of habit days, the app will still avoid punishing the user; it should try to commend the user for hanging in there and offer encouragement or some kind of boost.

Additionally, some tasks are extremely difficult for some and trivial for others. When creating a habit, the user will be prompted to enter how much they have struggled with this specific task or habit. The app will mark each task with a level of difficulty. When the user succeeds, it gives a bigger reward and reminds the user that, for them, this is an actual accomplishment and may have taken a lot of effort. 

Finally, there may be some game elements to encourage and motivate the user. This may come in the form of a character traveling, where the greater the progress, the greater the distance. It would never move backwards to remind the user that progress is not linear and while it may feel like the user is failing, it’s simply another leg of their journey. Another option is something that builds up over time, like a city, coral reef, or other pleasant, lively place. As the user continues their habits, the reef example would have more fish and coral.

### 

### Idea 2: language database management site

For a small-team project, we made a database holding the top 3000 or so most common English words and their translations in Spanish, Portuguese, Chinese, and Japanese for use in a language learning video game. The management website would be an easy way to search, add entries, or edit existing information in the database using REST. On the website, after entering valid credentials, the user can fill out a few fields for a new word to add, specifying the word’s category, part of speech, and translations. If the word didn’t already exist in the database, the information would be sent to the database and a confirmation message would be sent back. This project would require its own custom API and would not only need to retrieve information but also send and overwrite existing information.

### Idea 3: animal species family tree

Using an API that has information about animals’ evolutionary lines, it would have an interface to add animals to a tree based on common ancestors; enter a name into the search bar, and a node will appear and either connect to or create other nodes in the tree leading back all the way to the origin of life as the root node. Animals that are related in some way will be connected through the tree based on family, genus, etc.

If possible, the nodes would be placed higher or lower based on when that node began to exist, with newer species or species that split off from ancestors more recently towards the top.

Wikimedia may be usable, but could take extra steps to find the needed information.

### Idea 4: minecraft to-do lists

- tracking materials for nested crafting recipes e.g. dispensers

- shows flow chart/dependencies; string \-\> bow \-\> dispenser

- EMI \- like? except you can track multiple tasks at once

- counting collected materials and how many need to be collected for crafting

- specify amount of items needed and what type

- may need to load information into a database

- support for a few mods? retrieve recipes from github

- user can use custom recipes

### Idea 5: weather

- pull from weather api, put into user-friendly ui

- slider to change hour

- multiple days

- dynamic animations dependent on weather data (intense rain on screen)

### Idea 6: stocks

- filter \- follow specific stocks

- use api to retrieve information user wants to track

- visualize data using graphs, colors, etc.

- set up alert system; email notifications

- similar to finviz.com