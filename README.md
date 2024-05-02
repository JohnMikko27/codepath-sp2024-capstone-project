# HoopTalk

This project was my capstone project from taking the Codepath Intermediate Web Development course.
This app is a discussion-like forum centralized around basketball.

Live Demo: https://hoop-talk.netlify.app/

## Description

This is a CRUD app where users can add, edit, delete posts, comment and upvote. Currently, there is no user auth so anyone can edit/delete any posts.

### Future additions

- Add user authentication/authorization so that only the creators of the post can edit/delete them

## Tech Stack

- Vite
- React
- TailwindCSS
- Supabase
- Netlify

## Installation

First clone the project on your local machine and cd into:

```
git clone <url>
cd codepath-sp2024-capstone-project
```

Then install dependencies and run the project:

```
npm install
npm run dev
```

Local environment: http://localhost:5173/

## CI/CD Pipeline

This app is hosted with Netlify and any pushes to the main branch will automatically update the app
