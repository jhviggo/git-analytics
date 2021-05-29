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
* EMAIL_MATCH is a string using the format "old_email=new_email", example "email1=email2,email3=email2" will show all emails as email2. If I had a primary email viggo@email.com and a secondary email myOtherEmail@email.cool, I would map the secondary as "myOtherEmail@email.cool=viggo@email.com" so all my commits would show under my primary email.

## environment variables
None of the environment variables are required but may be needed.
```
PORT=1337
LOGGING_LEVEL="short"
CMD_PATHS="C:/Users/Viggo/Documents/projects/some-repository"
STDIO_MAXBUFFER_KB=5000
EMAIL_MATCH="viggo-second-email@mail.com=vig56@hotmail.com"
EMAIL_REGEX="gmail.com"
```