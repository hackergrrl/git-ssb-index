# git-ssb-index

> git indexes for [secure-scuttlebutt](http://scuttlebutt.nz)

This plugin adds indexes for quickly looking up git-related scuttlebutt
messages, both in general and by a specific author.

## Install

With scuttlebot or Patchwork running:

```
$ sbot plugins.install git-ssb-index
```

Then restart scuttlebot / Patchwork.

You'll need git-ssb-web installed to enjoy these changes. Most page loads on
git-ssb-web will now be powered by a fast local index instead of scanning many
potential non-git-related messages.

## License

ISC

