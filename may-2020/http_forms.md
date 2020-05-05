## Http and Forms

- communication stateless in nature, each request from client to server such that it contains all info necessary to understand the request.

HTTP, mechanism via which data is requested and provided over WWW.
HTTP default traffic port : 80

The requested resource can be anything that can be transferred as if it were a file.

- the server response

```code
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Mon, 08 Jan 2018 10:29:45 GMT

<!doctype html>
... the rest of the document
```

- status code starting with 2 indicate the request succeeded, the ones starting with 4 indicate something is wrong, 404 is resource could not be found. status_code starting with 5 indicate some error happened in the server and the request is not to blame.

### Browsers and HTTP

```html
<form method="GET" action="example/message.html">
  <p>Name: <input type="text" name="name" /></p>
  <p>Message: <textarea name="message"></textarea></p>
  <p><button type="submit">Send</button></p>
</form>
```

- on clicking send button, the form is submitted, i.e the content of its field is packed into an HTTP request and the browser navigates to the result of that request.

- when the method is GET or omitted the information is added to the end of the action url- query parameter. the `?` indicates end of the path and the begining of the query, `&` is used to separate the pairs
- some characters in the query are escaped- URL encoding
- JS has encodeURIComponent and decodeURIComponent for the above
- if the method is changed to `POST` then the data is sent in the request body

### Fetch

- interface in JS to make HTTP request

```javascript
fetch('example/data.txt').then(response =>
  console.log(response.status, response.headers.get('Content-Type'))
);
// 200 text/plain
```

- fetch returns a Promise that resolves to a Response object.
- headers are a Map like case insensitive object.
- the frist arg of the fetch i.e the url, if it does not begin with a `http:`, is treated as relative, if it starts with `/` it replaces the current path, else current path +`/`+ url is used.
- the response object has to be further resolved to get the actual text/json content

### HTTP sandboxing

- browsers protect us by disallowing scripts to make HTTP requests to other domains

### Form fields

```html
<input type="text" name="name" />
<textarea>This can be multine</textarea>
<select>
  <option>A</option>
  <option>B</option>
</select>

<!-- type in input tag can take other values like password, number, radio, checkbox etc. -->
```

- all form fields have focus, this can be done via JS, document.activeElement contains the element currently in focus, use HTML attribute autofocus to focus on entering a page, use disabled attribute(truthy by presence) to disable the element, once disabled is cannot be focused or clicked, use tabindex to manipulate focus on tab, use tabindex=-1 to avoid focus on tab

### Whole form

- a button with `type=submit` will submit the form, use `event.prevenDefault` to stop this. (intercepting submit events)

- file fields

```html
<input typ="file" />
<script>
  let input = document.querySelector('input');
  input.addEventListener('change', () => {
    if (input.files.length > 0) {
      let file = input.files[0];
      console.log(file.name);
      if (file.type) console.log(file.type);
    }
  });
</script>
```
