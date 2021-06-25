import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LatestNewsService } from 'src/app/latest-news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.page.html',
  styleUrls: ['./latest-news.page.scss'],
})
export class LatestNewsPage implements OnInit {
  loading: any;
  newsArticles: any;
  data: any;
  constructor(private loadingCtrl: LoadingController,
    private newsService: LatestNewsService,private toastCtrl: ToastController) { }

  async showLoader() {
    this.dismissLoader();
    this.loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loader'
    });

    await this.loading.present();
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

  dismissLoader(){
    if(this.loading){
      this.loading.dismiss();
      this.loading='';
    }
  }

  async errorToaster(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async ngOnInit() {
    try {
      await this.showLoader();
      this.data = await this.newsService.getLatestNews();
      console.log(this.data.articles);
      this.newsArticles = this.data.articles;
      this.dismissLoader();
    } catch (err) {
      this.dismissLoader();
      if (err.status === 400 || err.status === 401) {
        this.errorToaster('Something went wrong!');
      }
    }
  }

}
