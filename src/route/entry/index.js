import {Link} from 'react-router-dom'
import {nil, delay, client} from '~/util'
import style from './style.less'
import {TabBar} from '~/module/ui'
import dayjs from 'dayjs'

const {useEffect, useState, useRef, useCallback, Fragment} = React

const data = {
  tab: {
    defaultIndex: 1,
    index: 1,
    items: ['图文', '光影']
  },

  name: 'JetLu'
}

export default function(props) {
  const [state, setState] = useState(globalThis.STATE?.entry || data)

  const {tab} = state

  if (!client) {
    tasks.push(delay(3).then(() => {
      data.name = 'ssr'
      globalThis.STATE.entry = data
    }))
  }

  const onChange = useCallback((index) => {
    tab.index = index
    setState({...state})
  }, nil)

  console.log('render entry')

  return <section className={style.entry}>
    <section className={style.main}>
      <TabBar
        className={style['tab-bar']}
        items={tab.items}
        defaultIndex={tab.defaultIndex}
        onChange={onChange}
      />
      {tab.index === 0 && <BlogList/>}
      {tab.index === 1 && <MediaList/>}
    </section>
  </section>
}

function MediaList() {
  return <section className={style['media-list']}>
    {
      Array.from({length: 10}).map((_, i) => {
        return <Fragment key={i}>
          <video src="static/video/1.mp4"
            preload="yes"
            playsInline
            poster="static/video/1.mp4"
            muted
          ></video>
          <div className={style.tail}>
            <div>
              <svg className={style.location}><use xlinkHref="#location"></use></svg>
              <i>杭州</i>
            </div>
            <i className="color-gray font-14">{dayjs().format('YYYY/MM/DD HH:mm:ss')}</i>
          </div>
        </Fragment>
      })
    }
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
