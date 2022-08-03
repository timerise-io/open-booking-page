[![GitHub](https://img.shields.io/github/license/timerise-io/open-booking-page)](https://github.com/timerise-io/open-booking-page/blob/main/LICENSE.md)


[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=349830&theme=light)](https://www.producthunt.com/posts/timerise)

# Timerise open source booking page

We are pleased to provide our booking page in open-source. We hope it will be useful in your use case. It can be embedded on websites and applications, under buttons, and in popups - on desktop and mobile. Happy booking!

Timerise open source booking page was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Make it yours
Adjust the appearance and content of the booking pages to your brand and services.

![image](https://cdn.timerise.io/landing-page/section-make-it-yours.png)

## Installation

Run following script in the root directory:

```
npm ci
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Developer mode is by default connected to the sandbox environment. If you want to connect to a different environment during development please edit `.env.development` file in the root folder.

To open the service page on localhost use link [http://localhost:3000/service/{replace-with-service-id}](http://localhost:3000/service/{replace-with-service-id})

To make your life easier we prepared a default service on the sandbox environment which you can use for testing [http://localhost:3000/service/E95rBw4j9Thhts2vzY1Y](http://localhost:3000/service/E95rBw4j9Thhts2vzY1Y).

We encourage you to create your own services on the sandbox environment via [user interface](https://sandbox.timerise.io/) or [api](https://studio.apollographql.com/public/TIMERISE-API/explorer?variant=sandbox). Of course you can do it for free.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
For more information click [here](https://create-react-app.dev/docs/production-build/).

## Folders structure

```
root folder
├── components
├── features
│   └── feature
│       ├── api
│       │   ├── mutations
│       │   └── queries
│       ├── components
│       └── hooks
├── models
├── pages
└── state
```


# See how Timerise works
[![Vimeo](https://cdn.timerise.io/landing-page/video-placeholder.png?w=2048)](https://vimeo.com/703918323)
