/**
* Template Name: Logis
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
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

window.aws_amplify.Auth.currentAuthenticatedUser()
          .then(user => {
              console.log(user.attributes.email); // This will log the email of the user
          })
          .catch(err => console.log(err));

var numberOfTagsSection1 = 1;
var numberOfTagsSection3 = 1;

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
   * Display the correct query section
   */
  var tagButton = document.getElementById('using-tags-button');
  var tagOfImageButton = document.getElementById('using-tag-of-image-button');
  var removeOrAddButton = document.getElementById('add-or-remove-tag-button');
  var tagOfImageSection = document.getElementById('query-using-image');
  var deleteImageButton = document.getElementById('delete-image-button')
  var addOrRemoveTagsSection = document.getElementById('add-or-remove-tags');
  var findImageBasedOnTagSection = document.getElementById('intro-to-query');
  var deleteImageSection = document.getElementById('delete-image-section');

  deleteImageButton.addEventListener('click', function() {
    //alert("Delete image button gets clicked");
    if (deleteImageSection.classList.contains('content-to-hide')) {
      deleteImageSection.classList.remove('content-to-hide');
      deleteImageSection.classList.add('content-to-show');
      deleteImageButton.textContent = "Collapse";
    } else {
      deleteImageSection.classList.remove('content-to-show');
      deleteImageSection.classList.add('content-to-hide');
      deleteImageButton.textContent = "Try out now";
    }
  });
  
  tagOfImageButton.addEventListener('click', function() {
    //alert("Tag of an image gets clicked");
    if (tagOfImageSection.classList.contains('content-to-hide')) {
      tagOfImageSection.classList.remove('content-to-hide');
      tagOfImageSection.classList.add('content-to-show');
      tagOfImageButton.textContent = "Collapse";
    } else {
      tagOfImageSection.classList.remove('content-to-show');
      tagOfImageSection.classList.add('content-to-hide');
      tagOfImageButton.textContent = "Try out now";
    }
  });

  removeOrAddButton.addEventListener('click', function() {
    //alert("Add or remove tags gets clicked");
    if (addOrRemoveTagsSection.classList.contains('content-to-hide')) {
      addOrRemoveTagsSection.classList.remove('content-to-hide');
      addOrRemoveTagsSection.classList.add('content-to-show');
      removeOrAddButton.textContent = "Collapse";
    } else {
      addOrRemoveTagsSection.classList.remove('content-to-show');
      addOrRemoveTagsSection.classList.add('content-to-hide');
      removeOrAddButton.textContent = "Try out now";
    }
  });

  tagButton.addEventListener('click', function() {
    // display the section of "Finding images based on tags and object count"
    //alert("Tags button gets clicked");
    if (findImageBasedOnTagSection.classList.contains('content-to-hide')) {
      findImageBasedOnTagSection.classList.remove('content-to-hide');
      findImageBasedOnTagSection.classList.add('content-to-show');
      tagButton.textContent = "Collapse";
    } else {
      findImageBasedOnTagSection.classList.remove('content-to-show');
      findImageBasedOnTagSection.classList.add('content-to-hide');
      tagButton.textContent = "Try out now";
    }
  });

  /**
   * 3.3.1 Plus button in Section: Query images using tag names
   */
  var plusButton = document.getElementById('plus-button');
  var sendQueryUsingTagButton = document.getElementById("query-using-tag-button");
  
  plusButton.addEventListener('click', function() {
    //alert("Plus button gets clicked");


    var div = document.createElement('DIV');
    var tagNameId = "tag" + numberOfTagsSection1;
    //console.log('tag '+ tagNameId);

    var tagCountId = "count" + numberOfTagsSection1;
    //console.log('count '+ tagCountId);

    div.innerHTML = `<div class="row">
     <input class="minus-button" type="button" value="-" onclick = "removeThisLine(this.parentNode)"/>
     <div class="col-md-6 form-group mt-3 mt-md-0"> 
      <input type="text" class="form-control" id="tag-name1" placeholder="Object name" required>
     </div>
     <div class="col-md-5 form-group mt-3 mt-md-0">
      <input type="number" min="1" max="20" class="form-control" value="1" id="tag-count1" placeholder="Count" required>
     </div>`;

    document.getElementById("query-using-tag-form").appendChild(div);
    document.getElementById("tag-name1").setAttribute("id", tagNameId);
    document.getElementById("tag-count1").setAttribute("id", tagCountId);
    //console.log('tag id just added: ' + numberOfTagsSection1);
    numberOfTagsSection1 += 1; 

  });

  sendQueryUsingTagButton.addEventListener('click', function(e) 
  {
    //alert("Send Query Using tags button gets clicked");
    e.preventDefault();
    var tagArray = [];
    let firstTag = document.getElementById("tag-name");
    let firstCount = document.getElementById("tag-count");

    // If the first line of tag and count wasn't deleted
    if ((firstTag !== null) && (firstCount !== null))
    {
      let firstObject = {
        objectName: firstTag.value, 
        objectCount: firstCount.value
      }
      console.log(firstObject.objectName + ' ' + firstObject.objectCount);
      tagArray.push(firstObject);
    } 

    // Loop through all available tags and get its value
    for (let i = 1; i < numberOfTagsSection1; i ++)
    {
      var tagNameId = "tag" + i;
      console.log('tag '+ tagNameId);
      var countId = "count" + i;
      console.log('count '+ countId);
      var tempTag = document.getElementById(tagNameId);
      var tempCount = document.getElementById(countId);
      if ((tempTag !== null) && (tempCount !== null))
      {
        var object = {
          objectName: tempTag.value,
          objectCount: tempCount.value
        }
        console.log(object.objectName + ' ' + object.objectCount);
        tagArray.push(object);
      }
    }

    var requestBody = { 
      objects: tagArray, 
      user_id: "testuserID"};

    requestBody = JSON.stringify(requestBody);
    const apiEndpoint = 'https://0y72ucqpl0.execute-api.us-east-1.amazonaws.com/find_images_by_tags';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    };
  
    // Sending the POST request
    fetch(apiEndpoint, requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('Status code: ' + response.status);
          alert('Your request has been sent successfully !!!');

          var reply = response.json();
          return reply;

        } else {
          console.log('Status code: ' + response.status);
          alert('Invalid Object name - Failed to send request');
        }
      })
      .then(data => {
        if (data !== undefined)
        {
          var responseString = "";
          for (const link of data.links)
          {
            console.log("link " + link);
            responseString += link + "\n";  
          }
          console.log("response string is  " + responseString);
          if (responseString === "")
          {
            document.getElementById("find-images-based-on-tags-response").value = "No images with the specified tag names were found";
          } else {
            document.getElementById("find-images-based-on-tags-response").value = responseString;
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  

  });

  /**
   * 3.3.2 Query images using tag names of an image
   */

  var uploadedImage = document.getElementById('image-path');
  var previewImage = document.getElementById('preview-image-3.3.2');
  var sendQueryButton = document.getElementById('send-image-query-button');

  uploadedImage.addEventListener('change', function() 
  {
    var image = uploadedImage.files[0];
    let outputHTML = `<div class="image">
    <img src="${URL.createObjectURL(image)}" alt="image">
    </div>`;
    previewImage.innerHTML = outputHTML;
  });

    /**
   * 3.3.2 Query images using tag names of an image: After sending query - WIP
   */
  sendQueryButton.addEventListener('click', function(e) 
  {
    //alert("send query 3.3.2 button gets clicked");
    e.preventDefault();
    var image = uploadedImage.files[0];
    // console.log("FIle name" + image.name + ". File URL " + URL.createObjectURL(image));
    if (image)
    {
      uploadImageToS3Part2(image);
    } else {
      alert("Please upload a valid image")
    }
  });


  /**
   * 3.3.3 When user clicks on plus button in Section: Addition or Removal of tags
   */
  var plusButton333 = document.getElementById('plus-button-3.3.3');
  var manualAdditionOrRemovalButton = document.getElementById("manual-remove-or-add-tags");
  plusButton333.addEventListener('click', function() {
    //alert("Plus button gets clicked");

    var tagNameId = "tag" + numberOfTagsSection3;
    console.log('tag '+ tagNameId);

    var tagCountId = "count" + numberOfTagsSection3;
    console.log('count '+ tagCountId);

    var div = document.createElement('DIV');
    div.innerHTML = `<div class="row">
        <input class="minus-button" type="button" value="-" onclick="removeThisLinePart333(this.parentNode)"/>
      <div class="col-md-6 form-group mt-3 mt-md-0">
        <input type="text" name="tag-name" class="form-control" id="tag-name3" placeholder="Tag name" required>
      </div>
      <div class="col-md-5 form-group mt-3 mt-md-0">
        <input type="number" min="1" max="20" class="form-control" value="1" name="tag-count" id="tag-count3" placeholder="Count" required>
      </div>
    </div>`;

    document.getElementById("remove-or-add-tags-form").appendChild(div);
    document.getElementById("tag-name3").setAttribute("id", tagNameId);
    document.getElementById("tag-count3").setAttribute("id", tagCountId);
    console.log('tag id just added: ' + numberOfTagsSection3);
    numberOfTagsSection3 += 1; 

  });

  manualAdditionOrRemovalButton.addEventListener('click', function(e) 
  {
    alert("Manual addition or removal button gets clicked");
    e.preventDefault();
    var tagArray = [];
    let firstTag = document.getElementById("tag-name-part3");
    let firstCount = document.getElementById("tag-count-part3");
    if ((firstTag !== null) && (firstCount !== null))
    {
      let firstObject = {
        tag: firstTag.value, 
        count: firstCount.value
      }
      console.log(firstObject.tag + ' ' + firstObject.count);
      tagArray.push(firstObject);
    }


    // reading from second tag
    for (let i = 1; i < numberOfTagsSection3; i ++)
    {
      var tagNameId = "tag" + i;
      console.log('tag '+ tagNameId);
      var countId = "count" + i;
      console.log('count '+ countId);
      var tempTag = document.getElementById(tagNameId);
      var tempCount = document.getElementById(countId);
      if ((tempTag !== null) && (tempCount !== null))
      {
        var object = {
          tag: tempTag.value,
          count: tempCount.value
        }
        console.log(object.tag + ' ' + object.count);
        tagArray.push(object);
      }

    }

    var url = document.getElementById("image-S3-url-3.3.3").value;
    console.log("image url " + url);
    var removeOrAdd = document.getElementById("myDropdown").value;
    console.log("type is " + removeOrAdd);
    var requestBody = {
      imageurl: url,
      type: removeOrAdd,
      tags: tagArray,
      user_id: "testuserID"
    }

    // Options for the fetch request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    };
    const apiEndpoint = 'https://0y72ucqpl0.execute-api.us-east-1.amazonaws.com/manually_change_tags';

    // Sending the POST request
    fetch(apiEndpoint, requestOptions)
      .then(response => {
        if (response.ok) {
          console.log('Status code: ' + response.status);
          console.log('Status code ' + response.json().statusCode);
          alert('Your request has been sent sucessfully !!!');
          return response.json();
          
        } else {
          console.log('Status code: ' + response.status);
          alert('Invalid request - Failed to send request');
        }
      })
      .then(data => {
        if (data !== undefined)
        {
          console.log("Status code from server" + data.outcome);
          alert("Result from your request: " + data.outcome);
        }
      })
      .catch(error => {
        console.log('Error: ' + error);

      });


  });


  /**
   * 3.3.4 When user submit a request to delete an image
   */
  var deleteImageButtonPart3 = document.getElementById("delete-image-button-by-url");
  deleteImageButtonPart3.addEventListener('click', function(e) {
    e.preventDefault();
    var imageLink = document.getElementById("image-S3-url-part3").value;
    if (imageLink === "")
    {
      alert("Please enter a valid URL");
    } else {
      // Start sending POST request
      var requestBody = {
        user_id: "testuserID",
        deleteUrl: imageLink
      }
      console.log('imageLink is' + imageLink);

      // Options for the fetch request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      };
  
      const apiEndpoint = 'https://0y72ucqpl0.execute-api.us-east-1.amazonaws.com/delete_image';
  
      // Sending the POST request
      fetch(apiEndpoint, requestOptions)
        .then(response => {
          if (response.ok) {
            console.log('Status code: ' + response.status);
            alert('Your request was sent sucessfully !!!');
            return response.json();
          } else {
            console.log('Status code: ' + response.status);
            alert('Invalid URL - Failed to send request');
          }
        })
        .then(data => {
          if (data !== undefined)
          {
            console.log("Result from server" + data.outcome);
            alert("Result from your request: " + data.outcome);
          }
        })
        .catch(error => {
          console.log('Error: ' + error);
  
          // Handle any errors
        });    
    }
  });
});

