import { Injectable, OnDestroy } from "@angular/core";
import { User } from "src/app/models/User";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = "[user]";

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<User>(`/${environment.backendURL}/register`, {
        firstName,
        lastName,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`/${environment.backendURL}/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post<User>(`/${environment.backendURL}/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  getUserProfile() {
    return this.http
      .get<User>(`/${environment.backendURL}/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateUserProfile(firstName: string, lastName: string, email: string) {
    return this.http
      .put<User>(`/${environment.backendURL}/users/profile`, {
        firstName,
        lastName,
        email,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
