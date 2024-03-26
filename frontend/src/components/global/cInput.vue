<script setup lang="ts">
const props = defineProps<{ form?: string; type?: string; placeholder: string; value: string; auto?: string; required?: boolean; pattern?: string }>();

const emits = defineEmits<{
	(e: "update:value", value: any): any;
}>();
</script>

<template>
	<div class="input__outer">
		<input
			class="input"
			:pattern="props.pattern"
			:required="props.required"
			:form="props.form"
			:value="props.value"
			:placeholder="props.placeholder"
			:type="props.type"
			:autocomplete="auto"
			@input="emits('update:value', ($event.target as HTMLInputElement)?.value.trim())"
		/>
	</div>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";
.input {
	transition: mixins.linear_anim(0.5s);
	@include mixins.font;
	background-color: mixins.$input_bg;
	color: mixins.$btn_dark;
	text-align: center;
	text-overflow: ellipsis;
	border-radius: 42px;
	width: calc(100% - 8px);
	height: calc(100% - 8px);
	font-weight: inherit;
	letter-spacing: inherit;
	font-size: inherit;
	appearance: none;
	&::placeholder {
		color: mixins.$btn_dark;
		font-size: inherit;
	}
	&:focus {
		outline: none;
		background-color: transparent;
		color: mixins.$bg_pink;
	}
	&__outer {
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 4em;
	}
}
</style>
