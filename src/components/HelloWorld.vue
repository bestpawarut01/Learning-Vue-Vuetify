<template>
	<v-container class="mt-3">
		<div>
			<v-table class="mt-3 text-center">
				<thead class="table-head">
					<tr>
						<th style="color: white; text-align: center">
							Username
						</th>
						<th style="color: white; text-align: center">
							Firstname
						</th>
						<th style="color: white; text-align: center">
							Lastname
						</th>
						<th style="color: white; text-align: center">
							Edit User
						</th>
						<th style="color: white; text-align: center">
							Delete User
						</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="item in this.tableData.Items"
						:key="item"
						class="table-row"
					>
						<td>{{ item.UserName }}</td>
						<td>{{ item.firstName }}</td>
						<td>{{ item.lastName }}</td>
						<td>
							<v-btn
								color="warning"
								@click="(dialogEdit = true), showId(item.id)"
							>
								Edit
							</v-btn>
						</td>
						<td>
							<v-btn
								color="red"
								@click="
									dialog = true;
									showId(item.id);
								"
							>
								Delete
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>

			<AddUser @refreshTable="fetchData" />

			<!-- โชว์ Dialog เมื่อมีการกดปุ่ม Delete -->
			<!-- @closeDialog ส่ง function closeDialog ไปอีก component นึงให้รู้จัก-->
			<!-- @refreshTable ส่ง function fetchData ไปอีก component ให้รู้จักเพื่อรีเฟรช Table ใหม่-->
			<v-row justify="center">
				<v-dialog v-model="dialog" persistent width="auto">
					<DeleteUser
						@closeDialog="closeDialog"
						@refreshTable="fetchData"
						:userID="userID"
					/>
				</v-dialog>
			</v-row>

			<!-- โชว์ Dialog เมื่อมีการกดปุ่ม Edit -->
			<v-row class="d-flex mt-5 justify-center">
				<v-dialog v-model="dialogEdit" persistent width="750">
					<EditUser
						@closeDialog="closeDialog"
						:userID="userID"
						@refreshTable="fetchData"
					/>
				</v-dialog>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import Axios from "axios";
import AddUser from "./AddUser.vue";
import DeleteUser from "./DeleteUser.vue";
import EditUser from "./EditUser.vue";

export default {
	created() {
		this.fetchData(); // เรียกใช้ฟังก์ชัน fetchData ในขณะที่ component ถูกสร้าง
	},
	components: { AddUser, DeleteUser, EditUser },
	data() {
		return {
			tableData: [],
			dialog: false,
			dialogEdit: false,
			userID: "",
		};
	},
	methods: {
		async fetchData() {
			try {
				console.log("Function fetchData");
				const response = await Axios.get(
					"http://localhost:8000/" // ระบุ URL ของ API Gateway หรือที่คุณสร้างไว้เพื่อเรียกใช้ข้อมูลจาก DynamoDB
				);
				const data = response.data;

				this.tableData = data;

				console.log("Data from DynamoDB", this.tableData.Items);
			} catch (error) {
				console.error("Error while fetching data", error);
			}
		},
		closeDialog() {
			this.dialog = false;
			this.dialogEdit = false;
		},
		showId(rowId) {
			this.userID = rowId;
			console.log(this.userID);
		},
	},
};
</script>

<style scoped>
.table-row:hover {
	background-color: #f5f5f5;
	cursor: pointer;
}

.table-head {
	background-color: #2196f3;
	font-size: 25px;
}
</style>
