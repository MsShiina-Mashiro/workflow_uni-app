<template>
	<view class="login_container">
		<view>
			<u-toast ref="uToast" />
		</view>
		<view class="login_box">
			<!-- 头像区 -->
			<view class="avatar_box">
				<img src="../../static/logo.png" alt="">
			</view>
			<!-- 表单区 -->
			<u-form :model="loginForm" ref="loginFormRef" class="login_form" label-width="120rpx" :rules="loginFormRules"
			 :error-type="errorType">
				<!-- 用户名 -->
				<u-form-item label="账号" left-icon="account" prop="username">
					<u-input placeholder="请输入账号" v-model="loginForm.username" />
				</u-form-item>
				<!-- 密码 -->
				<u-form-item label="密码" left-icon="lock" prop="password">
					<u-input type="password" passwordIcon placeholder="请输入密码" v-model="loginForm.password" />
				</u-form-item>
				<view class="btns">
					<!-- 按钮 -->
					<u-button type="primary" @click="login">登录</u-button>
					<u-button type="default" @click="resetForm">重置</u-button>
				</view>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 这是登录表单的绑定对象
				loginForm: {
					username: 'admin',
					password: '123456'
				},
				// 这是登录表单的校验规则
				loginFormRules: {
					// 用户名校验
					username: [{
							required: true,
							message: '请输入登录名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					// 密码校验
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 15,
							message: '长度在 6 到 15 个字符',
							trigger: 'blur'
						}
					]
				},
				errorType: ['message']
			}
		},
		methods: {
			// 重置表单
			resetForm() {
				this.$refs.loginFormRef.resetFields()
			},
			login() {
				this.$refs.loginFormRef.validate(async (valid) => {
					// console.log(valid)
					if (!valid) return;
					if (this.loginForm.username != "admin" || this.loginForm.password != "123456") {
						// return this.$message.error('登录失败');
						return this.$refs.uToast.show({
							title: '登录失败！',
							type: 'error',
							duration: 2000,
							position: 'top'
						})
					}
					this.$refs.uToast.show({
						title: '登录成功！',
						type: 'success',
						duration: 2000,
						position: 'top'
					})
					this.$router.push('/pages/index/Home')
					// this.$router.push('/home');
				})
			}
		},
		onReady() {
			this.$refs.loginFormRef.setRules(this.loginFormRules);
		}
	}
</script>

<style lang="scss" scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 75%;
		height: 50%;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.avatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 5px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}

	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: flex-start;
		margin-top: 15px;
	}
</style>
