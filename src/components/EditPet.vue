<template>
	<v-card>
		<v-card-title>
			<span class="text-h5-bold">Edit Pet</span>
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-text-field disabled>
							{{ this.tempPetName }}
						</v-text-field>
					</v-col>
					<v-col cols="6">
						<v-select
							clearable
							label="Select Pet Type"
							:items="listPetType"
							v-model="Edittype"
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
					@click="commitEdit(), test()"
					>Submit Edit
				</v-btn>
			</v-row>
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
	props: ["idPet"],
	created() {
		this.fetchNamePet();
	},
	data() {
		return {
			listPetType: ["Cat", "Dog", "Fish", "Bird", "Mouse"],
			tempPetName: "",
			Edittype: "",
			checkSave: false,
		};
	},
	methods: {
		async fetchNamePet() {
			try {
				const DataPet = await axios.get(
					"http://localhost:8000/pet/" + this.idPet
				);

				this.tempPetName = DataPet.data[0].petName;
				console.log(this.tempPetName);
			} catch (error) {
				console.log(error);
			}
		},
		async commitEdit() {
			try {
				const prepareData = {
					id: this.idPet,
					petName: this.tempPetName,
					petType: this.Edittype,
				};

				console.log("Data for Edit : ", prepareData);
				await axios.patch(
					"http://localhost:8000/pet/" + this.idPet,
					prepareData
				);

				notify({
					title: "Edit Pet",
					text: "Edit pet completed",
					type: "success",
				});
				this.closePopUpANDfetch();
			} catch (error) {
				console.Consolelog(error);
			}
		},
		closePopUpANDfetch() {
			setTimeout(() => {
				this.$emit("resetTable");
				this.$emit("closeDialog");
			}, 2000);
		},
		closePopUp() {
			this.$emit("closeDialog");
		},
		test() {
			this.checkSave = true;
			setTimeout(() => {
				this.checkSave = false;
			}, 2000);
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
