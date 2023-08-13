# Contractor Work Hours App (aka DCAM Staff Demo)

See it live: [Contractor Work Hours App](https://glittering-youtiao-dec919.netlify.app/)

## Login Credentials for demo/testing purposes:

### User 1 - Paula
Username: paula@gmail.com<br>
Password: paula123

### User 2 - Michelle
Username: michelle@gmail.com<br>
Password: michelle123

### User 3 - Diego
Username: diego@gmail.com<br>
Password: diego123

## Description
A web app used by teachers of a music school business to record their students' attendance for the purpose of calculating their pay.
Currently used by 6 teachers.

## Background & Motivation
This app was conceived in order to cut down on the amount of time it takes to calculate teacher pay. Prior to the app, the administrator had to check the school's attendance software to see which students were present or absent for a particular teacher over a period of two weeks and then calculate the pay based on that information. This same task had to be repeated for 6-7 teachers, which was tedious and took a lot of time. This app solved that problem by giving teachers the ability to log in and record their own attendance. The app takes this attendance information, and based on each teacher's pay rate, calculates the total amount owed and displays this information to the school admin (see Office Admin App).

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
I had to think carefully about how many collections I would need to have in Firestore for this app and what sort of data and data structure to use for each collection. This was a nice mental challenge but I enjoyed the process of figuring it out. In the end, I ended up a separate collection to store the student attendance and things like lesson duration and pay rate for each teacher. I also had to create a separate collection which I called "meta-data" which has each teacher as a document and stores information on whether or not they have submitted their attendance for a particular week. These collections are all accessed by the "Office Admin App" to be able to view this information for each teacher.

### Figuring out the closest payday according to when the user logs in
I had to figure out a way to figure out what the closest pay period is based on the date when a teacher logs in to their account. My way of solving this was to put all the pay days in an array and then take the date when the teacher logs in and compare it to that array using a for loop. If today's date is bigger than a particular payday, it just returns the next pay day. I am sure there are several ways in which I could have performed this logic, but my method seems to work well and I am proud of having solved this problem!

### Querying database for attendance status
I had to create logic to be able to check whether or not a teacher has already submitted attendance for a particular week. If so, they would need to be redirected accordingly. For example if week 1 attendance was submitted and a teacher tries to go to that page again, they will get a message notifying them of this and be redirected to the week 2 attendance page. Likewise, if they submitted attendance for both weeks but try to do it again within the same pay period, they will be redirected to the "success" page, which tells them that their attendance for the closest pay period has already been submitted.

### Setting up route guards
I also had to figure out how to set up route guards based on whether or not a user is logged in and the logged-in user's id. So when a user attempts to access a particular route, the route guard performs a check on that user's id and decides whether or not they are permitted access. If they are not, it redirects them to the home page.

### Using Firebase Storage
This app was the very first time I used Firebase Storage. I used it in order to store profile images for each of the teachers. When a teacher logs in with correct credentials, their profile image is displayed next to the "Sign Out" button. This taught me that Storage is a good choice for storing such images.

## Summary
The app is currently being used by all the teachers at the school to log their hours. So far everything seems to work well but as always, I will continue to listen to user feedback and make necessary changes/updates accordingly. Most of all, I am happy to have made an app that is useful, solves a problem, and is used by real users!