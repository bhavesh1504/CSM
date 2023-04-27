import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ManualAssignmentElement } from 'src/app/core/manual-assignment/models/manual-assignment.model';
import { ManualAssignmentService } from 'src/app/core/manual-assignment/service/manual-assignment.service';
import { AddEditManualAssignmentComponent } from './add-edit-manual-assignment/add-edit-manual-assignment.component';

@Component({
  selector: 'app-manual-assignment',
  templateUrl: './manual-assignment.component.html',
  styleUrls: ['./manual-assignment.component.css']
})
export class ManualAssignmentComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ELEMENT_DATA!: ManualAssignmentElement[];
  displayedColumns: string[] = ['leadId','firstName', 'lastName', 'mobileNo', 'email','leadStage','action'];
  dataSource = new MatTableDataSource<ManualAssignmentElement>(this.ELEMENT_DATA);

  userDetails:any;
  userDetailAtoBValue:any='';
  roleArray:any=[];

  AllAssignToManuualDetails:any[]=[]

  constructor(private router: Router, private manualAssignmentService: ManualAssignmentService, public dialog: MatDialog) {
    this.userDetails=sessionStorage.getItem('UserDetails')
      this.userDetailAtoBValue=JSON.parse(atob(this.userDetails));
      for(let i=0;i<this.userDetailAtoBValue.role.length;i++)
      {
        this.roleArray.push(this.userDetailAtoBValue.role[i].roleName)
      }
  }

  ngOnInit() {

    this.getAllDataTable();
  }
  editViewAction(id: any, type: any) {
    let navigationExtras = {
      queryParams: { 'id': id,'type':type },
      fragment: 'anchor',
      skipLocationChange: true
    };
    // this.router.navigate(['/home/manual-assignment/add-edit-manual-assignment'], navigationExtras);

    const dialogRef = this.dialog.open(AddEditManualAssignmentComponent, {
      width: '1200px',
      data: {id: id, type: type},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllAssignToManuualDetails=[]
    });
  }
  getAllDataTable() {
    setTimeout(() => {
      this.manualAssignmentService.getLeadList().subscribe(res => {

        let filtrerArray=res.data
        for(let i=0;i<filtrerArray.length;i++){
          if(filtrerArray[i].assignTo?.id == this.userDetailAtoBValue?.id){
            this.AllAssignToManuualDetails.push(filtrerArray[i])
          }
        }

        this.dataSource.data = this.AllAssignToManuualDetails as ManualAssignmentElement[]
      });
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
    //this.router.navigateByUrl('home/manual-assignment/add-edit-manual-assignment', { skipLocationChange: true });
    const dialogRef = this.dialog.open(AddEditManualAssignmentComponent, {
      width: '700px',
      data: {name: 'Fin', animal: 'Tech'},
      autoFocus: false,
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllDataTable();
      this.AllAssignToManuualDetails=[]
    });
  }

ngOnDestroy(){
    this.dataSource.disconnect()
  }

  reloadData()
  {
    this.AllAssignToManuualDetails=[];
    // this.dataSource.disconnect()
    this.getAllDataTable();
  }
}
