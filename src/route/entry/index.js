import {Link} from 'react-router-dom'
import {nil} from '~/util'
import style from './style.less'
import {TabBar} from '~/module/ui'

const {useEffect, useState, useRef, useCallback} = React

export default function() {
  const [state, setState] = useState({
    tab: {
      defaultIndex: 1,
      index: 1,
      items: ['图文', '光影']
    },

    name: 'JetLu'
  })

  const {tab} = state

  const onChange = useCallback((index) => {
    tab.index = index
    setState({...state})
  }, nil)

  console.log('render entry')

  return <section className={style.entry}>
    <TabBar
      className={style['tab-bar']}
      items={tab.items}
      defaultIndex={tab.defaultIndex}
      onChange={onChange}
    />

    {tab.index === 0 && <BlogList/>}
    {tab.index === 1 && <MediaList/>}
  </section>
}

function MediaList() {
  return <section className={style['media-list']}>
    <video src="static/video/1.mp4" preload="true"
      onClick={(ev) => {
        console.log('click')
        ev.target.play()
      }}
    ></video>
    <div>

    </div>
  </section>
}

function BlogList() {
  const [state, setState] = useState({
    data: []
  })

  const {data} = state

  if (!data.length) {
    return <section className={style['blog-list']}>
      <svg className={style['no-data']}><use xlinkHref="#no-data"/></svg>
    </section>
  }

  return <section className={style['blog-list']}>

  </section>
}
