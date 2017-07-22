# Meow Channel

Meow Channel is a simple MEAN stack web app that cat-lovers can use it to post Meows (similar as 'Tweets') about their cats.  An admin user can be created to manage all the Meows.

## Requirements

Angular.js   Node.js   Mongodb   npm

## Installation & Setup

1. Clone the repository: ```git clone https://github.com/quanweilena/Meow-Channel.git```
2. Go into the directory: ```cd Meow-Channel```
3. Install the required packages: ``` npm install ```
4. Start the server:``` node server.js```
5. Start Mongodb Service:``` mongod```
6. Open your browser and input: ``` http://localhost:3000```

## Instructions

* Sign up:  Click "Not a member? Sign up!" on the main page to redirect to signup page.  Enter your username and password to create your own account.

* Log in: Enter your username and password to log in.

* Post Meows: After logging into your account, type whatever you want to meow today and hit "Meow!" button to post.  All the Meows are displayed as the order they posted.  Author of the Meow and the time that Meow was added are also displayed with the Meow.

* Delete Meow:  Hit the "x" button to delete a Meow.  Note that one user can only delete his/her own Meows.  Admin user can delete all posted Meows.

* Create admin user:  On signup page, use "admin" as the username to create the admin user to manage Meows.

## Authors

* **Dan Zhou**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
