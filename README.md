# Contractor Work Hours App (aka DCAM Staff Demo)

See it live: [Contractor Work Hours App](https://glittering-youtiao-dec919.netlify.app/)

## Description
A web app used by teachers of a music school business to record their students' attendance for the purpose of calculating their pay.
Currently used by 6 teachers.

## Background & Motivation
This app was conceived in order to cut down on the amount of time it takes to calculate teacher pay. Prior to the app, the administrator had to check the school's attendance software to see which students were present or absent for a particular teacher over a period of two weeks and then calculate the pay based on that information. This same task had to be repeated for 6-7 teachers, which took a lot of time. This app solved that problem by giving teachers the ability to log in and record their own attendance. The app takes this attendance information, and based on each teacher's pay rate, calculates the total amount owed.

## Technologies
The current version of this project was done with:
* HTML + Tailwind CSS
* React / Next.js
* Firebase Auth
* Firebase Firestore
* Firebase Storage

## State of Completion
Completed and actively being used by 6 teachers. More improvements/features will be added going forward as per user feedback and business requirements.

## Learning Lessons & Challenges
### Working with Firestore data
One of the trickier parts of this app was working with the database (Firestore) data. I first had to figure out how to best organize my raw data in the database itself, and then what data structure to use to store that data in my app once I retrieve it. This took a bit of trial and error but I eventually came up with what seemed to be the optimal solution. I also had to brush up on the methods that Firebase provides for performing CRUD operations with the todo tasks and calendar reminders. Lastly, I decided to set up a live listener to the database, so that any CRUD operations would be reflected in real time, without having to refresh the page. All this was a challenge but it also taught me a lot about working with databases, which I think is a great asset to have for Front End Developers under their belt.

### Working with React Day Picker
For the Calendar feature, I chose react-day-picker as my calendar. This was my very first time working with this component and it was a big learning curve. The trickiest part was figuring out how to limit the calendar to the time range that I wanted and how to highlight/circle the dates with content in them. I did notice that while the dates with content circle properly on most platforms, they do not show up when viewed on the iPhone/safari. Although this is not a big issue for us as the admin mostly works on a desktop or laptop computer, it is something I plan to look into further down the road.

### Authentication
Although I had worked with Firebase Auth briefly before, this project gave me an opportunity to refresh my knowledge on this topic. As mentioned earlier, I removed auth functionality for the demo version, but the commented out code can still be found in FirebaseContext.js file. Because I did not need any advanced auth-based functionality, I only used the Context API for the auth.

## Summary
As mentioned, this app has been a work in progress and what you see now is its current state. I am always working to improve and optimize it even further and will continue to make updates and add more functionality as needed. For now though, it is fully-functional and is being used by the office front desk every day.




