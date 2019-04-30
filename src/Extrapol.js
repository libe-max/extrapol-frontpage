import React, { Component } from 'react'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import Hat from 'libe-components/lib/text-levels/Hat'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import { parseTsvWithTabs } from 'libe-utils'

export default class Extrapol extends Component {
  constructor () {
    super()
    this.c = 'extrapol'
    this.state = {
      loading: true,
      error: null,
      data: null
    }
  }

  componentDidMount () {
    const { spreadsheet } = this.props
    window.fetch(spreadsheet).then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.text()
    }).then(text => {
      const parsed = parseTsvWithTabs({
        tsv: text,
        tabsParams: [
          { start: 0, end: 2, keysLinePos: 1 },
          { start: 3, end: 5, keysLinePos: 1 }
        ]
      })
      const [videos, page] = parsed
      this.setState({
        loading: false,
        error: null,
        data: {
          videos,
          page: page[0]
        }
      })
    }).catch(err => {
      this.setState({
        loading: false,
        error: err.message
      })
    })
  }

  render () {
    const { c } = this

    const classes = [c]
    console.log(this.state)

    return <div className={classes.join(' ')}>
      <div className={`${c}__header`}>
        <div className={`${c}__hero`}>
          <PageTitle>Extrapol</PageTitle>
        </div>
        <div className={`${c}__hat`}>
          <Paragraph>
            Chaque jour, de nouveaux Extras étaient à découvrir sur ExtraPol. Vous en avez raté un ? Retrouvez tous les anciens Extras publiés ici.
          </Paragraph>
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
      </div>
    </div>
  }
}
