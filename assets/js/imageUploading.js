/**
  <!-- =======================================================
  * Author: GROUP 4 - FIT5225 - S1 - 2023
  * Last Modified: 7th of June 2023
  ======================================================== -->
*/

const Amplify = window.aws_amplify.Amplify;
const Auth = window.aws_amplify.Auth;

//Cognito configuration with Amplify library
Amplify.configure({
  Auth: {
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',

      socialProviders: ['facebook', 'google'], 

      // Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_p50z8WNR8',

      // Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: '2did5vrg8u38kks2qaaisvfs40',

      // Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,

      // Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
      authenticationFlowType: 'USER_PASSWORD_AUTH',

      oauth: {
        // Domain name
        domain: 'https://fit5225-a2-group4.auth.us-east-1.amazoncognito.com',

        // Authorized scopes
        scope: ['openid', 'profile'],

        // Callback URL
        redirectSignIn: 'https://yyun0002.github.io/index.html',

        // Sign out URL
        redirectSignOut: 'https://fit5225-a2-group4.auth.us-east-1.amazoncognito.com/login?client_id=2did5vrg8u38kks2qaaisvfs40&response_type=code&scope=openid+profile&redirect_uri=https://yyun0002.github.io/index.html',

        // 'code' for Authorization code grant, 
        responseType: 'code',
        
        // optional, for Cognito hosted ui specified options
        options: {
          // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
          AdvancedSecurityDataCollectionFlag : true
        }
      },
      // Federated with Facebook
      federationTarget: 'COGNITO_USER_AND_IDENTITY_POOLS',
      facebookAppId: '{1638423173344135}',
      
      // Federated with Google
      googleClientId: '228222147438-aelc81lp4dmg16m9d3a82fkik2tl3a76.apps.googleusercontent.com',
    }
  });


//Fetch authenticated user's email
window.aws_amplify.Auth.currentAuthenticatedUser()
  .then(user => {
    console.log(user.attributes.email); // This will log the email of the user
  })
  .catch(err => console.log(err));


document.addEventListener('DOMContentLoaded', () => 
{
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Uploading Images in Object Detection page
   */
  var uploadButton = document.getElementById('upload-button');
  var uploadedImage = document.getElementById('uploaded-image');
  var previewImage = document.getElementById('preview-image');

  uploadButton.addEventListener('click', function(e) {
    // add functionality to send POST request to API gateway in here
    e.preventDefault();
    var image = uploadedImage.files[0];
    // console.log("FIle name" + image.name + ". File URL " + URL.createObjectURL(image));
    if (image)
    {
      uploadImageToS3(image);
    } else {
      alert("Please upload a valid image")
    }
  }); 

  uploadedImage.addEventListener('change', function() {
    var image = uploadedImage.files[0];
    let outputHTML = `<div class="image">
    <img src="${URL.createObjectURL(image)}" alt="image" id="image-uploaded">
    </div>`;
    previewImage.innerHTML = outputHTML;
  });

});

// Assuming you have already configured the AWS SDK with valid credentials

  /**
   * Uploading Images in Object Detection page
   */
// 3.2 Function to handle image upload -- WIP
function uploadImageToS3(file) {

  const filename = file.name;
  const apiEndpoint = 'https://0y72ucqpl0.execute-api.us-east-1.amazonaws.com/upload';

    // Convert the image data to base64 using File Reader
    var reader = new FileReader();
    var base64Image = null;

    reader.onload = function () {
      console.log(reader.result);
      //base64Image = event.target.result;
      //console.log('base64 data using event.target.result ' + base64Image);

      base64Image = (reader.result).split(',')[1].replace('image','');
      //console.log('base64 data using reader.result ' + base64Image);

      var requestData = {
        filename: filename,
        image: base64Image,
        user_id: 'testuserID' 
      };
    
        // Options for the fetch request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      };
    
      // Sending the POST request
      fetch(apiEndpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Status code: ' + response.status);
            alert('Your image has been uploaded sucessfully !!!');
            
          } else {
            console.log('Status code: ' + response.status);
            alert('Failed to upload image ');
          }
        })
        .catch(error => {
          alert('Error: ' + error);
    
          // Handle any errors
        });
    
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
};




