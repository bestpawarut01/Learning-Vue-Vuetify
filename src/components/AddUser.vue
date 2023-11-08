<template>
	<v-row class="d-flex mt-5 justify-center">
		<v-dialog v-model="dialog" persistent width="650">
			<template v-slot:activator="{ props }">
				<v-btn color="green" v-bind="props" @click="dialog = true">
					Add User
				</v-btn>
			</template>

			<v-card>
				<v-card-title>
					<span class="text-h5-bold">DIALOG ADD USER</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-col cols="12">
							<h5>Input Infomation User</h5>
						</v-col>
						<v-row>
							<v-col cols="6">
								<v-text-field
									label="User Name*"
									required
									v-model="userName"
									:rules="userNameRules"
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									label="First Name*"
									required
									v-model="firstName"
									:rules="firstNameRules"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="6">
								<v-text-field
									label="Last Name*"
									required
									v-model="lastName"
									:rules="lastNameRules"
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									label="Age"
									required
									v-model="age"
									@input="checkNumeric"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h5>Input Your Pets</h5>
							</v-col>

							<v-col cols="8">
								<v-select
									v-model="valueSelect"
									:items="items"
									chips
									multiple
								></v-select>
							</v-col>
						</v-row>
						<v-row
							><small style="color: red; font-weight: bold"
								>*indicates required field</small
							></v-row
						>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="blue-darken-1"
						variant="text"
						@click="clearValue()"
						>Close</v-btn
					>
					<v-btn
						color="green"
						variant="text"
						@click="add(), clearValue()"
						:disabled="isSaveDisabled"
						>Save</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export default {
	created() {
		this.fetchPetTable();
	},
	data: () => ({
		dialog: false,
		userName: "",
		firstName: "",
		lastName: "",
		age: "",
		valueSelect: [],
		items: [],
	}),
	computed: {
		userNameRules() {
			return [(v) => !!v || "UserName is required"];
		},
		firstNameRules() {
			return [(v) => !!v || "First Name is required"];
		},
		lastNameRules() {
			return [(v) => !!v || "Last Name is required"];
		},
		isSaveDisabled() {
			return !this.userName || !this.firstName || !this.lastName;
			//เป็นการาเช็คว่าตัวแปรทั้ง 3 ตัวนี้ว่างไหมถ้าไม่จะคือคา ture และถ้า ture ทั้ง 3 ตัวจะ return ture กลับไปที่ปุ่ม save
		},
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
		clearValue() {
			this.age = "";
			this.userName = "";
			this.firstName = "";
			this.dialog = false;
			this.valueSelect = [];
			this.lastName = "";
			this.Eventmit();
		},

		async add() {
			try {
				const allAtt = {
					UserName: this.userName,
					firstName: this.firstName,
					lastName: this.lastName,
					age: this.age,
					petName: this.valueSelect,
				};

				notify({
					type: "success",
					title: "Adding User",
					text: "Add User is Complete!",
				});

				await axios.post("http://localhost:8000/123", allAtt);
			} catch (error) {
				console.log("Error to connect server: " + error.message);
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
		Eventmit() {
			setTimeout(() => {
				this.$emit("refreshTable");
			}, 1000);
		},
	},
};
</script>
