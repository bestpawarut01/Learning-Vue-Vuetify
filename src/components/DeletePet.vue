<template>
	<v-card>
		<v-card-title>
			<span class="text-h5-bold">Delete Pet</span>
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<h4>Are you sure you want to delete step</h4>
						<p>
							Deleteing this step is permanet there si no going
							back.
						</p>
						<p>Do you want to continue.?</p>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-row class="ma-4 justify-end">
				<v-btn color="blue-darken-1" variant="text" @click="closePopUp">
					cancle</v-btn
				>
				<v-btn
					color="deep-orange-darken-1"
					variant="text"
					@click="DeletePet()"
					>Delete
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

	data() {
		return {
			checkSave: false,
		};
	},
	methods: {
		async DeletePet() {
			try {
				await axios.delete("http://localhost:8000/pet/" + this.idPet);

				console.log("Delete Pet id : " + this.idPet);
				this.checkSave = true;
				this.ResetData();

				notify({
					title: "Delete Pet",
					text: "Pet ID : " + this.idPet + " has been deleted",
					type: "error",
				});
			} catch (error) {
				console.log(error);
			}
		},
		ResetData(val) {
			setTimeout(() => {
				this.checkSave = false;
				this.$emit("resetTable", val);
				this.$emit("closeDialog", val);
			}, 1500);
		},
		closePopUp() {
			this.$emit("closeDialog");
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
