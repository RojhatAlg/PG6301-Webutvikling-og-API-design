# PG6301-Webutvikling-og-API-design

Command ```npm run install-test-start``` will install packages, start and run the test and then <br>
proceed to start the server and client. Then the application can be reached. <br>

It is possible to use ```npm start inside cd/client and cd/server``` but we prefer to use the command above. <br>

I noticed a potential writing error in the exam PDF. stating "A user should be able to delete a user they have published". <br>
I assumed the examleader meant that a user that publish an article can also delete the article. (In this case the Admin/redaktør). <br>

Created an app using Parcel, express, concurrently and Jest for testing. <br> <br>
I failed to deploy the app to Heroku because i didnt manage to create/use the free version provided by the school. <br>
Reason: I got Covid last exam in March and got emedical certificate to take the exam later agin (now).<br>  
And because i took this course in 2022, i was not participating in the classes, since i didnt click on that setting in studentweb. <br>
Since i was not being able to attend classes i couldnt see the video of the teacher showing class how to access Heorku with Kristiania providing it.<br>
Therefore there is no Heroku in my application, and i hope i dont get downgraded because of that. <br> 
Also ive read in the internet that they can take up to 24h to validate your account to the school...

<br>

The users i have for testing: <br>
name: user, email: user@gmail.com, password: user123 <br>
name: user2, email: user2@gmail.com, password: user123 <br>

the admin i have for testing: <br>
name: admin, email: admin@gmail.com, password: admin123 <br>
name: admin2, email: admin2@gmail.com, password: admin123 <br>

There is a few articles created by admin and admin2. Admin can create, update and delete articles. Also read other articles <br>
The users can only read articles. Both admin and user can see their profile details. Article list is avaible on all pages. <br>
Unauthorized users cannot access the full version of the articles.



