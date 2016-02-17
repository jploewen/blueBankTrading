# Mobile Trading front-end and backend

## Overview
Mobile trading is a simple mobile application that will make purchases to a Trading web service application
running on an on-premise server.

### Table of content
* Overview
* Install the prereqs
* Getting setup with Bluemix
* Deploying My Trading app
* Building the UI and displaying on your mobile device

## Install the prereqs
You will need the following installations:
	* NodeJS / NPM https://nodejs.org/en/download/
	* WebPack  npm install webpack -g
	* Ionic and Cordova npm install -g cordova ionic

After installing the prereqs:
You need to run ` npm install ` to install needed dependencies

### Getting setup with Bluemix

1. Make sure you have [IBM Bluemix](https://console.ng.bluemix.net/) account
2. Make sure you have [Cloud Foundry CLI](https://www.ng.bluemix.net/docs/cli/downloads.html) tool installed
3. Open terminal and 	verify that cf tool is available by running `cf --version`

	* Setup `cf` tool to work with a Bluemix API server of your choice, for instance `cf target https://api.ng.bluemix.net`

	> Use following URLs for other Bluemix regions:

	> US-SOUTH `https://api.ng.bluemix.net`

	> UNITED KINGDOM `https://api.en-gb.bluemix.net`

	> SYDNEY `https://api.au-syd.bluemix.net`

Login with your Bluemix IBM ID credentials and pick your organization and space by running `cf login`

 	* Make sure you're in a right region, organization and space by running `cf target`


### Deploying My Trading app

1. Edit `server/manifest.yml` file. Change the `host` property to some unique value. There might be other applications deployed to Bluemix with `my-trading` host. If do not change it your deployment might fail.


2. Go into the server directory and use `cf push` command to deploy your application to Bluemix.
	* If you want to push to YS1, update the manifest-YS1.yml and use `cf push -f manifest-YS1.yml`

3. Once deployment completes successfully use `cf apps` command to see the list of available applications and their routes

4. Your Bluemix application should be available at `https//{hostname-from-manifest.yml}.mybluemix.net`

### Building the UI and displaying on your mobile device

Use cordova to add the platform where your mobile device will run:
	`cd mobile`
	`cordova platform add android` For android
	`cordova platform add ios` For ios

Edit the file to point to your server backend in bluemix:
	`cd mobile/www/js/src`
	Edit stockstore.jsx

Update line 1 to your running app in bluemix:
	var tradeURL = "http://my-trading.stage1.mybluemix.net/api/v1/trades";

Run `ionic build`
And you will see ** BUILD SUCCEEDED ** when it is done

To test locally from a browser, make sure the server is running in Bluemix
	Run `ionic serve`
	You will see the UI running in your browser
	Shrink it down so it looks like the size of a phone.
	If there are any issues, you will see them in the console

Run on mobile emulator:
	`ionic emulate ios` for IOS
	`ionic emulate android`  for Android

If you want to install on your phone:
	Follow the steps in this link for testing as a native app
	http://ionicframework.com/docs/guide/testing.html
