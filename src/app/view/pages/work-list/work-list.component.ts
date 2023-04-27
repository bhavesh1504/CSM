import { AfterViewInit, Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { WorkListElement } from '../../../core/work-list/models/work-list.model';
import { WorkListService } from '../../../core/work-list/service/work-list.service';
import { AddEditWorkListComponent } from './add-edit-work-list/add-edit-work-list.component';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class WorkListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: WorkListElement[];
  displayedColumns: string[] = ['leadId','Name', 'mobileNo', 'email', 'dob','leadStage', 'action'];
  dataSource = new MatTableDataSource<WorkListElement>(this.ELEMENT_DATA);

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];
  loadingFN:boolean=false

  constructor(private authService:AuthService,private router: Router, private workListService: WorkListService,public dialog: MatDialog) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {

        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }

    }
    this.getAllDataTable();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    //this.router.navigate(['/home/worklist/add-edit-work-list'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditWorkListComponent, {
      width: '1200px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      // if(this.roleArray.includes("Credit")){
      //   this.workListService.getLeadApproval(this.userDetailAtoBValue.id).subscribe(res => {
      //     this.dataSource.data = res as WorkListElement[]
      //   });
      // }else{
        this.workListService.getWorkList(this.userDetailAtoBValue.id).subscribe(res => {
          this.dataSource.data = res.data as WorkListElement[]
        });
      // }
      this.loadingFN=false;
    }, 500);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
   // this.router.navigateByUrl('home/worklist/add-edit-work-list', { skipLocationChange: true });

    const dialogRef = this.dialog.open(AddEditWorkListComponent, {
      width: '1200px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.dataSource.data=[]
    // this.loadingFN=true;
    this.getAllDataTable();
  }
}
