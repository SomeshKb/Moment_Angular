import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/models/Service.model';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.scss']
})
export class MomentListComponent implements OnInit {
  momentList = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = null
  displayedColumns: string[] = ['SrNo', 'title', 'Image', 'tags', 'Action'];
  queryParams = {
    page: 1,
    limit: 10
  }
  tableOptions = {
    totalItems: 0,
    pageSizeOptions: [10, 20, 100]
  }

  constructor(private httpService: HttpService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMomentList();
  }

  getMomentList() {
    let payload: Service = {
      queryParams: this.queryParams
    }
    this.httpService.apiGet('GET_MOMENTS', payload).subscribe((res: any) => {
      this.tableOptions.totalItems = res.data.totalCount;
      this.momentList = res.data.Data;
      this.dataSource = new MatTableDataSource<any>(this.momentList);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  onRowClicked(item) {
    console.log(item)
  }

  editMoment(element) {
    this.router.navigateByUrl('moment/edit/' + element._id);
  }


  deleteMoment(element) {
    this.dialog.closeAll();
    console.log(element)
    let payload: Service = {
      dynamicUrlParams: {
        id: element._id
      }
    }
    this.httpService.apiDelete('DELETE_MOMENTS', payload).subscribe(res => {
      this.getMomentList();
    }, err => {

    });
  }

  openDeleteMoment(content, element) {
    this.dialog.open(content, { data: element });
  }

  handlePageEvent(event) {
    console.log(event)
    this.queryParams = {
      limit: event.pageSize,
      page: event.pageIndex + 1
    }
    this.getMomentList();
  }

}
