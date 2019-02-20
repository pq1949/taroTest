import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon, AtRate } from "taro-ui"
import './index.less'

export default class TodoItem extends Component {

  static defaultProps = {
    onItemFinish: () => { },
    options: [
      {
        action: 'cancel',
        text: '取消',
        style: {
          backgroundColor: '#6190E8'
        }
      },
      {
        action: 'finish',
        text: '完成',
        style: {
          backgroundColor: '#FF4949'
        }
      }
    ],
    content: '背单词100个！',
    date: '2019-2-19',
    time: '12:30',
    rate: 2,
    color: '#45aaf2'
  }

  render () {
    const { options, content, date, time, rate, color } = this.props
    return (
      <View className='todo_item' >
        <View className='item' style={{ background: color }}>
          <View className='content'>{content}</View>
          <View className='info'>
            <View className='date_time'>
              <AtIcon value='calendar' size='25' ></AtIcon>
              <Text className='text'>{date} {time}</Text>
            </View>
            <View className='rate'>
              <AtIcon value='tags' size='25' ></AtIcon>
              <View className='star' >
                <AtRate value={rate} />
              </View>
            </View>
          </View>
          <View className='finish' >
            <AtIcon value='check' size='25' ></AtIcon>
          </View>
        </View>
      </View>
    )
  }
}
