```bash
$ brew install redis
# To have launchd start redis now and restart at login:
#   brew services start redis
# Or, if you don't want/need a background service you can just run:
$ redis-server /usr/local/etc/redis.conf
$ brew services start redis
$ redis-cli
# redis> set foo bar
# OK
# redis> get foo
# "bar"
```
