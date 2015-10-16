## Functions
<dl>
<dt><a href="#welcome">welcome(pkg)</a></dt>
<dd><p>Welcome message</p>
</dd>
<dt><a href="#checkVersion">checkVersion()</a></dt>
<dd><p>Check Generator Version and notifier</p>
</dd>
<dt><a href="#warning">warning(message)</a></dt>
<dd><p>Warning Message - Yellow</p>
</dd>
<dt><a href="#info">info(message)</a></dt>
<dd><p>Info Message - Green</p>
</dd>
<dt><a href="#error">error(message)</a></dt>
<dd><p>Error Message - Red</p>
</dd>
<dt><a href="#moveFiles">moveFiles(base, files)</a></dt>
<dd><p>Move files to target path</p>
</dd>
<dt><a href="#moveTemplates">moveTemplates(base, files)</a></dt>
<dd><p>Move files to target path</p>
</dd>
<dt><a href="#resolveNamedTemplatePath">resolveNamedTemplatePath()</a></dt>
<dd><p>Resolve template path</p>
</dd>
<dt><a href="#moveNamedTemplate">moveNamedTemplate(base, template, name, target)</a></dt>
<dd><p>Move Named template</p>
</dd>
<dt><a href="#moveNamedTemplates">moveNamedTemplates(base, templates, name, target)</a></dt>
<dd><p>Fill and Move named templates to target path</p>
</dd>
<dt><a href="#addPackage">addPackage(packages, file, node)</a></dt>
<dd><p>Add package to dependency manager  (package.json, bower.json)</p>
</dd>
<dt><a href="#addScriptsToPackage">addScriptsToPackage(scripts)</a></dt>
<dd><p>Add scripts to package.json</p>
</dd>
<dt><a href="#addRegistryToPackage">addRegistryToPackage(url)</a></dt>
<dd><p>Add publish configuration to package.json
publishConfig&quot;:{&quot;registry&quot;:&quot;<a href="http://my-internal-registry.local&quot;}">http://my-internal-registry.local&quot;}</a></p>
</dd>
</dl>
<a name="welcome"></a>
## welcome(pkg)
Welcome message

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pkg | <code>Object</code> | - Package information |

<a name="checkVersion"></a>
## checkVersion()
Check Generator Version and notifier

**Kind**: global function  
<a name="warning"></a>
## warning(message)
Warning Message - Yellow

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Message |

<a name="info"></a>
## info(message)
Info Message - Green

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Message |

<a name="error"></a>
## error(message)
Error Message - Red

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Message |

<a name="moveFiles"></a>
## moveFiles(base, files)
Move files to target path

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | Base path |
| files | <code>Array.&lt;string&gt;</code> | File list |

<a name="moveTemplates"></a>
## moveTemplates(base, files)
Move files to target path

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | Base path |
| files | <code>Array.&lt;string&gt;</code> | File list |

<a name="resolveNamedTemplatePath"></a>
## resolveNamedTemplatePath()
Resolve template path

**Kind**: global function  
<a name="moveNamedTemplate"></a>
## moveNamedTemplate(base, template, name, target)
Move Named template

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | Base path |
| template | <code>string</code> | Template |
| name | <code>string</code> | Name |
| target | <code>string</code> | Target |

<a name="moveNamedTemplates"></a>
## moveNamedTemplates(base, templates, name, target)
Fill and Move named templates to target path

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| base | <code>string</code> | Base path |
| templates | <code>Array.&lt;string&gt;</code> | Template list |
| name | <code>string</code> | Name |
| target | <code>string</code> | Target |

<a name="addPackage"></a>
## addPackage(packages, file, node)
Add package to dependency manager  (package.json, bower.json)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| packages | <code>Array.&lt;Object&gt;</code> | Package list |
| file | <code>string</code> | File (bower.json or package.json) |
| node | <code>string</code> | Node (devDependencies or dependencies) |

<a name="addScriptsToPackage"></a>
## addScriptsToPackage(scripts)
Add scripts to package.json

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| scripts | <code>Array.&lt;Object&gt;</code> | Scripts to add |

<a name="addRegistryToPackage"></a>
## addRegistryToPackage(url)
Add publish configuration to package.jsonpublishConfig":{"registry":"http://my-internal-registry.local"}

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | Registry url |

