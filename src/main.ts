import './index.css'

import * as Sentry from '@sentry/vue'
import type Person from './person.json'

// import person from './person.json'
import App from './App.vue'

// import router from '@/routers'
import '@unocss/reset/tailwind.css'
import 'uno.css'

// import { thing } from './my-module'

// console.log(thing.name)
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_APP_VERSION)
// console.log(import.meta.env.)

interface User {
  age: number
  name: string
}

const jo: User = {
  age: 18,
  name: 'jo',
}
console.log('jo', jo)

// console.log(_, 'lodash-es')

// type person = typeof Person

// const person1: person = {
//   $id: 'https://example.com/person.schema.json',
// }

// console.log(person1)

// console.log(1)

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
// console.log('app', app)

// app.use(router)

Sentry.init({
  app,
  dsn: 'https://34f91b4fbf62153901cb140f726c2270@o4506160779624448.ingest.sentry.io/4506160810098688',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      // tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      // routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

app.mount('#app')
