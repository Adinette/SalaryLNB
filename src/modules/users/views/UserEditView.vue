<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref, onMounted, computed } from "vue";
import { faker } from "@faker-js/faker";
import { useUserActions } from "../composables/use_user_actions";
import { UserModel } from "../models/user_model";
import type { UserCreateInterface } from "../interfaces";
import type { AppAlertInterface } from "../../../interfaces/AppAlertInterface";
import { useInitializedUserStore, type UserStore } from "../store";
import { useRoute } from "vue-router";
import { createLogger } from "../../../utils/logger";
import { ApiError, UnprocessableEntityApiError } from "../../../api/errors";
import { AppUtils } from "../../../utils";
import { toast } from "../../../utils/toast";
import router from "../../../router";

const logger = createLogger("userEditView");

const route = useRoute();
const isEditMode = computed(() => !!(route.params as { id?: string }).id);
console.log("isEditMode", isEditMode.value, route.params);

const userStore = ref<UserStore | null>(null);
const form = ref<UserCreateInterface>({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});

const fieldsErrors = ref<{ [key in keyof UserCreateInterface]: string[] }>({
  first_name: [],
  last_name: [],
  email: [],
  phone: [],
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Modifier l'utilisateur";
const actionText = "Enregistrer";
const actionIcon = "ri-save-line";

const { processing: loading } = useUserActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.first_name = apiError.data.first_name || [];
  fieldsErrors.value.last_name = apiError.data.last_name || [];
  fieldsErrors.value.email = apiError.data.email || [];
  fieldsErrors.value.phone = apiError.data.phone || [];
};

const fetchUser = async () => {
  if (!userStore.value) {
    userStore.value = await useInitializedUserStore();
  }
  const id = (route.params as any).id as string;
  await userStore.value.getUsers();
  const result = await userStore.value.findUser(id);
  if (result instanceof ApiError) {
    alert.value = {
      type: "danger",
      id: faker.string.uuid(),
      title: "Erreur",
      message: result.message,
    };
    return;
  }
  const currentUser = new UserModel(result.interface);
  form.value = {
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    phone: currentUser.phone
      ? AppUtils.formatPhoneWithSpaces(currentUser.phone)
      : "",
  };
};

const updateUser = async (user: UserCreateInterface) => {
  if (!userStore.value) {
    logger.error("Le store utilisateur n'est pas initialisé.");
    return false;
  }
  logger.info("Mise à jour de l'utilisateur", user);
  const result = await userStore.value.updateUser(
    (route.params as any).id as string,
    user
  );
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la mise à jour de l'utilisateur", result);
    }
    alert.value = {
      type: "danger",
      id: faker.string.uuid(),
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Utilisateur mis à jour avec succès", result);
  toast.success("Utilisateur modifié avec succès !");
  return true;
};

const resetForm = () => {
  fieldsErrors.value = {
    first_name: [],
    last_name: [],
    email: [],
    phone: [],
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  if (!userStore.value) {
    logger.error("Le store utilisateur n'est pas initialisé.");
    return;
  }
  logger.info("Soumission du formulaire d'utilisateur", form.value);
  const result = await updateUser({
    ...form.value,
    phone: AppUtils.removeWhitespace(form.value.phone),
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/users");
  }
};

onMounted(async () => {
  await fetchUser();
});
</script>

<template>
  <BaseBlock
    :title="actionDescription"
    class="block-mode-loading-oneui"
    :class="{ 'block-mode-loading': loading }"
  >
    <div class="pb-8">
      <UserForm
        v-model="form"
        :loading="loading"
        :errors="fieldsErrors"
        :alert="alert"
        :action-description="actionDescription"
        :action-text="actionText"
        :action-icon="actionIcon"
        :is-edit-mode="isEditMode"
        @submit="onSubmit"
      />
    </div>
  </BaseBlock>
</template>
