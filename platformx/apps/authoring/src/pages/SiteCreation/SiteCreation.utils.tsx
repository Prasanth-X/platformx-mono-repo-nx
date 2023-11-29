export const handleTextChange = (control, form, setForm) => (event) => {
  control.value = event.target.value;
  setForm([...form]);
};
