import '@testing-library/cypress/add-commands';

export const setCurrentUser = (id: string, reload?: boolean) => {
  window.localStorage.setItem('current_test_user_id', id);
  if (reload) {
    window.location.reload();
  }
};
