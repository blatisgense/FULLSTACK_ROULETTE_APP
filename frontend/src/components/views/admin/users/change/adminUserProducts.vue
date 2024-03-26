<script setup lang="ts">
import { ref } from "vue";
import { user_change_products } from "@axios/admin/users.ts";
import CInput from "@global/cInput.vue";
import CRadio from "@global/cRadio.vue";
import CButton from "@global/cButton.vue";

const email = ref<string>("");
const name = ref<string>("");
const field = ref<"movies" | "books">("movies");
const method = ref<"add" | "delete">("add");
</script>

<template>
	<div>
		<span class="content__title">Change Users Products</span>
		<form
			id="change_users_products_form"
			class="content__form"
			@submit.prevent="
				user_change_products({ email: email, name: name, field: field, method: method });
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
					:form="'change_users_products_form'"
					:type="'email'"
					:auto="'none'"
					:value="email"
					@update:value="(val: string) => (email = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Product name</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Value'"
					:form="'change_users_products_form'"
					:type="'text'"
					:auto="'none'"
					:value="name"
					@update:value="(val: string) => (name = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Choose field</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'change_users_products_form'" :value="'movies'" @update:value="field = 'movies'" />
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'change_users_products_form'" :value="'books'" @update:value="field = 'books'" />
				</div>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Choose method</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'method'" :form="'change_users_products_form'" :value="'add'" @update:value="method = 'add'" />
					<CRadio class="content__form_radio" :required="true" :name="'method'" :form="'change_users_products_form'" :value="'delete'" @update:value="method = 'delete'" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'change_users_products_form'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">
				Change
			</CButton>
		</form>
	</div>
</template>
