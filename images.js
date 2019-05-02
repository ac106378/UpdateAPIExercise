fetch('http://localhost:3000/images')
  .then(response => response.json())
  .then(function (images) {
    const fragment = document.getElementById('image-template');
    images.forEach(image => {
      console.log(image);
      // create template instance
      const instance = document.importNode(fragment.content, true);
      // populate template
      instance.querySelector('.image').src = image.src;
      instance.querySelector('.image').alt = image.caption;
      instance.querySelector('.caption').innerHTML = image.caption;
      // append template
      document.getElementById('image-container').appendChild(instance);
    });
  });
