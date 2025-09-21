<script setup lang="ts">
	import { VForm } from "vuetify/components/VForm";
	import { requiredValidator, emailValidator } from "@/utils/validators";
	import { appRoutes } from "@/router/routes";
	import { appLocalesMapping } from "@/locales/appLocalesMapping";
	import { faker } from "@faker-js/faker";
	import { GlobalStore, useInitializedGlobalStore } from "@/stores";
	import LoginRoute from "../../apis/login_route";
	import { ApiError, UnauthorizedApiError, UnprocessableEntityApiError } from "@/api/errors";

	const { t } = useI18n<{ message: typeof appLocalesMapping }>();

	const loginFormRef = ref<VForm>();
	const showPassword = ref(false);
	const globalStore = ref<GlobalStore | null>(null);
	const alert = ref<AppAlertInterface | null>(null);
	const loading = ref(false);

	const form = ref<LoginInterface>({
		credential: "",
		password: "",
		// remember_me: false,
	});

	const fieldsErrors = ref<{ [key in keyof LoginInterface]: string[] }>({
		credential: [],
		password: [],
	});

	const togglePasswordVisibility = () => {
		showPassword.value = !showPassword.value;
	};

	const onSubmit = async () => {
		loading.value = true;
		// wait 3 seconds to simulate a network request
		AppUtils.logger.info("Submitting login form", form.value);
		await new Promise((resolve) => setTimeout(resolve, 3000));

		const isValid = await AppUtils.formIsValid(loginFormRef as Ref);
		if (!isValid) return;

		try {
			const route = new LoginRoute(form.value);
			const result = await route.request();
			console.log("result avant", route);

			if (result instanceof SessionModel) {
				console.log("result après", result);

				globalStore.value?.setSession(result);
				toast.success("Connexion réussie !");
				setTimeout(() => {
					router.replace({ name: appRoutes.dashboard });
				}, 2000);
				return;
			}

			if (result instanceof UnprocessableEntityApiError) {
				fieldsErrors.value.credential = result.data.credential ?? null;
				fieldsErrors.value.password = result.data.password ?? null;
			} else if (result instanceof UnauthorizedApiError || result instanceof ApiError) {
				alert.value = {
					type: "danger",
					id: faker.string.uuid(),
					title: "Erreur",
					message: result.message,
				};
			}
		} catch (error) {
			console.error("Erreur inattendue pendant la connexion:", error);
			alert.value = {
				type: "danger",
				id: faker.string.uuid(),
				title: "Erreur inattendue",
				message: "Une erreur est survenue. Veuillez réessayer plus tard.",
			};
		} finally {
			loading.value = false;
		}
	};
	onMounted(async () => {
		globalStore.value = await useInitializedGlobalStore();
	});
</script>
<template>
	<VForm ref="loginFormRef" @submit.prevent="onSubmit">
		<div class="py-3">
			<VCol cols="12" v-if="alert">
				<Alert
					:type="alert.type"
					:id="alert.id"
					:title="alert.title"
					:message="alert.message"
					:closable="true"
					:onClose="
						() => {
							alert = null;
						}
					"
				/>
			</VCol>
			<div class="mb-4">
				<VLabel class="mb-2">Email</VLabel>
				<VTextField
					v-model="form.credential"
					:placeholder="t(appLocalesMapping.authentication.login.form.username.placeholder)"
					:rules="[requiredValidator, emailValidator]"
					variant="filled"
					density="compact"
					prepend-inner-icon="ri-user-3-line"
					:error-messages="fieldsErrors.credential"
					persistent-placeholder
				/>
			</div>
			<div class="mb-4">
				<VLabel class="mb-2">Mot de passe</VLabel>

				<VTextField
					v-model="form.password"
					:placeholder="t(appLocalesMapping.authentication.login.form.password.placeholder)"
					:rules="[requiredValidator]"
					variant="filled"
					density="compact"
					prepend-inner-icon="ri-lock-2-line"
					:append-inner-icon="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"
					persistent-placeholder
					:type="showPassword ? 'text' : 'password'"
					:error-messages="fieldsErrors.password"
					@click:append-inner="togglePasswordVisibility"
				/>
			</div>
			<!-- <div class="mb-4">
        <div
          class="d-md-flex align-items-md-center justify-content-md-between flex items-center justify-between"
        >
          <VCheckbox
            false-icon="ri-checkbox-blank-line"
            true-icon="ri-checkbox-fill"
            v-model="form.remember_me"
            :label="
              t(appLocalesMapping.authentication.login.form.rememberMe.label)
            "
          />
          <div class="py-2">
            <RouterLink
              :to="{ name: appRoutes.authentication.forgotPassword }"
              class="fs-sm fw-medium"
            >
              {{ t(appLocalesMapping.authentication.login.forgotPassword) }}
            </RouterLink>
          </div>
        </div>
      </div> -->
		</div>
		<div class="row justify-content-center px-3">
			<VBtn
				:loading="loading"
				type="submit"
				block
				variant="flat"
				class="flex justify-center items-center gap-8"
			>
				<VIcon icon="ri-login-box-fill" />
				<span class="ml-1">{{ t(appLocalesMapping.authentication.login.login) }}</span>
			</VBtn>
		</div>
	</VForm>
</template>
