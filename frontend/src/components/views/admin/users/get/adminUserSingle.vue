<script setup lang="ts">
import { ref } from "vue";
import { User } from "@types";
import { user_get_single } from "@axios/admin/users.ts";
import { table_parse } from "@helpers/table_parse.ts";
import CButton from "@global/cButton.vue";
import CInput from "@global/cInput.vue";

const user = ref<User>();
const email = ref<string>("");
const show = ref<boolean>(false);

async function get_user() {
	await user_get_single(email.value).then((res: User | void) => {
		if (res) {
			user.value = res;
			show.value = true;
			return;
		}
		show.value = false;
	});
}
</script>

<template>
	<div>
		<span class="content__title">Get User</span>
		<form
			id="get_user_form"
			class="content__form"
			@submit.prevent="
				get_user();
				($event.target as HTMLFormElement).reset();
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">User's email</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Email'"
					:form="'get_user_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'get_user_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">Get User</CButton>
		</form>
		<table v-if="show" class="content__table content__table-user">
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
			<tr>
				<td>{{ user?.user_email }}</td>
				<td>{{ table_parse(user?.user_movies || []) }}</td>
				<td>{{ table_parse(user?.user_books || []) }}</td>
				<td>{{ user?.user_wheels }}</td>
				<td>{{ user?.user_money }}</td>
				<td>{{ user?.user_role }}</td>
			</tr>
		</table>
	</div>
</template>
