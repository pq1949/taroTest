import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import ToDoList from '../components/todoList'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    "disableScroll": true
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //catchtouchmove 触摸事件

  render () {
    return (
      <View className='index'>
        <Swiper
          duration={200}
          current={this.state.current}
        >
          <SwiperItem >
            <ToDoList />
          </SwiperItem>
          <SwiperItem >
            <View>历史</View>
          </SwiperItem>
          <SwiperItem catchtouchmove>
            <View>我的</View>
          </SwiperItem>
        </Swiper>
        <AtTabBar
          className='tab_bar'
          fixed
          tabList={[
            { title: '待办事项', iconType: 'bullet-list', text: '100', max: '99' },
            { title: '历史', iconType: 'calendar' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
