import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import Hat from 'libe-components/lib/text-levels/Hat'
import BlockTitle from 'libe-components/lib/text-levels/BlockTitle'
import Slug from 'libe-components/lib/text-levels/Slug'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Annotation from 'libe-components/lib/text-levels/Annotation'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import { parseTsvWithTabs } from 'libe-utils'

import VideoSlot from './components/VideoSlot'

export default class Extrapol extends Component {
  /* * * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'extrapol'
    this.state = {
      loading: true,
      error: null,
      data: {
        videos: [],
        page: {},
        subjects: []
      }
    }
  }

  /* * * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { spreadsheet } = this.props
    window.fetch(spreadsheet).then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.text()
    }).then(text => {
      const parsed = parseTsvWithTabs({
        tsv: text,
        tabsParams: [
          { start: 0, end: 3, keysLinePos: 1 },
          { start: 4, end: 6, keysLinePos: 1 },
          { start: 7, end: 8, keysLinePos: 1 },
        ]
      })
      const [videos, page, subjects] = parsed
      this.setState({
        loading: false,
        error: null,
        data: {
          videos: [...videos].sort((a, b) => {
            const aDate = moment(a.date, 'DD/MM/YYYY')
            const bDate = moment(b.date, 'DD/MM/YYYY')
            return bDate - aDate
          }),
          page: page[0],
          subjects
        }
      })
    }).catch(err => {
      this.setState({
        loading: false,
        error: err.message
      })
    })
  }

  /* * * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * * */
  render () {
    const { c, state } = this

    const classes = [c]

    // DOM for loading and error states
    if (state.loading) {
      return <div className={classes.join(' ')}>
        <div className={`${c}__loading`}>
          <Loader />
        </div>
      </div>
    } else if (state.loading) {
      return <div className={classes.join(' ')}>
        <div className={`${c}__error`}>
          <LoadingError />
        </div>
      </div>
    }

    const { videos, page, subjects } = state.data
    const heroStyle = { backgroundImage: `url(${page.image_url})` }

    // DOM
    return <div className={classes.join(' ')}>
      <div className={`${c}__header`}>
        <div className={`${c}__hero`} style={heroStyle}>
          <PageTitle>{page.page_title}</PageTitle>
        </div>
        <div className={`${c}__hat`}>
          <Paragraph>{page.page_intro}</Paragraph>
        </div>
      </div>
      <div className={`${c}__links`}>
        <Paragraph>
          <a href='http://extrapol.fr'>
            Extrapol.fr
          </a>
        </Paragraph>
        <a href='https://itunes.apple.com/fr/app/extrapol/id1199889546' className="app-store">
          <img src='./assets/app-store.png' alt='Itunes App Store icon' />
        </a>
        <a href='https://play.google.com/store/apps/details?id=fr.indelebil.extrapol' className="app-store">
          <img src='./assets/google-play.png' alt='Google Play icon' />
        </a>
      </div>
      <div className={`${c}__content`}>
        {videos.map((vid, i, videos) => {
          const currentSubject = subjects.find(sub => sub.date === vid.date)
          const dayLabel = (i === 0 || vid.date !== videos[i - 1].date)
            ? <div key={vid.date} className={`${c}__day-label`}>
              <Slug>{moment(vid.date, 'DD/MM/YYYY').format('Do MMMM')}</Slug>
              <BlockTitle>{currentSubject ? currentSubject.subject : 'Sans sujet'}</BlockTitle>
            </div>
            : ''
          const videoSlot = <div key={vid.url}
            className={`${c}__video-slot`}>
            <VideoSlot url={vid.url} image={vid.image} />
            <Annotation>{vid.list}</Annotation>
          </div>
          return [
            dayLabel,
            videoSlot
          ].filter(e => e !== '')
        })}
        <LibeLaboLogo />
      </div>
    </div>
  }
}
