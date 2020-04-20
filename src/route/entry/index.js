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
      <BlogList className={[tab.index === 0 ? style.active : ''].join(' ')}/>
      <MediaList className={[tab.index === 1 ? style.active : ''].join(' ')}/>
    </section>
  </section>
}

function MediaList(props) {
  const [state, setState] = useState({
    list: []
  })

  const play = useCallback(({target}) => {
    console.log(target.playing)
    target.muted = false
    target.play()
  }, nil)

  useEffect(() => {
    state.list.push({
      src: 'https://qiniu.lufei.so/video/movie.mp4'
    })
    setState({...state})
  }, nil)

  return <section className={[style['media-list'], props.className].join(' ')}>
    {
      state.list.map((item, i) => {
        return <Fragment key={i}>
          <video src={item.src}
            preload="yes"
            playsInline
            poster={require('@/static/img/icon.apple.png').default}
            onClick={play}
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

function BlogList(props) {
  const [state, setState] = useState({
    data: []
  })

  const {data} = state

  if (!data.length) {
    return <section className={[style['blog-list'], props.className].join(' ')}>
      <svg className={style['no-data']}><use xlinkHref="#no-data"/></svg>
    </section>
  }

  return <section className={style['blog-list']}>

  </section>
}
