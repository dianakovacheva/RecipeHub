  // Get user's first and last name
  get userFullName(): string {
    const userFistName = this.userService.user?.firstName;
    const userLastName = this.userService.user?.lastName;
    return `${userFistName} ${userLastName}` || "";
  // Specify the position of the snack bar
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  // Different snack bar notifications
  greetUser() {
    this.notifyInfo(`Welcome, ${this.userFullName}`);
  }

  goodbyeUser() {
    this.notifyInfo("Logged out successfully");
  }

  notifySuccess(message: string) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["snackbar-success"],
      duration: 3000,
    });
  }

  notifyError(message: string) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ["snackbar-error"],
      duration: 3000,
    });
  }

  notifyInfo(message: string) {
    this.snackBar.open(message, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
