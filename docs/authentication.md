# Authentication...

## Here are the instructions to test backend auth for this project

1. In project root, from command line, type command `npm install`
2. In the project root, from command line, type the command `npm run dev`
3. If successful, open browser and go to http://localhost:8000/api/users this is a GET request that will fetch all users.
4. To test signup (POST request), go to your POSTMAN and and use http://localhost:8000/api/users/register send a body.

```
{
  "name":"name here",
  "email": "email@email.com",
  "password": "password",
  "passwordTwo": password
}
```

This Should return a success: true and token (save this token including 'Bearer' to test currentUser route)

5. To test login (POST request), go to your POSTMAN and and use http://localhost:8000/api/users/login send a body.

```
{
  "email": "email@email.com",
  "password": "password",
}
```

This Should return a success: true and token (save this token including 'Bearer' to test currentUser route)

6. To test currentUser (GET request), go to your POSTMAN and and use http://localhost:8000/api/users/current send a header.

On Headers tab:

- 1st key should be Content Type & value should be application/json
- 2nd key should be Authorization & value should be the copied and pasted token form above => the word Bearer, a space, the entire token string. ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZmEzYjUxNTBjZTAzZDhhMTMwYzU1ZiIsIm5hbWUiOiJ0d28iLCJpYXQiOjE1NDMxMzE0MzAsImV4cCI6MTU0MzMwNDIzMH0.cCTvy-55ioFiJ3npwXtKuGYyyolgBIfTe0qTBPDxTSQ

This Should return id, name and email of current user (last user you signed in).

## Moved some things around in server.js, some commented out code for reference and options if you can think of a better way to write it, will be looking into front end auth next so we can bring all this to the application!

### if theres something wrong just message me.
