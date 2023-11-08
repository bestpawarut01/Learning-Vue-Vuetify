<template>
	<v-app-bar app color="blue" dark>
		<v-container>
			<v-sheet class="d-flex" color="blue">
				<v-sheet class="ma-2 mt-4 pa-2 me-auto" color="blue">
					<h1>Manage User & Pet</h1>
				</v-sheet>
				<v-sheet class="ma-2 pa-2" color="blue">
					<v-tabs>
						<router-link
							to="/Home"
							class="router-link"
							:class="{ active: $route.path === '/Home' }"
						>
							<v-tab class="tab-hover">
								Manage User
								<v-icon
									icon="mdi-arrow-right"
									class="hidden-icon"
								>
								</v-icon>
							</v-tab>
						</router-link>

						<router-link
							to="/Manage-Pet"
							class="router-link"
							:class="{
								active: $route.path === '/Manage-Pet',
							}"
						>
							<v-tab class="tab-hover">
								<v-icon
									icon="mdi-arrow-left"
									class="hidden-icon"
								></v-icon>
								Manage Pet
							</v-tab>
						</router-link>

						<router-link to="/" class="router-link">
							<v-tab class="hoverLog">
								<v-icon
									icon="mdi-arrow-left"
									class="hidden-icon"
								></v-icon>
								Logout
							</v-tab>
						</router-link>
					</v-tabs>
				</v-sheet>
			</v-sheet>
		</v-container>
	</v-app-bar>
</template>

<style>
.v-tab .hidden-icon {
	display: none;
	transition: opacity 0.3s ease;
	opacity: 0;
}

.tab-hover:hover .hidden-icon {
	display: inline;
	opacity: 1;
}

/* เพิ่ม animation ให้แท็บ */
.tab-hover {
	transition: transform 0.3s;
}

.tab-hover:hover {
	transform: scale(1.05);
}

.router-link {
	text-decoration: none;
	color: white;
}
.active {
	background-color: rgb(249, 147, 63);
	color: white;
}
.hoverLog:hover {
	background-color: rgb(211, 94, 94);
	color: white;
}
</style>
