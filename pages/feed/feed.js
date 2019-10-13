const txvContext = requirePlugin("tencentvideo");
const sysInfo =wx.getSystemInfoSync()

Page({
	data: {
		top: 0,
		currVideo:{},
		videoList: [{
      vid:'o0911foj4h7',
      title:'杨戬做了什么让队友如此崩溃'
		},{
      vid:'j0857lhb1bw',
      title:'s15赛季皮肤背景故事曝光，人族将军因受诅咒变成牛魔'
  },{
      vid:'y08857549xq',
      title:'巅峰赛国服元芳尽力了！'
  },{
      vid:'c0558ot8qpg',
      title:'万能射手狄仁杰 到底出AP强还是AD强？'
		},{
      vid:'c0558ot8qpg',
      title:'万能射手狄仁杰 到底出AP强还是AD强？'
		},{
      vid:'y0928cjc7ur',
      title:'主播我是一颗小虎牙,势不可挡妲己怎么这么难死'
		},{
			vid:'h0854tbemqm',
			title:'video'
		},{
			vid:'i08832ne4ea',
			title:'video'
		},{
			vid:'i0918bgrk2j',
			title:'video'
		},{
			vid:'n09183xhhar',
			title:'video'
		},{
			vid:'u0918slhvow',
			title:'video'
		}]
	},
	onLoad(){
		this.videoContext = wx.createVideoContext('tvp');
	},
    onPicClick(e) {
        let dataset = e.currentTarget.dataset;
        this.currIndex=dataset.index
        this.setData({
            "currVideo.vid":dataset.vid
        })
        this.getTop()
    },
    getTop(){
        let query = this.createSelectorQuery();
        query.selectViewport().scrollOffset();
        query
            .selectAll(`.mod_poster`)
            .boundingClientRect()
            .exec(res => {
            let originTop = res[0].scrollTop;
            let currNode = res[1][this.currIndex];
            console.log('111',originTop,currNode)
            this.setData({
                top:currNode.top+originTop
            })
            });
    }
});
