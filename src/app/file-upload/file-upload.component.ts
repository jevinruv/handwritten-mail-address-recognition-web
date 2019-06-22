import { Component, OnInit } from '@angular/core';
import { RecognitionService } from '../services/recognition.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(private recognitionService: RecognitionService) { }

  ngOnInit() {
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles() {
    return this.uploader.queue.map((fileItem) => {
      return fileItem._file;
    });
  }

  upload() {
    let files = this.getFiles();
    console.log(files);
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file', file);
      console.log(file);
      console.log(formData);
      requests.push(this.recognitionService.uploadImage(formData));
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

  }
}
