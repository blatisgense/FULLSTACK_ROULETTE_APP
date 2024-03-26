<script setup lang="ts">
import { ref } from "vue";
import { Users } from "@types";
import { user_get_all } from "@axios/admin/users.ts";
import { table_parse } from "@helpers/table_parse.ts";
import CButton from "@global/cButton.vue";

const users = ref<Users>([]);
const show = ref<boolean>(false);

async function get_users() {
	await user_get_all().then((res: Users) => {
		users.value = res;
		show.value = true;
	});
}
</script>

<template>
	<div>
		<span class="content__title">Get All Users</span>
		<CButton class="content__form_btn" :fn="get_users" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">Get Users</CButton>
		<table v-show="show" class="content__table content__table-user">
			<thead>
				<tr>
					<td>Email</td>
					<td>Movies</td>
					<td>Books</td>
					<td>Wheels</td>
					<td>Money</td>
					<td>Role</td>
				</tr>
			</thead>
			<tr v-for="user in users" @click="($event.target as HTMLDivElement).closest('tr')?.classList.toggle('selected')">
				<td>{{ user.user_email }}</td>
				<td>{{ table_parse(user.user_movies) }}</td>
				<td>{{ table_parse(user.user_books) }}</td>
				<td>{{ user.user_wheels }}</td>
				<td>{{ user.user_money }}</td>
				<td>{{ user.user_role }}</td>
			</tr>
		</table>
	</div>
</template>
