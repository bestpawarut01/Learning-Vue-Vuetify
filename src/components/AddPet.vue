<template>
	<v-card>
		<v-card-title>
			<span class="text-h5-bold">Add New Pet</span>
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-text-field
							label="New Pet Name *"
							required
							:rules="fieldNamePet"
							v-model="namePet"
						>
						</v-text-field>
					</v-col>
					<v-col cols="6">
						<v-select
							clearable
							label="Select Pet Type"
							:items="listPetType"
							v-model="typePet"
						>
						</v-select
					></v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-row class="ma-4 justify-end">
				<v-btn color="blue-darken-1" variant="text" @click="closePopUp">
					cancle</v-btn
				>
				<v-btn
					color="green"
					variant="text"
					@click="Addpet"
					:disabled="isNoInput"
					>Add
				</v-btn>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export default {
	computed: {
		fieldNamePet() {
			return [(value) => !!value || "Pet name is required"];
		},
		fieldTypePet() {
			return [(value) => !!value || "Pet type is required"];
		},
		isNoInput() {
			return this.namePet == "";
		},
	},
	data() {
		return {
			listPetType: ["Cat", "Dog", "Fish", "Bird", "Mouse"],
			namePet: "",
			typePet: "",
		};
	},
	methods: {
		async Addpet() {
			try {
				const allInput = {
					petName: this.namePet,
					petType: this.typePet,
				};

				await axios.post("http://localhost:8000/pet/", allInput);
				console.log("Add pet success : ", allInput);

				notify({
					title: "Add Pet",
					text: "Add pet successfully",
					type: "success",
				});
				this.reloadTable();
			} catch (error) {
				console.log(error);
			}
		},
		reloadTable() {
			setTimeout(() => {
				this.$emit("resetTable");
				this.$emit("closeDialog");
			}, 1000);
		},
		closePopUp() {
			this.$emit("closeDialog");
		},
	},
};
</script>
<style>
/* didi {
	width: 100px;
	height: 100px;
	background: red;
	transition: width 2s, height 2s, transform 2s;
}

didi:hover {
	width: 300px;
	height: 300px;
	transform: rotate(180deg);
} */
</style>
