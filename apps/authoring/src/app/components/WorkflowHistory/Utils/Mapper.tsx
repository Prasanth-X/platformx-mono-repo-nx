export const historyListMapper = (items: any[]) => {
  return items.map((item) => {
    return {
      date: item?.last_modification_date,
      owner: item?.user_name,
      user: item?.created_by,
      action: item?.task_status,
      summary: item?.document_type,
      role: item?.role,
    };
  });
};
