export function nestArrayCateGories(data, parentIds = '') {
  return data.reduce((r, e) => {
    const obj = Object.assign({}, e);
    if (parentIds == e.parent_id) {
      const children = nestArrayCateGories(data, e.id);
      if (children.length) {
        obj.children = children;
      }
      r.push(obj);
    }
    return r;
  }, []);
}
