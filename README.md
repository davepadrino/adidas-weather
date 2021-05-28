# Adidas weather application

## Technologies used:

Apart from the technologies required we're using:

- MongoDB (Mongoose)
- Docker / Docker compose
- Nodemon
- Axios
- Styled components

## Installing

A step by step series of examples that tell you how to get a development env running

first at all we need to clone the code

```
git clone https://github.com/davepadrino/adidas-weather.git
```

You can run the code via docker like:

```
docker-compose build (only once)
docker-compose up -d

docker-compose stop
```

Or manually you'll need to have Node installed locally.

```
yarn
cd api && yarn
cd ..
cd client && yarn
cd ..
yarn start
```

After this you can run localhost:3000 for client and localhost:9000 for api.

# Considerations

## Database

The database used for this project is MongoDB atlas, hosted in a personal cluster.

## Backend

- No tests were added but the environment is prepared to do so.
- A single model was created. Another implementation I thought about was create another model to store the cities/locations, but I prefered to keep it simple. (See https://github.com/davepadrino/adidas-weather/tree/master/api/models)
- A small helper was created to handle all the error messages (see: https://github.com/davepadrino/adidas-weather/tree/master/api/helpers)
- I used the basic functional approach instead of doing class-based.
- The `softDeleteRecord` and `getAllData` methods are created to do a soft deletion and fetch the whole buch of data paginated, but these methods aren't used in the frontend.
- Instead of implementing sockets or some another SSE technology i kept it simple as well by re-fetching the data with a set interval in the frontend every 2 minutes.

## Frontend

- The dropdown component is the only component where I spent more CSS time in the whole app, there you can see that I handle most of the CSS knowledge. (see: https://github.com/davepadrino/adidas-weather/tree/master/client/src/components/Dropdown)
- There's a "not found" section to avoid deep linking to other non-existing sections.
- No tests were considered in this implementation and no redux usage as well.
- The app show in the homepage data for the current date and selecting a city, data for the current week, even calculating dinamycally the current temperature by matching the array position vs the current time.
- To wipe all the data, i created a small system similar to the one used in github to remove a repo by typing a word.

## Version management

- Instead of deliver a single squashed commit, i decided to leave the commits as i did progress so you can review more or less the way i work.
