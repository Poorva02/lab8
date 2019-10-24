# Validation

# downloading redis mac/linux
https://redis.io/download
- cd to download dirctory
- `make`
- `./src/redis-server`
# Redis windows:
- For windows : https://github.com/dmajkic/redis/downloads

# Redis basics
- https://github.com/NodeRedis/node_redis
- In-memory key value store
- Has basic atomic operations + other cool features
- https://redis.io/commands
- Used for syncing variables across instances, caching and broadcasting updates

# Testing redis cli
- Start from same directory as redis server
- `./src/redis-cli`
- View commands here: https://redis.io/commands
- View all keys with `KEYS *`
- Try to view a key with `GET myKey`


# Lab todo:
- Add username/password field, and a button
- On click send the username/password combo to service 2 to validate 
- Store username and hashed password as cookie
- Add a new button that makes a request to service 1
- From service 1, validate the request by asking service 2
- Cache the response in service 1.
- Verify subsequent hits to service 1 do not hit service 2 for the timeout period

![cache](cache.png "cache")