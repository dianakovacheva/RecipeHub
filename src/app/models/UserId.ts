export interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRecipesList: string[];
  userCommentsList: string[];
  userSavedRecipes: string[];
  created_at: string;
  updatedAt: string;
  __v: number;
}
