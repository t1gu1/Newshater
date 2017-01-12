/**
 * Created by guillaume on 16-12-13.
 * This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.
 * I allow people to create newsletter with but i don't allow to use it to create mailbuilder and you sell it by month or other.
 */

var cheerio = require('cheerio');

module.exports = newshater = {

    'init': function(html){
        this.$ = cheerio.load(html);
    },

    'html': function(){
        return newshater.$.html();
    },

    'magicClass':'newshater',
    $:'',

    'tags': {
        //The open tags
        'open':function(by){
            var openTags = ''

            //For each element that will construct our new tags (To create it)
            by.forEach(function(element, index) {
                //Add a magic class to the first element only
                //console.log((element.class != undefined ? element.class:''));
                var attributes = '';
                var allAttributes = (element.attributes != undefined ? element.attributes:'');
                if(allAttributes != ''){
                    allAttributes.forEach(function(element) {
                        attributes += element;
                    });
                }
                //console.log(attributes);

                var content = (element.content != undefined ? element.content:'');
                var classAttr = (element.class != undefined ? element.class:'');
                var magicClass = '';

                if(index == 0){
                    magicClass= newshater.magicClass;
                }
                //Construct our tag
                openTags += '<'+element.tag+ ' class="'+magicClass+' '+classAttr+'" '+attributes+' >'+content;
            });
            return openTags;
        },
        //The close tags
        'close':function(by){
            var openTags = ''
            by.reverse().forEach(function(element) {
                openTags += '</'+element.tag+'>'
            });
            return openTags;
        }
    },
    //Replace each tags in the documents by chosen tags
    'replaceEach': function(tag, by){
        //Get open & close tags
        var openTags = this.tags.open(by);
        var closeTags = this.tags.close(by);
        //create a new document that will be our new document at the end
        var document ='';
        var transformationOperation = 0;

        //For each tags find
        function start() {
            newshater.$(tag).each(function (i, elem) {
                //Get the attributes
                var attrs = (newshater.getAttrs(newshater.$(this)));
                //Create the new elements tags
                var newElement = openTags + newshater.$(this).html() + closeTags;
                //Put it in cherrio mod to edit it with jQuery function
                var m = cheerio.load(newElement);
                //regive the attributes on tags
                m('.newshater').attr(attrs);
                //Remove the magic class that help us to find the place to add attributes
                m('.newshater').removeClass('newshater');
                //Give a string
                m = m.html();
                //Replace the original document
                newshater.$(this).replaceWith(m);

                transformationOperation++;
                //console.log("test");
                //quit
                return false;
            });
            if(newshater.$(tag).length > 0){
                start();
            }
        }
        start();
        //Return the result
        //return newshater.$.html();

        console.log(transformationOperation+' tag'+(transformationOperation >= 2?'s':'')+': '+ tag + ' has been processed');

    },
    //Get all attributs
    'getAttrs': function(elem){
        return this.$(elem).attr();
    }
}