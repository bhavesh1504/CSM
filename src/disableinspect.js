(function () {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && event.keyCode === 73)) {
        event.preventDefault();
      }
    });
  
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
    console.table = function () {};
  })();
  