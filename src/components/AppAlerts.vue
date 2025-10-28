<script setup lang="ts">
import type { AppAlertInterface } from '../interfaces/AppAlertInterface';

	const props = defineProps<{ alerts: AppAlertInterface[] }>();
</script>
<template>
	<div class="app-alerts-container">
		<template v-if="props.alerts.length > 0">
			<Alert
				v-for="(alert, index) in alerts.reverse().slice(0, 2)"
				:id="alert.id"
				:title="alert.title"
				:key="index"
				:type="alert.type"
				:message="alert.message"
				:closable="true"
				:onClose="alert.onClose"
			/>
			<span v-if="props.alerts.length > 2">
				et <b>{{ props.alerts.length - 2 }}</b> autre{{
					props.alerts.length - 2 > 1 ? "s" : ""
				}}
				alerte{{ props.alerts.length - 2 > 1 ? "s" : "" }}
			</span>
		</template>
	</div>
</template>
