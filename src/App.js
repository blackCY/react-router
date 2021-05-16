import BrowserRouter from './packages/BrowserRouter'
import Route from './packages/Route'

const Home = () => <>Home</>
const User = () => <>User</>

function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Home} />
      <Route path='/user' component={User} />
    </BrowserRouter>
  )
}

export default App
