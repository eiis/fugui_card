import './index.css'

import App from './App.vue'

// import now from '~build/time'
// import {
//   CI,
//   github,
//   sha,
//   abbreviatedSha,
//   tag,
//   lastTag,
//   commitsSinceLastTag,
//   committer,
//   committerDate,
//   author,
//   authorDate,
//   commitMessage
// } from '~build/info';

// console.log(now)
// console.log('github', github)

const app = createApp(App)
console.log('app', app)

app.mount('#app')
