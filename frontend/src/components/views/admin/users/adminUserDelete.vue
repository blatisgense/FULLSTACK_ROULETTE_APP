<script setup lang="ts">
import { ref } from "vue";
import { user_delete } from "@axios/admin/users.ts";
import CButton from "@global/cButton.vue";
import CRadio from "@global/cRadio.vue";
import CInput from "@global/cInput.vue";

const email = ref<string>("");
const agree = ref<boolean>(false);
</script>

<template>
	<div>
		<span class="content__title">Delete User</span>
		<form
			id="delete_user_form"
			class="content__form"
			@submit.prevent="
				user_delete(email);
				($event.target as HTMLFormElement).reset();
				email = '';
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">User's email</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Email'"
					:form="'delete_user_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description"
					>Do you agree with deleting <br />
					User: {{ email }},<br />
					it cannot be undone.</span
				>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'delete_user_form'" :value="'Yep'" @update:value="agree = true" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'delete_user_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }"> Change </CButton>
		</form>
	</div>
</template>
