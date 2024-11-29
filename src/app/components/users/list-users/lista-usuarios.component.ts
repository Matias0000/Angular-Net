import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }


  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();  
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: user  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();  
      }
    });
  }


  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { id: id }  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          this.loadUsers();  
        });
      }
    });
  }
}
