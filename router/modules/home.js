const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/Login',
      aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
      name: 'login',
        meta: {
	        title: '登陆页面',
	    },
    },
    {
	    path: '/pages/index/Home',
        name: 'home',
        meta: {
	        title: '我的工作流',
	    },
	},
]
export default home