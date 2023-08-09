import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  BehaviorSubject,
  Subscription,
  catchError,
  tap,
  throwError,
} from "rxjs";
import { environment } from "../../environments/environment";
import { UserId } from "../models/UserId";
import { Recipe } from "../models/Recipe";
import { Comment } from "./../models/Comment";

const backendURL = environment.backendURL;

@Injectable({
  providedIn: "root",
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserId | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: UserId | undefined;
  USER_KEY = "user";

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || "";
      this.user$$.next(JSON.parse(lsUser));
    } catch (error) {
      this.user$$.next(undefined);
    }

    this.subscription = this.user$$.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY);
      }
    });
  }

  // Register User
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserId>(
        `${backendURL}/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          rePassword,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // Login User
  login(email: string, password: string) {
    return this.http
      .post<UserId>(
        `${backendURL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // Get User Profile
  getProfile() {
    this.http
      .get<UserId>(`${backendURL}/user/profile`, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          this.user$$.next(user);
        },
        error: (err) => {
          console.log(err);
          this.user$$.next(undefined);
        },
      });
  }

  // Update User Profile
  updateProfile(firstName: string, lastName: string, email: string) {
    return this.http
      .put<UserId>(
        `${backendURL}/user/profile`,
        { firstName, lastName, email },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // Logout User
  logout() {
    return this.http
      .post<void>(
        `${backendURL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  // Get User Recipes List
  getUserRecipesList() {
    return this.http.get<Recipe[]>(`${backendURL}/user/recipes`, {
      withCredentials: true,
    });
  }

  // Get User Saved Recipes List
  getUserSavedRecipesList() {
    return this.http.get<Recipe[]>(`${backendURL}/user/saved-recipes`, {
      withCredentials: true,
    });
  }

  // Get User Comments List
  getUserCommentsList() {
    return this.http.get<Comment[]>(`${backendURL}/user/comments`, {
      withCredentials: true,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
