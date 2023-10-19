
# Habit Tracker App using Nodejs
This is a intermediate level project where any user can track the daily status of no of habbits. This is quite useful in our life to become disciplined. Here the user first need to signup and then he/she can sign in and establish the identity and start using the web-app.


## Tech Stack

**Client:** Javascript, EJS

**Server:** Node, Express, MongoDB


## Features

- Add/ Delete a habit
- Detail view contains Habit title, Excution time, weekly streak
- Weekly view contains a dynamic real time 7 days calendar.
- Each date is having a toggle button
- Click on toggle button swich between 3 status, 1. Unmark(default), Done, Not Done.
- Weekly streak is dynamically updated with toggling the status.




## Demo

![App Screenshot](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmRuemIwbm44dXdlNHpod2Z5dHhzeWY2c25yNHlra2QzcXlsNWkzMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iADBIe0iGM2HnreJAO/giphy.gif)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`
`SENDER_EMAIL`
`EMAIL_KEY`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`GOOGLE_CALLBACKURL`



## Installation

Install the project with either downloading the zip file or git pull and npm.

```bash
  npm install  
```
- Create a .env file

- Add the MONGO_URL inside the .env file 
```bash
  npm start  
```

    
## Lessons Learned

In this project the hard part was to design the database schema. 

We have created two schema for this particular project.

    1.  habits
Fields: title, time, goal

    2.  habit_statuses

Fields: habbit, date, status

- Then another difficult part was to store and render all the statuses in and from the database dynamically for the whole year.
- Counting the Done status to show the completion streak every week.
- Use fecth API to store and get the status data to change the UI using Ajax without refreshing the whole webpage.

## Author

- [Sumit Biswas](https://github.com/sbsumitpro)

