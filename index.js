const flumeView = require('flumeview-level')

module.exports = {
  name: 'git',
  version: '1.0.0',
  manifest: {
    read: 'source'
  },
  init: function (sbot, config) {
    console.log('*** loading git-msg-log  ***')

    const view = sbot._flumeUse('git-ssb-web', flumeView(
      1.0,
      function map (msg, seq) {
        var c = msg.value.content
        var isGitMsg = c.type in msgTypes || (c.type == 'post' && c.repo && c.issue)
        if (isGitMsg) {
          return [msg.value.timestamp, msg.value.author]
        } else {
          return []
        }
      }
    ))
    console.log('init FlumeView', view)

    return {
      read: view.read
    }
  }
}

var msgTypes = {
  'git-repo': true,
  'git-update': true,
  'issue': true,
  'pull-request': true
}
