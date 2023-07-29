  // Get user's first and last name
  get userFullName(): string {
    const userFistName = this.userService.user?.firstName;
    const userLastName = this.userService.user?.lastName;
    return `${userFistName} ${userLastName}` || "";
