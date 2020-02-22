export const removeAlert = (state, idToRemove) => state.filter(alert => alert.id !== idToRemove);
