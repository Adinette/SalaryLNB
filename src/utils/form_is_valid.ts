import { VForm } from "vuetify/components/VForm";

export async function formIsValid(formRef: Ref<VForm>): Promise<boolean> {
	const formIsValid = await formRef.value?.validate();

	return formIsValid?.valid || false;
}
