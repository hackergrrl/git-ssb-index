var flumeView = require('flumeview-level')
var lex = require('lex62')

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
          return [msg.value.timestamp, msg.value.author + lex.encode(msg.value.sequence)]
        } else {
          return []
        }
      }
    ))

    return {
      read: view.read,
      author: function (opts) {
        opts.gt = opts.gt || 0
        opts.lt = opts.lt || 0
        if (opts.gt === -Infinity) opts.gt = '!'
        if (opts.lt === Infinity) opts.lt = '~'
        opts.gt = opts.id + numberToLex(opts.gt)
        opts.lt = opts.id + numberToLex(opts.lt) + '~'
        console.log('query opts', opts)
        return view.read(opts)
      }
    }
  }
}

function numberToLex (n) {
  if (n < 0) return n = 0
  if (n === Infinity) return Number.MAX_SAFE_INTEGER
  return lex.encode(n)
}

var msgTypes = {
  'git-repo': true,
  'git-update': true,
  'issue': true,
  'pull-request': true
}
