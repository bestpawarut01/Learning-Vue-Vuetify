<template>
	<v-container>
		<div>
			<v-table>
				<thead>
					<tr>
						<th class="text-center">Pet Name</th>
						<th class="text-center">Pet Type</th>
						<th class="text-center">Edit Pet</th>
						<th class="text-center">Delete Pet</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="item in this.DataPets"
						:key="item.id"
						class="table-row text-center"
					>
						<td>{{ item.petName }}</td>
						<td>{{ item.petType }}</td>
						<td>
							<v-btn
								color="amber-darken-1"
								@click="(clickEdit = true), sendID(item.id)"
								>Edit
							</v-btn>
						</td>
						<td>
							<v-btn
								color="deep-orange-darken-1"
								@click="(clickDelete = true), sendID(item.id)"
								>Delete</v-btn
							>
						</td>
					</tr>
				</tbody>
			</v-table>

			<v-row class="mt-6 d-flex justify-center">
				<v-btn color="light-green-darken-1" @click="clickAdd = true">
					Add Pet
				</v-btn>
			</v-row>

			<v-row class="justify-center">
				<v-dialog width="750" v-model="clickAdd">
					<AddPet
						@resetTable="fetchAllpet"
						@closeDialog="closeDialog"
					/>
				</v-dialog>
			</v-row>

			<v-row class="justify-center">
				<v-dialog
					v-model="clickEdit"
					persistent
					width="650"
					height="550"
				>
					<EditPet
						:idPet="idTosend"
						@resetTable="fetchAllpet"
						@closeDialog="closeDialog"
					/>
				</v-dialog>
			</v-row>

			<v-row>
				<v-dialog width="650" v-model="clickDelete"
					><DeletePet
						:idPet="idTosend"
						@resetTable="fetchAllpet"
						@closeDialog="closeDialog"
					></DeletePet
				></v-dialog>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import axios from "axios";
import AddPet from "./AddPet.vue";
import EditPet from "./EditPet.vue";
import DeletePet from "./DeletePet.vue";

export default {
	components: { AddPet, EditPet, DeletePet },
	created() {
		this.fetchAllpet();
	},
	data() {
		return {
			DataPets: [],
			clickAdd: false,
			clickEdit: false,
			clickDelete: false,
			idTosend: "",
		};
	},
	methods: {
		async fetchAllpet() {
			try {
				const AllPet = await axios.get(
					"http://localhost:8000/pet/FindAll/"
				);

				this.DataPets = AllPet.data.Items;
				console.log("Fetch All Pet complete on ManagePet.vue");
			} catch (e) {
				console.log(e);
			}
		},
		sendID(id) {
			this.idTosend = id;
			console.log(this.idTosend);
		},
		closeDialog() {
			this.clickDelete = false;
			this.clickAdd = false;
			this.clickEdit = false;
		},
	},
};
</script>

<style>
.table-row:hover {
	background-color: #e0e0e0;
	cursor: pointer;
	transition: 0.8s;
}
</style>
