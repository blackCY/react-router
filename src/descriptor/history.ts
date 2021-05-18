import { createBrowserHistory } from 'history'

const history = createBrowserHistory({
  getUserConfirmation: getUserConfirmation(message, callback),
})
