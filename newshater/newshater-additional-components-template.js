/**
 * Created by guillaume on 16-12-13.
 */

module.exports = function() {

    //EXAMPLES TO ERASE "START"
    //Component START
    newshater.replaceEach('row', [//tag to replace
        {//First level
            tag: 'table', //tag remplace row
            class: 'row' //add class row to table tag
        },
        {//second level
            tag: 'tr'//tag inner table
        }
        //Add other level if you like
    ]);
    //Component END

    //Column spacer
    newshater.replaceEach('columns-spacer', [
        {
            tag: 'td',
            content: '&nbsp;',
            class: 'columns-spacer'
        }
    ]);

    //Add target blank
    newshater.replaceEach('a-link', [
        {
            tag: 'a',
            attributes: ['target="blank"'],
            class: 'link'
        }
    ]);

    //EXAMPLES TO ERASE "END"



}