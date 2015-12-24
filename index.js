/* jshint node: true */
/*
 Copyright (c) 2012 GFT Appverse, S.L., Sociedad Unipersonal.
 This Source Code Form is subject to the terms of the Appverse Public License
 Version 2.0 (“APL v2.0”). If a copy of the APL was not distributed with this
 file, You can obtain one at http://www.appverse.mobi/licenses/apl_v2.0.pdf. [^]
 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the conditions of the AppVerse Public License v2.0
 are met.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
 SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';
var os = require ('os');
var chalk = require ('chalk');
var cheerio = require('cheerio');
var path = require ('path');
var updateNotifier = require('update-notifier');
var yeoman = require ('yeoman-generator');


var APPVERSE = "[APPVERSE]";

var appverseGenerator = yeoman.Base.extend({
  /**
  * Welcome message
  * @param {Object} pkg -- Package information
  **/
      welcome: function welcome(pkg) {
      this.pkg = pkg;
      this.log(chalk.bgBlack.cyan('\n' +
          '                 __    __                    \n' +
          '   __ _ _ __  _ _\\ \\  / /__ _ __ ___  ___    \n' +
          '  / _| | |_ \\| |_ \\ \\/ / _ | |__/ __|/ _ \\   \n' +
          ' | (_| | |_) | |_) \\  /  __| |  \\__ |  __/   \n' +
          '  \\__|_| .__/| .__/ \\/ \\___|_|  |___/\\___|   \n' +
          '       | |   | |                             \n' +
          '       |_|   |_|                             \n' +
          '                                    ' + 'v' + pkg.version + '\n \n'));

      // Have Yeoman greet the user.
      this.log(
          ' Welcome to the ' + chalk.bgBlack.cyan('Appverse ' + pkg.name) + ' generator! ' + os.EOL
      );
    },
    /**
    * Check Generator Version and notifier
    **/
    checkVersion: function() {
      var notifier = updateNotifier({
        pkg: this.pkg,
        updateCheckInterval: 1000 // Interval to check for updates.
      });
      if (notifier && notifier.update) {
        this.log(chalk.cyan('Update available: ') + chalk.bold.green(notifier.update.latest) + chalk.gray(' \(current ') + chalk.bold.gray(notifier.update.current) + chalk.gray('\)'));
        this.log(chalk.cyan('run ' + chalk.bold.white('npm update -g ' + this.pkg.name) + chalk.cyan(' to update \n')));
      }
    },
    /**
    * Warning Message - Yellow
    * @param {string} message - Message
    **/
    warning: function warning(message) {
      this.log(chalk.bgBlack.yellow(os.EOL + APPVERSE + '[WARNING]::'+ message + os.EOL));
    },
    /**
    * Info Message - Green
    * @param {string} message - Message
    **/
    info: function info(message) {
      this.log(chalk.bgBlack.green(os.EOL + APPVERSE + '[INFO]::'+ message));
    },
    /**
    * Error Message - Red
    * @param {string} message - Message
    **/
    error: function error(message) {
      this.log(chalk.bgBlack.red(os.EOL + APPVERSE + '[ERROR]'+ message));
    },
    /**
    * Move files to target path
    * @param {string} base - Base path
    * @param {string[]} files - File list
    **/
    moveFiles: function moveFiles(base, files) {
      files.forEach(function (file) {
          this.fs.copy(
            path.join(base, file),
            this.destinationPath(file)
        );
      }.bind(this));
    },
    /**
    * Move files to target path
    * @param {string} base - Base path
    * @param {string[]} files - File list
    **/
    moveTemplates: function moveTemplates(base, templates) {
      templates.forEach(function (template) {
        this.fs.copyTpl(
            path.join(base, template),
            this.destinationPath(template),
            this
        );
    }.bind(this));
  },
  /**
  * Resolve template path
  */
   resolveNamedTemplatePath : function resolveNamedTemplatePath(template, name, target) {
    var res = template.replace('$target', target);
    var finalname = replaceAll (res, '$name', name);
    return finalname;
  },
  /**
  * Move Named template
  * @param {string} base - Base path
  * @param {string} template - Template
  * @param {string} name - Name
  * @param {string} target - Target
  */
  moveNamedTemplate : function moveNamedTemplate(base, template, name, target) {
    this.name = name;
    this.lodash = require ('lodash');
    this.fs.copyTpl(
        path.join(base, template),
        this.destinationPath(this.resolveNamedTemplatePath(template, name, target)),
        this
    );
  },
  /**
  * Fill and Move named templates to target path
  * @param {string} base - Base path
  * @param {string[]} templates - Template list
  * @param {string} name - Name
  * @param {string} target - Target
  */
  moveNamedTemplates : function moveNamedTemplates(base,templates, name, target) {
    templates.forEach(function (template) {
        this.moveNamedTemplate(base, template, name, target);
    }.bind(this));
  },
  /**
  * Add package to dependency manager  (package.json, bower.json)
  * @param {Object[]} packages - Package list
  * @param {string} file - File (bower.json or package.json)
  * @param {string} node - Node (devDependencies or dependencies)
  */
  addPackage : function addPackage(packages, file, node) {
    this.log("Adding packages ");
    var manager = require(this.destinationPath(file));
    var write = false;
    packages.forEach(function (p) {
        if (!manager[node][p.name]) {
            manager[node][p.name] = p.version;
            write = true;
        }
    });
    if (write) {
        this.fs.write(this.destinationPath(file), JSON.stringify(manager));
        this.info( file + ' updated ');
    } else {
        this.info('Dependencies already exists at ' + file);
    }
  },
  /**
  * Add scripts to package.json
  * @param {Object[]} scripts - Scripts to add
  */
  addScriptsToPackage : function addScriptsToPackage(scripts) {
    var pkg = require(this.destinationPath('package.json'));
    var write = false;
    scripts.forEach(function (s) {
        pkg.scripts[s.name] = s.value;
        write = true;
    });
    if (write) {
        this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkg));
        this.info("package.json updated");
    } else {
        this.info("Scripts already exists at package.json");
    }
  },
  /**
  * Add publish configuration to package.json
  * publishConfig":{"registry":"http://my-internal-registry.local"}
  * @param {string} url - Registry url
  */
  addRegistryToPackage : function addRegistryToPackage(url) {
    var pkg = require(this.destinationPath('package.json'));
    pkg.publishConfig.registry = url;
    this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkg));
  },
