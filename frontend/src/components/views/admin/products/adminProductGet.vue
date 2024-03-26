<script setup lang="ts">
import { ref } from "vue";
import { table_parse } from "@helpers/table_parse.ts";
import { products_get } from "@axios/admin/products.ts";
import { Products } from "@types";
import CButton from "@global/cButton.vue";

const show = ref<boolean>(false);
const product = ref<Products>();
async function get_products() {
	await products_get().then((res: Products) => {
		product.value = res;
		show.value = true;
	});
}
</script>

<template>
	<div>
		<span class="content__title">Get All Products</span>
		<CButton class="content__form_btn" :fn="get_products" :style="{ background: `linear-gradient(${Math.floor(Math.random() * 365)}deg, #e46087 25%, #fbac60 74%)` }"> Get Products </CButton>
		<table v-show="show" class="content__table content__table-products">
			<thead>
				<tr>
					<td>Movies</td>
					<td>Books</td>
				</tr>
			</thead>
			<tr>
				<td>{{ table_parse(product?.products_movies || []) }}</td>
				<td>{{ table_parse(product?.products_books || []) }}</td>
			</tr>
		</table>
	</div>
</template>
