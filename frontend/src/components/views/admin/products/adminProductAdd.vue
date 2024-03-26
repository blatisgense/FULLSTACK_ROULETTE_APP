<script setup lang="ts">
import CInput from "@global/cInput.vue";
import CRadio from "@global/cRadio.vue";
import CButton from "@global/cButton.vue";
import { ref } from "vue";
import { product_add } from "@axios/admin/products.ts";

const name = ref<string>("");
const type = ref<"books" | "movies">("books");
</script>

<template>
	<div>
		<span class="content__title">Add New Product</span>
		<form
			id="add_product"
			class="content__form"
			@submit.prevent="
				product_add({ name: name, type: type });
				($event.target as HTMLFormElement).reset();
			"
		>
			<div class="content__form_inner">
				<span class="content__form_description">Product's name</span>
				<CInput
					class="content__form_input"
					:required="true"
					:style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #ef48e9 21%, #8ccefb 68%)` }"
					:placeholder="'Name'"
					:form="'add_product'"
					:type="'text'"
					:auto="'none'"
					:value="name"
					@update:value="(val: string) => (name = val)"
				/>
			</div>
			<div class="content__form_inner">
				<span class="content__form_description">Choose type</span>
				<div class="content__form_row">
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'add_product'" :value="'movies'" @update:value="(val: 'movies') => (type = val)" />
					<CRadio class="content__form_radio" :required="true" :name="'field'" :form="'add_product'" :value="'books'" @update:value="(val: 'books') => (type = val)" />
				</div>
			</div>
			<CButton class="content__form_btn" :type="'submit'" :form="'add_product'" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }">Add Product</CButton>
		</form>
	</div>
</template>
