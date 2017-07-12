import {Query as q} from 'typeQuery/query/query';
import { Init } from 'typeQuery/core/init';
import {_App} from 'typeQuery/core/decorators/app.decorator';

//import main styles
import './styles/main.scss';


import { QueryItem } from 'typeQuery/query/queryItem';

import { delay } from 'typeQuery/utils/delay';
import { Http } from 'typeQuery/utils/http';

@_App({
    mixins: [],
}) 
class App {
    qMain:QueryItem;

    constructor() { }
    async onInit() {
        this.qMain = q('main').first;

        //Get projects from git, using api.
        await this.fetchWorks();

        this.qMain.class.add('loaded');
    }

    async fetchWorks() {
        const req = await Http.get('https://api.github.com/users/mateuszszmytko/repos'),
              works:Array<any> = JSON.parse(req.responseText),
              qWorksGroup = q('.block__group--works').first;
        
        //Sort by last update
        works.sort((a, b) => {
            const firstDate = new Date(a.updated_at).getTime(),
                  secondDate = new Date(b.updated_at).getTime();
            
            return secondDate - firstDate;
        })
        for(let i = 0; i < works.length; i++) {
            qWorksGroup.append(`<li><a class="text-block text-block--link" href="${works[i].html_url}" target="_blank">${works[i].name}</a></li>`)
        }
    }
    
}

Init(App);





