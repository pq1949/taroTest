import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtRate } from "taro-ui"
import dayjs from 'dayjs'
import './index.less'

export default class TodoItem extends Component {

  static defaultProps = {
    onItemFinish: () => { },
    name: null,
    content: '背单词100个！',
    date: '2019-2-19',
    time: '12:30',
    rate: 2,
    color: '#45aaf2'
  }

  constructor () {
    super(...arguments)
    this.state = {
      animationData: {}
    }
  }

  componentDidMount () {
    const animation = Taro.createAnimation({
      duration: 300,
      timingFunction: 'ease'
    });
    this.animation = animation
  }

  finishItem () {
    this.animation.translateX('-110%').step()
    this.setState({
      animationData: this.animation.export()
    })
    setTimeout(() => {
      this.props.onItemFinish(this.props.name)
    }, 300)
  }
  render () {
    const { content, date, time, rate, color, name } = this.props
    return (
      <View className='todo_item' animation={this.state.animationData} >
        <View className='item' style={{ background: color }}>
          <View className='content'>{content}</View>
          <View className='info'>
            <View className='date_time'>
              <View className='start_time'>
                <AtIcon value='play' size='15' ></AtIcon>
                <Text className='text' >{dayjs(name).format('YYYY-MM-DD HH:mm')}</Text>
              </View>
              <View className='end_time'>
                <AtIcon value='sketch' size='15' ></AtIcon>
                <Text className='text' style={{color: Date.now > dayjs(`${date} ${time}`).valueOf() ? 'red': ''}}>{`${date} ${time}`}</Text>
              </View>
            </View>
            <View className='rate'>
              <AtIcon value='tags' size='25' ></AtIcon>
              <View className='star' >
                <AtRate value={rate} />
              </View>
            </View>
          </View>
          <View className='finish' onClick={this.finishItem}>
            <AtIcon value='check' size='25' ></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
