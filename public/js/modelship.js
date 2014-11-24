var samples = {};
samples['meetup_api_sample'] = {
  "apiName"         : "meetups_api",
  "resources" : [
    {
        "name"        : "speakers",
        "model"       : "speakers",
        "resources"   : [
          {
            "name"        : "topics",
            "model"       : "topics"
          },
          {
            "name"        : "email_addresses",
            "model"       : "email_addresses"
          }
        ]
    },
    {
        "name"        : "topics",
        "model"       : "topics",
        "resources"   : [
          {
            "name"        : "speakers",
            "model"       : "speakers"
          }
        ]
    },
    {
        "name"        : "details",
        "model"       : "details"
    }
  ],
  "models"  : [
    {
      "title": "speakers",
      "isCollection"  : true,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
          "name": {
              "type": "string"
          },
          "employer": {
              "type": "string"
          }
      }
    },
    {
      "title" : "topics",
      "isCollection"  : true,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        }
      }
    },
    {
      "title" : "email_addresses",
      "isCollection"  : true,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "emailAddress": {
            "type": "string"
        }
      }
    },
    {
      "title" : "details",
      "isCollection"  : false,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "location": {
            "type": "string"
        },
        "time"    : {
            "type": "number"
        }
      }
    }
  ]
};
samples['todo_api_sample'] = {
  "apiName"         : "todo_api",
  "resources" : [
    {
        "name"        : "items",
        "model"       : "items",
        "resources"   : [
          {
            "name"        : "assignees",
            "model"       : "assignees"
          }
        ]
    },
    {
        "name"        : "projects",
        "model"       : "projects",
        "resources"   : [
          {
            "name"        : "items",
            "model"       : "items"
          }
        ]
    }
  ],
  "models"  : [
    {
      "title": "items",
      "isCollection"  : true,
      "hasNamedInstances" : true,
      "type": "object",
      "properties": {
          "description": {
              "type": "string"
          },
          "priority": {
              "type": "string"
          },
          "dueDate" : {
            "type" : "string"
          }
      }
    },
    {
      "title" : "projects",
      "isCollection"  : true,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "name": {
            "type": "string"
        },
        "label" : {
            "type" : "string"
        },
        "description": {
            "type": "string"
        }
      }
    },
    {
      "title" : "assignees",
      "isCollection"  : true,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "emailAddress": {
            "type": "string"
        }
      }
    }
  ]
};
samples['blog_api_sample'] = {
  "apiName"         : "blog_api",
  "resources" : [
    {
        "name"        : "posts",
        "model"       : "posts",
        "resources"   : [
          {
            "name"        : "tags",
            "model"       : "tags"
          },
          {
            "name"        : "authors",
            "model"       : "authors"
          }
        ]
    },
    {
        "name"        : "authors",
        "model"       : "authors",
        "resources"   : [
          {
            "name"        : "posts",
            "model"       : "posts"
          }
        ]
    }
  ],
  "models"  : [
    {
      "title": "posts",
      "isCollection"  : true,
      "hasNamedInstances" : true,
      "type": "object",
      "properties": {
          "title": {
              "type": "string"
          },
          "content": {
              "type": "string"
          }
      }
    },
    {
      "title" : "tags",
      "isCollection"  : true,
      "hasNamedInstances" : true,
      "type": "object",
      "properties": {
        "description": {
            "type": "string"
        }
      }
    },
    {
      "title" : "authors",
      "isCollection"  : false,
      "hasNamedInstances" : false,
      "type": "object",
      "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName"    : {
            "type": "string"
        },
        "emailAddress" : {
            "type" : "string"
        }
      }
    }
  ]
};
samples['testResponse'] = {
  "_links": {
    "self": {
      "href": "http://104.131.83.125/apis/sj5mdftc07ldi"
    },
    "deployedApi": {
      "href": "http://sample.api.url"
    },
    "modelshipApiDescription": {
      "href": "http://104.131.83.125/apis/sj5mdftc07ldi/api-sec"
    },
    "swaggerApiDescription": {
      "href": "http://104.131.83.125/apis/sj5mdftc07ldi/swagger"
    }
  },
  "id": "sj5mdftc07ldi",
  "apiName": "todo_api",
  "status": "active720",
  "createdDate": "2014-11-09T22:51:03.043Z",
  "modifiedDate": "2014-11-09T22:51:48.201Z"
};

function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object", 
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
};

function validateOptions (options, callback) {
    
};

function validateBasicModels (models, callback) {
    
};

function validateModels (models, callback) {
    
};

function validateResources (resources, callback) {
    
};


var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();