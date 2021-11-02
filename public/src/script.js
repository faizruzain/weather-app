// alert("Hello! I am an alert box!!")
console.log("script loaded")

// I'm using jQuery here :)
const form = $("form");
const input = $("input");
const content = $("#content");
const loading = $(".lds-ellipsis")
loading.hide()

form.submit((e) => {
  e.preventDefault()

  content.hide()
  loading.show()

  const location = input.val()

  if (location.length === 0) {
    loading.hide()
    content.text("No input!")
    content.show()

  } else {
    fetch(`http://localhost:3000/?address=${location}`).then((response) => {
      response.json().then((data) => {
        loading.hide()
        data.error ? content.text(data.error) : content.text(data.data)
        content.show()
        
      })
    })
  }

})
