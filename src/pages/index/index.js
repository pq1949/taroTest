import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import ToDoList from '../components/todoList'
import History from '../components/history'
import My from '../components/my'
import './index.less'
import bg from '../../imgs/background.jpg'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    "disableScroll": true
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      totalNum: 0
    }
    this.titles = ['首页', '历史', '我的']
  }

  handleClick (value) {
    this.setState({
      current: value
    })

  }

  swiperChange (e) {
    const current = (e.target && e.target.current) || e.detail.current
    this.setState({
      current
    })
    Taro.setNavigationBarTitle({
      title: this.titles[current]
    })
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //catchtouchmove 触摸事件

  onUpdateTotalNum (totalNum) {
    this.setState({
      totalNum
    })
  }
  render () {
    return (
      <View className='index'>
        <Image
          className='bg_img'
          src={bg}
        />
        <Swiper
          className='Swiper'
          duration={200}
          onChange={this.swiperChange.bind(this)}
          current={this.state.current}
        >
          <SwiperItem >
            <ToDoList onUpdateTotalNum={this.onUpdateTotalNum.bind(this)} />
          </SwiperItem>
          <SwiperItem >
            <History />
          </SwiperItem>
          <SwiperItem >
            <My />
          </SwiperItem>
        </Swiper>
        <AtTabBar
          className='tab_bar'
          fixed
          tabList={[
            { title: '待办事项', iconType: 'bullet-list', text: `${this.state.totalNum > 0 ? this.state.totalNum : ''}`, max: '99' },
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
