## My Web Application (Title)

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application shows you real-time occupancy data for Costco stores
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Jquery
	
## Content
 Top level of project folder: 
├── .gitignore                     # Git ignore file
├── .vs                            # vs
├── .vscode                        # Folder for the live server settings port
├── jquery_plugins                 # Folder for plugins like the jquery star-rating feature
└── README.md                      # README file

It has the following subfolders and files:
├── .git                           # Folder for git repo
├── web                            # Folder for folders with coded files
    ├── employee                   # Folder for employee authorized pages
        /headcount.html            # Headcount updater
        /main.html                 # Main page for employees
        /reviews.html              # Reviews
        /stats.html                # Stats
        /storefront.html           # Storefront page for all stores
        /stores.html               # Store list
    ├── home                       # Folder for all of the unauthorized pages
        /index.html                # Landing HTML file, this is what users see when you come to url
        /employee-login.html       # Employee login page
        /member-login.html         # Member login page
        /more-info.html            # Costco covid-related information
    ├── member                     # Folder for costco member authorized pages
        /feedback.html             # Feedback form
        /main.html                 # Main page for members
        /reviews.html              # Reviews
        /stats.html                # Stats
        /storefront.html           # Storefront page for all stores
        /stores.html               # Store list
    └── outdated-pages             # Folder for unused or obsolete files
├── images                         # Folder for images
    /back_arrow.png                # App's back button
    /costco.jpg                    # Picture used for index.html (landing page)
    /covid1.jpg                    # Picture used for more-info.html
    /covid2.jpg                    # Picture used for more-info.html
    /covid3.jpg                    # Picture used for more-info.html
    /covid4.jpg                    # Picture used for more-info.html
    /covid5.jpg                    # Picture used for more-info.html
    /down_arrow.png                # Icon used for headcount changes
    /store_burnaby_storefront.png  # Picture used for the storefront page
    /store_downtown_storefront.png # Picture used for the storefront page
    /store_richmond_storefront.png # Picture used for the storefront page
    /up_arrow.png                  # Icon used for headcount changes
├── scripts                        # Folder for scripts
    /back.js                       # Back feature to return to the page you've last visited
    /employee-login.js             # Employee login
    /feedback.js                   # Feedback form that sends data to Cloud Firestore
    /firebase-api-crowdmapp.js     # Our app's api for Cloud Firestore
    /headcount.js                  # Sends data to Cloud Firestore
    /hello.js                      # Says your name in the main page
    /logout.js                     # Logs you out from your current session
    /member-login.js               # Member login
    /reviews.js                    # Reviews
    /stats.js                      # Statistics
    /storefront.js                 # Storefronts for all locations
    /stores.js                     # Takes headcount data from Cloud Firestore
    └── outdated-scripts           # Folder for unused or obsolete files
├── styles                         # Folder for stylesheets
    /all-pages.css                 # Styles every page
    /employee-login.css            # Styles specifically for employee-login.html
    /employee-main.css             # Styles specifically for employee's main.html
    /feedback.css                  # Styles specifically for feedback.html
    /headcount.css                 # Styles specifically for headcount.html
    /index.css                     # Styles specifically for index.html
    /member-login.css              # Styles specifically for member-login.html
    /member-main.css               # Styles specifically for member's main.html
    /more-info.css                 # Styles specifically for more-info.html
    /reviews.css                   # Styles specifically for reviews.html
    /stats.css                     # Styles specifically for stats.html
    /storefront.css                # Styles specifically for storefront.html
    /stores.css                    # Styles specifically for stores.html
    └── outdated-scripts           # Folder for unused or obsolete files
Firebase hosting files:               
├── .firebase                      # firebase
├── .firebase.json                 # firebase json
├── .firebaserc                    # firebaserc
├── firestore.rules                # firestore rules
├── storage.rules                  # storage rules
└── firestore.indexes.json         # firestore indexes json
