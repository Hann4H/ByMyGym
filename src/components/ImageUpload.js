import React, { Component } from 'react';
import FileUploadWithPreview from 'file-upload-with-preview'
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css'

export default class ImageUpload extends Component {
    render() {
        return (
        <div id="gallery">
            <input type="file"></input>
        </div>
        /*
        <div class="custom-file-container" data-upload-id="myUniqueUploadId">
            <label>dodaj zdjęcia<a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">wyczyść</a></label>
            <label class="custom-file-container__custom-file" >
                <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="*" multiple aria-label="Choose File"/>
                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                <span class="custom-file-container__custom-file__custom-file-control"></span>
            </label>
            <div class="custom-file-container__image-preview"></div>
        </div>
        */
        )
    }
}