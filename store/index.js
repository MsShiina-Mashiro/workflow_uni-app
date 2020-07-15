import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		flowList: [{
				id: 0,
				title: '请假',
				status: '审批中',
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
				status: '审批中',
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
			status: '审核中',
			info: ''
		},
		nextId: 6
	},
	mutations: {
		handleAddList(state) {
			const obj = {
				id: 0,
				title: '',
				status: '审核中',
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
		}
	},
	actions: {},
	getters: {
		getFlowList(state) {
			return state.flowList
		},
		getAddList(state) {
			return state.addList
		}
	}
})
export default store
