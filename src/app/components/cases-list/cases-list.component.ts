/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

} */

import { Case } from './../../shared/case';
import { List } from './../../shared/list';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px'})),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CasesListComponent implements OnInit {

  isTableExpanded = false;
  CaseData: any = [];
  dataSource!: MatTableDataSource<Case>;
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  displayedColumns: string[] = [ 'mcasetype', 'sr_number', 'mcaseno', 'mcaseyr','appearing_for','client_name','referrer_name','corum','action'];
  @ViewChild(MatSort)
  sort!: MatSort;
  searchKey!: string;
  ListData : any = [];
  userName = "";
  @ViewChild(MatTableExporterDirective)
  matTableExporter!: MatTableExporterDirective;
  importAsXlsx(){
  this.matTableExporter.exportTable('xlsx', {fileName:'CaseList', sheet: 'Cases'});
  }

  constructor(private caseApi: ApiService, private _router: Router) {

    this.caseApi.getUserName().subscribe(data => {this.userName = data.toString();},
     error => this._router.navigate(['/users-login'])
    )
    this.caseApi.GetCases().subscribe(data => {
      this.CaseData = data;
      this.dataSource = new MatTableDataSource<Case>(this.CaseData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteCase(index: number, e: { _id: any; }){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.caseApi.DeleteCase(e._id).subscribe()
    }
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  
  applyFilter(){
    this.dataSource.filter = this.searchKey;
  }

  sendCauseList(){
      this.caseApi.getCauseList().subscribe(data => {
        this.ListData = data;
        if(this.ListData!="")
          window.alert("CauseList Mail sent!");
        else
          window.alert("List not yet available for today!! Try again later");
      }) 
    }

    toggleTableRows() {
      this.isTableExpanded = !this.isTableExpanded;
        this.ListData.data.forEach((row: any) => {
        row.isExpanded = this.isTableExpanded;
      })
    }
  
}
