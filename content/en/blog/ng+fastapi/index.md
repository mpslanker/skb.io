---
title: "Angular + FastAPI with OpenAPI Generator"
linkTitle: "Angular + FastAPI with OpenAPI Generator"
date: 2023-02-21T09:29:35-07:00
author: Matthew Slanker ([@mpslanker](https://twitter.com/mpslanker))
draft: false
---

{{< notice warning >}}
This is an incomplete article.  I will be adding to it as I go.
{{< /notice >}}

Since this was a fairly arduous learning experience I am documenting this for later reference.
I am sure I have done many things wrong during this process and comments regarding better ways to do are always appreciated.


## Getting Started with FastAPI
Since the frontend doesn't do anything without a backend or mocking up data (which I don't know how to do... yet).  I started looking at the backend first.

> To help avoid breaking anything I am using pipenv to maintain my virtual environment for this part of the project.

``` shell
# Starting from the project directory (for me that was ${HOME}/code/my_api)

# Install FastAPI with all option to get up and running fast
pipenv install "fastapi[all]"

# I also installed mangum so this can be later used with AWS API Gateway
pipenv install mangum 

```

Running the commands above will generate a Pipfile that looks like so:

``` toml 
# ${HOME}/code/my_api/Pipfile (complete)

[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
fastapi = {extras = ["all"], version = "*"}
mangum = "*"

[dev-packages]

[requires]
python_version = "3.11"
```

Once that is done we can start writing our `main.py`.  The full code can be found [here](https://skb.io/code/my_api/main.py).

The first thing we need to do is import FastAPI and Mangum so that we can start working with them.

``` python
# ${HOME}/code/my_api/main.py (fragment)

from fastapi import FastAPI
from mangum import Mangum
```
Continuing on we create an instance of FastAPI in the variable `app`

``` python
# ${HOME}/code/my_api/main.py (fragment)
...

# Instantiate a FastAPI object
app = FastAPI()

...
```
we use this `app` variable in two ways.
* First, we use it to tie a path and function together
* Second, we pass this app to Mangum so we can create the handler *(the handler is not used in this write up)*
``` python
# ${HOME}/code/my_api/main.py (fragment)
...

# here the app object is used as a decorator
@app.get("/")
async def root(name: str="World"):
    return {"greeting": f"Hello, {name}!"}

# we pass the app to Mangum for use with AWS Gateway
handler = Mangum(app)
```

Save the file and run it with `pipenv run uvicorn main:app --reload`.

Then open a new terminal window and we can test it with `curl` (+ `jq` if you want pretty output).

``` shell
curl -sSfL 'http://localhost:8000'
# Outputs: {"greeting", "Hello, World!"}

curl -sSfL 'http://localhost:8000?name=Matthew'
# Outputs: {"greeting", "Hello, Matthew!"}
```

> Will be returning to this code to make updates.  So leave this server **running** as we will be hitting this root (`/`) endpoing as well as `/docs` and `/openapi.json`

## Getting Started with Angular

This was a lot of trial and error.  I know practically nothing about Angular so there was a lot to learn.
I will do my best to call out where I hit brick walls along the way.

Open a 3rd (new) terminal window.  This Angular application will reside in a project directory adjacent to the my_app.
``` shell
# Starting from the code directory (for me that was ${HOME}/code)

# Install the Angular-CLI
npm i -g  @angular/cli

# Install the OpenAPI Generator CLI
npm i -g @openapitools/openapi-generator-cli -D

# Create your angular app and switch to the newly create my_app dirctory
ng new my_app && cd my_app
```

Alright, now we have a freshly baked Angular app, we should start it and make sure it loads.
You can do this with `ng serve`.  

This will tie up this terminal so get ready to open yet another one.
However, before that we can test this in our browser.
By default this page is served at [http://localhost:4200](http://localhost:4200) and should look like this:

![](/img/new-ng-app.png)

## Editing the Start Project

We should start by talking about that massive amount stuff that `ng new my_app` created on your behalf.  Here is a directory list

``` shell
# Generated from ${HOME}/code/my_app using:
# tree -L 3 -I 'node_modules'
.
├── README.md
├── angular.json # <---------------- Small change made here for CORS
├── node_modules #(not expanded)
├── package-lock.json
├── package.json #<----------------- Add the generator script here
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html #<--- This is where all the HTML goes
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts # <---- This is where you define logic
│   │   └── app.module.ts # <------- This is where app settings goes
│   ├── assets
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

Let's wipe out this demo page and make it our own.  

* Open `src/app/app.component.html` in your favorite editor.
* Highlight ***everything***.
* Press the delete key.
* Now add the following:

``` html
<h1>{{ title }}</h1>

Hello, Angular!
```
When you save the page should automatically refresh and you will be greeting with our much prettier version:
![](/img/first-ng-change.png)

{{< notice info >}}
This doesn't belong here yet but I wrote it to make sure I don't forget to call it out.
{{< /notice >}}
## Cross-Origin Resource Sharing (CORS)
Since our API is running on [http://localhost:8000](http://localhost:8000) and our WebApp is running [http://localhost:4200](http://localhost:4200), we will bump into a confusing CORS error.  Both FastAPI and Angular seek to prevent CORS by default and has to be change on both sides.  We shall start with Angular since we are already here.

### Angular

### FastAPI