# Poligram

TODO: Fill out description


## Setup:

### Setting Up Heroku:

0. Sign up for heroku at heroku.com 
1. Install heroku by running `npm install -g heroku`
2. Go through the following steps:
    ```
    heroku login -i
    heroku create
    git push heroku master
    ```
3. Navigate to your newly-created heroku site!
      
4. Configure requirements.txt with all requirements needed to run your app.
    These requirements are all the packages needed to run your program:
      ```
      pip freeze > requirements.txt
      ```
5. Configure Procfile with the command needed to run your app.
      ```
      web: python app.py
      ```
6. When you are ready to deploy your app, first push your changes to git using `git push`. Then run `git push heroku master` to deploy your app to heroku. If that does not work, try using the command, `git push heroku HEAD:master`.

7. If you are still having issues, you may use `heroku logs --tail` to see what's wrong.

### Setting up React     
1. Install your stuff! 
```
`npm install`    
`pip install flask-socketio`    
`pip install eventlet`    
`npm install -g webpack`    
`npm install --save-dev webpack`    
`npm install socket.io-client --save`    
`npm install --save react-router-dom`
`npm install --save-dev style-loader css-loader`
`npm install react-google-login`
```

:warning: :warning: :warning: If you see any error messages, make sure you use `sudo pip` or `sudo npm`. If it says "pip cannot be found", run `which pip` and use `sudo [path to pip from which pip] install` :warning: :warning: :warning:    
  
### Getting PSQL to work with Python  
  
1. Update yum: `sudo yum update`, and enter yes to all prompts    
2. Upgrade pip: `sudo /usr/local/bin/pip install --upgrade pip`  
3. Get psycopg2: `sudo /usr/local/bin/pip install psycopg2-binary`    
4. Get SQLAlchemy: `sudo /usr/local/bin/pip install Flask-SQLAlchemy==2.1`    
  
### Setting up PSQL  
  
1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`    
    Enter yes to all prompts.    
2. Initialize PSQL database: `sudo service postgresql initdb`    
3. Start PSQL: `sudo service postgresql start`    
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER`    
    :warning: :warning: :warning: If you get an error saying "could not change directory", that's okay! It worked! :warning: :warning: :warning:    
5. Make a new database: `sudo -u postgres createdb $USER`    
        :warning: :warning: :warning: If you get an error saying "could not change directory", that's okay! It worked! :warning: :warning: :warning:    
6. Make sure your user shows up:    
    a) `psql`    
    b) `\du` look for ec2-user as a user    
    c) `\l` look for ec2-user as a database    
7. Make a new user:    
    a) `psql` (if you already quit out of psql)    
    #### REPLACE THE [VALUES] IN THIS COMMAND! Type this with a new (short) unique password.   
    b) I recommend 4-5 characters - it doesn't have to be very secure. Remember this password!  
        `create user [some_username_here] superuser password '[some_unique_new_password_here]';`    
    c) `\q` to quit out of sql    
8. Make a new file called `sql.env` and add `DATABASE_URL=postgresql://user:pass@localhost/postgres` in it, where user and pass are the username and password you created in 7b. 
  
### Enabling read/write from SQLAlchemy  
There's a special file that you need to enable your db admin password to work for:  
1. Open the file in vim: `sudo vim /var/lib/pgsql9/data/pg_hba.conf`
If that doesn't work: `sudo vim $(psql -c "show hba_file;" | grep pg_hba.conf)`  
2. Replace all values of `ident` with `md5` in Vim: `:%s/ident/md5/g`  
3. After changing those lines, run `sudo service postgresql restart`  
4. Ensure that `sql.env` has the username/password of the superuser you created!  

### Run your code!    
1. `npm run watch`. If prompted to install webpack-cli, type "yes"    
2. Go into the python interactive shell and run the following:
    a) `import models`
    b) `models.db.create_all()`
    c) `quit()`
3. In a new terminal, `sudo service postgresql start` to start PSQL
4. `python app.py`    
5. Preview Running Application (might have to clear your cache by doing a hard refresh)    

### Pushing to Heroku
After you create your heroku app, you will need to push the database to heroku:
1. Create a database on heroku `heroku addons:create heroku-postgresql:hobby-dev`
2. Wait until ready to use `heroku pg:wait`
3. Alter the database owner:
    a) `psql`
    b) `ALTER DATABASE Postgres OWNER TO user` [where user is the username created in Section: "Setting up PSQL", 7b]
4. Now push the database onto heroku, `heroku pg:push postgres DATABASE_URL`

### Unit Testing
1. In order to run unit tests, `coverage run -m --source=. unittest tests/*.py`
2. To see coverage report, preview the file `index.html` in the `htmlcov` folder.
3. When making changes, need to rerun, `coverage run -m --source=. unittest tests/*.py && coverage html`

##References:

quiz: https://www.studentnewsdaily.com/conservative-vs-liberal-beliefs/
