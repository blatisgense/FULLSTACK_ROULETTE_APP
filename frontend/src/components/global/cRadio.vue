<script setup lang="ts">
const props = defineProps<{ name: string; form: string; value: string; required?: boolean }>();

const emits = defineEmits<{
	(e: "update:value", value: any): any;
}>();
</script>

<template>
	<label class="radio">
		<input class="radio__input" type="radio" :required="props.required" :value="props.value" :name="props.name" :form="props.form" @change="emits('update:value', props.value)" />
		<span class="radio__text">{{ props.value }}</span>
	</label>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";
.radio {
	display: flex;
	align-items: center;
	height: fit-content;
	column-gap: 10px;
	&__input {
		box-sizing: border-box;
		margin: 6px;
		padding: 0;
		border: 2px solid mixins.$text_link;
		border-radius: 50%;
		appearance: none;
		background-color: transparent;
		outline: none;
		transition: mixins.linear_anim(0.8s);
		width: 1.5em;
		height: 1.5em;
		font-size: inherit;
		cursor: pointer;
		&:checked {
			background-color: mixins.$text_link;
			background-clip: content-box;
			padding: 4px;
			background-image: radial-gradient(circle, mixins.$text_link 0%, mixins.$text_link 50%, transparent 60%, transparent 100%);
		}
	}
	&__text {
		@include mixins.font;
		font-weight: inherit;
		font-size: inherit;
		color: mixins.$text_dark;
		text-transform: capitalize;
	}
}
</style>
