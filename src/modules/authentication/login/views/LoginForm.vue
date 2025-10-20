<script setup lang="ts">
	import { faker } from "@faker-js/faker";
	import LoginRoute from "../../apis/login_route";
import { onMounted, ref } from "vue";
import type { AppAlertInterface } from "../../../../interfaces/AppAlertInterface";
import { useInitializedGlobalStore, type GlobalStore } from "../../../../stores";
import type { LoginInterface } from "../../interfaces/login_interface";
import { AppUtils } from "../../../../utils";
import SessionModel from "../models/session_model";
import { toast } from "../../../../utils/toast";
import router from "../../../../router";
import appRoutes from "../../../../router/routes";
import { ApiError, UnauthorizedApiError, UnprocessableEntityApiError } from "../../../../api/errors";


interface FormRef {
  validate: () => Promise<{ valid: boolean }>;
  reset?: () => void;
  resetValidation?: () => void;
}

const loginFormRef = ref<FormRef>();
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
  console.log("SUBMIT CALLED");

  loading.value = true;
  AppUtils.logger.info("Submitting login form", form.value);

  // ✅ Validation manuelle
  if (!form.value.credential) {
    fieldsErrors.value.credential = ["L'email ou identifiant est requis"];
    loading.value = false;
    return;
  } else {
    fieldsErrors.value.credential = [];
  }

  if (!form.value.password) {
    fieldsErrors.value.password = ["Le mot de passe est requis"];
    loading.value = false;
    return;
  } else {
    fieldsErrors.value.password = [];
  }

  try {
    console.log("VALID => continue dans le try");
    console.log("result avant", form.value);

    const route = new LoginRoute(form.value);
    const result = await route.request();

    if (result instanceof SessionModel) {
      console.log("result après", result);
      globalStore.value?.setSession(result);
      toast.success("Connexion réussie !");
      setTimeout(() => {
        router.replace({ name: "/users" });
      }, 2000);
      return;
    }

    if (result instanceof UnprocessableEntityApiError) {
      fieldsErrors.value.credential = result.data.credential ?? [];
      fieldsErrors.value.password = result.data.password ?? [];
    } else if (
      result instanceof UnauthorizedApiError ||
      result instanceof ApiError
    ) {
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
	<form ref="loginFormRef" @submit.prevent="onSubmit">
		<div class="py-3">
			<div cols="12" v-if="alert">
				<div
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
				></div>
					</div>
			<div class="mb-4">
				<label class="mb-2">Email</label>
				<input
					v-model="form.credential"
					variant="filled"
					density="compact"
					prepend-inner-icon="ri-user-3-line"
					:error-messages="fieldsErrors.credential"
					persistent-placeholder
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2">Mot de passe</label>

				<input
					v-model="form.password"
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
			<button
				:loading="loading"
				type="submit"
				block
				variant="flat"
				class="flex justify-center items-center gap-8"
			>Connexion
				<!-- <VIcon icon="ri-login-box-fill" /> -->
			</button>
		</div>
	</form>
</template>
