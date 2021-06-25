import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-visitor-log',
  templateUrl: './visitor-log.page.html',
  styleUrls: ['./visitor-log.page.scss'],
})
export class VisitorLogPage implements OnInit {
  logItems: any;
  private database: SQLiteObject;
  constructor(private sqlite: SQLite) { }

  ngOnInit() {
    this.sqlite.create({
      name: 'visitorDatabase.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * from Visitors', []).then((r) => {
        this.logItems = [];
        if (r.rows.length > 0) {
          for (let i = 0; i < r.rows.length; i++) {
            this.logItems.push(r.rows.item(i));
          }
        }
        console.log(this.logItems);
      }, (error) => {
      });
    }, (error) => {
      console.log(error);
      alert('ERROR: ' + JSON.stringify(error.err));
    });
  }


}
