
## [Appverse HTML5](http://appverse.org/)
![](http://appversed.files.wordpress.com/2012/12/logo.png)

### appverse-generator-commons
This is a Yeoman Base Generator for Appverse Generators

[![NPM](https://nodei.co/npm/appverse-generator-commons.png)](https://nodei.co/npm/appverse-generator-commons/)

[![NPM](https://nodei.co/npm-dl/appverse-generator-commons.png?months=1)](https://nodei.co/npm/appverse-generator-commons)

The appverse-generator-commons provides some helper methods to use with Appverse generators.

Usage
------
The Appverse Generator Commons extends the Yeoman Base generator adding some helpers methods.

Add dependency to your generator package.json

```bash
  npm install appverse-generator-commons
```

Extend your generator from the Appverse Generator Commons, then helper methods will be accessible within the *this* Yeoman context.

```javascript
var appverse = require ('appverse-generator-commons');

 module.exports = appverse.extend({ //--> Inheritance
  initializing: function () {
     this.welcome (pkg); //--> Appverse common helper method.
     this.checkVersion(); // --> Appverse common helper method.
  },
  prompting: function () {
  }
  });
```

Methods
-------

  **welcome (pkg)** - Outputs the welcome message with package information.

```javascript
     this.welcome (require('../../package.json'));
```
  The method will add the package information as a new object into the the *this* context. You can then use *this.pkg* to get the package.json as object.

  **checkVersion()** - Notifies the user if there is a new published version of the generator.

  **info (msg) ** -- Outputs the message the info format (green).

```javascript
  this.info ("here some information ... ");    
```

Output:

```bash
  [APPVERSE][INFO] :: here some information...
```

  **warning (msg) ** -- Outputs the message the warning format (yellow).

```javascript
  this.warning ("here some warning information ... ");    
```

Output:

```bash
  [APPVERSE][WARNING] :: here some warning information...
```

  **error (msg) ** -- Outputs the message the error format (red).

```javascript
  this.error ("error messages ... ");    
```

Output:

```bash
  [APPVERSE][ERROR] :: error messages ...
```  

  **moveFiles(base,files) ** -- Move files to target path
    *base path - Base path where files are located
    *file list - Array with files path within the base bath

```javascript
     var files = ['Gruntfile.js', 'bower.json'];
     //generators/app/templates/Gruntfile.js and generators/app/templates/bower.json
     this.moveFiles (this.templatePath(), files);
```     

  **moveTemplates (base, templates)** --  Fill and Move template list to target path. It uses *this.templatePath()* as base path.

```javascript
     var templates = ['test/test1,js', 'test/test2.js'];
     //generators/app/templates/test/test1.js and generators/app/templates/test/test2.js
     this.moveTemplates (this.templatePath(), templates);
```    

  **moveNamedTemplate(base, template,name,target)** --  Move Named template. Templates files with *$name* variable and *$target* path variable.

```javascript
     var template = '$target/$name.js';
     var name = 'test1';  
     var target = 'test';
     this.moveNamedTemplate(this.templatePath(),template, name, target);
     //will create /test/test1.js on at the destination folder.
```     

   **moveNamedTemplates(base, templates, name, target)** -- Move Named templates list.

```javascript
     var templates= ['app/$target/$name-controller.js','app/$target/$name-module.js'];
     var name = 'myComponent';  
     var target = 'myComponent';
     this.moveNamedTemplates(this.templatePath(), template, name, target);
     //will create app/myComponent/myComponent-controller.js and app/myComponent/myComponent-model.js at the destination folder.
```  

   **addPackage(packages, file, node)** -- Add package to dependency manager  (package.json or bower.json)

```javascript
     var packages = [{name: "package", version: "0.0.1"}];
     this.addPackage(packages, "package.json", "devDependencies");
```
Result:

```json
    ...
    "devDependencies": {
          "package": "0.0.1"
          ...
    }
    ...
```

   **addScriptsToPackage(scripts)** -- Add scripts to target package.json

```javascript
     var script = 'test: \'grunt test\'';
     this.addScriptsToPackage(script);
```
Result:

```json
    ...
    "scripts": {
          "test": 'grunt test'
    }
    ...
```

   **addRegistryToPackage(url)** -- Add publish configuration to package.json

```javascript
     var url = 'http://my-internal-registry.local';
     this.addRegistryToPackage(script);
```
Result:

```json
     ...
     "publishConfig":{
            "registry":"http://my-internal-registry.local"
     }
     ...
```
[API Documentation](api/documentation.md)

## License

Copyright (c) 2012 GFT Appverse, S.L., Sociedad Unipersonal.

 This Source  Code Form  is subject to the  terms of  the Appverse Public License
 Version 2.0  ("APL v2.0").  If a copy of  the APL  was not  distributed with this
 file, You can obtain one at <http://appverse.org/legal/appverse-license/>.

 Redistribution and use in  source and binary forms, with or without modification,
 are permitted provided that the  conditions  of the  AppVerse Public License v2.0
 are met.

 THIS SOFTWARE IS PROVIDED BY THE  COPYRIGHT HOLDERS  AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS  OR IMPLIED WARRANTIES, INCLUDING, BUT  NOT LIMITED TO,   THE IMPLIED
 WARRANTIES   OF  MERCHANTABILITY   AND   FITNESS   FOR A PARTICULAR  PURPOSE  ARE
 DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
 SHALL THE  COPYRIGHT OWNER  OR  CONTRIBUTORS  BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL,  SPECIAL,   EXEMPLARY,  OR CONSEQUENTIAL DAMAGES  (INCLUDING, BUT NOT
 LIMITED TO,  PROCUREMENT OF SUBSTITUTE  GOODS OR SERVICES;  LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING  IN  ANY WAY OUT  OF THE USE  OF THIS  SOFTWARE,  EVEN  IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
