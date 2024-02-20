<template>
	<view class="menu-content">
		<image class="menu icon" @click="openFlag = !openFlag" :class="{'menuOpen':openFlag}" src="/static/hch-menu/menu.png" alt="" srcset=""></image>
		<image class="bg-menu icon" @click="handleClick('bg')" :class="{'open open1':openFlag}" src="/static/hch-menu/bg.png" alt="" srcset=""></image>
		<image class="pic-menu icon" @click="handleClick('pic')" :class="{'open open2':openFlag}" src="/static/hch-menu/pic.png" alt="" srcset=""></image>
		<image class="text-menu icon" @click="handleClick('text')" :class="{'open open3':openFlag}" src="/static/hch-menu/text.png" alt="" srcset=""></image>
		<image class="save-menu icon" @click="handleClick('save')" :class="{'open open4':openFlag}" src="/static/hch-menu/save.png" alt="" srcset=""></image>
	</view>
</template>

<script>
	export default {
    name:'HchMenu',
		data() {
			return {
        openFlag:false, //是否展开菜单
      }
		},
		methods: {
      /**
       * @description: 选择背景图
       * @param {type} 
       * @return {type} 
       * @author: hch
       */
      handleClick(type){
        this.$emit('clickMenu',type)
      }
		}
	}
</script>

<style lang="scss" scoped>
	.menu-content {
    z-index: 10;
    .icon{
      position: fixed;
      bottom: 120rpx;
      right: 80rpx;
      width: 80rpx;
      height: 80rpx;
      opacity: 0;
      transform: rotate(0deg);
      transition: all 0.5s ease-out 0s;
    }
    .text-menu{
      width: 86rpx;
      height: 86rpx;
    }
    .menu{
      z-index: 1;
      opacity: 1;
    }
    .menuOpen{
      transform: rotate(180deg);
      animation-fill-mode:forwards;
      transition: all 0.5s ease-out 0s;
    }
    .open {
      opacity: 1;
      transform: rotate(360deg);
      animation-fill-mode:forwards;
      transition: all 0.5s ease-out 0s;
    }
    .open1{
      right: 80rpx;
      bottom: 250rpx;
    }
    
    .open2{
      right: 190rpx;
      bottom: 210rpx;
    }
    .open3{
      right: 230rpx;
      bottom: 100rpx;
    }
    .open4{
       right: 160rpx;
      bottom: 20rpx;
    }
    .bg-menu{
    }
	}
</style>
