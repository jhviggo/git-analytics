# Git Analytics
Git Analytics is a tool for analysing repositories to get an overview of potential issues.

## Purpose
This is the final project for my Datamatiker degree (AP CS)

# How to use
* Clone the repo onto your machine
* Install the packages `npm i`
* Create a `.env` file and set the repository you want to analyse as `CMD_PATH="path/to/git/repo"`
* run the service with `npm run dev`

## configure
There are two interesting environment variables: EMAIL_MATCH and EMAIL_REGEX.
* EMAIL_REGEX is a simple regex string, which will group matching emails as 'other' on the knowledge map.
* EMAIL_MATCH is a string using the format "email1=email2,email3=email2", which will convert both email1 and email3 to email2. If I had a primary email viggo@email.com and a secondary email myOtherEmail@email.cool, I would map the secondary as "myOtherEmail@email.cool=viggo@email.com" so all my commits would show under my primary email.