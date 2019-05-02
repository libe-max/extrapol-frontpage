import React, { Component } from 'react'
import Dailymotion from 'react-dailymotion'

export default class VideoSlot extends Component {
  constructor () {
    super()
    this.c = 'extrapol-videoslot'
    this.state = {
      active: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const { active } = this.state
    if (!active) this.setState({ active: true })
  }

  render () {
    const { c, props, state, handleClick } = this
    const classes = [c]
    const playerProps = {
      height: '100%',
      width: '100%',
      video: props.url,
      uiTheme: 'light',
      paused: false,
      autoplay: true
    }
    const dailyWrapperStyle = {
      height: '100%',
      width: '100%',
      background: '#212121'
    }
    const imgPreviewStyle = {
      backgroundImage: `url(${props.image})`,
      cursor: 'pointer'
    }
    return <div onClick={handleClick} className={classes.join(' ')}>{
      state.active
        ? <div style={dailyWrapperStyle}><Dailymotion {...playerProps} /></div>
        : <div style={imgPreviewStyle} />
    }</div>
  }
}
