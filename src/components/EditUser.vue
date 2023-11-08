<template>
	<v-card>
		<v-card-title>
			<span class="text-h5">Edit User</span>
		</v-card-title>

		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="6">
						<small style="font-weight: bold">
							Field Edit Infomation User
						</small>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="6">
						<v-text-field
							label="First Name"
							required
							v-model="firstName"
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							label="Last Name"
							required
							v-model="lastName"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="4">
						<v-text-field
							label="Age"
							type="number"
							v-model="age"
							@input="checkNumeric"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="6">
						<small style="font-weight: bold">
							Field Edit Your Pet
						</small>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="6">
						<v-card class="mx-auto" max-width="300">
							<v-list>
								<v-list-item
									v-for="(item, index) in allpetName"
									:key="index"
								>
									<v-list-item-title>
										{{ item }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-select
							v-model="allpetName"
							:items="items"
							chips
							multiple
						></v-select>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="blue-darken-1" @click="closeDialog()"> Cancel </v-btn>
			<v-btn color="green" @click="selectAll()" :disabled="isNoData">
				Save
			</v-btn>
		</v-card-actions>
		<div class="floating-row" v-if="checkSave">
			<v-progress-circular
				color="primary"
				indeterminate
				size="60"
			></v-progress-circular>
		</div>
	</v-card>
</template>
<script>
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();
export default {
	created() {
		//จะทำเสมอเมื่อมีการสร้างหน้านั้นๆใหม่
		this.findUser();
		this.fetchPetTable();
	},
	computed: {
		// เป็นการเช็คเงื่อนไขนั้นๆ ตลอดเวลา
		isNoData() {
			return this.allpetName.length == 0;
		},
	},

	props: ["userID"], //ค่าตัวแปรที่ส่งมาจากอีก component นึง
	data() {
		// ตัวแปรทั้งหมดของ component นี้
		return {
			firstName: "",
			lastName: "",
			age: "",
			allpet: [],
			items: [],
			allpetName: [],
			userName: "",
			allpetTranfer: [],
			showAlert: false,
			checkSave: false,
		};
	},
	methods: {
		checkNumeric() {
			if (isNaN(this.age)) {
				this.age = "";
			}

			if (parseInt(this.age) >= 90) {
				this.age = "";
			}
		},
		// function ทั้งหมดของ component นี้
		closeDialog(val) {
			this.$emit("closeDialog", val);
		},

		async findUser() {
			try {
				const show = await axios.get(
					"http://localhost:8000/" + this.userID
				);

				this.firstName = show.data.Item.firstName;
				this.lastName = show.data.Item.lastName;
				this.age = show.data.Item.age;
				this.allpet = Array.from(show.data.Item.petName);
				this.userName = show.data.Item.UserName;

				for (let i = 0; i < this.allpet.length; i++) {
					this.thransFerData(this.allpet[i]);
				}

				// console.log(this.userName);
			} catch (e) {
				console.log(e);
			}
		},
		async fetchPetTable() {
			try {
				const pet = await axios.get(
					"http://localhost:8000/pet/FindAll/"
				);
				// ดึงเฉพาะ petName จากผลลัพธ์การสแกนแล้วเก็บไว้ในอาเรย์
				const petNames = pet.data.Items.map((item) => item.petName);
				this.items = Array.from(petNames);
			} catch (error) {
				console.log(
					"Error : Not Found value or Can't connect to server " +
						error
				);
			}
		},
		async thransFerData(idPet) {
			try {
				const values = await axios.get(
					"http://localhost:8000/pet/" + idPet
				);

				this.allpetName.push(values.data[0].petName);
				// console.log(this.allpetName);
			} catch (error) {
				console.log(error);
			}
		},
		async selectAll() {
			try {
				await this.turnBackpetName();

				const allpromis = {
					id: this.userID,
					UserName: this.userName,
					firstName: this.firstName,
					lastName: this.lastName,
					age: this.age,
					petName: this.allpetTranfer,
				};

				await axios.patch(
					"http://localhost:8000/" + this.userID,
					allpromis
				);

				notify({
					type: "success",
					title: "Edit User",
					text: "Edit User successfully.",
				});
				this.checkSave = true;
				setTimeout(() => {
					this.$emit("refreshTable");
					this.closeDialog();
					this.checkSave = false;
				}, 1000);

				console.log("Data Input to DynamoDB : ", allpromis);
			} catch (error) {
				console.log(error);
			}
		},
		async turnBackpetName() {
			try {
				const tempAllpet = await axios.get(
					"http://localhost:8000/pet/FindAll/"
				);

				const ObjectTempallpet = tempAllpet.data.Items;
				// console.log(this.allpetName);

				const tranferPet = this.allpetName.map((pet) => {
					const matchPet = ObjectTempallpet.find(
						(pet1) => pet1.petName === pet
					);
					return matchPet ? matchPet.id : null;
				});

				this.allpetTranfer = tranferPet;
				// console.log(this.allpetTranfer);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style scoped>
.floating-row {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(
		255,
		255,
		255,
		0.5
	); /* สีขาวพร้อมกับความโปร่งแสง 50% */
}
</style>
