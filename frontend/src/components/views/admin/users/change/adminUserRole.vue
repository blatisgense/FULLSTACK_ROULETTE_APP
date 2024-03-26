<script setup lang="ts">
import { ref } from "vue";
import { user_change_role } from "@axios/admin/users.ts";
import CInput from "@global/cInput.vue";
import CRadio from "@global/cRadio.vue";
import CButton from "@global/cButton.vue";

const email = ref<string>("");
const value = ref<"ADMIN" | "USER">("ADMIN");
</script>

<template>
	<div>
		<span class="content__title">Change Users Role</span>
		<form
			id="change_users_role_form"
			class="content__form"
			@submit.prevent="
				user_change_role({ email: email, value: value });
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
					:form="'change_users_role_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Choose new Role</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'value'" :form="'change_users_role_form'" :value="'ADMIN'" @update:value="value = 'ADMIN'" />
					<CRadio class="content__form_radio" :required="true" :name="'value'" :form="'change_users_role_form'" :value="'USER'" @update:value="value = 'USER'" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'change_users_role_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }"
				>Change</CButton
			>
		</form>
	</div>
</template>
