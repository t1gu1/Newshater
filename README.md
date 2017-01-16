# How it works
* Transform "special tag" to some normal tag such as: ```row``` => ```<table><tr></tr></table>```
* You can use Scss and it will inline it to tags in the html. You only have to link it to the document.
* It use .pug (was jade before) to minimise html. You'll need to read pug docs <a href="https://pugjs.org/language/tags.html">https://pugjs.org/language/tags.html</a>
#### Exemple
```
//Contain the newsletter
    wrapper
        //Each content need to be in a row -> column
        row
            //Can put few collumns
            columns-align-center()
                h1 Newshater
        row
            //columns-align-xxx will align content
            columns-align-right(width="25%").
                 Newshater is <br/>
                 Really nice!
            columns-align-left(width="50%")
                            p Newshater = newsletter (lol)
            columns-align-center(width="25%")
                            p Newshater will be better than foundation mail framework!
                            
        row
            columns.customClass Just some text
```


# How to use
1. ```npm install```
2. use gulp with ```gulp``` or ```gulp watch```

# Understand the workflow
* Files in ```src``` folder will be compiled to process.
* The specials tags in process will be compiled in ```dist``` folder.
* So you can use html only with specials tags and paste it to ```process``` folder and run ```gulp``` command. It's **not recommended** and not usefull.
* In ```dist``` folder, it will create html and css. Css will be inline in html at this part. So **you can and you should DELETE** the **.css** file in ```dist``` folder at the end **or anytime**.

# The list of specials tags
#### You can consult the /newshater/newshater-core-components.js**<br/>
#### Left side = custom tag **"=>"** right side of  = .pug **representation like** (shorter than html for explain)**

##### Wrapper is the newsletter container. All should be in this container
* ```wrapper``` **=>** ```table``` -> ```tr``` -> ```td(align="center")``` -> ```table.wrapper``` -> ```tr``` -> ```td```

##### Row is like a row in the popular framework
* ```row``` **=>** ```table.row``` -> ```tr```

##### All columns have to be in a row
* ```columns``` **=>** td.columns
* ```columns-align-center``` **=>** ```td.columns(align="center")```
* ```columns-align-left``` **=>** ```td.columns(align="left")```
* ```columns-align-right``` **=>** ```td.columns(align="left")```
* ```columns-spacer``` **=>** ```td.columns-spage &nbsp```;

##### Spacer is like a row and it should not contain content
* ```row``` **=>** ```table.spacer``` -> ```tr``` -> ```td```

##### a-link place the target="blank" automatically
* ```a-link``` **=>** ```a.link(target="blank")```

# How to add custom tag
* **Please** don't add your custom tag to the core I'll add it after some test
* Add your custom tag in a new file. You can use ```newshater/newshater-additional-components-template``` to create your file.
* **Please** don't edit the template. It should be usefull for other users.
* Import your custom tag to gulpfile.js at the top of document like ```my_additional_components = require('./newshater/my-additional-components')```
* Call it after ```coreComponents(); //Execute all components``` near the line 52 of gulpfile.js. You should add somethig like ```my_additional_components()```.

#### Creation of custom tag in your file
* Tag to replace: ```newshater.replaceEach('TagToReplace', [```tags replacement option```]);```
######Tags options
* Replace tag by: ```{tag: 'td'}```
* Replace tag by few tags: ```{tag: 'table'}, {tag: 'tr'}, {tag: 'td'}``` Each tags can have options
* Add class: ```{tag: 'td', class: 'columns-spacer'}```
* Add content: ```{tag: 'td', content: '&nbsp;'}```
* Add attributes: ```{tag: 'a', attributes: ['target="blank"']}``` Attribute contain an array and accept few attributes
###### Example
* ```newshater.replaceEach('TagToReplace', [{tag: 'table', class: 'customClass'}, {tag: 'tr'}, {tag: 'td', attributes: ['align="center"', 'valign="bottom"'], class: 'CustomClass'}]);```


#TO DO
* Add it in the ```npm``` depot
* Make serious test in few newsletter
* Add other components
* Add more flexibility/function in the components creation
* Organise folders
* Create base template

##
#### Liscense
##### This was developped and maintained by Guillaume Huard Hughes
<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
<p>I allow people to create newsletter and gain money with it.</p>

<p>I don't allow to use it to create a "mailbuilder" like and sell it by month or other.</p>

Thanks,
Guillaume Huard Hughes