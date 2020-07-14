<template>
	<view>
		<view class="u-page" v-if="current===0">
			查询状态
		</view>
		<view class="u-page" v-else-if="current===1">
			发起申请
		</view>
		<view class="u-page" v-else-if="current===2">
			管理审批
		</view>
		<view class="u-page" v-else></view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" bg-color="#F8F8F8" active-color="#2979ff"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						iconPath: "question-circle",
						selectedIconPath: "question-circle-fill",
						text: '查询状态',
						count: 0,
						isDot: false,
						customIcon: false,
					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '发起申请',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "edit-pen",
						selectedIconPath: "edit-pen-fill",
						text: '管理审批',
						count: 0,
						isDot: false,
						customIcon: false,
					},
				],
				current: 0
			}
		},
	}
</script>
<style>
</style>
