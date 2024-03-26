<script setup lang="ts">
import { ref } from "vue";
import { user_change_integers } from "@axios/admin/users.ts";
import CInput from "@global/cInput.vue";
import CRadio from "@global/cRadio.vue";
import CButton from "@global/cButton.vue";

const email = ref<string>("");
const value = ref<string>("");
const field = ref<"money" | "wheels">("money");
</script>

<template>
	<div>
		<span class="content__title">Change Users Integers</span>
		<form
			id="change_users_integers_form"
			class="content__form"
			@submit.prevent="
				user_change_integers({ email: email, value: value, field: field });
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
					:form="'change_users_integers_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">New value (number)</span>
				<CInput
					:pattern="'[0-9]+'"
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Value'"
					:form="'change_users_integers_form'"
					:type="'text'"
					:auto="'none'"
					:value="value"
					@update:value="(val: string) => (value = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Choose field</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'change_users_integers_form'" :value="'wheels'" @update:value="field = 'wheels'" />
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'change_users_integers_form'" :value="'money'" @update:value="field = 'money'" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'change_users_integers_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">
				Change
			</CButton>
		</form>
	</div>
</template>
