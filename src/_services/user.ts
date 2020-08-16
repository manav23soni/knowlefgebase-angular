import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private httpService: HttpService
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.httpService.post(`user/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user) {
        // return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        // return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
    }

    delete(id: string) {
        // return this.http.delete(`${environment.apiUrl}/users/${id}`)
        //     .pipe(map(x => {
        //         // auto logout if the logged in user deleted their own record
        //         if (id == this.userValue.id) {
        //             this.logout();
        //         }
        //         return x;
        //     }));
    }

    saveCategory(data) {
        return this.httpService.post(`user/login`, data)
        .pipe(map(category => {
            return category;
        }));
    }

    getCategory() {
        return this.httpService.post(`user/login`)
        .pipe(map(category => {
            return category;
        }));
    }
}