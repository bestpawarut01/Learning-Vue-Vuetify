// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/default/Default.vue"),
		children: [
			{
				path: "Home",
				name: "Home",
				component: () =>
					import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
			},
			{
				path: "Manage-Pet",
				name: "ManagePet",
				component: () =>
					import(
						/* webpackChunkName: "Manage-Pet" */ "@/views/ManagePet.vue"
					),
			},
			{
				path: "",
				name: "LoginPage",
				component: () =>
					import(
						/* webpackChunkName: "LoginPage*/ "@/views/Login.vue"
					),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
