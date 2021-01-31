import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  momentList = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = null
  displayedColumns: string[] = ['title','tags','titlse'];

  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
    this.getEventList();
  }
  
  getEventList() {
    this.httpService.apiGet('GET_MOMENTS').subscribe((res:any)=>{
      this.momentList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.momentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  onRowClicked(item){
    console.log(item)
  }

}
