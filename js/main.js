var tabLinks = new Array();
var contentDivs = new Array();
var message = "";

function init() {
      var tabListItems = document.getElementById('tabs').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
        i++;
      }

      if (window.location.hash.substr(1) != "") {
      loadTab();
      }

      writeOut();
    }

function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }
      return false;
    }

function showWorkInfo(obj) {
  if (obj.className == "plus icon") {
    obj.className = "minus icon";
    var contributions = obj.getElementsByClassName("contribution");
    contributions[0].style.display = "block";
  } else {
    obj.className = "plus icon";
    var contributions = obj.getElementsByClassName("contribution");
    contributions[0].style.display = "none";
  }

  return false;
}

function loadTab() {
  var selectedId = window.location.hash.substr(1);

  // if (selectedId == "" || selectedId != ("work" || "contact" || "aboute"))
  //   { selectedId = "about"; }

  for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }
  return false;
}

function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }

function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }

function validateForm() {
    var eValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nValid = /^[a-zA-Z ]*$/;
    var sValid = /^[a-zA-Z0-9 ]*$/;
    var eCount = 0;

    errorMsgReset();

    email = document.getElementById("formEmail").value;
    name = document.getElementById("formName").value;
    subject = document.getElementById("formSubject").value;

    if (eValid.test(email) != true || email == "") { errorMessage("email"); ++eCount; }
    if (nValid.test(name) != true || name == "") { errorMessage("name"); ++eCount; }
    if (sValid.test(subject) != true || subject == "") { errorMessage("subject"); ++eCount; }

    if (eCount > 0) { return false; }
}

function errorMessage( type ) {
  var error = document.getElementById("errorBox");
  var errorMsg = document.getElementById("errorMsg");

  switch(type) {
    case "name":
      document.getElementById("formName").style.border="1px solid red"
      message = message + "<li>You can only place letters in the name field</li>";
      break;
    case "subject":
      document.getElementById("formSubject").style.border="1px solid red"
      message = message + "<li>You can only place letters and numbers in the subject field</li>";
      break;
    case "email":
      document.getElementById("formEmail").style.border="1px solid red"
      message = message + "<li>Email must be formatted like so: you@email.com</li>";
      break;
    default:
      message = "";
      break;
  }

  error.style.display="block";

  errorMsg.innerHTML=message;
}

function errorMsgReset() {
  var error = document.getElementById("errorBox");

  message = "";

  error.style.display="none";

  document.getElementById("formName").style.border="1px solid black"
  document.getElementById("formSubject").style.border="1px solid black"
  document.getElementById("formEmail").style.border="1px solid black"

}

function writeOut() {
    var i = 0;
    var txt = 'Hello Friend...';
    var speed = 50;

  if (i < txt.length) {
    document.getElementById("header").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}