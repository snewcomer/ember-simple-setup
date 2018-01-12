import Component from '@ember/component';
import { or, notEmpty, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
import { set, getProperties, get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { task } from 'ember-concurrency';
import EmberUploader from 'ember-uploader';
import ENV from 'ember-simple-setup/config/environment';

const { Uploader } = EmberUploader;

export default Component.extend({
  /**
   * triggered on drag by drag service
   * 
   * @property active
   * @default false
   */
  active: false,
  additionalUploadData: {
    upload_preset: `${ENV.cloudinary.uploadPreset}`
  },
  attributeBindings: ['style'],
  classNames: ['image-drop'],
  classNameBindings: [
    'active:image-drop--active',
    'circle:image-drop--circle',
    'isDraggingOnApp:image-drop--drag',
    'hasImage:has-image',
    'large:is-large'
  ],
  droppedImage: null,
  files: null,
  helpText: 'photo.drop',
  originalImage: null,
  multiple: false,
  url: `https://api.cloudinary.com/v1_1/${ENV.cloudinary.cloud}/image/upload`,

  appDragState: service('dragState'),
  emberAppNotice: service(),

  hasDroppedImage: notEmpty('droppedImage'),
  hasImage: or('hasDroppedImage', 'hasOriginalImage'),
  hasOriginalImage: notEmpty('originalImage'),
  /**
   * handled by drop-zone component separately from active flag
   * general use case service property isDragging for any type of file drop
   * 
   * @property isDraggingOnApp
   */
  isDraggingOnApp: alias('appDragState.isDragging'),

  style: computed('droppedImage', 'originalImage', function() {
    let backgroundStyle = '';
    let { droppedImage, originalImage } = getProperties(this, 'droppedImage', 'originalImage');

    if (droppedImage) {
      backgroundStyle = `background-image: url(${droppedImage});`;
    } else if (originalImage) {
      backgroundStyle = `background-image: url(${originalImage});`;
    }

    return htmlSafe(backgroundStyle);
  }),

  dragEnded() {
    this.dragLeave();
    get(this, 'appDragState').leaving();
  },

  dragLeave() {
    set(this, 'active', false);
  },

  dragOver() {
    set(this, 'active', true);
  },

  drop(event) {
    event.preventDefault();
    let { dataTransfer: { files, getData } } = event;
    if (files && files.length > 0) {
      return this._handleFileDrop(files[0]);
    }

    let imageUrl = getData('URL');
    if (!imageUrl) {
      return;
    }

    this._convertImgToBase64URL(imageUrl, (base64) => {
      set(this, 'droppedImage', base64);
    });
  },

  /**
   * Triggers when the file selection for the rendered file input changes
   * @param {[File]} files An array of files selected by the user.
   * Since the `multiple` setting is set to false, only 1 file
   * is in the array.
   */
  filesDidChange(files) {
    if (!isEmpty(files)) {
      this._handleFileDrop(files[0]);
    }
  },

  _convertImgToBase64URL(url, callback, outputFormat) {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  },

  _handleFileDrop(file) {
    if (file == null) {
      return;
    }

    set(this, 'file', file);
    let reader = new FileReader();
    reader.onload = (e) => {
      let fileToUpload = e.target.result;
      run(() => {
        set(this, 'droppedImage', fileToUpload);
        this.dragEnded();
        get(this, '_performUpload').perform(file);
      });
    };

    reader.readAsDataURL(file);
  },

  _handleUploadDone({ public_id }) {
    get(this, 'onDone')(public_id);
  },

  _performUpload: task(function * (file) {
    try {
      let params = getProperties(this, 'url');
      let uploader = Uploader.create(params);

      let additionalUploadData = get(this, 'additionalUploadData');

      yield uploader.upload(file, additionalUploadData)
        .then((event) => this._handleUploadDone(event));
    } catch (e) {
      set(this, 'droppedImage', null);
      const appNotice = get(this, 'emberAppNotice');
      appNotice.handleNotification({ message: 'oops', level: 'error' });
    }
  }).maxConcurrency(3).enqueue(),
});
