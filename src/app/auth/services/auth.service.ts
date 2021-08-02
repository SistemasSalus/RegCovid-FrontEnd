import { Injectable } from '@angular/core';
import { Observable, config, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tokens } from '../models/tokens';
import { Node } from '../models/node';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/user';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  login(user: { nodeId: string; userName: string; password: string }): Observable<boolean> {
    const url = `${environment.ENDPOINTS.API_URL}/auth/login/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>(url, user, httpOptions).pipe(
      tap((tokens) => this.doLoginUser(user.userName, tokens)),
      mapTo(true),
      catchError((error) => {
        // alert(JSON.stringify(error.error));
        return of(false);
      }),
    );
  }

  private loadUser(response: any) {
    const decodeToken = this.jwtHelper.decodeToken(response.jwt);
    const user = new UserModel(decodeToken);
    this.sessionService.setUser(user);
  }

  logout() {
    this.doLogoutUser();
    // const url = `${environment.ENDPOINTS.API_URL}/auth/logout`;
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };
    // return this.http
    //   .post<any>(
    //     url,
    //     {
    //       refreshToken: this.getRefreshToken(),
    //     },
    //     httpOptions,
    //   )
    //   .pipe(
    //     tap(() => this.doLogoutUser()),
    //     mapTo(true),
    //     catchError((error) => {
    //       alert(JSON.stringify(error.error));
    //       return of(false);
    //     }),
    //   );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getNodes(): Observable<Node[]> {
    const url = `${environment.ENDPOINTS.API_URL}/NodesRegcovid/`;
    return this.http
      .get<any>(url)
      .pipe(map((nodes: any[]) => nodes.map((node) => Node.buildFromJson(node))));
  }

  refreshToken() {
    return this.http
      .post<any>(`${environment.ENDPOINTS.API_URL}/auth/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.jwt);
        }),
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
    this.loadUser(tokens);
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
