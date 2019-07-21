import { Component } from '@angular/core';
import { RecognitionService } from '../services/recognition.service';
import { ImageResult } from '../models/image-result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  imageListBase64 = [];
  processedResults: ImageResult[] = [];
  results: ImageResult[] = [];
  uploadedFiles = [];

  constructor(private recognitionService: RecognitionService) { }

  onUploadChange(evt: any) {

    // this.files = evt.target.files;
    let files = evt.target.files;

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      let reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(files[i]);
      this.uploadedFiles.push(files[i])
    }

  }

  handleReaderLoaded(e) {
    this.imageListBase64.push(btoa(e.target.result));
  }

  onSubmit() {

    let imageData = {
      images: this.imageListBase64
    }

    // console.log(imageData);

    this.recognitionService.uploadImage(imageData).subscribe((data: ImageResult[]) => {
      console.log(data);
      this.results = data;
      this.changeToImage();
      this.imageListBase64 = [];
    });

    // this.recognitionService.test().subscribe(data => {
    //   console.log(data);
    // });

  }

  changeToImage() {

    this.results.forEach(result => {

      let img: ImageResult = new ImageResult();
      img.image = 'data:image/png;base64,' + result.image;
      img.text = result.text;
      this.processedResults.push(img);

    });
  }

  clear() {
    this.processedResults = [];
  }
}
