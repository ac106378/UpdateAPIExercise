document.getElementById('submitbutton').onclick = function () {
  var Minio = require('minio');
  var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'XL0C68A145F7CXOCNCNV',
    secretKey: 'LEG5i2ms1bKIhNDFQa4z+mqLMGa8vQUMtG29aINU'
  });
  let newImage = document.getElementById('uploadfile').files[0];
  minioClient.putObject('images', newImage.name, newImage.toString(), function (err, etag) {
    return console.log(err, etag);
  });
};

$('#formObject').submit(function (event) {
    let jsonData = $(this).serializeArray();
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/images',
        data: JSON.stringify(jsonData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){console.log(data);},
        failure: function(errMsg) {
            alert(errMsg);
        }
    });

    event.preventDefault();
  });


