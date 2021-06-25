import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx/';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  visitorForm: FormGroup;
  curDate: Date;
  database: SQLiteObject;


  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sqlite: SQLite,
    private toastCtrl: ToastController) {
    this.visitorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      personToVisit: ['', [Validators.required]],
      timeOfEntry: ['', [Validators.required]],
      timeOfExit: ['', [Validators.required]],
      visitType: ['', [Validators.required]]
    });
    const connn = this.createDB();

  }

  createDB() {

    return new Promise((_resolve, _reject) => {
      this.sqlite.create({
        name: 'visitorDatabase.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('create table Visitors (name VARCHAR(32), email VARCHAR(32), personToVisit VARCHAR(32),'
            + ' timeOfEntry VARCHAR(32), timeOfExit VARCHAR(32),visitType VARCHAR(32),)', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
  }

  ngOnInit() {
    this.curDate = new Date();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  register() {
    console.log(this.visitorForm.value);
    this.sqlite.create({
      name: 'visitorDatabase.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO Visitors VALUES (?, ?, ?, ?, ?, ?)',
        [this.visitorForm.value.name,
        this.visitorForm.value.email,
        this.visitorForm.value.personToVisit,
        this.visitorForm.value.timeOfEntry,
        this.visitorForm.value.timeOfExit,
        this.visitorForm.value.visitType]).then((data) => {
          this.presentToast('Registration done successfully');
          this.visitorForm.reset();
        }, (error) => {
          console.log(error);
          alert('ERROR: ' + JSON.stringify(error.err));
        });
    }, (error) => {
      console.log(error);
      alert('ERROR: ' + JSON.stringify(error.err));
    });
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss().then(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
