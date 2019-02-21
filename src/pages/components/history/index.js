import Taro, { Component } from '@tarojs/taro'
import { AtTimeline } from 'taro-ui'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import './index.less'

export default class History extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      items: []
    }
  }
  componentWillMount () { }

  componentDidMount () {
    Taro.eventCenter.on('updateHistory', () => {
      this.updateItems(Taro.getStorageSync('history') || [])
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  updateItems (todos) {
    const items = []
    todos.sort((a, b) => a.finishTime < b.finishTime).forEach(item => {
      const ahead = item.finishTime <= dayjs(`${item.date} ${item.time}`).valueOf()
      items.push({
        title: item.content,
        icon: ahead ? 'check-circle' : 'close-circle',
        content: [
          `开始时间：${dayjs(item.id).format('YYYY-MM-DD HH:mm')}`,
          `计划完成时间：${dayjs(`${item.date} ${item.time}`).format('YYYY-MM-DD HH:mm')}`,
          `实际完成时间：${dayjs(item.finishTime).format('YYYY-MM-DD HH:mm')}`,
          `${ahead ? '按时完成!' : '延期完成！'}`
        ],
        color: ahead ? 'green' : 'red'
      })
    })
    this.setState({ items })
  }

  render () {
    return (
      <View className='history'>
        {
          this.state.items.length && (
            <View className='items'>
              <AtTimeline
                items={this.state.items}
              />
            </View>
          )
        }
        {
          !this.state.items.length && <View className='no_items'>暂无数据~~</View>
        }
      </View>
    )
  }
}
