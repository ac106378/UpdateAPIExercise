class UploadFormTemplate extends HTMLElement {
  connectedCallback () {
    let form = document.createElement('form');
    let legend = document.createElement('h1');
    legend.innerHTML = 'New Image Upload';
    form.appendChild(legend);
    let label = document.createElement('label');
    label.innerHTML = 'Caption';
    form.appendChild(label);
    let caption = document.createElement('input');
    caption.type = 'text';
    caption.name = 'caption';
    form.appendChild(caption);
    form.appendChild(document.createElement('br'));
    let file = document.createElement('input');
    file.type = 'file';
    file.id = 'uploadfile';
    form.appendChild(file);
    form.appendChild(document.createElement('br'));
    let submit = document.createElement('button');
    submit.type = 'submit';
    submit.value = 'Submit';
    submit.id = 'submitbutton';
    submit.innerHTML = 'Submit';
    form.appendChild(submit);
    this.appendChild(form);
  }
}

customElements.define('upload-form-template', UploadFormTemplate);

document.getElementById('submitbutton').onclick = function () {
  let s3Client = new AWS.S3({
    endpoint: 'http://127.0.0.1:9000',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    accessKeyId: 'C66JSQNB1SS7B1M71RLH',
    secretAccessKey: 'pRSc4XKJlux+zXuMrw4+j7MndurKmqqREvm3jRiK'
  });
  let newImage = document.getElementById('uploadfile').files[0];
  s3Client.putObject({
    Bucket: 'images',
    Key: newImage.name,
    Body: newImage,
    ContentLength: newImage.size,
    ContentType: newImage.type
  }, function (err, data) {
    console.log(err, data);
  });
};

$('form').submit(function (event) {
  let jsonData = $(this).serializeArray()[0];
  let jsonData2 = {
    'id': jsonData['id'],
    'src': `http://localhost:9000/images/${document.getElementById('uploadfile').files[0].name}`,
    'caption': jsonData['value']
  };
  console.log(jsonData2);
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/images',
    data: JSON.stringify(jsonData2),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) { console.log(data); },
    failure: function (errMsg) {
      alert(errMsg);
    }
  });
  event.preventDefault();
});
