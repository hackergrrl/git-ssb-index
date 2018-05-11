const flumeView = require('flumeview-level')

module.exports = {
  name: 'git',
  version: '1.0.0',
  manifest: {
    read: 'source',
    author: 'source'
  },
  init: function (sbot, config) {
    console.log('*** loading git index***')

    const view = sbot._flumeUse('git-ssb', flumeView(
      1.0,
      function map (msg, seq) {
        var c = msg.value.content
        var isGitMsg = c.type in msgTypes || (c.type == 'post' && c.repo && c.issue)
        if (isGitMsg) {
          return [msg.value.timestamp, msg.value.author + msg.value.timestamp]
        } else {
          return []
        }
      }
    ))

    return {
      read: view.read,
      author: function (opts) {
        opts.gt = opts.gt || ''
        opts.lt = opts.lt || ''
        opts.gt = opts.id + opts.gt
        opts.lt = opts.id + opts.lt + '~'
        return view.read(opts)
      }
    }
  }
}

var msgTypes = {
  'git-repo': true,
  'git-update': true,
  'issue': true,
  'pull-request': true
}
