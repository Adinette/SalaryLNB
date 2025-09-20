<script setup lang="ts">
import BaseBlock from "@/components/BaseBlock.vue";
import { ref } from "vue";
import { ApiError, UnprocessableEntityApiError } from "@/api/errors/index";
import { appRoutes } from "@/router/routes";
import { faker } from "@faker-js/faker";
import { useUserActions } from "../composables/use_user_actions";

const logger = createLogger("userAddView");

const form = ref<UserCreateInterface>({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  is_active: true,
});

const fieldsErrors = ref<{ [key in keyof UserCreateInterface]: string[] }>({
  first_name: [],
  last_name: [],
  email: [],
  phone: [],
  is_active: [],
});

const alert = ref<AppAlertInterface | null>(null);

const actionDescription = "Ajouter un utilisateur";
const actionText = "Ajouter";
const actionIcon = "ri-add-fill";

const { processing: loading, createUser: create } = useUserActions();

const setUnprocessableEntityApiErrors = (
  apiError: UnprocessableEntityApiError
) => {
  fieldsErrors.value.first_name = apiError.data.first_name || [];
  fieldsErrors.value.last_name = apiError.data.last_name || [];
  fieldsErrors.value.email = apiError.data.email || [];
  fieldsErrors.value.phone = apiError.data.phone || [];
  fieldsErrors.value.is_active = apiError.data.is_active || [];
};

const createUser = async (user: UserCreateInterface) => {
  logger.info("Création de l'utilisateur", user);
  const result = await create(user);
  if (result instanceof ApiError) {
    if (result instanceof UnprocessableEntityApiError) {
      setUnprocessableEntityApiErrors(result);
    } else {
      toast.error(result.message);
      logger.error("Erreur lors de la création de l'utilisateur", result);
    }
    alert.value = {
      type: "danger",
      id: faker.string.uuid(),
      title: "Erreur",
      message: result.message,
    };
    return false;
  }
  logger.info("Utilisateur créé avec succès", result);
  return true;
};

const resetForm = () => {
  fieldsErrors.value = {
    first_name: [],
    last_name: [],
    email: [],
    phone: [],
    is_active: [],
  };
  alert.value = null;
};

const onSubmit = async () => {
  resetForm();
  logger.info("Soumission du formulaire d'utilisateur", form.value);
  const result = await createUser({
    ...form.value,
    phone: AppUtils.removeWhitespace(form.value.phone),
  });
  if (result) {
    // Navigation temporaire - à remplacer quand les routes seront configurées
    router.push("/users");
  }
};
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
        @submit="onSubmit"
      />
    </div>
  </BaseBlock>
</template>
