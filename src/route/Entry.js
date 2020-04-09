import {Link} from 'react-router-dom'
import {nil} from '~/util'

const {useEffect} = React

export default function() {
  useEffect(() => {
    console.log('entry mounted')
    return () => console.log('entry unmount')
  }, nil)

  return <section>
    <Link to="/login">Login</Link>
    <Link to="/about">About</Link>
  </section>
}
