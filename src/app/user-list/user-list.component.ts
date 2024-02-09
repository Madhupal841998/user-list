import { Component } from '@angular/core';

import { UserService } from '../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];
  loading: boolean = false;
  error: string = '';
  nameFilter: string = '';
  emailFilter: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.users = [];
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error fetching users. Please try again later.';
        this.loading = false;
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }


  get filteredUsers(): any[] {
    let filteredUsers = this.users;

    if (this.nameFilter) {
      filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }

    if (this.emailFilter) {
      filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(this.emailFilter.toLowerCase()));
    }

    return filteredUsers;
  }
}
