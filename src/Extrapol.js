import React, { Component } from 'react'
import InterTitle from 'libe-components/lib/text-levels/InterTitle'
import Hat from 'libe-components/lib/text-levels/Hat'

export default class Extrapol extends Component {
  constructor () {
    super()
    this.c = 'extrapol'
  }

  render () {
    const { c } = this

    const classes = [c]

    return <div className={classes.join(' ')}>
      <div className={`${c}__hero`}>
        <InterTitle level={1}>Extrapol</InterTitle>
      </div>
      <div className={`${c}__hat`}>
        <Hat small>
          Chaque jour, de nouveaux Extras étaient à découvrir sur ExtraPol. Vous en avez raté un ? Retrouvez tous les anciens Extras publiés ici.
        </Hat>
      </div>
    </div>
  }
}
