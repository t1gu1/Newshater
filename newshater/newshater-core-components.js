/**
 * Created by guillaume on 16-12-13.
 */

module.exports = function() {

    //Exemple
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

    //columns
    newshater.replaceEach('columns', [
        {
            tag: 'td',
            class: 'columns'
        }
    ]);

    //columns
    newshater.replaceEach('columns-align-center', [
        {
            tag: 'td',
            class: 'columns',
            attributes: ['align="center"']
        }
    ]);

    //columns
    newshater.replaceEach('columns-align-left', [
        {
            tag: 'td',
            class: 'columns',
            attributes: ['align="left"']
        }
    ]);

    //columns
    newshater.replaceEach('columns-align-right', [
        {
            tag: 'td',
            class: 'columns',
            attributes: ['align="right"']
        }
    ]);

    //Contain all content and keep it centered
    newshater.replaceEach('wrapper', [
        {
            tag: 'table'
        },
        {
            tag: 'tr'
        },
        {
            tag: 'td',
            attributes: ['align="center"']
        },
        {
            tag: 'table',
            class: 'wrapper'
        },
        {
            tag: 'tr'
        },
        {
            tag: 'td',
        }
    ]);

    //Spacer
    newshater.replaceEach('spacer', [
        {
            tag: 'table',
            class: 'spacer'
        },
        {
            tag: 'tr'
        },
        {
            tag: 'td'
        }
    ]);

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

}