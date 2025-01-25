/**
 * Sorts an array of todo objects into a grouped structure based on their status.
 *
 * @param {Array} todos - An array of todo objects, each containing a `status` property.
 * @returns {Object} An object where each key is a unique status, and the value is an array of todos with that status.
 */
export const sortTodos = (todos) => {
  // Initialize an empty object to store todos grouped by their status
  const sortedData = {};

  // Iterate through each todo item in the input array
  todos.map((todo) => {
    // If the status key doesn't exist in sortedData, initialize it with an empty array
    if (!sortedData[todo.status]) {
      sortedData[todo.status] = [];
    }

    // Add the current todo item to the array corresponding to its status
    sortedData[todo.status].push(todo);
  });

  // Return the grouped todos object
  return sortedData;
};
