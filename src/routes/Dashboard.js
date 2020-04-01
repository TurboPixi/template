import {fetch} from '../modules/util'

const {
  useCallback,
  useEffect
} = React


export default function() {
  useEffect((...args) => {
    console.log(args)
    fetch('/assets-api/monitor/tab1').then(({data}) => {
      console.log(data)
    })
  })

  return <section>
    dashboard
  </section>
}
