<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { requiredValidator } from "../../../utils/validators";
import UserActivateRoute from "../apis/user-activate_route";
import { ApiError } from "../../../api/errors";
import router from "../../../router";
import type { ActivateInterface } from "../interfaces/activate_interface";

const route = useRoute();
const showPassword = ref(false);
const loading = ref(false);

// Les données nécessaires pour l'activation
const formData = ref({
  token: "",
  password: "",
  confirmPassword: "",
});

// Récupérer le token dans l'URL au chargement
onMounted(() => {
  if (route.query.token) {
    formData.value.token = route.query.token as string;
  }
});

// Validateur personnalisé pour la confirmation
const confirmPasswordValidator = (val: string) => {
  return val === formData.value.password || "Les mots de passe ne correspondent pas";
};

async function onSubmit() {
  if (formData.value.password !== formData.value.confirmPassword) return;
  
  loading.value = true;
  
  // Préparation des données pour l'API
  const payload: ActivateInterface = {
    token: formData.value.token,
    password: formData.value.password
  };

  const routeApi = new UserActivateRoute(payload);
  const result = await routeApi.request();

  if (result instanceof ApiError) {
    // Afficher une alerte d'erreur (ex: token expiré)
    console.error(result.message);
  } else {
    // Succès ! Redirection vers le login
    router.push({ name: 'authentication-login', query: { activated: 'true' } });
  }
  
  loading.value = false;
}
</script>

<template>
  <VForm @submit.prevent="onSubmit" ref="formRef">
    <VCol cols="12">
      <VLabel class="mb-2">Nouveau mot de passe</VLabel>
      <VTextField
        v-model="formData.password"
        :type="showPassword ? 'text' : 'password'"
        :rules="[requiredValidator]"
        placeholder="********"
        variant="filled"
        density="compact"
      />
    </VCol>

    <VCol cols="12">
      <VLabel class="mb-2">Confirmer le mot de passe</VLabel>
      <VTextField
        v-model="formData.confirmPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="[requiredValidator, confirmPasswordValidator]"
        placeholder="********"
        variant="filled"
        density="compact"
      />
    </VCol>

    <VBtn type="submit" color="success" block :loading="loading">
      Activer mon compte
    </VBtn>
  </VForm>
</template>