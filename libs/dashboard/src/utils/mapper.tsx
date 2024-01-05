export const userCourseListMapper = (usersData: any) => {
  const ref = ['Referee', 'Instructor', 'Moderator'];
  const sts = ['Registered', 'Pending', 'Delivered	'];

  if (usersData) {
    const userList = usersData?.map((user: any, index: number) => {
      const { user_id, firstName, lastName, email } = user;
      return {
        orderNo: user_id,
        date: `June 3${index + 2}, 202${index + 2}`,
        userName: `${firstName} ${lastName}`,
        price: index * 2,
        number: index + 1,
        course: ref[index] || ref[1],
        status: sts[index] || sts[1],
      };
    });
    return userList;
  }
};

export const courseListMapper = (usersData: any) => {
  if (usersData) {
    const userList = usersData?.map((user: any, index: number) => {
      const { Title, Author, lastModifiedDate, Description, Thumbnail } = user;
      return {
        id: index + 1,
        title: Title,
        author: Author,
        date: lastModifiedDate,
        description: Description,
        image: Thumbnail?.Url,
        lessons: 20,
        weeks: 6,
      };
    });
    return userList;
  }
};
