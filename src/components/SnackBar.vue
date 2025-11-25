<script setup lang="ts">
	import { ref, computed } from "vue";

	// Display a snackbar message
	interface Props {
		variant: "success" | "error" | "info" | "warning";
		title: string;
		message: string;
		duration?: number;
	}

	const props = defineProps<Props>();
	const { variant } = props;
	const snackbar = ref(false);
	const snackbarMessage = ref("");
	const snackbarTitle = ref("");
	const snackbarVariant = ref(variant);
	// const snackbarDuration = ref(duration);
	const snackbarTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

	// const showSnackbar = (
	// 	message: string,
	// 	title: string,
	// 	variant: Props["variant"],
	// 	duration: number
	// ) => {
	// 	snackbarMessage.value = message;
	// 	snackbarTitle.value = title;
	// 	snackbarVariant.value = variant;
	// 	snackbarDuration.value = duration;
	// 	snackbar.value = true;

	// 	if (snackbarTimeout.value) {
	// 		clearTimeout(snackbarTimeout.value);
	// 	}

	// 	snackbarTimeout.value = setTimeout(() => {
	// 		snackbar.value = false;
	// 		snackbarTimeout.value = null;
	// 	}, duration);
	// };
	const closeSnackbar = () => {
		snackbar.value = false;
		if (snackbarTimeout.value) {
			clearTimeout(snackbarTimeout.value);
			snackbarTimeout.value = null;
		}
	};
	// const snackbarClasses = computed(() => {
	// 	return {
	// 		"bg-green-500": snackbarVariant.value === "success",
	// 		"bg-red-500": snackbarVariant.value === "error",
	// 		"bg-blue-500": snackbarVariant.value === "info",
	// 		"bg-yellow-500": snackbarVariant.value === "warning",
	// 	};
	// });
	const snackbarIcon = computed(() => {
		switch (snackbarVariant.value) {
			case "success":
				return "check_circle";
			case "error":
				return "error";
			case "info":
				return "info";
			case "warning":
				return "warning";
			default:
				return "";
		}
	});
	const snackbarIconColor = computed(() => {
		switch (snackbarVariant.value) {
			case "success":
				return "text-green-500";
			case "error":
				return "text-red-500";
			case "info":
				return "text-blue-500";
			case "warning":
				return "text-yellow-500";
			default:
				return "";
		}
	});
	const snackbarIconSize = computed(() => {
		return "text-2xl";
	});
	const snackbarTitleClasses = computed(() => {
		return {
			"text-green-500": snackbarVariant.value === "success",
			"text-red-500": snackbarVariant.value === "error",
			"text-blue-500": snackbarVariant.value === "info",
			"text-yellow-500": snackbarVariant.value === "warning",
		};
	});
	const snackbarMessageClasses = computed(() => {
		return {
			"text-green-500": snackbarVariant.value === "success",
			"text-red-500": snackbarVariant.value === "error",
			"text-blue-500": snackbarVariant.value === "info",
			"text-yellow-500": snackbarVariant.value === "warning",
		};
	});
	const snackbarContainerClasses = computed(() => {
		return {
			"fixed bottom-0 left-0 right-0 p-4 z-50": true,
			"bg-opacity-75": snackbar.value,
			"bg-gray-800": snackbar.value,
			"transition-all duration-300 ease-in-out transform translate-y-full": !snackbar.value,
			"translate-y-0": snackbar.value,
		};
	});
	const snackbarContentClasses = computed(() => {
		return {
			"flex items-center justify-between p-4 rounded-lg shadow-lg": true,
			"bg-opacity-75": snackbar.value,
			"bg-gray-800": snackbar.value,
		};
	});
	const snackbarIconContainerClasses = computed(() => {
		return {
			"flex-shrink-0 mr-4": true,
			[snackbarIconColor.value]: true,
		};
	});
</script>
<template>
	<div :class="snackbarContainerClasses">
		<div :class="snackbarContentClasses">
			<div :class="snackbarIconContainerClasses">
				<i :class="`material-icons ${snackbarIconSize}`">{{ snackbarIcon }}</i>
			</div>
			<div>
				<h3 :class="snackbarTitleClasses">{{ snackbarTitle }}</h3>
				<p :class="snackbarMessageClasses">{{ snackbarMessage }}</p>
			</div>
			<button @click="closeSnackbar" class="ml-4 text-gray-500 hover:text-gray-700">
				<i class="material-icons">close</i>
			</button>
		</div>
	</div>
</template>
