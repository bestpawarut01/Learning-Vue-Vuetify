<template>
	<v-card>
		<v-card-title class="text-h5"> Delete User </v-card-title>
		<v-card-text
			>Do you want to Delete User.If you delete data it will be
			Remove.</v-card-text
		>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="red" variant="text" @click="closeDialog()">
				Disagree
			</v-btn>
			<v-btn color="green-darken-1" variant="text" @click="deleteUser()">
				Agree
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
import Axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export default {
	data() {
		return {
			checkSave: false,
		};
	},
	props: ["userID"],
	methods: {
		async deleteUser() {
			try {
				await Axios.delete("http://localhost:8000/" + this.userID);

				console.log("Delete User ID : " + this.userID + " Complete.");

				notify({
					title: "Delete User",
					text: "User has been deleted",
					type: "error",
				});
				this.checkSave = true;
				setTimeout(() => {
					this.checkSave = false;
					this.closeDialog(); // ปิดหน้าต่าง dialog
					this.$emit("refreshTable");
				}, 1500);
			} catch (error) {
				console.log("Error to connect server: " + error);
			}
		},
		closeDialog(val) {
			this.$emit("closeDialog", val);
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
