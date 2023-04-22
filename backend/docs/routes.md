## API Routes

<hr>
###### Admin Routes
<hr>

@method
: POST

@route
: /users/admin/login

@access
: public

@desc
: Login as Admin

<hr>
###### Class Routes
<hr>

@method
: POST

@route
: /class/register

@access
: protected (admin)

@desc
: Register a class

<hr>

@method
: DELETE

@route
: /class/delete

@access
: protected (admin)

@desc
: Delete a class

<hr>

@method
: GET

@route
: /class/all

@access
: protected (admin)

@desc
: Get all classes

<hr>

@method
: GET

@route
: /class/mine

@access
: protected (faculty)

@desc
: Get class belonging to a faculty

<hr>
###### Faculty Routes
<hr>

@method
: POST

@route
: /users/faculty/register

@access
: protected (admin)

@desc
: Register a faculty

<hr>

@method
: POST

@route
: /users/faculty/login

@access
: public

@desc
: Login as faculty

<hr>

@method
: DELETE

@route
: /users/faculty/delete

@access
: protected (admin)

@desc
: Delete a faculty

<hr>

@method
: GET

@route
: /users/faculty/me

@access
: protected (faculty)

@desc
: Get faculty information

<hr>

@method
: GET

@route
: /users/faculty/all

@access
: protected (admin)

@desc
: Get all faculty

<hr>
###### Student Routes
<hr>

@method
: POST

@route
: /users/student/register

@access
: protected (admin)

@desc
: Register a student

<hr>