/**
 * 3.3.1 When user clicks on minus button in Section: Query images using tag names
 */
function removeThisLine(div)
{
  console.log("number of tags after remove the line is " + numberOfTagsSection1);
  alert("Minus button gets clicked");
  document.getElementById("query-using-tag-form").removeChild(div.parentNode);
}

/**
 * 3.3.2 Function responsible for querying images using an image
 */
function uploadImageToS3Part2(file) 
{
  const apiEndpoint = 'https://0y72ucqpl0.execute-api.us-east-1.amazonaws.com/find_images_based_on_image';

  // Convert the image data to base64 using File Reader
  var reader = new FileReader();
  var base64Image = null;

  reader.onload = function () 
  {
    console.log(reader.result);
    //base64Image = event.target.result;
    //console.log('base64 data using event.target.result ' + base64Image);

    base64Image = (reader.result).split(',')[1].replace('image','');
    console.log('base64 data using reader.result ' + base64Image);

    var requestData = {
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
          alert('Your image request has been sent successfully !!!');

          var reply = response.json();
          return reply;

        } else {
          console.log('Status code: ' + response.status);
          alert('Failed to send request ');
        }
      })
      .then(data => {
        var responseString = "";
        for (const link of data.links)
        {
          console.log("link " + link);
          responseString += link + "\n";  
        }
        console.log("response string is  " + responseString);
        if (responseString === "")
        {
          document.getElementById("query-using-image-response").value = "No images matched with your query was found!";
        } else {
          document.getElementById("query-using-image-response").value = responseString;
        }

      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error: ' + error);
      });
    };
    reader.onerror = function (error) 
    {
      console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
};

/**
* 3.3.3 When user clicks on minus button in Section: Addition or Removal of tags
*/
  function removeThisLinePart333(div)
  {
    alert("Minus button gets clicked");
    document.getElementById("remove-or-add-tags-form").removeChild(div.parentNode);
  }



