let imagecontainer = document.querySelector('#image-container');

fetch('http://localhost:3000/images')
  .then(response => response.json())
  .then(function (images) {
    images.forEach(image => {
      let newimg = document.createElement('img');
      newimg.setAttribute('src',image.src);
      let newcaption = document.createElement('p');
      newcaption.innerHTML = image.caption;

      imagecontainer.appendChild(newimg);
      imagecontainer.appendChild(newcaption);
    });
  });
