<template>
	<view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<view class="wrap" v-if="current===0">
			<u-waterfall v-model="getFlowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="warter" v-for="(item, index) in leftList" :key="index">
						<view class="title">
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
						<view class="title">
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
		<view class="u-page" v-else-if="current===1">
			<u-mask :show="show" @click="cancelAdd">
				<u-card title="提交申请" :border="true" class="cardWarpper">
					<view class="" slot="body">
						<u-form :model="addList" ref="addListRef" label-width="130rpx" :rules="addListRules" :error-type="errorType">
							<u-form-item label="申请类别" prop='title'>
								<u-input :value="addList.title" type="select" @click="openSelect" :select-open="selectShow" placeholder="请选择申请项目"/>
								<u-select v-model="selectShow" :list="selectList" @confirm="confirm" safe-area-inset-bottom class="select"></u-select>
							</u-form-item>
							<u-form-item label="申请理由" prop='info'>
								<u-input :value="addList.info" @input="changeInfo" type="textarea" placeholder="请输入申请具体内容"/>
							</u-form-item>
						</u-form>
						<u-button type="primary" size="medium" shape="circle" class="btns" @click="handleAddList">提交</u-button>
						<u-button type="error" size="medium" shape="circle" class="btns" @click="cancelAdd2">取消</u-button>
					</view>
				</u-card>
			</u-mask>
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
					title: [
						{
							required: true,
							message: '请选择申请类别',
							trigger: 'blur'
						}
					],
					info: [
						{
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
				selectList: [
					{
						value: 1,
						label: '请假'
					},
					{
						value: 2,
						label: '报销'
					}
				],
				errorType: ['message']
			}
		},
		computed: {
			...mapState(['flowList','nextId','addList']),
			...mapGetters(['getFlowList','getAddList']),
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
			// this.$refs.addListRef.setRules(this.addListRules)
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
				this.$store.commit('handleAddList')
				this.current = 0
				// this.$store.commit('setAddListNull')
				return this.$refs.uToast.show({
					title: '申请已提交！',
					type: 'success',
					duration: 2000,
					position: 'top'
				})
			},
			openSelect() {
				this.selectShow = true
			},
			changeInfo(e){
				//console.log(e)
				this.$store.commit('changeAddListInfo', e)
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
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

	.title {
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

</style>
