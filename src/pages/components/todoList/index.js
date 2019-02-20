import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import { AtButton, AtInput, AtFloatLayout, AtIcon, AtRate } from 'taro-ui'
import ToDoItem from '../todoItem'
import './index.less'

export default class TodoList extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: '',
      isOpened: false,
      time: dayjs().add(90, 'minute').format('HH:mm'),
      date: dayjs().add(90, 'minute').isAfter(dayjs(), 'day') ? dayjs().add(1, 'day').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
      rate: 0
    }
  }

  componentDidMount () {

  }

  onChange (value) {
    this.setState({ value })
  }

  showAddTask () {
    this.setState(preState => ({
      isOpened: !preState.isOpened
    }))
  }

  onTimeChange (timeObj) {
    console.log(timeObj)
    console.log(timeObj.detail)
    this.setState({
      time: timeObj.detail.value
    })
  }

  onDateChange (timeObj) {
    console.log(timeObj)
    console.log(timeObj.detail)
    this.setState({
      date: timeObj.detail.value
    })
  }

  handleRateChange (rate) {
    this.setState({ rate })
  }

  addTask () {

  }

  render () {
    return (
      <View className='todo_list'>
        <View className='add_task_button' onClick={this.showAddTask}><AtIcon value='add' size='50' color='#fff'></AtIcon></View>
        <AtFloatLayout className='float_layout' isOpened={this.state.isOpened} title='添加任务' onClose={this.showAddTask}>
          <AtInput
            clear
            focus={this.state.isOpened}
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
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </View>
    )
  }
}
