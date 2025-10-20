<script setup lang="ts">
	import { faker } from "@faker-js/faker";
import { onMounted, ref } from "vue";
import type { AppAlertInterface } from "../../../../interfaces/AppAlertInterface";
import { useInitializedGlobalStore, type GlobalStore } from "../../../../stores";
import type { LoginInterface } from "../../interfaces/login_interface";
import { AppUtils } from "../../../../utils";
import { toast } from "../../../../utils/toast";
import router from "../../../../router";
import {
  requiredValidator,
} from "../../../../utils/validators";


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

    // const route = new LoginRoute(form.value);
    // const result = await route.request();

    // if (result instanceof SessionModel) {
      // console.log("result après", result);
      // globalStore.value?.setSession(result);
      toast.success("Connexion réussie !");
      setTimeout(() => {
        router.push({ name: "/operators" });
      }, 2000);
      return;
    // }

    // if (result instanceof UnprocessableEntityApiError) {
    //   fieldsErrors.value.credential = result.data.credential ?? [];
    //   fieldsErrors.value.password = result.data.password ?? [];
    // } else if (
    //   result instanceof UnauthorizedApiError ||
    //   result instanceof ApiError
    // ) {
    //   alert.value = {
    //     type: "danger",
    //     id: faker.string.uuid(),
    //     title: "Erreur",
    //     message: result.message,
    //   };
    // }
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
			<VCol cols="12">
						<VLabel class="mb-2" for="email">Email</VLabel>
						<VTextField
						id="email"
						v-model="form.credential"
						placeholder="Example@gmail.com"
						:rules="[requiredValidator]"
						variant="filled"
						density="compact"
						prepend-inner-icon="fa fa-envelope"
						persistent-placeholder
						:error-messages="fieldsErrors.credential"
					/>
			</VCol>
			<VCol cols="12">
				  <VLabel class="mb-2" for="password">Mot de passe</VLabel>
					<VTextField
          id="password"
          v-model="form.password"
          placeholder="********"
          :rules="[requiredValidator]"
          variant="filled"
          density="compact"
					:append-inner-icon="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"
          persistent-placeholder
					:type="showPassword ? 'text' : 'password'"
					@click:append-inner="togglePasswordVisibility"
					:error-messages="fieldsErrors.password"
        />
			</VCol>
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
          type="submit"
          color="success"
				  :loading="loading"
          class="flex justify-center items-center gap-8"
        >
          Connexion
        </VBtn>
		</div>
	</form>
</template>
