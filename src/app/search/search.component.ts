import { Component, OnInit } from '@angular/core';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filters: string[] = [];
  selectedFilters: string[] = [];

  articles: string[] = ['1', '2', '3'];

  filtersConfig: string[] = [];

  constructor(private sourceService: SourceService) { }

  ngOnInit(): void {
    this.sourceService.getFilters().subscribe((resp: any) =>
      {
          this.filtersConfig = resp['filters'];
          this.initFilters();
      }
    );
  }

  initFilters() {
    let me = this;
    this.filtersConfig.forEach(function (value: string) {
        me.filters.push(value);
    });

    this.filters = this.filters.filter((item, i, ar) => ar.indexOf(item) === i); //make it unique
    this.filters.sort(); // make it sorted
  }

  toggleFilter(filter: string): void {
    if(this.selectedFilters.includes(filter)) {
        this.selectedFilters = this.selectedFilters.filter(item => item !== filter)
        this.filters.push(filter);
    } else {
        this.filters = this.filters.filter(item => item !== filter)
        this.selectedFilters.push(filter);
    }
    this.filters = this.filters.filter((item, i, ar) => ar.indexOf(item) === i); //make it unique
    this.filters.sort(); // make it sorted

    this.selectedFilters = this.selectedFilters.filter((item, i, ar) => ar.indexOf(item) === i); //make it unique
    this.selectedFilters.sort(); // make it sorted
  }

  onKey(event: any): void {
    alert(event.target.value);
  }

}
