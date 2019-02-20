# 腾讯视频小程序播放插件

只需要一个vid！！把[视频上传](https://v.qq.com/u/upload.html)到腾讯视频之后得到vid！！就可以在自己的小程序上播放视频了！！流畅到爆！！
```
// 在你们的wxml上这样插入视频元素
<txv-video vid="e0354z3cqjp" playerid="txv1"></txv-video>
```
```
// 在你们的json里面插入
"usingComponents": {
  "txv-video": "plugin://tencentvideo/video"
}
```
```
// 在app.json里面引入插件，注意插件版本号填最新的版本号
"plugins": {
  "tencentvideo": {
    "version": "1.2.4",
    "provider": "wxa75efa648b60994b"
  }
}
```
有任何疑问请加qq群:807339057

本github仓库就是一个示例项目

## 接入方式

### 申请使用插件 appid:wxa75efa648b60994b
首先，参见微信官方的[插件使用文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/plugin/using.html)申请插件权限，在申请使用插件的使用时，填写以下appid:`wxa75efa648b60994b`

### 引入插件代码
参见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)与[示例项目](https://github.com/tvfe/txv-miniprogram-plugin)，尽量使用最新版本插件，如有问题，可在开发社区下查找或者到github提交[issues](https://github.com/tvfe/txv-miniprogram-plugin/issues)

### 使用播放器组件
wxml
```
<txv-video 
  vid="e0354z3cqjp"   // 可使用vid="{{vid}}" wx:if="{{vid}}" 的方式应用data变量,要注意确保vid存在，详情可见文档最后面的tips
  playerid="txv1"     //playerid必须要全局唯一，可以设置为vid
  autoplay="{{true}}" // 是否自动播放
></txv-video>
```
```
// 支持slot，用于在video上显示UI
<txv-video 
  vid="e0354z3cqjp"   // 可使用vid="{{vid}}" wx:if="{{vid}}" 的方式应用data变量,要注意确保vid存在，详情可见文档最后面的tips
  playerid="txv1" 
  width="{{100%}}"    //自定义宽度
  height="{{'auto'}}" // 自定义高度
  autoplay="{{true}}"> // 是否自动播放
  <cover-view class='txv-video-slot'>video slot</cover-view>
</txv-video>
```
组件元素支持的自定义属性：
* `vid` 视频id
* `playerid` 播放器标识符,需全局唯一，用于获取Video Context，进而手动控制播放
* `width` 视频宽度
* `height` 视频高度
* `isHiddenStop` 是否在不可见区域自动停止播放，默认false，即滑到不可见区域不停止播放
* `isNeedMutex` 是否互斥播放，默认true，即播放一个视频另一个播放的视频自动被暂停

组件元素支持的video属性，[属性取值与video一致](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)（插件支持小程序video的大部分属性）
* `autoplay` 是否自动播放
* `poster` 视频海报，会根据视频vid拿一个默认值
* `usePoster` 是否使用海报图
* `direction` 视频全屏时方向
* `objectFit` 视频填充方式
* `controls` 视频播放控件
* `showCenterPlayBtn` 是否显示中间播放按钮

/* V1.2.4 */
* `enableDanmu` 是否允许弹幕，默认false
* `danmuBtn` 是否显示弹幕button，默认false
* `danmuList` 弹幕数据列表，具体数据格式请看小程序官网video组件

/* V1.2.5 */
* `defn` 视频清晰度，默认auto，可选值：流畅，标清，高清，超清，蓝光，4K，杜比

组件元素抛出的自定义事件
* `bindstatechange` 播放状态变更事件，包含loading(资源加载中), ready(资源加载完成), playing(播放中，包含广告和视频), ended(广告和视频都播放完成), error，回调函数接受两个参数newstate，oldstate

组件抛出了小程序video抛出的所有事件，[事件含义与video一致](https://developers.weixin.qq.com/miniprogram/dev/component/video.html):
* `bindplay` 播放
* `bindpause` 暂停
* `bindended` 播放结束，e.detail.isAd可以用来区分是广告还是视频
* `bindfullscreenchange` 全屏
* `bindtimeupdate` 播放进度更新事件
* `binderror` 视频播放错误信息

### 插件 js api
```
const TxvContext = requirePlugin("tencentvideo");  

let txvContext = TxvContext.getTxvContext('txv1') // txv1即播放器组件的playerid值

txvContext.play();  // 播放
txvContext.pause(); // 暂停
txvContext.requestFullScreen(); // 进入全屏
txvContext.exitFullScreen();    // 退出全屏
txvContext.playbackRate(+e.currentTarget.dataset.rate); // 设置播放速率
txvContext.seek(time);  //快进到某个时间


//获取当前播放视频上下文，多个实例时特别有用
var currPlayerId=TxvContext.getLastPlayId();     //获取当前播放视频的playerid
var currPlayerContxt=TxvContext.getTxvContext(currPlayerId)   //获取当前播放视频的上下文，可进行play，pause等操作

//开启和关闭播放器日志，默认关闭
TxvContext.openLog()   //开启
TxvContext.closeLog()  //关闭

/* V1.2.4 */
* `sendDanmu` 发送弹幕，具体数据格式请看小程序官网video组件
* `hideVideo` 隐藏视频插件里面的播放器
* `showVideo` 显示视频插件里面的播放器
* `showContainer` 显示视频插件里面的最外层容器
* `hideContainer` 隐藏视频插件里面的最外层容器

/* V1.2.5 */
* `hideVideoWithVoice` 隐藏视频插件，如果隐藏前正在播放，则隐藏后继续播
* `showVideoWithVoice` 显示视频插件，跟上面的hideVideoWithVoice配合使用

```

### 最新版本功能
1. 全局只播放一个视频，并且视频滑出可见区域自动停止播放
2. 支持slot，由于原生video组件层级限制，slot内容推荐用cover-view
3. 支持竖屏，海报
4. 支持广告暂停和全屏
/* V1.2.5 */
5. 支持全屏下设置亮度
6. 支持全屏下切换清晰度

### 常见问题
1. 找不到playerid为txv1的txv-video组件
要注意在小程序根目录`app.json`里声明对组件的依赖，在页面的json里声明对插件的使用。详见ps://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)与[示例项目](https://github.com/tvfe/txv-miniprogram-plugin)

2. 常见视频播放错误
  * 播放器提示 ： 播放出错(P.0) 是捕获到video的binderror事件，大概率是网络断了
  * 播放器提示 ： 啊哦，  表示获取数据失败，提示的数字是返回的错误码


### tips
1. playerid必须要全局唯一，可以设置为vid
2. 想实现点击视频任何区域，实现视频全屏，经测试发现ios下，部分机型不能正常捕获到video或者容器的tap事件，推荐视频区域不要用video，假写成一张图片和一个播放按钮，点击的时候全屏播放视频
3. ```const TxvContext = requirePlugin("tencentvideo");``` 可以打印TxvContext，插件暴露的接口都在这里面
4. 强烈建议在拿到vid后在渲染视频组件 ```<txv-video vid="{{vid}}" wx:if="{{vid}}" playerid="{{vid}}"></txv-video>``` 否则会报错，因为视频组件初始化一定要给vid