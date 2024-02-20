<!--
 * @Description: 字体设置
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2021-08-01 12:38:23
-->
<template>
  <view v-if="isShow">
    <view class="font-model-wraper">
      <view class="font-model-content">
        <view class="modal-title">
          字体设置
        </view>
        <view class="content">
          <view class="setting-box">
            <!-- 颜色 -->
            <view class="color item" @click="colorShow=true" :style="{background:font.color}"></view>
            <!-- 字体加粗 -->
            <image class="font-weight item" @click="handleFontWeight" src="/static/hch-font/font-weight.png"></image>
            <!-- 字体放大 -->
            <image class="font-size item" @click="handleFontSize('add')" src="/static/hch-font/font-big.png"></image>
            <!-- 字体缩小 -->
            <image class="font-size item" @click="handleFontSize('reduce')" src="/static/hch-font/font-mini.png"></image>
            <!-- 中部横线 -->
            <!-- <image class="line-through item" @click="handleLineThrough" src="/static/hch-font/line-through.png"></image> -->
            <!-- 下划线 -->
            <!-- <image class="underline item" @click="handleUnderline" src="/static/hch-font/underline.png"></image> -->
            <!-- 文本左对齐 -->
            <image class="align-left item" @click="font.textAlign='left'" src="/static/hch-font/align-left.png"></image>
            <!-- 文本居中对齐 -->
            <image class="align-center item" @click="font.textAlign='center'" src="/static/hch-font/align-center.png"></image>
            <!-- 文本右对齐 -->
            <image class="align-right item" @click="font.textAlign='right'" src="/static/hch-font/align-right.png"></image>
          </view>
          <textarea class="textarea" auto-height :maxlength='500' v-model="font.text" :style="{
						color: font.color,
						fontSize: font.fontSize +'px',
						textDecoration: font.textDecoration,
						textAlign: font.textAlign,
						fontWeight: font.fontWeight
					}" placeholder="请输入文本"></textarea>
        </view>
        <view class="btn-wrap">
          <view class="btn cancel" @click="handleCancel">取消</view>
          <view class="btn confirm" @click="handleConfirm">确认</view>
        </view>
        <view>
        </view>
      </view>
    </view>
    <hch-color :is-show='colorShow' @confirm='handleColorConfirm' @cancel='colorShow=false' />
  </view>
</template>

<script>
import HchColor from "../hch-color/hch-color.vue"
export default {
  name: "HchFont",
  props: {
    // 是否显示弹窗
    isShow: {
      type: Boolean,
      default: false
    },
    fontData: {
      type: Object,
      default: ()=>{
				return {}
			}
    }
  },
  components: { HchColor },
  computed: {
		setFont(){
      console.log("setFont -> this.fontData", this.fontData)
			return this.fontData
		}
	},
	watch:{
		setFont:{
			handler(val) {
        console.log("handler -> val", val)
				this.font = Object.assign({
					text: "",
					color: "#333",
					fontWeight: "normal",
					fontSize: "18",
					textDecoration: "",
					textAlign: "left"
				},val)
				console.log(this.font)
				this.fontWeight = this.font.fontWeight=='bold'?true:false
				this.lineThrough= this.font.textDecoration==='line-through'?true: false
				this.underline= this.font.textDecoration==='underline'?true: false
		},
		deep: true,
		immediate: true
		}
		
	},
  data() {
    return {
      colorShow: false,
      underline: false,
      lineThrough: false,
      fontWeight: false,
      font: {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", "cancel")
    },
    handleConfirm() {
      this.$emit("confirm", this.font)
    },
    handleColorConfirm(color) {
      this.font.color = color
      this.colorShow = false
		},
		handleFontSize(type){
			if(type==='add'){
				this.font.fontSize ++
			}else{
				if(this.font.fontSize>10){
				this.font.fontSize --
				}else{
					uni.showToast({
            title: "字体不能再小了哦",
            duration: 2000,
            icon: "none"
          })
				}
			}
		},
    handleFontWeight() {
			this.fontWeight = !this.fontWeight
      this.font.fontWeight = this.fontWeight?'bold':'normal'
    },
    handleLineThrough() {
      this.lineThrough = !this.lineThrough
      this.font.textDecoration = this.lineThrough?'line-through': this.underline?'underline':''
    },
    handleUnderline() {
      this.underline = !this.underline
      this.font.textDecoration = this.lineThrough?'line-through': this.underline?'underline':''
    }
  }
}
</script>

<style lang="scss" scoped>
.font-model-wraper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 1000;
  inset: 0;
  .font-model-content {
    position: relative;
    .modal-title {
      height: 90rpx;
      line-height: 90rpx;
      width: 100%;
      text-align: center;
      font-size: 32rpx;
      color: $uni-text-color;
      background: $uni-bg-color-grey;
    }
    .content {
      background: #fff;
      .setting-box {
        padding: 10rpx 20rpx;
        border-top: 1rpx solid $uni-border-color;
        border-bottom: 1rpx solid $uni-border-color;
        overflow: hidden;
        .item {
					width: 40rpx;
          height: 40rpx;
					float: left;
					&:not(:last-child) {
						margin-right: 40rpx;
					}
        }
			}
			.textarea{
				margin:20rpx auto 0;
			}
    }
    .btn-wrap {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .btn {
        width: 50%;
        height: 90rpx;
        text-align: center;
        line-height: 90rpx;
        font-size: 32rpx;
        float: left;
        border-top: 1rpx solid $uni-border-color;
        color: #5999ff;
      }
      .btn.cancel {
        width: calc(50% - 1rpx);
        border-right: 1rpx solid $uni-border-color;
        color: #666;
      }
    }
  }
}
</style>
