<template>
	<view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<view class="wrap" v-show="current===0?true:false">
			<u-waterfall v-model="getFlowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="warter" v-for="(item, index) in leftList" :key="index">
						<view class="m-title">
							{{item.title}}
						</view>
						<view class="status" :class="item.status === '已通过'?'success': item.status === '未通过'? 'failed':'pending'">
							{{item.status}}
						</view>
						<view class="info">
							{{item.info}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="warter" v-for="(item, index) in rightList" :key="index">
						<view class="m-title">
							{{item.title}}
						</view>
						<view class="status" :class="item.status === '已通过'?'success': item.status === '未通过'? 'failed':'pending'">
							{{item.status}}
						</view>
						<view class="info">
							{{item.info}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></u-icon>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
		<view class="u-page" v-show="current===1?true:false">
			<u-mask :show="show" @click="cancelAdd">
				<u-card title="提交申请" :border="true" class="cardWarpper">
					<view class="" slot="body">
						<u-form :model="addList" ref="addListRef" label-width="130rpx" :rules="addListRules" :error-type="errorType">
							<u-form-item label="申请类别" prop='title'>
								<u-input :value="addList.title" type="select" @click="openSelect" :select-open="selectShow" placeholder="请选择申请项目" />
								<u-select v-model="selectShow" :list="selectList" @confirm="confirm" safe-area-inset-bottom class="select"></u-select>
							</u-form-item>
							<u-form-item label="申请理由" prop='info'>
								<u-input :value="addList.info" @input="changeInfo" type="textarea" placeholder="请输入申请具体内容" />
							</u-form-item>
						</u-form>
						<u-button type="primary" size="medium" shape="circle" class="btns" @click="handleAddList">提交</u-button>
						<u-button type="error" size="medium" shape="circle" class="btns" @click="cancelAdd2">取消</u-button>
					</view>
				</u-card>
			</u-mask>
		</view>
		<view class="u-page wrap2" v-show="current===2?true:false">
			<view class="u-tabs-box">
				<!-- <u-subsection :list="subSectionList" :current="sectionCurrent" @change="changeCurrent" :active-color="sectionCurrent===0?'#2979ff':sectionCurrent===1?'#19be6b':'#fa3534'"></u-subsection> -->
				<u-tabs-swiper :activeColor="'#2979ff'" ref="tabs" :list="subSectionList" :current="sectionCurrent" @change="changeCurrent"
				 :is-scroll="false"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- 待审批 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in getApproveList[0]" :key="res.id">
								<!-- 顶部标题与状态页面 -->
								<view class="top">
									<!-- 标题 -->
									<view class="left">
										{{res.title}}
									</view>
									<!-- 状态 -->
									<view class="right">
										待审批
									</view>
								</view>
								<!-- 信息 -->
								<view class="item">
									<view class="left">

									</view>
									<view class="content">
										{{res.info}}
									</view>
									<view class="right">

									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="handleApproveReject(res.id)">拒绝</view>
									<view class="evaluate btn" @click="handleApproveSuccess(res.id)">同意</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 已通过 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in getApproveList[1]" :key="res.id">
								<!-- 顶部标题与状态页面 -->
								<view class="top">
									<!-- 标题 -->
									<view class="left">
										{{res.title}}
									</view>
									<!-- 状态 -->
									<view class="right1">
										已通过
									</view>
								</view>
								<!-- 信息 -->
								<view class="item">
									<view class="left">

									</view>
									<view class="content">
										{{res.info}}
									</view>
									<view class="right">

									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="handleApproveDelete(res.id)">删除</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 未通过 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in getApproveList[2]" :key="res.id">
								<!-- 顶部标题与状态页面 -->
								<view class="top">
									<!-- 标题 -->
									<view class="left">
										{{res.title}}
									</view>
									<!-- 状态 -->
									<view class="right2">
										未通过
									</view>
								</view>
								<!-- 信息 -->
								<view class="item">
									<view class="left">

									</view>
									<view class="content">
										{{res.info}}
									</view>
									<view class="right">

									</view>
								</view>
								<view class="bottom">
									<view class="logistics btn" @click="handleRejectDelete(res.id)">删除</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="u-page" v-show="current!=0&&current!=1&&current!=2?true:false"></view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" bg-color="#F8F8F8" active-color="#2979ff"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
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
				current: 0,
				loadStatus: 'nomore',
				id: 0,
				// show: false,
				// addList: {
				// 	id: 0,
				// 	title: '',
				// 	status: '审批中',
				// 	info: ''
				// },
				addListRules: {
					title: [{
						required: true,
						message: '请选择申请类别',
						trigger: 'blur'
					}],
					info: [{
							required: true,
							message: '请输入申请理由',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 120,
							message: '长度在 3 到 120 个字符',
							trigger: 'blur'
						}
					]
				},
				selectShow: false,
				selectList: [{
						value: 1,
						label: '请假'
					},
					{
						value: 2,
						label: '报销'
					}
				],
				errorType: ['message'],
				subSectionList: [{
						name: '待审批'
					},
					{
						name: '已通过'
					},
					{
						name: '已拒绝'
					}
				],
				sectionCurrent: 0,
				swiperCurrent: 0
			}
		},
		computed: {
			...mapState(['flowList', 'nextId', 'addList', 'approveList']),
			...mapGetters(['getFlowList', 'getAddList', 'getApproveList']),
			statusClass(item) {
				if (item.status === "审批中") {
					return 'pending'

				} else if (item.status === "未通过") {
					return 'success'
				} else {
					return 'failed'
				}
			},
			show() {
				if (this.current === 1) return true;
			}
		},
		onReady() {
			this.$refs.addListRef.setRules(this.addListRules)
		},
		methods: {
			remove(id) {
				this.$refs.uToast.show({
					title: '申请删除成功！',
					type: 'success',
					duration: 2000,
					position: 'top'
				})
				this.$refs.uWaterfall.remove(id)
				// this.$store.commit('removeFlowItem', id)
			},
			cancelAdd() {
				this.current = 0
				this.$store.commit('setAddListNull')
			},
			cancelAdd2() {
				this.current = 0
				this.$store.commit('setAddListNull')
				return this.$refs.uToast.show({
					title: '申请已取消！',
					type: 'warning',
					duration: 2000,
					position: 'top'
				})
			},
			confirm(e) {
				// console.log(e[0].label)
				this.$store.commit('changeAddListTitle', e[0].label)
				// this.addList.title = e[0].label
			},
			handleAddList() {
				this.$refs.addListRef.validate(async (valid) => {
					if (!valid) return;
					this.$store.commit('handleAddList')
					this.current = 0
					// this.$store.commit('setAddListNull')
					return this.$refs.uToast.show({
						title: '申请已提交！',
						type: 'success',
						duration: 2000,
						position: 'top'
					})
				})
			},
			openSelect() {
				this.selectShow = true
			},
			changeInfo(e) {
				//console.log(e)
				this.$store.commit('changeAddListInfo', e)
			},
			changeCurrent(index) {
				// console.log('change start')
				// console.log(this.sectionCurrent)
				// console.log(index)
				// this.sectionCurrent = index
				this.swiperCurrent = index
				// console.log(this.swiperCurrent)
				// console.log('change end')
				// console.log(this.sectionCurrent)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				// console.log('transition start')
				// console.log(this.sectionCurrent)
				// console.log(e)
				let dx = e.detail.dx;
				this.$refs.tabs.setDx(dx);
				// console.log(this.sectionCurrent)
				// console.log(this.swiperCurrent)
				// console.log('transition end')
				// console.log(this.sectionCurrent)
				// console.log(this.swiperCurrent)
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				// console.log('animationfinish start')
				// console.log(this.sectionCurrent)
				// console.log(e)
				let current = e.detail.current;
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.sectionCurrent = current;
				// console.log(this.sectionCurrent)
				// console.log('animationfinish end')
				// console.log(this.sectionCurrent)
			},
			// scroll-view到底部加载更多
			reachBottom() {

			},
			handleApproveReject(id) {
				// console.log(id)
				// console.log(this.approveList)
				this.$store.commit('handleApproveReject', id)
				this.$refs.uToast.show({
					title: '申请已拒绝！',
					type: 'error',
					duration: 2000,
					position: 'top'
				})
				// console.log(this.approveList)
			},
			handleApproveSuccess(id) {
				this.$store.commit('handleApproveSuccess', id)
				this.$refs.uToast.show({
					title: '申请已通过！',
					type: 'success',
					duration: 2000,
					position: 'top'
				})
			},
			handleApproveDelete(id) {
				this.$store.commit('handleApproveDelete', id)
				this.$refs.uToast.show({
					title: '删除成功！',
					type: 'success',
					duration: 2000,
					position: 'top'
				})
			},
			handleRejectDelete(id) {
				this.$store.commit('handleRejectDelete', id)
				this.$refs.uToast.show({
					title: '删除成功！',
					type: 'success',
					duration: 2000,
					position: 'top'
				})
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}

	/* 	.u-scroll-bar {
			 display: none;
	} */
</style>

<style lang="scss" scoped>
	.warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.m-title {
		font-size: 45rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.status {
		font-size: 30rpx;
		// color: $uni-color-primary;
		margin-top: 5px;
	}

	.info {
		font-size: 30rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.pending {
		color: $uni-color-primary;
	}

	.success {
		color: $uni-color-success;
	}

	.failed {
		color: $uni-color-error;
	}

	.cardWarpper {
		height: 60%;
		width: 80%;
		position: absolute;
		left: 10%;
		top: 20%;
		margin: 0 !important;
	}

	.btns {
		display: flex;
		margin-left: 25%;
		margin-top: 35rpx;
		margin-right: 25%;
		width: 50%;
	}

	.wrap2 {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;
				font-size: 50rpx;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-primary-dark;
			}

			.right1 {
				color: $u-type-success-dark;
			}

			.right2 {
				color: $u-type-error-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-error-dark;
				border-color: $u-type-error-dark;
			}

			.evaluate {
				color: $u-type-success-dark;
				border-color: $u-type-success-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>
