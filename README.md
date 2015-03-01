# initializer-chat-app
isomorphic chat app built with the `react-router-initializer`

## Getting Started
To run the app

1) Fork and clone the Repo
2) `npm install`
3) `gulp start`
4) navigate to `localhost:8000` in your browser

## App Details
This is an isomorphic chat app using the `react-router` for both server and client side routes. The app uses `fetchr` for data requests so there's no managing server vs client-side requests

When a request for a page comes in the app runs the router to find the components to render, collects the needed data, and then serves up the rendered components

Afterwards it loads the JS client-side to add interactivity: client-side routing, server as api, etc

## Where the `react-router-initializer` Fits In
The `react-router-initializer` is used to allow the server to collect the necessary data for a route before rendering that route.

The `react-router-initializer` allows our components to describe the data they will need in order to be rendered before the rendering is striggered.

With this information, we can `initialize` our routes after we run them and before we render them, which means we gather our app data server-side using our components as our guides.

Without the 'react-router-initializer', our routes would have to know something about the data needed to render a particular route, which is much more information than we would like it to have.

## Files Using the `react-router-initializer`
### `initializerMixin` allowing our components to describe their data requests
[RoomsOwner](shared/Components/Rooms/RoomsOwner.js)
[MessagesOwner](shared/Components/Messages/MessagesOwner.js)
[LikesOwner](shared/Components/Likes/LikesOwner.js)

### `register` allowing our actions to register their promises, which the `react-router-initializer` will wait for the resolution of
[roomActions](shared/Actions/roomActions.js)
[messageActions](shared/Actions/messageActions.js)
[likeActions](shared/Actions/likeActions.js)

### `execute` running the `react-router-initializer` with our router state to trigger our requests and wait for the result
[server](server/server.js)

### `handle` allowing a component to indicate another component for the initializer to handle. This can be useful if their are components not in the top route components making requests for data
[MessagesOwner](shared/Components/Messages/MessagesOwner.js)
