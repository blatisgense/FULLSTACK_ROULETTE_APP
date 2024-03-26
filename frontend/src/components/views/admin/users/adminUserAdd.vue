<script setup lang="ts">
import CButton from "@global/cButton.vue";
import CInput from "@global/cInput.vue";
import { ref } from "vue";
import { user_add } from "@axios/admin/users.ts";

const email = ref<string>("");
const name = ref<string>("");
const password = ref<string>("");
</script>

<template>
	<div>
		<span class="content__title">Add New User</span>
		<form
			id="add_user_form"
			class="content__form"
			@submit.prevent="
				user_add({ email: email, password: password, name: name });
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
					:form="'add_user_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">User's name</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Name'"
					:form="'add_user_form'"
					:type="'text'"
					:auto="'none'"
					:value="name"
					@update:value="(val: string) => (name = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">User's password</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Password'"
					:form="'add_user_form'"
					:type="'password'"
					:auto="'none'"
					:value="password"
					@update:value="(val: string) => (password = val)"
				/>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'add_user_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">Add User</CButton>
		</form>
	</div>
</template>
