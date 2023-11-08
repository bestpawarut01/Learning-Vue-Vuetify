<template>
	<v-img
		aspect-ratio="16/9"
		src="@/assets/beautiful-pet-portrait-small-dog-cat.jpg"
	>
		<div class="center_screen">
			<v-card
				class="d-flex justify-center"
				color="rgb(236, 239, 241, 0.97)"
				rounded="lg"
				width="550"
			>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-img
								src="@/assets/pngegg.png"
								height="170px"
							></v-img>
						</v-col>
					</v-row>
					<div v-if="checkNewPassword">
						<v-row class="d-flex justify-center">
							<v-col cols="6">
								<v-text-field
									label="Username"
									variant="outlined"
									placeholder="Enter your username"
									prepend-inner-icon="mdi-account"
									v-model="inputUser"
									hide-details
								>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="d-flex justify-center mt-0">
							<v-col cols="6">
								<v-text-field
									hide-details
									label="Password"
									variant="outlined"
									placeholder="Enter your password"
									prepend-inner-icon="mdi-lock"
									:type="visible ? 'text' : 'password'"
									v-model="inputPassword"
								>
								</v-text-field>
							</v-col>
						</v-row>

						<h5
							style="color: red; margin-bottom: 1rem"
							class="d-flex justify-center mt-3"
							v-if="checkIncorrectPass"
						>
							Incorrect Username or Password . Please try again.
						</h5>
						<v-row>
							<v-col class="d-flex justify-center">
								<v-btn
									color="red"
									variant="outlined"
									class="mr-5"
									@click="clearVal"
								>
									clear
								</v-btn>
								<v-btn
									color="green"
									class="ml-5"
									@click="SubmitLogin"
								>
									Sign in
								</v-btn>
							</v-col>
						</v-row>
					</div>

					<div v-if="checkNewPassword == false">
						<v-row
							class="text-subtitle-1 text-medium-emphasis d-flex justify-center"
						>
							<v-col cols="6" style="color: red">
								<h5>New password is required *</h5>
							</v-col>
						</v-row>
						<v-row class="d-flex justify-center mt-0">
							<v-col cols="6">
								<v-text-field
									hide-details
									label="Temporary password "
									variant="outlined"
									placeholder="Enter Temp password "
									prepend-inner-icon="mdi-lock"
									:type="visible ? 'text' : 'password'"
									v-model="inputPassword"
								>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row class="d-flex justify-center">
							<v-col cols="6">
								<v-text-field
									hide-details=""
									label="New Password"
									variant="outlined"
									placeholder="Enter New password"
									prepend-inner-icon="mdi-lock"
									:type="visible ? 'text' : 'password'"
									v-model="inputNewPassword"
								>
								</v-text-field>
							</v-col>
						</v-row>

						<v-row>
							<v-col class="d-flex justify-center">
								<v-btn
									color="red"
									variant="outlined"
									class="mr-5"
									@click="clearVal"
								>
									clear
								</v-btn>
								<v-btn
									color="green"
									class="ml-5"
									@click="SubmitLogin"
								>
									Enter
								</v-btn>
							</v-col>
						</v-row>
					</div>
				</v-container>
			</v-card>
		</div>
	</v-img>
</template>
<script>
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export default {
	data: () => ({
		visible: false,
		inputUser: "",
		inputPassword: "",
		inputNewPassword: "",
		checkNewPassword: true,
		checkIncorrectPass: false,
		tempValue: [],
		snackbar: false,
	}),
	methods: {
		clearVal() {
			this.inputUser = "";
			this.inputPassword = "";
			this.inputNewPassword = "";
		},
		async SubmitLogin() {
			const allSubmit = {
				username: this.inputUser,
				password: this.inputPassword,
				newPassword: this.inputNewPassword,
			};
			console.log(allSubmit);

			if (this.inputUser !== "" && this.inputPassword !== "") {
				try {
					const show = await axios.post(
						"http://localhost:8000/login/",
						allSubmit
					);

					console.log(show.data);

					if (show.data == "New password is required") {
						//เช็คว่าเป็น user ใหม่ที่ยังไม่ได้เปลี่ยนรหัสไหม
						this.checkNewPassword = false;
						this.inputPassword = "";
					} else if (
						// เช็คว่ากรอกรหัสผ่านผิดไหม
						show.data.message == "Incorrect username or password."
					) {
						this.checkIncorrectPass = true;
						setTimeout(() => {
							this.checkIncorrectPass = false;
						}, 10000);
						notify({
							title: "Authorization",
							text: "Incorrect username or password.",
							type: "error",
						});
						this.clearVal();
					} else {
						this.checkNewPassword = true;
						this.clearVal();
						this.snackbar = true;
						notify({
							title: "Authorization",
							text: "You have been logged in!",
							type: "success",
						});
						window.location.href = "http://localhost:3000/Home";
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				this.checkIncorrectPass = true;
				setTimeout(() => {
					this.checkIncorrectPass = false;
				}, 10000);
				notify({
					title: "Authorization",
					text: "Incorrect username or password.",
					type: "error",
				});
				this.clearVal();
			}
		},
	},
};
</script>

<style>
.center_screen {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
