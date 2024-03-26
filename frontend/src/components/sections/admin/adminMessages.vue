<script setup lang="ts">
import { onMounted, ref } from "vue";
import { get_messages, read_message, read_all_messages } from "@axios/admin/feedback.ts";
import { Messages, Message } from "@types";
import { useUiStore } from "@state/pinia.ts";

const uiStore = useUiStore();

const unread = ref<Messages>([]);

onMounted(async () => {
	await get_messages().then((res: Messages) => {
		if (res.length > 0) {
			unread.value = res;
			uiStore.new_messages = true;
		}
	});
});

async function read_single(id: number) {
	await read_message(id).then((res: boolean | void) => {
		if (res) {
			let index = unread.value.findIndex((el: Message) => el.msg_id === id);
			unread.value.splice(index, 1);
			if (unread.value.length === 0) {
				uiStore.new_messages = false;
				uiStore.message_open = false;
			}
		}
	});
}

async function read_all() {
	await read_all_messages().then((res: boolean | void) => {
		if (res) {
			unread.value = [];
			uiStore.new_messages = false;
			uiStore.message_open = false;
		}
	});
}
</script>

<template>
	<transition name="msg" mode="out-in">
		<section v-show="uiStore.message_open" class="messages" :class="{ no_messages: unread.length === 0 }">
			<div class="messages__container">
				<div v-for="msg in unread" :key="msg.msg_id" class="messages__card" :data-status="msg.status" @click="read_single(msg.msg_id)">
					<span class="messages__card_name">{{ msg.sender_name }}</span>
					<span class="messages__card_email">{{ msg.sender_email }}</span>
					<p class="messages__card_msg">
						{{ msg.msg }}
					</p>
				</div>
				<span v-if="unread.length === 0" class="messages__fallback">No unread messages yet.</span>
			</div>
			<span v-if="unread.length > 0" class="messages__read" @click="read_all">read all messages</span>
		</section>
	</transition>
</template>

<style scoped lang="scss">
@use "@styles/config/mixins";

.msg-enter-active,
.msg-leave-active {
	transition: transform 0.5s cubic-bezier(0, 0, 0.1, 1.03);
}
.msg-enter-from,
.msg-leave-to {
	transform: translateY(-700px);
}
.messages {
	@include mixins.shadow;
	background-color: mixins.$cabinet_bg;
	position: fixed;
	width: 600px;
	height: 530px;
	padding: 16px;
	border-radius: 0 0 9px 9px;
	z-index: 8;
	top: 100px;
	right: 100px;
	@include mixins.font;
	display: flex;
	flex-direction: column;
	&.no_messages {
		justify-content: center;
	}
	&__container {
		width: 100%;
		max-height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		row-gap: 16px;
		overscroll-behavior: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	&__fallback {
		margin: auto;
		font-weight: 600;
		font-size: 22px;
	}
	&__read {
		margin-top: auto;
		padding-top: 16px;
		text-transform: uppercase;
		font-weight: 500;
		font-size: 16px;
	}
	&__card {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		position: relative;
		border: 1px solid mixins.$text_link;
		border-radius: 6px;
		padding: 10px;
		&[data-status="unread"]:after {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 12px;
			height: 12px;
			border-radius: 100%;
			background-color: mixins.$msg_status;
			content: "";
		}
		&_msg {
			font-size: 16px;
			font-weight: 400;
			margin-top: 25px;
		}
		&_name {
			font-size: 20px;
			font-weight: 700;
		}
		&_email {
			font-size: 18px;
			font-weight: 500;
			font-style: italic;
			line-height: 120%;
		}
	}
}

@import "@styles/mediaQueries/admin/adminMessagesQueries";
</style>