/**
 * Add Scripts tag to index.html
 * @param {string[]} scripts - Scripts path array
 **/
 addScriptsToIndex: function addScriptsToIndex(scripts) {
    this.info(" Adding scripts to index.html");
    var index = this.fs.read(this.destinationPath('app/index.html'));
    var indexHTML = cheerio.load(index);
    var write = false;
    scripts.forEach(function (script) {
        var scriptTag = '\n <script src=\"' + script + '\"></script>';
        var exists = false;
        for (var i = 0; i < indexHTML('script').length; i++) {
            var current = indexHTML('script').get()[i].attribs.src;
            if (current === script) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            write = true;
            indexHTML(scriptTag).insertAfter(indexHTML('script').get()[indexHTML('script').length - 1]);
        }
    });
    if (write) {
        this.fs.write(this.destinationPath('app/index.html'), indexHTML.html());
    } else {
        this.info(" >< Scripts already exists at index.html");
    }
}, /**
* Add lynk tags to index.html
* @param {string[]} lynks - Scripts path array
**/
addCSSToIndex: function addCSSToIndex(scripts) {
  this.info('Adding scripts to index.html');
  var index = this.fs.read(this.destinationPath('app/index.html'));
  var indexHTML = cheerio.load(index);
  var write = false;
  scripts.forEach(function (script) {
      var scriptTag = '\n <link rel="stylesheet" href=\"' + script + '\"></link>';
      var exists = false;
      for (var i = 0; i < indexHTML('link').length; i++) {
          var current = indexHTML('link').get()[i].attribs.href;
          if (current === script) {
              exists = true;
              break;
          }
      }
      if (!exists) {
          write = true;
          indexHTML(scriptTag).insertAfter(indexHTML('link').get()[indexHTML('link').length - 1]);
      }
  });
  if (write) {
      this.fs.write(this.destinationPath('app/index.html'), indexHTML.html());
  } else {
      this.info(" >< CSS Scripts already exists at index.html");
  }
}
});

module.exports = appverseGenerator;

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
