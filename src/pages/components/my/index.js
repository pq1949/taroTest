import Taro, { Component } from '@tarojs/taro'
import { AtButton, AtModal, AtFloatLayout, AtAvatar } from 'taro-ui'
import { View } from '@tarojs/components'
import './index.less'

export default class My extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      title: '',
      modalOpen: false,
      layoutOpen: false,
      content: '',
      avatarUrl: '',
      city: '',
      country: '',
      gender: null,
      nickName: '',
      province: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //catchtouchmove 触摸事件

  reset () {
    Taro.clearStorageSync()
    Taro.eventCenter.trigger('updateHistory')
    Taro.eventCenter.trigger('updateItems')
  }

  getSystemInfo () {
    Taro.getSystemInfo({
      success: res => {
        this.setState({
          title: '系统信息',
          layoutOpen: true,
          content: JSON.stringify(res)
        })
      }
    })
  }

  handleConfirm () {
    this.setState({
      title: '',
      layoutOpen: false,
      content: ''
    })
  }

  getUserInfo () {
    Taro.getUserInfo({
      success: res => {
        const { avatarUrl, city, country, gender, nickName, province } = res.userInfo
        this.setState({
          title: '用户信息',
          layoutOpen: true,
          content: JSON.stringify(res.userInfo),
          avatarUrl,
          city,
          country,
          gender,
          nickName,
          province
        })
      }
    })
  }

  getScanInfo () {
    Taro.scanCode({
      success: res => {
        this.setState({
          title: '扫一扫',
          layoutOpen: true,
          content: JSON.stringify(res)
        })
        res.result && Taro.setClipboardData({
          data: res.result
        })
      }
    })
  }
  render () {
    const { avatarUrl, city, country, gender, nickName, province } = this.state
    return (
      <View className='my'>
        <View className='user'>
          {avatarUrl && <AtAvatar circle image={avatarUrl} />}
          {country && <View className='user_info country'>{country}</View>}
          {city && <View className='user_info city'>{city}</View>}
          {province && <View className='user_info province'>{province}</View>}
          {nickName && <View className='user_info nickName'>{nickName}</View>}
          {gender !== null && <View className='user_info gender'>{`${gender === 0 ? '未知' : (gender == 1 ? '男' : '女')}`}</View>}
        </View>
        <View className='base scan'>
          <AtButton type='primary' onClick={this.getScanInfo.bind(this)} >扫一扫</AtButton>
        </View>
        <View className='base user_info'>
          <AtButton type='primary' onGetUserInfo={this.getUserInfo.bind(this)} openType='getUserInfo' >获取用户信息</AtButton>
        </View>
        <View className='base system_info'>
          <AtButton type='primary' onClick={this.getSystemInfo.bind(this)} >获取系统信息</AtButton>
        </View>
        <View className='base reset'>
          <AtButton type='primary' onClick={this.reset.bind(this)} >清空数据</AtButton>
        </View>
        <AtModal
          isOpened={this.state.modalOpen}
          title={this.state.title}
          confirmText='确认'
          onConfirm={this.handleConfirm}
          content={this.state.content}
        />
        <AtFloatLayout isOpened={this.state.layoutOpen} title={this.state.title} onClose={this.handleConfirm}>
          <View className='layout_content'>
            {this.state.content}
          </View>
        </AtFloatLayout>
      </View >
    )
  }
}
