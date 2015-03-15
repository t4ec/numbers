# Numbers
Simple game based on Flask & AngularJS

## Rules
Remove all duplicate numbers by clicking on them.

If you click number which does not have duplicates - you lose.

If you remove all duplicates - you win.

Refresh page to start over.

## Getting Started
Clone this repository, change directory to newly created folder.

Install python requirements:
```bash
pip install -r requirements.txt
```
Install **nodejs** and **npm** if you haven't done it yet.

Install dependencies:
```bash
npm install
```
Update webdriver:
```bash
npm run update-webdriver
```
Start webserver:
```bash
npm start
```
At this point you should be able to open http://localhost:5000 and check out this awesome app.

## Running E2E Tests
You should have webserver running + Chrome browser should be installed on your system.

Start webdriver-manager:
```bash
npm run start-webdriver
```

Run tests using protractor
```bash
npm run protractor
```
