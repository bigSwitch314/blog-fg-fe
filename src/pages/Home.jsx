import React from 'react'
import { Button } from 'antd'

import { chunk, compact } from 'lodash'
import { format, getTime } from 'date-fns'
import './Home.less'
import './Test.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.test !== state.test) {
      return { test: props.test }
    }

    return null
  }

  componentDidMount() {
    const arr = [0, 1, 2, 4, 6, 8]
    console.log('chunk---------', chunk(arr, 2))
    console.log('compact---------', compact(arr))

    const a = format(new Date(2014, 1, 11), 'YYYY-MM-DD')
    console.log('format---------', a)
    const b = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
    console.log('getTime----------------------', b)
    // function3822()
    // const aa3q = 0
  }

  render() {
    return (
      <div>
        <h3>hello Webpack2228888822!</h3>
        <div className="">
          luoqiang
        </div>
        <Button type="primary">确定2</Button>
      </div>
    )
  }
}

export default Home