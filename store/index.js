import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		flowList: [{
				id: 0,
				title: '请假',
				status: '待审批',
				info: '请假理由请假理由请假理由请假理由请假理由请假理由请假理由'
			},
			{
				id: 1,
				title: '报销',
				status: '已通过',
				info: '报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由'
			},
			{
				id: 2,
				title: '报销',
				status: '未通过',
				info: '报销理由报销理由报销理由'
			},
			{
				id: 3,
				title: '请假',
				status: '待审批',
				info: '请假理由请假理由请假理由请假理由请假理由请假理由请假理由'
			},
			{
				id: 4,
				title: '报销',
				status: '已通过',
				info: '报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由'
			},
			{
				id: 5,
				title: '报销',
				status: '未通过',
				info: '报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由'
			}
		],
		addList:{
			id: 0,
			title: '',
			status: '待审批',
			info: ''
		},
		nextId: 6,
		approveList: [
			// 未审批
			[
				{
					id: 0,
					title: '报销',
					status: '待审批',
					info: '报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由'
				},
				{
					id: 1,
					title: '报销',
					status: '待审批',
					info: '报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由报销理由'
				},
				{
					id: 2,
					title: '请假',
					status: '待审批',
					info: '请假理由请假理由请假理由请假理由请假理由请假理由请假理由'
				},
				{
					id: 3,
					title: '报销',
					status: '待审批',
					info: '报销理由报销理由报销理由'
				},
				{
					id: 4,
					title: '请假',
					status: '待审批',
					info: '请假理由请假理由请假理由请假理由请假理由请假理由请假理由'
				}
			],
			// 已通过
			[],
			// 已拒绝
			[]
		],
		approveNextId: 5
	},
	mutations: {
		handleAddList(state) {
			const obj = {
				id: 0,
				title: '',
				status: '待审批',
				info: ''
			}
			// state.addList.id = state.nextId
			obj.id = state.nextId
			obj.title = state.addList.title
			obj.info = state.addList.info
			state.flowList.push(obj)
			state.nextId++
			state.addList.title = ''
			state.addList.info = ''
		},
		setAddListNull(state){
			state.addList.title = ""
			state.addList.info = ""
		},
		changeAddListTitle(state, title){
			state.addList.title = title
		},
		changeAddListInfo(state, info){
			state.addList.info = info
		},
		removeFlowItem(state, id){
			const index = state.flowList.findIndex(x => x.id === id)
			state.flowList.splice(index, 1)
		},
		handleApproveReject(state, id){
			const index = state.approveList[0].findIndex(x => x.id === id)
			const [addList] = state.approveList[0].splice(index, 1)
			// console.log(addList)
			state.approveList[2].push(addList)
			// console.log(state.approveList[2])
		},
		handleApproveSuccess(state, id){
			const index = state.approveList[0].findIndex(x => x.id === id)
			const [addList] = state.approveList[0].splice(index, 1)
			// console.log(addList)
			state.approveList[1].push(addList)
			// console.log(state.approveList[1])
		},
		handleApproveDelete(state, id) {
			const index = state.approveList[1].findIndex(x => x.id === id)
			state.approveList[1].splice(index, 1)
		},
		handleRejectDelete(state, id) {
			const index = state.approveList[2].findIndex(x => x.id === id)
			state.approveList[2].splice(index, 1)
		}
	},
	actions: {},
	getters: {
		getFlowList(state) {
			return state.flowList
		},
		getAddList(state) {
			return state.addList
		},
		getApproveList(state){
			return state.approveList
		}
	}
})
export default store
