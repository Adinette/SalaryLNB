
// Assuming formRef is a Vue ref to your form, you should define or import it appropriately.
// Example definition (replace with your actual form reference):

type FormRef = {
    validate: () => Promise<{ valid: boolean }>
};

export async function formIsValid(formRef?: FormRef): Promise<boolean> {
    if (!formRef) return false;
    const result = await formRef.validate();
    return result?.valid ?? false;
}
