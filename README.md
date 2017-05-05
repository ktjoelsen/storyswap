# The Story Swap

The Story Swap is an online community where people can be authentic and real, exchanging personal stories through video, and engaging in discussion around shared experiences.

This is a web app running on Express, Node.js, and MongoDB. 

### Install Node.js and Nodemon

Download Node here: https://nodejs.org/en/download/   
This is Nodemon: https://www.npmjs.com/package/nodemon 


### Install the web app

$ cd <desired_directory>

$ git clone https://github.com/ktjoelsen/storyswap 

$ npm install

### Set up environment variables

Create a file .env with the following contents:   
PROD\_MONGODB=<database_uri> .  


### Run the app locally
$ NODE_ENV=development nodemon


### Deploy changes to Heroku
Push to the "deploy" branch. Heroku automatically rebuilds with each commit to the remote deploy branch.




