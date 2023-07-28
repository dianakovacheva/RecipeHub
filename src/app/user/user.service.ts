import { Injectable, OnDestroy } from "@angular/core";
import { User } from "src/app/models/User";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { environment } from "../../environments/environment";

const backendURL = environment.backendURL;

@Injectable({
  providedIn: "root",
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = "user";

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || "";
      this.user$$.next(JSON.parse(lsUser));
    } catch (error) {
      this.user$$.next(undefined);
    }

    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY); // Remove the user data from local storage when the user is null (logged out)
      }
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(
        `${backendURL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<User>(
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

  getProfile() {
    return this.http
      .get<User>(`${backendURL}/users/profile`, {
        withCredentials: true,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(firstName: string, lastName: string, email: string) {
    return this.http
      .put<User>(
        `${backendURL}/users/profile`,
        { firstName, lastName, email },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post<User>(
        `${backendURL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
