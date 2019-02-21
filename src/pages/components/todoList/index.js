import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import { AtButton, AtInput, AtFloatLayout, AtIcon, AtRate, AtSearchBar } from 'taro-ui'
import ToDoItem from '../todoItem'
import './index.less'

export default class TodoList extends Component {

  static defaultProps = {
    onUpdateTotalNum: () => { }
  }
  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      searchValue: '',
      isOpened: false,
      time: dayjs().add(90, 'minute').format('HH:mm'),
      date: dayjs().add(90, 'minute').isAfter(dayjs(), 'day') ? dayjs().add(1, 'day').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      rate: 0,
      items: []
    }
    this.colors = ['#45aaf2', '#4f9da6', '#c6cfff', '#f6b8d1', '#bf81ff', '#6d70c6', '#0ea5c6', '#009f9d', '#9692af', '#db996c']
  }

  componentDidMount () {
    this.setState({
      items: Taro.getStorageSync('items') || []
    }, () => {
      this.props.onUpdateTotalNum(this.state.items.length)
      Taro.eventCenter.trigger('updateHistory')
    })

    Taro.eventCenter.on('updateItems', () => {
      this.setState({
        items: []
      })
      this.props.onUpdateTotalNum(0)
    })
  }

  onChange (value) {
    this.setState({ value })
  }

  showAddTask () {
    this.setState(preState => ({
      isOpened: !preState.isOpened,
      time: dayjs().add(90, 'minute').format('HH:mm'),
      date: dayjs().add(90, 'minute').isAfter(dayjs(), 'day') ? dayjs().add(1, 'day').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      rate: 0,
      value: ''
    }))
  }

  onTimeChange (timeObj) {
    this.setState({
      time: timeObj.detail.value
    })
  }

  onDateChange (timeObj) {
    this.setState({
      date: timeObj.detail.value
    })
  }

  handleRateChange (rate) {
    this.setState({ rate })
  }

  getColor () {
    const len = this.colors.length
    return this.colors[~~(Math.random() * len)]
  }
  addTask () {
    const { value, time, date, rate } = this.state
    if (value) {
      this.setState(preState => ({
        items: preState.items.concat({
          id: Date.now(),
          content: value,
          date,
          time,
          rate,
          color: this.getColor()
        }),
        isOpened: false
      }), () => {
        Taro.setStorageSync('items', this.state.items)
        this.props.onUpdateTotalNum(this.state.items.length)
      })
    } else {
      this.setState({
        isOpened: false
      })
    }
  }


  onItemFinish (id) {
    this.setState(preState => {
      const history = Taro.getStorageSync('history') || []
      Taro.setStorageSync('history', history.concat({
        ...preState.items.filter(item => item.id === id)[0],
        finishTime: Date.now()
      }))
      Taro.eventCenter.trigger('updateHistory')
      return {
        items: preState.items.filter(item => item.id !== id)
      }
    }, () => {
      Taro.setStorageSync('items', this.state.items)
      this.props.onUpdateTotalNum(this.state.items.length)
    })
  }

  sortItem (a, b) {
    return a.id < b.id
  }

  onSearchChange (searchValue) {
    this.setState({
      searchValue,
      items: (Taro.getStorageSync('items') || []).filter(item => ~item.content.indexOf(searchValue))
    })
  }

  render () {
    return (
      <View className='todo_list'>
        <View className='add_task_button' onClick={this.showAddTask.bind(this)} >
          <AtIcon value='add' size='50' color='#fff' />
        </View>
        <AtFloatLayout className='float_layout' isOpened={this.state.isOpened} title='添加任务' onClose={this.showAddTask}>
          <AtInput
            clear
            focus={this.state.isOpened}
            cursorSpacing={266}
            name='value'
            type='text'
            value={this.state.value}
            onChange={this.onChange}
            placeholder='要做点什么?'
          />
          <Picker className='picker' mode='date' onChange={this.onDateChange} value={this.state.date}>
            <View >
              预计完成日期：{this.state.date}
            </View>
          </Picker>
          <Picker className='picker' mode='time' onChange={this.onTimeChange} value={this.state.time}>
            <View>
              预计完成时间：{this.state.time}
            </View>
          </Picker>
          <View className='picker'>
            <Text className='rate_text'>优先级：</Text>
            <View className='rate_logo'>
              <AtRate
                value={this.state.rate}
                onChange={this.handleRateChange.bind(this)}
              />
            </View>
          </View>
          <AtButton circle type='primary' onClick={this.addTask}>添加</AtButton>
        </AtFloatLayout>
        {
          (this.state.items.length || this.state.searchValue) && <AtSearchBar
            onChange={this.onSearchChange.bind(this)}
            value={this.state.searchValue}
            showActionButton={false}
          />
        }
        {
          !this.state.items.length && !this.state.searchValue && <View className='empty'>还没有添加过任务~~</View>
        }
        {
          !this.state.items.length && this.state.searchValue && <View className='empty'>没有搜索到相关任务~~</View>
        }
        {
          this.state.items.sort(this.sortItem.bind(this)).map(item => (
            <ToDoItem
              key={item.id}
              name={item.id}
              onItemFinish={this.onItemFinish}
              content={item.content}
              date={item.date}
              time={item.time}
              rate={item.rate}
              color={item.color}
            />
          ))
        }
      </View>
    )
  }
}
