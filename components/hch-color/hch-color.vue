<!--
 * @Description: 颜色选择
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-17 22:45:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 09:45:46
-->
<template>
  <view v-show="isShow">
    <view class="mask" @tap="handleHide"></view>
    <view class="content">
      <view class="flex-row" style="margin-bottom: 20rpx;">
        <view class="preview" :style="{'backgroundColor':pickerColor}"></view>
        <view class="value">
          <text v-if="pickerColor">颜色值：{{pickerColor}}</text>
        </view>
        <view class="confirm" @tap="handleConfirm">确定</view>
      </view>
      <view class="color-list">
        <view class="item" v-for="(item,i) in colorArr" :key="i" :style="{'backgroundColor':item}" :data-color="item" :data-index="index" :data-i="i" :class="{'active':(index==pickerArr[0] && i==pickerArr[1])}" @tap="handlePicker"></view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		name:'HchColor',
		props:{
			isShow: {
				type: Boolean,
				default: false, 
			}
		},
		data() {
			return {
				colorArr:['#7B7B7B','#CE0000','#FF0080','#E800E8','#921AFF',
					'#8E8E8E','#EA0000','#FF359A','#FF00FF','#9F35FF',
					'#9D9D9D','#FF0000','#FF60AF','#FF44FF','#B15BFF',
					'#ADADAD','#FF2D2D','#FF79BC','#FF77FF','#BE77FF',
					'#BEBEBE','#FF5151','#FF95CA','#FF8EFF','#CA8EFF',
					'#d0d0d0','#ff7575','#ffaad5','#ffa6ff','#d3a4ff',
					'#E0E0E0','#FF9797','#FFC1E0','#FFBFFF','#DCB5FF',
					'#F0F0F0','#FFB5B5','#FFD9EC','#FFD0FF','#E6CAFF',
					'#FCFCFC','#FFD2D2','#FFECF5','#FFE6FF','#F1E1FF',
					'#FFFFFF','#FFECEC','#FFF7FB','#FFF7FF','#FAF4FF',
					'#4A4AFF','#0080FF','#00E3E3','#02F78E','#00EC00',
					'#6A6AFF','#2894FF','#00FFFF','#1AFD9C','#28FF28',
					'#7D7DFF','#46A3FF','#4DFFFF','#4EFEB3','#53FF53',
					'#9393FF','#66B3FF','#80FFFF','#7AFEC6','#79FF79',
					'#AAAAFF','#84C1FF','#A6FFFF','#96FED1','#93FF93',
					'#B9B9FF','#97CBFF','#BBFFFF','#ADFEDC','#A6FFA6',
					'#CECEFF','#ACD6FF','#CAFFFF','#C1FFE4','#BBFFBB',
					'#DDDDFF','#C4E1FF','#D9FFFF','#D7FFEE','#CEFFCE',
					'#ECECFF','#D2E9FF','#ECFFFF','#E8FFF5','#DFFFDF',
					'#FBFBFF','#ECF5FF','#FDFFFF','#FBFFFD','#F0FFF0',
					'#9AFF02','#E1E100','#EAC100','#FF9224','#FF5809',
					'#A8FF24','#F9F900','#FFD306','#FFA042','#FF8040',
					'#B7FF4A','#FFFF37','#FFDC35','#FFAF60','#FF8F59',
					'#C2FF68','#FFFF6F','#FFE153','#FFBB77','#FF9D6F',
					'#CCFF80','#FFFF93','#FFE66F','#FFC78E','#FFAD86',
					'#D3FF93','#FFFFAA','#FFED97','#FFD1A4','#FFBD9D',
					'#DEFFAC','#FFFFB9','#FFF0AC','#FFDCB9','#FFCBB3',
					'#E8FFC4','#FFFFCE','#FFF4C1','#FFE4CA','#FFDAC8',
					'#EFFFD7','#FFFFDF','#FFF8D7','#FFEEDD','#FFE6D9',
					'#F5FFE8','#FFFFF4','#FFFCEC','#FFFAF4','#FFF3EE',
					'#804040','#808040','#408080','#5A5AAD','#8F4586',
					'#984B4B','#949449','#4F9D9D','#7373B9','#9F4D95',
					'#AD5A5A','#A5A552','#5CADAD','#8080C0','#AE57A4',
					'#B87070','#AFAF61','#6FB7B7','#9999CC','#B766AD',
					'#C48888','#B9B973','#81C0C0','#A6A6D2','#C07AB8',
					'#CF9E9E','#C2C287','#95CACA','#B8B8DC','#CA8EC2',
					'#D9B3B3','#CDCD9A','#A3D1D1','#C7C7E2','#D2A2CC',
					'#E1C4C4','#D6D6AD','#B3D9D9','#D8D8EB','#DAB1D5',
					'#EBD6D6','#DEDEBE','#C4E1E1','#E6E6F2','#E2C2DE',
					'#F2E6E6','#E8E8D0','#D1E9E9','#F3F3FA','#EBD3E8'],
				pickerColor:'',
				pickerArr:[-1,-1]
			};
		},
		methods: {
			handlePicker(e) {
				let data=e.currentTarget.dataset;
				this.pickerColor=data.color;
				this.pickerArr=[data.index,data.i];
			},
			handleHide(){
				this.$emit("cancel",'');
			},
			handleConfirm(){
				this.$emit("confirm",this.pickerColor);
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.content {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 1001;
  padding: 20rpx 20rpx 10rpx 20rpx;
  font-size: 32rpx;
}
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.color-list {
	justify-content: space-between;
	height: 400rpx;
	overflow: scroll;
		.item{
			width: 60rpx;
			height: 60rpx;
			margin: 5rpx;
			box-sizing: border-box;
			border-radius: 3px;
			box-shadow: 0 0 2px #ccc;
			float: left;
			&.active {
			box-shadow: 0 0 2px #09f;
			transform: scale(1.05, 1.05);
		}
	}
}
.preview {
  width: 180rpx;
  height: 60rpx;
}
.value {
  margin: 0 40rpx;
  flex-grow: 1;
}
.confirm {
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background-color: $uni-btn-color;
  color: #fff;
  border-radius: 4px;
  letter-spacing: 3px;
  font-size: 32rpx;
}
.confirm:active {
  background-color: $uni-btn-color;
}
</style>