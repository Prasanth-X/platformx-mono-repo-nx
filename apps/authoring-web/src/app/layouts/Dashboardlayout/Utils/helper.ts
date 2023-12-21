
export const removeSearchLocalStorage = () => {
    localStorage.removeItem('contentType');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('searchTags');
    localStorage.removeItem('author');
  };
  